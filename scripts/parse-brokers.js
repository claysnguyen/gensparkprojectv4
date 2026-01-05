// Script to parse SQL broker data and convert to JSON Content Collections
import fs from 'fs';

const SQL_FILE = './complete_forex_brokers_database.sql';
const OUTPUT_DIR = './src/content/brokers';

const sqlContent = fs.readFileSync(SQL_FILE, 'utf-8');

// Split by broker INSERT blocks
const insertBrokerRegex = /INSERT INTO brokers \([\s\S]*?\);/g;
const brokerBlocks = sqlContent.match(insertBrokerRegex) || [];

const brokers = [];

for (const block of brokerBlocks) {
  const rankMatch = block.match(/-- Rank #(\d+):\s*([^\n]+)/);
  const rank = rankMatch ? parseInt(rankMatch[1]) : brokers.length + 1;
  const rankName = rankMatch ? rankMatch[2].trim() : '';

  // Extract values from VALUES clause
  const valuesMatch = block.match(/VALUES\s*\(([\s\S]*?)\);/);
  if (!valuesMatch) continue;

  // Parse values - handle multi-line strings properly
  const rawValues = valuesMatch[1];

  // Extract each value by looking for patterns
  const values = [];
  let pos = 0;

  while (pos < rawValues.length) {
    // Skip whitespace
    while (pos < rawValues.length && /\s/.test(rawValues[pos])) pos++;

    if (rawValues[pos] === "'") {
      // String value
      let str = "'";
      pos++;
      while (pos < rawValues.length) {
        if (rawValues[pos] === "\\" && pos + 1 < rawValues.length) {
          str += rawValues[pos] + rawValues[pos + 1];
          pos += 2;
        } else if (rawValues[pos] === "'") {
          if (rawValues[pos + 1] === "'") {
            // Escaped quote
            str += "''";
            pos += 2;
          } else {
            // End of string
            str += "'";
            pos++;
            break;
          }
        } else {
          str += rawValues[pos];
          pos++;
        }
      }
      values.push(str);
    } else if (rawValues[pos] === ',') {
      pos++;
    } else if (rawValues[pos] === 'd' && rawValues.substring(pos, pos, 10) === 'datetime(') {
      // datetime('now')
      const match = rawValues.substring(pos).match(/datetime\('now'\)/);
      if (match) {
        values.push("datetime('now')");
        pos += match[0].length;
      } else {
        pos++;
      }
    } else {
      // Number or keyword
      const match = rawValues.substring(pos).match(/^[\d.]+/);
      if (match) {
        values.push(match[0]);
        pos += match[0].length;
      } else {
        // Skip comment or other
        pos++;
      }
    }
  }

  // Clean values
  const cleanValues = values.map(v => {
    if (v === "datetime('now')") return v;
    if (v.startsWith("'") && v.endsWith("'")) {
      return v.slice(1, -1).replace(/''/g, "'").replace(/\\n/g, ' ').trim();
    }
    return v;
  });

  const name = cleanValues[0] || rankName;
  const slug = cleanValues[1] || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Extract spreads for this broker
  const spreads = [];
  const spreadRegex = new RegExp(`INSERT INTO spreads[\\s\\S]*?SELECT id, '([^']+)',\\s*([\\d.]+),\\s*([\\d.]+),\\s*'([^']+)'[\\s\\S]*?FROM brokers WHERE slug = '${slug}'`, 'g');
  let spreadMatch;
  while ((spreadMatch = spreadRegex.exec(sqlContent)) !== null) {
    spreads.push({
      currencyPair: spreadMatch[1],
      spreadFrom: parseFloat(spreadMatch[2]),
      spreadAvg: parseFloat(spreadMatch[3]),
      accountType: spreadMatch[4]
    });
  }

  // Extract regulations
  const regulations = [];
  const regRegex = new RegExp(`INSERT INTO regulations[\\s\\S]*?SELECT id, '([^']+)',\\s*'([^']+)',\\s*'([^']+)'[\\s\\S]*?FROM brokers WHERE slug = '${slug}'`, 'g');
  let regMatch;
  while ((regMatch = regRegex.exec(sqlContent)) !== null) {
    regulations.push({
      name: regMatch[1],
      jurisdiction: regMatch[2],
      licenseNumber: regMatch[3]
    });
  }

  // Parse JSON arrays
  const parseJsonArray = (str) => {
    if (!str || !str.startsWith('[')) return [];
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  const broker = {
    rank,
    name,
    slug,
    websiteUrl: cleanValues[2] || '',
    logoUrl: cleanValues[3] || '',
    rating: parseFloat(cleanValues[4]) || 0,
    established: parseInt(cleanValues[6]) || 0,
    headquarters: cleanValues[7] || '',
    description: cleanValues[9] ? cleanValues[9].substring(0, 500) : '',
    pros: parseJsonArray(cleanValues[10]),
    cons: parseJsonArray(cleanValues[11]),
    platforms: parseJsonArray(cleanValues[12]),
    scores: {
      regulationTrust: parseFloat(cleanValues[15]) || 0,
      fees: parseFloat(cleanValues[16]) || 0,
      platformTools: parseFloat(cleanValues[17]) || 0,
      depositWithdrawal: parseFloat(cleanValues[18]) || 0,
      customerSupport: parseFloat(cleanValues[19]) || 0,
      researchEducation: parseFloat(cleanValues[20]) || 0,
    },
    userReviewsCount: parseInt(cleanValues[21]) || 0,
    spreads,
    regulations
  };

  brokers.push(broker);
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Write each broker as a JSON file
brokers.forEach(broker => {
  const filename = `${broker.slug}.json`;
  fs.writeFileSync(
    `${OUTPUT_DIR}/${filename}`,
    JSON.stringify(broker, null, 2)
  );
  console.log(`✓ ${broker.rank}. ${broker.name}`);
});

// Write master index
fs.writeFileSync(
  `${OUTPUT_DIR}/../brokers.json`,
  JSON.stringify({ brokers, metadata: { total: brokers.length, generated: new Date().toISOString() } }, null, 2)
);

console.log(`\nTotal: ${brokers.length} brokers extracted`);

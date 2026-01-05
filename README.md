# ForexBrokersCompare

A modern, fast forex broker comparison platform built with Astro. Compare 74+ forex brokers, view detailed reviews, and find the best broker for your trading needs.

## Features

- **74 Forex Brokers** - Comprehensive database with ratings, spreads, and regulations
- **Broker Directory** - Search and filter by rating, platform, headquarters
- **Comparison Tool** - Side-by-side comparison of up to 3 brokers
- **Detailed Reviews** - Individual pages for each broker with pros/cons, spreads, and regulations
- **SEO Optimized** - Static site generation for fast loading and search engine ranking
- **Vercel Ready** - Deploys instantly to Vercel's global CDN

## Tech Stack

- **Framework**: [Astro 5](https://astro.build/) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Deployment**: [Vercel](https://vercel.com/) - Edge-ready static hosting
- **Content**: JSON Content Collections - Type-safe data management

## Project Structure

```
gensparkprojectv4/
├── public/
│   ├── brokers.json       # Broker data API endpoint
│   ├── favicon.svg
│   └── logos/             # Broker logo images (50+ files)
├── src/
│   ├── content/
│   │   └── brokers/       # 74 broker JSON files
│   ├── layouts/
│   │   └── Layout.astro   # Main layout with nav/footer
│   └── pages/
│       ├── index.astro    # Home page
│       ├── about.astro    # About page
│       ├── compare.astro  # Broker comparison tool
│       └── brokers/
│           ├── index.astro    # Broker directory
│           └── [slug].astro   # Individual broker pages
├── astro.config.mjs       # Astro configuration
├── vercel.json            # Vercel deployment config
├── package.json
└── tailwind.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

```bash
npm run dev
```

Visit http://localhost:4321 to see the site.

## Broker Data

Brokers are stored as JSON files in `src/content/brokers/` using Astro's Content Collections schema.

### Broker Schema

```typescript
interface Broker {
  rank: number;           // #1-74 ranking
  name: string;           // Broker name
  slug: string;           // URL-friendly identifier
  websiteUrl: string;     // Broker website
  logoUrl: string;        // Path to logo image
  rating: number;         // 0-5.5 stars
  established: number;    // Year founded
  headquarters: string;   // Country HQ
  description: string;    // About text
  pros: string[];         // Advantages
  cons: string[];         // Disadvantages
  platforms: string[];    // MT4, MT5, etc.
  scores: {
    regulationTrust: number;   // 0-10
    fees: number;              // 0-10
    platformTools: number;     // 0-10
    depositWithdrawal: number; // 0-10
    customerSupport: number;   // 0-10
    researchEducation: number; // 0-10
  };
  userReviewsCount: number;
  spreads: {
    currencyPair: string;  // EUR/USD, etc.
    spreadFrom: number;
    spreadAvg: number;
    accountType: string;   // Standard, ECN
  }[];
  regulations: {
    name: string;          // FCA, ASIC, etc.
    jurisdiction: string;
    licenseNumber: string;
  }[];
}
```

### Updating Brokers

Edit JSON files in `src/content/brokers/` or regenerate from SQL:

```bash
# Regenerate broker data from SQL source
node scripts/parse-brokers.js
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with top-rated brokers |
| `/brokers` | Broker directory with search/filter |
| `/brokers/[slug]` | Individual broker detail page |
| `/compare` | Side-by-side broker comparison |
| `/about` | About page |

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Or connect your GitHub repo for auto-deploys
```

### Vercel Configuration

The `vercel.json` file configures:
- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Caching headers for broker pages

### Manual Build

```bash
npm run build
# Upload dist/ folder to your host
```

## Adding New Brokers

1. Create a new JSON file in `src/content/brokers/`:
   ```json
   {
     "rank": 75,
     "name": "New Broker",
     "slug": "new-broker",
     "websiteUrl": "https://example.com",
     "logoUrl": "/logos/new-broker.png",
     "rating": 4.5,
     "established": 2020,
     "headquarters": "London, UK",
     "description": "Broker description...",
     "pros": ["Pro 1", "Pro 2"],
     "cons": ["Con 1", "Con 2"],
     "platforms": ["MetaTrader 4", "Web Platform"],
     "scores": {
       "regulationTrust": 8.5,
       "fees": 7.5,
       "platformTools": 8.0,
       "depositWithdrawal": 8.0,
       "customerSupport": 7.5,
       "researchEducation": 7.0
     },
     "userReviewsCount": 150,
     "spreads": [
       { "currencyPair": "EUR/USD", "spreadFrom": 0.5, "spreadAvg": 0.7, "accountType": "Standard" }
     ],
     "regulations": [
       { "name": "FCA", "jurisdiction": "UK", "licenseNumber": "FCA-123456" }
     ]
   }
   ```

2. Add logo image to `public/logos/`

3. Rebuild the site:
   ```bash
   npm run build
   ```

## Customization

### Colors

Edit `tailwind.config.mjs` to change the primary color:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        // ... customize your color palette
        600: '#2563eb',  // Main primary color
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      }
    }
  }
}
```

### Site Name

Edit `src/layouts/Layout.astro` to change the site name in the header and footer.

## Performance

- **Static Generation**: All pages pre-built at deploy time
- **Zero JS by Default**: Minimal client-side JavaScript
- **Edge Caching**: Vercel's global CDN for fast delivery
- **Optimized Images**: Use Astro's `<Image />` component for optimization

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Pull requests welcome! Please read the contributing guidelines before submitting.

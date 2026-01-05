# Contributing to ForexBrokersCompare

Thank you for your interest in contributing! This guide will help you get started.

## How to Contribute

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy of the repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/gensparkprojectv4.git
cd gensparkprojectv4
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Changes

- Add or update broker data in `src/content/brokers/`
- Improve pages in `src/pages/`
- Update styles in `src/layouts/` or `tailwind.config.mjs`

### 5. Test Your Changes

```bash
npm install
npm run dev
```

Visit http://localhost:4321 to verify your changes.

### 6. Submit a Pull Request

1. Push your changes to GitHub
2. Open a Pull Request with a clear description
3. Link any related issues

## Adding a New Broker

1. Create a JSON file in `src/content/brokers/`:
   ```bash
   cp src/content/brokers/template.json src/content/brokers/new-broker.json
   ```

2. Fill in the broker data following the schema in `src/content/config.ts`

3. Add the logo to `public/logos/`

4. Test and submit!

## Coding Standards

- Use TypeScript for type safety
- Follow the existing component structure
- Use Tailwind CSS for styling
- Keep components small and focused

## Adding Features

1. Check existing issues or create a new one
2. Discuss your approach before implementing
3. Write clean, documented code
4. Test thoroughly

## Reporting Issues

When reporting issues, include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if relevant
- Browser/OS information

## Questions?

Open an issue for discussion or reach out to the maintainers.

## License

By contributing, you agree to license your work under the MIT License.

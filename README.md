# BetArchitect Frontend

Multilingual Next.js application with internationalization support and dynamic content generation.

## Requirements

- Node.js 18+
- pnpm (recommended)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create `.env.local` file and configure required variables:

```bash
cp .env.example .env.local
```

### 3. Generate Content

Before the first run, you need to generate content and translations:

```bash
# Generate all content (translations + pages + locale constants)
pnpm run build:content

# Or separately:
pnpm run content:i18n     # Generate translations from CSV
pnpm run content:pages    # Generate pages from CSV
pnpm run sync:locales     # Sync locale constants
```

### 4. Start Development Server

```bash
pnpm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Production Build

```bash
# Full build (content + application)
pnpm run build

# Start production server
pnpm run start
```

## Project Structure

```
├── content/
│   ├── raw/                 # Source data
│   │   ├── strings.csv      # Translations
│   │   └── pages.csv        # Page content
│   ├── i18n/               # Generated translations
│   ├── pages/              # Generated pages
│   └── manifest.json       # Content availability manifest
├── scripts/                # Content generation scripts
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React components
│   ├── lib/               # Utilities and libraries
│   ├── constants/         # Constants (including generated)
│   └── middleware.ts      # Localization middleware
```

## Scripts

- `pnpm run dev` - Start dev server with Turbopack
- `pnpm run build` - Production build
- `pnpm run build:content` - Generate all content
- `pnpm run content:i18n` - Generate translations
- `pnpm run content:pages` - Generate pages
- `pnpm run sync:locales` - Sync locale constants
- `pnpm run lint` - Code linting
- `pnpm run format` - Code formatting

## Development

### Adding a New Translation

1. Add key and translations to `content/raw/strings.csv`
2. Run `pnpm run content:i18n` to generate JSON files
3. Use in code: `t('your.translation.key')`

### Adding a New Page

1. Add rows for all locales to `content/raw/pages.csv`
2. Run `pnpm run content:pages` to generate files
3. Create corresponding component in `src/app/[locale]/`

### Adding a New Locale

1. Add column to `content/raw/strings.csv` and `content/raw/pages.csv`
2. Run `pnpm run build:content` to update manifest
3. Locale constants will be updated automatically

## Middleware

The application uses middleware for:

- Automatic preferred locale detection
- Redirects from short codes (`/en` → `/en-GB`)
- Private route protection
- Route validation

## Technologies

- **Next.js 15.5.4** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **next-intl** for internationalization
- **Radix UI** for UI components
- **CSV-based content** with automatic generation

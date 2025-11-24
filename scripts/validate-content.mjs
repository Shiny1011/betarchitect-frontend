import * as fs from 'fs';
import * as path from 'path';

import { parse } from 'csv-parse/sync';

import { getUnifiedLocaleConfig, REQUIRED_PAGES } from './shared-config.mjs';

// Initialize locales from CSV using shared function
const { locales, defaultLocale } = getUnifiedLocaleConfig();
const MANIFEST_SUPPORTED_LOCALES = locales;
const MANIFEST_DEFAULT_LOCALE = defaultLocale;

/**
 * Validate content structure and files for build
 */
export function validateContentForBuild() {
  const contentDir = path.join(process.cwd(), 'content');
  const rawDir = path.join(contentDir, 'raw');
  const i18nDir = path.join(contentDir, 'i18n');
  const pagesDir = path.join(contentDir, 'pages');

  const errors = [];

  try {
    // 1. Check if raw CSV files exist
    const stringsPath = path.join(rawDir, 'strings.csv');
    const pagesPath = path.join(rawDir, 'pages.csv');

    if (!fs.existsSync(stringsPath)) {
      errors.push('Missing content/raw/strings.csv');
    }
    if (!fs.existsSync(pagesPath)) {
      errors.push('Missing content/raw/pages.csv');
    }

    // 2. Validate strings.csv if it exists
    if (fs.existsSync(stringsPath)) {
      try {
        const csvContent = fs.readFileSync(stringsPath, 'utf-8');
        const data = parse(csvContent, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        });

        const headers = Object.keys(data[0] || {});

        // Check if default locale is present
        if (!headers.includes(MANIFEST_DEFAULT_LOCALE)) {
          errors.push(`Default locale ${MANIFEST_DEFAULT_LOCALE} is missing from strings.csv`);
        }

        // Check if all supported locales are present
        const missingLocales = MANIFEST_SUPPORTED_LOCALES.filter((locale) => !headers.includes(locale));
        if (missingLocales.length > 0) {
          errors.push(`Missing locales in strings.csv: ${missingLocales.join(', ')}`);
        }
      } catch (error) {
        errors.push(`Invalid strings.csv format: ${error.message}`);
      }
    }

    // 3. Validate pages.csv if it exists
    if (fs.existsSync(pagesPath)) {
      try {
        const csvContent = fs.readFileSync(pagesPath, 'utf-8');
        const data = parse(csvContent, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
          quote: '"',
          escape: '"',
        });

        // Check required headers
        const requiredHeaders = ['slug', 'locale', 'meta_title', 'body_md', 'meta_description'];
        const headers = Object.keys(data[0] || {});
        const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
        if (missingHeaders.length > 0) {
          errors.push(`Missing headers in pages.csv: ${missingHeaders.join(', ')}`);
        }

        // Check for invalid locales
        const csvLocales = [...new Set(data.map((row) => row.locale))];
        const invalidLocales = csvLocales.filter((locale) => !MANIFEST_SUPPORTED_LOCALES.includes(locale));
        if (invalidLocales.length > 0) {
          errors.push(`Invalid locales in pages.csv: ${invalidLocales.join(', ')}`);
        }

        // Check for duplicate (slug, locale) combinations
        const combinations = new Set();
        const duplicates = [];
        data.forEach((row) => {
          const combination = `${row.slug}-${row.locale}`;
          if (combinations.has(combination)) {
            duplicates.push(combination);
          }
          combinations.add(combination);
        });
        if (duplicates.length > 0) {
          errors.push(`Duplicate (slug, locale) combinations found: ${duplicates.join(', ')}`);
        }

        // Check that required pages exist for default locale
        const pagesBySlug = {};
        data.forEach((row) => {
          if (!pagesBySlug[row.slug]) {
            pagesBySlug[row.slug] = [];
          }
          pagesBySlug[row.slug].push(row.locale);
        });

        REQUIRED_PAGES.forEach((requiredPage) => {
          if (!pagesBySlug[requiredPage]) {
            errors.push(`Required page "${requiredPage}" is missing from pages.csv`);
          } else if (!pagesBySlug[requiredPage].includes(MANIFEST_DEFAULT_LOCALE)) {
            errors.push(`Required page "${requiredPage}" is missing default locale ${MANIFEST_DEFAULT_LOCALE}`);
          }
        });
      } catch (error) {
        errors.push(`Invalid pages.csv format: ${error.message}`);
      }
    }

    // 4. Check if generated i18n files exist
    const missingI18nFiles = MANIFEST_SUPPORTED_LOCALES.filter((locale) => {
      const filePath = path.join(i18nDir, `${locale}.json`);
      return !fs.existsSync(filePath);
    });
    if (missingI18nFiles.length > 0) {
      errors.push(
        `Missing i18n files: ${missingI18nFiles.map((l) => `${l}.json`).join(', ')}. Run 'npm run content:generate' to generate them.`
      );
    }

    // 5. Check if manifest.json exists
    const manifestPath = path.join(contentDir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      errors.push("Missing content/manifest.json. Run 'npm run content:generate' to generate it.");
    } else {
      // Validate manifest structure
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

        if (!manifest.locales || !Array.isArray(manifest.locales)) {
          errors.push('Invalid manifest.json: missing or invalid locales array');
        }

        if (!manifest.defaultLocale) {
          errors.push('Invalid manifest.json: missing defaultLocale');
        }

        if (!manifest.pages || typeof manifest.pages !== 'object') {
          errors.push('Invalid manifest.json: missing or invalid pages object');
        }

        // Check required pages in manifest
        if (manifest.pages) {
          REQUIRED_PAGES.forEach((requiredPage) => {
            if (!manifest.pages[requiredPage]) {
              errors.push(`Required page "${requiredPage}" is missing from manifest.json`);
            } else if (!manifest.pages[requiredPage].includes(MANIFEST_DEFAULT_LOCALE)) {
              errors.push(`Required page "${requiredPage}" is missing default locale in manifest.json`);
            }
          });
        }
      } catch (error) {
        errors.push(`Invalid manifest.json format: ${error.message}`);
      }
    }

    // 6. Check if required page files exist
    REQUIRED_PAGES.forEach((slug) => {
      const defaultLocalePath = path.join(pagesDir, slug, `${MANIFEST_DEFAULT_LOCALE}.md`);
      if (!fs.existsSync(defaultLocalePath)) {
        errors.push(
          `Required page file missing: ${slug}/${MANIFEST_DEFAULT_LOCALE}.md. Run 'npm run content:generate' to generate it.`
        );
      }
    });
  } catch (error) {
    errors.push(`Content validation error: ${error.message}`);
  }

  if (errors.length > 0) {
    console.error('\n💥 Content validation failed:');
    errors.forEach((error) => console.error(`   ❌ ${error}`));
    console.error('\n🔧 To fix these issues, run: npm run content:generate\n');
    throw new Error(`Content validation failed with ${errors.length} error(s)`);
  }

  console.log('✅ Content validation passed');
}

// Execute validation if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    validateContentForBuild();
  } catch (error) {
    process.exit(1);
  }
}

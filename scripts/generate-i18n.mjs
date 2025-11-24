#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { parse } from 'csv-parse/sync';

import { getUnifiedLocaleConfig } from './shared-config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get project root directory
const projectRoot = path.resolve(__dirname, '..');
const contentDir = path.join(projectRoot, 'content');
const rawDir = path.join(contentDir, 'raw');
const i18nDir = path.join(contentDir, 'i18n');

// Initialize locales from CSV using shared function
const { locales, defaultLocale } = getUnifiedLocaleConfig();
const MANIFEST_SUPPORTED_LOCALES = locales;
const MANIFEST_DEFAULT_LOCALE = defaultLocale;

/**
 * Convert flat key-value pairs to nested object
 * Example: 'content.pages.vip.title' -> { content: { pages: { vip: { title: value } } } }
 */
function createNestedObject(flatObj) {
  const nested = {};

  for (const [key, value] of Object.entries(flatObj)) {
    const keys = key.split('.');
    let current = nested;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
  }

  return nested;
}

/**
 * Generate i18n JSON files from strings.csv using csv-parse
 */
function generateI18nFiles() {
  console.log('🔄 Generating i18n JSON files from strings.csv...');

  // Read strings.csv
  const stringsPath = path.join(rawDir, 'strings.csv');
  if (!fs.existsSync(stringsPath)) {
    throw new Error(`strings.csv not found at ${stringsPath}`);
  }

  const csvContent = fs.readFileSync(stringsPath, 'utf-8');

  // Parse CSV using csv-parse library
  const data = parse(csvContent, {
    columns: true, // Use first row as column headers
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`📊 Parsed ${data.length} translation keys from CSV`);

  // Get headers (locales) from first row - exclude 'key' column
  const firstRow = data[0] || {};
  const headers = Object.keys(firstRow);
  const csvLocales = headers.filter((header) => header !== 'key');

  console.log(`📍 Found locales in CSV: ${csvLocales.join(', ')}`);
  console.log(`📍 Using locales: ${MANIFEST_SUPPORTED_LOCALES.join(', ')}`);
  console.log(`📍 Default locale: ${MANIFEST_DEFAULT_LOCALE}`);

  // Ensure i18n directory exists
  if (!fs.existsSync(i18nDir)) {
    fs.mkdirSync(i18nDir, { recursive: true });
  }

  // Generate JSON file for each locale
  MANIFEST_SUPPORTED_LOCALES.forEach((locale) => {
    const localeData = {};

    data.forEach((row) => {
      const key = row.key;
      const value = row[locale];

      if (key && value) {
        localeData[key] = value;
      }
    });

    // Convert flat structure to nested object
    const nestedData = createNestedObject(localeData);

    // Write JSON file
    const outputPath = path.join(i18nDir, `${locale}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(nestedData, null, 2), 'utf-8');

    console.log(`✅ Generated ${locale}.json with ${Object.keys(localeData).length} keys`);
  });

  console.log('✅ i18n JSON generation completed!');
}

/**
 * Validate i18n files
 */
function validateI18nFiles() {
  console.log('🔍 Validating i18n files...');

  // Check if all required locale files exist
  const missingFiles = MANIFEST_SUPPORTED_LOCALES.filter((locale) => {
    const filePath = path.join(i18nDir, `${locale}.json`);
    return !fs.existsSync(filePath);
  });

  if (missingFiles.length > 0) {
    throw new Error(`Missing i18n files: ${missingFiles.map((l) => `${l}.json`).join(', ')}`);
  }

  // Load default locale for comparison
  const defaultLocalePath = path.join(i18nDir, `${MANIFEST_DEFAULT_LOCALE}.json`);
  const defaultLocaleData = JSON.parse(fs.readFileSync(defaultLocalePath, 'utf-8'));
  const defaultKeys = getAllKeys(defaultLocaleData);

  // Check each locale for missing keys
  MANIFEST_SUPPORTED_LOCALES.forEach((locale) => {
    if (locale === MANIFEST_DEFAULT_LOCALE) return;

    const localePath = path.join(i18nDir, `${locale}.json`);
    const localeData = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
    const localeKeys = getAllKeys(localeData);

    const missingKeys = defaultKeys.filter((key) => !localeKeys.includes(key));
    if (missingKeys.length > 0) {
      console.warn(
        `⚠️ ${locale}.json is missing keys: ${missingKeys.slice(0, 5).join(', ')}${missingKeys.length > 5 ? ` (and ${missingKeys.length - 5} more)` : ''}`
      );
    }
  });

  console.log('✅ i18n validation completed!');
}

/**
 * Get all nested keys from an object
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

// Main execution
try {
  generateI18nFiles();
  validateI18nFiles();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

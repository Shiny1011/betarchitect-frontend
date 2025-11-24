#!/usr/bin/env node

/**
 * Script to sync locale constants with manifest.json
 * Reads content/manifest.json and updates src/constants/generated-locales.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const manifestPath = join(process.cwd(), 'content/manifest.json');
const generatedLocalesPath = join(process.cwd(), 'src/constants/generated-locales.ts');

try {
  console.log('🔄 Syncing locale constants with manifest...');

  // Read manifest
  const manifestContent = readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestContent);

  if (!manifest.locales || !Array.isArray(manifest.locales)) {
    throw new Error('Invalid manifest: missing or invalid locales array');
  }

  if (!manifest.defaultLocale) {
    throw new Error('Invalid manifest: missing defaultLocale');
  }

  // Read current generated-locales.ts content (or create template if not exists)
  let generatedContent;
  try {
    generatedContent = readFileSync(generatedLocalesPath, 'utf-8');
  } catch (error) {
    // Create template if file doesn't exist
    generatedContent = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Generated from content/manifest.json on ${new Date().toISOString()}

export const MANIFEST_SUPPORTED_LOCALES = [] as const;
export const MANIFEST_DEFAULT_LOCALE = '' as const;

export type CanonicalLocale = (typeof MANIFEST_SUPPORTED_LOCALES)[number];
`;
  }

  // Generate new locale constants
  const localesArray = manifest.locales.map((locale) => `'${locale}'`).join(', ');
  const newDefaultLocale = `'${manifest.defaultLocale}' as const`;
  const newSupportedLocales = `[${localesArray}] as const`;

  console.log(`📝 Found ${manifest.locales.length} locales: ${manifest.locales.join(', ')}`);
  console.log(`📝 Default locale: ${manifest.defaultLocale}`);

  // Replace MANIFEST_DEFAULT_LOCALE
  let updatedContent = generatedContent.replace(
    /export const MANIFEST_DEFAULT_LOCALE = .* as const;/,
    `export const MANIFEST_DEFAULT_LOCALE = ${newDefaultLocale};`
  );

  // Replace MANIFEST_SUPPORTED_LOCALES
  updatedContent = updatedContent.replace(
    /export const MANIFEST_SUPPORTED_LOCALES = \[.*?\] as const;/s,
    `export const MANIFEST_SUPPORTED_LOCALES = ${newSupportedLocales};`
  );

  // Update generation timestamp
  updatedContent = updatedContent.replace(
    /\/\/ Generated from content\/manifest\.json.*/,
    `// Generated from content/manifest.json on ${new Date().toISOString()}`
  );

  // Write updated generated-locales.ts
  writeFileSync(generatedLocalesPath, updatedContent, 'utf-8');

  console.log('✅ Locale constants updated successfully!');
  console.log(`  MANIFEST_DEFAULT_LOCALE: ${manifest.defaultLocale}`);
  console.log(`  MANIFEST_SUPPORTED_LOCALES: [${manifest.locales.join(', ')}]`);
  console.log(`  Updated file: ${generatedLocalesPath}`);
} catch (error) {
  console.error('❌ Failed to sync locale constants:', error.message);
  process.exit(1);
}

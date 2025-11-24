#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

import { parse } from 'csv-parse/sync';

// Required pages that must exist for default locale
export const REQUIRED_PAGES = ['terms-and-conditions', 'vip', 'bonuses'];

/**
 * Get locales from strings.csv headers
 */
export function getLocalesFromStringsCSV() {
  const projectRoot = process.cwd();
  const stringsPath = path.join(projectRoot, 'content/raw/strings.csv');

  if (!fs.existsSync(stringsPath)) {
    throw new Error(`strings.csv not found at ${stringsPath}`);
  }

  const csvContent = fs.readFileSync(stringsPath, 'utf-8');
  const data = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  if (data.length === 0) {
    throw new Error('strings.csv is empty');
  }

  const headers = Object.keys(data[0]);
  // Remove 'key' column to get locales
  const locales = headers.filter((header) => header !== 'key');

  if (locales.length === 0) {
    throw new Error('No locale columns found in strings.csv');
  }

  return {
    locales,
    defaultLocale: locales.includes('en-GB') ? 'en-GB' : locales[0],
  };
}

/**
 * Get locales from pages.csv data
 */
export function getLocalesFromPagesCSV() {
  const projectRoot = process.cwd();
  const pagesPath = path.join(projectRoot, 'content/raw/pages.csv');

  if (!fs.existsSync(pagesPath)) {
    throw new Error(`pages.csv not found at ${pagesPath}`);
  }

  const csvContent = fs.readFileSync(pagesPath, 'utf-8');
  const data = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    quote: '"',
    escape: '"',
  });

  if (data.length === 0) {
    throw new Error('pages.csv is empty');
  }

  // Get unique locales from CSV data
  const locales = [...new Set(data.map((row) => row.locale))].sort();
  const defaultLocale = locales.includes('en-GB') ? 'en-GB' : locales[0];

  return { locales, defaultLocale };
}

/**
 * Get unified locale configuration from CSV files
 * Uses strings.csv as primary source, validates against pages.csv
 */
export function getUnifiedLocaleConfig() {
  const stringsConfig = getLocalesFromStringsCSV();
  const pagesConfig = getLocalesFromPagesCSV();

  // Validate that both CSV files have consistent locales
  const stringsLocales = new Set(stringsConfig.locales);
  const pagesLocales = new Set(pagesConfig.locales);

  const missingInStrings = pagesConfig.locales.filter((locale) => !stringsLocales.has(locale));
  const missingInPages = stringsConfig.locales.filter((locale) => !pagesLocales.has(locale));

  if (missingInStrings.length > 0) {
    console.warn(`⚠️ Locales in pages.csv but missing in strings.csv: ${missingInStrings.join(', ')}`);
  }

  if (missingInPages.length > 0) {
    console.warn(`⚠️ Locales in strings.csv but missing in pages.csv: ${missingInPages.join(', ')}`);
  }

  // Use strings.csv as source of truth (it has more complete translation coverage)
  return stringsConfig;
}

#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { parse } from 'csv-parse/sync';

import { getUnifiedLocaleConfig, REQUIRED_PAGES } from './shared-config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get project root directory
const projectRoot = path.resolve(__dirname, '..');
const contentDir = path.join(projectRoot, 'content');
const rawDir = path.join(contentDir, 'raw');
const pagesDir = path.join(contentDir, 'pages');

// Initialize locales from CSV using shared function
const { locales, defaultLocale } = getUnifiedLocaleConfig();
const MANIFEST_SUPPORTED_LOCALES = locales;
const MANIFEST_DEFAULT_LOCALE = defaultLocale;

/**
 * Generate page files from pages.csv using csv-parse
 */
function generatePageFiles() {
  console.log('🔄 Generating page files from pages.csv...');

  // Read pages.csv
  const pagesPath = path.join(rawDir, 'pages.csv');
  if (!fs.existsSync(pagesPath)) {
    throw new Error(`pages.csv not found at ${pagesPath}`);
  }

  const csvContent = fs.readFileSync(pagesPath, 'utf-8');

  // Parse CSV using csv-parse library
  const data = parse(csvContent, {
    columns: true, // Use first row as column headers
    skip_empty_lines: true,
    trim: true,
    quote: '"',
    escape: '"',
  });

  console.log(`📊 Parsed ${data.length} rows from CSV`);

  // Validate required headers
  const requiredHeaders = ['slug', 'locale', 'meta_title', 'body_md', 'meta_description'];
  const firstRow = data[0] || {};
  const headers = Object.keys(firstRow);
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
  if (missingHeaders.length > 0) {
    throw new Error(`Missing headers in pages.csv: ${missingHeaders.join(', ')}`);
  }

  // Validate locales in CSV
  const csvLocales = [...new Set(data.map((row) => row.locale))];
  const invalidLocales = csvLocales.filter((locale) => !MANIFEST_SUPPORTED_LOCALES.includes(locale));
  if (invalidLocales.length > 0) {
    throw new Error(
      `Invalid locales in pages.csv: ${invalidLocales.join(', ')}. Supported locales: ${MANIFEST_SUPPORTED_LOCALES.join(', ')}`
    );
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
    throw new Error(`Duplicate (slug, locale) combinations found: ${duplicates.join(', ')}`);
  }

  // Ensure pages directory exists
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  // Group data by slug
  const pagesBySlug = {};
  data.forEach((row) => {
    if (!pagesBySlug[row.slug]) {
      pagesBySlug[row.slug] = [];
    }
    pagesBySlug[row.slug].push(row);
  });

  // Generate files for each slug
  Object.entries(pagesBySlug).forEach(([slug, pages]) => {
    const slugDir = path.join(pagesDir, slug);
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true });
    }

    pages.forEach((page) => {
      // Generate markdown file
      const markdownPath = path.join(slugDir, `${page.locale}.md`);
      fs.writeFileSync(markdownPath, page.body_md, 'utf-8');

      // Generate meta.json file
      const metaPath = path.join(slugDir, `${page.locale}.meta.json`);
      const meta = {
        title: page.meta_title,
        slug: page.slug,
        locale: page.locale,
        meta_description: page.meta_description,
        generated_at: new Date().toISOString(),
      };
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
    });

    console.log(`✅ Generated ${pages.length} files for slug: ${slug}`);
  });

  console.log('✅ Page files generation completed!');
  return pagesBySlug;
}

/**
 * Validate page files
 */
function validatePageFiles() {
  console.log('🔍 Validating page files...');

  // Check if all required pages exist for default locale
  const missingPages = REQUIRED_PAGES.filter((slug) => {
    const defaultLocalePath = path.join(pagesDir, slug, `${MANIFEST_DEFAULT_LOCALE}.md`);
    return !fs.existsSync(defaultLocalePath);
  });

  if (missingPages.length > 0) {
    throw new Error(
      `Required pages missing for default locale (${MANIFEST_DEFAULT_LOCALE}): ${missingPages.join(', ')}`
    );
  }

  // Validate that each page directory has consistent files
  const slugs = fs.readdirSync(pagesDir).filter((item) => {
    const itemPath = path.join(pagesDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  slugs.forEach((slug) => {
    const slugDir = path.join(pagesDir, slug);
    const files = fs.readdirSync(slugDir);

    const markdownFiles = files.filter((file) => file.endsWith('.md'));
    const metaFiles = files.filter((file) => file.endsWith('.meta.json'));

    // Check that each markdown file has corresponding meta file
    markdownFiles.forEach((mdFile) => {
      const locale = path.basename(mdFile, '.md');
      const metaFile = `${locale}.meta.json`;

      if (!metaFiles.includes(metaFile)) {
        console.warn(`⚠️ Missing meta file for ${slug}/${mdFile}`);
      }
    });
  });

  console.log('✅ Page files validation completed!');
}

/**
 * Generate manifest.json
 */
function generateManifest(pagesBySlug) {
  console.log('🔄 Generating manifest.json...');

  const manifest = {
    locales: MANIFEST_SUPPORTED_LOCALES,
    defaultLocale: MANIFEST_DEFAULT_LOCALE,
    pages: {},
  };

  // Add pages information
  Object.entries(pagesBySlug).forEach(([slug, pages]) => {
    manifest.pages[slug] = pages.map((page) => page.locale).sort();
  });

  // Write manifest.json
  const manifestPath = path.join(contentDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(`✅ Generated manifest.json with ${Object.keys(manifest.pages).length} pages`);
  console.log('📋 Manifest contents:', JSON.stringify(manifest, null, 2));

  return manifest;
}

/**
 * Validate manifest and overall content structure
 */
function validateManifest(manifest) {
  console.log('🔍 Validating manifest and content structure...');

  // Check that default locale is in locales array
  if (!manifest.locales.includes(manifest.defaultLocale)) {
    throw new Error(`Default locale ${manifest.defaultLocale} is not in locales array`);
  }

  // Check that all required pages exist
  const missingRequiredPages = REQUIRED_PAGES.filter((page) => !manifest.pages[page]);
  if (missingRequiredPages.length > 0) {
    throw new Error(`Required pages missing from manifest: ${missingRequiredPages.join(', ')}`);
  }

  // Check that required pages have default locale
  REQUIRED_PAGES.forEach((page) => {
    if (!manifest.pages[page] || !manifest.pages[page].includes(manifest.defaultLocale)) {
      throw new Error(`Required page "${page}" is missing default locale ${manifest.defaultLocale}`);
    }
  });

  console.log('✅ Manifest validation completed!');
}

// Main execution
try {
  const pagesBySlug = generatePageFiles();
  validatePageFiles();
  const manifest = generateManifest(pagesBySlug);
  validateManifest(manifest);

  console.log('🎉 All content generation and validation completed successfully!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

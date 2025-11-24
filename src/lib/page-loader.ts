import fs from 'fs';
import path from 'path';

import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { manifestReader } from './manifest-reader';

export interface PageMeta {
  title: string;
  slug: string;
  locale: string;
  meta_description: string;
  generated_at: string;
}

export interface PageContent {
  content: string;
  meta: PageMeta;
  sanitizedHtml: string;
}

export interface LoadPageResult {
  pageContent: PageContent;
  shouldRedirect: boolean;
  redirectLocale?: string;
}

/**
 * Load page meta + markdown from local files; process with remark-rehype pipeline; apply locale fallback per slug.
 *
 * Uses remark-parse → remark-rehype → rehype-sanitize → rehype-stringify pipeline.
 * Supports headings, links, lists, tables; blocks unsafe HTML.
 *
 * @param slug - The page slug to load
 * @param locale - The requested locale
 * @returns LoadPageResult with content and redirect information, or null if page doesn't exist
 */
export async function loadPage(slug: string, locale: string): Promise<LoadPageResult | null> {
  // Check what locales are available for this slug
  const availableLocale = manifestReader.getAvailableLocaleForSlug(slug, locale);

  if (!availableLocale) {
    // Slug doesn't exist for any locale - return null for 404
    return null;
  }

  const shouldRedirect = availableLocale !== locale;

  try {
    // Read markdown content
    const contentPath = path.join(process.cwd(), 'content', 'pages', slug, `${availableLocale}.md`);
    const content = fs.readFileSync(contentPath, 'utf-8');

    // Read metadata
    const metaPath = path.join(process.cwd(), 'content', 'pages', slug, `${availableLocale}.meta.json`);
    const meta: PageMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

    // Convert markdown to HTML using remark-rehype pipeline
    // remark-parse → remark-rehype → rehype-sanitize → rehype-stringify
    const processor = unified()
      .use(remarkParse) // Parse markdown to AST
      .use(remarkRehype) // Convert markdown AST to HTML AST
      .use(rehypeSanitize) // Sanitize HTML AST (blocks unsafe HTML)
      .use(rehypeStringify); // Convert HTML AST to string

    const sanitizedHtml = await processor.process(content);

    const pageContent: PageContent = {
      content,
      meta,
      sanitizedHtml: String(sanitizedHtml),
    };

    return {
      pageContent,
      shouldRedirect,
      redirectLocale: shouldRedirect ? availableLocale : undefined,
    };
  } catch (error) {
    // File exists in manifest but missing on disk - this shouldn't happen
    console.error(`Failed to load page ${slug}/${availableLocale}:`, error);
    return null;
  }
}

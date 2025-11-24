import fs from 'fs';
import path from 'path';

export interface ManifestData {
  locales: string[];
  defaultLocale: string;
  pages: Record<string, string[]>;
}

export interface StaticParam {
  locale: string;
  slug: string;
}

/**
 * Utility to read content/manifest.json and emit static params for Next.js App Router
 */
export class ManifestReader {
  private manifestPath: string;
  private manifestData: ManifestData | null = null;

  constructor(contentDir?: string) {
    const baseDir = contentDir || path.join(process.cwd(), 'content');
    this.manifestPath = path.join(baseDir, 'manifest.json');
  }

  /**
   * Read and parse manifest.json
   * Throws error if manifest is unreadable - causing build to fail
   */
  private readManifest(): ManifestData {
    if (this.manifestData) {
      return this.manifestData;
    }

    try {
      const manifestContent = fs.readFileSync(this.manifestPath, 'utf-8');
      this.manifestData = JSON.parse(manifestContent);

      // Validate manifest structure
      if (!this.manifestData?.locales || !this.manifestData?.pages) {
        throw new Error('Invalid manifest structure: missing locales or pages');
      }

      return this.manifestData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to read manifest from ${this.manifestPath}: ${error.message}`);
      }
      throw new Error(`Failed to read manifest from ${this.manifestPath}: Unknown error`);
    }
  }

  /**
   * Get all supported locales from manifest
   */
  getLocales(): string[] {
    const manifest = this.readManifest();
    return manifest.locales;
  }

  /**
   * Get default locale from manifest
   */
  getDefaultLocale(): string {
    const manifest = this.readManifest();
    return manifest.defaultLocale;
  }

  /**
   * Get all pages data from manifest
   */
  getPages(): Record<string, string[]> {
    const manifest = this.readManifest();
    return manifest.pages;
  }

  /**
   * Generate static params for all {locale, slug} combinations
   * For use with Next.js generateStaticParams()
   */
  generateStaticParams(): StaticParam[] {
    const manifest = this.readManifest();
    const params: StaticParam[] = [];

    Object.entries(manifest.pages).forEach(([slug, locales]) => {
      locales.forEach((locale) => {
        params.push({ locale, slug });
      });
    });

    return params;
  }

  /**
   * Check if a specific locale/slug combination exists in manifest
   */
  hasPage(locale: string, slug: string): boolean {
    const manifest = this.readManifest();
    return manifest.pages[slug]?.includes(locale) || false;
  }

  /**
   * Get available locales for a specific slug
   */
  getLocalesForSlug(slug: string): string[] {
    const manifest = this.readManifest();
    return manifest.pages[slug] || [];
  }

  /**
   * Get all slugs from manifest
   */
  getSlugs(): string[] {
    const manifest = this.readManifest();
    return Object.keys(manifest.pages);
  }

  /**
   * Check if slug exists for any locale
   */
  slugExists(slug: string): boolean {
    const manifest = this.readManifest();
    return slug in manifest.pages;
  }

  /**
   * Check if slug exists for default locale specifically
   */
  slugExistsForDefaultLocale(slug: string): boolean {
    const manifest = this.readManifest();
    return manifest.pages[slug]?.includes(manifest.defaultLocale) || false;
  }

  /**
   * Get the appropriate locale for a slug - returns requested locale if available,
   * default locale if slug exists there, or null if slug doesn't exist at all
   */
  getAvailableLocaleForSlug(slug: string, requestedLocale: string): string | null {
    const manifest = this.readManifest();
    const availableLocales = manifest.pages[slug];

    if (!availableLocales) {
      return null; // Slug doesn't exist at all
    }

    if (availableLocales.includes(requestedLocale)) {
      return requestedLocale; // Requested locale is available
    }

    if (availableLocales.includes(manifest.defaultLocale)) {
      return manifest.defaultLocale; // Fallback to default locale
    }

    return null; // Shouldn't happen with proper manifest
  }
}

// Singleton instance for convenience
export const manifestReader = new ManifestReader();

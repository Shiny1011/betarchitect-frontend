#!/usr/bin/env node

import { spawn } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Running ${path.basename(scriptPath)}...`);

    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: path.dirname(__dirname),
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${path.basename(scriptPath)} completed successfully`);
        resolve();
      } else {
        console.error(`❌ ${path.basename(scriptPath)} failed with exit code ${code}`);
        reject(new Error(`Script ${scriptPath} failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      console.error(`❌ Error running ${path.basename(scriptPath)}:`, error);
      reject(error);
    });
  });
}

/**
 * Generate all content
 */
async function generateAllContent() {
  try {
    console.log('🔄 Starting content generation...\n');

    // Run i18n generation first
    await runScript(path.join(__dirname, 'generate-i18n.mjs'));
    console.log('');

    // Then run pages generation (which also generates manifest)
    await runScript(path.join(__dirname, 'generate-pages.mjs'));
    console.log('');

    // Finally sync locale constants with the updated manifest
    await runScript(path.join(__dirname, 'sync-locale-constants.mjs'));
    console.log('');

    console.log('🎉 All content generation completed successfully!');
    console.log('\n📁 Generated files:');
    console.log('   • /content/i18n/*.json (translations)');
    console.log('   • /content/pages/{slug}/{locale}.md (page content)');
    console.log('   • /content/pages/{slug}/{locale}.meta.json (page metadata)');
    console.log('   • /content/manifest.json (availability manifest)');
    console.log('   • /src/constants/generated-locales.ts (locale constants)');
  } catch (error) {
    console.error('\n💥 Content generation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllContent();
}

export { generateAllContent };

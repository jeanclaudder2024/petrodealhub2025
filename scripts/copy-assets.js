import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Source and destination paths
const srcDir = join(__dirname, '../server/assets');
const destDir = join(__dirname, '../dist/assets');

// Copy assets directory
try {
  fs.ensureDirSync(destDir);
  fs.copySync(srcDir, destDir, { overwrite: true });
  console.log('✓ Assets copied successfully');
} catch (error) {
  console.error('Error copying assets:', error);
  process.exit(1);
}

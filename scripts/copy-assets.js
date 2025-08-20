const fs = require('fs-extra');
const path = require('path');

// Source and destination paths
const srcDir = path.join(__dirname, '../server/assets');
const destDir = path.join(__dirname, '../dist/assets');

// Copy assets directory
fs.ensureDirSync(destDir);
fs.copySync(srcDir, destDir, { overwrite: true });

console.log('Assets copied successfully!');

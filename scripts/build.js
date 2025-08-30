#!/usr/bin/env node
// scripts/build.js - Build script for static hosting with environment injection

const fs = require('fs');
const path = require('path');

console.log('🔨 Building Presibo for production...');

// Get build-time environment configuration
const buildConfig = {
  APP_ENV: 'production',
  APP_DEBUG: false,
  ENABLE_AI_SEARCH: process.env.ENABLE_AI_SEARCH !== 'false',
  ENABLE_ELDER_CARE: process.env.ENABLE_ELDER_CARE !== 'false',
  ENABLE_HEALTH_TIPS: process.env.ENABLE_HEALTH_TIPS !== 'false',
  SUPPORT_PHONE: process.env.SUPPORT_PHONE || '+234 703 281 0862',
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'info@presibo.com',
  APP_URL: process.env.APP_URL || 'https://presibo.com',
  ENABLE_HTTPS: true,
  BUILD_TIMESTAMP: new Date().toISOString()
};

// Generate environment script
const envScript = `
<script>
// Production environment configuration injected at build time
window.PRESIBO_ENV = ${JSON.stringify(buildConfig, null, 2)};
console.log('✅ Production build loaded:', window.PRESIBO_ENV.BUILD_TIMESTAMP);
</script>`;

// List of HTML files to process
const htmlFiles = [
  'index.html',
  'search.html',
  'about',
  'pay.html',
  'elders.html'
];

// Create build directory
const buildDir = path.join(__dirname, '../dist');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy and process HTML files
htmlFiles.forEach(fileName => {
  const sourcePath = path.join(__dirname, '../', fileName);
  const destPath = path.join(buildDir, fileName);
  
  if (fs.existsSync(sourcePath)) {
    let html = fs.readFileSync(sourcePath, 'utf8');
    
    // Inject environment script
    html = html.replace('</head>', `${envScript}\n</head>`);
    
    // Write to build directory
    fs.writeFileSync(destPath, html);
    console.log(`✅ Processed: ${fileName}`);
  } else {
    console.log(`⚠️  Skipped: ${fileName} (not found)`);
  }
});

// Copy assets directory
const assetsSource = path.join(__dirname, '../assets');
const assetsDest = path.join(buildDir, 'assets');

if (fs.existsSync(assetsSource)) {
  copyRecursiveSync(assetsSource, assetsDest);
  console.log('✅ Copied assets directory');
}

// Copy other static files
const staticFiles = ['.gitignore', 'favicon.ico', 'robots.txt'];
staticFiles.forEach(fileName => {
  const sourcePath = path.join(__dirname, '../', fileName);
  const destPath = path.join(buildDir, fileName);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied: ${fileName}`);
  }
});

console.log('🎉 Build completed! Files are in the dist/ directory');
console.log('📁 Deploy the dist/ directory to your hosting provider');

// Helper function to copy directories recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
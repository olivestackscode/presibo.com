// api/inject-env.js - Vercel Serverless Function for Environment Injection
const fs = require('fs');
const path = require('path');

// Production environment configuration
function getProductionConfig() {
  return {
    // Client-safe configuration only
    APP_ENV: process.env.NODE_ENV || 'production',
    APP_DEBUG: false, // Always false in production
    APP_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://presibo.com',
    ENABLE_AI_SEARCH: process.env.ENABLE_AI_SEARCH !== 'false',
    ENABLE_ELDER_CARE: process.env.ENABLE_ELDER_CARE !== 'false',
    ENABLE_HEALTH_TIPS: process.env.ENABLE_HEALTH_TIPS !== 'false',
    SUPPORT_PHONE: process.env.SUPPORT_PHONE || '+234 703 281 0862',
    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'info@presibo.com',
    ENABLE_HTTPS: true, // Always true in Vercel
  };
}

function generateEnvScript(config) {
  return `
<script>
// Production environment configuration injected at build time
window.PRESIBO_ENV = ${JSON.stringify(config, null, 2)};
console.log('✅ Production environment loaded:', window.PRESIBO_ENV.APP_ENV);
</script>`;
}

export default function handler(req, res) {
  try {
    const { page = 'index' } = req.query;
    
    // Determine which HTML file to serve
    let htmlFile;
    switch (page) {
      case 'search':
        htmlFile = 'search.html';
        break;
      case 'index':
      default:
        htmlFile = 'index.html';
        break;
    }
    
    // Read the HTML file
    const htmlPath = path.join(process.cwd(), htmlFile);
    let html;
    
    try {
      html = fs.readFileSync(htmlPath, 'utf8');
    } catch (error) {
      console.error(`Error reading ${htmlFile}:`, error);
      return res.status(404).json({ error: 'Page not found' });
    }
    
    // Get production configuration
    const config = getProductionConfig();
    
    // Generate environment script
    const envScript = generateEnvScript(config);
    
    // Inject environment script before closing head tag
    html = html.replace('</head>', `${envScript}\n</head>`);
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    // Send the modified HTML
    res.status(200).send(html);
    
  } catch (error) {
    console.error('Environment injection error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
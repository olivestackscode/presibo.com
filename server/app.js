// server/app.js - Express Server with Environment Injection
require('dotenv').config();
const express = require('express');
const path = require('path');
const ProductionConfig = require('./config');

const app = express();
const config = new ProductionConfig();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  if (config.getServerConfig().ENABLE_HTTPS) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '../'), {
  maxAge: config.getServerConfig().CACHE_DURATION * 1000
}));

// Environment configuration endpoint
app.get('/api/config', (req, res) => {
  res.json(config.getClientConfig());
});

// Dynamic environment injection for HTML pages
app.get(['/', '/index.html'], (req, res) => {
  const indexPath = path.join(__dirname, '../index.html');
  let html = require('fs').readFileSync(indexPath, 'utf8');
  
  // Inject environment configuration before closing head tag
  const envScript = `
  <script>
    ${config.generateClientEnvFile()}
  </script>`;
  
  html = html.replace('</head>', `${envScript}\n</head>`);
  res.send(html);
});

// Handle search page with environment injection
app.get('/search.html', (req, res) => {
  const searchPath = path.join(__dirname, '../search.html');
  let html = require('fs').readFileSync(searchPath, 'utf8');
  
  // Inject environment configuration
  const envScript = `
  <script>
    ${config.generateClientEnvFile()}
  </script>`;
  
  html = html.replace('</head>', `${envScript}\n</head>`);
  res.send(html);
});

// API proxy for Anthropic (keeps API key on server)
app.post('/api/health-search', express.json(), async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.trim().length < 3) {
      return res.status(400).json({ error: 'Query too short' });
    }
    
    const serverConfig = config.getServerConfig();
    
    const prompt = `You are Presibo AI, a medical AI assistant for Nigerian healthcare.

User Question: "${query}"

Provide a helpful response with:
1. Direct answer to the question
2. Medical information based on current guidelines
3. Practical recommendations
4. When to seek professional care

Keep responses clear and educational. Always recommend consulting healthcare professionals for diagnosis/treatment.`;

    const response = await fetch(serverConfig.ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': serverConfig.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: serverConfig.ANTHROPIC_MODEL,
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    res.json({ response: data.content[0].text });
    
  } catch (error) {
    console.error('Health search error:', error);
    res.status(500).json({ error: 'Search temporarily unavailable' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: config.getServerConfig().APP_ENV,
    timestamp: new Date().toISOString(),
    features: {
      aiSearch: config.getServerConfig().ENABLE_AI_SEARCH,
      elderCare: config.getServerConfig().ENABLE_ELDER_CARE,
      healthTips: config.getServerConfig().ENABLE_HEALTH_TIPS
    }
  });
});

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Presibo server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.getServerConfig().APP_ENV}`);
  console.log(`🔒 HTTPS: ${config.getServerConfig().ENABLE_HTTPS ? 'Enabled' : 'Disabled'}`);
  console.log(`🤖 AI Search: ${config.getServerConfig().ENABLE_AI_SEARCH ? 'Enabled' : 'Disabled'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;
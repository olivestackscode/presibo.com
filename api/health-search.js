// api/health-search.js - Vercel Serverless Function for AI Health Search
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { query } = req.body;
    
    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return res.status(400).json({ error: 'Query must be at least 3 characters long' });
    }
    
    if (query.length > 1000) {
      return res.status(400).json({ error: 'Query too long' });
    }
    
    // Check if AI search is enabled
    if (process.env.ENABLE_AI_SEARCH === 'false') {
      return res.status(503).json({ error: 'AI search is currently disabled' });
    }
    
    // Validate API key exists
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY not configured');
      return res.status(500).json({ error: 'Service configuration error' });
    }
    
    const prompt = `You are Presibo AI, a medical AI assistant for Nigerian healthcare.

User Question: "${query}"

Provide a helpful response with:
1. Direct answer to the question
2. Medical information based on current guidelines
3. Practical recommendations
4. When to seek professional care

Keep responses clear and educational. Always recommend consulting healthcare professionals for diagnosis/treatment.`;

    // Call Anthropic API
    const response = await fetch(process.env.ANTHROPIC_API_URL || 'https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      
      if (response.status === 401) {
        return res.status(500).json({ error: 'API authentication failed' });
      } else if (response.status === 429) {
        return res.status(429).json({ error: 'Service temporarily overloaded, please try again later' });
      } else {
        return res.status(500).json({ error: 'AI service temporarily unavailable' });
      }
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error('Unexpected API response structure:', data);
      return res.status(500).json({ error: 'Invalid response from AI service' });
    }

    // Return successful response
    res.status(200).json({ 
      response: data.content[0].text,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Health search error:', error);
    
    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return res.status(500).json({ error: 'Network error connecting to AI service' });
    }
    
    return res.status(500).json({ error: 'Search temporarily unavailable' });
  }
}
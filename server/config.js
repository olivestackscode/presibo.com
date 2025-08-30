// server/config.js - Presibo.com Production Environment Configuration
const fs = require('fs');
const path = require('path');

class ProductionConfig {
  constructor() {
    this.config = {
      // Environment Variables from System
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      ANTHROPIC_API_URL: process.env.ANTHROPIC_API_URL || 'https://api.anthropic.com/v1/messages',
      ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
      
      // Application Configuration
      APP_ENV: process.env.NODE_ENV || 'production',
      APP_DEBUG: process.env.APP_DEBUG === 'true',
      APP_URL: process.env.APP_URL || 'https://presibo.com',
      
      // Feature Flags
      ENABLE_AI_SEARCH: process.env.ENABLE_AI_SEARCH !== 'false',
      ENABLE_ELDER_CARE: process.env.ENABLE_ELDER_CARE !== 'false',
      ENABLE_HEALTH_TIPS: process.env.ENABLE_HEALTH_TIPS !== 'false',
      
      // Contact and Support
      SUPPORT_PHONE: process.env.SUPPORT_PHONE || '+234 703 281 0862',
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'info@presibo.com',
      
      // Security Settings
      ENABLE_HTTPS: process.env.ENABLE_HTTPS === 'true',
      SESSION_TIMEOUT: parseInt(process.env.SESSION_TIMEOUT || '3600'),
      
      // Performance
      CACHE_DURATION: parseInt(process.env.CACHE_DURATION || '86400'),
      API_RATE_LIMIT: parseInt(process.env.API_RATE_LIMIT || '100'),
    };
    
    this.validateProductionConfig();
  }
  
  validateProductionConfig() {
    const required = ['ANTHROPIC_API_KEY'];
    const missing = required.filter(key => !this.config[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    
    // Validate API key format
    if (this.config.ANTHROPIC_API_KEY && !this.config.ANTHROPIC_API_KEY.startsWith('sk-ant-')) {
      console.warn('Warning: ANTHROPIC_API_KEY does not appear to be in correct format');
    }
  }
  
  // Generate client-safe configuration (no sensitive data)
  getClientConfig() {
    return {
      APP_ENV: this.config.APP_ENV,
      APP_DEBUG: this.config.APP_DEBUG,
      APP_URL: this.config.APP_URL,
      ENABLE_AI_SEARCH: this.config.ENABLE_AI_SEARCH,
      ENABLE_ELDER_CARE: this.config.ENABLE_ELDER_CARE,
      ENABLE_HEALTH_TIPS: this.config.ENABLE_HEALTH_TIPS,
      SUPPORT_PHONE: this.config.SUPPORT_PHONE,
      SUPPORT_EMAIL: this.config.SUPPORT_EMAIL,
      ENABLE_HTTPS: this.config.ENABLE_HTTPS,
      // Note: API keys are NOT included in client config
    };
  }
  
  // Get server-only configuration
  getServerConfig() {
    return this.config;
  }
  
  // Generate environment JavaScript file for injection
  generateClientEnvFile() {
    const clientConfig = this.getClientConfig();
    return `
// Auto-generated environment configuration for Presibo.com production
// DO NOT EDIT - Generated from server environment variables
window.PRESIBO_ENV = ${JSON.stringify(clientConfig, null, 2)};
console.log('Production environment configuration loaded');
`;
  }
}

module.exports = ProductionConfig;
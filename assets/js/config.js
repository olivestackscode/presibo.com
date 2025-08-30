// Environment Configuration for Presibo
// This file manages environment variables and API configurations

class EnvironmentConfig {
  constructor() {
    this.config = {
      // Anthropic AI Configuration
      ANTHROPIC_API_KEY: this.getEnvVar('ANTHROPIC_API_KEY', 'your_anthropic_api_key_here'),
      ANTHROPIC_API_URL: this.getEnvVar('ANTHROPIC_API_URL', 'https://api.anthropic.com/v1/messages'),
      ANTHROPIC_MODEL: this.getEnvVar('ANTHROPIC_MODEL', 'claude-3-sonnet-20240229'),
      
      // Application Configuration
      APP_ENV: this.getEnvVar('APP_ENV', 'development'),
      APP_DEBUG: this.getEnvVar('APP_DEBUG', 'true') === 'true',
      APP_URL: this.getEnvVar('APP_URL', 'http://localhost:8080'),
      
      // Feature Flags
      ENABLE_AI_SEARCH: this.getEnvVar('ENABLE_AI_SEARCH', 'true') === 'true',
      ENABLE_ELDER_CARE: this.getEnvVar('ENABLE_ELDER_CARE', 'true') === 'true',
      ENABLE_HEALTH_TIPS: this.getEnvVar('ENABLE_HEALTH_TIPS', 'true') === 'true',
      
      // Contact Information
      SUPPORT_PHONE: this.getEnvVar('SUPPORT_PHONE', '+234 703 281 0862'),
      SUPPORT_EMAIL: this.getEnvVar('SUPPORT_EMAIL', 'info@presibo.com'),
      
      // API Endpoints
      API_BASE_URL: this.getEnvVar('API_BASE_URL', 'https://api.presibo.com'),
      
      // Security Settings
      ENABLE_HTTPS: this.getEnvVar('ENABLE_HTTPS', 'false') === 'true',
      SESSION_TIMEOUT: parseInt(this.getEnvVar('SESSION_TIMEOUT', '3600')), // 1 hour
    };
    
    // Validate required configurations
    this.validateConfig();
  }
  
  /**
   * Get environment variable with fallback
   * In production, this would read from actual environment variables
   * For static sites, we use localStorage or predefined values
   */
  getEnvVar(key, defaultValue = null) {
    // Try to get from localStorage first (for dynamic configuration)
    const localValue = localStorage.getItem(`PRESIBO_${key}`);
    if (localValue !== null) {
      return localValue;
    }
    
    // Try to get from global window object (if set elsewhere)
    if (window.PRESIBO_ENV && window.PRESIBO_ENV[key]) {
      return window.PRESIBO_ENV[key];
    }
    
    // Return default value
    return defaultValue;
  }
  
  /**
   * Validate required configuration
   */
  validateConfig() {
    const requiredKeys = ['ANTHROPIC_API_KEY'];
    const missing = [];
    
    for (const key of requiredKeys) {
      if (!this.config[key] || this.config[key] === 'your_' + key.toLowerCase() + '_here') {
        missing.push(key);
      }
    }
    
    if (missing.length > 0) {
      console.warn('Missing required environment variables:', missing);
      if (this.config.APP_ENV === 'production') {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
      }
    }
  }
  
  /**
   * Get configuration value
   */
  get(key) {
    return this.config[key];
  }
  
  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(feature) {
    const key = `ENABLE_${feature.toUpperCase()}`;
    return this.config[key] === true;
  }
  
  /**
   * Get API configuration for Anthropic
   */
  getAnthropicConfig() {
    return {
      apiKey: this.config.ANTHROPIC_API_KEY,
      apiUrl: this.config.ANTHROPIC_API_URL,
      model: this.config.ANTHROPIC_MODEL,
    };
  }
  
  /**
   * Check if we're in development mode
   */
  isDevelopment() {
    return this.config.APP_ENV === 'development';
  }
  
  /**
   * Check if we're in production mode
   */
  isProduction() {
    return this.config.APP_ENV === 'production';
  }
  
  /**
   * Get debug mode status
   */
  isDebugEnabled() {
    return this.config.APP_DEBUG;
  }
  
  /**
   * Update configuration dynamically
   */
  updateConfig(key, value) {
    this.config[key] = value;
    localStorage.setItem(`PRESIBO_${key}`, value);
  }
  
  /**
   * Clear all stored configuration
   */
  clearStoredConfig() {
    const keys = Object.keys(this.config);
    keys.forEach(key => {
      localStorage.removeItem(`PRESIBO_${key}`);
    });
  }
}

// Create global instance
window.PresiboConfig = new EnvironmentConfig();

// Export for ES6 modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnvironmentConfig;
}

// Debug logging in development
if (window.PresiboConfig.isDevelopment() && window.PresiboConfig.isDebugEnabled()) {
  console.log('Presibo Configuration Loaded:', {
    environment: window.PresiboConfig.get('APP_ENV'),
    features: {
      aiSearch: window.PresiboConfig.isFeatureEnabled('AI_SEARCH'),
      elderCare: window.PresiboConfig.isFeatureEnabled('ELDER_CARE'),
      healthTips: window.PresiboConfig.isFeatureEnabled('HEALTH_TIPS'),
    },
    apiConfigured: !!window.PresiboConfig.get('ANTHROPIC_API_KEY'),
  });
}
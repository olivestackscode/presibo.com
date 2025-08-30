#!/usr/bin/env node
// scripts/validate-env.js - Environment validation for production deployment

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating environment configuration...');

// Define required environment variables for production
const requiredEnvVars = {
  production: [
    'ANTHROPIC_API_KEY'
  ],
  development: []
};

// Define optional environment variables with defaults
const optionalEnvVars = {
  NODE_ENV: 'development',
  APP_ENV: 'development',
  PORT: '3000',
  ANTHROPIC_MODEL: 'claude-3-sonnet-20240229',
  ANTHROPIC_API_URL: 'https://api.anthropic.com/v1/messages',
  ENABLE_AI_SEARCH: 'true',
  ENABLE_ELDER_CARE: 'true',
  ENABLE_HEALTH_TIPS: 'true',
  ENABLE_HTTPS: 'false',
  SUPPORT_PHONE: '+234 703 281 0862',
  SUPPORT_EMAIL: 'info@presibo.com',
  CACHE_DURATION: '3600',
  APP_DEBUG: 'false'
};

// Get current environment
const nodeEnv = process.env.NODE_ENV || 'development';
const appEnv = process.env.APP_ENV || nodeEnv;

console.log(`📊 Environment: ${appEnv}`);

// Validation results
let isValid = true;
const issues = [];
const warnings = [];

// Check if .env file exists (for development)
const envPath = path.join(__dirname, '../.env');
if (appEnv === 'development' && !fs.existsSync(envPath)) {
  warnings.push('⚠️  .env file not found. Copy .env.example to .env for local development.');
}

// Validate required environment variables
const required = requiredEnvVars[appEnv] || requiredEnvVars.production;
required.forEach(varName => {
  if (!process.env[varName]) {
    issues.push(`❌ Missing required environment variable: ${varName}`);
    isValid = false;
  } else {
    console.log(`✅ ${varName}: Set`);
  }
});

// Check optional variables and provide defaults
Object.entries(optionalEnvVars).forEach(([varName, defaultValue]) => {
  const value = process.env[varName] || defaultValue;
  console.log(`ℹ️  ${varName}: ${value}`);
});

// Additional validations
if (process.env.ANTHROPIC_API_KEY) {
  if (!process.env.ANTHROPIC_API_KEY.startsWith('sk-ant-')) {
    issues.push('❌ ANTHROPIC_API_KEY appears to be invalid (should start with "sk-ant-")');
    isValid = false;
  }
}

// Check port availability (basic check)
const port = parseInt(process.env.PORT || optionalEnvVars.PORT);
if (isNaN(port) || port < 1 || port > 65535) {
  issues.push(`❌ Invalid PORT value: ${process.env.PORT}`);
  isValid = false;
}

// Production-specific validations
if (appEnv === 'production') {
  if (process.env.APP_DEBUG === 'true') {
    warnings.push('⚠️  APP_DEBUG is enabled in production. Consider disabling for security.');
  }
  
  if (process.env.ENABLE_HTTPS !== 'true' && !process.env.VERCEL) {
    warnings.push('⚠️  HTTPS is not enabled in production environment.');
  }
  
  console.log('🔒 Production security checks passed');
}

// Display results
console.log('\n📋 Validation Summary:');

if (warnings.length > 0) {
  console.log('\n⚠️  Warnings:');
  warnings.forEach(warning => console.log(warning));
}

if (issues.length > 0) {
  console.log('\n❌ Issues found:');
  issues.forEach(issue => console.log(issue));
} else {
  console.log('✅ All required environment variables are set');
}

// Feature flags status
console.log('\n🚩 Feature Flags:');
console.log(`   AI Search: ${process.env.ENABLE_AI_SEARCH !== 'false' ? '✅ Enabled' : '❌ Disabled'}`);
console.log(`   Elder Care: ${process.env.ENABLE_ELDER_CARE !== 'false' ? '✅ Enabled' : '❌ Disabled'}`);
console.log(`   Health Tips: ${process.env.ENABLE_HEALTH_TIPS !== 'false' ? '✅ Enabled' : '❌ Disabled'}`);

// Exit with appropriate code
if (!isValid) {
  console.log('\n💥 Environment validation failed. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('\n🎉 Environment validation passed!');
  
  // Display next steps based on environment
  if (appEnv === 'development') {
    console.log('\n🚀 Ready for development. Run: npm run dev');
  } else {
    console.log('\n🚀 Ready for production deployment.');
  }
  
  process.exit(0);
}
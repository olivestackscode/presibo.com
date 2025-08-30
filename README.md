# Presibo Healthcare Platform

AI-powered healthcare platform making quality medical care accessible to all Nigerians.

## Features

- 🤖 **AI-Powered Health Search** - Get instant answers to health questions
- 👨‍⚕️ **Doctor Consultations** - Connect with verified healthcare professionals  
- 👴 **Elder Care Services** - Specialized care for elderly patients
- 💊 **Health Tips Daily** - Personalized wellness advice
- 📱 **Smart Navigation** - Intelligent routing based on user intent

## Quick Start

### 1. Environment Setup

Copy the environment template and configure your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Required: Anthropic AI API Key for health search
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: Other service configurations
PAYSTACK_PUBLIC_KEY=your_paystack_key
MAIL_HOST=your_mail_host
```

### 2. Local Development

Start a local web server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

### 3. Access the Application

Open your browser and navigate to:
- **Homepage**: `http://localhost:8080`
- **Health Search**: `http://localhost:8080/search.html`
- **Elder Care**: `http://localhost:8080/elders.html`
- **About**: `http://localhost:8080/about`

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Anthropic Claude AI API key for health search | Yes |
| `ANTHROPIC_MODEL` | AI model to use (default: claude-3-sonnet-20240229) | No |
| `APP_ENV` | Environment mode (development/production) | No |
| `ENABLE_AI_SEARCH` | Enable/disable AI search feature | No |
| `ENABLE_ELDER_CARE` | Enable/disable elder care features | No |
| `SUPPORT_PHONE` | Support contact number | No |

### Feature Flags

Control which features are enabled using environment variables:

```env
ENABLE_AI_SEARCH=true
ENABLE_ELDER_CARE=true
ENABLE_HEALTH_TIPS=true
```

## API Integration

### Anthropic Claude AI

The health search feature uses Anthropic's Claude AI for intelligent health responses:

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Add it to your `.env` file
3. The system will automatically use it for health question processing

### Configuration Management

The platform uses a centralized configuration system (`assets/js/config.js`) that:

- Loads environment variables securely
- Provides fallback values for development
- Validates required configurations
- Supports feature flags

## File Structure

```
presibo.com/
├── assets/
│   ├── css/
│   ├── js/
│   │   ├── config.js          # Environment configuration
│   │   └── main.js            # Main application scripts
│   └── img/
├── search.html                # AI health search page
├── elders.html               # Elder care services
├── about                     # About page
├── pay.html                  # Payment and subscriptions
├── index.html                # Homepage with smart navigation
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## Security

### API Keys

- All API keys are stored in `.env` file
- `.env` is excluded from version control
- Use `.env.example` as a template
- Never commit sensitive data to repositories

### Environment Management

- Development: Uses local `.env` file
- Production: Use proper environment variable injection
- Staging: Use separate staging environment variables

## Development

### Smart Navigation System

The platform includes an intelligent navigation system that:

- Provides auto-completion for health queries
- Routes users to appropriate services
- Supports keyword-based navigation
- Includes accessibility features

### Adding New Features

1. Update environment configuration if needed
2. Add feature flags to control rollout
3. Update navigation suggestions if applicable
4. Test with both enabled/disabled states

## Deployment

### Production Environment Variable Injection

Presibo supports multiple production deployment methods with secure environment variable injection:

#### Method 1: Vercel Serverless (Recommended - Zero Config!)

Your project is already configured for Vercel deployment:

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Set environment variables in Vercel dashboard or CLI
vercel env add ANTHROPIC_API_KEY production
# Enter your API key when prompted

vercel env add ENABLE_AI_SEARCH production
# Enter: true

# 4. Deploy
vercel --prod
```

#### Method 2: Node.js/Express Server

Run the full Express server with environment injection:

```bash
# 1. Install dependencies
npm install

# 2. Validate environment
npm run validate-env

# 3. Set production environment variables
export NODE_ENV=production
export ANTHROPIC_API_KEY=your_key_here
export ENABLE_AI_SEARCH=true

# 4. Start the server
npm start
```

#### Method 3: Static Build with Environment Injection

Build static files with environment variables injected at build time:

```bash
# 1. Set build environment variables
export ENABLE_AI_SEARCH=true
export SUPPORT_PHONE="+234 703 281 0862"
export APP_URL="https://yourdomain.com"

# 2. Build for production
npm run build:production

# 3. Deploy the dist/ directory to any static hosting
# (Netlify, GitHub Pages, AWS S3, etc.)
```

#### Method 4: Docker Deployment

```bash
# 1. Set environment variables in .env file or docker-compose.yml
echo "ANTHROPIC_API_KEY=your_key_here" > .env.production

# 2. Build and run with Docker Compose
npm run deploy:docker

# Or manually with Docker
docker build -t presibo.com .
docker run -p 3000:3000 --env-file .env.production presibo.com
```

### Platform-Specific Setup

#### Vercel
```bash
# Environment variables in Vercel dashboard:
ANTHROPIC_API_KEY=sk-ant-api03-...
ENABLE_AI_SEARCH=true
ENABLE_ELDER_CARE=true
SUPPORT_PHONE=+234 703 281 0862
```

#### Netlify
```bash
# In Netlify dashboard > Site settings > Environment variables
ANTHROPIC_API_KEY=sk-ant-api03-...
ENABLE_AI_SEARCH=true
BUILD_COMMAND=npm run build:production
PUBLISH_DIRECTORY=dist
```

#### Heroku
```bash
heroku config:set ANTHROPIC_API_KEY=sk-ant-api03-...
heroku config:set ENABLE_AI_SEARCH=true
heroku config:set NODE_ENV=production
```

#### AWS/DigitalOcean/VPS
```bash
# Upload your .env.production file
scp .env.production user@server:/app/

# SSH into server and start
ssh user@server
cd /app
npm install --production
npm start
```

### Production Checklist

- [ ] Set `APP_ENV=production` 
- [ ] Configure all required API keys
- [ ] Enable HTTPS (`ENABLE_HTTPS=true`)
- [ ] Set appropriate session timeout
- [ ] Disable debug mode (`APP_DEBUG=false`)
- [ ] Verify all feature flags
- [ ] Test API connectivity

### Environment Variables in Production

Use your hosting platform's environment variable management:

- **Vercel**: Environment Variables in dashboard
- **Netlify**: Site settings > Environment variables  
- **Heroku**: Config vars in dashboard
- **cPanel**: Environment Variables in hosting panel

## Support

- **Phone**: +234 703 281 0862
- **Email**: info@presibo.com
- **Website**: https://presibo.com

## License

Copyright © 2025 Presibo. All rights reserved.

## 🔗 GitHub Setup

### Ready for GitHub Upload! ✅

Your project is now properly configured for GitHub upload with all security best practices:

```bash
# Initialize git repository
git init

# Add all files (sensitive files are excluded by .gitignore)
git add .

# Commit with descriptive message
git commit -m "Initial commit: Presibo AI-powered healthcare platform"

# Add GitHub remote
git remote add origin https://github.com/olivestackscode/presibo.com.git

# Push to GitHub
git push -u origin main
```

### 🔒 Security Features Implemented:
- ✅ API keys removed from source code
- ✅ Environment variables properly managed
- ✅ .env file excluded from version control
- ✅ Server-side API proxy for production
- ✅ Multiple secure deployment methods
- ✅ Environment validation scripts

### 👥 For Team Collaboration:
1. **New team members should**:
   ```bash
   git clone https://github.com/olivestackscode/presibo.com.git
   cd presibo.com
   cp .env.example .env
   # Edit .env and add their API keys
   npm install
   npm run validate-env
   ```

2. **Never commit**:
   - .env files
   - API keys
   - Sensitive credentials

### 📋 Security Checklist:
See [SECURITY_CHECKLIST.md](SECURITY_CHECKLIST.md) for complete security verification.
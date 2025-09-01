# Deploy to Vercel - Demo Mode

This project is configured to deploy to Vercel in demo mode without requiring any external services like Supabase.

## ✨ Recent Improvements

### Number Formatting
- **Fixed long decimal places**: All numbers now display with maximum 3 decimal places
- **Consistent formatting**: Added utility functions for currency, percentages, and scores
- **Better readability**: Confidence scores, ROI percentages, and financial values are properly formatted

### Dark Mode
- **Default theme**: Set to dark mode by default for better user experience
- **Theme toggle**: Users can still switch between light and dark modes using the toggle in the navbar
- **System preference**: Respects user's system theme preference when enabled

## Quick Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Vercel will automatically detect this as a Next.js project
5. Click "Deploy" - no environment variables needed!

### Option 2: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the prompts and your demo will be live!

## What's Included in Demo Mode

✅ **Mock Supabase Client** - No database connection required  
✅ **Mock Data Generation** - All data comes from `lib/mockData.ts`  
✅ **Full UI Components** - Complete sponsorship analytics dashboard  
✅ **Responsive Design** - Works on all devices  
✅ **Dark/Light Mode** - Theme switching included  

## Environment Variables (Auto-Configured)

The demo automatically uses these mock values:
- `NEXT_PUBLIC_SUPABASE_URL`: Mock Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Mock authentication key
- `SUPABASE_SERVICE_ROLE_KEY`: Mock service key

## Production Setup (Optional)

If you want to connect real services later:

1. **Supabase**: Replace mock values in environment variables
2. **Stripe**: Add your Stripe keys for payments
3. **OpenAI**: Add API key for AI features
4. **AWS S3**: Add credentials for file uploads

## Demo Features

- 📊 Sponsorship Analytics Dashboard
- 📈 ROI Tracking and Reports  
- 🖼️ Computer Vision Analysis
- 📱 Social Media Sentiment
- 🏎️ Race Performance Metrics
- 💬 AI Chat Interface

All features work with realistic mock data!

# 🚀 Deployment Guide to Vercel

This guide will help you deploy your Map Explorer app to Vercel.

## Prerequisites

- A GitHub account (recommended) or Vercel account
- Node.js installed on your machine
- Your project code ready

## Step-by-Step Deployment

### Method 1: Deploy via GitHub (Easiest)

#### Step 1: Initialize Git Repository

```bash
# Navigate to your project directory
cd "/Volumes/Kingston XS1000 Media/tpi_tema_casa"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Map Explorer app"
```

#### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., "map-explorer")
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

#### Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings:
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
6. Click "Deploy"
7. Wait for deployment to complete (usually 1-2 minutes)
8. Your app will be live at a URL like: `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate.

#### Step 3: Deploy

```bash
# Navigate to your project
cd "/Volumes/Kingston XS1000 Media/tpi_tema_casa"

# Deploy (first time - preview)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? (Press Enter or type a name)
# - Directory? (Press Enter for current directory)
# - Override settings? No

# Deploy to production
vercel --prod
```

### Method 3: Deploy via Vercel Dashboard (Drag & Drop)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Click "Browse" or drag and drop your project folder
4. Vercel will detect Vite automatically
5. Click "Deploy"

## After Deployment

### Custom Domain (Optional)

1. Go to your project on Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables (If Needed)

If you add API keys later:
1. Go to project settings on Vercel
2. Click "Environment Variables"
3. Add your variables
4. Redeploy

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure `node_modules` is in `.gitignore`
- Verify build command: `npm run build`

### 404 Errors on Routes

- The `vercel.json` file handles this with rewrites
- All routes redirect to `index.html` for React Router compatibility

### Map Not Loading

- Check browser console for errors
- Ensure Leaflet CSS is loaded (already configured in `index.html`)
- Verify OpenStreetMap tiles are accessible

## Updating Your Deployment

### Via GitHub (Automatic)

1. Make changes to your code
2. Commit and push:
```bash
git add .
git commit -m "Update description"
git push
```
3. Vercel will automatically redeploy

### Via CLI

```bash
vercel --prod
```

## Project Structure

```
tpi_tema_casa/
├── src/              # Source code
├── dist/             # Build output (generated)
├── public/           # Static assets
├── package.json      # Dependencies
├── vite.config.js    # Vite configuration
├── vercel.json       # Vercel configuration
└── .gitignore        # Git ignore rules
```

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev


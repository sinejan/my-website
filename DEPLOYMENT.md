# GitHub Pages Deployment Guide

This project is configured for easy deployment to GitHub Pages using both manual and automated methods.

## 🚀 Quick Setup

### 1. Repository Setup
1. Push your code to a GitHub repository
2. Go to your repository settings
3. Navigate to **Pages** section
4. Set source to **GitHub Actions**

### 2. Update Repository Name
In `vite.config.ts`, update the base path to match your repository name:
```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

## 📦 Deployment Methods

### Method 1: Automatic Deployment (Recommended)
The project includes a GitHub Actions workflow that automatically deploys when you push to the `main` branch.

**Setup:**
1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be available at: `https://yourusername.github.io/your-repo-name/`

### Method 2: Manual Deployment
You can also deploy manually using the npm scripts:

```bash
# Install dependencies (if not already done)
npm install

# Build and deploy
npm run deploy
```

## 🔧 Configuration Files

### GitHub Actions Workflow
- **File:** `.github/workflows/deploy.yml`
- **Triggers:** Push to main branch
- **Actions:** Build, type-check, and deploy

### Vite Configuration
- **File:** `vite.config.ts`
- **Features:** 
  - Path aliases (@/ imports)
  - GitHub Pages base path
  - Optimized build settings

### Package Scripts
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to gh-pages branch
- `npm run type-check` - TypeScript type checking

## 🌐 Custom Domain (Optional)

To use a custom domain:
1. Add your domain to the `cname` field in `.github/workflows/deploy.yml`
2. Configure your domain's DNS to point to GitHub Pages
3. Add a CNAME file to your repository root

## 🔍 Troubleshooting

### Common Issues:
1. **404 errors:** Check that the base path in `vite.config.ts` matches your repository name
2. **Build failures:** Run `npm run type-check` locally to fix TypeScript errors
3. **Assets not loading:** Ensure all imports use the `@/` alias for proper path resolution

### Local Testing:
```bash
# Test the production build locally
npm run build
npm run preview
```

## 📁 Project Structure
```
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── src/                          # Source code
├── dist/                         # Built files (auto-generated)
├── vite.config.ts               # Vite configuration
├── package.json                 # Dependencies and scripts
└── index.html                   # Entry point
```

## 🎯 Next Steps
1. Update the repository name in `vite.config.ts`
2. Push to GitHub
3. Enable GitHub Pages in repository settings
4. Your portfolio will be live! 🎉
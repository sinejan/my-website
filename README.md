# Şehra Sinejan Eser - Portfolio Website

A beautiful, modern TypeScript portfolio website showcasing the professional journey of Şehra Sinejan Eser, a Junior Cloud Engineer specializing in AWS, DevOps, and cloud infrastructure.

## ✨ Features

- **Modern Design**: Beautiful glassmorphism effects with a professional feminine touch
- **Fully Responsive**: Optimized for all devices and screen sizes
- **TypeScript**: Type-safe development with modern ES modules
- **Modular Architecture**: Clean, maintainable code structure
- **Dynamic Content**: Data-driven content from JSON configuration
- **Smooth Animations**: Engaging user experience with CSS animations
- **Professional Color Palette**: Custom color system with B2B0E8, 3B38A0, 7A85C1, 1A2A80

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sinejan-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Alias for `npm run dev`
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
sinejan-portfolio/
├── public/
│   ├── images/
│   │   └── profile.svg          # Profile image
│   └── favicon.svg              # Site favicon
├── src/
│   ├── components/              # TypeScript components
│   │   ├── PortfolioApp.ts     # Main application
│   │   ├── HeroSection.ts      # Hero section component
│   │   ├── AboutSection.ts     # About section component
│   │   ├── ExperienceSection.ts # Experience timeline
│   │   ├── SkillsSection.ts    # Skills showcase
│   │   ├── EducationSection.ts # Education & certifications
│   │   └── ContactSection.ts   # Contact information
│   ├── data/
│   │   └── portfolio.json      # Portfolio data
│   ├── styles/
│   │   ├── main.css           # Main stylesheet
│   │   └── colors.css         # Color system
│   ├── types/
│   │   └── portfolio.ts       # TypeScript interfaces
│   ├── utils/
│   │   └── DataLoader.ts      # Data loading utilities
│   └── main.ts                # Application entry point
├── index.html                 # Main HTML file
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🎨 Design Features

### Color Palette
- **Lavender** (#B2B0E8) - Primary accent color
- **Deep Purple** (#3B38A0) - Main brand color
- **Periwinkle** (#7A85C1) - Secondary accent
- **Navy Blue** (#1A2A80) - Dark accent

### Glassmorphism Effects
- Translucent backgrounds with backdrop blur
- Subtle borders and shadows
- Layered depth with proper z-indexing
- Smooth hover transitions

### Typography
- **Playfair Display** - Elegant serif for headings
- **Inter** - Clean sans-serif for body text
- Responsive font sizing with clamp()

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## 🔧 Customization

### Updating Content
Edit `src/data/portfolio.json` to update:
- Personal information
- Work experience
- Education details
- Skills and certifications
- Contact information

### Modifying Colors
Update the color system in `src/styles/colors.ts` and `src/styles/colors.css`

### Adding New Sections
1. Create a new component in `src/components/`
2. Add the component to `PortfolioApp.ts`
3. Update the HTML structure in `index.html`
4. Add corresponding styles in `src/styles/main.css`

## 🌟 Key Sections

1. **Hero Section** - Introduction with animated name typing
2. **About Section** - Professional summary and core skills
3. **Experience Timeline** - Work history with detailed descriptions
4. **Skills Showcase** - Technical skills organized by category
5. **Education & Certifications** - Academic background and professional certifications
6. **Contact Section** - Professional contact information with copy-to-clipboard functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👩‍💻 About

Created for Şehra Sinejan Eser - Junior Cloud Engineer passionate about AWS, DevOps, and cloud technologies.

**Contact:**
- Email: sehrasinejan@gmail.com
- LinkedIn: [sinejaneser](https://linkedin.com/in/sinejaneser)
- Location: Istanbul, Şişli, Türkiye

---

Built with ❤️ using TypeScript, Vite, and modern web technologies.

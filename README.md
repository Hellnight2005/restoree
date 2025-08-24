# Réstorée - Luxury Restoration Website

A premium Next.js 14 website for Réstorée, a luxury restoration brand specializing in bags, shoes, and accessories.

## 🚀 Features

- **Modern Design**: Elegant, luxury-focused design with premium aesthetics
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Advanced Animations**: GSAP animations and Framer Motion transitions
- **SEO Optimized**: Built with Next.js 14 and proper meta tags
- **Performance**: Optimized images and smooth scrolling

## 🎨 Brand Colors

- **Fawn** (#D4AB6C) - Accent/CTA color
- **Platinum** (#EAE6DD) - Background (Light mode)
- **Anti-Flash White** (#F1F1F1) - Secondary background/Cards

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts (for admin dashboard)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── gallery/           # Gallery page
│   ├── contact/           # Contact/Booking page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Hero section component
│   ├── ServiceHighlights.tsx # Service cards
│   ├── BeforeAfterShowcase.tsx # Before/after slider
│   └── BrandStoryCTA.tsx  # Brand story section
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── hooks/                 # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restoree-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages

### 1. Home Page
- Hero section with "Revive Your Vibe" headline
- Service highlights carousel
- Before & after showcase
- Brand story CTA

### 2. About Page
- Brand mission and vision
- Company journey timeline
- Craftsmanship process

### 3. Services Page
- Individual service sections
- Step-by-step process
- Timeline information
- Before & after images

### 4. Gallery Page
- Filterable image gallery
- Category-based organization
- Hover effects and animations

### 5. Contact/Booking Page
- Consultation booking form
- Service selection
- Date/time picker

## 🎭 Animations

- **GSAP ScrollTrigger**: Section reveal animations
- **Framer Motion**: Page transitions and micro-interactions
- **Parallax Effects**: Background parallax on hero sections
- **Hover Animations**: Subtle scale and shadow effects

## 🌙 Theme System

- Light/Dark mode toggle
- System preference detection
- localStorage persistence
- Smooth transitions

## 📊 Admin Dashboard (Future)

- Booking management
- Service management
- Gallery management
- Analytics and reporting

## 🔧 Customization

### Colors
Update colors in `tailwind.config.js`:
```javascript
colors: {
  fawn: '#D4AB6C',
  platinum: '#EAE6DD',
  'anti-flash': '#F1F1F1',
  // ... more colors
}
```

### Fonts
The project uses Copperplate Gothic for headings. Update in `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Copperplate+Gothic:wght@400;600;700&display=swap');
```

## 📈 Performance

- Image optimization with Next.js Image component
- Lazy loading for components
- Optimized bundle splitting
- SEO-friendly meta tags

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
Build the project and deploy the `out` folder to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, contact the development team.

---

Built with ❤️ for Réstorée

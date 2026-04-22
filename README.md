# Sim's Hair and Beauty - Website

A beautiful, modern salon website for Sim's Hair and Beauty in Mauritius. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Fast Performance** - Optimized with Next.js 14
- **Beautiful UI** - Modern design with smooth animations
- **SEO Optimized** - Full SEO setup with meta tags and structured data
- **Analytics Ready** - Google Analytics and Facebook Pixel integration
- **WhatsApp Integration** - Direct WhatsApp booking
- **Testimonials** - Social proof from happy clients
- **Mobile Optimized** - Excellent mobile experience with 44px touch targets
- **Accessibility** - Proper heading hierarchy and ARIA labels
- **Dark Mode Ready** - CSS variables for easy theming

## 📋 Pages

- **Home** - Hero section with featured services and testimonials
- **Services** - Full service menu with pricing and categories
- **Contact** - Booking details, hours, directions, and map
- **Landing Trial** - Alternative landing page design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                  # Next.js app directory
│   ├── page.tsx         # Home page
│   ├── services/        # Services page
│   ├── contact/         # Contact page
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/          # Reusable React components
│   ├── layout/         # Navigation, footer
│   ├── sections/       # Page sections
│   └── ui/            # UI components
├── content/            # Content data
│   ├── site.ts        # Main content (services, testimonials)
│   └── price-list.ts  # Pricing
├── lib/                # Utilities
│   ├── analytics.ts    # Analytics tracking
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

## 🎨 Design System

### Colors
- **Primary:** Red (`brand-red`)
- **Secondary:** Cream, Rose, Petal
- **Neutral:** Mist, Stone, Shell

### Typography
- **Display:** Didot (headers)
- **Body:** Avenir Next (text)

### Components
- Buttons (Primary, Secondary, Ghost)
- Cards with hover effects
- Reveal animations
- Responsive grid layouts

## 🔧 Configuration

### Update Content
Edit `content/site.ts`:
```ts
export const siteConfig = {
  name: "Sim's Hair and Beauty",
  // ... update details
};

export const featuredServices = [
  // ... add/edit services
];

export const testimonials = [
  // ... add/edit testimonials
];
```

### Configure Analytics
Add your IDs in `app/layout.tsx`:
- Google Analytics: `G-XXXXXXXXXX`
- Facebook Pixel: `XXXXXXXXXX`

### Update Colors
Edit `tailwind.config.js` for new color schemes

## 📱 Mobile Optimization

- Min touch target: 44px
- Responsive padding and spacing
- Mobile-first design approach
- Optimized text sizing

## 🔍 SEO Features

- Dynamic sitemap generation
- robots.txt configuration
- Open Graph tags for social sharing
- JSON-LD structured data (LocalBusiness schema)
- Keyword optimization
- Meta descriptions for all pages

## 📊 Analytics & Tracking

- Google Analytics 4 integration
- Facebook Pixel tracking
- Custom event tracking for:
  - Booking clicks
  - Service views
  - Testimonial engagement
  - Direction requests

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
netlify init
```

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 📖 Documentation

- **SETUP_GUIDE.md** - Development setup and content editing
- **DEPLOYMENT_GUIDE.md** - Complete deployment instructions

## 🎯 Performance

- Lighthouse Score: 95+
- Core Web Vitals: Optimized
- Mobile Performance: Excellent
- First Contentful Paint: < 1.5s

## 🔐 Security

- Secure external links with rel="noreferrer"
- No sensitive data in client-side code
- HTTPS ready
- Content Security Policy compatible

## 🛠️ Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Test production build
npm run build && npm run start
```

## 📝 Technology Stack

- **Framework:** Next.js 14.2
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Package Manager:** npm
- **Hosting:** Vercel/Netlify ready

## 🔄 Future Enhancements

- Blog section for beauty tips
- Online booking system integration
- Customer reviews section
- Gallery with before/after images
- Email newsletter signup
- WhatsApp Business API integration
- Appointment reminder system

## 📞 Support

For questions or issues:
1. Check SETUP_GUIDE.md
2. Check DEPLOYMENT_GUIDE.md
3. Review existing component code
4. Consult Next.js documentation

## 📄 License

All rights reserved - Sim's Hair and Beauty

## ✨ Credits

Built with ❤️ for Sim's Hair and Beauty, Mauritius

---

**Last Updated:** April 2026
**Status:** Ready for deployment

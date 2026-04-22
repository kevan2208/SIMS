# Setup Guide - Sim's Hair and Beauty Website

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git (optional, for version control)

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open in Browser**
Visit `http://localhost:3000` to see your site

### File Structure

```
├── app/
│   ├── page.tsx                 # Home page
│   ├── services/page.tsx        # Services page
│   ├── contact/page.tsx         # Contact page
│   ├── landingPageTrial/page.tsx # Landing trial variant
│   ├── layout.tsx               # Root layout with metadata
│   ├── globals.css              # Global styles
│   └── sitemap.ts               # Dynamic sitemap
│
├── components/
│   ├── layout/                  # Navigation, Footer, etc.
│   ├── sections/                # Page sections (Hero, Services, etc.)
│   └── ui/                      # Reusable UI components
│
├── content/
│   ├── site.ts                  # Main content (services, testimonials, etc.)
│   └── price-list.ts            # Pricing information
│
├── lib/
│   ├── analytics.ts             # Analytics event tracking
│   └── utils.ts                 # Utility functions
│
├── public/                      # Static files (images, fonts, etc.)
│
└── package.json                 # Dependencies & scripts
```

## Editing Content

All content is stored in TypeScript files and can be easily edited:

### Update Salon Info
Edit `content/site.ts`:
- Name, description, location
- WhatsApp number and booking message
- Hours of operation
- Social media links

### Update Services
Edit `content/site.ts`:
- `featuredServices` - Featured treatments on home page
- `serviceCategories` - Service categories

Edit `content/price-list.ts`:
- `priceListCategories` - Full pricing by category
- `priceListHighlights` - Highlighted services

### Update Testimonials
Edit `content/site.ts`:
- `testimonials` - Add/update client testimonials

### Add Images
Place images in `public/` folder and reference them:
```tsx
<img src="/image-name.jpg" alt="Description" />
```

## Common Tasks

### Change Colors
Colors are defined in Tailwind config. Edit `tailwind.config.js` or `app/layout.tsx`:
- Brand colors defined in `color-scheme` configuration
- Primary: `brand-red`
- Secondary: `brand-cream`, `brand-rose`

### Modify Page Layouts
Edit component files in `components/sections/`:
- `hero-section.tsx` - Home hero section
- `services-section.tsx` - Services display
- `contact-section.tsx` - Contact information
- `testimonials-section.tsx` - Client testimonials

### Update Text & Copy
Most text is in `content/site.ts` - find the relevant object and update

### Add New Pages
1. Create new folder in `app/` (e.g., `app/new-page/`)
2. Create `page.tsx` file with your content
3. Add link to navigation in `content/site.ts` → `navItems`

## Styling

The site uses **Tailwind CSS** for styling. Key classes:

- `brand-red`, `brand-cream`, `brand-mist` - Colors
- `font-display` - Display font (Didot)
- `font-body` - Body font (Avenir)
- `shadow-soft`, `shadow-lift` - Shadows
- `rounded-full` - Rounded corners

For custom styles, add to `app/globals.css`

## Analytics Configuration

1. **Google Analytics:**
   - Replace `G-XXXXXXXXXX` in `app/layout.tsx`
   - Get ID from: https://analytics.google.com

2. **Facebook Pixel:**
   - Replace `XXXXXXXXXX` in `app/layout.tsx`
   - Get ID from: https://business.facebook.com

3. **Track Custom Events:**
   Use `lib/analytics.ts`:
   ```tsx
   import { trackBookingClick } from '@/lib/analytics';
   
   <button onClick={trackBookingClick}>Book Now</button>
   ```

## Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm run start
```

## Deployment

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions

### Quick Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Quick Deploy to Netlify
```bash
npm install -g netlify-cli
netlify init
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Module Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server: `npm run dev`

## Performance Tips

1. **Optimize Images:**
   - Use PNG/WebP format
   - Compress before uploading
   - Use `next/image` for automatic optimization

2. **Monitor Performance:**
   - Use Chrome DevTools Lighthouse
   - Check Core Web Vitals

3. **SEO Best Practices:**
   - Use descriptive page titles
   - Add proper meta descriptions
   - Use semantic HTML
   - Include alt text for images

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **Vercel:** https://vercel.com/docs
- **Netlify:** https://docs.netlify.com

## Need Help?

1. Check the original file comments
2. Review existing components for patterns
3. Consult Tailwind/Next.js documentation
4. Review git history for changes

## Git Workflow (Optional)

```bash
# Initialize git
git init

# Stage changes
git add .

# Commit changes
git commit -m "Updated services and testimonials"

# Push to remote
git push origin main
```

---

**Last Updated:** April 2026

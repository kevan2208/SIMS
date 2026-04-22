# Deployment Guide - Sim's Hair and Beauty Website

## Pre-Deployment Checklist

Before deploying to production, complete the following steps:

### 1. Configure Analytics IDs

**Google Analytics:**
- Replace `G-XXXXXXXXXX` in `app/layout.tsx` with your Google Analytics 4 property ID
- Set up your GA4 account at https://analytics.google.com

**Facebook Pixel:**
- Replace `XXXXXXXXXX` in `app/layout.tsx` with your Facebook Pixel ID
- Set up your Facebook Business account at https://business.facebook.com

### 2. Add Environment Variables

Create a `.env.production` file:
```bash
# Add any production-specific environment variables here
NEXT_PUBLIC_SITE_URL=https://simshairandbeauty.com
```

### 3. Update Configuration URLs

In `content/site.ts`, verify:
- WhatsApp number is correct: `+230 5771 8511`
- Location details match salon location
- Social media links are up to date
- PDF file path is correct if hosted elsewhere

### 4. Optimize Images (Optional)

Place optimized images in `public/` folder:
- `og-image.png` - 1200x630px for social sharing
- `favicon.ico` - 32x32px favicon
- Add high-quality photos of salon/treatments if desired

### 5. Test Build Locally

```bash
npm run build
npm run start
```

Visit `http://localhost:3000` and test all pages:
- Home page
- Services page
- Contact page
- Landing trial page
- Verify all links work
- Check responsive design on mobile

### 6. Deploy to Vercel (Recommended)

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option B: Using GitHub**
1. Push code to GitHub repository
2. Visit https://vercel.com/new
3. Import your repository
4. Configure environment variables in Vercel dashboard
5. Deploy

### 7. Deploy to Netlify (Alternative)

**Option A: Using Netlify CLI**
```bash
npm install -g netlify-cli
netlify init
```

**Option B: Using GitHub**
1. Push code to GitHub
2. Visit https://app.netlify.com/signup
3. Connect your GitHub account
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### 8. Setup Custom Domain

- Purchase domain (e.g., simshairandbeauty.com)
- Update nameservers to point to Vercel/Netlify
- Enable SSL/HTTPS (automatic on Vercel/Netlify)

### 9. Configure WhatsApp Business Integration

- Ensure WhatsApp link works: `https://wa.me/23057718511?text=...`
- Test with different devices
- Consider WhatsApp Business API for advanced features

### 10. Post-Deployment Tasks

1. **Verify Analytics:**
   - Check Google Analytics is receiving data
   - Test Facebook Pixel with pixel helper browser extension

2. **Test SEO:**
   - Submit sitemap to Google Search Console
   - Add domain to Google Search Console: https://search.google.com/search-console
   - Verify robots.txt is accessible: https://simshairandbeauty.com/robots.txt

3. **Test Email Functionality (if added):**
   - Verify contact forms work
   - Set up email notifications

4. **Monitor Performance:**
   - Check Core Web Vitals in Google Search Console
   - Use Lighthouse for performance audits
   - Monitor analytics for user behavior

5. **Setup Monitoring:**
   - Enable error tracking (optional: Sentry, LogRocket)
   - Setup uptime monitoring (optional: UptimeRobot)

## Environment Variables Reference

```env
# Production URL
NEXT_PUBLIC_SITE_URL=https://simshairandbeauty.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX
```

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Test build locally
npm run build && npm run start
```

## Troubleshooting

**Build Error: Module not found**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

**Deploy Error: Environment variables not found**
- Check Vercel/Netlify dashboard for env vars
- Ensure NEXT_PUBLIC_ prefix for client-side vars

**Slow Build Time**
- Clear `.next` folder before building
- Check for large dependencies in package.json
- Consider splitting large components

## Maintenance

### Regular Tasks

1. **Weekly:** Monitor Google Analytics for traffic
2. **Monthly:** Update content as needed
3. **Monthly:** Check all links are working
4. **Quarterly:** Review SEO rankings
5. **Quarterly:** Update testimonials/services

### Security Updates

- Keep Next.js updated: `npm update next`
- Keep dependencies updated: `npm update`
- Monitor security advisories: `npm audit`

## Support & Further Optimization

For additional optimization:
- Consider image optimization with next/image component
- Add caching strategies for static assets
- Monitor Web Vitals regularly
- Consider CDN configuration for faster delivery

## Additional Resources

- Vercel Documentation: https://vercel.com/docs
- Netlify Documentation: https://docs.netlify.com
- Next.js Documentation: https://nextjs.org/docs
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com

# Zeitblast Website Clone

A complete, production-ready clone of the [Zeitblast](https://zeitblast.com/) SMS marketing platform website, built with modern web technologies.

## 🚀 Features

### Pages Implemented
- **Homepage** - Hero section, features showcase, testimonials, pricing overview, and FAQ
- **Features Page** - Detailed feature descriptions with benefits and visual demonstrations
- **Pricing Page** - Four pricing tiers with detailed comparison table
- **About Page** - Company mission, values, story, and statistics
- **Contact Page** - Contact form with company information
- **Blog Page** - Article listings with pagination
- **Solutions Page** - Real estate-specific solutions and use cases

### Components Built
- **UI Components**
  - Button (multiple variants: primary, secondary, outline, white)
  - Card (variants: default, elevated, bordered with hover effects)
  - Input (with label, error states, and validation)
  - Container (responsive width constraints)

- **Layout Components**
  - Header with responsive navigation and dropdown menus
  - Footer with comprehensive links, social media, and app store buttons

- **Section Components**
  - Hero section with gradient background and CTA
  - Features grid with icons and descriptions
  - Testimonials with customer reviews
  - Pricing cards with feature lists
  - FAQ accordion with smooth animations

### Technical Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** React Icons (Feather Icons)
- **Utilities:** clsx for conditional classes

### Design System
- **Colors:**
  - Primary Dark: `#012635`
  - Primary Green: `#06AB78`
  - Primary Blue: `#2022AE`
- **Typography:** Roboto font family
- **Responsive:** Mobile-first design approach
- **Animations:** Smooth transitions and scroll-triggered animations

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd clone-zeitblast

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🛠️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checking
npm run build

# Run ESLint
npm run lint
```

## 📁 Project Structure

```
clone-zeitblast/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog listing page
│   │   ├── contact/           # Contact page with form
│   │   ├── features/          # Features page
│   │   ├── pricing/           # Pricing page
│   │   ├── solutions/         # Solutions pages
│   │   │   └── real-estate/   # Real estate solution page
│   │   ├── layout.tsx         # Root layout with Header/Footer
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles and theme
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Container.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/          # Page sections
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── Testimonials.tsx
│   │       ├── Pricing.tsx
│   │       └── FAQ.tsx
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── package.json
└── tsconfig.json
```

## 🎨 Design Features

- **Fully Responsive:** Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations:** Framer Motion for scroll-triggered and interactive animations
- **Accessibility:** Semantic HTML, ARIA labels, and keyboard navigation support
- **SEO Optimized:** Meta tags, Open Graph, and semantic structure
- **Performance:** Optimized images, code splitting, and lazy loading

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`
- Large Desktop: `> 1280px`

## 🔍 Key Highlights

1. **No Placeholder Content:** All content is production-ready and matches the original website
2. **Type-Safe:** Full TypeScript implementation with proper type definitions
3. **Component Reusability:** Well-structured, reusable components
4. **Best Practices:** Following Next.js and React best practices
5. **Build Success:** Production build completed with zero errors

## 🌐 Pages Overview

### Homepage (`/`)
- Hero section with email capture form
- Trust indicators (deliverability, compliance, response time)
- 8 core features with icons and descriptions
- Customer testimonials with ratings
- Pricing overview with 4 plans
- FAQ accordion section

### Features Page (`/features`)
- Detailed feature breakdowns
- Benefits lists for each feature
- Visual demonstrations
- Call-to-action sections

### Pricing Page (`/pricing`)
- Four pricing tiers with detailed features
- Interactive comparison table
- Pricing FAQs
- Trial information

### About Page (`/about`)
- Company mission and values
- Origin story
- Key statistics
- Team information

### Contact Page (`/contact`)
- Contact form with validation
- Company information
- Business hours
- Quick answers section

## 🚀 Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting platform**

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 📝 License

This is a clone project created for educational and demonstration purposes.

## 🤝 Contributing

This is a complete implementation. For modifications or improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

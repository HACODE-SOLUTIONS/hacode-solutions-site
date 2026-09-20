# HACODE SOLUTIONS - Marketing & DevSpec Catalog Site

Production-ready marketing site and DevSpec catalog for HACODE SOLUTIONS, built with Next.js App Router, TypeScript, Tailwind CSS, and MDX support.

## Features

- ✅ **Next.js 14 App Router** with TypeScript
- ✅ **Dark software-house aesthetic** with purple/white brand colors
- ✅ **GitHub Integration** - Displays public repositories from HACODE-SOLUTIONS org
- ✅ **Stripe Payments** - Checkout + webhook handling for premium DevSpecs
- ✅ **Freemium Model** - Free DevSpecs on GitHub + paid premium packs
- ✅ **Production SEO/AEO**:
  - Unique meta tags and OpenGraph for every page
  - Generated sitemap.xml
  - AI-bot-friendly robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
  - JSON-LD structured data (Organization, Product, FAQPage)
  - Semantic HTML with proper H1 headings
- ✅ **Complete Pages**: Home, Catalog, Product Details, Repositories, FAQ, About, Contact, Privacy, Terms
- ✅ **Responsive Design** optimized for all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payments**: Stripe SDK
- **Content**: MDX support for documentation
- **APIs**: GitHub REST API, Stripe API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Stripe account (for payments)
- GitHub account (optional, for increased API rate limits)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HACODE-SOLUTIONS/hacode-solutions-site.git
cd hacode-solutions-site
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your keys (see [Environment Variables](#environment-variables) section).

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Building for Production

```bash
npm run build
npm start
```

The build command compiles the Next.js app, and start runs the production server on port 3000.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# GitHub API (optional - increases rate limits from 60 to 5000 requests/hour)
GITHUB_TOKEN=ghp_your_token_here

# Stripe (required for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Site URL (used for SEO, OG tags, and Stripe redirects)
NEXT_PUBLIC_SITE_URL=https://hacode.solutions

# Stripe product price IDs (required for premium DevSpecs)
STRIPE_PRICE_ID_PREMIUM_DEVSPEC=price_...
```

### Getting API Keys

#### GitHub Token (Optional)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `public_repo` scope
3. Copy the token to `GITHUB_TOKEN` in `.env`

#### Stripe Keys (Required)

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to [Dashboard → API Keys](https://dashboard.stripe.com/test/apikeys)
3. Copy the test keys to `.env`:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

#### Stripe Webhook Secret (Required)

1. Install Stripe CLI: [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Run webhook forwarding:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
3. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

For production, set up a webhook endpoint in Stripe Dashboard pointing to `https://yourdomain.com/api/webhook`

#### Stripe Product Setup

1. Go to [Dashboard → Products](https://dashboard.stripe.com/test/products)
2. Create a new product (e.g., "Enterprise SaaS Starter Kit")
3. Set the price (e.g., $149)
4. Copy the Price ID (starts with `price_...`)
5. Add to `.env` as `STRIPE_PRICE_ID_PREMIUM_DEVSPEC`

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── catalog/             # DevSpecs catalog
│   ├── devspec/[slug]/      # Product detail pages
│   ├── repositories/        # GitHub repos page
│   ├── how-it-works/        # FAQ page
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── privacy/             # Privacy policy
│   ├── terms/               # Terms of service
│   ├── success/             # Payment success page
│   ├── sitemap.ts           # Generated sitemap
│   ├── robots.ts            # Robots.txt configuration
│   └── api/                 # API routes
│       ├── checkout/        # Stripe checkout endpoint
│       └── webhook/         # Stripe webhook handler
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── DevSpecCard.tsx
│   ├── CatalogClient.tsx
│   └── CheckoutButton.tsx
├── data/                    # Static data
│   └── devspecs.ts          # DevSpec products
├── lib/                     # Utility functions
│   ├── seo.ts              # SEO/metadata helpers
│   └── github.ts           # GitHub API client
├── types/                   # TypeScript types
│   └── index.ts
└── public/                  # Static assets
    └── (add OG images here)
```

## Adding New DevSpecs

Edit `data/devspecs.ts` to add new products:

```typescript
{
  id: "5",
  slug: "your-devspec-slug",
  name: "Your DevSpec Name",
  description: "Short description for cards",
  longDescription: "Detailed description for product page",
  isPaid: false,  // or true for premium
  price: 99,  // only for paid
  stripePriceId: process.env.STRIPE_PRICE_ID_YOUR_PRODUCT,  // only for paid
  githubUrl: "https://github.com/HACODE-SOLUTIONS/your-repo",  // only for free
  features: [
    "Feature 1",
    "Feature 2",
  ],
  stack: ["Next.js", "TypeScript"],
  diyTime: "3-4 hours",
  whoFor: "AI agents building X",
  fileCount: 12,
  category: "Category Name",
  popular: true,  // optional
}
```

## SEO Configuration

### Meta Tags

Each page uses the `generateSEO()` helper from `lib/seo.ts` to generate unique:
- Title tags
- Meta descriptions
- Canonical URLs
- OpenGraph tags
- Twitter Card tags

### JSON-LD Structured Data

- **Organization**: Homepage
- **Product**: Product detail pages
- **FAQPage**: How It Works page

### Sitemap

Auto-generated at `/sitemap.xml` including:
- Static pages
- All product detail pages

### Robots.txt

Located at `/robots.txt`, configured to:
- Allow all standard crawlers
- Explicitly allow AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- Block API routes
- Reference sitemap

## Customization

### Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    purple: "#7C3AED",
    dark: "#0F0A1E",
    darker: "#080510",
    gray: "#1F1A2E",
  },
}
```

### Site Content

- **Homepage**: `app/page.tsx`
- **About**: `app/about/page.tsx`
- **Contact**: `app/contact/page.tsx`

## Testing Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future date for expiry, any 3 digits for CVC

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the app:

```bash
npm run build
```

Start production server:

```bash
npm start
```

Ensure Node.js 18+ is available on the server.

### Webhook Configuration

After deployment, update Stripe webhook:

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook signing secret to production environment variables

## License

Proprietary - HACODE SOLUTIONS © 2026

## Support

- Email: support@hacode.solutions
- GitHub: [github.com/HACODE-SOLUTIONS](https://github.com/HACODE-SOLUTIONS)

## Tech Notes

- **Runs on Node.js**: Uses Next.js server for Stripe webhook verification
- **No Edge Runtime**: Webhooks require Node.js runtime
- **ISR**: Repository page uses ISR (revalidates every hour)
- **Type Safety**: Full TypeScript coverage
- **Production Ready**: Includes error handling, loading states, and security best practices

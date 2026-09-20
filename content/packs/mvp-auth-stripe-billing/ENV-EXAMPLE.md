# ENV-EXAMPLE — Environment patterns + secrets checklist

**No real secrets belong in this pack or in git.** Copy patterns into your app’s `.env.local` / host env UI.

Primary product delivery for this pack: **https://hacode.solutions** (Stripe Checkout + instant download — Link owns the page). Your *buyer’s* SaaS app uses its own Stripe account and keys below.

---

## Example `.env.local` (patterns only)

```bash
# --- App ---
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Production example:
# NEXT_PUBLIC_APP_URL=https://your-app.example.com

# --- Database (Prisma) ---
# Local smoke (SQLite):
DATABASE_URL="file:./dev.db"
# Production (Postgres):
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require"

# --- Auth.js / NextAuth v5 ---
# Generate: openssl rand -base64 32
AUTH_SECRET=
AUTH_TRUST_HOST=true
# Optional explicit URL (recommended in prod):
# AUTH_URL=https://your-app.example.com

# OAuth — GitHub (https://github.com/settings/developers)
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
# Some templates use GITHUB_ID / GITHUB_SECRET — match your auth.ts; do not mix names casually.

# OAuth — Google (optional second provider)
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# --- Stripe (TEST mode for local/staging) ---
STRIPE_SECRET_KEY=sk_test_replace_me
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_replace_me
STRIPE_WEBHOOK_SECRET=whsec_replace_me
# Recurring Price ID from Stripe Dashboard → Products (subscription-primary)
STRIPE_PRICE_ID=price_replace_me

# Checkout return URLs are usually derived from NEXT_PUBLIC_APP_URL:
# success: ${NEXT_PUBLIC_APP_URL}/dashboard?checkout=success
# cancel:  ${NEXT_PUBLIC_APP_URL}/pricing?checkout=cancel
```

---

## Variable map

| Variable | Server/Client | Required v1 | Purpose |
|----------|---------------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Both (public) | Yes | Canonical origin for redirects + Checkout URLs |
| `DATABASE_URL` | Server | Yes | Prisma connection |
| `AUTH_SECRET` | Server | Yes | Session/JWT signing |
| `AUTH_TRUST_HOST` | Server | Prod behind proxy | Trust `Host` / URL detection |
| `AUTH_URL` | Server | Recommended prod | Explicit Auth.js URL |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | Server | At least one OAuth provider | GitHub login |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Server | Optional | Google login |
| `STRIPE_SECRET_KEY` | Server only | Yes | Checkout + webhook API |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client ok | Optional in Checkout-hosted flow | Only if you use Stripe.js client helpers |
| `STRIPE_WEBHOOK_SECRET` | Server | Yes | Signature verification |
| `STRIPE_PRICE_ID` | Server | Yes | Subscription price for Checkout |

---

## Secrets checklist (before every deploy)

- [ ] `AUTH_SECRET` is long, random, unique per environment.
- [ ] Stripe **test** keys on local/staging; **live** keys only on production.
- [ ] `STRIPE_WEBHOOK_SECRET` matches the endpoint that actually receives events (CLI vs Dashboard).
- [ ] OAuth apps have callback URLs for each environment:
  - `http://localhost:3000/api/auth/callback/github`
  - `https://your-app.example.com/api/auth/callback/github`
- [ ] No `.env`, `.env.local`, or key files committed.
- [ ] Host env (Vercel/etc.) set for Production and Preview separately.
- [ ] Rotate any key that appeared in chat logs, screenshots, or git history.
- [ ] Publishable key may be public; **secret key and webhook secret must never** ship to the browser bundle.

---

## Local webhook secret tip

When using Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI prints a `whsec_…` — use that in `.env.local` only. When you create a Dashboard webhook for staging/production, replace with **that** endpoint’s secret.

---

## Naming consistency

Auth.js v5 commonly prefers `AUTH_*` env names. If you copy from the free auth pack that uses `GITHUB_ID` / `GOOGLE_ID`, either:

1. Rename env vars to match this pack, or  
2. Keep the free pack names and document them in your app README —

but pick one scheme per repo so agents stop “fixing” env names in circles.

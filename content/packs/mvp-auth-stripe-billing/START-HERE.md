# START HERE — MVP Auth + Stripe Billing DevSpec Pack

**Buy / deliver from:** https://hacode.solutions  
**Promise:** Hand Cursor or Claude Code this pack and ship a working **Auth → Checkout → Entitlement** path in one focused day—without inventing webhooks or access rules from scratch.

This zip is **markdown + skill files only**. You build in your own Next.js app (or a free HACODE starter). Do not expect a runnable SaaS inside the download.

---

## Who it’s for

- Solo founders, freelancers, and small agencies who already use (or are about to use) Cursor / Claude Code.
- People who need a finished signed-in → pay → unlock path **this week**, not a catalog of prompts.
- Buyers gluing free HACODE modules (starter + auth + Stripe) and missing the entitlements glue.

## Who it’s not for

- Teams that want a full **multi-tenant SaaS boilerplate** (orgs, seats, RBAC trees, white-label).
- Anyone shopping for a **custom agency implementation** or paid build-out.
- Legal / compliance / PCI / tax audits of payment flows.
- People who only want a **Notion template** or a standalone **prompt dump** with no system brief.

---

## Tools you need

| Tool | Why |
|------|-----|
| Node 18+ + npm | Run the Next.js app you scaffold |
| Cursor **or** Claude Code | Agent that reads this pack |
| Stripe account (test mode) + Stripe CLI | Checkout + local webhook forwarding |
| One OAuth app (GitHub is enough) | Auth.js sign-in for the smoke path |
| Free HACODE starters (optional but recommended) | See `MODULE-MAP.md` |

Stack locked by this pack: **Next.js App Router · Auth.js v5 (JWT) · Stripe Checkout (subscription) · signed webhooks · Prisma**. SQLite is fine for the local 10-minute smoke; Postgres for production.

---

## How to invoke with Cursor / Claude Code

### Cursor

1. Open **your app repo** (not this pack folder as the app root).
2. Add this pack folder to the workspace (or paste key files into a `docs/mvp-auth-stripe-billing/` folder).
3. Ensure `.cursorrules` from this pack is visible to the agent (workspace rules or copy into project `.cursorrules` / `.cursor/rules`).
4. Start a chat with the paste in the 10-minute path below.

### Claude Code

1. `cd` into your app repo.
2. Point the skill at this pack: keep `SKILL.md` on the agent’s skill path, or open the pack and say “follow SKILL.md in this folder.”
3. Run the same paste as Cursor.

**Always work in the buyer’s app.** Never scaffold a full Next.js app *inside* this pack zip.

---

## Explicit 10-minute path (stranger follows this)

Clock starts after you have the pack unzipped and a blank or starter Next.js App Router repo open.

### Minute 0–1 — Orient

1. Skim this file and open `SAMPLE.md` (redacted listing walkthrough).
2. Confirm checkout host for the *product* was https://hacode.solutions; your *app* runs on `http://localhost:3000`.

### Minute 1–3 — Point the agent

Paste into Cursor / Claude Code:

```text
Read DEVSPEC.md, MODULE-MAP.md, ENTITLEMENTS.md, and ENV-EXAMPLE.md from the MVP Auth + Stripe Billing pack.
Implement starter → auth → stripe → entitlements for a single "pro" subscription.
Do not grant access from success_url. Use Auth.js v5 JWT + Prisma + Stripe Checkout subscription.
Work in this app repo. Do not invent multi-tenant features.
```

While it runs, fill `.env.local` from `ENV-EXAMPLE.md` (test keys only):

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
AUTH_SECRET=[openssl-rand-base64-32]
AUTH_GITHUB_ID=[github-oauth-client-id]
AUTH_GITHUB_SECRET=[github-oauth-client-secret]
STRIPE_SECRET_KEY=sk_test_…
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_…
STRIPE_WEBHOOK_SECRET=whsec_…   # from stripe listen
STRIPE_PRICE_ID=price_…         # recurring test Price
```

### Minute 3–6 — Surfaces you should see

Agent (or you) produces at least:

- Sign-in works; `/dashboard` requires a session.
- `POST /api/checkout` returns a Stripe-hosted URL when signed in.
- `POST /api/webhooks/stripe` verifies signatures and upserts entitlement `pro`.

Start two terminals:

```bash
npm run dev
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Put the CLI `whsec_…` into `STRIPE_WEBHOOK_SECRET` and restart the app if needed.

### Minute 6–9 — Happy path

1. Sign in with GitHub (test account).
2. Open `/dashboard/pro` → expect **blocked** (redirect to `/pricing` or 403).
3. Click **Upgrade**; pay with `4242 4242 4242 4242`.
4. Watch CLI for `checkout.session.completed` / `customer.subscription.*`.
5. Open `/dashboard/pro` again → expect **unlocked**.
6. Hit `GET /api/me/access` → expect `pro` with `status: "active"`.

### Minute 9–10 — Prove you did not cheat

1. Resend the same Stripe event → still one entitlement row; page still works.
2. Cancel the test subscription in Stripe Dashboard → `/dashboard/pro` locks again.
3. Confirm nothing granted access from `?checkout=success` alone.

**Pass:** all three hold → the pack did its job.  
**Fail:** open `SMOKE-TEST.md` for the full checkbox run, then `HANDOFF-HUMAN-DEV.md` if the agent stalls twice on the same blocker.

---

## Where to go next

| File | Use when |
|------|----------|
| [`SAMPLE.md`](./SAMPLE.md) | Redacted 10-minute listing walkthrough (same money path) |
| [`SMOKE-TEST.md`](./SMOKE-TEST.md) | Full pass/fail checklist after the quick path |
| [`DEVSPEC.md`](./DEVSPEC.md) | System brief the agent must follow |
| [`CHECKLIST.md`](./CHECKLIST.md) | Ship gate + buyer “done” criteria |
| [`FAQ.md`](./FAQ.md) | Formats, license, updates, common footguns |
| [`CONTENTS.md`](./CONTENTS.md) | Exact files in the buyer zip |
| [`SAMPLES/`](./SAMPLES/) | Vague prompt vs DevSpec-driven before/after transcripts |
| [`HANDOFF-HUMAN-DEV.md`](./HANDOFF-HUMAN-DEV.md) | Human rescue one-pager |

---

## Honest limits

- This pack is **not** a downloadable running SaaS.
- One subscription Price ID is the v1 path; teams/seats/coupons/metering are out of scope.
- Legal, tax, and PCI advisory are out of scope.

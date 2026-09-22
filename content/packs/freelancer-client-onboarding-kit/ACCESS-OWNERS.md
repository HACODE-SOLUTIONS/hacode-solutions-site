# Access & Owners Log

**Product:** Freelancer Client Onboarding Kit (AI Coding Ops)  
**Rule:** Every critical asset has a **named human owner** and a path to credentials. “We’ll figure it out later” is a Week-0 failure.

**Security:** Never paste live `sk_live_`, production DB URLs, or private keys into shared client Docs. Store secrets in a password manager / vault; this file stores **who owns** and **where**, not the secret values.

---

## Meta

| Field | Value |
|-------|--------|
| Client / project | |
| Last updated | |
| Freelancer lead | |
| Client IT / admin contact | |

---

## A. People owners

| Role | Name | Contact | Notes |
|------|------|---------|-------|
| Decision-maker | | | |
| Day-to-day contact | | | |
| Billing / AP | | | |
| Repo admin (client) | | | |
| Domain / DNS | | | |
| Design | | | |
| Freelancer (you) | | | |

---

## B. Repos & project tracking

| Asset | Location / URL (no secrets) | Access level needed | Owner | Status (have / requested / blocked) |
|-------|----------------------------|---------------------|-------|-------------------------------------|
| Source repo | | Write / admin | | |
| Staging repo / same | | | | |
| Issue tracker | | | | |
| Design file (Figma) | | View / edit | | |
| Docs folder | | | | |

Invite emails used: _______________

---

## C. Hosting & domains

| Asset | Provider | Account email (owner) | You have access? | Notes |
|-------|----------|----------------------|------------------|-------|
| Production host | Vercel / other | | Y / N | |
| Staging host | | | Y / N | |
| Domain registrar | | | Y / N | |
| DNS (if separate) | | | Y / N | |
| CDN / images | | | Y / N | |

---

## D. Auth

| Asset | Provider | Owner | Env location (e.g. Vercel) | Test vs live | Status |
|-------|----------|-------|----------------------------|--------------|--------|
| OAuth app (GitHub / Google / …) | | | | Test | |
| Auth secret / `AUTH_SECRET` | | | | | |
| User DB access | | | | | |

Callback URLs documented: _______________

---

## E. Stripe / payments (and test keys)

| Asset | Mode | Owner | Where stored | Freelancer needs? | Status |
|-------|------|-------|--------------|-------------------|--------|
| Stripe account | Test | | | Y / N | |
| `sk_test_` / `pk_test_` | Test | | Vault / shared env | | |
| Webhook signing secret (test) | Test | | | | |
| Price / Product IDs (test) | Test | | | | |
| Stripe account | Live | | | Usually client-only early | |
| `sk_live_` / `pk_live_` | Live | **Client** preferred | Vault — never chat | | |
| Customer Portal / tax settings | | | | | |

**Default:** Freelancer works in **test mode** until handover checklist. Live keys stay with the client unless a written ops agreement says otherwise.

If this engagement needs a full Auth → Checkout → Entitlement path, see `COMPOSE-WITH-PRODUCT1.md` (MVP Auth + Stripe Billing DevSpec Pack, $49).

---

## F. Other services

| Service | Purpose | Owner | Access status |
|---------|---------|-------|---------------|
| Email (Resend / Postmark / SES) | | | |
| Analytics | | | |
| Error monitoring | | | |
| CMS | | | |
| Third-party API #1 | | | |
| Third-party API #2 | | | |

---

## G. Blockers board

| Blocker | Waiting on | Since | Unblock action | Escalation |
|---------|------------|-------|----------------|------------|
| | | | | |

No open P0 access blockers before calling kickoff “unblocked.”

---

## H. Handover access checklist (end of engagement)

- [ ] Client is admin on repo; freelancer role reduced or removed as agreed.
- [ ] Hosting seats transferred or client owns billing.
- [ ] Env vars documented in a client-owned vault (values not in this markdown).
- [ ] Domain / DNS ownership confirmed client-side.
- [ ] Stripe live keys never left in freelancer laptops without rotation plan.
- [ ] `EMAIL-SCRIPTS.md` handover email sent with asset list.

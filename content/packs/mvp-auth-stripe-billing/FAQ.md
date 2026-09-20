# FAQ — MVP Auth + Stripe Billing DevSpec Pack

**Product:** MVP Auth + Stripe Billing DevSpec Pack  
**Buy / deliver from:** https://hacode.solutions  
**Price (Ops):** $49 one-time digital download

---

## Formats

| Question | Answer |
|----------|--------|
| What do I get? | A zip of **markdown + skill files** (DevSpec, checklists, env patterns, Cursor rules, Claude skill, annotated samples). |
| Is there a runnable SaaS in the download? | **No.** You implement in your own Next.js App Router repo (or a free HACODE starter). |
| What editors / agents? | Cursor (`.cursorrules`) and Claude Code (`SKILL.md`). Any agent that can read markdown works. |
| Stack locked? | Next.js App Router · Auth.js v5 (JWT) · Stripe Checkout (subscription) · signed webhooks · Prisma. |

---

## License

**You may**

- Use this pack for **personal** and **commercial** projects (client apps, your own SaaS, agency builds).
- Copy, adapt, and keep the DevSpec / checklists / skill text inside private or client repos.
- Hand the pack (or excerpts) to a contractor or AI agent working **on your project**.

**You may not**

- Redistribute the pack (or a lightly edited clone) as a **competing digital product**, template marketplace listing, or free “prompt dump” download.
- Resell, sublicense, or publish the full zip / file set as your own SKU.
- Remove copyright / product attribution solely to rebrand it as a competing DevSpec pack.

**Ownership of what you build:** code, schema, and product you implement from this brief are yours. The pack documents remain licensed content from HACODE / hacode.solutions.

If you need a team / agency redistribution license (internal wiki for dozens of seats, white-label resale), contact the seller via https://hacode.solutions — v1 purchase is single-buyer personal + commercial *use*, not wholesale redistribution.

---

## Updates policy

- **v1 purchase** includes the current zip as delivered at checkout.
- Material fixes (broken links, wrong env names, critical webhook guidance) may ship as a free replacement download when announced on https://hacode.solutions for this SKU.
- Major expansions (multi-tenant, seats, metering, portal-first billing) are **new SKUs or paid upgrades**, not automatic.
- Free HACODE GitHub modules linked in `MODULE-MAP.md` evolve on their own repos; this pack’s glue (entitlements + composition) is versioned with the zip you bought.
- No SLA on update cadence. Check your purchase email / account page for the latest download when a fix is posted.

---

## Common footguns

### 1. Webhook before Checkout is “done”

Stripe fires events when payment succeeds; your app only unlocks after a **verified** webhook updates the DB. Starting Checkout without `stripe listen` (local) or a Dashboard endpoint (prod) means success URL loads with **no entitlement**. Always run:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

…and put that CLI `whsec_…` into `STRIPE_WEBHOOK_SECRET` before you pay with `4242…`.

### 2. Granting access from `success_url`

Never upsert `Entitlement` because the browser landed on `?checkout=success`. Users can forge that URL. Grant only inside the webhook handler after `constructEvent` / signature verify. Success page may show “pending” and poll `GET /api/me/access`.

### 3. `AUTH_*` vs `GITHUB_ID` naming

Auth.js v5 prefers `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`. Older templates and some free packs use `GITHUB_ID` / `GITHUB_SECRET` / `NEXTAUTH_SECRET`. **Pick one scheme per repo.** Mixing names is the #1 reason agents “fix” env in circles. This pack documents `AUTH_*` — rename free-pack vars or keep free-pack names and document them once in your README.

### 4. Test vs live Stripe keys

| Environment | Keys |
|-------------|------|
| Local / staging | `sk_test_…`, `pk_test_…`, CLI or test-mode webhook secret |
| Production | `sk_live_…`, `pk_live_…`, Dashboard live endpoint secret |

Never mix test and live in one env. Never commit either. Rotate any key that appeared in chat, screenshots, or git history.

### 5. Stripe CLI vs Dashboard webhook secret

Local `stripe listen` prints a **different** `whsec_…` than a Dashboard endpoint. Using the Dashboard secret locally (or the CLI secret in production) → signature `400` and no entitlements. Match secret to the endpoint that actually receives events.

Also: the webhook route must read the **raw body** for verification. Parsing JSON before verify breaks signatures.

### 6. SQLite vs Postgres

| Mode | `DATABASE_URL` | When |
|------|----------------|------|
| Local 10-minute smoke | `file:./dev.db` (SQLite) | Fine for `SMOKE-TEST.md` |
| Production | Postgres connection string | Required for concurrent webhooks + durable billing state |

Prisma schema must match the provider you set. Switching SQLite → Postgres means migrate / push on the new DB and update env; do not point production at a laptop SQLite file.

### 7. Signed-in ≠ paid

Middleware that only checks “has session” will leak paid UI to free users. Auth gate and entitlement gate are separate — see `ENTITLEMENTS.md`.

### 8. Wrong Price type

`STRIPE_PRICE_ID` for this pack’s v1 path must be a **recurring** Price (`mode: subscription`). A one-time Price breaks the subscription event path this DevSpec expects.

### 9. Missing `metadata.userId`

Checkout Session must attach your app `user.id` (metadata and/or `client_reference_id`). Without it, the webhook cannot link Stripe customer → User → Entitlement.

### 10. Building the Next.js app inside the pack folder

Keep the zip as docs. Scaffold or clone into a **separate app repo**. Agents that treat the pack root as the app create a mess and break the download structure.

---

## Support boundaries

| In scope | Out of scope |
|----------|--------------|
| Clarifying pack files / smoke path | Custom agency implementation |
| Pointing at free HACODE module order | Legal, tax, PCI, SCA advisory |
| Explaining webhook / entitlement rules | Multi-tenant / seats / metering design |

If the agent stalls twice on the same blocker → `HANDOFF-HUMAN-DEV.md`.

---

## Related files

- [`START-HERE.md`](./START-HERE.md) — 10-minute path  
- [`CONTENTS.md`](./CONTENTS.md) — exact zip file list  
- [`SMOKE-TEST.md`](./SMOKE-TEST.md) — full pass/fail run  
- [`ENV-EXAMPLE.md`](./ENV-EXAMPLE.md) — env patterns + secrets checklist  
- [`CHECKLIST.md`](./CHECKLIST.md) — definition of done  

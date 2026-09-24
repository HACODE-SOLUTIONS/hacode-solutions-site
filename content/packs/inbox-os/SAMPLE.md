# SAMPLE — 10-minute redacted messy DMs → order log + reply (listing proof)

**Product:** Inbox OS (Grok Bot ready)  
**Buy / deliver from:** https://hacode.solutions  
**Price:** $79  
**What this sample shows:** a stranger can turn **messy WhatsApp + IG DMs** into a **structured order log + guarded draft reply** in **≤10 minutes**, without connecting Meta APIs or buying a SaaS inbox seat.

This is a **redacted before/after** for a fictional bakery. Bracketed names are fake. Pack only — not Grok Bot itself, not WhatsApp itself, not affiliated with xAI / X / Grok.

**Purchase moment this proves:** “I have (or will get) Grok Bot; I need the inbox + orders kit tonight.”

---

## What you need open

1. This pack folder (after purchase from https://hacode.solutions).  
2. Grok Bot, Cursor, or ChatGPT with `INBOX-SKILL.md` + `.cursorrules` visible (SAMPLE context below is enough for the timed path).  
3. Ten minutes on a timer.

---

## SAMPLE business context (excerpt — treat as filled)

```text
Business: Rivermark Bakehouse (pickup bakery, one counter)
Sells: custom cakes, cupcake dozens, cookie boxes
Hours: Tue–Sat 09:00–17:00 America/New_York; Sun–Mon closed
Prices: 6" custom cake $48; 8" $68; cupcake dozen $32; cookie box $22
Rush (<24h): +$15 if capacity — human confirms capacity
Deposit: 50% to hold custom cake date
Cancel: ≥48h → deposit refundable; inside 48h → deposit kept
Payment: Venmo @RivermarkBake or card at pickup — never take full card # in chat
Tone: warm, short, no hype scarcity
Do not: invent discounts; medical advice on allergies (label allergens; escalate reactions)
Owner on-call: Maya Chen (SMS)
```

---

## Messy DMs (input — before)

```text
=== IG DM — @jess.park — Tue 16:40 ===
hey do u guys do birthday cakes?? need something cute for saturday
also can u deliver to downtown

=== WhatsApp — Jess Park — Tue 16:52 ===
hi it's jess from ig — saturday pickup ok if no delivery?
want a chocolate 6 inch with "happy birthday leo" — any nut stuff in it?
can u do 20% off if i also get cupcakes

=== WhatsApp — Jess Park — Tue 21:10 (after hours) ===
hello?? also my kid is allergic to tree nuts please make sure
if anything happens you'll cover medical costs right

=== WhatsApp — @mike_builds — Wed 09:05 ===
Order for Friday cookie box x2 — paid venmo $44 already, name Mike R
```

---

## Minute 0–2 — Orient

Skim `START-HERE.md` promise + Not for + competitive triangle (InboxAgent email SaaS vs blank Grok Bot vs WhatsApp channel). Confirm this zip is the **ops kit**, not the platform and not the channel.

---

## Minute 2–6 — Point the agent

Paste:

```text
Read INBOX-SKILL.md and .cursorrules from Inbox OS.
Use the SAMPLE bakery BUSINESS-CONTEXT excerpt and messy DMs in SAMPLE.md.
Produce:
1) triage labels for each message block,
2) one structured order log for Jess (ORDER-INTAKE fields),
3) one draft customer reply to Jess (confirm or clarify — no invented discount; handle allergy carefully),
4) escalate yes/no with reason from ESCALATION.md (watch the medical-costs line),
5) a short note on Mike’s cookie-box payment (human verify before Paid).
Do not invent prices or policies. Do not claim Meta API or hosted seats.
This pack is not Grok Bot or WhatsApp itself.
```

---

## Minute 6–8 — What “good” output looks like (redacted fill)

### Triage

| Block | Labels | Notes |
|-------|--------|-------|
| IG @jess.park | `LEAD` → moving to order | Delivery ask |
| WA Jess 16:52 | `ORDER` | 6" chocolate + inscription; discount ask; allergy ask |
| WA Jess 21:10 | `ORDER` + `AFTER_HOURS` + `HANDOFF` | Tree-nut allergy + **medical-cost liability** → escalate |
| WA Mike 09:05 | `ORDER` + payment claim | Human verify Venmo before Paid |

### Order log — Jess (expected shape)

```text
ORDER_ID: 20260923-01
CHANNEL: WhatsApp (started on IG DM)
STATUS: Escalated
CUSTOMER_NAME: Jess Park (@jess.park)
ITEM: 6" custom cake — chocolate — inscription "happy birthday leo"
QTY: 1
DATE_NEEDED: [next Saturday from thread — confirm calendar date with customer]
TIME_NEEDED: GAP: pickup window
FULFILLMENT: Pickup (delivery not offered downtown per context)
ADDRESS_OR_PICKUP: Rivermark Bakehouse counter
ALLERGIES_NOTES: Tree-nut allergy stated; customer asked shop to "cover medical costs"
PRICE_QUOTED: $48 (6" custom) — NO 20% discount (not in policy)
DEPOSIT_DUE: 50% = $24 to hold date
PAYMENT_STATUS: Not started
SPECIAL_REQUESTS: Inscription; allergy caution
OPEN_GAPS: GAP: exact Saturday date; GAP: pickup time; GAP: cupcakes yes/no at full price
NEXT_ACTION: Human owns allergy/liability thread; bot drafts clarify on date/time/cupcakes only after Maya clears
```

### Draft reply to Jess (good — after escalate awareness)

*Bot should **not** accept medical liability. Prefer handoff-first on that beat; optional split: human for allergy/legal, bot draft for logistics once cleared.*

```text
Hi Jess — looping in Maya on the allergy / safety side so a human owns that (we don’t handle medical-cost questions in chat).

For the cake logistics once Maya confirms we can take the order:
• 6" chocolate custom with “happy birthday leo” — $48
• Pickup at the counter (we don’t deliver downtown)
• 50% deposit ($24) on Venmo @RivermarkBake to hold the date
• Cupcakes are $32/dozen if you still want them — we can’t do 20% off

Please send: (1) the exact Saturday date, (2) pickup window, (3) cupcakes yes/no.
— Rivermark Bakehouse
```

### Escalate?

**Yes** — trigger: allergy + medical-cost / liability language (`ESCALATION.md`). Internal ping → Maya Chen. Stop inventing reassurance.

### Mike note

```text
ORDER_ID: 20260923-02 · cookie box ×2 · $44 matches list · PAYMENT_STATUS: Proof claimed — human verify Venmo
Draft: “Got it Mike — confirming your Venmo and Friday pickup shortly.”
Do not mark Paid until Maya checks.
```

---

## Minute 8–10 — Checklist + FAQ footgun

1. Open `CHECKLIST.md` — note what a real shop still fills in BUSINESS-CONTEXT.  
2. Skim `FAQ.md` brand disclaimer + Meta/compliance footgun.  
3. Confirm you did **not** need InboxAgent, WhatsApp API, or a hosted seat to finish this path.

If you produced labels + Jess order card + guarded draft + escalate=yes on medical liability in ≤10 minutes, the pack did its job.

---

## What “good” looks like vs vague prompting

| Vague prompt only | With this pack |
|-------------------|----------------|
| “Sure we can do 20% off!” | Discount refused — not in BUSINESS-CONTEXT |
| “Yes we’ll cover any medical costs” | **Escalate** — no liability promises |
| Delivery promised to downtown | Pickup only per context |
| After-hours “see you tonight” confirm | After-hours ack; no same-night invent |
| Mike auto-marked Paid | Human verify payment proof |
| “This is our official Grok WhatsApp bot” | Independent pack; buyer’s Grok Bot + their channels |

---

## Listing bullets (Growth / page copy seeds)

- Configure a Grok Bot agent as your small-business **inbox brain** — WhatsApp, IG DMs, orders logged without tab-hopping. ($79)  
- Pack, not platform/channel: not InboxAgent email SaaS, not blank Grok Bot, not WhatsApp Business itself.  
- Purchase moment: you have (or will get) Grok Bot — need the inbox + orders kit tonight.  
- Includes SAMPLE messy bakery DMs a stranger finishes in ≤10 minutes.  
- Independent digital pack from https://hacode.solutions — not affiliated with xAI, X, or Grok.

---

## Limits (honest)

- Not hosted seats, not Meta API setup, not a CRM, not legal advice.  
- Not email-only triage SaaS; not enterprise contact centers.  
- Sample does not include live WhatsApp connect or phone numbers.

---

## Next after this sample

Buyers: start at `START-HERE.md`, fill real BUSINESS-CONTEXT / CHANNEL-MAP / ORDER-INTAKE, tick `CHECKLIST.md`, read `FAQ.md`. Exact zip list: `CONTENTS.md`.

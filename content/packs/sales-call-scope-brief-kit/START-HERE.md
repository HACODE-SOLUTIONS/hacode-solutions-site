# START HERE — Sales Call → Scope Brief Kit

**Also called:** Discovery-to-Scope Pack  
**Buy / deliver from:** https://hacode.solutions  
**Price:** $35 one-time digital download  
**Promise:** Turn a sales or discovery call into a locked scope brief a builder or AI can execute—same day, without rewriting the deal from a messy transcript.

This zip is **markdown templates + checklists + email scripts + skill**. No SaaS, no CRM, no Notion workspace to import, no lawyer-drafted MSAs. You paste into Notion, Google Docs, or keep Markdown as the source of truth.

---

## Who it’s for

- Solo freelancers, indie consultants, and small agencies who take **discovery / sales calls** and need a clean handoff into scope **before** the deposit.
- People who bleed hours rewriting deals from messy notes, Loom transcripts, or “make it pop” Slack threads.
- Buyers who want one recovered hour or one prevented free-consulting trap this week.

## Who it’s not for

- People building **CRM / lead-gen** systems or cold outreach sequences.
- Anyone who wants a **full proposal writing course** or sales training curriculum.
- Anyone who needs **lawyer-drafted MSAs** or binding contract language.
- A substitute for **Freelancer Client Onboarding Kit** (Product #2, $39)—that’s post-yes Week 0 ops; see `HANDOFF-TO-PRODUCT2.md` when the deposit clears.
- A substitute for **MVP Auth + Stripe Billing DevSpec** (Product #1, $49)—see `COMPOSE-WITH-PRODUCT1.md` when the scoped build needs paid signup.
- A prompt dump alone with no call → brief workflow.

---

## Setup ≤60 minutes (your first live call cycle)

| Block | Time | What you do |
|-------|------|-------------|
| Orient | 5 min | Read this file; skim `SAMPLE.md`. |
| Workspace | 10 min | Pick **one** home: Notion page, Google Doc folder, or Markdown folder for prospects. Copy templates from this pack into that home. |
| Skill | 5 min | Point Cursor / Claude at `SKILL.md` + `.cursorrules` (see below). |
| Pre-call | 10 min | Print or open `DISCOVERY-AGENDA.md`; confirm decision-maker will be on the call. |
| Live / right after | 15–20 min | Fill `LIVE-NOTES.md` during or immediately after the call. |
| Same-day lock | 15–20 min | Run skill: notes → gaps → `SCOPE-BRIEF.md`; send `RECAP-EMAIL.md`; start `FOLLOW-UP-EMAILS.md` sequence. |

**Stopwatch goal:** locked scope brief + “Heard you” recap drafted within **60 minutes** of hanging up (or within 10 minutes using the SAMPLE path with no live call).

---

## Notion / Docs / Markdown paths

Pick **one** primary path per prospect. Do not maintain three copies.

### Path A — Markdown (recommended for AI-coding freelancers)

1. Create `prospects/<prospect-slug>/` in your notes repo or Drive-synced folder.
2. Copy `DISCOVERY-AGENDA.md`, `LIVE-NOTES.md`, `RECAP-EMAIL.md`, `SCOPE-BRIEF.md`, `QUOTE-SOW-CHECKLIST.md`, `PRICING-WORKSHEET.md`, `FOLLOW-UP-EMAILS.md` into that folder.
3. Keep this pack’s `SKILL.md` / `.cursorrules` reachable by your agent (workspace root or `docs/scope-brief-kit/`).

### Path B — Notion

1. New database or page: **Discovery → Scope**.
2. Create child pages named after each template file (Discovery Agenda, Live Notes, Recap Email, Scope Brief, Quote→SOW Checklist, Pricing Worksheet, Follow-up Emails).
3. Paste each markdown body into the matching page. Use toggles for checklists.
4. Link the **Scope Brief** as the single source of truth; other pages link back to it.

### Path C — Google Docs

1. Folder: `Prospects / <Prospect Name> / Discovery`.
2. One Doc per template (or one Doc with H1 sections matching file names).
3. Share a **client-safe** Scope Brief after you remove internal pricing notes; keep `PRICING-WORKSHEET.md` private.

---

## How to invoke the skill (Cursor / Claude)

### Cursor

1. Open your notes or prospect-docs workspace (not a random empty folder).
2. Add this pack (or a copy of `SKILL.md` + `.cursorrules` + the templates) to the workspace.
3. Ensure `.cursorrules` is visible (project rules or paste into `.cursor/rules`).
4. Paste a prompt from `SKILL.md` (start with **Messy notes → gaps → locked scope brief**).

### Claude Code

1. `cd` into the folder that holds call notes + pack templates.
2. Say: “Follow `SKILL.md` in the Sales Call → Scope Brief Kit. Turn my notes into gaps, then a locked `SCOPE-BRIEF.md`, then a recap email.”
3. Paste raw call notes or transcript as the input.

**Always edit the prospect’s working copies** of the templates. Do not treat the zip originals as the live file set after first copy.

---

## Explicit 10-minute stranger path

Clock starts after unzip. No real prospect required—use the redacted scenario in `SAMPLE.md`.

### Minute 0–2 — Orient

1. Open this file and `SAMPLE.md`.
2. Confirm delivery host was https://hacode.solutions; price context $35.
3. Confirm this is **pre-yes close**, not Week 0 onboarding and not Auth+Stripe code.

### Minute 2–6 — Run the skill on sample notes

Paste into Cursor / Claude:

```text
Read SKILL.md and .cursorrules from the Sales Call → Scope Brief Kit.
Using the messy notes in SAMPLE.md, produce:
1) a short list of discovery GAPs (questions still unanswered),
2) a filled SCOPE-BRIEF.md body (outcome, deliverables, exclusions, assumptions, open questions ≤3),
3) a filled “Heard you” recap email from RECAP-EMAIL.md.
Do not invent legal MSA language. Do not expand into CRM/lead-gen or Week 0 onboarding.
```

### Minute 6–8 — Skim outputs against SAMPLE

Compare the agent’s brief to the filled example in `SAMPLE.md`. You should see: decision-maker GAP or named owner, In/Out boundary, soft “make it pop” parked Out, open questions ≤3, handoff note to Product #2 when deposit clears.

### Minute 8–10 — Follow-up + quote gate

Open `FOLLOW-UP-EMAILS.md`, copy **Email 1 — Send brief**, fill tokens from the sample brief, and save a draft. Skim `QUOTE-SOW-CHECKLIST.md` and confirm you would not send a quote until the decision-maker and ≤3 open questions are handled.

If you can produce a coherent scope brief + one recap/send-brief draft from messy notes in ≤10 minutes, the pack did its job.

---

## What’s in the pack (map)

| File | Job |
|------|-----|
| `DISCOVERY-AGENDA.md` | Timeboxed sales/discovery agenda + decision-maker check |
| `LIVE-NOTES.md` | Trigger · success 30/60/90 · current state · constraints · in/out · next step |
| `RECAP-EMAIL.md` | Same-day “Heard you” recap scripts |
| `SCOPE-BRIEF.md` | Outcome, deliverables, exclusions, assumptions, open questions ≤3 |
| `QUOTE-SOW-CHECKLIST.md` | Quote → SOW operating checklist (non-legal) |
| `PRICING-WORKSHEET.md` | Assumptions → range (not a rate-card course) |
| `FOLLOW-UP-EMAILS.md` | Send brief / nudge / close-or-lose |
| `SKILL.md` + `.cursorrules` | Transcript/messy notes → gaps → locked scope brief |
| `HANDOFF-TO-PRODUCT2.md` | When deposit clears → Freelancer Client Onboarding Kit ($39) |
| `COMPOSE-WITH-PRODUCT1.md` | When scoped work needs Auth→Checkout→Entitlement ($49) |
| `SAMPLE.md` | Redacted call → locked brief (listing proof) |
| `FAQ.md` / `CHECKLIST.md` / `CONTENTS.md` | License, done means X, zip list |

---

## Catalog chain (do not cannibalize)

| Moment | Pack |
|--------|------|
| Pre-yes: lock scope from the call | **This kit ($35)** |
| Deposit cleared: Week 0 onboarding | **Product #2** — `freelancer-client-onboarding-kit` ($39) — see `HANDOFF-TO-PRODUCT2.md` |
| Build needs paid signup | **Product #1** — `mvp-auth-stripe-billing` ($49) — see `COMPOSE-WITH-PRODUCT1.md` |

---

## Next steps after the 10-minute path

1. Copy templates into your real prospect folder (Path A/B/C).  
2. Run agenda → live notes → skill → scope brief → recap on the next live call.  
3. Tick `CHECKLIST.md` before you call the brief “locked.”  
4. Read `FAQ.md` for license, updates, and footguns (free consulting trap, missing decision-maker, soft “make it pop”).

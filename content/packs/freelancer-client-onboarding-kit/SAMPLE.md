# SAMPLE — 10-minute redacted kickoff (listing proof)

**Product:** Freelancer Client Onboarding Kit (AI Coding Ops) / First-Week Client OS  
**Buy / deliver from:** https://hacode.solutions  
**Price:** $39  
**What this sample shows:** a stranger can turn **messy notes** into a coherent brief + scope boundary + sendable welcome email in **≤10 minutes**, without a real client on the call.

This is a **redacted filled Week-0**, not legal advice and not a full CRM. Bracketed names are fake.

---

## What you need open

1. This pack folder (after purchase from https://hacode.solutions).
2. Cursor or Claude Code with `SKILL.md` + `.cursorrules` visible.
3. Ten minutes on a timer.

---

## Messy notes (input)

```text
Call 2026-09-18 with Northline Tutor Co.
Maya Chen — founder — says she's the decision person but sometimes her co-founder Omar
signs invoices. They want a web app for tutoring session notes + parent visibility.
"Not a marketplace." Budget roughly $9.5k fixed. Need staging before Oct 20 parent demo;
hard classroom pilot Nov 3. Have Figma for two screens only. GitHub org exists but
freelancer not invited yet. Maybe Stripe later for parent subscriptions—not sure for v1.
Using Cursor is fine. Slack for chat. Sister agency promised mobile apps last year and
ghosted—scared of soft scope. Deposit $2.5k received Stripe link yesterday.
```

---

## Minute 0–2 — Orient

Skim `START-HERE.md` promise + Not for. Confirm this is post-yes ops, not lead hunting.

---

## Minute 2–6 — Point the agent

Paste:

```text
Read SKILL.md and .cursorrules from the Freelancer Client Onboarding Kit.
Using the messy notes in SAMPLE.md, produce:
1) a short list of intake gaps,
2) a filled PROJECT-BRIEF.md body,
3) a filled SCOPE-CHECKLIST.md (in / out / revisions / milestones).
Do not invent legal contract language. Do not expand into lead-gen or PMO frameworks.
```

---

## Minute 6–8 — What “good” output looks like (redacted fill)

### Intake gaps (expected)

1. `GAP: decision-maker for scope changes` — Maya vs Omar; confirm Maya locks product scope; Omar = AP only if true.
2. `GAP: payments in v1` — Stripe parent subscriptions in or out.
3. `GAP: must vs nice` beyond session notes + parent visibility.
4. `GAP: hosting owner` / invite path for GitHub.
5. `GAP: success metrics` for Oct 20 demo vs Nov 3 pilot.

### Project brief (excerpt)

> We will deliver a web app for tutoring session notes with parent-visible summaries so Northline can run a classroom pilot by **Nov 3, 2026**, with a staging demo by **Oct 20, 2026**.

**Goals:** session notes CRUD for tutors; parent read view; staging + production deploys; README.  
**Non-goals:** marketplace; native mobile; Instagram growth; sister-agency rebuild.

**Decision-maker (pending confirm):** Maya Chen (product/scope). **AP:** Omar (invoices)—verify in kickoff.

### Scope checklist (excerpt)

**In:** web app; tutor auth; session notes; parent read visibility; Figma two-screen implementation + light polish; staging before Oct 20; production before Nov 3 pilot.  
**Out:** mobile apps; marketplace; marketing retainer; **Stripe parent subscriptions** until kickoff decides (default Out for v1).  
**Revisions:** 2 rounds inside scope.  
**Milestones:** M0 kickoff+lock · M1 staging demo Oct 20 · M2 pilot-ready Nov 3 · M3 handover.

**Compose note:** If kickoff moves Stripe In, buy/use **MVP Auth + Stripe Billing DevSpec** (`mvp-auth-stripe-billing`, $49) rather than inventing webhooks—see `COMPOSE-WITH-PRODUCT1.md`.

---

## Minute 8–10 — Send-ready welcome (filled)

**Subject:** Welcome — Northline Tutor Co. Week 0 onboarding

```text
Hi Maya,

Thanks for moving forward on Northline session notes. I’m kicking off Week 0 so we start
build with a locked brief—not Slack archaeology.

What I’ll do in the next 24–48 hours:
1) Turn our call notes into a project brief + scope checklist for your review.
2) Request GitHub org access and confirm Figma links for the two screens.
3) Propose kickoff times: Tue 10:00 or Wed 14:00 America/New_York.

Your one job before kickoff: confirm you’re the decision-maker for scope changes
(and whether Omar is invoices-only). Also: keep Stripe parent subscriptions out of v1,
or tell me to pull them in so we plan Auth + Checkout properly.

Deposit $2,500 received—thank you. Workspace: Markdown folder I’ll share after kickoff
scheduling. Reply on this thread for decisions.

Glad to build this with you,
[Your Name]
```

Also open `KICKOFF-AGENDA.md` and ensure decision-lock rows include: scope owner, Stripe in/out, Oct 20 / Nov 3 dates, GitHub invite owner.

---

## What “good” looks like vs vague prompting

| Vague prompt only | With this pack |
|-------------------|----------------|
| “Write a SOW” → fluffy legal-ish essay | Brief + non-legal scope checklist |
| Soft “maybe Stripe” becomes unpaid build | Default Out + compose pointer to Product #1 |
| No decision-maker | Explicit GAP blocks “scope locked” |
| Kickoff with no agenda | Timed agenda + decision-lock list |
| Welcome email from scratch each time | Scripts with tokens filled from brief |

---

## Listing bullets (Growth / page copy seeds)

- After the client says yes, run first-week onboarding in under 90 minutes—intake → brief → scope lock → access owners → kickoff + emails.
- Cursor/Claude skill drafts the project brief from messy notes (not a prompt dump alone).
- Built for AI-coding freelancers; hands off Auth+Stripe builds to the $49 DevSpec instead of inventing billing.
- Includes sample kickoff a stranger can skim in ≤10 minutes.
- Delivered as markdown templates + skill from https://hacode.solutions — $39.

---

## Limits (honest)

- Not a lead-gen system, legal contract pack, or enterprise PMO suite.
- Sample does not include a Notion import file or PDF suite.
- Stripe implementation detail lives in Product #1, not here.

---

## Next after this sample

Buyers: start at `START-HERE.md`, copy templates to the real client folder, tick `CHECKLIST.md`, read `FAQ.md` footguns. Exact zip list: `CONTENTS.md`.

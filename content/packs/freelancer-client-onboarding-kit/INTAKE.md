# Client Intake Questionnaire

**Product:** Freelancer Client Onboarding Kit (AI Coding Ops)  
**Use:** Send after “yes” / deposit, or fill from sales-call notes before kickoff.  
**Goal:** Capture scope, budget, timeline, access, success metrics, and decision-maker—before you write the brief.

Copy this file into the client folder. Mark unanswered items with `GAP:` so the skill can list follow-ups.

---

## 0. Meta

| Field | Answer |
|-------|--------|
| Client / company name | |
| Project working title | |
| Your role (freelancer / agency lead) | |
| Intake date | |
| Intake source (form / call / email) | |
| Deposit received? (yes / no / amount) | |
| Preferred workspace (Markdown / Notion / Docs) | |

---

## 1. Decision-maker & stakeholders

| Field | Answer |
|-------|--------|
| **Primary decision-maker** (name + role) | |
| Email / Slack / other for decisions | |
| Who can approve scope changes? | |
| Who can approve invoices / payments? | |
| Day-to-day contact (if different) | |
| Who must be CC’d on kickoff? | |
| Anyone with veto power we should know about? | |

**Hard rule:** If primary decision-maker is blank, do not lock scope. Put `GAP: decision-maker` and delay kickoff decisions until named.

---

## 2. Problem & outcome

1. What problem are we solving in one sentence?
2. What does “success” look like in 30 / 60 / 90 days?
3. What have you already tried?
4. What must be true for you to call this engagement a win?
5. What is explicitly **out of scope** for this engagement (even if nice later)?

---

## 3. Scope sketch (pre-brief)

| Field | Answer |
|-------|--------|
| Product type (SaaS MVP, feature add, internal tool, landing + backend, other) | |
| Platforms (web / mobile / API / CLI) | |
| Must-have features (bullets) | |
| Nice-to-have features (bullets) | |
| Integrations required (Stripe, Auth provider, CRM, etc.) | |
| Design source (Figma, references, “make it clean,” none) | |
| Content / copy owner (client / you / undecided) | |
| Analytics / admin needs | |

---

## 4. Budget & commercial

| Field | Answer |
|-------|--------|
| Agreed budget or range | |
| Pricing model (fixed / milestone / weekly / retainer) | |
| Deposit terms already agreed | |
| Invoice currency & method (Stripe / Wise / bank) | |
| Purchase order or billing entity legal name | |
| Any not-to-exceed (NTE) amount? | |

*This section is commercial intake only—not a contract. Put final numbers into `INVOICE-MILESTONES.md` after scope lock.*

---

## 5. Timeline

| Field | Answer |
|-------|--------|
| Hard deadline (date + why it is hard) | |
| Soft target / preferred launch window | |
| Blackout dates (client travel, freezes) | |
| Expected weekly availability for feedback (hours) | |
| Time zone of decision-maker | |
| Kickoff meeting preference (date windows) | |

---

## 6. Access & assets (preview for ACCESS-OWNERS)

Check what exists today; details go in `ACCESS-OWNERS.md`.

- [ ] Domain / DNS access
- [ ] Hosting (Vercel / AWS / other)
- [ ] Git repo (GitHub / GitLab / other)
- [ ] Design files (Figma)
- [ ] Auth provider (Clerk / Auth.js OAuth apps / Cognito / other)
- [ ] Stripe (or other payments) — test and/or live
- [ ] Email / transactional (Resend, Postmark, etc.)
- [ ] Analytics
- [ ] Existing staging or production URLs
- [ ] Brand kit / logos
- [ ] Prior codebase or docs

Who will create accounts you do not have yet? _______________

---

## 7. Success metrics

| Metric | Target | How measured | Owner |
|--------|--------|--------------|-------|
| Example: paid signup path works in test mode | Pass smoke test | Stripe test + checklist | You |
| | | | |
| | | | |
| | | | |

List 1–5 metrics. Prefer observable outcomes over vibes (“feels faster”).

---

## 8. Constraints & risks

1. Compliance / data residency / industry constraints?
2. Third parties we depend on (their SLA / their designer)?
3. Known technical debt or “do not touch” areas?
4. Brand / legal review gates before launch?
5. Anything that already went wrong with a previous freelancer?

---

## 9. Communication norms

| Field | Answer |
|-------|--------|
| Primary channel (email / Slack / Linear comments) | |
| Response-time expectation (business hours) | |
| Meeting cadence (weekly / biweekly / async-only) | |
| Tooling for tasks (Linear / GitHub Issues / Notion) | |
| Preferred demo format (Loom / live / staging URL) | |

---

## 10. AI coding ops (this kit’s buyer context)

| Field | Answer |
|-------|--------|
| Are you OK with Cursor / Claude used on the codebase? | |
| Any code that must stay human-only? | |
| Repo secrets policy (who holds live keys)? | |
| Will the client build need Auth + Stripe paid signup? (If yes → `COMPOSE-WITH-PRODUCT1.md`) | |

---

## Intake complete signal

Intake is complete when:

- [ ] Decision-maker is named with contact path.
- [ ] Budget model and timeline window are non-empty.
- [ ] Must-have vs nice-to-have are separated.
- [ ] Success metrics have at least one measurable row.
- [ ] Access checklist has owners or explicit `GAP:` items.
- [ ] Gaps list is copied to the top of `PROJECT-BRIEF.md` (or cleared).

**Next:** Run the skill (`SKILL.md`) or manually fill `PROJECT-BRIEF.md`, then `SCOPE-CHECKLIST.md`.

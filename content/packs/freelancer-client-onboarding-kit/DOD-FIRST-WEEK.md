# Definition of Done + First-Week Plan

**Product:** Freelancer Client Onboarding Kit (AI Coding Ops)  
**Window:** Calendar Week 0 (the week after “yes”) — not the full build.  
**Outcome:** Scope locked, access unblocked, kickoff held, first build slice started or clearly scheduled.

---

## Meta

| Field | Value |
|-------|--------|
| Client / project | |
| Week 0 dates | |
| Freelancer | |
| Decision-maker | |

---

## A. Definition of done — Week 0

Week 0 is **done** when all of the following are true:

1. **Intake complete** — `INTAKE.md` has decision-maker, budget model, timeline window, and must/nice split (or written gaps with owners).
2. **Brief exists** — `PROJECT-BRIEF.md` v1 filled; one-sentence promise + goals / non-goals.
3. **Scope locked** — `SCOPE-CHECKLIST.md` in/out/revisions/milestones acknowledged by decision-maker.
4. **Access path clear** — `ACCESS-OWNERS.md` has owners; P0 blockers listed with unblock dates (zero silent blockers).
5. **Kickoff held or firmly scheduled** — `KICKOFF-AGENDA.md` used; decision-lock list resolved or dated.
6. **Commercial rhythm set** — `INVOICE-MILESTONES.md` draft matches milestones (amounts from your agreement).
7. **First emails sent** — Welcome and/or kickoff scripts from `EMAIL-SCRIPTS.md`.
8. **First-week build slice named** — one concrete engineering/design outcome for days 3–5 (even if “scaffold + README”).

If any item fails, Week 0 is **not** done—even if Slack feels busy.

---

## B. First-week plan (template)

Adjust hours to your capacity; keep the sequence.

### Day 1 — Lock the map (≤90 min onboarding core)

- [ ] Copy pack templates into client folder (Markdown / Notion / Docs).
- [ ] Fill or skill-draft intake → brief → scope.
- [ ] Send welcome email + intake gaps (if any).
- [ ] Request access (repo, Figma, hosting, Stripe test).

### Day 2 — Kickoff + decisions

- [ ] Run kickoff with `KICKOFF-AGENDA.md`.
- [ ] Capture decision log in `PROJECT-BRIEF.md`.
- [ ] Confirm revisions policy + milestone dates.
- [ ] Share staging plan and feedback channel.

### Day 3 — Unblock + scaffold

- [ ] Clear P0 access blockers or escalate.
- [ ] Repo bootstrap / branch strategy / README.
- [ ] If Auth+Stripe needed: pull Product #1 DevSpec into the build plan (`COMPOSE-WITH-PRODUCT1.md`).
- [ ] Open first tickets from in-scope list only.

### Day 4 — First visible slice

- [ ] Ship something reviewable (staging URL, Loom, or PR walkthrough).
- [ ] Ask for one round of focused feedback (single list).

### Day 5 — Stabilize Week 0

- [ ] Update brief / checklist with any approved deltas.
- [ ] Confirm invoice timing for Milestone 1.
- [ ] Set next meeting or async check-in.
- [ ] Tick section A above; declare Week 0 done or list remaining gaps with owners.

---

## C. First-week engineering DoD (example slice)

Replace with your real slice; keep it testable.

| Slice | Done when |
|-------|-----------|
| Example: App skeleton on staging | Deploy preview URL loads; README run steps work |
| Example: Auth spike | Sign-in works on staging with test OAuth |
| Your slice: | |

---

## D. Anti-goals for Week 0

- Building half the product before scope lock.
- Collecting live Stripe keys “just in case.”
- Accepting Slack feature drips without updating the checklist.
- Waiting on a missing decision-maker while coding paid extras.

---

## E. Week 0 exit note (paste to client)

> Week 0 complete: brief v___ and scope checklist locked on [date]. Access owners logged. Kickoff decisions captured. Next milestone: [name] targeting [date]. Feedback via [channel] within [SLA].

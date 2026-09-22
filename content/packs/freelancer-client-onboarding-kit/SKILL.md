# SKILL — Freelancer Client Onboarding Kit (AI Coding Ops)

**Skill name:** `freelancer-client-onboarding`  
**For:** Claude Code, Cursor Agent, and similar agents  
**Pack root:** this folder (markdown templates + skill)  
**Buyer delivery:** https://hacode.solutions  
**Price context:** $39 operating kit  

---

## When to use

Use this skill when the user has (or just got) a **client yes** and needs:

- Messy call/email notes → **intake gaps** → **project brief** → **scope checklist**
- First-week onboarding artifacts: access owners, DoD, kickoff agenda, email drafts
- A tight operating pack—not lead gen, not legal contracts, not a Notion life-OS

Do **not** use this skill to draft binding MSAs, hunt leads, invent enterprise PMO process, or replace the **MVP Auth + Stripe Billing DevSpec Pack** (`mvp-auth-stripe-billing`, $49) when implementing Auth → Checkout → Entitlement.

---

## Preconditions

1. Read `START-HERE.md` once for promise and Not-for.
2. Work in the **client’s working copies** of templates (or create them from this pack).
3. Prefer editing: `INTAKE.md` → `PROJECT-BRIEF.md` → `SCOPE-CHECKLIST.md` → `ACCESS-OWNERS.md` / `DOD-FIRST-WEEK.md` / `KICKOFF-AGENDA.md`.
4. Never invent a named decision-maker; if missing, emit `GAP: decision-maker` and refuse scope-lock language.
5. Never paste fabricated live secrets; use placeholders like `[client-vault:stripe-test]`.

---

## Workflow

1. **Ingest** — Accept messy notes, call transcripts, email threads, proposal bullets.
2. **Gap pass** — List unanswered intake fields (decision-maker, budget model, timeline, must vs nice, success metrics, access owners).
3. **Intake fill** — Patch `INTAKE.md` with known facts; mark unknowns `GAP:`.
4. **Brief** — Draft `PROJECT-BRIEF.md` as the single source of truth (promise, goals/non-goals, metrics, milestones summary).
5. **Scope** — Fill `SCOPE-CHECKLIST.md` in/out/revisions/milestones; anything ambiguous → **Out** until confirmed.
6. **Wire Week 0** — Propose `ACCESS-OWNERS.md` owners table, `DOD-FIRST-WEEK.md` slice, `KICKOFF-AGENDA.md` decision-lock rows, and email drafts from `EMAIL-SCRIPTS.md`.
7. **Compose check** — If paid signup path is in scope, point to `COMPOSE-WITH-PRODUCT1.md` (do not invent billing architecture here).
8. **Stop rule** — After two contradictory client statements, present both options in the decision-lock list; do not silently pick.

---

## Copy-paste prompts

### Messy notes → intake gaps → brief → scope

```text
Read SKILL.md and .cursorrules from the Freelancer Client Onboarding Kit.
Here are messy notes / transcript:
---
[PASTE NOTES]
---
Produce:
1) Bullet list of intake GAPs (unanswered must-haves).
2) Filled PROJECT-BRIEF.md body (markdown).
3) Filled SCOPE-CHECKLIST.md (in / out / revisions defaults / milestones).
Rules: no legal contract language; no lead-gen; if decision-maker missing, say GAP and do not claim scope is locked; ambiguous items go Out of scope.
```

### Intake polish only

```text
Update INTAKE.md from these notes. Keep existing answered fields. Mark unknowns as GAP:. Summarize top 5 blockers to kickoff.
```

### Kickoff pack

```text
Using PROJECT-BRIEF.md and SCOPE-CHECKLIST.md, draft: (1) KICKOFF-AGENDA decision-lock rows tailored to this project, (2) welcome email and kickoff confirmation email from EMAIL-SCRIPTS.md with brackets filled, (3) first-week slice for DOD-FIRST-WEEK.md Day 3–4.
```

### Scope-change helper

```text
Client asked: "[ASK]". Compare to SCOPE-CHECKLIST.md. Classify In-scope revision vs Out-of-scope change. Draft the scope-change email (options A defer / B swap / C expand) without starting work.
```

### Access chase

```text
From ACCESS-OWNERS.md and notes, list P0 access blockers with owner names and a one-sentence ask for each. Draft access-reminder emails.
```

---

## Example input → output

**Input:** “Call notes: bakery wants app, maybe payments, cousin helps with Instagram, budget like 8k, needs something before holiday market, Alex is the owner but sister pays invoices sometimes…”

**Bad agent behavior:** Declares scope locked; invents full feature list; writes MSA clauses; assumes Stripe live keys.

**Good agent behavior:**

- `GAP: decision-maker for scope` (Alex vs sister)—block lock until named.
- Brief promise draft + non-goals (no Instagram growth retainer).
- Out of scope: marketing retainer; In scope left as GAP until must/nice split confirmed.
- Payments: flag `COMPOSE-WITH-PRODUCT1.md` if Auth+Stripe path wanted.
- Milestones tentative until dates confirmed with decision-maker.

---

## Failure modes / tips

| Failure | Fix |
|---------|-----|
| Soft scope (“probably also…”) | Park in Out; require written In |
| Missing decision-maker | GAP; delay lock |
| Agent writes legal fees / kill % | Only copy client-agreed terms into checklist note |
| Billing architecture essay | Link Product #1 compose one-pager |
| Three tools updated differently | One workspace path (START-HERE Path A/B/C) |

---

## Done means (skill run)

- Gaps list is explicit.
- Brief + scope checklist are coherent and non-contradictory.
- No TODO / TBD / lorem left in generated client-facing drafts (use `GAP:` if unknown).
- Emails are sendable after human review of amounts and dates.

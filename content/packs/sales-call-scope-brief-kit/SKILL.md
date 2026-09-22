# SKILL — Sales Call → Scope Brief Kit

**Skill name:** `sales-call-scope-brief`  
**For:** Claude Code, Cursor Agent, and similar agents  
**Pack root:** this folder (markdown templates + skill)  
**Buyer delivery:** https://hacode.solutions  
**Price context:** $35 operating kit  

---

## When to use

Use this skill when the user just finished (or is finishing) a **sales / discovery call** and needs:

- Messy notes / transcript → **discovery gaps** → **locked scope brief**
- Same-day “Heard you” recap + follow-up email drafts
- A tight close pack—not CRM/lead-gen, not lawyer MSAs, not Week 0 onboarding

Do **not** use this skill to:

- Draft binding MSAs or lawyer liability clauses
- Build lead-gen / CRM sequences
- Run post-deposit Week 0 onboarding (that’s Product #2 — `freelancer-client-onboarding-kit`, $39)
- Implement Auth → Checkout → Entitlement (that’s Product #1 — `mvp-auth-stripe-billing`, $49)

---

## Preconditions

1. Read `START-HERE.md` once for promise and Not-for.
2. Work in the **prospect’s working copies** of templates (or create them from this pack).
3. Prefer editing: `LIVE-NOTES.md` → `SCOPE-BRIEF.md` → `RECAP-EMAIL.md` / `FOLLOW-UP-EMAILS.md`.
4. Never invent a named decision-maker; if missing, emit `GAP: decision-maker` and refuse “scope locked” language.
5. Cap open questions at **≤3**. Extra questions go to a parking lot, not the brief.
6. Default soft asks (“make it pop”, “maybe Stripe”, “AI somewhere”) → **Out** until written In.

---

## Workflow

1. **Ingest** — Accept messy notes, call transcripts, email threads, form answers.
2. **Gap pass** — List unanswered must-haves (decision-maker, budget band, hard date, must vs nice, success metric).
3. **Live notes** — Patch `LIVE-NOTES.md` with known facts; mark unknowns `GAP:`.
4. **Scope brief** — Draft `SCOPE-BRIEF.md`: outcome, deliverables, exclusions, assumptions, open questions ≤3.
5. **Boundary** — Anything ambiguous → Out; do not silently expand deliverables.
6. **Recap + follow-up** — Draft same-day recap from `RECAP-EMAIL.md`; prepare Email 1 from `FOLLOW-UP-EMAILS.md`.
7. **Quote gate** — Point human to `PRICING-WORKSHEET.md` + `QUOTE-SOW-CHECKLIST.md` (do not invent final prices).
8. **Catalog checks** — If deposit clears → `HANDOFF-TO-PRODUCT2.md`. If paid signup is In → `COMPOSE-WITH-PRODUCT1.md`.
9. **Stop rule** — After two contradictory client statements, present both in open questions / assumptions; do not silently pick. After free-consulting pressure, draft Script C boundary—not more free architecture.

---

## Copy-paste prompts

### Messy notes → gaps → locked scope brief

```text
Read SKILL.md and .cursorrules from the Sales Call → Scope Brief Kit.
Here are messy notes / transcript:
---
[PASTE NOTES]
---
Produce:
1) Bullet list of discovery GAPs (unanswered must-haves).
2) Filled SCOPE-BRIEF.md body (outcome, deliverables, exclusions, assumptions, open questions ≤3).
3) Filled “Heard you” recap email from RECAP-EMAIL.md.
Rules: no legal MSA language; no CRM/lead-gen; no Week 0 onboarding pack rewrite; if decision-maker missing, say GAP and do not claim scope is locked; ambiguous items go Out of scope; open questions max 3.
```

### Live notes polish only

```text
Update LIVE-NOTES.md from these notes. Keep existing answered fields. Mark unknowns as GAP:. Cap open questions at 3. Park soft “make it pop” / maybe-payments in Out.
```

### Recap + send-brief pair

```text
Using SCOPE-BRIEF.md, draft: (1) same-day recap from RECAP-EMAIL.md Script A or B, (2) FOLLOW-UP Email 1 with brackets filled. Do not invent deposit amounts—leave [amount] if unknown.
```

### Free-consulting boundary

```text
The prospect is asking for more unpaid architecture on email. Draft RECAP Script C / close-lose variant. Restate In/Out. Offer (1) confirm brief + quote or (2) paid discovery spike. Do not continue free redesign.
```

### Quote readiness check

```text
Compare SCOPE-BRIEF.md to QUOTE-SOW-CHECKLIST.md section A. List blockers to sending a quote. Do not invent prices; point to PRICING-WORKSHEET.md fields the human must fill.
```

---

## Example input → output

**Input:** “Call notes: clinic wants online intake + reminders, maybe patient payments later, office manager on call but owner signs checks, said make the UI pop, budget around 6–8k, wants something before flu season rush…”

**Bad agent behavior:** Declares scope locked; invents full design system; writes MSA clauses; assumes Stripe live; lists 12 open questions; starts Week 0 access owners.

**Good agent behavior:**

- `GAP: decision-maker for scope` (office manager vs owner)—block lock until named.
- Outcome draft tied to flu-season horizon; deliverables = intake + reminders.
- Out: undefined “make it pop”; patient payments/Stripe until In (compose Product #1 if later In).
- Open questions ≤3 (scope owner, payments in v1?, hard date).
- Recap Script B if owner absent; pricing left to human worksheet.

---

## Failure modes / tips

| Failure | Fix |
|---------|-----|
| Soft scope (“make it pop”) | Park Out; require written In + price impact |
| Missing decision-maker | GAP; refuse lock; Script B |
| Free consulting trap | Script C; paid spike or stop |
| Agent writes legal fees / kill % | Only copy client-agreed terms; else leave blank |
| Agent starts onboarding kit | Point to HANDOFF-TO-PRODUCT2 after deposit |
| Billing architecture essay | Link COMPOSE-WITH-PRODUCT1 |
| >3 open questions | Trim to quote blockers only |

---

## Done means (skill run)

- Gaps list is explicit.
- Scope brief is coherent: outcome + In/Out + assumptions + ≤3 open questions.
- No TODO / TBD / lorem in generated prospect-facing drafts (use `GAP:` if unknown).
- Recap / follow-up emails are sendable after human review of amounts and dates.
- Lock language used only when decision-maker is named.

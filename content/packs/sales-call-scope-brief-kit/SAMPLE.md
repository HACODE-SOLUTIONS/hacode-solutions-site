# SAMPLE — 10-minute redacted discovery → locked scope brief (listing proof)

**Product:** Sales Call → Scope Brief Kit / Discovery-to-Scope Pack  
**Buy / deliver from:** https://hacode.solutions  
**Price:** $35  
**What this sample shows:** a stranger can turn **messy discovery-call notes** into a locked-shaped scope brief + sendable “Heard you” recap in **≤10 minutes**, without a live prospect on the line.

This is a **redacted before/after**, not legal advice, not a CRM, and not Week 0 onboarding. Bracketed names are fake.

---

## What you need open

1. This pack folder (after purchase from https://hacode.solutions).
2. Cursor or Claude Code with `SKILL.md` + `.cursorrules` visible.
3. Ten minutes on a timer.

---

## Messy notes (input — before)

```text
Discovery call 2026-09-21 — Rivermark Dental (group practice, 3 locations).
On Zoom: Priya Nair (office manager) + dentist who dropped after 8 min.
They want online patient intake + appointment reminder texts. "Make the forms
pop" — brand colors maybe later. Also mentioned patient payment plans "maybe
in phase 1 if easy." Budget "around 6 to 8k" fixed if possible. Flu-season rush
— want staging before Oct 15 staff training; soft go-live end of October.
Have paper PDFs today + Front desk uses Google Calendar. No repo yet. Sister's
cousin built a Squarespace page last year, abandoned. Priya says she "runs
day to day" but Dr. Evan Cho "signs anything over ~$2k." I talked too long about
Twilio vs alternatives (felt like free consulting). Next step vague — "send us
some ideas."
```

---

## Minute 0–2 — Orient

Skim `START-HERE.md` promise + Not for. Confirm this is **pre-yes close**, not Product #2 Week 0 and not Product #1 code.

---

## Minute 2–6 — Point the agent

Paste:

```text
Read SKILL.md and .cursorrules from the Sales Call → Scope Brief Kit.
Using the messy notes in SAMPLE.md, produce:
1) a short list of discovery GAPs,
2) a filled SCOPE-BRIEF.md body (outcome, deliverables, exclusions, assumptions, open questions ≤3),
3) a filled “Heard you” recap email from RECAP-EMAIL.md.
Do not invent legal MSA language. Do not expand into CRM/lead-gen or Week 0 onboarding.
```

---

## Minute 6–8 — What “good” output looks like (redacted fill)

### Discovery gaps (expected)

1. `GAP: decision-maker for scope` — Priya day-to-day vs Dr. Evan Cho signs >~$2k; need Evan (or written authority) before lock.
2. `GAP: payments in v1` — patient payment plans “if easy” → default **Out** until written In.
3. `GAP: hard date owner` — Oct 15 staging / end-Oct go-live confirmed by whom?

### Scope brief (excerpt)

> We will deliver a web-based patient intake flow plus appointment reminder messages so Rivermark Dental can train staff on staging by **Oct 15, 2026** and soft-launch by **end of October 2026**.

**Deliverables (In):**  
1) Mobile-friendly intake forms replacing paper PDF fields they specify  
2) Staff notification when an intake is submitted  
3) Appointment reminder messages (channel chosen in assumptions: SMS **or** email—pick one for v1)  
4) Staging environment + short staff how-to  
5) Handoff notes / README  

**Exclusions (Out):** undefined “make the forms pop” / brand redesign; multi-location custom workflows beyond shared template; Squarespace rebuild; marketing site; **patient payment plans / Stripe** until decision-lock says In (if In later → compose Product #1 `mvp-auth-stripe-billing`, $49); native mobile apps.

**Assumptions:** single shared intake template across 3 locations; Google Calendar stays source of truth for appointments in v1 (no full PMS replacement); client supplies PDF field list within 5 business days of deposit.

**Open questions (≤3):**  
1) `GAP: decision-maker` — Will Dr. Evan Cho confirm scope/budget, or grant Priya written authority?  
2) Reminders: SMS or email for v1?  
3) Payments: confirm **Out** for v1?

**Status:** Draft — **not locked** until decision-maker GAP closes.

### Recap email (filled — Script B tone)

**Subject:** Heard you — need Dr. Cho before we lock Rivermark intake scope

```text
Hi Priya,

Thanks for the time today on Rivermark intake + reminders. Here’s what I heard:

• Trigger: paper PDFs + front-desk reminder load ahead of flu season
• Success: staging ready for Oct 15 staff training; soft go-live end of October
• v1 In: web intake (shared template), staff submit notification, appointment
  reminders (one channel), staging + short how-to
• v1 Out for now: “make it pop” brand redesign, Squarespace rebuild, patient
  payment plans / Stripe until we write them In
• Constraints: fixed band ~$6–8k discussed; 3 locations; Google Calendar stays

Open questions before I quote:
1) Can Dr. Evan Cho confirm scope/budget (or grant you written authority)?
2) Reminders in v1: SMS or email?
3) Keep patient payment plans Out of v1?

I’ll draft the one-page scope brief on that In/Out list as soon as we have
decision-maker confirmation—not a free “ideas” redesign thread. Reply on this
thread or propose 20 minutes with Dr. Cho.

Talk soon,
[Your Name]
```

---

## Minute 8–10 — Follow-up + quote gate

1. Open `FOLLOW-UP-EMAILS.md` → **Email 1 — Send brief** (send only after GAP #1 closes; until then keep Script B).  
2. Skim `QUOTE-SOW-CHECKLIST.md` §A — blockers: decision-maker GAP, payments default Out, channel pick.  
3. Note handoff: when deposit clears → Product #2 (`freelancer-client-onboarding-kit`, $39) per `HANDOFF-TO-PRODUCT2.md`.

Optional Email 1 stub (after Evan confirms):

**Subject:** Scope brief for Rivermark intake — please confirm

```text
Hi Priya and Dr. Cho,

Scope brief attached for Rivermark intake + reminders (Oct 15 staging target).
In: web intake, staff notification, [SMS/email] reminders, staging + how-to.
Out: brand “pop” redesign, payment plans, Squarespace rebuild.

Reply “confirmed” or bullet redlines. Then I’ll send the quote inside the
~$6–8k band we discussed (final number with deposit on the quote).

Thanks,
[Your Name]
```

---

## What “good” looks like vs vague prompting

| Vague prompt only | With this pack |
|-------------------|----------------|
| “Send us some ideas” → free consulting essay | Recap + In/Out + ≤3 questions |
| Soft “make it pop” becomes unpaid UI rebuild | Parked **Out** until written In |
| “Payments if easy” lands in fixed bid silently | Default **Out** + Product #1 compose pointer |
| Office manager treated as budget owner | `GAP: decision-maker` blocks lock |
| Jump to kickoff/access lists | Stays in close kit; #2 only after deposit |
| Quote with TBD scope | QUOTE-SOW checklist blocks send |

---

## Listing bullets (Growth / page copy seeds)

- Turn a sales or discovery call into a locked scope brief a builder or AI can execute—same day.
- Cursor/Claude skill: messy notes → gaps → scope brief + “Heard you” recap (not a prompt dump alone).
- Built for AI-coding freelancers; hands off Week 0 to the $39 onboarding kit and Auth+Stripe builds to the $49 DevSpec.
- Includes sample discovery call a stranger can finish in ≤10 minutes.
- Delivered as markdown templates + skill from https://hacode.solutions — $35.

---

## Limits (honest)

- Not CRM/lead-gen, not a proposal-writing course, not lawyer MSAs.
- Sample does not include a Notion import file or PDF suite.
- Week 0 onboarding lives in Product #2; Stripe implementation detail lives in Product #1.

---

## Next after this sample

Buyers: start at `START-HERE.md`, copy templates to the real prospect folder, tick `CHECKLIST.md`, read `FAQ.md` footguns. Exact zip list: `CONTENTS.md`.

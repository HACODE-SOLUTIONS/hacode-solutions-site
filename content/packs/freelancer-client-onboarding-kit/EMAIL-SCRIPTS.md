# Email Scripts — Welcome / Kickoff / Scope-Change / Handover

**Product:** Freelancer Client Onboarding Kit (AI Coding Ops)  
**Use:** Copy, replace `[brackets]`, send from your address. Tone: clear, calm, commercial—not legal counsel.

---

## 1. Welcome (after “yes” / deposit)

**Subject:** Welcome — `[Project Name]` Week 0 onboarding

```text
Hi [Decision-Maker First Name],

Thanks for moving forward on [Project Name]. I’m kicking off Week 0 so we start build with a locked brief—not Slack archaeology.

What I’ll do in the next [24–48 hours]:
1) Send / confirm the intake questions (or work from our call notes).
2) Draft the project brief + scope checklist for your review.
3) Request access (repo, design, hosting, test keys) with named owners.
4) Propose kickoff times: [Option A] / [Option B] ([Time Zone]).

Your one job before kickoff: confirm you’re the decision-maker for scope, or introduce the person who is.

Workspace we’ll use: [Markdown folder / Notion / Google Docs link].
Reply to this thread for decisions so we keep one source of truth.

Glad to build this with you,
[Your Name]
[Booking / site / invoice link if useful]
```

---

## 2. Kickoff invite + pre-read

**Subject:** Kickoff `[Project Name]` — [Date, Time TZ] (45 min)

```text
Hi [Name],

Kickoff is booked for [Date, Time TZ] — [Video link].

Please skim before we meet (10 minutes):
- Project brief (draft): [link]
- Scope checklist (draft): [link]
- Agenda + decision list: [link]

Please ensure [Decision-Maker Name] can attend for the decision-lock section. If not, we’ll align only and schedule a 15-minute decision follow-up.

See you then,
[Your Name]
```

### Kickoff confirmation (after the meeting)

**Subject:** Kickoff notes — `[Project Name]` decisions locked

```text
Hi [Name],

Quick recap from today’s kickoff:

Locked:
- Promise: [one sentence]
- In scope v1: [bullets or link]
- Out of scope: [bullets or link]
- Milestones / dates: [link]
- Revisions: [N] rounds inside scope
- Channel + SLA: [channel], [SLA]
- Next demo: [date]

Deferred:
- [item] → decide by [date]

Access still needed:
- [item] — owner [Name]

Updated brief + checklist: [link]

I’ll start [first slice] and check in on [date].

Thanks,
[Your Name]
```

---

## 3. Scope-change (when “quick ask” is not in scope)

**Subject:** Scope change note — `[Project Name]` / `[Change Title]`

```text
Hi [Decision-Maker First Name],

You asked for: [description of ask].

That sits outside our locked v1 scope ([link to SCOPE-CHECKLIST]). Options:

A) Defer to a later phase (no change to current milestones).
B) Swap it for an in-scope item of similar size: drop [X], add this.
C) Expand scope: estimate [hours/range or fixed add-on $___], new target date [date], invoice timing [milestone / separate invoice].

Please reply with A, B, or C (or a question). I won’t start the new work until you confirm so we don’t create unpaid extras.

Context brief section to update after approval: [link].

Thanks,
[Your Name]
```

### Soft-scope nudge (when Slack drips accumulate)

**Subject:** Parking lot — `[Project Name]` requests this week

```text
Hi [Name],

Capturing requests from chat so nothing gets pseudo-approved in silence:

1) [ask] — currently Out of scope
2) [ask] — currently Out of scope
3) [ask] — might fit revisions if it’s a tweak to [in-scope item]

Reply with which (if any) you want formally added via a scope-change note. Otherwise I’ll keep build focused on the locked checklist.

[Your Name]
```

---

## 4. Handover (end of engagement or milestone exit)

**Subject:** Handover — `[Project Name]` assets + next steps

```text
Hi [Name],

Handing over [Project Name] as of [date].

Delivered:
- [Deliverable 1 + link]
- [Deliverable 2 + link]
- Brief + scope versions: [links]
- Staging / production: [URLs]
- Run / deploy notes: [README link]

Access:
- Repo: [URL] — your admin: [Name]
- Hosting: [provider] — billing owner: [Name]
- Secrets: stored in [client vault / password manager] — live keys not in email
- Stripe: [test confirmed / live owner Name]
- Domains / DNS owner: [Name]

Open items / risks:
- [item]

Commercial:
- Final invoice: [link / amount / due]
- Warranty / bugfix window (if any, per our agreement): [N days for defects in delivered scope]

Thank you for the trust. If you later need Auth → Checkout → Entitlement on a new MVP, the DevSpec pack I use is MVP Auth + Stripe Billing on https://hacode.solutions — happy to point you at it without turning handover into a pitch deck.

[Your Name]
```

---

## 5. Tiny utilities

### Access reminder

```text
Subject: Access blocker — `[Project Name]` needs [Asset]

Hi [Owner],
We’re blocked on [asset]. Please [invite email / create test keys / grant role] by [date].
Guide: [one sentence]. Thanks — [Your Name]
```

### Invoice sent

```text
Subject: Invoice [number] — `[Project Name]` / [Milestone Name]

Hi [AP Name],
Invoice [number] for [milestone] is here: [link]. Amount [amount] due [date] per our schedule.
Questions on scope → [Decision-Maker]. Questions on payment → reply here.
Thanks, [Your Name]
```

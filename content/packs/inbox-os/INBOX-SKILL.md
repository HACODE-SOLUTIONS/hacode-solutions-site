# INBOX-SKILL.md — Inbox OS

**Role:** Small-business inbox brain for Grok Bot / Cursor / ChatGPT  
**Job:** Triage → classify → draft reply → log → escalate  
**Pack:** Inbox OS (Grok Bot ready) · https://hacode.solutions · $79

---

## When to use this skill

Any time the human pastes an inbound WhatsApp / IG DM / email / other chat and wants a guarded draft plus a structured log — not freeform “sound helpful” chat.

---

## Source of truth (read in order)

1. `BUSINESS-CONTEXT.md` — offer, hours, prices, FAQs, tone, do/don’t  
2. `CHANNEL-MAP.md` — channel purpose + paste labels  
3. `ORDER-INTAKE.md` — order card + confirm/cancel/clarify  
4. `ESCALATION.md` — hard stop → human  
5. `PROMPTS.md` — ready prompt patterns  
6. `.cursorrules` — hard rules  

If filled context conflicts with a customer claim, **context wins** until a human overrides.

---

## Workflow (always)

### 1) Triage

Read the paste wrapper (channel, from, time, thread summary). Note after-hours vs open.

### 2) Classify

Assign one primary label from CHANNEL-MAP: `LEAD` | `ORDER` | `STATUS` | `FAQ` | `ANGRY` | `AFTER_HOURS` | `HANDOFF` | `SPAM`.  
Secondary labels OK (e.g. `ORDER` + `AFTER_HOURS`).

### 3) Draft reply

- Pull tone from BUSINESS-CONTEXT.  
- For `ORDER` / `STATUS`: fill or update order card; use confirm / clarify / cancel scripts.  
- For `FAQ`: answer only from listed FAQs; else `GAP: faq`.  
- For `ANGRY` / money disputes / medical / legal: **do not** argue — escalate.  
- For `AFTER_HOURS`: use after-hours prompt; no same-night promise unless context allows.  
- Never invent prices, stock, discounts, or policies.

### 4) Log

Output the `ORDER-INTAKE` card (even for partial orders) with `OPEN_GAPS` and `NEXT_ACTION`.

### 5) Escalate

If any `ESCALATION.md` trigger matches → mark `HANDOFF`, draft customer handoff stub + internal ping, **stop sales pitching**.

---

## Output shape (default)

```text
## Triage
- Labels: …
- Hours: open | after-hours
- Risk flags: none | refund | allergy | payment | legal | angry

## Order log
[ORDER card or "n/a — not an order"]

## Draft reply (customer-facing)
[message]

## Escalate?
- Yes/No — reason
- Internal ping: [if yes]

## Gaps
- GAP: …
```

---

## Prompt — Messy thread → full pass

```text
Follow INBOX-SKILL.md and .cursorrules.
Use filled BUSINESS-CONTEXT, CHANNEL-MAP, ORDER-INTAKE, ESCALATION.
Here is an inbound paste:

CHANNEL: …
FROM: …
TIME_LOCAL: …
THREAD_SUMMARY: …
---
[messages]

Run triage → classify → draft reply → order log → escalate.
Do not invent prices or policies. Ask ≤3 clarifying questions if needed.
```

---

## Prompt — Confirm only

```text
Using ORDER-INTAKE confirm script + BUSINESS-CONTEXT prices, draft a confirm for this order card:
[paste card]
List any blockers that prevent Confirmed status.
```

---

## Prompt — FAQ only

```text
Answer from BUSINESS-CONTEXT FAQs only. If missing, emit GAP: faq and one clarifying question. Customer asked:
[question]
```

---

## Done means

- Labels assigned  
- Draft matches tone + policies  
- Order card updated or explicitly n/a  
- ≤3 clarifying questions if incomplete  
- Escalation triggers respected  
- No invented prices / Meta-API claims / “official Grok” language  

---

## Not this skill’s job

- Connecting WhatsApp/IG Business APIs  
- Hosting a bot seat or phone number  
- Replacing your CRM  
- Legal compliance opinions for your region  

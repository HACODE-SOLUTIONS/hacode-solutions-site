# PROMPTS — ready patterns

**Product:** Inbox OS (Grok Bot ready)  
**Use with:** filled BUSINESS-CONTEXT + ORDER-INTAKE + INBOX-SKILL + ESCALATION  
**Rule:** Never invent prices/policies. Draft for human send unless authorized.

---

## 1) New lead (IG / WhatsApp curiosity)

```text
Follow INBOX-SKILL.md. Label LEAD.
Customer just asked about what we offer. Using BUSINESS-CONTEXT, draft a short welcome that:
- names what we sell in one line,
- asks ≤2 qualifying questions (item interest + date needed),
- invites them to WhatsApp/email if CHANNEL-MAP says move for order lock,
- does not invent discounts.
Paste:
CHANNEL: …
FROM: …
---
[message]
```

---

## 2) Order confirm

```text
Follow ORDER-INTAKE confirm script.
Fill the order card from this thread. If minimum Confirmed fields missing, draft clarify (≤3 gaps) instead of confirm.
Use only BUSINESS-CONTEXT prices.
Paste:
[thread + any prior card]
```

---

## 3) FAQ

```text
Answer from BUSINESS-CONTEXT FAQs only. If not listed, emit GAP: faq and one clarifying question — do not invent.
Customer question:
[question]
```

---

## 4) Angry customer

```text
Labels: ANGRY + HANDOFF.
Do not argue, do not offer unauthorized refunds/discounts.
Draft: (a) short empathy + handoff stub to owner, (b) internal ping per ESCALATION.md.
Paste:
[thread]
```

---

## 5) After-hours

```text
Label AFTER_HOURS. Hours from BUSINESS-CONTEXT.
Draft an after-hours ack: we saw the message, next open [day/time], no same-night fulfillment unless context explicitly allows.
If order intent is clear, still fill a partial order card with GAPS — do not confirm.
Paste:
TIME_LOCAL: …
---
[message]
```

---

## 6) Status check (existing order)

```text
Label STATUS. Match ORDER_ID / name / date from the paste or say GAP: order identity.
Draft a calm status update. If payment/proof unclear, say human will verify — do not mark Paid yourself.
Paste:
[thread]
```

---

## 7) Full messy inbox dump (SAMPLE / weekly catch-up)

```text
Read INBOX-SKILL.md and .cursorrules.
For each message block, triage → classify → draft → log → escalate.
Output one section per customer. Prefer tables for order logs.
Do not invent prices. Do not claim this pack is Grok Bot or WhatsApp itself.
Paste:
[multi-message dump]
```

# CHANNEL-MAP — where each chat lives

**Product:** Inbox OS (Grok Bot ready)  
**Purpose:** Tell the agent what each channel is *for*, what never belongs there, and how you paste messages in. This pack does **not** connect APIs for you.

---

## Channel roster

| Channel | Primary use | Never for | How you feed the bot | Owner |
|---------|-------------|-----------|----------------------|-------|
| WhatsApp | [orders / quick questions / delivery updates] | [long contracts / card numbers] | [paste thread / export / screenshot OCR] | [Name] |
| Instagram DM | [discovery / menu Qs / soft leads] | [final payment confirmation if possible — move to WA/email] | [paste DM] | [Name] |
| Email | [quotes / invoices / formal cancel] | [urgent same-hour pickup unless monitored] | [paste email body] | [Name] |
| Other: [SMS / Facebook / TikTok] | [ ] | [ ] | [ ] | [ ] |

---

## Default routing rules (edit to match your shop)

1. **New lead + product interest on IG** → qualify lightly → move to WhatsApp or email for order lock.  
2. **Order intent on WhatsApp** → run `ORDER-INTAKE.md` fields → confirm script.  
3. **Payment proof** → human verifies before “booked” language (bot drafts “received, confirming shortly” unless you authorize auto-confirm).  
4. **Angry / refund / allergy incident** → stop drafting sales tone → `ESCALATION.md`.  
5. **After hours** → use after-hours prompt in `PROMPTS.md`; do not promise same-night fulfillment unless BUSINESS-CONTEXT says so.

---

## Paste format (recommended)

When you drop a message into the agent, use this wrapper so triage is reliable:

```text
CHANNEL: [WhatsApp | IG DM | Email | Other]
FROM: [customer name or handle]
TIME_LOCAL: [YYYY-MM-DD HH:MM America/New_York or your zone]
THREAD_SUMMARY: [1 line prior context, or "new"]
---
[paste raw message(s)]
```

---

## Labels the skill will apply

| Label | Meaning |
|-------|---------|
| `LEAD` | Curious, not ordering yet |
| `ORDER` | Wants to buy / book |
| `STATUS` | Asking about an existing order |
| `FAQ` | General question answered in BUSINESS-CONTEXT |
| `ANGRY` | Complaint, refund pressure, hostility |
| `AFTER_HOURS` | Outside published hours |
| `HANDOFF` | Needs human now |
| `SPAM` | Irrelevant / scam — do not engage beyond ignore/block policy |

---

## Meta / platform note (not legal advice)

Connecting WhatsApp Business, Instagram professional inbox, or Meta APIs is **your** account work. This pack teaches the agent how to behave on pasted text. Check your region’s rules for automated messaging. See `FAQ.md`.

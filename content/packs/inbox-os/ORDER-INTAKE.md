# ORDER-INTAKE — fields, confirm, cancel, handoff

**Product:** Inbox OS (Grok Bot ready)  
**Purpose:** Structured order card the agent fills from messy chat. Incomplete fields → `GAP:` — never invent.

---

## Order card (copy per order)

```text
ORDER_ID: [auto or YYYYMMDD-##]
CHANNEL: [WhatsApp | IG DM | Email | Other]
STATUS: [Inquiry | Awaiting deposit | Confirmed | Cancelled | Fulfilled | Escalated]
CUSTOMER_NAME: [ ]
CUSTOMER_CONTACT: [phone / @handle / email]
ITEM: [ ]
QTY: [ ]
FLAVOR_SIZE_VARIANT: [ ]
DATE_NEEDED: [YYYY-MM-DD]
TIME_NEEDED: [HH:MM or pickup window]
FULFILLMENT: [Pickup | Delivery | Ship]
ADDRESS_OR_PICKUP: [ ]
ALLERGIES_NOTES: [none stated | …]
PRICE_QUOTED: [$ from BUSINESS-CONTEXT or GAP: price]
DEPOSIT_DUE: [$ or none]
PAYMENT_STATUS: [Not started | Proof received — human verify | Paid]
SPECIAL_REQUESTS: [ ]
OPEN_GAPS: [bullet GAP: fields]
NEXT_ACTION: [ask X | send confirm | escalate | wait human]
LOGGED_AT: [YYYY-MM-DD HH:MM local]
```

---

## Minimum fields before “Confirmed”

Tick all before the bot uses **confirmed / booked / you’re on the calendar** language:

- [ ] Customer name or reliable handle  
- [ ] Item + qty + variant  
- [ ] Date needed (and time if same-day sensitive)  
- [ ] Fulfillment method + location  
- [ ] Price quoted from BUSINESS-CONTEXT (or human-approved custom quote)  
- [ ] Deposit rule satisfied **or** explicitly waived by human  

If any missing → draft a **clarify** reply, not a confirm.

---

## Confirm script (template)

Fill from order card + BUSINESS-CONTEXT. Keep short.

```text
Hi [Name] — confirming your order:

• [Item] × [Qty] ([variant])
• [Date] [time/window]
• [Pickup / Delivery]: [place]
• Total: $[price] ([deposit] due to hold)

Reply YES to lock, or tell me what to change. Payment: [method from BUSINESS-CONTEXT].
— [Business Name]
```

**Bot rule:** Do not send “YES / locked” on the customer’s behalf. Draft only unless the human authorizes send.

---

## Cancel / change script

```text
Hi [Name] — got it. Cancelling [ORDER_ID] for [Date] / [Item].

Per our policy: [paste cancel line from BUSINESS-CONTEXT].
If you want to reschedule instead, send the new date/time.
— [Business Name]
```

If policy is unclear → `GAP: cancel policy` + escalate.

---

## Clarify script (missing fields)

```text
Happy to help with [Item]! To lock it I still need:
1) [GAP field 1]
2) [GAP field 2]
3) [GAP field 3]

Once I have those I’ll send a clean confirm with price + [deposit/pickup].
— [Business Name]
```

Ask **≤3** gaps at a time.

---

## Human handoff stub

When `ESCALATION.md` fires:

```text
Thanks for flagging this — I’m looping in [Owner Name] so you get a real human on it. They’ll reply on this thread / [channel] as soon as they can during [hours].
```

Internal ping (not to customer):

```text
HANDOFF: [ORDER_ID or LEAD]
Channel: [ ]
Why: [angry / refund / allergy / custom quote / payment dispute / legal]
Snippet: [2–3 lines]
Suggested human next step: [ ]
```

# ESCALATION — when the bot must stop and ping a human

**Product:** Inbox OS (Grok Bot ready)  
**Default posture:** draft replies are fine; **auto-resolve money/legal/medical fights is not.**

---

## Hard stop triggers (always escalate)

| Trigger | Bot may… | Bot must not… |
|---------|----------|---------------|
| Refund / chargeback / “I want my money back” | Empathy + handoff stub | Promise refund amounts or timelines not in BUSINESS-CONTEXT |
| Angry / insulting / threat | Short calm handoff | Argue, match tone, guilt-trip |
| Allergy reaction / medical claim | Handoff immediately | Medical advice or “you’ll be fine” |
| Legal / lawyer / police / regulator language | Handoff; preserve quote | Admit liability or invent policy |
| Custom quote outside published menu | Capture requirements + handoff | Invent a price |
| Payment dispute (“I paid, you didn’t get it”) | “Human verifying proof” | Mark Paid without human |
| Underage / sensitive safety issues | Stop; human only | Continue sales chat |
| Press / influencer “collab for exposure” | Optional polite decline draft **or** handoff | Commit free product unless policy says yes |
| Anything outside BUSINESS-CONTEXT do/don’t | GAP + handoff | Guess |

---

## Soft escalate (human review before send)

- First-time large order above [your threshold: e.g. $200]  
- Same-day / rush when capacity unknown  
- Delivery to a new address outside usual area  
- Customer asks to “talk to a person” (honor immediately)

---

## Internal ping template

```text
HANDOFF NEEDED
Channel: [WhatsApp | IG DM | Email | Other]
From: [name/handle]
Order/Lead: [ORDER_ID or n/a]
Trigger: [refund | angry | allergy | legal | custom quote | payment dispute | other]
Snippet:
> [2–4 lines]
Suggested next step for human: [ ]
Customer already told: [handoff stub sent? draft-only?]
Logged_at: [local time]
```

---

## Customer-facing handoff stub

```text
Thanks for flagging this — I’m looping in [Owner Name] so you get a real human. They’ll reply here during [hours from BUSINESS-CONTEXT].
```

---

## After escalate

1. Mark order/lead `STATUS: Escalated` on the card.  
2. Stop sales upsell in that thread until human clears it.  
3. Human owns resolution; bot may draft follow-ups **only** from human notes.

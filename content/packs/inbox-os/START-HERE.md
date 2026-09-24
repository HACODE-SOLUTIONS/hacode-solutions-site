# START HERE — Inbox OS

**Public name:** Inbox OS  
**Subtitle:** Grok Bot ready  
**Also called:** Small-Business Chat Connector Pack · Order & DM Context Pack  
**Buy / deliver from:** https://hacode.solutions  
**Price:** $79 one-time digital download  
**Promise:** Configure a Grok Bot agent that becomes your small-business **inbox brain** — WhatsApp, Instagram DMs, and other chats — so you catch orders and manage conversations without tab-hopping.

This zip is a **configuration pack**: business context, channel map, order intake, inbox skill, prompts, escalation rules, and Cursor rules. **Not** a hosted bot seat, not Meta/WhatsApp Business API done-for-you, not a CRM.

**Disclaimer:** Independent digital pack. Not affiliated with, endorsed by, or part of xAI, X, or Grok. Grok Bot is a third-party product; buyer needs their own access. No xAI/Grok logos. Pack only — not hosting seats.

---

## Who it’s for

- Owners of small shops, studios, local services, and solo operators who already get **orders and questions** in WhatsApp / IG DMs (and similar).
- People who miss orders because chats live in five tabs and nobody logs them.
- **Purchase moment:** “I have (or will get) Grok Bot; I need the inbox + orders kit tonight.” — not a blank platform and a weekend of prompting.
- Buyers who will load this pack in **Grok Bot** — or Cursor / ChatGPT Projects — and need **one agent context** that sorts, drafts replies with guardrails, and logs what matters.

## Who it’s not for

- Anyone expecting **hosted bot seats** or us to run the inbox for you.
- Anyone needing **Meta / WhatsApp Business API** provisioning, phone numbers, or Business verification done-for-you.
- Anyone looking for a **CRM replacement** (HubSpot, Salesforce, etc.).
- Anyone wanting **legal advice** on messaging, spam, or automation compliance in their region.
- **Email-only triage SaaS** buyers (e.g. InboxAgent-style Gmail/M365 boards) — this pack is multi-chat **orders + DMs**, not an email classifier.
- **Enterprise contact centers** / CCaaS — out of lane.
- A substitute for paid ads, funnel builders, or social media scheduling tools.
- Anyone who thinks this zip **is** Grok Bot or WhatsApp itself — it is not.

## How this differs (pack vs platform vs channel)

| Alternative | What it is | When they win | Gap this pack fills |
|-------------|------------|---------------|---------------------|
| **InboxAgent** (~$20/mo email triage) | Read-only email lead boards | Email-only triage on Gmail/M365/IMAP | No multi-chat order brain, no WhatsApp/IG order pack |
| **Plain Grok Bot** | Blank computer-agent platform | You will design roles yourself | Blank ≠ DFY SMB inbox/order context, skills, escalation, SAMPLE |
| **WhatsApp Business** | Chat **channel** (app free; API paid/complex) | You need catalog / quick replies on one number | Channel ≠ ops config kit; still need an agent brain |

**Differentiation:** (1) pack, not platform/channel · (2) orders + multi-chat · (3) one-time digital vs monthly SaaS. Platform fee stays with Cursor/xAI; channel stays with Meta/WhatsApp.

---

## Setup ≤60 minutes (first live agent)

| Block | Time | What you do |
|-------|------|-------------|
| Orient | 5 min | Read this file; skim `SAMPLE.md`. |
| Context | 15 min | Fill `BUSINESS-CONTEXT.md` (offer, hours, prices, FAQs, tone, do/don’t). |
| Channels | 5 min | Fill `CHANNEL-MAP.md` for WhatsApp / IG DM / email / other. |
| Orders | 10 min | Fill `ORDER-INTAKE.md` fields + confirm/cancel/handoff scripts. |
| Skill | 10 min | Load `INBOX-SKILL.md` + `.cursorrules` + filled context into Grok Bot (or Cursor / ChatGPT). |
| Test | 10–15 min | Paste one messy DM set from `SAMPLE.md` (or a real redacted thread); check draft reply + order log + escalation. |

**Stopwatch goal:** agent drafts a guarded reply + structured order log from a messy chat in **≤60 minutes** of setup (or ≤10 minutes using the SAMPLE path with no live business fill).

---

## Load paths (pick one runtime)

### Path A — Grok Bot (primary)

1. Create or open a Grok Bot agent dedicated to **inbox / orders** (not your general coding bot).
2. Attach or paste as project knowledge / instructions (in this order):
   - `INBOX-SKILL.md`
   - `.cursorrules`
   - filled `BUSINESS-CONTEXT.md`
   - filled `CHANNEL-MAP.md`
   - filled `ORDER-INTAKE.md`
   - `ESCALATION.md`
   - useful snippets from `PROMPTS.md`
3. Set approval habit: **draft first, you send** until you trust the tone.
4. Paste a real (or SAMPLE) inbound message; ask for triage → classify → draft reply → order log → escalate if needed.

### Path B — Cursor

1. Open a clean folder (or your ops notes repo). Copy this pack in.
2. Ensure `.cursorrules` is visible (project root or `.cursor/rules`).
3. Point the agent at `INBOX-SKILL.md` + filled context files.
4. Paste inbound chat text; run the skill prompts from `PROMPTS.md` / `INBOX-SKILL.md`.

### Path C — ChatGPT Projects (or similar)

1. New Project: **Inbox OS — [Business Name]**.
2. Upload the filled markdown files listed in Path A step 2.
3. System / custom instructions: “Follow `INBOX-SKILL.md` and `.cursorrules`. Never invent prices or policies missing from BUSINESS-CONTEXT.”
4. Same draft-first habit as Path A.

**Always edit your filled copies.** Do not treat the zip blanks as the live source of truth after first fill.

---

## Explicit 10-minute stranger path

Clock starts after unzip. No live shop required—use the redacted bakery scenario in `SAMPLE.md`.

### Minute 0–2 — Orient

1. Open this file and `SAMPLE.md`.
2. Confirm delivery host https://hacode.solutions; price context **$79**.
3. Confirm this is a **config pack**, not Meta API setup and not a CRM.

### Minute 2–6 — Run the skill on sample DMs

Paste into Grok Bot / Cursor / ChatGPT:

```text
Read INBOX-SKILL.md and .cursorrules from Inbox OS.
Use the SAMPLE bakery BUSINESS-CONTEXT excerpt and messy DMs in SAMPLE.md.
Produce:
1) triage labels for each message,
2) one structured order log (ORDER-INTAKE fields),
3) one draft customer reply (confirm or clarify),
4) escalate yes/no with reason from ESCALATION.md.
Do not invent prices or policies. Do not claim Meta API or hosted seats.
```

### Minute 6–8 — Skim against SAMPLE

Compare agent output to the filled before/after in `SAMPLE.md`. You should see: order fields filled or `GAP:`; calm confirm/clarify reply; no invented discount; handoff if angry/refund/legal.

### Minute 8–10 — Checklist + FAQ footgun

Open `CHECKLIST.md` and tick what you’d still fill for a real shop. Skim `FAQ.md` disclaimer + Meta/compliance footgun.

If you can produce a coherent order log + guarded reply from messy DMs in ≤10 minutes, the pack did its job.

---

## What’s in the pack (map)

| File | Job |
|------|-----|
| `BUSINESS-CONTEXT.md` | Offer, hours, prices, FAQs, tone, do/don’t |
| `CHANNEL-MAP.md` | WhatsApp / IG DM / email / other — purpose per channel |
| `ORDER-INTAKE.md` | Order fields, confirm/cancel scripts, human handoff |
| `INBOX-SKILL.md` | Triage → classify → draft reply → log → escalate |
| `.cursorrules` | Hard agent rules for this pack |
| `PROMPTS.md` | New lead, order confirm, FAQ, angry customer, after-hours |
| `ESCALATION.md` | When the bot must stop and ping a human |
| `SAMPLE.md` | Redacted messy DMs → clean order log + reply (≤10 min) |
| `CHECKLIST.md` | Done means X |
| `FAQ.md` | License, disclaimer, Meta/compliance footguns |
| `CONTENTS.md` | Exact zip list |

---

## Next steps after the 10-minute path

1. Fill `BUSINESS-CONTEXT.md`, `CHANNEL-MAP.md`, and `ORDER-INTAKE.md` for your real business.  
2. Load Path A/B/C and run one real (redacted) thread.  
3. Tick `CHECKLIST.md` before you trust auto-drafts.  
4. Read `FAQ.md` for brand disclaimer, refund line, and messaging-compliance footguns.

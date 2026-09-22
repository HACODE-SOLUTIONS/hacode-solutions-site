# START HERE — Freelancer Client Onboarding Kit (AI Coding Ops)

**Also called:** First-Week Client OS  
**Buy / deliver from:** https://hacode.solutions  
**Price:** $39 one-time digital download  
**Promise:** After a client says yes, run first-week onboarding in under **90 minutes**—intake → brief → scope lock → access owners → kickoff + emails—with a Cursor/Claude skill that drafts the project brief from messy notes.

This zip is **markdown templates + checklists + copy + skill**. No SaaS, no Notion workspace to import, no legal contracts. You paste into Notion, Google Docs, or keep Markdown as the source of truth.

---

## Who it’s for

- Solo freelancers, indie consultants, and small agencies who already use (or are about to use) Cursor / Claude Code and take **client** work.
- People whose deposit just cleared (or is about to) and who need a repeatable first week—not another lead magnet.
- Buyers who want one recovered hour or one prevented scope fight this week.

## Who it’s not for

- People still **hunting leads** (this is post-“yes,” not sales outreach).
- Enterprise PMO / agency process suites or multi-team RACI frameworks.
- Anyone who needs **legal contract drafting** (SOW lawyer review, NDAs, MSA language).
- Notion life-OS dumps or all-in-one “business operating systems.”
- A substitute for **MVP Auth + Stripe Billing DevSpec** (Product #1, $49)—see `COMPOSE-WITH-PRODUCT1.md` when the client build needs paid signup.
- A prompt dump alone with no workflow.

---

## Setup ≤90 minutes (your first engagement)

| Block | Time | What you do |
|-------|------|-------------|
| Orient | 5 min | Read this file; skim `SAMPLE.md`. |
| Workspace | 10 min | Pick **one** home: Notion page, Google Doc folder, or Markdown folder in the client repo / Drive. Copy templates from this pack into that home. |
| Skill | 5 min | Point Cursor / Claude at `SKILL.md` + `.cursorrules` (see below). |
| Intake | 15–25 min | Send `INTAKE.md` (or paste answers from call notes). Fill gaps with the skill. |
| Brief + scope | 20–30 min | Run skill: messy notes → `PROJECT-BRIEF.md` → `SCOPE-CHECKLIST.md`. |
| Access + DoD | 10–15 min | Fill `ACCESS-OWNERS.md` + `DOD-FIRST-WEEK.md`. |
| Kickoff + emails | 10–15 min | Schedule with `KICKOFF-AGENDA.md`; send scripts from `EMAIL-SCRIPTS.md`. |

**Stopwatch goal:** first client email or kickoff invite sent within 90 minutes of opening the pack on a live engagement.

---

## Notion / Docs / Markdown paths

Pick **one** primary path per client. Do not maintain three copies.

### Path A — Markdown (recommended for AI coding clients)

1. Create `clients/<client-slug>/` in your notes repo or Drive-synced folder.
2. Copy `INTAKE.md`, `PROJECT-BRIEF.md`, `SCOPE-CHECKLIST.md`, `ACCESS-OWNERS.md`, `DOD-FIRST-WEEK.md`, `KICKOFF-AGENDA.md`, `INVOICE-MILESTONES.md` into that folder.
3. Keep this pack’s `SKILL.md` / `.cursorrules` reachable by your agent (workspace root or `docs/onboarding-kit/`).

### Path B — Notion

1. New database or page: **Client Onboarding**.
2. Create child pages named after each template file (Intake, Project Brief, Scope Checklist, Access & Owners, DoD / First Week, Kickoff Agenda, Invoice & Milestones).
3. Paste each markdown body into the matching page. Use toggles for checklists.
4. Link the Project Brief as the **single source of truth**; other pages link back to it.

### Path C — Google Docs

1. Folder: `Clients / <Client Name> / Week 0 Onboarding`.
2. One Doc per template (or one Doc with H1 sections matching file names).
3. Share the folder with the client **after** you redact secrets from `ACCESS-OWNERS.md` (share a client-safe view; keep keys private).

---

## How to invoke the skill (Cursor / Claude)

### Cursor

1. Open your notes or client-docs workspace (not a random empty folder).
2. Add this pack (or a copy of `SKILL.md` + `.cursorrules` + the templates) to the workspace.
3. Ensure `.cursorrules` is visible (project rules or paste into `.cursor/rules`).
4. Paste a prompt from `SKILL.md` (start with **Messy notes → brief**).

### Claude Code

1. `cd` into the folder that holds client notes + pack templates.
2. Say: “Follow `SKILL.md` in the Freelancer Client Onboarding Kit. Turn my notes into intake gaps, then `PROJECT-BRIEF.md`, then `SCOPE-CHECKLIST.md`.”
3. Paste raw call notes or email threads as the input.

**Always edit the client’s working copies** of the templates. Do not treat the zip originals as the live engagement file set after first copy.

---

## Explicit 10-minute stranger path

Clock starts after unzip. No real client required—use the redacted scenario in `SAMPLE.md`.

### Minute 0–2 — Orient

1. Open this file and `SAMPLE.md`.
2. Confirm delivery host was https://hacode.solutions; price context $39.

### Minute 2–6 — Run the skill on sample notes

Paste into Cursor / Claude:

```text
Read SKILL.md and .cursorrules from the Freelancer Client Onboarding Kit.
Using the messy notes in SAMPLE.md, produce:
1) a short list of intake gaps (questions still unanswered),
2) a filled PROJECT-BRIEF.md body,
3) a filled SCOPE-CHECKLIST.md (in / out / revisions / milestones).
Do not invent legal contract language. Do not expand into lead-gen or PMO frameworks.
```

### Minute 6–8 — Skim outputs against SAMPLE

Compare the agent’s brief to the filled example in `SAMPLE.md`. You should see: decision-maker named, in/out list, first-week DoD, access owners called out.

### Minute 8–10 — Send-ready copy

Open `EMAIL-SCRIPTS.md`, copy the **Welcome** script, replace bracket tokens from the sample brief, and save a draft (do not need to send). Open `KICKOFF-AGENDA.md` and confirm the decision-lock list matches the brief.

If you can produce a coherent brief + one email draft from messy notes in ≤10 minutes, the pack did its job.

---

## What’s in the pack (map)

| File | Job |
|------|-----|
| `INTAKE.md` | Client questionnaire |
| `PROJECT-BRIEF.md` | One source of truth after discovery |
| `SCOPE-CHECKLIST.md` | In / out / revisions / milestones / kill-fee note |
| `ACCESS-OWNERS.md` | Logins, repos, keys, owners |
| `DOD-FIRST-WEEK.md` | Definition of done + first-week plan |
| `KICKOFF-AGENDA.md` | Timed agenda + decision-lock list |
| `EMAIL-SCRIPTS.md` | Welcome / kickoff / scope-change / handover |
| `INVOICE-MILESTONES.md` | Invoice + milestone schedule (non-legal) |
| `SKILL.md` + `.cursorrules` | Messy notes → brief → scope |
| `COMPOSE-WITH-PRODUCT1.md` | When to use the $49 Auth + Stripe DevSpec |
| `SAMPLE.md` | Redacted filled kickoff (listing proof) |
| `FAQ.md` / `CHECKLIST.md` / `CONTENTS.md` | License, done means X, zip list |

---

## Compose with Product #1

When the client engagement needs **Auth → Checkout → Entitlement**, do not invent billing inside this onboarding kit. Use `COMPOSE-WITH-PRODUCT1.md` and point the build at the **MVP Auth + Stripe Billing DevSpec Pack** ($49) from https://hacode.solutions — pack folder name: `mvp-auth-stripe-billing`.

---

## Next steps after the 10-minute path

1. Copy templates into your real client folder (Path A/B/C).  
2. Run intake → brief → scope on the live engagement.  
3. Tick `CHECKLIST.md` before you call Week 0 “done.”  
4. Read `FAQ.md` for license, updates, and footguns (missing decision-maker, unpaid extras, soft scope).

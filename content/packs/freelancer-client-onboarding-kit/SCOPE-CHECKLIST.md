# Scope Checklist — In / Out / Revisions / Milestones

**Product:** Freelancer Client Onboarding Kit (AI Coding Ops)  
**Tone:** Operating checklist. **Not a legal contract, MSA, or lawyer-reviewed SOW.**  
Use with `PROJECT-BRIEF.md`. After kickoff, treat checked “In” items as the build boundary until a written scope change.

---

## Meta

| Field | Value |
|-------|--------|
| Client / project | |
| Checklist version | v1 |
| Date locked | |
| Locked by (decision-maker) | |
| Linked brief version | |

---

## A. In scope (v1)

Check only what you will deliver in this engagement.

### Product / features

- [ ] 
- [ ] 
- [ ] 

### Platforms & environments

- [ ] Local / preview environment
- [ ] Staging deploy
- [ ] Production deploy
- [ ] Other: 

### Integrations

- [ ] Auth provider: 
- [ ] Payments (Stripe / other): 
- [ ] Email / notifications: 
- [ ] Analytics: 
- [ ] Other: 

### Design & content

- [ ] Implement from provided Figma / designs
- [ ] Light UI polish without new design system
- [ ] Client supplies final copy
- [ ] You draft placeholder copy only
- [ ] Other: 

### Engineering quality bar

- [ ] README / run instructions
- [ ] Basic automated tests (describe): 
- [ ] Error monitoring hookup (describe): 
- [ ] Other: 

---

## B. Out of scope (v1)

List temptations explicitly so “quick asks” are easy to redirect.

- [ ] Native mobile apps
- [ ] Multi-tenant orgs / seats / RBAC trees
- [ ] Custom design system from scratch
- [ ] Content marketing / SEO retainers
- [ ] Ongoing maintenance after handover (unless retainer added)
- [ ] Legal / compliance certification
- [ ] Other: 
- [ ] Other: 
- [ ] Other: 

If the client needs **Auth → Checkout → Entitlement** as a composed money path, prefer the **MVP Auth + Stripe Billing DevSpec Pack** ($49) as the build brief—see `COMPOSE-WITH-PRODUCT1.md`—rather than inventing billing scope ad hoc.

---

## C. Revisions policy (operating default)

Agree in kickoff; adjust numbers if your commercial terms differ.

| Topic | Default for this kit |
|-------|----------------------|
| Included revision rounds on UI/copy after first staging review | **2** rounds |
| What counts as a revision | Fixes/tweaks inside **In scope** items |
| What does **not** count as a revision | New features, new integrations, new pages, new roles |
| How revisions are requested | Single written list per round (email/Linear), not Slack drip |
| After included rounds | Estimate + written approval before more work |

- [ ] Decision-maker accepts this revisions policy (or written alternate: _______________).

---

## D. Milestones

| # | Milestone name | In-scope outcomes | Target date | Exit criteria |
|---|----------------|-------------------|-------------|---------------|
| 0 | Scope lock + kickoff | Brief + this checklist acknowledged | | Decision-lock list cleared |
| 1 | | | | |
| 2 | | | | |
| 3 | Handover | Access transfer + final invoice trigger | | `EMAIL-SCRIPTS` handover sent |

Payment amounts: `INVOICE-MILESTONES.md` (keep commercial numbers there).

---

## E. Kill-fee / early stop note (non-legal)

**Plain-language operating note—not legal advice.**

If the client pauses or ends the engagement after work has started:

1. Invoice for **completed milestones** plus reasonably tracked work toward the next milestone (your commercial agreement governs; this kit does not create one).
2. Deliver work product paid for to date (repo access, docs, staging) within an agreed window.
3. Do not continue unpaid “just wrapping up” feature work after a stop notice.
4. If you use a kill / cancellation fee in your own contract, **reference that contract**—do not invent fee % in this checklist unless already agreed:

| Field | Agreed value (from your contract / email) |
|-------|-------------------------------------------|
| Early-stop / kill-fee terms (summary) | |
| Notice method | |
| Work product handover window | |

- [ ] Both sides acknowledge where the binding commercial terms live (proposal / contract / email thread): _______________.

---

## F. Scope-lock sign-off

- [ ] In-scope list matches sales promises (or deltas are written in the decision log).
- [ ] Out-of-scope list read aloud or pasted in kickoff.
- [ ] Revisions policy accepted.
- [ ] Milestones dated.
- [ ] `PROJECT-BRIEF.md` updated to the same version.
- [ ] Decision-maker acknowledgement captured (email reply / meeting note / signature on your contract).

**Soft scope footgun:** If an item is neither In nor Out, it is **Out** until written In. Silence is not approval.

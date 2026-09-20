# Sample 03 — Entitlement gate / gated route: vague prompt vs DevSpec-driven

**Phase:** free → paid matrix, `requireEntitlement`, gated page + API  
**Depends on:** Samples 01–02 (auth session + webhook-synced `Entitlement`)

---

## Before — vague prompt

**Human paste:**

```text
Make /dashboard/pro only for paying users. If they're logged in show it.
Also hide the upgrade button when they're pro.
```

**Typical agent transcript (compressed):**

```text
Agent: middleware.ts — if path starts with /dashboard/pro && !session → redirect login
Agent: “Paying” = Boolean(session) because Checkout already set cookie flag isPro
Agent: Client component: if (user) return <ProContent />
Agent: Upgrade button: localStorage.getItem("pro") === "1"
```

**Concrete bad outcome:**

| Symptom | What broke |
|---------|------------|
| Any signed-in user sees `/dashboard/pro` | Auth gate mistaken for entitlement gate |
| After cancel in Stripe, pro page still loads | JWT/`localStorage` still says pro; no DB read |
| `GET /api/pro/data` returns 200 to free users | API never called `getEntitlement` |
| Double grant after replayed webhook | No unique `(userId, key)` — UI flickers between rows |

**Expected diff smell (bad):**

```diff
+ // middleware — treats login as payment
+ if (pathname.startsWith("/dashboard/pro") && !session) redirect("/login");
+ // page.tsx
+ const session = await auth();
+ if (!session) redirect("/login");
+ return <ProContent />; // no entitlement check
+ // client
+ if (localStorage.getItem("pro")) setShowUpgrade(false);
```

**Bad route behavior transcript:**

```text
$ curl -i https://localhost:3000/dashboard/pro   # signed-in free user, cookie only
HTTP/1.1 200 OK
(pro copy rendered)

$ curl -i https://localhost:3000/api/me/access
{"authenticated":true,"entitlements":[]}
# UI and API disagree — gate is lying
```

---

## After — DevSpec-driven agent run

**Human paste (from pack):**

```text
Implement Entitlement model and helpers per ENTITLEMENTS.md.
On relevant Stripe events, upsert Subscription and set entitlement key "pro" active/inactive.
Gate /dashboard/pro and GET /api/me/access by entitlement status.
Middleware may require sign-in; entitlement checks stay in server components / route handlers.
Do not embed paid status in the JWT as the sole source of truth.
```

**Typical agent transcript (compressed):**

```text
Agent: Prisma Entitlement @@unique([userId, key]); helpers getEntitlement / requireEntitlement
Agent: isPaid = status active|trialing|past_due per pack default; inactive on deleted
Agent: /dashboard/pro — auth(); requireEntitlement(userId, "pro") → else redirect("/pricing")
Agent: Paid API — 401 / 403 / 200 as DEVSPEC §7
Agent: GET /api/me/access reads DB entitlements for current user
Agent: Upgrade CTA hidden when getEntitlement === active (server-rendered)
```

**Concrete good outcome:**

| Actor | `/dashboard/pro` | `/api/me/access` | Paid API |
|-------|------------------|------------------|----------|
| Anonymous | Redirect sign-in (middleware or page) | `authenticated: false` | `401` |
| Signed-in free | Redirect `/pricing` or `403` | `entitlements: []` or `pro=inactive` | `403` |
| Signed-in + `pro=active` | `200` paid UI | `pro` active | `200` |
| After `customer.subscription.deleted` | Locked again | `pro` inactive | `403` |

**Expected diff smell (good):**

```diff
+ export async function requireEntitlement(userId: string, key: "pro") {
+   const ent = await getEntitlement(userId, key);
+   if (!ent || !isPaidStatus(ent.status)) redirect("/pricing");
+   return ent;
+ }
+
+ // app/dashboard/pro/page.tsx
+ const session = await auth();
+ if (!session?.user?.id) redirect("/api/auth/signin");
+ await requireEntitlement(session.user.id, "pro");
+ return <ProContent />;
+
+ // app/api/me/access/route.ts
+ const session = await auth();
+ if (!session?.user?.id) return NextResponse.json({ authenticated: false, entitlements: [] });
+ const entitlements = await listEntitlements(session.user.id);
+ return NextResponse.json({ authenticated: true, entitlements });
```

**Good route behavior transcript:**

```text
# signed-in free user
$ curl -i http://localhost:3000/dashboard/pro
HTTP/1.1 307
Location: /pricing

$ curl -s http://localhost:3000/api/me/access
{"authenticated":true,"entitlements":[]}

# after webhook grants pro
$ curl -s http://localhost:3000/api/me/access
{"authenticated":true,"entitlements":[{"key":"pro","status":"active","validUntil":null}]}

$ curl -i http://localhost:3000/dashboard/pro
HTTP/1.1 200 OK
```

---

## Annotation — what the pack changed

1. **Two gates:** middleware/session = identity; `Entitlement` = money access.
2. **Server-side DB read** on every paid page/API — not `localStorage`, not success query, not a forever JWT claim.
3. **Cancel path tested** — same gate that unlocks also locks when Stripe says deleted.
4. **`/api/me/access`** gives smoke tests and UI one honest source of truth.

When this sample’s “After” checks pass, run `SMOKE-TEST.md` end-to-end and tick `CHECKLIST.md` sections E–G.

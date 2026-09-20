# Sample 01 — Auth setup: vague prompt vs DevSpec-driven

**Phase:** Auth.js v5 + JWT + OAuth + dashboard gate  
**Stack constraint:** Next.js App Router, Prisma, JWT sessions (not DB sessions as default)

---

## Before — vague prompt

**Human paste:**

```text
Add NextAuth to my Next.js app so people can log in with GitHub.
Protect the dashboard. Make it production ready.
```

**Typical agent transcript (compressed):**

```text
Agent: Installing next-auth@4… adding Credentials + Google…
Agent: Using database sessions with a Session table…
Agent: Middleware checks session token cookie name from v4…
Agent: Dashboard page: if (!session) redirect — also set role: "pro" in JWT
       so paid users are easy later.
```

**Concrete bad outcome:**

| Symptom | What broke |
|---------|------------|
| `auth()` / `handlers` import paths fail on Auth.js v5 | Agent scaffolded v4 APIs |
| Middleware runs on Edge but adapter Session lookup needs Node | JWT was never chosen; edge middleware flakes |
| `/dashboard` works for anyone who signs in | “Protect dashboard” meant auth-only, but agent baked `role: "pro"` into the token with no Stripe path |
| No stable `session.user.id` on JWT | Later Checkout `metadata.userId` is `undefined` |

**Expected diff smell (bad):**

```diff
- import NextAuth from "next-auth"
- // v5: export const { handlers, auth } = NextAuth({...})
+ import { getServerSession } from "next-auth/next"  // v4 pattern
+ callbacks: {
+   async jwt({ token }) {
+     token.role = "pro"; // invented paid access
+     return token;
+   }
+ }
+ session: { strategy: "database" }
```

---

## After — DevSpec-driven agent run

**Human paste (from pack):**

```text
Read DEVSPEC.md and MODULE-MAP.md. Implement Auth.js (NextAuth v5) with JWT sessions.
Add GitHub OAuth. Protect /dashboard with middleware for authentication only (not entitlements yet).
Extend session with user.id. Do not invent multi-tenant roles or paid flags in the JWT.
```

**Typical agent transcript (compressed):**

```text
Agent: Reading DEVSPEC §4–§7 and MODULE-MAP auth module…
Agent: Auth.js v5 + Prisma User/Account; session: { strategy: "jwt" }
Agent: callbacks.jwt / session copy user.id onto session.user.id
Agent: middleware matcher /dashboard → auth(); entitlement deferred
Agent: Callback URL documented as http://localhost:3000/api/auth/callback/github
```

**Concrete good outcome:**

| Check | Result |
|-------|--------|
| Sign in with GitHub | Session cookie set; `/dashboard` loads |
| Signed out `/dashboard` | Redirect to sign-in |
| `session.user.id` in server component | Non-empty cuid/uuid |
| JWT payload | Has `sub` / user id; **no** `pro` / paid claim |
| Middleware | Auth gate only; `/dashboard/pro` still reachable until entitlement work (or redirects only for missing session) |

**Expected diff smell (good):**

```diff
+ export const { handlers, auth, signIn, signOut } = NextAuth({
+   session: { strategy: "jwt" },
+   providers: [GitHub],
+   callbacks: {
+     async jwt({ token, user }) {
+       if (user) token.sub = user.id;
+       return token;
+     },
+     async session({ session, token }) {
+       if (session.user) session.user.id = token.sub!;
+       return session;
+     },
+   },
+ });
+ // middleware: auth() for /dashboard — no entitlement read here
```

---

## Annotation — what the pack changed

1. **Pinned Auth.js v5 + JWT** so Edge middleware and later Checkout share one session model.
2. **Separated “signed in” from “paid”** — no premature `role: "pro"` in the token.
3. **Required `user.id` on the session** so Stripe metadata can link the payer without guessing email.
4. Pointed the agent at free module patterns instead of inventing a second auth stack.

When Auth looks like the “After” column, continue to Sample 02 (Checkout + webhook).

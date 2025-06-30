# 📚 `lib/` — Application Logic Helpers

The `lib/` folder contains shared business logic, type definitions, and utility wrappers for the SaaS Starter Kit. All files here are intended to run on the server (Node or edge) and support consistent data flows across your application.

---

## ✅ Who This Is For

- **Full-stack developers** implementing server actions and business logic  
- **API integrators** wiring up Stripe, auth, or other services  
- **Type-driven workflows** requiring shared schema definitions  

---

## 📂 Top-Level Files & Folders

| File/Folder             | Purpose                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `actions/`              | Server-compatible handlers for billing, auth, feedback, and user management         |
| `database.types.ts`     | TypeScript definitions generated from your database schema                          |
| `fonts.ts`              | Font-family constants and helpers for local font loading                            |
| `icons.ts`              | Centralized SVG/icon component exports                                             |
| `stripe.ts`             | Stripe integration helpers (payment, subscriptions, webhooks)                       |
| `theme.ts`              | Shared theme values (colors, spacings, radii) used by UI components                |

---

### `actions/` Contents

Includes action handlers for payments, authentication, and account management:

- `billing.action.ts`  
- `feedback.action.ts`  
- `forgot-password.action.ts`  
- `login.action.ts`  
- `logout.action.ts`  
- `signup.action.ts`  
- `sso.action.ts`  
- `update-password.action.ts`  

*(See project tree for details) fileciteturn5file2*

---

## 🔐 Best Practices

- **Stateless actions:** Keep handlers idempotent and avoid shared mutable state.  
- **Error handling:** Validate inputs and throw descriptive errors for upstream logging.  
- **Type safety:** Use `database.types.ts` to enforce schema consistency in your actions.  
- **Single source of truth:** Centralize constants (fonts, icons, theme) to avoid duplication.  

---

## 📌 Related Docs

- **API Routes** → `docs/04-development/api-routes.md`  
- **Database Schemas** → `docs/04-development/database-schemas.md`  
- **Type Generation Script** → `scripts/update-supabase-types.sh`  

---

⏱️ Last updated: June 28, 2025
# 📚 `lib/` — Application Logic Helpers

The `lib/` folder contains shared business logic, type definitions, and utility wrappers for the SaaS Starter Kit. All files here are intended to run on the server (Node or edge) and support consistent data flows across your application.

---

## ✅ Who This Is For

- **Full-stack developers** implementing server actions and business logic  
- **API integrators** wiring up Stripe, auth, or other services  
- **Type-driven workflows** requiring shared schema definitions  

---

## 📂 Top-Level Files & Folders

| File/Folder             | Purpose                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `actions/`              | Server-compatible handlers for billing, auth, feedback, and user management         |
| `database.types.ts`     | TypeScript definitions generated from your database schema                          |
| `fonts.ts`              | Font-family constants and helpers for local font loading                            |
| `icons.ts`              | Centralized SVG/icon component exports                                             |
| `stripe.ts`             | Stripe integration helpers (payment, subscriptions, webhooks)                       |
| `theme.ts`              | Shared theme values (colors, spacings, radii) used by UI components                |

---

### `actions/` Contents

Includes action handlers for payments, authentication, and account management:

- `billing.action.ts`  
- `feedback.action.ts`  
- `forgot-password.action.ts`  
- `login.action.ts`  
- `logout.action.ts`  
- `signup.action.ts`  
- `sso.action.ts`  
- `update-password.action.ts`  

*(See project tree for details) fileciteturn5file2*

---

## 🔐 Best Practices

- **Stateless actions:** Keep handlers idempotent and avoid shared mutable state.  
- **Error handling:** Validate inputs and throw descriptive errors for upstream logging.  
- **Type safety:** Use `database.types.ts` to enforce schema consistency in your actions.  
- **Single source of truth:** Centralize constants (fonts, icons, theme) to avoid duplication.  

---

## 📌 Related Docs

- **API Routes** → `docs/04-development/api-routes.md`  
- **Database Schemas** → `docs/04-development/database-schemas.md`  
- **Type Generation Script** → `scripts/update-supabase-types.sh`  

---

⏱️ Last updated: June 28, 2025

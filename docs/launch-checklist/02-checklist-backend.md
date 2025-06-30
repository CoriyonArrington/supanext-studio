# ✅ Backend Completion Checklist — SaaS Starter Kit

This checklist ensures your backend is launch-ready with Supabase (or another BaaS) and all core functionality.

---

## 🗃️ Database Schema

| Task                                        | Owner | Status     | Potential Challenge       | Recommended Solution                  |
| ------------------------------------------- | ----- | ---------- | ------------------------- | ------------------------------------- |
| Define core tables (users, roles, products) | Dev   | ✅ Complete | `database.types.ts` exists| Cross-check against TS definitions     |
| Ensure field names match TypeScript types    | Dev   | ✅ Complete | Types generated via script| Keep schema ↔ types aligned           |
| Add foreign key constraints and enums        | Dev   | ✅ Complete | Constraints in DB schema  | Use migrations & automated checks     |

---

## 🛡️ RLS & Access Policies

| Task                                       | Owner | Status     | Potential Challenge      | Recommended Solution                        |
| ------------------------------------------ | ----- | ---------- | ------------------------ | ------------------------------------------- |
| Enable RLS on all tables                   | Dev   | ✅ Complete | Verified in Supabase CLI | `supabase db remote set`                    |
| Define user self-access policies           | Dev   | ✅ Complete | `auth.uid()` usage       | Test with multiple roles                   |
| Add role-based policies (e.g. admin, user)  | Dev   | ✅ Complete | Correct roles in metadata| Iterate as new roles appear                |

---

## 🧪 Seed Data

| Task                              | Owner | Status     | Potential Challenge   | Recommended Solution               |
| --------------------------------- | ----- | ---------- | --------------------- | ---------------------------------- |
| Create sample user & admin accounts| Dev   | ✅ Complete | Seed script (`seed.mjs`)| Run via CI preflight check         |
| Insert sample product/domain data  | Dev   | ⬜ Pending | No product seeds yet   | Add JSON seed in `scripts/seed.mjs`|
| Add demo records for core entities  | Dev   | ⬜ Pending | Missing demo insert    | Use `to_jsonb()` for safety        |

---

## 🧱 BaaS Setup (e.g., Supabase CLI)

| Task                                            | Owner | Status     | Potential Challenge       | Recommended Solution                           |
| ----------------------------------------------- | ----- | ---------- | ------------------------- | ----------------------------------------------- |
| Install and link Supabase CLI                   | Dev   | ✅ Complete | `supabase link` used      | `.env.local` present                            |
| Initialize schema via CLI or Dashboard          | Dev   | ✅ Complete | Verified remote vs local  | Use consistent migration scripts               |
| Add type generation to scripts                  | Dev   | ✅ Complete | `update-supabase-types.sh` | Ensure CI has env vars set                       |
| Verify RLS and schema behavior in tests         | Dev   | ⬜ Pending | No RLS tests in suite     | Mock auth sessions in Vitest                     |

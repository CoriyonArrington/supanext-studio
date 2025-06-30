# ✅ MVP Product Readiness Checklist — SaaS Starter Kit

This checklist focuses on **key user flows**, core feature polish, and technical setup needed for MVP launch.

---

## 🧱 Core User Experience

| Task                              | Owner | Status      | Potential Challenge     |
| --------------------------------- | ----- | ----------- | ----------------------- |
| Complete onboarding & signup flow | Dev   | ✅ Complete | `auth-form.tsx` present |
| Build primary feature prototype    | Dev   | ✅ Complete | Core UI components exist |
| Implement basic admin/dashboard    | Dev   | ⬜ Pending  | No dashboard page yet    |
| Create user settings & profile     | Dev   | ⬜ Pending  | No `profile` route       |

---

## 🔐 Auth & Roles

| Task                                           | Owner | Status      | Potential Challenge    |
| ---------------------------------------------- | ----- | ----------- | ---------------------- |
| Support sign-up/sign-in for all roles           | Dev   | ✅ Complete  | Verified via UI tests  |
| Middleware to guard protected routes            | Dev   | ✅ Complete  | `middleware.ts` in place |
| Redirect based on user role after login         | Dev   | ⬜ Pending   | Needs `role` metadata  |

---

## 📦 Forms & Schema Sync

| Task                              | Owner | Status      | Potential Challenge  |
| --------------------------------- | ----- | ----------- | -------------------- |
| Ensure forms match validation schemas | Dev | ✅ Complete  | Zod schemas central  |
| Add error states & user feedback  | Dev   | ⬜ Pending   | No toast integration |
| Seed demo data toggle (dev only)  | Dev   | ⬜ Pending   | Env-based toggle     |

---

## 🧪 Testing & QA

| Task                                      | Owner | Status      | Potential Challenge      |
| ----------------------------------------- | ----- | ----------- | ------------------------ |
| Unit tests for critical components        | Dev   | ✅ Complete | `tests/unit` coverage   |
| End-to-end tests for main user flows      | QA    | ⬜ Pending   | No E2E suite             |
| Validate RLS with test accounts           | QA    | ✅ Complete | Verified in Supabase CLI |

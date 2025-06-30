# 🚀 Launch Sprint Plan — SaaS Starter Kit

A detailed launch plan broken down into **weekly sprints** over a 90-day period.

---

## 📅 Phase 1: Days 0–30 — Setup & Foundation

### 🎯 Milestones:
1. Finalize MVP backend & frontend scaffolding  
2. Register business and domains

#### Week 1

| Area  | Task                                         | Owner   | Status      | Potential Challenge        |
| ----- | -------------------------------------------- | ------- | ----------- | -------------------------- |
| Legal | Register LLC & file for EIN (if needed)      | Founder | ⬜ Pending   | External legal processes   |
| Infra | Scaffold database schema & migrations        | Dev     | ✅ Complete  | `scripts/update-supabase-types.sh` |
| Infra | Configure RLS & access policies              | Dev     | ✅ Complete  | Verified via Supabase CLI  |

#### Week 2

| Area    | Task                                    | Owner  | Status     | Potential Challenge    |
| ------- | --------------------------------------- | ------ | ---------- | ---------------------- |
| Infra   | Set up authentication & roles           | Dev    | ✅ Complete| `src/app/(auth)` group |
| DevOps  | Configure CI/CD workflow                | DevOps | ✅ Complete| `.github/workflows/ci.yml` |

#### Week 3

| Area    | Task                                    | Owner   | Status      | Potential Challenge    |
| ------- | --------------------------------------- | ------- | ----------- | ---------------------- |
| Product | Develop landing page & marketing copy   | Founder | ✅ Complete | `src/app/(marketing)/page.tsx` |
| QA      | Write initial integration tests         | QA      | ⬜ Pending   | No UI E2E tests        |

#### Week 4

| Area  | Task                                        | Owner | Status     | Potential Challenge         |
| ----- | ------------------------------------------- | ----- | ---------- | --------------------------- |
| Legal | Draft privacy policy & terms of use         | Founder | ⬜ Pending | No policy files             |
| Ops   | Deploy staging environment                  | DevOps | ⬜ Pending | No hosting config present   |

---

*(Weeks 5–12 continue into Beta & Public Launch phases; adjust as you go.)*
# 🛠️ Configuration & Starter Setup Checklist — SaaS Starter Kit

This checklist ensures that all project configuration files, boilerplate scripts, and essential scaffolding are present and usable for new developers or automated deployment tools.

---

## 📁 Environment & Secrets

| Task                                     | Owner | Status     | Potential Challenge          | Recommended Solution                  |
| ---------------------------------------- | ----- | ---------- | ---------------------------- | ------------------------------------- |
| Create `.env.example` with required keys | Dev   | ✅ Complete | File exists at project root  | Keep in sync with service dashboards  |
| Add `.env.local` to `.gitignore`         | Dev   | ✅ Complete | File exists & ignored        | Verify via `.gitignore`               |
| Document required environment variables  | Dev   | ✅ Complete | Keys listed in `.env.example`| Use inline comments                   |

---

## 📦 Package Setup

| Task                                | Owner | Status     | Potential Challenge  | Recommended Solution                |
| ----------------------------------- | ----- | ---------- | -------------------- | ----------------------------------- |
| Clean up `package.json` dependencies| Dev   | ⬜ Pending | Unused or stale libs | Audit & remove unreferenced deps    |
| Add utility scripts to `package.json`| Dev   | ✅ Complete | Scripts folder mapped | Confirm entries in `"scripts"`      |
| Set up Husky git hooks (optional)   | Dev   | ⬜ Pending | No `.husky/` folder   | Install & configure via `prepare`    |

---

## ⚙️ ESLint, TypeScript, Tailwind

| Task                                          | Owner | Status     | Potential Challenge        | Recommended Solution                        |
| --------------------------------------------- | ----- | ---------- | -------------------------- | ------------------------------------------- |
| Enable TypeScript strict mode                 | Dev   | ✅ Complete | `tsconfig.json` exists     | Ensure `"strict": true`                     |
| Install ESLint with Next + Tailwind plugin    | Dev   | ✅ Complete | `eslint.config.mjs` present | Verify plugin order                         |
| Configure `tailwind.config.ts` with tokens    | Dev   | ✅ Complete | `tailwind.config.ts` exists | Use `extend` to add theme values            |

---

## 🧩 Folder & Docs Setup

| Task                                                   | Owner | Status     | Potential Challenge      | Recommended Solution                   |
| ------------------------------------------------------ | ----- | ---------- | ------------------------ | -------------------------------------- |
| Create `docs/`, `lib/`, `hooks/`, `utils/`, `config/`  | Dev   | ⬜ Pending | `docs/` & `src/lib/` only | Add missing `hooks/`, `utils/`, `config/` |
| Add README to each core folder                         | Dev   | ✅ Complete | Many `README.md` present  | Standardize header content             |
| Include `types/` folder for shared TypeScript types    | Dev   | ✅ Complete | `src/types/global.d.ts`    | Keep in sync with schema inference     |

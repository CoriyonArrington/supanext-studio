# 🧩 Migration & Deployment Checklist — SaaS Starter Kit

A unified checklist combining required migration items and missing deployment ingredients for launch readiness.

---

## 1. 📦 Core Config & Tooling

| Step   | Asset                | Status      | Notes                          | File/Folder            |
| ------ | -------------------- | ----------- | ------------------------------ | ---------------------- |
| Setup  | TypeScript config    | ✅ Complete | `tsconfig.json`                 | Root                   |
| Setup  | ESLint config        | ✅ Complete | `eslint.config.mjs`             | Root                   |
| Setup  | Git ignore           | ✅ Complete | `.gitignore`                    | Root                   |
| Setup  | Tailwind config      | ✅ Complete | `tailwind.config.ts`            | Root                   |
| Setup  | PostCSS config       | ✅ Complete | `postcss.config.mjs`            | Root                   |
| Setup  | Next.js config       | ✅ Complete | `next.config.ts`                | Root                   |
| Setup  | Package metadata     | ✅ Complete | `package.json`                  | Root                   |
| Setup  | Lock file            | ✅ Complete | `pnpm-lock.yaml`                | Root                   |
| Setup  | Global types         | ✅ Complete | `next-env.d.ts`, `global.d.ts`  | Root                   |
| Setup  | Next env types       | ✅ Complete | `next-env.d.ts`                 | Root                   |

---

## 2. 🧱 Code, Utilities & Scripts

| Step            | Asset                   | Status      | Notes                          | File/Folder        |
| --------------- | ----------------------- | ----------- | ------------------------------ | ------------------ |
| Core Utils      | Utility functions       | ⬜ Pending  | No `utils/` folder             | —                  |
| Dev Scripts     | Automation scripts      | ✅ Complete | `scripts/`                     |                    |
| Unit tests      | Logic coverage          | ✅ Complete | `tests/unit/`                  |                    |
| Integration tests| Workflow coverage      | ✅ Complete | `tests/integration/`           |                    |
| Test runner conf| Vitest setup            | ✅ Complete | `vitest.setup.ts`              |                    |

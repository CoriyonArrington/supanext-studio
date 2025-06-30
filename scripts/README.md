# 🛠️ `scripts/` Directory

This directory contains executable scripts to automate development, testing, and project maintenance tasks for the SaaS Starter Kit.

---

## 📜 Scripts Overview

### Shell Scripts

- **`generate-apple-secret.sh`**  
  Generates the JWT client secret for “Sign in with Apple.”  
- **`generate-directory-structure.sh`**  
  Creates a Markdown snapshot of your project tree under `reports/` 
- **`preflight-check.sh`**  
  Runs a full suite of sanity checks (types, lint, tests, build) before commit/deploy.  
- **`setup.sh`**  
  Bootstraps local dev environment (installs dependencies, links Supabase, etc.).  
- **`update-supabase-types.sh`**  
  Generates TypeScript types from your Supabase schema into `src/lib/database.types.ts`.  
- **`verify-schema-types.sh`**  
  Compares local `database.types.ts` against the remote Supabase schema to catch drift.

### JavaScript Module

- **`seed.mjs`**  
  Populates your database with sample data for development/testing.

---

## ❗ Dependencies

Ensure you have these CLIs installed and authenticated:

- **pnpm** (or npm/yarn)  
- **Supabase CLI** (if using Supabase for your backend)  
- **bash**, **diff**, **tree** (for the directory-snapshot script)  
- **Node.js** (for running `seed.mjs`)

---

## 🤝 Contributing New Scripts

1. Add your script file here.  
2. Make it executable (`chmod +x scripts/your-script.sh`).  
3. Update this README with its name, description, and usage.  
4. Expose it in `package.json` under `"scripts"` if you’d like a `pnpm run …` shortcut.

---

⏱️ Last updated: June 28, 2025
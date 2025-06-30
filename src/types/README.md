# 🧾 `src/lib/types/` — TypeScript Definitions

This folder contains ambient and global TypeScript definitions for the SaaS Starter Kit, used across both client and server code.

---

## ✅ Who This Is For

- **TypeScript developers** requiring ambient declarations and module augmentations  
- **Tools** and **IDEs** relying on global type information  

---

## 📁 Folder Contents

| File            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `global.d.ts`   | Declares global interfaces, types, and environmental modules  |

---

## 🔁 Type Generation & Synchronization

- Core database types are auto-generated to `src/lib/database.types.ts` via the `update-supabase-types.sh` script.  
- Ambient declarations in `global.d.ts` should be edited **manually** when adding global interfaces or module patches.

---

## 📌 Related Files

- **Database Types** → `src/lib/database.types.ts`  
- **Type Generation Script** → `scripts/update-supabase-types.sh`  

---

⏱️ Last updated: June 28, 2025

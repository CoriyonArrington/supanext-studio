# 💻 `src/` — Application Source Code

This folder contains all source code for the SaaS Starter Kit, structured to support a multi-tenant, feature-driven Next.js application using the App Router.

---

## 📂 Top-Level Contents

| Folder/File     | Purpose                                                        |
| --------------- | -------------------------------------------------------------- |
| `README.md`     | Overview and index for the `src/` directory                    |
| `app/`          | Next.js App Router routes, layouts, and page entry points      |
| `components/`   | Shared React UI components organized by feature/domain         |
| `lib/`          | Shared business logic, API clients, and utility functions      |
| `middleware.ts` | Application-level middleware (auth guards, routing, headers)   |
| `types/`        | Global TypeScript declarations and module augmentations        |
| `.DS_Store`     | macOS metadata (can be ignored or removed)                     |

---

## 📖 Details

- **`app/`**: Defines route segments and layout groups (e.g., `(auth)`, `(marketing)`) along with page-level components under `page.tsx`.  
- **`components/`**: Houses reusable UI primitives and domain-specific widgets (e.g., `auth/`, `ui/`, `header/`, `footer/`).  
- **`lib/`**: Contains server-compatible actions (`billing.action.ts`, etc.), generated types (`database.types.ts`), and helpers (`stripe.ts`, `icons.ts`, `theme.ts`, `fonts.ts`).  
- **`middleware.ts`**: Applies edge logic for authentication and request handling across routes.  
- **`types/`**: Stores ambient declarations (`global.d.ts`) for extending global modules and interfaces.  

---

## 🔧 How to Navigate

1. **Start** with this README for high-level context.  
2. **Dive** into `app/` for routing and page structure.  
3. **Browse** `components/` for the UI building blocks.  
4. **Check** `lib/` for backend integrations and shared logic.  

---

⏱️ Last updated: June 28, 2025

# 🧭 `src/app/` — Next.js App Router & Folder Structure

This folder contains the Next.js 14 **App Router** layouts, pages, route groups, and API routes for the SaaS Starter Kit. All route-based UI originates here, organized into route groups for authentication, marketing, protected content, and more.

---

## ✅ Who This Is For

- **Frontend developers** implementing routes and Server Components  
- **Designers** structuring layout groups and page-level metadata  
- **Full-stack engineers** integrating API routes and middleware  

---

## 📂 Top-Level Entries

| File/Folder       | Purpose                                                            |
| ----------------- | ------------------------------------------------------------------ |
| `(auth)/`         | Authentication flows: layout and subroutes (login, sign-up, forgot-password, callbacks) |
| `(marketing)/`    | Public pages: contact, pricing, FAQs, design-system, and related marketing content |
| `(protected)/`    | Protected app content requiring authentication (e.g., dashboard layout) |
| `api/`            | Serverless API routes (e.g., `webhooks/` handlers)                 |
| `globals.css`     | Global Tailwind CSS imports and custom font definitions            |
| `layout.tsx`      | Root layout: `<head>`, global providers, and page wrappers         |
| `not-found.tsx`   | Custom 404 page for unmatched routes                               |
| `providers.tsx`   | Centralized React Context and provider setup for the app           |

---

## ⚙️ Rendering & Layout Guidelines

- **Server Components:** Default; avoid `"use client"` unless component needs state or browser-only APIs.  
- **Layouts:** Route group layouts wrap nested pages; use route group folders names `(auth)`, `(marketing)`, `(protected)` to scope providers and guards.  
- **API Separation:** Keep API logic under `api/` for clear client/server boundaries.  

---

## 📌 Related Documentation

- Directory Structure → `docs/04-development/directory-structure.md`  
- API Routes Reference → `docs/04-development/api-routes.md`  
- Route Group Conventions → `docs/04-development/route-groups.md`  

---

⏱️ Last updated: June 28, 2025

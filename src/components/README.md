# 📁 `src/components/` — Reusable UI Components

This folder contains shared **React** components styled with Tailwind CSS for the SaaS Starter Kit. Components are grouped into top-level categories to promote consistency and maintainability.

---

## 📂 Top-Level Folders & Purpose

| Folder            | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| `auth/`           | Authentication UI (sign-in/up forms, SSO buttons)           |
| `contact-form/`   | Contact or feedback form components                          |
| `design-system/`  | Design system showcases and documentation helpers            |
| `feedback-form/`  | Feedback-specific form components                            |
| `footer/`         | Site footer, integration tests, and related UI               |
| `header/`         | Site header, navigation, and notification menu               |
| `marketing/`      | Landing page & marketing section components                  |
| `ui/`             | Core UI primitives (buttons, cards, modals, toasts, etc.)    |

---

## 🔁 Usage Guidelines

- **Styling:** Use Tailwind classes and theme tokens defined in `tailwind.config.ts`.  
- **Composition:** Build small, reusable components and combine them for complex interfaces.  
- **Accessibility:** Include ARIA attributes and keyboard support in interactive components.  
- **Props & Types:** Define TypeScript interfaces/co-located types for each component.  
- **Exports:** Each folder should have an `index.ts` barrel for clean imports.  
- **Testing:** Place Vitest or Jest tests alongside components in `__tests__/` or via `<component>.test.tsx`.  

---

## ⚙️ Contributing

1. **Add** new component in the appropriate top-level folder.  
2. **Export** it via that folder’s `index.ts`.  
3. **Write/update** tests in the same folder.  
4. **Run** lint and tests:
   ```bash
   pnpm run lint src/components
   pnpm run test src/components
   ```  

---

⏱️ Last updated: June 28, 2025

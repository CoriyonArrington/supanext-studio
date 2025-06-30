# 🧪 Automated Tests

This repository uses Vitest to run automated tests for the SaaS Starter Kit. Tests are organized into integration and unit categories under `src/`.

---

## ✅ Who This Is For

- **Developers**: Run tests locally to verify functionality before committing  
- **CI/CD Pipelines**: Validate quality automatically during build  

---

## 📂 Test Structure

| Folder                | Purpose                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `src/integration/`    | Integration tests (`*.integration.test.ts`) that verify end-to-end behaviors of scripts and modules |
| `src/unit/`           | Unit tests (`*.test.ts`) for isolating business logic and utilities                             |

**Note:** Component tests (`*.test.tsx`, `*.stories.tsx`) remain co-located alongside their components under `src/components/`.  

---

## 🛠 Tech Stack & Tools

- **Test Runner:** Vitest  
- **Assertion Library:** Vitest’s `expect`  
- **DOM Testing:** `@testing-library/react` with `@testing-library/jest-dom`  
- **User Events:** `@testing-library/user-event`  
- **Mocking:** Vitest’s `vi.mock()` for faking dependencies  

---

## ⚙️ Running Tests

Use the `pnpm` scripts defined in `package.json`:

```bash
# Run all tests (unit, integration, and component)
pnpm test

# Run only integration tests
pnpm run test:integration

# Run only unit tests
pnpm run test:unit

# Watch mode for test-driven development
pnpm run test:watch
```

---

## 📌 Related Configuration

- **Vitest Config** → `vitest.config.ts`  
- **Test Environment Setup** → `vitest.setup.ts`  
- **Test Shims** → `vitest.shims.d.ts`  

---

⏱️ Last updated: June 28, 2025

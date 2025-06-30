# Project Directory Structure

```
.//
├── .DS_Store
├── .env.example
├── .env.local
├── .flox/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── cache/
│   │   ├── upgrade-checks.json
│   │   └── upgrade-checks.lock
│   ├── env/
│   │   ├── manifest.lock
│   │   └── manifest.toml
│   ├── env.json
│   ├── log/
│   └── run/
│       ├── aarch64-darwin.supanext-studio.dev -> /nix/store/909s1g4j4pr1c7vm5hwhphxg8qrrascc-environment-develop/
│       └── aarch64-darwin.supanext-studio.run -> /nix/store/diqqm81zq4f10awbykw4h9n7369r3wjr-environment-runtime/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── .storybook/
│   ├── main.ts
│   └── preview.tsx
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── README.md
├── docs/
│   ├── .DS_Store
│   ├── README.md
│   └── launch-checklist/
│       ├── 01-checklist-configuration.md
│       ├── 02-checklist-backend.md
│       ├── 03-checklist-frontend.md
│       ├── 04-checklist-deployment.md
│       ├── 05-launch-sprint-plan.md
│       ├── 06-checklist-mvp-product.md
│       ├── 07-checklist-security-legal.md
│       ├── 08-checklist-growth-marketing.md
│       └── 09-checklist-launch-master.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public/
│   ├── README.md
│   ├── favicon.ico
│   ├── opengraph-image.png
│   └── twitter-image.png
├── reports/
│   ├── README.md
│   └── project-directory-tree.md
├── scripts/
│   ├── README.md
│   ├── generate-apple-secret.sh*
│   ├── generate-directory-structure.sh*
│   ├── preflight-check.sh*
│   ├── seed.mjs
│   ├── setup.sh*
│   ├── update-supabase-types.sh*
│   └── verify-schema-types.sh*
├── src/
│   ├── .DS_Store
│   ├── README.md
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── callback/
│   │   │   ├── confirm/
│   │   │   ├── error/
│   │   │   ├── forgot-password/
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   ├── sign-up/
│   │   │   └── update-password/
│   │   ├── (marketing)/
│   │   │   ├── contact/
│   │   │   ├── design-system/
│   │   │   ├── faqs/
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   ├── pricing/
│   │   │   └── showcase/
│   │   ├── (protected)/
│   │   │   ├── account/
│   │   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   └── layout.tsx
│   │   ├── README.md
│   │   ├── api/
│   │   │   └── webhooks/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── providers.tsx
│   ├── assets/
│   │   ├── .DS_Store
│   │   ├── README.md
│   │   └── fonts/
│   │       ├── .DS_Store
│   │       ├── Montserrat/
│   │       └── Nunito-Sans/
│   ├── components/
│   │   ├── .DS_Store
│   │   ├── README.md
│   │   ├── account/
│   │   │   └── account-form.tsx
│   │   ├── auth/
│   │   │   ├── auth-form.tsx
│   │   │   ├── auth-header.tsx
│   │   │   ├── sign-up-form-fields.tsx
│   │   │   └── sso-buttons.tsx
│   │   ├── billing/
│   │   │   └── checkout-handler.tsx
│   │   ├── design-system/
│   │   │   ├── animations-motion-showcase.tsx
│   │   │   ├── app-components-showcase.tsx
│   │   │   ├── auth-form-showcase.tsx
│   │   │   ├── border-radius-showcase.tsx
│   │   │   ├── breakpoints-showcase.tsx
│   │   │   ├── chakra-components-showcase.tsx
│   │   │   ├── color-system-showcase.tsx
│   │   │   ├── custom-components-showcase.tsx
│   │   │   ├── data-display-showcase.tsx
│   │   │   ├── feedback-and-overlay-showcase.tsx
│   │   │   ├── iconography-showcase.tsx
│   │   │   ├── layout-primitives-showcase.tsx
│   │   │   ├── overlay-and-layout-showcase.tsx
│   │   │   ├── shadows-showcase.tsx
│   │   │   ├── spacing-showcase.tsx
│   │   │   └── typography-showcase.tsx
│   │   ├── forms/
│   │   │   ├── contact-form/
│   │   │   └── feedback-form/
│   │   ├── marketing/
│   │   │   ├── contact/
│   │   │   ├── home/
│   │   │   ├── pricing/
│   │   │   └── showcase/
│   │   ├── navigation/
│   │   │   ├── footer/
│   │   │   └── header/
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── breadcrumbs.tsx
│   │       ├── browser-mockup.tsx
│   │       ├── calendly-widget.tsx
│   │       ├── card.tsx
│   │       ├── chart-card.tsx
│   │       ├── cta-section.tsx
│   │       ├── data-table.tsx
│   │       ├── demo-banner.tsx
│   │       ├── device-mockup.tsx
│   │       ├── drawer.tsx
│   │       ├── feature-grid.tsx
│   │       ├── form-template.tsx
│   │       ├── hero.tsx
│   │       ├── list.tsx
│   │       ├── modal.tsx
│   │       ├── number-input-stepper.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── pricing-card.tsx
│   │       ├── problem-section.tsx
│   │       ├── product-mockup.tsx
│   │       ├── search-and-filter.tsx
│   │       ├── section.tsx
│   │       ├── skill-card.tsx
│   │       ├── slider.tsx
│   │       ├── solution-section.tsx
│   │       ├── stat-card.tsx
│   │       ├── stepper.tsx
│   │       ├── tab-group.tsx
│   │       ├── testimonials-section.tsx
│   │       ├── theme-switcher.tsx
│   │       └── tooltip.tsx
│   ├── lib/
│   │   ├── README.md
│   │   ├── actions/
│   │   │   ├── billing.action.ts
│   │   │   ├── feedback.action.ts
│   │   │   ├── forgot-password.action.ts
│   │   │   ├── login.action.ts
│   │   │   ├── logout.action.ts
│   │   │   ├── profile.action.ts
│   │   │   ├── settings.action.ts
│   │   │   ├── signup.action.ts
│   │   │   ├── sso.action.ts
│   │   │   └── update-password.action.ts
│   │   ├── database.types.ts
│   │   ├── fonts.ts
│   │   ├── icons.ts
│   │   ├── stripe.ts
│   │   └── theme.ts
│   ├── middleware.ts
│   └── types/
│       ├── README.md
│       └── global.d.ts
├── tailwind.config.ts
├── tests/
│   ├── README.md
│   ├── integration/
│   │   ├── generate-directory-structure.integration.test.ts
│   │   ├── update-supabase-types.integration.test.ts
│   │   └── verify-schema-types.integration.test.ts
│   └── unit/
│       ├── generate-directory-structure.test.ts
│       ├── temp-verify-schema-test/
│       │   ├── mocks/
│       │   └── src/
│       └── verify-schema-types.test.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── vite.config.ts
├── vitest.setup.ts
└── vitest.shims.d.ts
```

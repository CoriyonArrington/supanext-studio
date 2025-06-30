# SupaNext Studio | The Next.js SaaS Starter Kit

![SupaNext Studio Showcase](./public/opengraph-image.png)

A feature-rich, production-ready starter kit for building and launching modern SaaS applications. Built with Next.js, Supabase, Stripe, and Chakra UI. Skip the boilerplate and focus on building the features that make your product unique.

---

## ✨ Features

This starter kit comes packed with the essential features needed to launch a modern SaaS application.

- **Authentication:** Full authentication flow using Supabase Auth. Includes email/password, magic links, and pre-configured SSO providers (Google, Microsoft, Apple).
- **Subscriptions & Payments:** Pre-configured Stripe integration for **one-time payments** and **recurring subscriptions**. Includes a secure webhook handler to sync customer data.
- **Database:** A robust PostgreSQL database managed by Supabase, complete with a generic schema for users, profiles, and subscriptions.
- **Role-Based Access Control:** A foundational Admin vs. Member role system with secure RLS policies and middleware to protect routes and data.
- **Data-Driven Marketing Site:** A beautiful, responsive marketing site with pages driven by content fetched directly from your database. Includes:
  - Homepage with feature and solution sections
  - Flexible pricing page with one-time and subscription options
  - Categorized FAQ page
  - Showcase gallery
  - Contact page
- **Modern UI/UX:**
  - A cohesive design system built with **Chakra UI**
  - Includes a library of reusable UI components (`/src/components/ui`)
  - Full support for **Light and Dark Mode**, with a theme switcher that respects system preference
  - Fixed, glassmorphism-style header for a modern feel
- **Developer Experience:**
  - **TypeScript** throughout the entire stack
  - Scripts for database seeding, type generation, and pre-flight checks
  - Automated testing setup with **Vitest** and **Testing Library**
  - **Storybook** for component development and documentation

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Database & Auth:** [Supabase](https://supabase.io/)
- **Payments:** [Stripe](https://stripe.com/)
- **UI:** [Chakra UI](https://chakra-ui.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🏁 Getting Started

Follow these steps to get your new SaaS project up and running.

### 1. Clone the Repository

```bash
git clone <your-starter-kit-repo-url> my-new-project
cd my-new-project
```

### 2. Install Dependencies

This project uses `pnpm` as the package manager:

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file by copying the example:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your credentials:

```env
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Stripe
STRIPE_SECRET_KEY=<your-stripe-secret-key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
STRIPE_WEBHOOK_SECRET=<your-webhook-signing-secret>
```

### 4. Set Up the Database

Install and authenticate the Supabase CLI:

```bash
supabase login
```

Then start the local environment:

```bash
supabase start
```

Apply the schema and seed data:

```bash
supabase db reset
```

### 5. Run the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app in action.

---

## 🌐 Deployment

This starter kit is optimized for deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the project on Vercel.
3. Vercel will auto-detect it’s a Next.js project.
4. Add your `.env.local` values to Vercel Environment Variables.
5. Click **Deploy**.

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

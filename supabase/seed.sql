-- supabase/seed.sql

-- Clear existing marketing data to prevent duplicates
TRUNCATE TABLE "public"."pages", "public"."marketing_features", "public"."marketing_faqs", "public"."marketing_testimonials" RESTART IDENTITY;

-- Seed Pages
INSERT INTO "public"."pages" ("slug", "title", "content") VALUES
('home', 'SupaNext Studio | The Next.js SaaS Starter Kit', '{
  "hero_headline": "Launch Your SaaS in Days, Not Months",
  "hero_subheadline": "A feature-rich Next.js starter kit with Supabase, Stripe, and Chakra UI. Skip the boilerplate and focus on building the features that make your product unique.",
  "problem_headline": "Stop Rebuilding the Wheel",
  "problem_subheadline": "Building a new SaaS product involves solving the same problems every time: authentication, payments, user profiles. This starter kit handles it all for you.",
  "solution_1_headline": "Launch in Days, Not Months",
  "solution_1_subheadline": "With a complete authentication system, pre-built components, and a design system, you can focus on your core product features instead of the boilerplate.",
  "solution_2_headline": "Actionable Insights from Day One",
  "solution_2_subheadline": "Understand your application with a pre-configured dashboard. Track users, monitor activity, and make data-driven decisions.",
  "solution_3_headline": "Secure & Compliant by Default",
  "solution_3_subheadline": "Built on robust and secure infrastructure, so you can focus on your product with peace of mind. All data is encrypted in transit and at rest.",
  "final_cta_headline": "Ready to Build Your Vision?",
  "final_cta_subheadline": "Start for free today or explore our flexible pricing plans for your business.",
  "testimonials_headline": "Trusted by builders and loved by innovators"
}'),
('faqs', 'FAQs | SupaNext Studio', '{"hero_headline": "Frequently Asked Questions", "hero_subheadline": "Find answers to common questions about our platform, features, and pricing."}'),
('contact', 'Contact Us | SupaNext Studio', '{"hero_headline": "Get in Touch", "hero_subheadline": "Have a question or want to talk to our team? We’d love to hear from you.", "contact_sections": [{"title": "General Inquiries", "description": "For questions about the platform, features, or partnerships, please reach out.", "cta_text": "hello@example.com", "cta_link": "mailto:hello@example.com"}, {"title": "Sales & Demos", "description": "Interested in a demo for your team? Contact our sales department.", "cta_text": "sales@example.com", "cta_link": "mailto:sales@example.com"}]}'),
('pricing', 'Pricing | SupaNext Studio', '{
  "one_time_plan": {
    "headline": "One-time purchase.",
    "subheadline": "Unlimited projects.",
    "description": "Get lifetime access to the starter kit repository with a single purchase. Use it for as many projects as you want.",
    "price": "349",
    "original_price": "399",
    "cta_text": "Buy Starter Kit Now",
    "stripePriceId": "price_1RfOfVP4MMBBIGqA08q5t2aQ",
    "features": [
      {"name": "All features included", "description": "Authentication, billing, user management, and more."},
      {"name": "Lifetime updates", "description": "Last update to codebase 14 days ago."},
      {"name": "Saves you 120+ hours", "description": "Skip the boilerplate and focus on your product."},
      {"name": "Exclusive Discord support", "description": "Get help and share ideas with other developers."}
    ]
  },
  "subscription_plans": { "headline": "Or, Choose a Subscription", "tiers": [
      { "name": "Hobby", "price": "$0", "price_description": "For personal projects & experiments", "features": ["1 User", "1 Project", "Community Support"], "cta_text": "Start for Free", "cta_link": "/sign-up", "stripePriceId": null },
      { "name": "Pro", "price": "$29/mo", "price_description": "For small teams and growing businesses", "is_featured": true, "features": ["10 Users", "Unlimited Projects", "Priority Email Support", "Advanced Analytics"], "cta_text": "Get Started", "cta_link": "/sign-up?plan=pro", "stripePriceId": "price_1RfOgpP4MMBBIGqAMdi5L9kv" }
  ]},
  "feature_comparison": { "headline": "Compare All Features", "categories": [
      { "name": "Core Features", "features": [
          {"name": "User Accounts", "hobby": true, "pro": true, "enterprise": true},
          {"name": "Project Management", "hobby": "1 Project", "pro": "Unlimited", "enterprise": "Unlimited"},
          {"name": "API Access", "hobby": false, "pro": true, "enterprise": true}
      ]},
      { "name": "Support & Services", "features": [
          {"name": "Community Support", "hobby": true, "pro": true, "enterprise": true},
          {"name": "Email Support", "hobby": false, "pro": true, "enterprise": "Dedicated"},
          {"name": "Service Level Agreement (SLA)", "hobby": false, "pro": false, "enterprise": true}
      ]}
  ]}
}'),
('showcase', 'Showcase | SupaNext Studio', '{"hero_headline": "Built with This Starter", "hero_subheadline": "Explore a gallery of real-world applications built by developers using this starter kit."}');

-- Seed Marketing Features
INSERT INTO "public"."marketing_features" ("section_id", "icon_name", "title", "description", "display_order") VALUES
('problem', 'FiCopy', 'Repetitive Setup', 'Stop wasting time on setting up authentication, payments, and other boilerplate features for every new project.', 1),
('problem', 'FiAlertTriangle', 'Inconsistent Design', 'Building a consistent and beautiful UI from scratch is challenging and time-consuming.', 2),
('problem', 'FiBarChart2', 'Lack of Insights', 'It''s difficult to track user growth and engagement without a proper analytics setup.', 3),
('solution_1', 'FiSmartphone', 'Digital First', 'Empower users with a modern, responsive interface they can access anywhere.', 4),
('solution_2', 'FiDatabase', 'Data-Driven', 'Aggregate user data into clear, interactive dashboards and charts.', 5),
('solution_3', 'FiShield', 'Secure by Design', 'Built on secure infrastructure with role-based access control and data encryption.', 6);

-- Seed General FAQs
INSERT INTO "public"."marketing_faqs" ("question", "answer", "display_order", "category") VALUES
('What is this starter kit for?', 'This is a comprehensive Next.js starter kit designed to accelerate the development of modern SaaS applications. It comes pre-configured with authentication, subscriptions, a component library, and a data-driven marketing site.', 1, 'General'),
('What do I get when I purchase?', 'You receive lifetime access to the complete source code repository on GitHub. You can use this code for as many projects as you want, personal or commercial.', 2, 'General'),
('What if I need help?', 'The one-time purchase includes access to our private Discord community where you can ask questions, share what you''re building, and get help from other developers.', 3, 'General'),
('Is this a subscription or a one-time payment?', 'We primarily offer a one-time payment for lifetime access. We also provide monthly subscription options if you prefer that model.', 4, 'Pricing'),
('Can I change my plan later?', 'Yes, you can easily upgrade, downgrade, or cancel your subscription plan at any time from your account billing settings.', 5, 'Pricing'),
('What payment methods do you accept?', 'We accept all major credit cards, including Visa, Mastercard, and American Express, processed securely via Stripe.', 6, 'Pricing'),
('Can I get a refund?', 'Yes, we offer a 14-day money-back guarantee on the one-time purchase. If you are not satisfied for any reason, just let us know within 14 days for a full refund.', 7, 'Pricing'),
('What technology stack is used?', 'This starter is built with Next.js (App Router), Supabase for the database and authentication, Stripe for payments, and Chakra UI for the component library.', 8, 'Technical'),
('Can I use a different database or UI library?', 'Absolutely. The backend and frontend are modular. You can swap out Supabase for another database by updating the server actions, or replace Chakra UI with another library like Tailwind CSS.', 9, 'Technical'),
('How do I deploy the application?', 'The starter kit is optimized for deployment on Vercel. Simply connect your Git repository to Vercel for a seamless CI/CD pipeline. You will also need to set up your Supabase and Stripe production environment variables.', 10, 'Technical'),
('Do I get future updates?', 'Yes! Your one-time purchase includes lifetime access to all future updates, bug fixes, and feature additions to the starter kit repository.', 11, 'General'),
('Who owns the data?', 'You do. The starter kit is designed for you to host the database on your own Supabase account, giving you complete ownership and control over all your application and user data.', 12, 'General');


-- Seed Marketing Testimonials
INSERT INTO "public"."marketing_testimonials" ("id", "quote", "author_name", "author_role", "author_avatar_url", "display_order") VALUES
('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'This starter kit saved us at least a month of development time. We could focus on our unique features right from the start.', 'Jane Doe', 'Founder, Tech Startup', 'https://randomuser.me/api/portraits/women/44.jpg', 1),
('2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'The pre-built components and design system are fantastic. Our UI looks polished and professional with minimal effort.', 'John Smith', 'Lead Developer, Indie Co.', 'https://randomuser.me/api/portraits/men/46.jpg', 2),
('3b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'As a solo founder, this was a game-changer. I had a full-featured SaaS app with payments up and running in a weekend.', 'Alex Johnson', 'Solo Founder', 'https://randomuser.me/api/portraits/lego/1.jpg', 3),
('4b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'The code quality is excellent and the documentation is clear. It was easy to get started and customize for our needs.', 'Emily White', 'Senior Software Engineer', 'https://randomuser.me/api/portraits/women/22.jpg', 4),
('5b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'The integration with Supabase and Stripe is seamless. It saved us from the headache of setting up billing and authentication from scratch.', 'Michael Brown', 'Product Manager', 'https://randomuser.me/api/portraits/men/32.jpg', 5),
('6b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'I was able to launch my MVP in less than a week thanks to this starter. Highly recommended for anyone looking to move fast.', 'Sarah Green', 'Indie Hacker', 'https://randomuser.me/api/portraits/women/4.jpg', 6),
('7b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'A must-have for any serious Next.js developer. The foundation is solid and covers all the bases for a modern web app.', 'David Black', 'CTO, Creative Agency', 'https://randomuser.me/api/portraits/men/55.jpg', 7),
('8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'The attention to detail in the UI and component structure is impressive. It''s a pleasure to work with this codebase.', 'Jessica Blue', 'UI/UX Designer', 'https://randomuser.me/api/portraits/women/11.jpg', 8),
('9b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Not having to worry about setting up user roles and permissions was a huge time-saver. It''s all handled beautifully.', 'Chris Red', 'Backend Developer', 'https://randomuser.me/api/portraits/men/1.jpg', 9),
('ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'This is the most complete and well-thought-out Next.js starter I''ve come across. It''s worth every penny.', 'Olivia Yellow', 'Founder', 'https://randomuser.me/api/portraits/women/61.jpg', 10);
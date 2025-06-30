# 🌐 `public/` — Static Public Assets

This folder stores **static assets** served directly at the root URL of your deployed SaaS Starter Kit. Managed by Next.js (and platforms like Vercel), it should only contain files that:

- Require no server-side processing  
- Can be CDN-cached for global delivery  

---

## ✅ Who This Is For

- **Developers** adding or updating favicons, logos, or social images  
- **Designers** maintaining Open Graph and SEO assets  
- **SEO contributors** managing `robots.txt`, `sitemap.xml`, and other crawler directives  

---

## 📂 Common Files

| File                  | Purpose                                   | Status        |
| --------------------- | ----------------------------------------- | ------------- |
| `favicon.ico`         | Browser tab icon                          | **Present**   |
| `opengraph-image.png` | Open Graph image for social sharing       | **Present**   |
| `twitter-image.png`   | Twitter card preview image                | **Present**   |
| `robots.txt`          | Search engine crawler directives          | *To be added* |
| `sitemap.xml`         | Sitemap for SEO and indexing              | *To be added* |

---

## 🚫 Do Not Place

- Environment or secret files (e.g., `.env`)  
- API keys or auth tokens  
- Private drafts or non-production assets  

---

## 📌 Related Docs

- **SEO & Sitemap** → `docs/08-checklist-growth-marketing.md`  
- **Privacy & Legal** → `docs/07-checklist-security-legal.md`  
- **Brand Guidelines** → `docs/03-design/brand-guidelines.md`  

---

Use the `public/` folder for fast, secure, globally cached assets that do not require server-side rendering or authentication. ✅

---

⏱️ Last updated: June 28, 2025
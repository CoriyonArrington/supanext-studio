# 🗂️ `assets/` — Fonts & Global Static Assets

This folder contains static files used globally across the SaaS Starter Kit, with a current focus on **typography assets** that support brand consistency and accessibility.

---

## ✅ Who This Is For

- **Designers** selecting system fonts and fallback behavior  
- **Developers** configuring global styles or deploying font files  
- **Contributors** updating brand identity or accessibility settings  

---

## 📁 Folder Structure

```text
assets/
├── README.md
└── fonts/
    ├── Montserrat/
    └── Nunito-Sans/
```

| Folder/File   | Purpose                                               |
| ------------- | ----------------------------------------------------- |
| `fonts/`      | Variable font families for system-wide use            |
| `Montserrat/` | Clean, professional sans-serif font for headings      |
| `Nunito-Sans/`| Friendly, readable body font for paragraph text       |

---

## 🧠 Font Usage Notes

- Fonts are served **locally** to avoid third-party CDNs and ensure privacy  
- Loaded via Tailwind’s `@font-face` declarations in your global CSS  
- Optimized for performance with `font-display: swap`  
- Paired intentionally to reflect a clear, accessible UI  

---

## 🛠 Integrating or Updating Fonts

1. Add your `.ttf` or `.woff2` files into a new subfolder under `assets/fonts/`  
2. Include the corresponding license file (e.g., `OFL.txt`) in that same folder  
3. Update your `tailwind.config.ts` (or CSS) with new `@font-face` entries  
4. Rebuild or restart your dev server to see changes  

---

## 🧩 Related Docs

- **Typography guidelines** → `docs/03-design/typography.md`  
- **Color system & spacing** → `docs/03-design/color-system.md`  
- **Tailwind config** → `tailwind.config.ts`  
- **Global styles** → `src/app/global.css`  

---

⏱️ Last updated: June 28, 2025
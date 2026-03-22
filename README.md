# 🍕 Las Vegas — Ristorante Pizzeria

Full React website for **Las Vegas Ristorante Pizzeria** in Falconara Marittima (AN), Italy.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **React** | 18 | UI framework |
| **Vite** | 5 | Build tool & dev server |
| **CSS Modules** | — | Scoped component styles |
| **Framer Motion** | 11 | Animations (optional, installed) |
| **React Router DOM** | 6 | Routing (ready for multi-page) |
| **Lucide React** | — | Icons |
| **React Intersection Observer** | — | Scroll animations |

---

## 📁 Project Structure

```
lasvegas/
├── api/
│   └── booking.js          # Vercel serverless: sends booking email via Resend
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── data.js         # All content: menu, pizze, events, reviews
│   │   └── images.js       # All Unsplash image URLs
│   ├── components/
│   │   ├── Navbar.jsx + .module.css
│   │   ├── Hero.jsx + .module.css       # Auto-slideshow hero
│   │   ├── About.jsx + .module.css      # Story & features
│   │   ├── Pizze.jsx + .module.css      # Interactive pizza showcase
│   │   ├── Menu.jsx + .module.css       # Tabbed full menu
│   │   ├── Gallery.jsx + .module.css    # Lightbox gallery
│   │   ├── Events.jsx + .module.css     # Upcoming events
│   │   ├── Reviews.jsx + .module.css    # Auto-rotating testimonials
│   │   ├── Contact.jsx + .module.css    # Contact info & map
│   │   ├── BookingModal.jsx + .module.css  # 3-step booking form
│   │   └── Footer.jsx + .module.css
│   ├── hooks/
│   │   └── useInView.js    # Scroll animation hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Global styles & CSS variables
├── index.html
├── vercel.json             # SPA fallback + Vercel routing
├── vite.config.js
└── package.json
```

---

## 🎨 Design System

### Colors
```css
--gold: #c9a84c       /* Primary accent */
--gold2: #f0d080      /* Lighter gold */
--dark: #0a0a0a       /* Background */
--cream: #f5f0e8      /* Primary text */
--red: #c1121f        /* Accent red */
```

### Typography
- **Display**: Bebas Neue — hero titles, numbers
- **Serif**: Playfair Display — section titles, feature text
- **Body**: Cormorant Garamond — body copy, navigation

---

## ✨ Features

- **Hero slideshow** — Auto-rotating full-screen images with smooth transitions
- **Scroll animations** — Every section fades and slides in on scroll
- **Interactive pizza showcase** — Hover to preview pizza details in sidebar
- **Tabbed menu** — Switch between 7 menu categories with animated items
- **Photo lightbox gallery** — Click any gallery image to expand
- **3-step booking modal** — Name → Date/Time → Confirmation; submits to a serverless endpoint that emails the restaurant (Resend)
- **Auto-rotating reviews** — Testimonials from Google, TheFork, TripAdvisor
- **Responsive** — Mobile-first, works on all screen sizes
- **Scroll-to-top** button — Appears after scrolling 600px
- **Sticky navbar** — Transforms with backdrop blur on scroll
- **Real Unsplash images** — Sourced from Unsplash (free to use)

---

## 📸 Images

All images are sourced from [Unsplash](https://unsplash.com) and are free to use under the Unsplash License.

For production, replace image URLs in `src/assets/images.js` with your own restaurant photos for the most authentic result.

---

## 🌐 Deployment

### Netlify
```bash
npm run build
# Drag & drop the `dist/` folder to Netlify
```

### Vercel (recommended)

This repo is set up for a **Vite static frontend** plus **Vercel Serverless Functions** in `/api`.

1. Push the project to GitHub and import it in the [Vercel dashboard](https://vercel.com), or run:
   ```bash
   npx vercel
   ```
2. In **Project → Settings → Environment Variables**, add:
   | Variable | Description |
   |----------|-------------|
   | `RESEND_API_KEY` | API key from [Resend](https://resend.com) |
   | `BOOKING_TO_EMAIL` | Address that receives booking notifications |
   | `RESEND_FROM` | Verified sender in Resend (e.g. `booking@yourdomain.com`; for tests you can use `onboarding@resend.dev` with Resend’s limits) |

3. Redeploy after saving variables.

**Local dev:** `npm run dev` serves the app and **`/api/booking`** via Vite (same handler as production). Add Resend variables to a **`.env`** file in the project root (see `.env.example`).

Alternatively:

```bash
npm run dev:vercel
```

uses the Vercel CLI dev server (same as production routing).

See `.env.example` for variable names.

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

---

## 📞 Restaurant Info

| | |
|---|---|
| **Phone** | +39 071 912980 |
| **Cell 1** | 347 0141184 |
| **Cell 2** | 345 0430461 |
| **Email** | info@lasvegasfalconara.it |
| **Address** | Via Nino Bixio, 112 — Falconara Marittima (AN) |
| **Hours** | Lun–Sab: 19–24 · Dom: 12–24 · Mar: Chiuso |

---

*Built with ❤️ for Las Vegas Ristorante Pizzeria · Falconara Marittima*

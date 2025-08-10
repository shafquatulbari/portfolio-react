# 🚀 Shafquat Ul Bari - Interactive Portfolio (Next.js)

A cutting-edge, cyberpunk-themed portfolio showcasing expertise in Full Stack Development, QA Engineering, and AI/ML. Rebuilt on Next.js App Router with Tailwind CSS, featuring immersive 3D visuals, neural interfaces, and performance-optimized animations.

## 🌐 Live Demo

**[Visit My Portfolio ↗️](https://shafquatulbari.netlify.app)**

> ✨ Uses Next.js 14 App Router, route-level code splitting, and adaptive animations.

## 📋 Table of Contents

- [🎯 About This Portfolio](#-about-this-portfolio)
- [✨ Key Features](#-key-features)
- [🛠️ Technologies & Architecture](#️-technologies--architecture)
- [⚡ Performance Features](#-performance-features)
- [🎮 Interactive Elements](#-interactive-elements)
- [🗺️ Routing & Pages](#️-routing--pages)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🧩 Development Commands](#-development-commands)
- [📊 Performance & Optimization](#-performance--optimization)
- [🎨 Customization Guide](#-customization-guide)
- [🌐 Deployment](#-deployment)
- [📄 Credits & License](#-credits--license)

## 🎯 About This Portfolio

This portfolio represents a convergence of modern web development, interactive UI, and performance engineering. Following a migration from Vite + React to Next.js 14, the project leverages the App Router, route-based code splitting, dynamic imports, and Next Image to deliver a smooth experience across devices.

## ✨ Key Features

### 🎨 Immersive Visual Design

- Cyberpunk aesthetic with neon gradients and matrix effects
- 3D visuals powered by Three.js and React Three Fiber
- Particle systems and animated cosmic backgrounds
- Pixel-perfect responsive design for desktop, tablet, and mobile

### 🧠 Neural Interfaces & Sections

- Neural Profile and Matrix sections with scanning/telemetry effects
- Interactive Experience timeline and Project showcase
- Services grid with animated tech badges
- Contact form with EmailJS integration

### ⚡ Performance Engineering

- Route-level code splitting via App Router
- Dynamic imports for heavy/3D components (client-only)
- Optimized image delivery via next/image
- Single global background pattern instance for lower CPU/GPU load

## 🛠️ Technologies & Architecture

### Core Framework Stack

```txt
Next.js 14 (App Router)  // File-system routing, SSR/ISR, streaming
React 18                 // Hooks, Suspense, concurrent features
Tailwind CSS 3           // Utility-first styling with custom layers
ESLint + eslint-config-next
```

### 3D Graphics & Animation

```txt
three                    // WebGL 3D engine
@react-three/fiber       // React renderer for three.js
@react-three/drei        // R3F helpers (camera controls, loaders)
framer-motion            // Animation for UI transitions and elements
```

### UI, Integrations & Tooling

```txt
react-vertical-timeline-component  // Experience timeline
react-parallax-tilt                // Subtle 3D tilt effects
@emailjs/browser                   // Contact form (client-side)
```

### Image & Asset Strategy

- Static assets live in `public/` and are referenced with absolute paths (`/assets/...`).
- next/image is used for responsive images, placeholders, and size hints.
- Local images are served statically; remote patterns can be added when needed.

### Rendering Strategy

- Home (`/`) is client-focused and marked dynamic to avoid prerender issues with animations.
- Section routes (`/hero`, `/experience`, `/tech`, `/projects`, `/contact`, etc.) render independently.
- Heavy components are dynamically imported with `ssr: false` where appropriate.

## ⚡ Performance Features

### Build & Bundle Optimizations (Next.js)

```txt
✅ Route-level code splitting by default
✅ Dynamic imports for heavy components
✅ Tree-shaking and minification in production
✅ CSS via Tailwind with purge (content scanning)
✅ next/image for responsive sizing and optimized delivery
```

### Runtime Optimizations

- Memoized components to prevent unnecessary re-renders
- useMemo/useCallback for expensive calculations
- IntersectionObserver for on-demand content
- requestAnimationFrame where smooth animation is required
- Debounced/throttled scroll and resize handlers

### Asset & Resource Management

- Images converted to next/image in key sections (Navbar, Works, About, NeuralMatrix)
- Consolidated background rendering to a single instance
- 3D models and textures loaded only when needed

### Developer Instrumentation

- Optional Performance Monitor component (dev-only)
- Error boundaries for resilient UX around experimental/3D features

## 🎮 Interactive Elements

- 3D Avatar/Canvas elements with adaptive quality
- Neural Matrix scanning and visualization
- Experience timeline with animated reveal
- Project cards with hover states and detail views
- Subtle parallax/tilt across featured items

## 🗺️ Routing & Pages

This project uses the Next.js App Router. Sections are accessible as standalone routes and also orchestrated on the home page.

- `/` → Home (client, dynamic)
- `/hero` → Hero section
- `/neural-profile` → Neural Profile
- `/neural-matrix` → Neural Matrix
- `/experience` → Experience timeline
- `/tech` → Tech showcase
- `/projects` → Works/Projects
- `/contact` → Contact form

Fallbacks:

- `app/error.jsx` and `app/not-found.jsx` handle runtime and 404 states
- `app/loading.jsx` provides initial loading feedback

## 🏗️ Project Structure

```
portfolio-react/
├── public/
│   ├── assets/                 # Static images/icons
│   │   ├── services/           # Service icons (backend, web, QA, automation)
│   │   ├── tech/               # Technology stack icons
│   │   └── works/              # Project screenshots
│   ├── avatar/                 # 3D character model(s)
│   ├── animations/             # Animation files (.fbx)
│   ├── planet/                 # 3D planet assets + textures
│   └── _redirects              # Netlify routing config (compatible with Next)
│
├── app/                        # Next.js App Router
│   ├── layout.jsx              # Root layout (fonts, metadata wrappers)
│   ├── globals.css             # Tailwind + global styles
│   ├── (site)/page.jsx         # Home: orchestrates sections and navigation
│   ├── hero/page.jsx           # Dedicated Hero route
│   ├── neural-profile/page.jsx # Dedicated Neural Profile route
│   ├── neural-matrix/page.jsx  # Dedicated Neural Matrix route
│   ├── experience/page.jsx     # Dedicated Experience route
│   ├── tech/page.jsx           # Dedicated Tech route
│   ├── projects/page.jsx       # Dedicated Projects route
│   ├── contact/page.jsx        # Dedicated Contact route
│   ├── error.jsx               # Error boundary UI
│   ├── not-found.jsx           # 404 page
│   └── loading.jsx             # App-level loading feedback
│
├── src/                        # Shared UI and utilities (client components)
│   ├── components/             # Section components used by pages
│   │   ├── Navbar.jsx, Footer.jsx, Loader.jsx, ErrorBoundary.jsx
│   │   ├── Hero.jsx, NeuralProfile.jsx, NeuralMatrix.jsx
│   │   ├── Experience.jsx, Tech.jsx, Works.jsx, Contact.jsx
│   │   └── canvas/ (Avatar.jsx, Stars.jsx) + index.js
│   ├── constants/              # Data for projects/experience/tech
│   ├── utils/                  # motion, performance, scroll helpers
│   └── styles.js               # Theme constants
│
├── next.config.mjs             # Next configuration (images, etc.)
├── tailwind.config.cjs         # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── eslint.config.js            # ESLint (eslint-config-next)
├── tsconfig.json               # TypeScript support (types only)
├── package.json                # Scripts and dependencies
└── README.md                   # This file
```

### Key Architecture Decisions

- App Router enables per-route code splitting and streaming
- Home page is client-oriented and marked `dynamic` to support animations
- Heavy/3D UI loads with dynamic imports and `ssr: false`
- Images use next/image for sizing and responsive delivery
- Assets live under `public/` with absolute URL paths

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+
npm or yarn
Modern browser with WebGL support
```

### Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/shafquatulbari/portfolio-react.git
cd portfolio-react
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Environment (optional for EmailJS)

```bash
# .env or .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Development server

```bash
npm run dev
# http://localhost:3000
```

5. Production build

```bash
npm run build
npm start
# Production server on http://localhost:3000
```

## 🧩 Development Commands

```bash
npm run dev     # Start Next.js dev server
npm run build   # Production build
npm start       # Start production server
npm run lint    # ESLint (Next rules)
npm run clean   # Remove node_modules and build outputs
```

## 📊 Performance & Optimization

### Targets & Practices

| Metric                   | Target | Notes                              |
| ------------------------ | ------ | ---------------------------------- |
| First Contentful Paint   | <1.5s  | Route code splitting + Tailwind    |
| Largest Contentful Paint | <2.5s  | next/image, optimized assets       |
| Cumulative Layout Shift  | <0.1   | Proper image sizing + layout hints |
| Time to Interactive      | <3.5s  | Dynamic imports for heavy UI       |
| Bundle Size (route)      | —      | Determined by imported components  |

### Bundling Strategy

```txt
- Route-level code splitting via App Router
- Dynamic imports for heavy/3D sections
- Shared chunks for React/Next runtime
- CSS handled by Tailwind with purge
```

### Optimization Techniques

#### Code Splitting & Lazy Loading

```jsx
// Example dynamic import for client-only component
import nextDynamic from "next/dynamic";
const Heavy3D = nextDynamic(() => import("src/components/canvas/Avatar"), {
  ssr: false,
});
```

#### Image Optimization

```jsx
// Example next/image usage
import Image from "next/image";
<Image
  src="/assets/works/project.png"
  alt="Project"
  width={640}
  height={360}
  priority={false}
/>;
```

#### Performance Utilities

```js
// Example of throttling & rAF usage
const throttle = (fn, wait) => {
  /* ... */
};
const onScroll = throttle(
  () =>
    requestAnimationFrame(() => {
      /* ... */
    }),
  100
);
```

## 🎨 Customization Guide

### Theme & Styles

- Tailwind is configured in `tailwind.config.cjs` with content scanning for App Router paths
- Global utilities and gradients are defined in `app/globals.css`
- `src/styles.js` exposes theme constants for JS-driven styles

### Assets

- Place images under `public/assets/...` and reference them as `/assets/...`
- 3D models/textures live under `public/` (e.g., `/avatar`, `/planet`)
- Avoid importing static assets via `import`; prefer absolute paths for next/image

### Components & Pages

- Add new pages in `app/<route>/page.jsx`
- Share UI via `src/components` and import from pages
- Use dynamic imports for expensive components

### Images Configuration

- `next.config.mjs` can be adjusted to enable/disable image optimization
- For purely local assets, default config works. Configure `images.remotePatterns` for remote sources

## 🌐 Deployment

### Vercel

- Push to GitHub and import the repository in Vercel
- Framework preset: Next.js (auto-detected)
- Environment variables: add EmailJS keys if used

### Netlify

- Build command: `next build`
- Publish directory: `.next`
- Functions/Adapters: use the Next.js adapter if needed
- `_redirects` in `public/` remains compatible for simple redirects

## 📄 Credits & License

- 3D and UI libraries: three.js, @react-three/fiber, @react-three/drei, framer-motion
- Icons/graphics in `/public/assets` are used for demonstration
- This portfolio is provided for personal/professional showcasing

---

If you have questions or spot issues, feel free to open an issue or reach out.

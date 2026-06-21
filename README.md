# SOC Analyst Portfolio

A production-ready cybersecurity SOC Analyst portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Three Fiber**.

Dark, neon-accented theme with an animated 3D network background, MDX-powered CTF write-ups, dynamic GitHub repo fetching, and a serverless EmailJS contact form. Optimized for one-click Vercel deployment.

---

## ✨ Features

- **Animated hero** — Three.js / R3F particle network, typewriter title cycling, glowing CTA buttons
- **10 sections** — About, Skills, Certifications (flip cards), Experience (animated timeline), Projects, Blog, GitHub repos, Contact
- **MDX blog** — write CTF walkthroughs in `/content/blog`, rendered with syntax highlighting
- **Dynamic GitHub** — fetches your public repos via the GitHub REST API
- **EmailJS contact form** — no backend, with validation + toast notifications
- **Fully responsive** — mobile hamburger nav, Tailwind breakpoints
- **SEO ready** — `generateMetadata`, Open Graph, Twitter cards
- **Type-safe content** — all editable data lives in `/data` as TypeScript constants

---

## 🛠 Tech Stack

| Concern      | Tool                                   |
| ------------ | -------------------------------------- |
| Framework    | Next.js 14 (App Router) + TypeScript   |
| Styling      | Tailwind CSS (custom dark theme)       |
| Animation    | Framer Motion                          |
| 3D / FX      | Three.js + React Three Fiber           |
| Icons        | Lucide React + React Icons             |
| Blog         | MDX (next-mdx-remote) + rehype-highlight |
| Contact      | EmailJS                                |
| Notifications| react-hot-toast                        |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub username for the repos section |
| `GITHUB_TOKEN` | *(optional)* raises GitHub API rate limit |

> Get EmailJS keys at [emailjs.com](https://www.emailjs.com/). Create a service + template; the template should accept `from_name`, `reply_to`, and `message` variables.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## ✏️ Personalizing

All content is data-driven — edit these files, no component changes needed:

| File | What it controls |
| --- | --- |
| `data/personal.ts` | Name, role, titles, bio, mission, CV path, SEO text |
| `data/contact.ts` | Email/phone/location, social links + nav anchors |
| `data/education.ts` | Education entries (shown in About) |
| `data/skills.ts` | Skill categories + badges |
| `data/certifications.ts` | Certification flip cards |
| `data/experience.ts` | Timeline entries |
| `data/projects.ts` | Project cards |
| `content/blog/*.mdx` | Blog posts (frontmatter + body) |

**Assets to replace:**

- `public/images/profile-placeholder.svg` → your photo (update `personal.profileImage`)
- `public/cv/` → drop your resume PDF here (update `personal.cvPath`)

**Adding a blog post:** create `content/blog/my-post.mdx` with frontmatter:

```mdx
---
title: "My CTF Write-up"
date: "2025-06-01"
excerpt: "Short summary shown on cards."
tags: ["CTF", "Malware Analysis"]
author: "Your Name"
---

Your **MDX** content here, with ```code blocks``` highlighted automatically.
```

---

## 📦 Build

```bash
npm run build
npm run start
```

---

## ▲ Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.local` in the Vercel project settings.
4. Deploy — zero extra config required.

---

## 📁 Project Structure

```
soc-portfolio/
├── app/
│   ├── layout.tsx          # fonts, SEO metadata, toast portal
│   ├── page.tsx            # home (server component) — assembles sections
│   ├── globals.css         # theme, scanlines, grid, code highlighting
│   ├── not-found.tsx
│   └── blog/
│       ├── page.tsx        # blog index
│       └── [slug]/page.tsx # MDX post renderer
├── components/
│   ├── Navbar.tsx  Footer.tsx  SectionHeading.tsx
│   ├── SocialRow.tsx  Typewriter.tsx  ParticleBackground.tsx
│   └── sections/           # the 10 page sections
├── data/                   # editable TypeScript content
├── lib/                    # github.ts (REST API), mdx.ts (blog loader)
├── content/blog/           # .mdx posts
└── public/                 # images, CV
```

---

## License

MIT — use it, fork it, make it yours.

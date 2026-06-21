# Tushar Singh Tomar — SOC Analyst Portfolio

A production-ready cybersecurity portfolio for a SOC Analyst, built with **Next.js 14 (App Router)** and **TypeScript**. Features a dark, neon-accented theme, an animated 3D network background, scroll animations, MDX-powered write-ups, and a validated contact form. Optimized for one-click Vercel deployment.

🔗 **Live:** _add your Vercel URL here after deploying_

---

## ✨ Features

- **Animated hero** — Three.js / React Three Fiber particle network, typewriter title cycling, glowing CTA buttons, downloadable CV
- **Sections** — About (with photo + education), Skills, Certifications, Experience timeline, Projects, Blog
- **MDX blog** — write CTF walkthroughs and threat analysis in `/content/blog`, rendered with syntax highlighting
- **Contact form** — name / email / message with client-side validation + toast notifications
- **Fully responsive** — mobile hamburger nav, tested down to 375px
- **SEO ready** — App Router metadata, Open Graph, Twitter cards
- **Type-safe content** — all editable data lives in `/data` as TypeScript constants

---

## 🛠 Tech Stack

| Concern       | Tool                                     |
| ------------- | ---------------------------------------- |
| Framework     | Next.js 14 (App Router) + TypeScript     |
| Styling       | Tailwind CSS (custom dark theme)         |
| Animation     | Framer Motion                            |
| 3D / FX       | Three.js + React Three Fiber             |
| Icons         | Lucide React + React Icons               |
| Blog          | MDX (next-mdx-remote) + rehype-highlight |
| Notifications | react-hot-toast                          |
| Deployment    | Vercel                                   |

---

## 🚀 Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build and run the production version locally:

```bash
npm run build
npm run start
```

---

## ✏️ Personalizing

All content is data-driven — edit these files, no component changes needed:

| File                     | What it controls                              |
| ------------------------ | --------------------------------------------- |
| `data/personal.ts`       | Name, role, titles, bio, mission, CV path, SEO |
| `data/contact.ts`        | Email/phone/location, social links, nav anchors |
| `data/education.ts`      | Education entries (shown in About)            |
| `data/skills.ts`         | Skill categories + badges                     |
| `data/certifications.ts` | Certifications                                |
| `data/experience.ts`     | Experience timeline entries                   |
| `data/projects.ts`       | Project cards                                 |
| `content/blog/*.mdx`     | Blog posts (frontmatter + body)               |

**Assets:**

- `public/images/profile.jpg` — profile photo
- `public/cv/Tushar-Singh-Tomar-Resume.pdf` — resume (linked from the hero "Download CV" button)

**Contact form:** email sending is currently **disabled** — the form validates and shows a success toast without sending. To enable real delivery, add your [EmailJS](https://www.emailjs.com/) keys to `.env.local` (see `.env.local.example`) and restore the `emailjs.send()` call marked with a `TODO` in `components/sections/Contact.tsx`.

---

## ▲ Deploy to Vercel

1. Push this repo to GitHub (already done if you cloned it from there).
2. Go to [vercel.com/new](https://vercel.com/new) and **import** the repository.
3. Vercel auto-detects Next.js — no configuration needed (`vercel.json` is included).
4. _(Optional)_ Add EmailJS env vars under **Settings → Environment Variables** if you enable the contact form.
5. Click **Deploy**. Every future `git push` to `main` triggers an automatic redeploy.

---

## 📁 Project Structure

```
soc-portfolio/
├── app/
│   ├── layout.tsx          # fonts, SEO metadata, toast portal
│   ├── page.tsx            # home — assembles all sections
│   ├── globals.css         # theme, scanlines, grid, code highlighting
│   ├── not-found.tsx       # 404 page
│   └── blog/               # blog index + [slug] MDX renderer
├── components/
│   ├── Navbar.tsx  Footer.tsx  SectionHeading.tsx
│   ├── SocialRow.tsx  Typewriter.tsx  ParticleBackground.tsx
│   └── sections/           # the page sections
├── data/                   # editable TypeScript content
├── lib/                    # mdx.ts (blog loader)
├── content/blog/           # .mdx posts
└── public/                 # images, CV
```

---

## License

MIT — use it, fork it, make it yours.

# Unseen Cat Studio — Website

Single-page portfolio for **Unseen Cat Studio**, an indie game development studio from Italy.  
Dark, atmospheric design built with Next.js, Tailwind CSS, and Framer Motion.

---

## Project Structure

```
unseencatstudio-site/
├── public/
│   └── images/
│       ├── hero/           ← Hero section background (screenshot, keyart, or video)
│       ├── projects/       ← Thumbnails for past project cards
│       ├── team/           ← Team member profile photos
│       └── brand/          ← Logo, favicon, OG image for social sharing
│
├── src/
│   ├── app/
│   │   ├── globals.css     ← Global styles: dark theme, grain overlay, animations
│   │   ├── layout.tsx      ← Root layout: fonts (Syne + Inter), metadata, SEO
│   │   └── page.tsx        ← Main page — composes all sections together
│   │
│   ├── components/
│   │   ├── Navigation.tsx      ← Sticky header + fullscreen hamburger overlay menu
│   │   ├── Hero.tsx            ← Fullscreen hero with game title + Steam CTA
│   │   ├── CurrentProject.tsx  ← Featured game section with Steam widget
│   │   ├── Projects.tsx        ← Card grid of past games (hover animations)
│   │   ├── About.tsx           ← Team members with avatar + bio cards
│   │   ├── Contact.tsx         ← Contact form + social links
│   │   ├── Footer.tsx          ← Copyright + tagline
│   │   └── AnimateOnScroll.tsx ← Reusable scroll-triggered fade-in wrapper
│   │
│   └── lib/
│       └── data.ts         ← ALL site content lives here (easy to edit)
│
├── next.config.ts
├── tailwind / postcss configs
└── package.json
```

---

## How to Customize Content

All text, links, and team info are in one file:

**`src/lib/data.ts`**

| What                      | Where in data.ts          | Notes                                      |
|---------------------------|---------------------------|---------------------------------------------|
| Studio name, email, links | `siteConfig`              | Update email and social URLs                |
| Main game info            | `mainGame`                | Replace `YOUR_APP_ID` with Steam App ID     |
| Past projects             | `projects[]`              | Add/remove entries, set real URLs            |
| Team members              | `team[]`                  | Names, roles, bios, initials                 |
| Nav links                 | `navLinks[]`              | Change labels or add sections                |

---

## How to Add Images

### Hero background
Drop your keyart or screenshot into `public/images/hero/` (e.g. `hero-bg.jpg`).  
Then in `src/components/Hero.tsx`, replace the gradient `<div>` with:
```tsx
<Image src="/images/hero/hero-bg.jpg" alt="" fill className="object-cover" priority />
```

### Project thumbnails
Save images as `public/images/projects/turbo-trash.jpg`, `space-pizza.jpg`, etc.  
Then in `src/components/Projects.tsx`, replace the gradient thumbnail `<div>` with:
```tsx
<Image src={`/images/projects/${project.id}.jpg`} alt={project.title} fill className="object-cover" />
```

### Team photos
Save as `public/images/team/marco.jpg`, `luca.jpg`, `sofia.jpg`.  
Then in `src/components/About.tsx`, replace the initials avatar with:
```tsx
<Image src={`/images/team/${member.name.toLowerCase()}.jpg`} alt={member.name} fill className="object-cover" />
```

### Logo / Favicon / OG Image
- Put your logo in `public/images/brand/logo.svg`
- Put an OG image (1200x630) in `public/images/brand/og.jpg` and reference it in `layout.tsx` metadata
- For favicon, place `favicon.ico` in `public/`

---

## Contact Form

The form UI is ready but needs a backend service to actually send emails.  
Since the site is static on Vercel, use a free service like **Formspree**:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, copy your form ID
3. In `src/components/Contact.tsx`, uncomment the `fetch()` block and replace `YOUR_FORM_ID`

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

1. Push the repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy**

---

## Tech Stack

| Tool           | Purpose                            |
|----------------|------------------------------------|
| Next.js 16     | React framework, static generation |
| Tailwind CSS 4 | Utility-first styling              |
| Framer Motion  | Scroll animations, hover effects   |
| TypeScript     | Type safety                        |
| Vercel         | Hosting                            |

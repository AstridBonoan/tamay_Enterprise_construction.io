# Tamay Enterprises Website

Next.js + React + Tailwind replica of [tamayenterprises.com](https://tamayenterprises.com/), with **mobile-first** layout and a **left slide-out navigation drawer**.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

Copy `.env.example` to `.env.local` and add your Supabase keys.

## Vercel deployment

1. Connect the GitHub repo in [Vercel](https://vercel.com).
2. **Root directory:** `tamay-site` (if the repo root is `TamayEnterprises`, not `tamay-site`).
3. **Framework preset:** Next.js (auto-detected).
4. Add **Environment Variables** in Vercel → Project → Settings → Environment Variables:

| Variable | Required |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes |
| `NEXT_PUBLIC_SITE_URL` | Yes (production domain, e.g. `https://tamayenterprises.com`) |
| `NEXT_PUBLIC_GOOGLE_CALENDAR_SCHEDULING_URL` | For real estate scheduling |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional (future Google sign-in) |

5. In **Supabase → Authentication → URL Configuration**, set:
   - **Site URL** → your Vercel production URL
   - **Redirect URLs** → `https://your-domain.com/m/login/**`

6. Deploy — Vercel builds on every push to `main`.

## Homepage media

Your files live in `public/homepage/`:

- `HomePageVideo.mp4` — hero background video
- `HomePageImage1.webp` … `HomePageImage11.webp` — carousel & service sections

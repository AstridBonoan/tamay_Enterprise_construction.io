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
| `NEXT_PUBLIC_SITE_URL` | Yes (production domain, e.g. `https://www.tamayenterprises.com`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | For Google sign-in via Supabase |
| `GOOGLE_CLIENT_ID` | Server-only — same OAuth client, for Calendar sync on booking |
| `GOOGLE_CLIENT_SECRET` | Server-only |
| `GOOGLE_CALENDAR_REFRESH_TOKEN` | Server-only — manager Google account |
| `GOOGLE_CALENDAR_ID` | Usually `primary` |

5. In **Supabase → SQL Editor**, run (in order): `supabase/schedule-slots.sql`, `supabase/staff-role.sql` (grants staff to **A Tamay**).

6. In **Supabase → Authentication → URL Configuration**, set:
   - **Site URL** → your Vercel production URL
   - **Redirect URLs** → `https://your-domain.com/m/login/**`

7. Deploy — redeploy on Vercel after adding env vars (or push to `main`).

## Staff schedule management

Managers with `is_staff = true` on their profile can open **Account → Manage schedule** (`/m/staff/schedule/`) to add or remove appointment times for consultations and property showings. Customers see those times as a list/dropdown on the site. When someone books, the site creates an event on the manager Google Calendar (if server env vars are set).

### Google Calendar refresh token (one-time)

1. Google Cloud Console → enable **Google Calendar API**.
2. Use the same OAuth Web client as Supabase sign-in (or create one).
3. Open [Google OAuth Playground](https://developers.google.com/oauthplayground/).
4. Click the gear → check **Use your own OAuth credentials** → enter Client ID and Secret.
5. Select scope: `https://www.googleapis.com/auth/calendar.events`
6. Authorize with the manager Google account → Exchange authorization code for tokens.
7. Copy the **refresh token** into Vercel as `GOOGLE_CALENDAR_REFRESH_TOKEN`.

## Homepage media

Your files live in `public/homepage/`:

- `HomePageVideo.mp4` — hero background video
- `HomePageImage1.webp` … `HomePageImage11.webp` — carousel & service sections

# ABPS

ABPS is an installable bunker planning PWA for marine fuel teams. It combines enterprise authentication, shared nominations, ETA clash detection, ROB forecasting, and email-assisted intake in one operational dashboard.

## Core capabilities

- Multi-user company access with Supabase Auth and tenant-aware data tables
- Persistent bunker nominations across users and teams
- Conflict detection for barge and vessel ETA windows
- Rule-based scheduling optimizer with priorities and safety buffers
- Smart ROB prediction using voyage consumption curves
- Email parsing endpoint for auto-filled nominations
- Mobile-friendly PWA with offline-friendly shell assets

## Stack

- Next.js App Router
- TypeScript + Tailwind CSS
- Supabase Auth + Postgres
- Recharts for operational charts

## Quick start

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase values
3. Install dependencies with your preferred package manager
4. Run `npm run dev`
5. Apply the SQL in [`supabase/migrations/20260427_abps.sql`](./supabase/migrations/20260427_abps.sql)

## Deploy to the web

### Recommended production stack

- Frontend hosting: Vercel
- Database and auth: Supabase
- Email ingest source: SendGrid inbound parse, Mailgun routes, or a mailbox webhook bridge

### Vercel deployment steps

1. Push this project to GitHub
2. Import the repo into Vercel
3. Set the framework to Next.js if Vercel does not auto-detect it
4. Add these environment variables in Vercel:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_EMAIL_INGEST_SECRET`
5. Set `NEXT_PUBLIC_APP_URL` to your final deployed URL, for example `https://abps.yourdomain.com`
6. Deploy

### Supabase production steps

1. Create a new Supabase project
2. Run the SQL in [`supabase/migrations/20260427_abps.sql`](./supabase/migrations/20260427_abps.sql)
3. In Supabase Auth, add your production callback URL:
   - `https://your-domain.com/auth/callback`
4. Add your site URL:
   - `https://your-domain.com`
5. Seed at least one company, one company user, one vessel, and one barge

### Production checks

- Open `/api/health` and confirm `ok: true`
- Open `/login` and confirm the magic-link flow redirects back to `/dashboard`
- Install the PWA from the browser menu
- Confirm `POST /api/ingest-email` accepts your secret and company header
- Confirm dashboard data comes from Supabase instead of demo mode

## Email ingestion

Post inbound email content to `POST /api/ingest-email` with:

- `x-abps-ingest-secret`: your shared secret
- `x-abps-company-id`: company UUID for tenant-safe persistence
- JSON body containing `rawEmail` and optional `source`

The parser extracts vessel, barge, port, product, ETA, quantity, ROB, and customer fields, then upserts a nomination when Supabase service credentials are configured.

## Optimizer

`POST /api/optimizer` accepts nominations and returns:

- conflict list
- optimized sequencing
- projected ROB warnings

## Notes

- When Supabase environment variables are missing, the dashboard falls back to seeded sample data so the product remains explorable.
- The scheduling engine is intentionally rule-based and transparent, making it easier for operators to validate than a black-box score.
- Hosted `/dashboard` routes are protected by middleware when Supabase auth is configured.

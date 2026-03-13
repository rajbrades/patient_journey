# Patient Journey — 10X Health

## Overview
Goal-based lab test recommendation engine for 10X Health. Patients browse/search health goals and see curated test recommendations. Admins manage goals, tests, and mappings.

## Commands
- `npm run dev` — start dev server (port 3000)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm test` — run tests

## Architecture
- **Next.js 15** App Router with TypeScript
- **Supabase** for Postgres + RLS
- **Tailwind CSS** for styling
- Patient-facing routes: `/`, `/goals/[slug]`
- Admin routes: `/admin`, `/admin/goals`, `/admin/tests`
- API routes: `/api/goals`, `/api/goals/[slug]`, `/api/admin/goals`, `/api/admin/tests`

## Key Patterns
- Public API uses anon Supabase client (RLS enforces read-only on active records)
- Admin API uses service role client (full CRUD access)
- Types defined in `src/types/index.ts`
- Database schema in `supabase/migrations/`
- Seed data in `supabase/seed/`

## Constraints
- No `psql` CLI — apply migrations via Supabase Dashboard SQL Editor
- `.env` is local-only, never committed
- SSH remotes only for git (rajbrades)

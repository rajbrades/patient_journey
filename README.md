# Patient Journey — 10X Health

Goal-based lab test recommendation engine for 10X Health patients. Patients search by health goal (e.g., "Increase Energy", "Evaluate My Hormones") and get recommended lab tests with rationale.

## How to Run

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run the database migration (via Supabase Dashboard SQL Editor)
# File: supabase/migrations/001_initial_schema.sql

# Seed the database
# File: supabase/seed/seed.sql

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the patient-facing site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## How to Test

```bash
npm test
```

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Supabase** (Postgres, RLS, Row Level Security)
- **Tailwind CSS** for styling

## Project Structure

```
src/
  app/              # Next.js App Router pages & API routes
    admin/          # Admin CRUD pages (goals, tests)
    goals/[slug]/   # Patient goal detail page
    api/            # REST API routes
  components/       # React components
    patient/        # Patient-facing components
    admin/          # Admin components
    ui/             # Shared UI primitives
  lib/              # Supabase client, utilities
  types/            # TypeScript type definitions
supabase/
  migrations/       # SQL migration files
  seed/             # Seed data
```

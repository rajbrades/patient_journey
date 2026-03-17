# Patient Journey — 10X Health

Goal-based lab test recommendation engine for 10X Health patients. Patients search by health goal (e.g., "Increase Energy", "Evaluate My Hormones") and get recommended lab tests with rationale. Includes an interactive quiz that scores health goals and surfaces personalized test recommendations.

## How to Run

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run database migrations in order (via Supabase Dashboard SQL Editor)
# supabase/migrations/001_initial_schema.sql
# supabase/migrations/002_add_collection_method.sql
# supabase/migrations/003_quiz_leads.sql
# supabase/migrations/004_add_not_for_you.sql

# Seed the database
# supabase/seed/seed.sql

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the patient-facing site.
Open [http://localhost:3000/quiz](http://localhost:3000/quiz) for the health quiz.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## How to Test

```bash
npm test
```

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Supabase** (Postgres, RLS, Row Level Security)
- **Tailwind CSS v4** for styling
- **Playwright** for E2E testing

## Project Structure

```
src/
  app/                    # Next.js App Router pages & API routes
    page.tsx              # Home — goal browser
    quiz/                 # Interactive health quiz
    goals/[slug]/         # Patient goal detail page
    admin/                # Admin CRUD pages (goals, tests, mappings)
    api/                  # REST API routes
      goals/              # Public goal endpoints
      admin/              # Admin CRUD endpoints (goals, tests, mappings)
      quiz/               # Quiz data + lead capture endpoints
  components/
    patient/              # Goal browser, goal card, test card
    quiz/                 # Question card, answer options, results panel, lead form
    ui/                   # Shared UI primitives (search input)
  lib/
    supabase.ts           # Supabase client initialization
    quiz/
      questions.ts        # Quiz question definitions
      scoring.ts          # Quiz scoring algorithm
  types/
    index.ts              # TypeScript type definitions
supabase/
  migrations/             # SQL migration files (001–004)
  seed/                   # Seed data
```

## Routes

### Patient-Facing

| Route | Description |
|-------|-------------|
| `/` | Home — browse and search health goals |
| `/goals/[slug]` | Goal detail — curated test recommendations with rationale |
| `/quiz` | Interactive quiz — personalized test recommendations via scoring |

### Admin

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard |
| `/admin/goals` | Manage health goals |
| `/admin/goals/[id]/mappings` | Manage goal-to-test mappings |
| `/admin/tests` | Manage lab tests |

## API

### Public (anon client — RLS enforced)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/goals` | GET | List all active goals |
| `/api/goals/[slug]` | GET | Goal detail with associated tests |
| `/api/quiz/data` | POST | Serve quiz questions and scoring metadata |
| `/api/quiz/leads` | POST | Capture quiz lead submission |

### Admin (service role client — full access)

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/admin/goals` | GET, POST | List / create goals |
| `/api/admin/goals/[id]` | PUT, DELETE | Update / delete goal |
| `/api/admin/tests` | GET, POST | List / create tests |
| `/api/admin/tests/[id]` | PUT, DELETE | Update / delete test |
| `/api/admin/mappings` | GET, POST | List / create mappings |
| `/api/admin/mappings/[id]` | PUT, DELETE | Update / delete mapping |

## Database Schema

| Table | Description |
|-------|-------------|
| `goals` | Health goals with slug, category, icon, active flag |
| `tests` | Lab tests with biomarkers, price, collection method, test group |
| `goal_test_mappings` | Many-to-many: maps tests to goals with relevance level and rationale |
| `quiz_leads` | Captured quiz submissions — name, email, answers, scored goals, recommended tests |

**Collection methods:** `in-person` · `at-home-blood` · `at-home-saliva` · `at-home-blood-spot`

**Relevance levels:** `primary` · `secondary`

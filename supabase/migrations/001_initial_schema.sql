-- 001: Initial schema for Patient Journey
-- Tables: goals, tests, goal_test_mappings

create extension if not exists "uuid-ossp";

-- Health goals that patients can browse/search
create table goals (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  icon text,
  category text not null default 'general',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Lab tests / panels offered by 10X Health
create table tests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  category text not null default 'general',
  biomarkers text[] not null default '{}',
  price_cents integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Many-to-many: which tests map to which goals
create table goal_test_mappings (
  id uuid primary key default uuid_generate_v4(),
  goal_id uuid not null references goals(id) on delete cascade,
  test_id uuid not null references tests(id) on delete cascade,
  relevance text not null default 'primary' check (relevance in ('primary', 'secondary')),
  rationale text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (goal_id, test_id)
);

-- Indexes
create index idx_goals_slug on goals(slug);
create index idx_goals_category on goals(category);
create index idx_goals_active on goals(is_active) where is_active = true;
create index idx_tests_slug on tests(slug);
create index idx_tests_category on tests(category);
create index idx_tests_active on tests(is_active) where is_active = true;
create index idx_mappings_goal on goal_test_mappings(goal_id);
create index idx_mappings_test on goal_test_mappings(test_id);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger goals_updated_at
  before update on goals
  for each row execute function update_updated_at();

create trigger tests_updated_at
  before update on tests
  for each row execute function update_updated_at();

-- RLS
alter table goals enable row level security;
alter table tests enable row level security;
alter table goal_test_mappings enable row level security;

-- Public read for active records
create policy "Public can read active goals"
  on goals for select using (is_active = true);

create policy "Public can read active tests"
  on tests for select using (is_active = true);

create policy "Public can read mappings for active goals"
  on goal_test_mappings for select using (
    exists (select 1 from goals where goals.id = goal_id and goals.is_active = true)
  );

-- Service role has full access (for admin operations)
create policy "Service role full access on goals"
  on goals for all using (auth.role() = 'service_role');

create policy "Service role full access on tests"
  on tests for all using (auth.role() = 'service_role');

create policy "Service role full access on mappings"
  on goal_test_mappings for all using (auth.role() = 'service_role');

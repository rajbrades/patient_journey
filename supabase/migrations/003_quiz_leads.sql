-- 003: Quiz leads table for capturing prospective patient info

create table quiz_leads (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  quiz_answers jsonb not null default '{}',
  goal_scores jsonb not null default '{}',
  recommended_test_ids uuid[] not null default '{}',
  recommended_test_slugs text[] not null default '{}',
  collection_preference text,
  budget_preference text,
  created_at timestamptz not null default now()
);

create index idx_quiz_leads_email on quiz_leads(email);
create index idx_quiz_leads_created on quiz_leads(created_at desc);

-- RLS: service role full access, no public read
alter table quiz_leads enable row level security;

create policy "Service role full access on quiz_leads"
  on quiz_leads for all using (auth.role() = 'service_role');

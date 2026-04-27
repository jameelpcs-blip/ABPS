create extension if not exists "pgcrypto";

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text not null,
  created_at timestamptz not null default now()
);

create table if not exists company_users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('admin', 'planner', 'trader', 'viewer')),
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create table if not exists vessels (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  imo text,
  consumption_curve jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists barges (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  port text not null,
  capacity_mt numeric not null,
  available_from timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists nominations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  customer text not null,
  vessel_name text not null,
  barge_name text,
  port text not null,
  terminal text,
  eta timestamptz not null,
  etd timestamptz,
  quantity_mt numeric not null,
  product text not null check (product in ('VLSFO', 'HSFO', 'MGO', 'BIOFUEL')),
  current_rob_mt numeric,
  min_safe_rob_mt numeric,
  voyage_distance_nm numeric,
  service_hours numeric default 6,
  priority int not null default 3 check (priority between 1 and 5),
  status text not null default 'pending' check (status in ('draft', 'pending', 'scheduled', 'conflict', 'completed')),
  notes text,
  created_at timestamptz not null default now()
);

alter table companies enable row level security;
alter table company_users enable row level security;
alter table vessels enable row level security;
alter table barges enable row level security;
alter table nominations enable row level security;

create policy "company members can read companies"
on companies for select
using (
  exists (
    select 1 from company_users
    where company_users.company_id = companies.id
    and company_users.user_id = auth.uid()
  )
);

create policy "company members can manage nominations"
on nominations for all
using (
  exists (
    select 1 from company_users
    where company_users.company_id = nominations.company_id
    and company_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from company_users
    where company_users.company_id = nominations.company_id
    and company_users.user_id = auth.uid()
  )
);

create policy "company members can read vessels"
on vessels for select
using (
  exists (
    select 1 from company_users
    where company_users.company_id = vessels.company_id
    and company_users.user_id = auth.uid()
  )
);

create policy "company members can read barges"
on barges for select
using (
  exists (
    select 1 from company_users
    where company_users.company_id = barges.company_id
    and company_users.user_id = auth.uid()
  )
);

create policy "company admins can manage barges"
on barges for all
using (
  exists (
    select 1 from company_users
    where company_users.company_id = barges.company_id
    and company_users.user_id = auth.uid()
    and company_users.role in ('admin', 'planner')
  )
)
with check (
  exists (
    select 1 from company_users
    where company_users.company_id = barges.company_id
    and company_users.user_id = auth.uid()
    and company_users.role in ('admin', 'planner')
  )
);

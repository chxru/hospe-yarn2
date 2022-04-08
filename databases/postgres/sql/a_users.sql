create schema if not exists users;

create table if not exists users.data(
  user_id uuid primary key default gen_random_uuid(),
  email text unique not null,
  pwd text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

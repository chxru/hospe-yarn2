create schema if not exists users;

create table if not exists users.data(
  userId uuid primary key default gen_random_uuid(),
  email text unique not null,
  fname text not null,
  lname text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists users.auth(
  email text unique primary key,
  pwd text not null,
  userId uuid not null references users.data(userId),
  last_update timestamptz not null default now()
);
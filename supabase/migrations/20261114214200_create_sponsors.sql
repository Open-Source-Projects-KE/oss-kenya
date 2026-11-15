create table if not exists sponsors (
  id bigint generated always as identity primary key,
  name text not null,
  description text check (char_length(description) <= 160),
  partner_type text not null,
  tier text not null check (tier in ('gold', 'silver', 'community')),
  logo_url text,
  website_url text not null check (website_url like 'https://%'),
  sort_order integer not null default 0,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table sponsors enable row level security;

grant select on table sponsors to anon, authenticated;

create policy "public read approved sponsors" on sponsors
  for select using (approved = true);

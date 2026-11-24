-- Open Source Kenya: run this in Supabase > SQL Editor

create table if not exists projects (
  id bigint generated always as identity primary key,
  name text not null,
  description text not null,
  category text not null,      -- e.g. Learning, Civic tech, AI & Data
  language text not null,
  level text not null check (level in ('Beginner','Intermediate','Advanced')),
  region text not null default 'Global' check (region in ('Kenya','Africa','Global')),
  url text not null,
  issues_url text,
  fork_count integer,
  approved boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists programs (
  id bigint generated always as identity primary key,
  name text not null,
  org text not null,
  description text not null,
  paid boolean not null default true,
  timing text,
  eligibility text,
  url text not null,
  approved boolean not null default false,
  created_at timestamptz default now()
);

-- Security: the public can only READ approved rows.
-- You approve new rows yourself in the Table Editor (flip "approved" to true).
alter table projects enable row level security;
alter table programs enable row level security;

create policy "public read approved projects" on projects
  for select using (approved = true);
create policy "public read approved programs" on programs
  for select using (approved = true);

insert into programs (name,org,description,paid,timing,eligibility,url,approved) values
('Google Summer of Code','Google','Work for about three months on an open source project with a mentor. Open to beginners and students.',true,'Applications usually open in the first half of the year','Beginners and students 18+','https://summerofcode.withgoogle.com',true),
('Outreachy','Software Freedom Conservancy','Paid remote internships for people facing under-representation in tech. Includes a contribution period.',true,'Two rounds a year','Check the eligibility page','https://www.outreachy.org',true),
('MLH Fellowship','Major League Hacking','Remote fellowship with engineering and open source tracks.',true,'Several cohorts a year','Early-career developers','https://fellowship.mlh.io',true),
('LFX Mentorship','Linux Foundation','Mentored work on projects like Kubernetes and Hyperledger.',true,'Terms through the year','Open to all with the right skills','https://lfx.linuxfoundation.org/tools/mentorship/',true),
('Summer of Bitcoin','Summer of Bitcoin','Mentored open source work on Bitcoin and Lightning projects.',true,'Runs in the northern summer','Students and developers','https://www.summerofbitcoin.org',true),
('Hacktoberfest','DigitalOcean','A month of open source contributions in October. Rewards are swag, not pay, but it''s a great first step.',false,'Every October','Anyone','https://hacktoberfest.com',true);

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

-- Starter data (all pre-approved)
insert into projects (name,description,category,language,level,region,url,issues_url,approved) values
('First Contributions','A guided, hands-on repo for making your very first pull request.','Learning','Markdown','Beginner','Global','https://github.com/firstcontributions/first-contributions','https://github.com/firstcontributions/first-contributions/contribute',true),
('freeCodeCamp','The free coding curriculum used by millions. Docs and curriculum fixes welcome.','Learning','TypeScript','Beginner','Global','https://github.com/freeCodeCamp/freeCodeCamp','https://github.com/freeCodeCamp/freeCodeCamp/contribute',true),
('Ushahidi Platform','Crisis mapping and citizen reporting software that started in Kenya.','Civic tech','PHP','Intermediate','Kenya','https://github.com/ushahidi/platform','https://github.com/ushahidi/platform/contribute',true),
('Masakhane','Community building natural language tools for African languages.','AI & Data','Python','Intermediate','Africa','https://github.com/masakhane-io','https://github.com/masakhane-io',true),
('Common Voice','Mozilla''s open speech dataset. Swahili is among the supported languages.','AI & Data','TypeScript','Intermediate','Global','https://github.com/common-voice/common-voice','https://github.com/common-voice/common-voice/contribute',true),
('OpenStreetMap iD','The in-browser map editor behind OpenStreetMap.','Maps','JavaScript','Intermediate','Global','https://github.com/openstreetmap/iD','https://github.com/openstreetmap/iD/contribute',true),
('Supabase','The open source Postgres backend platform. Docs and examples are a good start.','Web & Backend','TypeScript','Intermediate','Global','https://github.com/supabase/supabase','https://github.com/supabase/supabase/contribute',true),
('Appwrite','Open source backend server for web, mobile and Flutter apps.','Web & Backend','TypeScript','Intermediate','Global','https://github.com/appwrite/appwrite','https://github.com/appwrite/appwrite/contribute',true),
('ERPNext','Open source business software used by many African SMEs.','Business','Python','Advanced','Global','https://github.com/frappe/erpnext','https://github.com/frappe/erpnext/contribute',true),
('Home Assistant','Open source home automation with thousands of device integrations.','IoT','Python','Advanced','Global','https://github.com/home-assistant/core','https://github.com/home-assistant/core/contribute',true);

insert into programs (name,org,description,paid,timing,eligibility,url,approved) values
('Google Summer of Code','Google','Work for about three months on an open source project with a mentor. Open to beginners and students.',true,'Applications usually open in the first half of the year','Beginners and students 18+','https://summerofcode.withgoogle.com',true),
('Outreachy','Software Freedom Conservancy','Paid remote internships for people facing under-representation in tech. Includes a contribution period.',true,'Two rounds a year','Check the eligibility page','https://www.outreachy.org',true),
('MLH Fellowship','Major League Hacking','Remote fellowship with engineering and open source tracks.',true,'Several cohorts a year','Early-career developers','https://fellowship.mlh.io',true),
('LFX Mentorship','Linux Foundation','Mentored work on projects like Kubernetes and Hyperledger.',true,'Terms through the year','Open to all with the right skills','https://lfx.linuxfoundation.org/tools/mentorship/',true),
('Summer of Bitcoin','Summer of Bitcoin','Mentored open source work on Bitcoin and Lightning projects.',true,'Runs in the northern summer','Students and developers','https://www.summerofbitcoin.org',true),
('Hacktoberfest','DigitalOcean','A month of open source contributions in October. Rewards are swag, not pay, but it''s a great first step.',false,'Every October','Anyone','https://hacktoberfest.com',true);

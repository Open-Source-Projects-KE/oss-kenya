alter table projects
  add column if not exists live_url text check (live_url is null or live_url like 'https://%');

grant insert on table projects to anon, authenticated;

create policy "public submit approved projects" on projects
  for insert with check (approved = true);

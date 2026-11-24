alter table projects
  add column if not exists fork_count integer;

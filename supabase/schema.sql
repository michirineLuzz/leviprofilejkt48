create table if not exists public.gallery_items (
  id text primary key,
  image_url text not null,
  label text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.media_items (
  id text primary key,
  type text not null check (type in ('video', 'article')),
  title text not null,
  source text not null,
  date_label text not null,
  thumb_url text not null,
  url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.hashtags (
  id text primary key,
  tag text not null,
  description text not null default '',
  color text not null default 'var(--c-pink)',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.show_metrics (
  id text primary key,
  label text not null,
  value text not null,
  description text not null default '',
  color text not null default 'var(--c-blue)',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;
alter table public.media_items enable row level security;
alter table public.hashtags enable row level security;
alter table public.show_metrics enable row level security;

drop policy if exists "Public read gallery_items" on public.gallery_items;
create policy "Public read gallery_items"
on public.gallery_items for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated write gallery_items" on public.gallery_items;
create policy "Authenticated write gallery_items"
on public.gallery_items for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public read media_items" on public.media_items;
create policy "Public read media_items"
on public.media_items for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated write media_items" on public.media_items;
create policy "Authenticated write media_items"
on public.media_items for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public read hashtags" on public.hashtags;
create policy "Public read hashtags"
on public.hashtags for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated write hashtags" on public.hashtags;
create policy "Authenticated write hashtags"
on public.hashtags for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public read show_metrics" on public.show_metrics;
create policy "Public read show_metrics"
on public.show_metrics for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated write show_metrics" on public.show_metrics;
create policy "Authenticated write show_metrics"
on public.show_metrics for all
to authenticated
using (true)
with check (true);

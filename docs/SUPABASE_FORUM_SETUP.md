# Supabase Forum Setup (Justice With a Cause)

This guide walks Kyle through creating the Supabase tables, security policies, and environment variables needed for the tenant-only forum.

## 1) Create the Supabase project
1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New project**.
3. Pick an organization, set a project name, and set a strong database password.
4. Wait for the project to finish provisioning.

## 2) Create database tables + RLS policies
1. In Supabase, open **SQL Editor**.
2. Click **New query**.
3. Paste the SQL below and click **Run**.

```sql
create type public.forum_profile_status as enum ('pending', 'approved', 'rejected');
create type public.forum_role as enum ('user', 'admin');

create table public.profiles (
  user_id uuid primary key references auth.users on delete cascade,
  display_name text,
  status public.forum_profile_status not null default 'pending',
  role public.forum_role not null default 'user',
  created_at timestamptz not null default now()
);

create table public.forum_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  is_announcement boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.forum_topics (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.forum_categories on delete cascade,
  title text not null,
  body text not null,
  created_by uuid not null references public.profiles on delete cascade,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.forum_comments (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.forum_topics on delete cascade,
  body text not null,
  created_by uuid not null references public.profiles on delete cascade,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger forum_topics_updated_at
before update on public.forum_topics
for each row execute function public.set_updated_at();

create or replace function public.is_forum_member()
returns boolean
language sql stable as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid()
      and status = 'approved'
  );
$$;

create or replace function public.is_forum_admin()
returns boolean
language sql stable as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid()
      and status = 'approved'
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.forum_categories enable row level security;
alter table public.forum_topics enable row level security;
alter table public.forum_comments enable row level security;

create policy "profiles_select_self_or_members"
on public.profiles
for select
using (
  auth.uid() = user_id
  or public.is_forum_member()
  or public.is_forum_admin()
);

create policy "profiles_insert_self"
on public.profiles
for insert
with check (auth.uid() = user_id);

create policy "profiles_update_self_display_name"
on public.profiles
for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and role = (select role from public.profiles where user_id = auth.uid())
  and status = (select status from public.profiles where user_id = auth.uid())
);

create policy "profiles_admin_update"
on public.profiles
for update
using (public.is_forum_admin())
with check (public.is_forum_admin());

create policy "forum_categories_select_approved"
on public.forum_categories
for select
using (public.is_forum_member() or public.is_forum_admin());

create policy "forum_categories_admin_write"
on public.forum_categories
for insert
with check (public.is_forum_admin());

create policy "forum_categories_admin_update"
on public.forum_categories
for update
using (public.is_forum_admin())
with check (public.is_forum_admin());

create policy "forum_categories_admin_delete"
on public.forum_categories
for delete
using (public.is_forum_admin());

create policy "forum_topics_select_approved"
on public.forum_topics
for select
using (public.is_forum_member() or public.is_forum_admin());

create policy "forum_topics_insert_member"
on public.forum_topics
for insert
with check (
  public.is_forum_member()
  and created_by = auth.uid()
  and (
    not exists (
      select 1 from public.forum_categories
      where id = category_id and is_announcement = true
    )
    or public.is_forum_admin()
  )
);

create policy "forum_topics_admin_update"
on public.forum_topics
for update
using (public.is_forum_admin())
with check (public.is_forum_admin());

create policy "forum_topics_admin_delete"
on public.forum_topics
for delete
using (public.is_forum_admin());

create policy "forum_comments_select_approved"
on public.forum_comments
for select
using (public.is_forum_member() or public.is_forum_admin());

create policy "forum_comments_insert_member"
on public.forum_comments
for insert
with check (
  public.is_forum_member()
  and created_by = auth.uid()
);

create policy "forum_comments_admin_update"
on public.forum_comments
for update
using (public.is_forum_admin())
with check (public.is_forum_admin());

create policy "forum_comments_admin_delete"
on public.forum_comments
for delete
using (public.is_forum_admin());
```

## 3) Create the first admin account
1. Sign up in the website (or Supabase Auth) with your admin email.
2. Copy your `user_id` from **Authentication → Users**.
3. Run this SQL in the **SQL Editor**:

```sql
update public.profiles
set status = 'approved', role = 'admin'
where user_id = 'PASTE-USER-ID-HERE';
```

## 4) Add starter categories (optional but recommended)
```sql
insert into public.forum_categories (name, description, is_announcement)
values
  ('Announcements', 'Admin-only updates for tenants.', true),
  ('Repairs & Maintenance', 'Report conditions, repairs, and follow-ups.', false),
  ('Lease & Fees', 'Questions about rent, leases, and fees.', false),
  ('Community Support', 'Share resources and support with neighbors.', false);
```

## 5) Add Supabase keys in Netlify
1. In Netlify, open **Site settings → Environment variables**.
2. Add the following variables:
   - `VITE_SUPABASE_URL` = *Project Settings → API → Project URL*
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = *Project Settings → API → anon public key*
3. Trigger a new deploy.

## 6) Local development (optional)
Create a `.env` file in the repo root:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

## 7) Approving tenants & managing announcements
- Approve tenants: visit `/admin` on the site and click **Approve**.
- Promote admins: click **Promote to Admin**.
- Create or edit categories: use the **Admin Tools** page to add or update categories.
- Announcements: create a category with **Announcements** enabled and only admins can post there.

-- =========================
-- Invites: table + RPCs
-- =========================
create extension if not exists pgcrypto;

-- 1) invites table
create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null,
  token_hash text not null unique,
  invited_email text not null,
  expires_at timestamptz not null,
  used_at timestamptz null,
  created_by uuid not null,
  created_at timestamptz not null default now()
);

create index if not exists invites_family_id_idx on public.invites(family_id);
create index if not exists invites_expires_at_idx on public.invites(expires_at);

-- helper: sha256 hex
create or replace function public.sha256_hex(input text)
returns text
language sql
immutable
as $$
  select encode(digest(input, 'sha256'), 'hex');
$$;

-- =========================
-- 2) create_invite (App side)
-- - Auth required
-- - Stores only hash in DB
-- - Returns plain token to be embedded in URL (NOT stored)
-- =========================
create or replace function public.create_invite(invited_email text, expires_in_days int default 7)
returns table (
  token text,
  expires_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_family_id uuid;
  v_token text;
  v_hash text;
  v_expires_at timestamptz;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'unauthorized';
  end if;

  -- 送る側（親A）が所属する family_id を取得（ここはあなたのスキーマに合わせて調整）
  -- 例: 1ユーザー=1家族の前提で family_members から1件取る
  select fm.family_id into v_family_id
  from public.family_members fm
  where fm.user_id = v_uid
  limit 1;

  if v_family_id is null then
    raise exception 'family_not_found';
  end if;

  if invited_email is null or length(trim(invited_email)) = 0 then
    raise exception 'invited_email_required';
  end if;

  v_expires_at := now() + make_interval(days => greatest(expires_in_days, 1));

  -- token生成（URL用の平文。DBにはhashのみ保存）
  v_token := encode(gen_random_bytes(24), 'base64url'); -- だいたい32〜40文字程度
  v_hash := public.sha256_hex(v_token);

  insert into public.invites (family_id, token_hash, invited_email, expires_at, created_by)
  values (v_family_id, v_hash, lower(trim(invited_email)), v_expires_at, v_uid);

  return query select v_token, v_expires_at;
end;
$$;

-- =========================
-- 3) get_invite_preview (Web side)
-- - Unauthenticated OK
-- - Returns minimal info only
-- =========================
create or replace function public.get_invite_preview(token text)
returns table (
  status text,
  invited_email text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hash text;
  v_inv public.invites%rowtype;
begin
  if token is null or length(token) < 10 then
    return query select 'invalid_token', null::text;
    return;
  end if;

  v_hash := public.sha256_hex(token);

  select * into v_inv
  from public.invites
  where token_hash = v_hash
  limit 1;

  if v_inv.id is null then
    return query select 'invalid_token', null::text;
    return;
  end if;

  if v_inv.used_at is not null then
    return query select 'used', v_inv.invited_email;
    return;
  end if;

  if v_inv.expires_at < now() then
    return query select 'expired', v_inv.invited_email;
    return;
  end if;

  return query select 'valid', v_inv.invited_email;
end;
$$;

-- =========================
-- 4) accept_invite (Web side)
-- - Auth required
-- - Checks: token, expired, used, email match
-- - Optional: 1ユーザー=1家族制約
-- - Inserts family_members then marks used_at
-- =========================
create or replace function public.accept_invite(token text)
returns table (
  ok boolean,
  code text,
  family_id uuid
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_email text;
  v_hash text;
  v_inv public.invites%rowtype;
  v_existing_family uuid;
begin
  v_uid := auth.uid();
  if v_uid is null then
    return query select false, 'unauthorized', null::uuid;
    return;
  end if;

  -- email取得（auth.email()が使える環境ならこれでOK）
  begin
    v_email := lower(auth.email());
  exception when others then
    v_email := null;
  end;

  if v_email is null then
    -- 最悪 fallback: auth.users 参照（環境により権限/参照可否が変わるので必要なら調整）
    select lower(u.email) into v_email
    from auth.users u
    where u.id = v_uid;
  end if;

  if token is null or length(token) < 10 then
    return query select false, 'invalid_token', null::uuid;
    return;
  end if;

  v_hash := public.sha256_hex(token);

  select * into v_inv
  from public.invites
  where token_hash = v_hash
  limit 1;

  if v_inv.id is null then
    return query select false, 'invalid_token', null::uuid;
    return;
  end if;

  if v_inv.used_at is not null then
    return query select false, 'used', null::uuid;
    return;
  end if;

  if v_inv.expires_at < now() then
    return query select false, 'expired', null::uuid;
    return;
  end if;

  if v_email is null or v_email <> lower(v_inv.invited_email) then
    return query select false, 'email_mismatch', null::uuid;
    return;
  end if;

  -- 1ユーザー=1家族制約（必要ならON）
  select fm.family_id into v_existing_family
  from public.family_members fm
  where fm.user_id = v_uid
  limit 1;

  if v_existing_family is not null and v_existing_family <> v_inv.family_id then
    return query select false, 'already_in_other_family', null::uuid;
    return;
  end if;

  -- insert membership（重複は無視）
  insert into public.family_members (family_id, user_id)
  values (v_inv.family_id, v_uid)
  on conflict do nothing;

  -- mark used AFTER success
  update public.invites
  set used_at = now()
  where id = v_inv.id
    and used_at is null;

  return query select true, 'ok', v_inv.family_id;
end;
$$;

-- =========================
-- 5) RLS minimal
-- =========================
alter table public.invites enable row level security;

-- invites: direct accessは禁止（RPC経由のみ想定）
-- 何もpolicyを作らない＝select/insert/update/deleteは拒否（service_role以外）

-- family_members: あなたの既存RLSに合わせる。
-- RPCがsecurity definerなので、ここは最小でOK（ただし既存が厳しすぎる場合は調整が必要）
-- 例: RLSがONでinsertが完全拒否なら、accept_inviteが失敗するので要確認。

-- =========================
-- 6) Grants: allow anon/authenticated to execute preview, authenticated for accept/create
-- =========================
grant execute on function public.get_invite_preview(text) to anon, authenticated;
grant execute on function public.accept_invite(text) to authenticated;
grant execute on function public.create_invite(text, int) to authenticated;

drop extension if exists "pg_net";

drop policy "Users can delete own records" on "public"."records";

drop policy "Users can insert own records" on "public"."records";

drop policy "Users can update own records" on "public"."records";

drop policy "Users can view own records" on "public"."records";

alter table "public"."families" drop constraint "families_owner_id_fkey";

alter table "public"."invites" drop constraint "invites_invited_by_fkey";

drop function if exists "public"."send_signup_email"();

alter table "public"."invites" add column "expires_at" timestamp with time zone;

alter table "public"."invites" add column "token" text;

CREATE UNIQUE INDEX family_members_family_user_unique ON public.family_members USING btree (family_id, user_id);

CREATE UNIQUE INDEX family_members_user_unique ON public.family_members USING btree (user_id);

CREATE UNIQUE INDEX invites_token_unique_idx ON public.invites USING btree (token);

alter table "public"."family_members" add constraint "family_members_family_user_unique" UNIQUE using index "family_members_family_user_unique";

alter table "public"."family_members" add constraint "family_members_user_unique" UNIQUE using index "family_members_user_unique";

alter table "public"."families" add constraint "families_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."families" validate constraint "families_owner_id_fkey";

alter table "public"."invites" add constraint "invites_invited_by_fkey" FOREIGN KEY (invited_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."invites" validate constraint "invites_invited_by_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_family_owner(target_family_id uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.families f
    where f.id = target_family_id
      and f.owner_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.list_invites()
 RETURNS TABLE(token text, email text, created_at timestamp with time zone, expires_at timestamp with time zone, status text)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select i.token, i.email, i.created_at, i.expires_at, i.status
  from public.invites i
  where i.family_id = (
    select f.id
    from public.families f
    where f.owner_id = auth.uid()
    limit 1
  )
    and i.status = 'pending'
  order by i.created_at desc;
$function$
;

drop trigger if exists "trigger_send_signup_email" on "auth"."users";

drop policy "Family members can update record images" on "storage"."objects";

drop policy "Family members can upload record images" on "storage"."objects";

drop policy "Authenticated users can view family images" on "storage"."objects";


  create policy "Users can update images 12mg93n_0"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using ((bucket_id = 'test-images'::text));



  create policy "Users can update images 12mg93n_1"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using ((bucket_id = 'test-images'::text));



  create policy "Users can upload images"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'test-images'::text) AND (owner = auth.uid())));



  create policy "Authenticated users can view family images"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'test-images'::text) AND (owner = auth.uid())));




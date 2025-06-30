-- supabase/migrations/0000_init.sql

-- Create a user_role ENUM type only if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('admin', 'member');
    END IF;
END$$;

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role public.user_role DEFAULT 'member' NOT NULL,
  email_notifications_enabled BOOLEAN DEFAULT TRUE NOT NULL,
  push_notifications_enabled BOOLEAN DEFAULT TRUE NOT NULL
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.profiles IS 'Stores public-facing profile information for each user.';

-- RLS POLICIES FOR PROFILES
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can manage their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Admins have full access." ON public.profiles;

CREATE POLICY "Users can manage their own profile." ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admins have full access." ON public.profiles FOR ALL TO authenticated USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' );


-- AUTH TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'member', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    stripe_price_id TEXT,
    status TEXT,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own subscription." ON public.subscriptions;
CREATE POLICY "Users can view their own subscription." ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- MARKETING SITE TABLES
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Pages are publicly readable." ON public.pages;
CREATE POLICY "Pages are publicly readable." ON public.pages FOR SELECT USING (true);


CREATE TABLE IF NOT EXISTS public.marketing_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id TEXT NOT NULL,
    icon_name TEXT,
    title TEXT NOT NULL,
    description TEXT,
    display_order INT
);
ALTER TABLE public.marketing_features ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Features are publicly readable." ON public.marketing_features;
CREATE POLICY "Features are publicly readable." ON public.marketing_features FOR SELECT USING (true);


CREATE TABLE IF NOT EXISTS public.marketing_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT,
    category TEXT DEFAULT 'General' NOT NULL
);
ALTER TABLE public.marketing_faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "FAQs are publicly readable." ON public.marketing_faqs;
CREATE POLICY "FAQs are publicly readable." ON public.marketing_faqs FOR SELECT USING (true);


CREATE TABLE IF NOT EXISTS public.marketing_testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT,
    author_avatar_url TEXT,
    display_order INT
);
ALTER TABLE public.marketing_testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Testimonials are publicly readable." ON public.marketing_testimonials;
CREATE POLICY "Testimonials are publicly readable." ON public.marketing_testimonials FOR SELECT USING (true);


-- STORAGE POLICIES FOR AVATARS
DROP POLICY IF EXISTS "Allow public read access to avatars" ON storage.objects;
CREATE POLICY "Allow public read access to avatars" ON storage.objects FOR SELECT TO authenticated USING ( bucket_id = 'images' AND name LIKE 'avatars/%' );

DROP POLICY IF EXISTS "Allow authenticated users to upload to their own folder" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload to their own folder" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'images' AND name LIKE 'avatars/' || auth.uid() || '/%' );

DROP POLICY IF EXISTS "Allow authenticated users to update their own avatar" ON storage.objects;
CREATE POLICY "Allow authenticated users to update their own avatar" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'images' AND name LIKE 'avatars/' || auth.uid() || '/%' );
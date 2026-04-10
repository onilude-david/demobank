-- ============================================================
-- VAULT DASHBOARD — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id        UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name      TEXT NOT NULL DEFAULT 'User',
    initials  TEXT DEFAULT 'U',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Accounts table (one per user)
CREATE TABLE IF NOT EXISTS public.accounts (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    balance    DECIMAL(12, 2) NOT NULL DEFAULT 24562.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    merchant   TEXT NOT NULL,
    amount     DECIMAL(12, 2) NOT NULL,
    type       TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    category   TEXT NOT NULL DEFAULT 'Other',
    date       TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE public.profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Accounts
CREATE POLICY "Users can view own account"
    ON public.accounts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own account"
    ON public.accounts FOR UPDATE USING (auth.uid() = user_id);

-- Transactions
CREATE POLICY "Users can view own transactions"
    ON public.transactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
    ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Trigger: auto-create profile + account + seed data on signup
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    v_name     TEXT;
    v_initials TEXT;
    v_words    TEXT[];
BEGIN
    v_name := COALESCE(
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );

    v_words := string_to_array(v_name, ' ');
    IF array_length(v_words, 1) >= 2 THEN
        v_initials := UPPER(LEFT(v_words[1], 1) || LEFT(v_words[2], 1));
    ELSE
        v_initials := UPPER(LEFT(v_name, 2));
    END IF;

    INSERT INTO public.profiles (id, name, initials)
    VALUES (NEW.id, v_name, v_initials);

    INSERT INTO public.accounts (user_id, balance)
    VALUES (NEW.id, 24562.00);

    INSERT INTO public.transactions (user_id, merchant, amount, type, category, date) VALUES
        (NEW.id, 'Starbucks',       -5.50,   'expense', 'Food',      'Today, 10:23 AM'),
        (NEW.id, 'Apple Store',     -999.00, 'expense', 'Tech',      'Yesterday, 4:15 PM'),
        (NEW.id, 'Salary Deposit',  4500.00, 'income',  'Salary',    'Oct 28, 9:00 AM'),
        (NEW.id, 'Uber',            -24.50,  'expense', 'Transport', 'Oct 27, 8:30 PM'),
        (NEW.id, 'Whole Foods',     -142.80, 'expense', 'Groceries', 'Oct 26, 6:45 PM'),
        (NEW.id, 'Electric Bill',   -120.00, 'expense', 'Utilities', 'Oct 25, 11:00 AM');

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

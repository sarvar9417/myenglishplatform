import { createClient } from "@supabase/supabase-js";

// Supabase sozlamalari — https://supabase.com → Project Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SQL schema for the users table (run this in Supabase SQL Editor):
//
// CREATE TABLE users (
//   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
//   email TEXT,
//   display_name TEXT,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   stats JSONB DEFAULT '{"gamesPlayed": 0, "totalCorrect": 0, "totalQuestions": 0, "bestScore": 0}',
//   last_game_at TIMESTAMPTZ,
//   last_mistakes JSONB
// );
//
// -- Row Level Security
// ALTER TABLE users ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Users can read own data" ON users
//   FOR SELECT USING (auth.uid() = id);
// CREATE POLICY "Users can insert own data" ON users
//   FOR INSERT WITH CHECK (auth.uid() = id);
// CREATE POLICY "Users can update own data" ON users
//   FOR UPDATE USING (auth.uid() = id);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client for public operations (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for admin operations (bypasses RLS) - requires SUPABASE_SERVICE_ROLE_KEY in .env.local
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : supabase; // Fallback to anon key if not set, though it will fail RLS for admin actions

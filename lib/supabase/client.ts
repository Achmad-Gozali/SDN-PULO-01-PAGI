import { createBrowserClient } from "@supabase/ssr";

// FIX (SUPABASE): Supabase browser client untuk dipakai di komponen "use client"
// Pastikan .env.local punya:
// NEXT_PUBLIC_SUPABASE_URL=...
// NEXT_PUBLIC_SUPABASE_ANON_KEY=...
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
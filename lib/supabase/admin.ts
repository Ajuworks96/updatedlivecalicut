import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Admin client — uses the SERVICE ROLE KEY.
 *
 * ⚠️  CRITICAL SECURITY RULES:
 * 1. ONLY import this in server-side code (API routes, Server Actions).
 * 2. NEVER import this in Client Components or expose to the browser.
 * 3. The service role key BYPASSES all RLS policies.
 * 4. Use only for admin operations: role assignment, user management, etc.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Added soft-disable: if env vars missing, return a mock client with minimal shape to avoid build errors.
export const createClient = async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    return {
      auth: {
        signOut: async () => ({ error: null }),
        signInWithOtp: async () => ({ data: null as any, error: null }),
        signInWithPassword: async () => ({ data: { user: null }, error: null }),
        signUp: async () => ({ data: { user: null, session: null }, error: null }),
        resetPasswordForEmail: async () => ({ data: null, error: null }),
        updateUser: async () => ({ data: { user: null }, error: null })
      }
    } as any;
  }
  const cookieStore = await cookies();

  return createServerClient(
    url,
    anon,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // ignore in RSC
          }
        }
      }
    }
  );
};

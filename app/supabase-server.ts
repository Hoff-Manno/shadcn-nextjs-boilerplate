import { Database } from '@/types/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

// Mock server client for demo purposes
const createMockServerClient = () => ({
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null })
  },
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  })
});

export const createServerSupabaseClient = cache(() => {
  // Use mock client for demo deployment
  const isDemoMode = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('xyzcompany') || 
                     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes('demo');
  
  if (isDemoMode) {
    return createMockServerClient() as any;
  }
  
  try {
    return createServerComponentClient<Database>({ cookies });
  } catch (error) {
    console.warn('Server Supabase initialization failed, using mock client for demo');
    return createMockServerClient() as any;
  }
});

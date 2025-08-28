'use client';

import type { Database } from '@/types/types_db';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type SupabaseContext = {
  supabase: SupabaseClient<Database> | MockSupabaseClient;
};

// Mock Supabase client for demo purposes
type MockSupabaseClient = {
  auth: {
    onAuthStateChange: (callback: (event: string) => void) => {
      data: { subscription: { unsubscribe: () => void } };
    };
  };
};

const createMockSupabaseClient = (): MockSupabaseClient => ({
  auth: {
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } }
    })
  }
});

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => {
    // Use mock client for demo deployment
    const isDemoMode = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('xyzcompany') || 
                       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes('demo');
    
    if (isDemoMode) {
      return createMockSupabaseClient();
    }
    
    try {
      return createPagesBrowserClient();
    } catch (error) {
      console.warn('Supabase initialization failed, using mock client for demo');
      return createMockSupabaseClient();
    }
  });
  const router = useRouter();

  useEffect(() => {
    try {
      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') router.refresh();
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.warn('Supabase auth listener setup failed, continuing with demo mode');
    }
  }, [router, supabase]);

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>;
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};

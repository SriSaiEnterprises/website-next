"use client"; // Mark this as a Client Component
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth'); // Redirect to /auth if not authenticated
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
};
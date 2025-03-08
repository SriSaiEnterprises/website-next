"use client"; // Ensure this hook runs on the client side
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const router = useRouter(); // Use Next.js's useRouter instead of useNavigate

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth'); // Use router.push for navigation
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push('/auth'); // Use router.push for navigation
      }
    });

    return () => subscription.unsubscribe();
  }, [router]); // Add router to the dependency array

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth'); // Use router.push for navigation
  };

  return { signOut };
}
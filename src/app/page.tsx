'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      switch (user.role) {
        case 'admin':
          router.push('/settings');
          break;
        case 'editor':
          router.push('/seat');
          break;
        case 'viewer':
          router.push('/seat-viewer');
          break;
        default:
          router.push('/signup');
          break;
      }
    } else if (!loading && !user) {
      router.push('/signin');
    }
  }, [loading, user, router]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

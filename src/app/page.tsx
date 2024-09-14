'use client';

// import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // const auth = getAuth();

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     router.push('/signin');
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

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
          router.push('/signin');
          break;
      }
    } else if (!loading && !user) {
      router.push('/signin');
    }
  }, [loading, user, router]);

  return (
    <div>
      <p>Loading...</p>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}

'use client';

import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>
        Welcome, {user?.role} {user?.email}!
      </h1>

      <button onClick={handleLogout}>Logout</button>

      {user?.role === 'admin' && (
        <div>
          <h2>Adminページ</h2>
          <a href="/seat">編集画面へ</a>
        </div>
      )}

      {user?.role === 'editor' && (
        <div>
          <h2>Editorページ</h2>
          <a href="/seat">編集画面へ</a>
        </div>
      )}

      {user?.role === 'viewer' && (
        <div>
          <h2>Viewerページ</h2>
          <p>閲覧のみ可能なページへ</p>
        </div>
      )}
    </div>
  );
}

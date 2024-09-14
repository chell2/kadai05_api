'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SignOutButton from '@/app/components/SignOutButton';

export default function Settings() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/'); // 非管理者をリダイレクト
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Settings</h1>
      <p>This page is only accessible to administrators.</p>
      {/* 管理者設定内容 */}
      <SignOutButton />
    </div>
  );
}

'use client';

import { useAuth } from '@/app/hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Please log in to access this page.</p>;

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>

      {user.role === 'admin' && (
        <div>
          <h2>Admin Settings</h2>
          <p>You have access to the admin panel.</p>
          {/* 管理者設定画面リンク */}
          <a href="/settings">Go to Settings</a>
        </div>
      )}

      {user.role === 'editor' && (
        <div>
          <h2>Editor Section</h2>
          <p>You can edit content here.</p>
          {/* 編集可能なコンテンツ */}
        </div>
      )}

      {user.role === 'viewer' && (
        <div>
          <h2>Viewer Section</h2>
          <p>You can view content here.</p>
          {/* 閲覧のみのコンテンツ */}
        </div>
      )}
    </div>
  );
}

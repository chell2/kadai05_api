'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import SettingsNavbar from '../components/SettingsNavbar';

export default function Settings() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [roleChanges, setRoleChanges] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        // 初期状態で各ユーザーのロールを roleChanges にセット
        const initialRoleChanges = usersList.reduce((acc, user) => {
          acc[user.id] = user.role;
          return acc;
        }, {} as { [key: string]: string });
        setRoleChanges(initialRoleChanges);
      } catch (error) {
        console.error('ユーザー情報取得エラー:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (error) {
      console.error('ロール変更エラー:', error);
    }
  };

  const handleRoleSelectChange = (
    userId: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newRole = event.target.value;
    setRoleChanges({ ...roleChanges, [userId]: newRole });
    handleRoleChange(userId, newRole);
  };

  if (loading || loadingUsers) return <p>Loading...</p>;

  return (
    <div className="bg-background text-primary min-h-screen p-4 font-stylish">
      <SettingsNavbar />
      <div className="container mx-auto max-w-[600px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-light text-primary">
            TABLE VIEW <br />
            <small>for restaurant Note🍷</small>
          </h1>
        </div>
        <div className="bg-neutral rounded-lg shadow-lg p-6">
          <h2 className="text-primary font-light mb-4">ユーザー権限の編集</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-primary text-neutral rounded-tl-lg">
                  Email
                </th>
                <th className="py-2 px-4 bg-primary text-neutral">Role</th>
                <th className="py-2 px-4 bg-primary text-neutral rounded-tr-lg">
                  Change Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:brightness-90 transition-colors duration-300"
                >
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={roleChanges[user.id]}
                      onChange={(event) =>
                        handleRoleSelectChange(user.id, event)
                      }
                      className="bg-accent text-neutral border-0 rounded-lg p-2 shadow-sm transition-all duration-300 hover:brightness-90"
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

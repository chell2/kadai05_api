import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

type UserRole = 'admin' | 'editor' | 'viewer';

interface User {
  uid: string;
  email: string;
  role: UserRole;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firebaseユーザーの追加情報を取得（例：Firestoreからroleを取得）
        const userRole: UserRole = 'editor'; // Firestoreからrole情報を取得する処理を追加
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          role: userRole,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

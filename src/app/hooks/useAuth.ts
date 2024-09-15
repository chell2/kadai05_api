import { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';

interface UserData {
  // Firestore に格納されているユーザーのデータの型を定義
  email?: string;
  role?: string;
}

interface User extends FirebaseUser {
  // FirebaseUser のプロパティに加えて、Firestore からのデータを追加
  role?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userDoc = doc(db, `users/${authUser.uid}`);
          const docSnap: DocumentSnapshot<UserData> = await getDoc(userDoc);

          if (docSnap.exists()) {
            setUser({ ...authUser, ...docSnap.data() });
          } else {
            setUser(authUser as User);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

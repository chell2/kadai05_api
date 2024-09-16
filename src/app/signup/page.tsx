'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function addUserToFirestore(user: { uid: string; email: any }) {
    const userRef = doc(db, 'users', user.uid);
    try {
      await setDoc(userRef, {
        email: user.email,
        role: 'viewer',
      });
      console.log('User added to Firestore');
    } catch (err) {
      console.error('Error adding user to Firestore: ', err);
    }
  }

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addUserToFirestore(user);
      router.push('/');
    } catch (err) {
      setError('Failed to sign up');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.uid, user.email);
      await addUserToFirestore(user);
      router.push('/');
    } catch (err) {
      setError('Failed to sign up with Google');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-stylish text-primary">
      <div className="bg-white p-6 rounded-lg shadow-md w-10/12 max-w-md">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mb-6 font-light">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 p-2 border border-gray-200 rounded-lg w-2/3"
          />
          <div className="relative mb-4 w-2/3">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border border-gray-200 rounded-lg w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <div>
            <button
              onClick={handleSignUp}
              className="bg-primary text-neutral hover:brightness-90 px-4 py-2 rounded-lg w-full"
            >
              Sign Up
            </button>
            <div className="text-center">or</div>
            <button
              onClick={handleGoogleSignUp}
              className="bg-white hover:brightness-90 border border-secondary px-4 py-2 rounded-lg flex items-center"
            >
              <FcGoogle className="mr-2" />
              Sign up with Google
            </button>
          </div>
          <a href="/signin" className="mt-4 text-center hover:underline">
            <small>*登録済みの方はこちら</small>
          </a>
        </div>
      </div>
    </div>
  );
}

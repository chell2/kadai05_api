'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from '@/app/firebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      setError('Failed to sign in');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err) {
      setError('Failed to sign in with Google');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-stylish text-primary">
      <div className="bg-white p-6 rounded-lg shadow-md w-10/12 max-w-md">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mb-6 font-light">Sign In</h1>
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
              onClick={handleSignIn}
              className="bg-primary text-neutral hover:brightness-90 px-4 py-2 rounded-lg w-full"
            >
              Sign In
            </button>
            <div className="text-center">or</div>
            <button
              onClick={handleGoogleSignIn}
              className="bg-white hover:brightness-90 border border-secondary px-4 py-2 rounded-lg flex items-center"
            >
              <FcGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>
          <a href="/signup" className="mt-4 text-center hover:underline">
            <small>*新規登録はこちら</small>
          </a>
        </div>
      </div>
    </div>
  );
}

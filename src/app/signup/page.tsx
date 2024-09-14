'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from '@/app/firebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/seat');
    } catch (err) {
      setError('Failed to sign up');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/seat');
    } catch (err) {
      setError('Failed to sign up with Google');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-4 p-2 border rounded"
      />
      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Sign Up
      </button>
      <button
        onClick={handleGoogleSignUp}
        className="bg-white text-black border px-4 py-2 rounded flex items-center"
      >
        <FcGoogle className="mr-2" />
        Sign up with Google
      </button>
    </div>
  );
}

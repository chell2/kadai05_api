'use client';

// import { useState } from 'react';
// import { auth } from '@/app/firebaseConfig';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/app/hooks/useAuth';

// export default function SignUpPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   // サインアップ処理
//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       router.push('/'); // サインアップ成功後にホームページにリダイレクト
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   // ログイン済みの場合のリダイレクト
//   if (!loading && user) {
//     router.push('/');
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
//         {error && (
//           <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-md">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSignUp}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Confirm your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Log in here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

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

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4 p-2 border rounded"
      />
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

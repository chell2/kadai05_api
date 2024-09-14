'use client';

// import { useState } from 'react';
// import { auth } from '@/app/firebaseConfig';
// import {
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from 'firebase/auth';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/app/hooks/useAuth';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const googleProvider = new GoogleAuthProvider();

//   // Googleでログイン
//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       router.push('/'); // ログイン成功後にホームページにリダイレクト
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   // メール/パスワードでログイン
//   const handleEmailLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push('/'); // ログイン成功後にホームページにリダイレクト
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
//         <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         {/* メール/パスワードログイン */}
//         <form onSubmit={handleEmailLogin} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Login with Email
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-500">or</div>

//         {/* Googleログイン */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
//         >
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// }

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Sign In</h1>
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
        onClick={handleSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Sign In
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="bg-white text-black border px-4 py-2 rounded flex items-center"
      >
        <FcGoogle className="mr-2" />
        Sign in with Google
      </button>
    </div>
  );
}

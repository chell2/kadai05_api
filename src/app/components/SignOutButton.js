import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();
  const auth = getAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <button
      className="bg-primary text-neutral hover:bg-secondary p-3 rounded-lg"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default SignOutButton;

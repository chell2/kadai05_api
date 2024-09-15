import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

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
      className="bg-primary text-neutral hover:brightness-90 px-8 py-3 rounded-lg flex items-center space-x-2"
      onClick={handleLogout}
    >
      <FaSignOutAlt />
      <span>Logout</span>
    </button>
  );
};

export default SignOutButton;

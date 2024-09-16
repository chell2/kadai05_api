import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import SignOutButton from './SignOutButton';
import HelpButton from './HelpButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !(event.target as Element).closest('.p-2')
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="relative">
      <div className="absolute right-4 top-4 flex items-center space-x-4 z-50">
        <HelpButton />
        <button onClick={toggleMenu} className="p-2">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-48 bg-white shadow-lg rounded-l-lg p-4 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-30`}
      >
        <ul className="space-y-4 mt-20 ml-2">
          <li>
            <button className="bg-primary text-neutral hover:brightness-90 p-3 rounded-lg">
              <a href="/seat-viewer">
                <small>閲覧画面プレビュー</small>
              </a>
            </button>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

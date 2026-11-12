
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const linkClass = ({ isActive }) =>
  `whitespace-nowrap border-b-2 pb-2 text-sm font-medium transition ${
    isActive
      ? 'border-blue-500 text-blue-400'
      : 'border-transparent text-gray-300 hover:text-blue-400'
  }`;

function Navbar() {
  const { isLoggedIn, isAdmin, member, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  // กดรายการโปรด
  function handleWishlistClick(e) {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0b1019]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="text-3xl">🎮</span>
          <span className="text-xl font-extrabold text-white">
            GAME<span className="text-blue-500">HUB</span>
          </span>
        </Link>

        {/* Menu */}
        <div className="flex flex-1 items-center justify-center gap-5 lg:gap-8">

          <NavLink to="/" end className={linkClass}>
            หน้าแรก
          </NavLink>

          <NavLink to="/games" className={linkClass}>
            เกม
          </NavLink>

          <NavLink
            to="/me/wishlist"
            className={linkClass}
            onClick={handleWishlistClick}
          >
            รายการโปรด
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            เกี่ยวกับเรา
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}

        </div>

        {/* Login / User */}
        <div className="flex shrink-0 items-center gap-3 text-sm">
          {isLoggedIn ? (
            <>
              <Link
                to="/me/profile"
                className="whitespace-nowrap rounded-full border border-gray-700 bg-gray-800 px-3 py-2 text-gray-200 hover:border-blue-500"
              >
                ♙ {member?.displayName || 'สมาชิก'}
              </Link>

              <button
                onClick={handleLogout}
                className="whitespace-nowrap text-gray-400 hover:text-red-400"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex whitespace-nowrap items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-white transition hover:border-blue-500 hover:bg-gray-700"
            >
              ♙ เข้าสู่ระบบ
            </Link>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Navbar;

import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const linkClass = ({ isActive }) =>
  'border-b-2 pb-1 text-sm transition ' +
  (isActive ? 'border-sky-500 font-medium text-white' : 'border-transparent text-slate-300 hover:text-white');

function Navbar() {
  const { isLoggedIn, isAdmin, member, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 md:px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-white">
          🎮 GAME<span className="text-sky-500">HUB</span>
        </Link>
        <div className="flex items-center gap-5">
          <NavLink to="/" end className={linkClass}>หน้าแรก</NavLink>
          <NavLink to="/games" className={linkClass}>เกม</NavLink>
          {isLoggedIn && <NavLink to="/me/wishlist" className={linkClass}>รายการโปรด</NavLink>}
          <NavLink to="/about" className={linkClass}>เกี่ยวกับเรา</NavLink>
          {isAdmin && <NavLink to="/admin" className={linkClass}>Admin</NavLink>}
        </div>
        <div className="ml-auto flex items-center gap-3 text-sm">
          {isLoggedIn ? (
            <>
              <Link to="/me/profile" className="text-slate-200 hover:text-white">👤 {member?.displayName}</Link>
              <button onClick={handleLogout} className="text-slate-400 hover:text-white">ออกจากระบบ</button>
            </>
          ) : (
            <Link to="/login" className="rounded-lg border border-slate-600 px-3 py-1.5 text-slate-100 hover:bg-slate-800">
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
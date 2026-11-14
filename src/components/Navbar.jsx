import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// ลิงก์บนเดสก์ท็อป (แถวเดียว มีเส้นใต้)
const desktopLink = ({ isActive }) =>
  `whitespace-nowrap border-b-2 pb-2 text-sm font-medium transition ${
    isActive
      ? 'border-blue-500 text-blue-400'
      : 'border-transparent text-gray-300 hover:text-blue-400'
  }`;

// ลิงก์บนมือถือ (เรียงลงมา กดง่ายด้วยนิ้ว)
const mobileLink = ({ isActive }) =>
  `block rounded-lg px-4 py-3 text-base font-medium transition ${
    isActive
      ? 'bg-blue-500/15 text-blue-400'
      : 'text-gray-300 hover:bg-gray-800 hover:text-blue-400'
  }`;

function Navbar() {
  const { isLoggedIn, isAdmin, member, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // เมนูมือถือเปิดอยู่หรือไม่

  const closeMenu = () => setOpen(false);

  function handleLogout() {
    logout();
    closeMenu();
    navigate('/');
  }

  // กดรายการโปรด: ถ้ายังไม่ได้เข้าสู่ระบบให้ไปหน้า login
  function handleWishlistClick(e) {
    closeMenu();
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0b1019]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:gap-6 lg:px-8 lg:py-4">

        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center gap-2">
          <span className="text-2xl sm:text-3xl">🎮</span>
          <span className="text-lg font-extrabold text-white sm:text-xl">
            GAME<span className="text-blue-500">HUB</span>
          </span>
        </Link>

        {/* เมนูเดสก์ท็อป (จอ >= 1024px) */}
        <div className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
          <NavLink to="/" end className={desktopLink}>หน้าแรก</NavLink>
          <NavLink to="/games" className={desktopLink}>เกม</NavLink>
          <NavLink to="/me/wishlist" className={desktopLink} onClick={handleWishlistClick}>
            รายการโปรด
          </NavLink>
          <NavLink to="/about" className={desktopLink}>เกี่ยวกับเรา</NavLink>
          {isAdmin && <NavLink to="/admin" className={desktopLink}>Admin</NavLink>}
        </div>

        {/* ปุ่มเข้าสู่ระบบ / ผู้ใช้ (เดสก์ท็อป) */}
        <div className="hidden shrink-0 items-center gap-3 text-sm lg:flex">
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
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-white transition hover:border-blue-500 hover:bg-gray-700"
            >
              ♙ เข้าสู่ระบบ
            </Link>
          )}
        </div>

        {/* ปุ่ม ☰ (มือถือ/แท็บเล็ต) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={open}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gray-700 bg-gray-800 text-2xl text-white transition hover:border-blue-500 lg:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* เมนูมือถือ (เลื่อนลงมาใต้แถบด้านบน) */}
      {open && (
        <div className="border-t border-gray-800 bg-[#0b1019] px-4 pb-5 pt-3 lg:hidden">
          <div className="space-y-1">
            <NavLink to="/" end className={mobileLink} onClick={closeMenu}>หน้าแรก</NavLink>
            <NavLink to="/games" className={mobileLink} onClick={closeMenu}>เกม</NavLink>
            <NavLink to="/me/wishlist" className={mobileLink} onClick={handleWishlistClick}>
              รายการโปรด
            </NavLink>
            <NavLink to="/about" className={mobileLink} onClick={closeMenu}>เกี่ยวกับเรา</NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={mobileLink} onClick={closeMenu}>Admin</NavLink>
            )}
          </div>

          <div className="mt-4 border-t border-gray-800 pt-4">
            {isLoggedIn ? (
              <div className="flex items-center justify-between gap-3">
                <Link
                  to="/me/profile"
                  onClick={closeMenu}
                  className="min-w-0 flex-1 truncate rounded-full border border-gray-700 bg-gray-800 px-4 py-2.5 text-gray-200 hover:border-blue-500"
                >
                  ♙ {member?.displayName || 'สมาชิก'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="shrink-0 whitespace-nowrap px-2 py-2 text-gray-400 hover:text-red-400"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block rounded-full border border-gray-700 bg-gray-800 px-4 py-2.5 text-center font-medium text-white transition hover:border-blue-500 hover:bg-gray-700"
              >
                ♙ เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

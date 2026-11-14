import { NavLink, Outlet } from 'react-router-dom';

const tab = ({ isActive }) =>
  'rounded-lg px-3 py-1.5 text-sm transition ' +
  (isActive
    ? 'bg-sky-500 text-white'
    : 'text-slate-300 hover:bg-slate-800 hover:text-white');

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0b111b] text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <h1 className="text-2xl font-extrabold text-white">หลังบ้าน GameHub</h1>
        <nav className="mt-4 flex gap-2 border-b border-slate-700 pb-3">
          <NavLink to="/admin" end className={tab}>ภาพรวม</NavLink>
          <NavLink to="/admin/games" className={tab}>จัดการเกม</NavLink>
          <NavLink to="/admin/members" className={tab}>สมาชิก</NavLink>
        </nav>
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

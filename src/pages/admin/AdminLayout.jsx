import { NavLink, Outlet } from 'react-router-dom';

const tab = ({ isActive }) =>
  'rounded-lg px-3 py-1.5 text-sm transition ' +
  (isActive ? 'bg-sky-500 text-white' : 'text-slate-600 hover:bg-slate-100');

function AdminLayout() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="text-2xl font-semibold text-slate-900">หลังบ้าน GameHub</h1>
      <nav className="mt-4 flex gap-2 border-b border-slate-200 pb-3">
        <NavLink to="/admin" end className={tab}>ภาพรวม</NavLink>
        <NavLink to="/admin/games" className={tab}>จัดการเกม</NavLink>
        <NavLink to="/admin/members" className={tab}>สมาชิก</NavLink>
      </nav>
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
import { useEffect, useState } from 'react';
import { adminMembers, adminSetRole } from '../../api/backend';
import { useAuth } from '../../auth/AuthContext';

function AdminMembers() {
  const { token, member: me } = useAuth();
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let ignore = false;
    adminMembers(token)
      .then(list => { if (!ignore) { setMembers(list); setStatus('success'); } })
      .catch(err => { if (!ignore) { setError(err); setStatus('error'); } });
    return () => { ignore = true; };
  }, [token]);

  async function changeRole(id, role) {
    setMsg('');
    try {
      const updated = await adminSetRole(id, role, token);
      setMembers(list => list.map(m => (m.id === id ? { ...m, role: updated.role } : m)));
    } catch (err) {
      setMsg(err.message);
    }
  }

  if (status === 'loading') return <p className="text-slate-400">กำลังโหลด...</p>;
  if (status === 'error') return <p className="text-red-600">โหลดไม่สำเร็จ: {error.message}</p>;

  return (
    <div>
      {msg && <p className="mb-3 text-sm text-red-600">{msg}</p>}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-2">ชื่อ</th>
              <th className="px-4 py-2">อีเมล</th>
              <th className="px-4 py-2">บทบาท</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map(m => (
              <tr key={m.id}>
                <td className="px-4 py-2 font-medium text-slate-800">{m.displayName}</td>
                <td className="px-4 py-2 text-slate-500">{m.email}</td>
                <td className="px-4 py-2">{m.role}</td>
                <td className="px-4 py-2 text-right">
                  {m.id === me?.id ? (
                    <span className="text-xs text-slate-400">(คุณ)</span>
                  ) : m.role === 'admin' ? (
                    <button onClick={() => changeRole(m.id, 'member')} className="text-rose-600 hover:underline">ลดเป็น member</button>
                  ) : (
                    <button onClick={() => changeRole(m.id, 'admin')} className="text-sky-600 hover:underline">เลื่อนเป็น admin</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMembers;
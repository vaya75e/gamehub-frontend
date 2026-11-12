import { useEffect, useState } from 'react';
import { adminStats } from '../../api/backend';
import { useAuth } from '../../auth/AuthContext';

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    adminStats(token)
      .then(s => { if (!ignore) setStats(s); })
      .catch(err => { if (!ignore) setError(err); });
    return () => { ignore = true; };
  }, [token]);

  if (error) return <p className="text-red-600">โหลดไม่สำเร็จ: {error.message}</p>;
  if (!stats) return <p className="text-slate-400">กำลังโหลด...</p>;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <Stat label="เกมทั้งหมด" value={stats.games} />
        <Stat label="สมาชิก" value={stats.members} />
        <Stat label="แอดมิน" value={stats.admins} />
        <Stat label="โหวต" value={stats.votes} />
        <Stat label="รายการโปรด" value={stats.wishlistItems} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="mb-2 font-semibold text-slate-900">สมาชิกใหม่ล่าสุด</h2>
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
            {stats.newestMembers.map(m => (
              <li key={m.id} className="px-4 py-2 text-sm">
                <span className="font-medium text-slate-800">{m.displayName}</span>
                <span className="ml-2 text-slate-400">{m.email}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-semibold text-slate-900">เกมคะแนนสูงสุด</h2>
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
            {stats.topVoted.length === 0 && <li className="px-4 py-2 text-sm text-slate-400">ยังไม่มีโหวต</li>}
            {stats.topVoted.map(g => (
              <li key={g.id} className="flex justify-between px-4 py-2 text-sm">
                <span className="text-slate-800">{g.title}</span>
                <span className="text-slate-500">⭐ {g.voteAverage} ({g.voteCount})</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
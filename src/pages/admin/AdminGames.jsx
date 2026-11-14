import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGames, adminGetGame, adminDeleteGame } from '../../api/backend';
import { useAuth } from '../../auth/AuthContext';
import { priceText } from '../../components/GameCard';

function AdminGames() {
  const { token } = useAuth();
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let ignore = false;
    getGames()
      .then(list => { if (!ignore) { setGames(list); setStatus('success'); } })
      .catch(err => { if (!ignore) { setError(err); setStatus('error'); } });
    return () => { ignore = true; };
  }, []);

  // ถามก่อนลบ พร้อมบอกว่าข้อมูลสมาชิกจะหายเท่าไร (Impact จาก Backend)
  async function handleDelete(g) {
    try {
      const detail = await adminGetGame(g.id, token);
      const { reviews, votes, wishlist } = detail.impact;
      const ok = window.confirm(
        `ลบ "${g.title}" ?\nรีวิว ${reviews} / โหวต ${votes} / รายการโปรด ${wishlist} ของเกมนี้จะหายไปด้วย`
      );
      if (!ok) return;
      await adminDeleteGame(g.id, token);
      setGames(list => list.filter(x => x.id !== g.id));
      setMsg(`ลบ "${g.title}" แล้ว`);
    } catch (err) {
      setMsg(err.message);
    }
  }

  if (status === 'loading') return <p className="text-slate-400">กำลังโหลด...</p>;
  if (status === 'error') return <p className="text-red-400">โหลดไม่สำเร็จ: {error.message}</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">ทั้งหมด {games.length} เกม</p>
        <Link to="/admin/games/new" className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">
          + เพิ่มเกม
        </Link>
      </div>
      {msg && <p className="mb-3 text-sm text-slate-300">{msg}</p>}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-[#1a2330]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0f1724] text-slate-400">
            <tr>
              <th className="px-4 py-2">ชื่อเกม</th>
              <th className="px-4 py-2">แนว</th>
              <th className="px-4 py-2">ราคา</th>
              <th className="px-4 py-2">ผู้เล่น</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {games.map(g => (
              <tr key={g.id} className="transition hover:bg-slate-800/50">
                <td className="px-4 py-2 font-medium text-slate-100">{g.title}</td>
                <td className="px-4 py-2 text-slate-400">{g.genre ?? '-'}</td>
                <td className="px-4 py-2 text-slate-200">{priceText(g.price)}</td>
                <td className="px-4 py-2 text-slate-400">{g.players ?? '-'}</td>
                <td className="space-x-3 px-4 py-2 text-right">
                  <Link to={`/admin/games/${g.id}/edit`} className="text-sky-400 hover:underline">แก้ไข</Link>
                  <button onClick={() => handleDelete(g)} className="text-rose-400 hover:underline">ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminGames;

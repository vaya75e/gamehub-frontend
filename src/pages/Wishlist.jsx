import { useEffect, useState } from 'react';
import { getWishlist } from '../api/backend';
import GameGrid from '../components/GameGrid';
import { useAuth } from '../auth/AuthContext';

function Wishlist() {
  const { member, token } = useAuth();
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setStatus('loading');
      try {
        const list = await getWishlist(token);
        if (!ignore) { setGames(list); setStatus('success'); }
      } catch (err) {
        if (!ignore) { setError(err); setStatus('error'); }
      }
    }
    if (token) load();
    return () => { ignore = true; };
  }, [token]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="text-2xl font-semibold text-slate-900">รายการโปรดของ {member?.displayName}</h1>
      <p className="mb-6 text-sm text-slate-500">กดปุ่มรายการโปรดในหน้าเกมเพื่อเพิ่มเกมเข้ามาที่นี่</p>
      <GameGrid games={games} status={status} error={error} />
    </div>
  );
}

export default Wishlist;
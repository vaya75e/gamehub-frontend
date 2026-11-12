import { useEffect, useState } from 'react';
import GameGrid from '../components/GameGrid';
import { getGames } from '../api/backend';

function Games() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('all');
  const [players, setPlayers] = useState('all');
  const [sort, setSort] = useState('recommended');

  const [games, setGames] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setStatus('loading');
      try {
        const list = await getGames();
        if (!ignore) { setGames(list); setStatus('success'); }
      } catch (err) {
        if (!ignore) { setError(err); setStatus('error'); }
      }
    }
    load();
    return () => { ignore = true; };
  }, [reloadKey]);

  // ค่าที่คำนวณจาก state ไม่ต้องเป็น state เอง
  const genres = [...new Set(games.map(g => g.genre).filter(Boolean))];
  const playerOptions = [...new Set(games.map(g => g.players).filter(Boolean))];
  const q = query.trim().toLowerCase();

  const shown = games
    .filter(g =>
      (genre === 'all' || g.genre === genre) &&
      (players === 'all' || g.players === players) &&
      (q === '' || g.title.toLowerCase().includes(q)))
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'name') return a.title.localeCompare(b.title);
      return b.rating - a.rating;           // recommended = คะแนนสูงก่อน
    });

  const chipClass = (active) =>
    'rounded-full border px-3 py-1 text-sm transition ' +
    (active ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300 bg-white text-slate-600 hover:bg-sky-50');

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <p className="text-sm font-semibold text-sky-500">GAME COLLECTION</p>
      <h1 className="text-3xl font-bold text-slate-900">ค้นหาเกม</h1>
      <p className="mb-4 text-sm text-slate-500">
        {status === 'success' && `พบ ${shown.length} จาก ${games.length} เกม`}
      </p>

      <input value={query} onChange={(e) => setQuery(e.target.value)}
             placeholder="ค้นหาเกม..."
             className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100" />

      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => setGenre('all')} className={chipClass(genre === 'all')}>ทั้งหมด</button>
        {genres.map(g => (
          <button key={g} onClick={() => setGenre(g)} className={chipClass(genre === g)}>{g}</button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <select value={players} onChange={(e) => setPlayers(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
          <option value="all">จำนวนผู้เล่นทั้งหมด</option>
          {playerOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
          <option value="recommended">เรียงตามแนะนำ</option>
          <option value="price_asc">ราคาต่ำไปสูง</option>
          <option value="price_desc">ราคาสูงไปต่ำ</option>
          <option value="name">ชื่อ ก-ฮ / A-Z</option>
        </select>
      </div>

      <GameGrid games={shown} status={status} error={error}
                onRetry={() => setReloadKey(k => k + 1)} />
    </div>
  );
}

export default Games;
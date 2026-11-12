import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCarousel from '../components/FeaturedCarousel';
import GameGrid from '../components/GameGrid';
import { getGames } from '../api/backend';

function Home() {
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState('loading');
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

  // เกมใหม่ล่าสุด: API เรียงใหม่ก่อนเมื่อไม่มีโหวต แต่เราเรียงตามเลข id มาก -> น้อย ให้ชัดเจน
  const newest = [...games].sort((a, b) => b.id - a.id).slice(0, 4);
  // เกมยอดนิยม: คะแนนสูงก่อน
  const popular = [...games].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const featured = popular.slice(0, 3);

  const retry = () => setReloadKey(k => k + 1);

  return (
    <div>
      <FeaturedCarousel games={featured} />

      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="border-l-4 border-sky-500 pl-3 text-xl font-semibold text-slate-900">เกมใหม่ล่าสุด</h2>
          <Link to="/games" className="text-sm text-sky-600 hover:underline">ดูทั้งหมด →</Link>
        </div>
        <GameGrid games={newest} status={status} error={error} onRetry={retry} />

        <div className="mb-4 mt-12 flex items-center justify-between">
          <h2 className="border-l-4 border-sky-500 pl-3 text-xl font-semibold text-slate-900">เกมยอดนิยม</h2>
          <Link to="/games" className="text-sm text-sky-600 hover:underline">ดูทั้งหมด →</Link>
        </div>
        <GameGrid games={popular} status={status} error={error} onRetry={retry} />
      </div>
    </div>
  );
}

export default Home;
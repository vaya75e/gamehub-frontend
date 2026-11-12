
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { games as allGames } from '../data/data';
import { useAuth } from '../auth/AuthContext';
import GameGrid from '../components/GameGrid';

function Wishlist() {
  const { isLoggedIn, member } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gamehub.favorites') || '[]');
    } catch {
      return [];
    }
  });

  // ลบเกมออกจากรายการโปรด
  function removeFavorite(gameId) {
    const updated = favoriteIds.filter((id) => id !== gameId);

    setFavoriteIds(updated);
    localStorage.setItem('gamehub.favorites', JSON.stringify(updated));
  }

  // เลือกเฉพาะเกมที่อยู่ในรายการโปรด
  const favoriteGames = allGames.filter((game) =>
    favoriteIds.includes(game.id)
  );

  // ต้องเข้าสู่ระบบก่อน
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0b111b] px-4 py-20 text-center text-white">
        <div className="text-5xl text-red-400">♡</div>

        <h1 className="mt-5 text-2xl font-bold">
          กรุณาเข้าสู่ระบบ
        </h1>

        <p className="mt-2 text-slate-400">
          เข้าสู่ระบบก่อนเพื่อดูรายการเกมโปรดของคุณ
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          เข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b111b] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* หัวข้อ */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <span className="mr-2 text-red-400">♥</span>
            รายการโปรด
          </h1>

          <p className="mt-2 text-slate-400">
            เกมที่คุณบันทึกไว้ในรายการโปรด
            {member?.displayName && ` ของ ${member.displayName}`}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            ทั้งหมด {favoriteGames.length} เกม
          </p>
        </div>

        {/* รายการเกม */}
        {favoriteGames.length > 0 ? (
          <div className="space-y-5">
            <GameGrid
              games={favoriteGames}
              status="success"
              error={null}
            />

            <div className="flex flex-wrap gap-3">
              {favoriteGames.map((game) => (
                <button
                  key={game.id}
                  onClick={() => removeFavorite(game.id)}
                  className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  ♥ นำ {game.title} ออกจากรายการโปรด
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-[#1a2330] px-4 py-16 text-center">
            <div className="mb-4 text-5xl text-slate-500">♡</div>

            <h2 className="text-xl font-semibold">
              ยังไม่มีเกมในรายการโปรด
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              ไปเลือกเกมที่คุณชื่นชอบ แล้วกดเพิ่มในรายการโปรดได้เลย
            </p>

            <Link
              to="/games"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              เลือกดูเกม
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;

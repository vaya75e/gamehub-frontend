import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getWishlist } from '../api/backend';
import GameGrid from '../components/GameGrid';

function Wishlist() {
  const { isLoggedIn, member, token } = useAuth();

  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // โหลดรายการโปรดจาก Backend
  const fetchWishlist = useCallback(async () => {
    if (!isLoggedIn || !token) return;

    try {
      setLoading(true);
      setError('');

      const result = await getWishlist(token);

      const items = Array.isArray(result)
        ? result
        : result?.items || result?.wishlist || [];

      const games = items.map((item) => {
        const game = item.game || item;

        return {
          ...game,
          id: game.id ?? item.gameId ?? item.game_id,
          images: {
            cover:
              game.images?.cover ||
              game.image ||
              game.imageUrl ||
              '',
            gallery: game.images?.gallery || [],
          },
          price: game.price ?? 0,
        };
      });

      setFavoriteGames(games);
    } catch (err) {
      setError(err.message || 'ไม่สามารถโหลดรายการโปรดได้');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // ยังไม่ได้เข้าสู่ระบบ
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
    <main className="min-h-screen bg-[#0b111b] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <span className="mr-2 text-red-400">♥</span>
            รายการโปรด
          </h1>

          <p className="mt-2 text-slate-400">
            เกมที่คุณบันทึกไว้ในรายการโปรด
            {member?.displayName && ` ของ ${member.displayName}`}
          </p>

          {!loading && (
            <p className="mt-2 text-sm text-slate-500">
              ทั้งหมด {favoriteGames.length} เกม
            </p>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            กำลังโหลดรายการโปรด...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-10 text-center">
            <p className="text-red-400">{error}</p>

            <button
              onClick={fetchWishlist}
              className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
            >
              ลองอีกครั้ง
            </button>
          </div>
        ) : favoriteGames.length > 0 ? (
          <div className="space-y-6">

            {/* Game Grid */}
            <GameGrid
              games={favoriteGames}
              status="success"
              error={null}
            />

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
    </main>
  );
}

export default Wishlist;
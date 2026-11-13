
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../api/backend';

// แปลงข้อมูลเกมจาก Backend ให้เข้ากับหน้า Home
function normalizeGame(game) {
  return {
    ...game,
    images: {
      cover: game.images?.cover || game.image || '',
      gallery: game.images?.gallery || [],
    },
    downloadLinks: game.downloadLinks || [],
    price: game.price,
    description: game.description || '',
    isFeatured: game.isFeatured ?? false,
    isNew: game.isNew ?? false,
    isPopular: game.isPopular ?? false,
  };
}

// แปลงราคาเกม
function getPrice(game) {
  if (game.downloadLinks?.length) {
    const prices = game.downloadLinks
      .map((item) => Number(item.price))
      .filter((price) => Number.isFinite(price));

    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      return minPrice === 0 ? 'ฟรี' : `฿${minPrice.toLocaleString()}`;
    }
  }

  if (game.price !== undefined && game.price !== null) {
    const price = Number(game.price);

    if (Number.isFinite(price)) {
      return price === 0 ? 'ฟรี' : `฿${price.toLocaleString()}`;
    }
  }

  return 'ไม่ระบุราคา';
}

// Component การ์ดเกม
function GameCard({ game, isNew = false }) {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group overflow-hidden rounded-xl border border-gray-800 bg-[#1a2330] transition duration-300 hover:-translate-y-1 hover:border-blue-500"
    >
      <div className="relative overflow-hidden">
        {game.images?.cover ? (
          <img
            src={game.images.cover}
            alt={game.title}
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-slate-800 text-gray-500">
            ไม่มีรูปภาพ
          </div>
        )}

        {isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
            ใหม่
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="truncate font-semibold text-white">
          {game.title}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-200">
            {getPrice(game)}
          </span>

          <span className="text-xl text-gray-300">♡</span>
        </div>
      </div>
    </Link>
  );
}

// Component หัวข้อ
function SectionTitle({ title }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="border-l-4 border-blue-500 pl-3 text-xl font-bold text-white md:text-2xl">
        {title}
      </h2>

      <Link
        to="/games"
        className="text-sm text-blue-400 hover:text-blue-300"
      >
        ดูทั้งหมด →
      </Link>
    </div>
  );
}

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ดึงข้อมูลเกมจาก Backend
  useEffect(() => {
    let cancelled = false;

    async function fetchGames() {
      try {
        setLoading(true);
        setError('');

        const items = await getGames();

        if (!cancelled) {
          setGames(
            Array.isArray(items)
              ? items.map(normalizeGame)
              : []
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'ไม่สามารถโหลดข้อมูลเกมได้');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchGames();

    return () => {
      cancelled = true;
    };
  }, []);

  // เกมเด่น
  const featured = games.find((game) => game.isFeatured);

  // เกมใหม่ล่าสุด
  const newest = games.filter((game) => game.isNew);

  // เกมยอดนิยม
  const popular = games.filter((game) => game.isPopular);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b111b] text-white">
        กำลังโหลดข้อมูลเกม...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b111b] p-6 text-center text-white">
        <p className="text-lg text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-500"
        >
          ลองอีกครั้ง
        </button>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="min-h-screen bg-[#0b111b] p-10 text-center text-white">
        ยังไม่มีข้อมูลเกม
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b111b] text-white">

      {/* Featured Game */}
      {featured && (
        <section className="relative flex min-h-[420px] items-center overflow-hidden">

          <img
            src={featured.images?.gallery?.[0] || featured.images?.cover}
            alt={featured.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0b111b] via-[#0b111b]/80 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
            <div className="max-w-xl">

              <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold">
                FEATURED GAME
              </span>

              <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">
                {featured.title}
              </h1>

              {featured.description && (
                <p className="mt-4 line-clamp-3 text-gray-300 md:text-lg">
                  {featured.description}
                </p>
              )}

              <Link
                to={`/games/${featured.id}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3 font-semibold transition hover:bg-blue-400"
              >
                ดูรายละเอียด →
              </Link>

            </div>
          </div>
        </section>
      )}

      {/* Game Sections */}
      <div className="mx-auto max-w-7xl space-y-14 px-5 py-12 md:px-10">

        {/* เกมใหม่ล่าสุด */}
        <section>
          <SectionTitle title="เกมใหม่ล่าสุด" />

          {newest.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {newest.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isNew
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">ยังไม่มีเกมใหม่</p>
          )}
        </section>

        {/* เกมยอดนิยม */}
        <section>
          <SectionTitle title="เกมยอดนิยม" />

          {popular.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">ยังไม่มีเกมยอดนิยม</p>
          )}
        </section>

      </div>
    </main>
  );
}

export default Home;

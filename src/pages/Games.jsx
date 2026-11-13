
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../api/backend';

// แปลงข้อมูลเกมจาก Backend ให้หน้าเว็บใช้งานได้
function normalizeGame(game) {
  const genreData =
    game.genres ??
    game.genre ??
    game.genre_names ??
    game.genreNames ??
    [];

  const genres = (
    Array.isArray(genreData) ? genreData : [genreData]
  )
    .flatMap((item) => {
      if (typeof item === 'string') {
        return item.split(',').map((name) => name.trim());
      }

      if (item && typeof item === 'object') {
        const name =
          item.name ??
          item.genre_name ??
          item.genreName ??
          '';

        return name ? [name] : [];
      }

      return [];
    })
    .filter(Boolean);

  // แปลงรูปแบบการเล่นจาก playerModes
  const playerModeData = game.playerModes ?? [];

  const playerModes = (
    Array.isArray(playerModeData)
      ? playerModeData
      : [playerModeData]
  )
    .flatMap((item) => {
      if (typeof item === 'string') {
        return item.split(',').map((name) => name.trim());
      }

      if (item && typeof item === 'object') {
        const name =
          item.name ??
          item.player_mode_name ??
          item.playerModeName ??
          '';

        return name ? [name] : [];
      }

      return [];
    })
    .filter(Boolean);

  return {
    ...game,
    image: game.image || game.images?.cover || '',
    price: Number(game.price ?? 0),
    genre: [...new Set(genres)],
    playerModes: [...new Set(playerModes)],
    players: game.players || '',
  };
}

// แปลงราคาเกม
function getPrice(game) {
  const price = Number(game.price);

  if (!Number.isFinite(price)) return 'ไม่ระบุราคา';

  return price === 0
    ? 'ฟรี'
    : `฿${price.toLocaleString('th-TH')}`;
}

// ใช้สำหรับเรียงราคาตัวเลข
function getNumericPrice(game) {
  const price = Number(game.price);

  return Number.isFinite(price) ? price : Infinity;
}

// การ์ดเกม
function GameCard({ game, isList = false }) {
  return (
    <div
      className={`group overflow-hidden rounded-xl border border-slate-700/70 bg-[#1a2330] transition hover:-translate-y-1 hover:border-sky-500 ${
        isList ? 'flex' : ''
      }`}
    >
      <Link
        to={`/games/${game.id}`}
        className={isList ? 'flex w-full gap-4' : 'block'}
      >
        <div className={`overflow-hidden ${isList ? 'w-36 shrink-0' : ''}`}>
          <img
            src={game.image || '/placeholder-game.png'}
            alt={game.title}
            className={`object-cover transition duration-500 group-hover:scale-105 ${
              isList
                ? 'h-full min-h-36 w-full'
                : 'aspect-[4/3] w-full'
            }`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholder-game.png';
            }}
          />
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 p-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">
              {game.title}
            </h3>

            <p className="mt-1 text-sm text-slate-300">
              {getPrice(game)}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {game.players
                ? `ผู้เล่น ${game.players}`
                : 'ไม่ระบุจำนวนผู้เล่น'}
            </p>
          </div>

          <span className="text-xl text-slate-300 transition hover:text-pink-400">
            ♡
          </span>
        </div>
      </Link>
    </div>
  );
}

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('all');
  const [players, setPlayers] = useState('all');
  const [sort, setSort] = useState('recommended');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);

  const gamesPerPage = 6;

  // ดึงข้อมูลเกมจาก Backend
  useEffect(() => {
    let cancelled = false;

    async function fetchGames() {
      try {
        setLoading(true);
        setError('');

        const items = await getGames();

        if (!cancelled) {
          setGames((items || []).map(normalizeGame));
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

  // ประเภทเกมทั้งหมด
  const genres = [
    ...new Set(
      games.flatMap((game) => game.genre || [])
    ),
  ];

  // ค้นหาและกรองเกม
  const filteredGames = games
    .filter((game) => {
      const matchName = game.title
        ?.toLowerCase()
        .includes(query.trim().toLowerCase());

      const matchGenre =
        genre === 'all' || game.genre?.includes(genre);

      // กรองตามรูปแบบการเล่นจาก playerModes
      const matchPlayers =
        players === 'all' ||
        game.playerModes?.includes(players);

      return matchName && matchGenre && matchPlayers;
    })
    .sort((a, b) => {
      if (sort === 'price_asc') {
        return getNumericPrice(a) - getNumericPrice(b);
      }

      if (sort === 'price_desc') {
        return getNumericPrice(b) - getNumericPrice(a);
      }

      if (sort === 'name') {
        return (a.title || '').localeCompare(b.title || '');
      }

      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    });

  // แบ่งหน้า
  const totalPages = Math.ceil(
    filteredGames.length / gamesPerPage
  );

  // ป้องกันหน้าปัจจุบันเกินจำนวนหน้าหลังกรองข้อมูล
  useEffect(() => {
    if (totalPages === 0 && page !== 1) {
      setPage(1);
    } else if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const shown = filteredGames.slice(
    (page - 1) * gamesPerPage,
    page * gamesPerPage
  );

  // เปลี่ยนตัวกรองแล้วกลับไปหน้าแรก
  function changeFilter(callback, value) {
    callback(value);
    setPage(1);
  }

  // กำลังโหลด
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b111b] px-5 py-20 text-center text-white">
        <p className="text-lg text-slate-300">
          กำลังโหลดข้อมูลเกม...
        </p>
      </main>
    );
  }

  // โหลดข้อมูลไม่สำเร็จ
  if (error) {
    return (
      <main className="min-h-screen bg-[#0b111b] px-5 py-20 text-center text-white">
        <h1 className="text-2xl font-bold">
          ไม่สามารถโหลดเกมได้ 😢
        </h1>

        <p className="mt-3 text-slate-400">
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-sky-500 px-6 py-3 font-semibold text-white hover:bg-sky-400"
        >
          ลองอีกครั้ง
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b111b] text-white">

      {/* ส่วนหัวหน้าเกม */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#172b46] via-[#0b111b] to-[#0b111b]" />
        <div className="absolute right-0 top-0 h-80 w-2/3 bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-12 md:px-10">

          <p className="text-sm font-bold tracking-wider text-sky-400">
            GAME COLLECTION
          </p>

          <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">
            ค้นหาเกม
          </h1>

          <p className="mt-3 text-slate-300 md:text-lg">
            ค้นหาเกมที่เหมาะกับคุณจากเกมหลากหลายประเภท
          </p>

          {/* ช่องค้นหา */}
          <div className="relative mt-8">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-slate-300">
              ⌕
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) =>
                changeFilter(setQuery, e.target.value)
              }
              placeholder="ค้นหาเกม..."
              className="w-full rounded-2xl border border-slate-600 bg-[#1b2432]/90 py-4 pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500"
            />
          </div>

          {/* ตัวกรองเพิ่มเติม */}
          <div className="mt-5 flex flex-wrap gap-3">

            {/* Dropdown ประเภทเกม */}
            <select
              value={genre}
              onChange={(e) =>
                changeFilter(setGenre, e.target.value)
              }
              className="rounded-full border border-slate-700 bg-[#1b2432] px-5 py-3 text-sm text-white outline-none focus:border-sky-500"
            >
              <option value="all">ทุกประเภทเกม</option>

              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            {/* Dropdown รูปแบบการเล่น */}
            <select
              value={players}
              onChange={(e) =>
                changeFilter(setPlayers, e.target.value)
              }
              className="rounded-full border border-slate-700 bg-[#1b2432] px-5 py-3 text-sm text-white outline-none focus:border-sky-500"
            >
              <option value="all">รูปแบบการเล่นทั้งหมด</option>
              <option value="ผู้เล่นคนเดียว">ผู้เล่นคนเดียว</option>
              <option value="ผู้เล่นหลายคน">ผู้เล่นหลายคน</option>
            </select>

            {/* เรียงลำดับ */}
            <select
              value={sort}
              onChange={(e) =>
                changeFilter(setSort, e.target.value)
              }
              className="rounded-full border border-slate-700 bg-[#1b2432] px-5 py-3 text-sm text-white outline-none focus:border-sky-500"
            >
              <option value="recommended">เรียงตามแนะนำ</option>
              <option value="price_asc">ราคาต่ำไปสูง</option>
              <option value="price_desc">ราคาสูงไปต่ำ</option>
              <option value="name">ชื่อ ก-ฮ / A-Z</option>
            </select>

          </div>
        </div>
      </section>

      {/* รายการเกม */}
      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-10">

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            พบ {filteredGames.length} เกม
          </p>

          {/* ปุ่มเปลี่ยนรูปแบบการแสดงผล */}
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              aria-label="แสดงแบบตาราง"
              className={`rounded-lg p-2 text-xl ${
                view === 'grid'
                  ? 'bg-sky-500 text-white'
                  : 'bg-[#1b2432] text-slate-400'
              }`}
            >
              ▦
            </button>

            <button
              onClick={() => setView('list')}
              aria-label="แสดงแบบรายการ"
              className={`rounded-lg p-2 text-xl ${
                view === 'list'
                  ? 'bg-sky-500 text-white'
                  : 'bg-[#1b2432] text-slate-400'
              }`}
            >
              ☷
            </button>
          </div>
        </div>

        {shown.length > 0 ? (
          <div
            className={
              view === 'grid'
                ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col gap-4'
            }
          >
            {shown.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isList={view === 'list'}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-[#1a2330] py-16 text-center">
            <p className="text-lg font-semibold text-white">
              {games.length === 0
                ? 'ยังไม่มีข้อมูลเกม'
                : 'ไม่พบเกมที่ค้นหา'}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              ลองเปลี่ยนคำค้นหาหรือตัวกรองเกมดูนะ
            </p>

            <button
              onClick={() => {
                setQuery('');
                setGenre('all');
                setPlayers('all');
                setSort('recommended');
                setPage(1);
              }}
              className="mt-5 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-400"
            >
              ล้างตัวกรอง
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg bg-[#1b2432] px-4 py-2 text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((number) => (
              <button
                key={number}
                onClick={() => setPage(number)}
                className={`rounded-lg px-4 py-2 transition ${
                  page === number
                    ? 'bg-sky-500 text-white'
                    : 'border border-slate-700 bg-[#1b2432] text-slate-300 hover:bg-slate-700'
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={page === totalPages}
              className="rounded-lg bg-[#1b2432] px-4 py-2 text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>

          </div>
        )}

      </section>
    </main>
  );
}

export default Games;

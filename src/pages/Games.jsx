
import { useState } from 'react';
import { games } from '../data/data';

// แปลงราคาเกม
function getPrice(game) {
  const prices = game.downloadLinks
    ?.map((item) => item.price)
    .filter((price) => typeof price === 'number');

  if (!prices?.length) return 'ไม่ระบุราคา';

  const minPrice = Math.min(...prices);

  return minPrice === 0
    ? 'ฟรี'
    : `฿${minPrice.toLocaleString()}`;
}

// ใช้สำหรับเรียงราคาตัวเลข
function getNumericPrice(game) {
  const prices = game.downloadLinks
    ?.map((item) => item.price)
    .filter((price) => typeof price === 'number');

  return prices?.length ? Math.min(...prices) : Infinity;
}

// การ์ดเกม
function GameCard({ game, isList = false }) {
  return (
    <div
      className={`group overflow-hidden rounded-xl border border-slate-700/70 bg-[#1a2330] transition hover:-translate-y-1 hover:border-sky-500 ${
        isList ? 'flex' : ''
      }`}
    >
      <a
        href={`/games/${game.id}`}
        className={isList ? 'flex w-full gap-4' : 'block'}
      >
        <div className={`overflow-hidden ${isList ? 'w-36 shrink-0' : ''}`}>
          <img
            src={game.images?.cover}
            alt={game.title}
            className={`object-cover transition duration-500 group-hover:scale-105 ${
              isList
                ? 'h-full min-h-36 w-full'
                : 'aspect-[4/3] w-full'
            }`}
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
          </div>

          <span className="text-xl text-slate-300 transition hover:text-pink-400">
            ♡
          </span>
        </div>
      </a>
    </div>
  );
}

function Games() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('all');
  const [players, setPlayers] = useState('all');
  const [sort, setSort] = useState('recommended');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);

  const gamesPerPage = 6;

  // ประเภทเกมทั้งหมด
  const genres = [
    ...new Set(games.flatMap((game) => game.genre || [])),
  ];

  // จำนวนผู้เล่นทั้งหมด
  const playerOptions = [
    ...new Set(games.map((game) => game.players).filter(Boolean)),
  ];

  // ค้นหาและกรองเกม
  const filteredGames = games
    .filter((game) => {
      const matchName = game.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      const matchGenre =
        genre === 'all' || game.genre?.includes(genre);

      const matchPlayers =
        players === 'all' || game.players === players;

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
        return a.title.localeCompare(b.title);
      }

      return (b.rating || 0) - (a.rating || 0);
    });

  // แบ่งหน้า
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const shown = filteredGames.slice(
    (page - 1) * gamesPerPage,
    page * gamesPerPage
  );

  // เปลี่ยนตัวกรองแล้วกลับไปหน้าแรก
  function changeFilter(callback, value) {
    callback(value);
    setPage(1);
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

          {/* ประเภทเกม */}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => changeFilter(setGenre, 'all')}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
                genre === 'all'
                  ? 'bg-sky-500 text-white'
                  : 'bg-[#1b2432] text-slate-200 hover:bg-slate-700'
              }`}
            >
              ทั้งหมด
            </button>

            {genres.map((g) => (
              <button
                key={g}
                onClick={() => changeFilter(setGenre, g)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
                  genre === g
                    ? 'bg-sky-500 text-white'
                    : 'bg-[#1b2432] text-slate-200 hover:bg-slate-700'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* ตัวกรองเพิ่มเติม */}
          <div className="mt-5 flex flex-wrap gap-3">

            <select
              value={players}
              onChange={(e) =>
                changeFilter(setPlayers, e.target.value)
              }
              className="rounded-full border border-slate-700 bg-[#1b2432] px-5 py-3 text-sm text-white outline-none focus:border-sky-500"
            >
              <option value="all">จำนวนผู้เล่นทั้งหมด</option>

              {playerOptions.map((p) => (
                <option key={p} value={p}>
                  {p} คน
                </option>
              ))}
            </select>

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
              ไม่พบเกมที่ค้นหา
            </p>
            <p className="mt-2 text-sm text-slate-400">
              ลองเปลี่ยนคำค้นหาหรือตัวกรองเกมดูนะ
            </p>
            <button
              onClick={() => {
                setQuery('');
                setGenre('all');
                setPlayers('all');
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

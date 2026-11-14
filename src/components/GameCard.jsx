
import { Link } from 'react-router-dom';

// แปลงราคาเกม
export const priceText = (game) => {
  const prices = game.downloadLinks
    ?.map((item) => Number(item.price))
    .filter((price) => Number.isFinite(price));

  // ถ้าไม่มี downloadLinks ให้ใช้ราคาจาก Backend
  if (!prices?.length) {
    if (game.price !== undefined && game.price !== null) {
      const price = Number(game.price);

      if (Number.isFinite(price)) {
        return price === 0 ? 'ฟรี' : `฿${price.toLocaleString()}`;
      }
    }

    return 'ไม่ระบุราคา';
  }

  const minPrice = Math.min(...prices);

  return minPrice === 0
    ? 'ฟรี'
    : `฿${minPrice.toLocaleString()}`;
};

// รองรับ genre ทั้ง String และ Array
const getGenreText = (genre) => {
  if (Array.isArray(genre)) {
    return genre.join(', ') || 'ไม่ระบุแนว';
  }

  if (typeof genre === 'string') {
    return genre || 'ไม่ระบุแนว';
  }

  return 'ไม่ระบุแนว';
};

// favorite / onToggleFavorite เป็นตัวเลือก: ถ้าหน้าไหนไม่ส่งมา จะไม่แสดงปุ่มหัวใจ (หน้าเดิมไม่พัง)
function GameCard({ game, favorite = false, onToggleFavorite }) {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group block overflow-hidden rounded-xl border border-slate-700 bg-[#1a2330] transition hover:-translate-y-1 hover:border-sky-500"
    >
      <div className="relative">
        {game.images?.cover ? (
          <img
            src={game.images.cover}
            alt={`รูปเกม ${game.title}`}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <div className="grid aspect-[4/3] w-full place-items-center bg-slate-800 text-4xl">
            🎮
          </div>
        )}

        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault(); // ไม่ให้เปิดหน้ารายละเอียดเกม
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
            aria-label="รายการโปรด"
            className={`absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-xl transition hover:bg-black/70 ${
              favorite ? 'text-red-500' : 'text-white hover:text-red-400'
            }`}
          >
            {favorite ? '♥' : '♡'}
          </button>
        )}
      </div>

      <div className="p-3">
        <h3
          className="truncate font-semibold text-white"
          title={game.title}
        >
          {game.title}
        </h3>

        <p className="truncate text-sm text-slate-400">
          {getGenreText(game.genre)}
          {' | '}
          {game.players || '-'} ผู้เล่น
        </p>

        <p className="mt-2 text-sm font-semibold text-sky-400">
          {priceText(game)}

          {Number(game.rating) > 0 && (
            <span className="ml-2 text-xs text-slate-400">
              ⭐ {game.rating}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

export default GameCard;

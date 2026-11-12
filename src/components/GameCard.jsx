import { Link } from 'react-router-dom';

export const priceText = (p) => (p === 0 ? 'ฟรี' : `฿${Number(p).toLocaleString()}`);

function GameCard({ game }) {
  return (
    <Link to={`/games/${game.id}`}
          className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-sky-300 hover:shadow-md">
      {game.image ? (
        <img src={game.image} alt={`รูปเกม ${game.title}`} loading="lazy"
             className="aspect-[2/3] w-full object-cover" />
      ) : (
        <div className="grid aspect-[2/3] w-full place-items-center bg-slate-100 text-4xl">🎮</div>
      )}
      <div className="p-3">
        <h3 className="truncate font-medium text-slate-900" title={game.title}>{game.title}</h3>
        <p className="truncate text-sm text-slate-500">{game.genre ?? 'ไม่ระบุแนว'} | {game.players ?? '-'} ผู้เล่น</p>
        <p className="mt-1 text-sm font-semibold text-sky-600">
          {priceText(game.price)}{game.rating > 0 && <span className="ml-2 text-xs text-slate-400">⭐ {game.rating}</span>}
        </p>
      </div>
    </Link>
  );
}

export default GameCard;
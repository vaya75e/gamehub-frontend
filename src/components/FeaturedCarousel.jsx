import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FeaturedCarousel({ games = [] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (games.length < 2) return;
    const t = setInterval(() => setI(n => (n + 1) % games.length), 5000);
    return () => clearInterval(t);
  }, [games.length]);

  if (games.length === 0) return null;
  const g = games[i % games.length];

  return (
    <section className="relative overflow-hidden bg-slate-900">
      {g.image && (
        <img src={g.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      )}
      <div className="relative mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">FEATURED GAME</span>
        <h1 className="mt-4 text-4xl font-extrabold text-white md:text-6xl">{g.title}</h1>
        <p className="mt-3 max-w-xl text-slate-300">
          {g.genre ?? ''} {g.players ? `| ${g.players} ผู้เล่น` : ''}
        </p>
        <Link to={`/games/${g.id}`}
              className="mt-6 inline-block rounded-lg bg-sky-500 px-5 py-2 font-medium text-white hover:bg-sky-600">
          ดูรายละเอียด →
        </Link>
        <div className="mt-8 flex gap-2">
          {games.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`สไลด์ ${n + 1}`}
                    className={'h-2 rounded-full transition-all ' + (n === i % games.length ? 'w-6 bg-sky-500' : 'w-2 bg-slate-500')} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCarousel;
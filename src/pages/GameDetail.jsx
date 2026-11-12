import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import GameActions from '../components/GameActions';
import { priceText } from '../components/GameCard';
import { getGame, getReviews, postReview } from '../api/backend';
import { useAuth } from '../auth/AuthContext';

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { token, member, isLoggedIn } = useAuth();

  useEffect(() => {
    let ignore = false;
    async function load() {
      setStatus('loading');
      try {
        const g = await getGame(id);
        if (!ignore) { setGame(g); setStatus('success'); }
      } catch (err) {
        if (!ignore) { setError(err); setStatus('error'); }
      }
    }
    load();
    return () => { ignore = true; };
  }, [id]);

  // รีวิวแยก effect: ถ้ารีวิวล่ม หน้าเกมยังดูได้
  useEffect(() => {
    let ignore = false;
    getReviews(id)
      .then(items => { if (!ignore) setReviews(items); })
      .catch(() => { if (!ignore) setReviews([]); });
    return () => { ignore = true; };
  }, [id]);

  async function handleReviewSubmit(text) {
    const saved = await postReview(id, text, token);
    // 1 คนรีวิวได้ 1 ครั้ง: เขียนซ้ำ = แก้ของเดิม จึงเอาของเก่าของเราออกก่อน
    setReviews([saved, ...reviews.filter(r => r.memberId !== member.id)]);
  }

  // หลังโหวต ดึงคะแนนเฉลี่ยใหม่มาแสดง
  function handleVoted(res) {
    setGame(g => ({ ...g, rating: res.voteAverage }));
  }

  if (status === 'loading') {
    return <div className="mx-auto max-w-4xl px-4 py-10 text-slate-400">กำลังโหลด...</div>;
  }

  if (status === 'error') {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-lg text-slate-700">ไม่พบเกมนี้ 😢</p>
        <p className="text-sm text-slate-400">{error.message}</p>
        <Link to="/games" className="mt-6 inline-block text-sm text-sky-600 hover:underline">กลับไปหน้าเกมทั้งหมด</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <Link to="/games" className="text-sm text-slate-500 hover:text-sky-600">← กลับไปหน้าเกมทั้งหมด</Link>

      <div className="mt-4 flex flex-col gap-8 md:flex-row">
        {game.image ? (
          <img src={game.image} alt={`รูปเกม ${game.title}`}
               className="w-48 shrink-0 self-start rounded-xl border border-slate-200" />
        ) : (
          <div className="grid aspect-[2/3] w-48 shrink-0 place-items-center rounded-xl bg-slate-100 text-5xl">🎮</div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">{game.title}</h1>
          <p className="mt-2 text-xl font-bold text-sky-600">{priceText(game.price)}</p>

          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-slate-600">
            <dt className="text-slate-400">แนวเกม</dt><dd>{game.genre ?? '-'}</dd>
            <dt className="text-slate-400">จำนวนผู้เล่น</dt><dd>{game.players ?? '-'}</dd>
            <dt className="text-slate-400">แพลตฟอร์ม</dt><dd>{game.platform ?? '-'}</dd>
            <dt className="text-slate-400">คะแนนสมาชิก</dt><dd>{game.rating > 0 ? `⭐ ${game.rating}` : 'ยังไม่มีคะแนน'}</dd>
          </dl>

          <p className="mt-4 leading-relaxed text-slate-700">{game.description}</p>

          {game.downloadUrl && (
            <a href={game.downloadUrl} target="_blank" rel="noopener noreferrer"
               className="mt-5 inline-block rounded-lg bg-sky-500 px-5 py-2 font-medium text-white hover:bg-sky-600">
              ดาวน์โหลด / ซื้อเกม ({game.platform ?? 'ลิงก์'})
            </a>
          )}

          <GameActions gameId={game.id} onVoted={handleVoted} />

          <div className="mt-8">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">รีวิวจากสมาชิก ({reviews.length})</h2>
            <ReviewList items={reviews} />
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            {isLoggedIn ? (
              <ReviewForm key={game.id} movieTitle={game.title} onSubmit={handleReviewSubmit} />
            ) : (
              <p className="text-sm text-slate-500">
                <Link to="/login" className="text-sky-600 hover:underline">เข้าสู่ระบบ</Link> เพื่อเขียนรีวิว
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
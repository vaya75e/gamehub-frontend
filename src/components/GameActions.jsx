import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getWishlist, addToWishlist, removeFromWishlist, putVote } from '../api/backend';

function GameActions({ gameId, onVoted }) {
  const { token, isLoggedIn } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);
  const [score, setScore] = useState(8);
  const [msg, setMsg] = useState('');

  // เช็กว่าเกมนี้อยู่ใน wishlist ของเราไหม
  useEffect(() => {
    if (!token) return;
    let ignore = false;
    getWishlist(token)
      .then(list => { if (!ignore) setInWishlist(list.some(g => String(g.id) === String(gameId))); })
      .catch(() => {});
    return () => { ignore = true; };
  }, [token, gameId]);

  async function toggleWishlist() {
    try {
      if (inWishlist) await removeFromWishlist(gameId, token);
      else await addToWishlist(gameId, token);
      setInWishlist(!inWishlist);
    } catch (err) {
      setMsg(err.message);
    }
  }

  async function vote() {
    try {
      const res = await putVote(gameId, Number(score), token);
      setMsg(`โหวตแล้ว! คะแนนเฉลี่ยตอนนี้ ${res.voteAverage} (${res.voteCount} โหวต)`);
      if (onVoted) onVoted(res);
    } catch (err) {
      setMsg(err.message);
    }
  }

  if (!isLoggedIn) {
    return (
      <p className="mt-6 text-sm text-slate-500">
        <Link to="/login" className="text-sky-600 hover:underline">เข้าสู่ระบบ</Link> เพื่อเพิ่มรายการโปรดและโหวตคะแนน
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <button onClick={toggleWishlist}
              className={'rounded-lg border px-4 py-2 text-sm transition ' +
                (inWishlist ? 'border-rose-400 bg-rose-50 text-rose-600' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50')}>
        {inWishlist ? '♥ อยู่ในรายการโปรดแล้ว (กดเพื่อเอาออก)' : '♡ เพิ่มในรายการโปรด'}
      </button>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-600">ให้คะแนน</span>
        <select value={score} onChange={(e) => setScore(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span className="text-slate-400">/ 10</span>
        <button onClick={vote} className="rounded-lg bg-sky-500 px-3 py-1 text-white hover:bg-sky-600">โหวต</button>
      </div>

      {msg && <p className="text-sm text-slate-500">{msg}</p>}
    </div>
  );
}

export default GameActions;
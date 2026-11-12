
import { useState } from 'react';

function ReviewForm({ gameTitle, onSubmit }) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();

    if (review.trim().length < 10) {
      setError('กรุณาเขียนรีวิวอย่างน้อย 10 ตัวอักษร');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      await onSubmit(review.trim(), rating);
      setReview('');
      setRating(5);
      setStatus('typing');
    } catch (err) {
      setStatus('typing');
      setError(err.message || 'ไม่สามารถส่งรีวิวได้');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <h3 className="text-lg font-bold text-white">
          เขียนรีวิว {gameTitle}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          คุณรู้สึกอย่างไรกับเกมนี้?
        </p>
      </div>

      {/* เลือกคะแนนดาว */}
      <div>
        <p className="mb-2 text-sm font-medium text-slate-300">
          ให้คะแนนเกม
        </p>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl transition hover:scale-110"
              aria-label={`ให้คะแนน ${star} ดาว`}
            >
              <span
                className={
                  star <= (hoverRating || rating)
                    ? 'text-yellow-400'
                    : 'text-slate-600'
                }
              >
                ★
              </span>
            </button>
          ))}

          <span className="ml-2 text-sm text-slate-400">
            {rating}/5
          </span>
        </div>
      </div>

      {/* ข้อความรีวิว */}
      <div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          disabled={status === 'submitting'}
          rows={4}
          maxLength={1000}
          placeholder="เขียนความคิดเห็นของคุณเกี่ยวกับเกมนี้..."
          className="w-full resize-none rounded-xl border border-slate-600 bg-[#0b111b] px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:opacity-50"
        />

        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>อย่างน้อย 10 ตัวอักษร</span>
          <span>{review.length}/1000</span>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={
          review.trim().length < 10 ||
          status === 'submitting'
        }
        className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === 'submitting' ? 'กำลังส่ง...' : 'ส่งรีวิว'}
      </button>

    </form>
  );
}

export default ReviewForm;

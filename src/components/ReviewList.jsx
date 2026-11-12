
function ReviewList({ items = [] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-[#1a2330]/50 px-5 py-12 text-center">
        <p className="text-4xl">💬</p>

        <p className="mt-4 font-semibold text-white">
          ยังไม่มีรีวิว
        </p>

        <p className="mt-2 text-sm text-slate-400">
          มาเป็นคนแรกที่รีวิวเกมนี้กันเถอะ!
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((r) => (
        <li
          key={r.id}
          className="rounded-xl border border-slate-700 bg-[#1a2330] p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 font-bold text-sky-400">
                {(r.member?.displayName || 'ผู้เล่น').charAt(0)}
              </div>

              <div>
                <p className="font-semibold text-white">
                  {r.member?.displayName || 'ผู้เล่น'}
                </p>

                <p className="text-xs text-slate-500">
                  {new Date(r.createdAt).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* คะแนนดาว */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    star <= r.score
                      ? 'text-yellow-400'
                      : 'text-slate-600'
                  }
                >
                  ★
                </span>
              ))}

              <span className="ml-1 text-sm text-slate-400">
                {r.score}/5
              </span>
            </div>
          </div>

          <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-300">
            {r.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;


import { useAuth } from '../auth/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getGame,
  getReviews,
  postReview,
  putVote,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../api/backend';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

// แปลงราคาเกม
function getPrice(game) {
  const prices = game.downloadLinks
    ?.map((item) => Number(item.price))
    .filter((price) => Number.isFinite(price));

  if (!prices?.length) return 'ไม่ระบุราคา';

  const minPrice = Math.min(...prices);

  return minPrice === 0
    ? 'ฟรี'
    : `฿${minPrice.toLocaleString()}`;
}

// แปลงข้อมูลจาก Backend ให้ตรงกับรูปแบบที่หน้าเว็บใช้งาน
function normalizeGame(response) {
  const data =
    response?.item ??
    response?.game ??
    response?.data ??
    response;

  if (!data) return null;

  const images = data.images ?? {};

  const genreData = data.genre ?? data.genres ?? [];
  const playerData =
    data.type_player ?? data.typePlayer ?? [];

  return {
    ...data,

    images: {
      cover:
        images.cover ??
        data.cover ??
        data.image ??
        data.image_url ??
        '',
      gallery:
        images.gallery ??
        data.gallery ??
        [],
    },

    downloadLinks:
      data.downloadLinks ??
      data.download_links ??
      [],

    genre: Array.isArray(genreData)
      ? genreData
      : genreData
        ? [genreData]
        : [],

    type_player: Array.isArray(playerData)
      ? playerData
      : playerData
        ? [playerData]
        : [],

    isNew: data.isNew ?? data.is_new ?? false,
    isPopular: data.isPopular ?? data.is_popular ?? false,
    isFeatured: data.isFeatured ?? data.is_featured ?? false,
  };
}

function GameDetail() {
  const { id } = useParams();
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  // ข้อมูลเกมจาก Backend
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ดึงข้อมูลเกมตาม ID
  useEffect(() => {
    let cancelled = false;

    async function fetchGame() {
      try {
        setLoading(true);
        setError('');
        setGame(null);

        const response = await getGame(id);
        const gameData = normalizeGame(response);

        if (!cancelled) {
          if (!gameData) {
            setError('ไม่พบข้อมูลเกมนี้');
          } else {
            setGame(gameData);
          }
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

    fetchGame();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // รูปภาพ
  const [activeImageIndex, setActiveImageIndex] = useState(-1);
  const [galleryPage, setGalleryPage] = useState(0);
  const galleryRef = useRef(null);

  const galleryImages = game?.images?.gallery || [];
  const totalPages = Math.ceil((galleryImages.length + 1) / 3);

  // เมื่อเปลี่ยนเกม ให้กลับไปแสดงรูปปก
  useEffect(() => {
    setActiveImageIndex(-1);
    setGalleryPage(0);
  }, [id]);

  // =========================
  // รีวิวจาก Backend
  // =========================

  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);

  // ดึงรีวิวจาก Backend
  async function fetchReviews() {
    try {
      setReviewLoading(true);

      // getReviews คืนค่าเป็น Array อยู่แล้ว
      const items = await getReviews(id);

      setReviews(
        (Array.isArray(items) ? items : []).map((review) => ({
          ...review,
          member: {
            ...review.member,
            displayName:
              review.member?.displayName || 'สมาชิก',
          },
          score:
            review.score == null
              ? 0
              : Number(review.score),
        }))
      );
    } catch (err) {
      console.error('โหลดรีวิวไม่สำเร็จ:', err);
      setReviews([]);
    } finally {
      setReviewLoading(false);
    }
  }

  // โหลดรีวิวเมื่อเปลี่ยนเกม
  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      try {
        setReviewLoading(true);

        // getReviews คืนค่าเป็น Array ไม่ใช่ { items: [...] }
        const items = await getReviews(id);

        if (!cancelled) {
          setReviews(
            (Array.isArray(items) ? items : []).map((review) => ({
              ...review,
              member: {
                ...review.member,
                displayName:
                  review.member?.displayName || 'สมาชิก',
              },
              score:
                review.score == null
                  ? 0
                  : Number(review.score),
            }))
          );
        }
      } catch (err) {
        console.error('โหลดรีวิวไม่สำเร็จ:', err);

        if (!cancelled) {
          setReviews([]);
        }
      } finally {
        if (!cancelled) {
          setReviewLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // คำนวณคะแนนเฉลี่ย
  const ratedReviews = reviews.filter(
    (review) => review.score > 0
  );

  const averageRating = ratedReviews.length > 0
    ? (
        ratedReviews.reduce(
          (total, review) => total + review.score,
          0
        ) / ratedReviews.length
      ).toFixed(1)
    : '0.0';

  // จำนวนรีวิว
  const reviewCount = reviews.length;

  // เพิ่มรีวิวและบันทึกคะแนนลง Backend
  async function handleAddReview(text, score) {
    if (!isLoggedIn || !token) {
      throw new Error('กรุณาเข้าสู่ระบบก่อนเขียนรีวิว');
    }

    // บันทึกข้อความรีวิว
    await postReview(id, text, token);

    // บันทึกคะแนนดาว
    if (score != null && Number(score) > 0) {
      await putVote(id, Number(score), token);
    }

    // โหลดรีวิวใหม่หลังบันทึก
    await fetchReviews();
  }

  // =========================
  // รายการโปรดจาก Backend
  // =========================

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // ดึงรายการโปรดของสมาชิก
  useEffect(() => {
    let cancelled = false;

    async function fetchWishlist() {
      if (!isLoggedIn || !token) {
        setFavoriteIds([]);
        return;
      }

      try {
        // getWishlist คืนค่าเป็น Array อยู่แล้ว
        const items = await getWishlist(token);

        if (!cancelled) {
          setFavoriteIds(
            (Array.isArray(items) ? items : []).map((item) =>
              Number(
                item.gameId ??
                item.game_id ??
                item.game?.id ??
                item.id
              )
            )
          );
        }
      } catch (err) {
        console.error('โหลดรายการโปรดไม่สำเร็จ:', err);

        if (!cancelled) {
          setFavoriteIds([]);
        }
      }
    }

    fetchWishlist();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, token]);

  const isFavorite = favoriteIds.includes(Number(game?.id));

  // เพิ่ม / ลบรายการโปรดผ่าน Backend
  async function toggleFavorite() {
    if (!isLoggedIn || !token) {
      navigate('/login');
      return;
    }

    if (favoriteLoading || !game) return;

    try {
      setFavoriteLoading(true);

      if (isFavorite) {
        await removeFromWishlist(game.id, token);

        setFavoriteIds((prev) =>
          prev.filter(
            (favoriteId) =>
              favoriteId !== Number(game.id)
          )
        );
      } else {
        await addToWishlist(game.id, token);

        setFavoriteIds((prev) =>
          [...new Set([...prev, Number(game.id)])]
        );
      }
    } catch (err) {
      alert(err.message || 'ไม่สามารถแก้ไขรายการโปรดได้');
    } finally {
      setFavoriteLoading(false);
    }
  }

  // เลื่อนแถบรูปภาพ
  function scrollGallery(direction) {
    const gallery = galleryRef.current;
    if (!gallery) return;

    gallery.scrollBy({
      left: direction * gallery.clientWidth,
      behavior: 'smooth',
    });
  }

  // ตรวจจับตำแหน่งการเลื่อน
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    function handleScroll() {
      if (!gallery.clientWidth) return;

      const page = Math.round(
        gallery.scrollLeft / gallery.clientWidth
      );

      setGalleryPage(
        Math.min(Math.max(page, 0), totalPages - 1)
      );
    }

    gallery.addEventListener('scroll', handleScroll);

    return () => {
      gallery.removeEventListener('scroll', handleScroll);
    };
  }, [totalPages]);

  // กำลังโหลดข้อมูลเกม
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b111b] px-5 py-20 text-center text-white">
        <p className="text-lg text-slate-300">
          กำลังโหลดข้อมูลเกม...
        </p>
      </main>
    );
  }

  // ไม่พบเกมหรือโหลดข้อมูลไม่สำเร็จ
  if (error || !game) {
    return (
      <main className="min-h-screen bg-[#0b111b] px-5 py-20 text-center text-white">
        <h1 className="text-2xl font-bold">
          ไม่พบเกมนี้ 😢
        </h1>

        <p className="mt-3 text-slate-400">
          {error || 'ขออภัย ไม่พบข้อมูลเกมที่คุณต้องการ'}
        </p>

        <Link
          to="/games"
          className="mt-6 inline-block rounded-full bg-sky-500 px-6 py-3 font-semibold text-white hover:bg-sky-400"
        >
          กลับไปหน้าเกมทั้งหมด
        </Link>
      </main>
    );
  }

  // รูปที่จะแสดงในพื้นที่รูปใหญ่
  const activeImage =
    activeImageIndex === -1
      ? game.images?.cover
      : galleryImages[activeImageIndex];

  return (
    <main className="min-h-screen bg-[#0b111b] text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-10">

        <Link
          to="/games"
          className="text-sm text-slate-400 transition hover:text-sky-400"
        >
          ← กลับไปหน้าเกมทั้งหมด
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.2fr]">

          {/* รูปเกม */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#1a2330] shadow-xl">
              <img
                src={activeImage || game.images?.cover}
                alt={game.title}
                className="aspect-video w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = game.images?.cover || '';
                }}
              />
            </div>

            {/* รูปภาพเพิ่มเติม */}
            {galleryImages.length > 0 && (
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    ภาพเพิ่มเติม
                  </h2>

                  <span className="text-xs text-slate-400">
                    {galleryImages.length + 1} รูป
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollGallery(-1)}
                    disabled={galleryPage === 0}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white transition hover:border-sky-400 hover:bg-sky-500 disabled:opacity-30"
                  >
                    ‹
                  </button>

                  <div
                    ref={galleryRef}
                    className="flex min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {/* รูปปก */}
                    <button
                      type="button"
                      onClick={() => setActiveImageIndex(-1)}
                      className={`w-[calc((100%-24px)/3)] shrink-0 snap-start overflow-hidden rounded-xl border-2 transition ${
                        activeImageIndex === -1
                          ? 'border-sky-400 shadow-lg shadow-sky-500/20'
                          : 'border-white/10 hover:border-sky-400'
                      }`}
                    >
                      <img
                        src={game.images?.cover}
                        alt="รูปปกเกม"
                        className="aspect-video w-full object-cover"
                      />
                    </button>

                    {/* รูปเพิ่มเติม */}
                    {galleryImages.map((image, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-[calc((100%-24px)/3)] shrink-0 snap-start overflow-hidden rounded-xl border-2 transition ${
                          activeImageIndex === index
                            ? 'border-sky-400 shadow-lg shadow-sky-500/20'
                            : 'border-white/10 hover:border-sky-400'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`ภาพที่ ${index + 1}`}
                          className="aspect-video w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollGallery(1)}
                    disabled={galleryPage >= totalPages - 1}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white transition hover:border-sky-400 hover:bg-sky-500 disabled:opacity-30"
                  >
                    ›
                  </button>
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 flex justify-center gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          galleryRef.current?.scrollTo({
                            left: index * galleryRef.current.clientWidth,
                            behavior: 'smooth',
                          });
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          galleryPage === index
                            ? 'w-7 bg-sky-400'
                            : 'w-2 bg-slate-600 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* รายละเอียดเกม */}
          <div>
            <div className="flex flex-wrap gap-2">
              {game.isNew && (
                <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-400">
                  NEW
                </span>
              )}

              {game.isPopular && (
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
                  POPULAR
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">
              {game.title}
            </h1>

            <p className="mt-4 text-2xl font-bold text-sky-400">
              {getPrice(game)}
            </p>

            {/* ข้อมูลพื้นฐาน */}
            <div className="mt-6 rounded-xl border border-slate-700 bg-[#1a2330] p-5">
              <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-4 text-sm">

                <dt className="text-slate-400">แนวเกม</dt>
                <dd className="flex flex-wrap gap-2">
                  {game.genre.length > 0
                    ? game.genre.map((item, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-slate-700 px-3 py-1 text-slate-200"
                        >
                          {item}
                        </span>
                      ))
                    : '-'}
                </dd>

                <dt className="text-slate-400">จำนวนผู้เล่น</dt>
                <dd>{game.players || '-'}</dd>

                <dt className="text-slate-400">รูปแบบการเล่น</dt>
                <dd>{game.type_player.join(', ') || '-'}</dd>

              </dl>
            </div>

            {/* คำอธิบาย */}
            <section className="mt-7">
              <h2 className="text-xl font-bold">
                เกี่ยวกับเกม
              </h2>

              <p className="mt-3 leading-8 text-slate-300">
                {game.description || 'ยังไม่มีรายละเอียดเกม'}
              </p>
            </section>

            {/* ปุ่มรายการโปรด */}
            <button
              type="button"
              onClick={toggleFavorite}
              disabled={favoriteLoading}
              className={`mt-6 flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition disabled:cursor-wait disabled:opacity-50 ${
                isFavorite
                  ? 'border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'border-slate-600 bg-[#1a2330] text-white hover:border-red-400 hover:text-red-400'
              }`}
            >
              <span className="text-xl">
                {isFavorite ? '♥' : '♡'}
              </span>

              {favoriteLoading
                ? 'กำลังบันทึก...'
                : isFavorite
                  ? 'อยู่ในรายการโปรดแล้ว'
                  : 'เพิ่มในรายการโปรด'}
            </button>

            {/* ช่องทางซื้อเกม */}
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-bold">
                ช่องทางซื้อเกม
              </h2>

              <div className="space-y-3">
                {game.downloadLinks?.length > 0 ? (
                  game.downloadLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-slate-700 bg-[#1a2330] p-4 transition hover:border-sky-500"
                    >
                      <div>
                        <p className="font-semibold text-white">
                          {item.platform}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {Number(item.price) === 0
                            ? 'ฟรี'
                            : `฿${Number(item.price).toLocaleString()}`}
                        </p>
                      </div>

                      <span className="text-sky-400">
                        ไปยังร้านค้า →
                      </span>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    ยังไม่มีช่องทางซื้อเกม
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* รีวิวเกม */}
        <section className="mt-16 border-t border-slate-700 pt-10">

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                รีวิวจากผู้เล่น
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                แบ่งปันความคิดเห็นเกี่ยวกับเกมนี้
              </p>
            </div>

            {/* คะแนนเฉลี่ย */}
            <div className="rounded-xl border border-slate-700 bg-[#1a2330] px-6 py-4 text-center">
              <p className="text-3xl font-bold text-sky-400">
                {averageRating}
                <span className="ml-1 text-lg text-yellow-400">★</span>
              </p>

              <p className="mt-1 text-xs text-slate-400">
                จาก {reviewCount} รีวิว
              </p>
            </div>
          </div>

          {/* ฟอร์มเขียนรีวิว */}
          <div className="mb-10 rounded-2xl border border-slate-700 bg-[#1a2330] p-5 md:p-7">
            {isLoggedIn ? (
              <ReviewForm
                gameTitle={game.title}
                onSubmit={handleAddReview}
              />
            ) : (
              <div className="py-5 text-center">
                <div className="mb-3 text-4xl">🔒</div>

                <h3 className="text-lg font-bold text-white">
                  เข้าสู่ระบบก่อนเขียนรีวิว
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  คุณต้องเข้าสู่ระบบก่อน จึงจะสามารถรีวิวและให้คะแนนเกมนี้ได้
                </p>

                <Link
                  to="/login"
                  className="mt-5 inline-block rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400"
                >
                  เข้าสู่ระบบ
                </Link>
              </div>
            )}
          </div>

          {/* รายการรีวิว */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              รีวิวทั้งหมด ({reviewCount})
            </h3>

            {reviewLoading ? (
              <p className="text-sm text-slate-400">
                กำลังโหลดรีวิว...
              </p>
            ) : (
              <ReviewList items={reviews} />
            )}
          </div>

        </section>
      </div>
    </main>
  );
}

export default GameDetail;

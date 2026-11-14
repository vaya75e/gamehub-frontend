import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  getGenres,
  getPlayerModes,
  adminGetGame,
  adminCreateGame,
  adminUpdateGame,
} from '../../api/backend';
import { useAuth } from '../../auth/AuthContext';

const MAX_IMAGES = 8; // รูปเพิ่มเติมได้สูงสุด (ตรงกับ Backend)

const inputClass =
  'w-full rounded-lg border border-slate-600 bg-[#0b111b] px-3 py-2 text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30';

const emptyPlatform = { platform: '', price: 0, discountPercent: 0, downloadUrl: '' };

const empty = {
  title: '',
  imageUrl: '',
  description: '',
  genreIds: [],
  playerModeIds: [],
  images: [],
  platforms: [{ ...emptyPlatform }],
};

function Field({ label, hint, children }) {
  return (
    <div className="block">
      <span className="mb-1 block text-sm font-medium text-slate-300">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-700 bg-[#1a2330] p-5">
      <h3 className="mb-4 text-lg font-bold text-white">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// ปุ่มเลือกแบบ chip (ใช้กับแนวเกมและรูปแบบการเล่น)
function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition ${
        active
          ? 'border-sky-400 bg-sky-500/20 text-sky-300'
          : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-sky-400'
      }`}
    >
      {children}
    </button>
  );
}

function AdminGameForm() {
  const { id } = useParams(); // มี id = แก้ไข, ไม่มี = เพิ่มใหม่
  const isEdit = Boolean(id);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [genres, setGenres] = useState([]);
  const [modes, setModes] = useState([]);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getGenres().then(setGenres).catch(() => setGenres([]));
    getPlayerModes().then(setModes).catch(() => setModes([]));
  }, []);

  // โหมดแก้ไข: โหลดข้อมูลเดิมมาใส่ฟอร์ม
  useEffect(() => {
    if (!isEdit) return;
    let ignore = false;
    adminGetGame(id, token)
      .then((g) => {
        if (ignore) return;
        setForm({
          title: g.title ?? '',
          imageUrl: g.imageUrl ?? '',
          description: g.description ?? '',
          genreIds: g.genreIds ?? [],
          playerModeIds: g.playerModeIds ?? [],
          images: g.images ?? [],
          platforms:
            g.platforms?.length > 0
              ? g.platforms.map((p) => ({
                  platform: p.platform ?? '',
                  price: p.price ?? 0,
                  discountPercent: p.discountPercent ?? 0,
                  downloadUrl: p.downloadUrl ?? '',
                }))
              : [{ ...emptyPlatform }],
        });
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      });
    return () => {
      ignore = true;
    };
  }, [id, isEdit, token]);

  const setText = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // เลือก/ยกเลิกแนวเกมหรือรูปแบบการเล่น
  function toggleId(key, value) {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((x) => x !== value)
        : [...f[key], value],
    }));
  }

  // รูปเพิ่มเติม
  function setImage(index, value) {
    setForm((f) => ({ ...f, images: f.images.map((u, i) => (i === index ? value : u)) }));
  }
  function addImage() {
    setForm((f) =>
      f.images.length >= MAX_IMAGES ? f : { ...f, images: [...f.images, ''] }
    );
  }
  function removeImage(index) {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  }

  // แพลตฟอร์ม
  function setPlatform(index, key, value) {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.map((p, i) => (i === index ? { ...p, [key]: value } : p)),
    }));
  }
  function addPlatform() {
    setForm((f) => ({ ...f, platforms: [...f.platforms, { ...emptyPlatform }] }));
  }
  function removePlatform(index) {
    setForm((f) => ({ ...f, platforms: f.platforms.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const body = {
      title: form.title.trim(),
      imageUrl: form.imageUrl.trim() || null,
      description: form.description.trim() || null,
      genreIds: form.genreIds, // ตัวแรกที่เลือก = แนวหลัก
      playerModeIds: form.playerModeIds,
      images: form.images.map((u) => u.trim()).filter(Boolean),
      platforms: form.platforms.map((p) => ({
        platform: p.platform.trim(),
        price: Number(p.price) || 0,
        discountPercent: Number(p.discountPercent) || 0,
        downloadUrl: p.downloadUrl.trim() || null,
      })),
    };

    try {
      if (isEdit) await adminUpdateGame(id, body, token);
      else await adminCreateGame(body, token);
      navigate('/admin/games');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b111b] px-5 py-8 text-white md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/admin/games"
          className="text-sm text-slate-400 transition hover:text-sky-400"
        >
          ← กลับไปรายการเกม
        </Link>
        <h2 className="mt-3 text-2xl font-extrabold">
          {isEdit ? 'แก้ไขเกม' : 'เพิ่มเกมใหม่'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* ข้อมูลหลัก */}
          <Card title="ข้อมูลเกม">
            <Field label="ชื่อเกม *">
              <input
                value={form.title}
                onChange={setText('title')}
                required
                maxLength={255}
                className={inputClass}
              />
            </Field>
            <Field label="รูปปก (URL เต็ม https://...)" hint="รูปที่แสดงในการ์ดเกมและรูปใหญ่ของหน้ารายละเอียด">
              <input
                value={form.imageUrl}
                onChange={setText('imageUrl')}
                placeholder="https://..."
                className={inputClass}
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="ตัวอย่างรูปปก"
                  className="mt-3 aspect-video w-48 rounded-lg border border-slate-700 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </Field>
            <Field label="รายละเอียด (เกี่ยวกับเกม)">
              <textarea
                rows={5}
                value={form.description}
                onChange={setText('description')}
                className={inputClass}
              />
            </Field>
          </Card>

          {/* แนวเกม + รูปแบบการเล่น */}
          <Card title="แนวเกมและรูปแบบการเล่น">
            <Field label="แนวเกม (เลือกได้หลายอัน)" hint="อันแรกที่เลือกจะเป็นแนวหลัก">
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <Chip
                    key={g.id}
                    active={form.genreIds.includes(g.id)}
                    onClick={() => toggleId('genreIds', g.id)}
                  >
                    {g.nameTh ?? g.nameEn}
                  </Chip>
                ))}
                {genres.length === 0 && (
                  <span className="text-sm text-slate-500">กำลังโหลดแนวเกม...</span>
                )}
              </div>
            </Field>
            <Field label="รูปแบบการเล่น (เลือกได้หลายอัน)">
              <div className="flex flex-wrap gap-2">
                {modes.map((m) => (
                  <Chip
                    key={m.id}
                    active={form.playerModeIds.includes(m.id)}
                    onClick={() => toggleId('playerModeIds', m.id)}
                  >
                    {m.nameTh ?? m.nameEn}
                  </Chip>
                ))}
                {modes.length === 0 && (
                  <span className="text-sm text-slate-500">กำลังโหลดรูปแบบการเล่น...</span>
                )}
              </div>
            </Field>
          </Card>

          {/* รูปเพิ่มเติม */}
          <Card title={`ภาพเพิ่มเติม (${form.images.length}/${MAX_IMAGES})`}>
            {form.images.length === 0 && (
              <p className="text-sm text-slate-500">ยังไม่มีรูปเพิ่มเติม</p>
            )}
            {form.images.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  value={url}
                  onChange={(e) => setImage(index, e.target.value)}
                  placeholder={`URL รูปที่ ${index + 1} (https://...)`}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="shrink-0 rounded-lg border border-red-500/50 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  ลบ
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImage}
              disabled={form.images.length >= MAX_IMAGES}
              className="rounded-lg border border-sky-500/60 px-4 py-2 text-sm font-medium text-sky-400 hover:bg-sky-500/10 disabled:opacity-40"
            >
              + เพิ่มรูป
            </button>
          </Card>

          {/* ช่องทางดาวน์โหลด */}
          <Card title="ช่องทางดาวน์โหลดและราคา">
            {form.platforms.map((p, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border border-slate-700 bg-[#0b111b]/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-300">
                    ช่องทางที่ {index + 1}
                  </p>
                  {form.platforms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePlatform(index)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      ลบช่องทางนี้
                    </button>
                  )}
                </div>

                <Field label="ชื่อแพลตฟอร์ม * (เช่น Steam, EA, Epic Games Store)">
                  <input
                    value={p.platform}
                    onChange={(e) => setPlatform(index, 'platform', e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="ราคา (บาท, 0 = ฟรี)">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={p.price}
                      onChange={(e) => setPlatform(index, 'price', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="ส่วนลด (%) 0-100">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={p.discountPercent}
                      onChange={(e) => setPlatform(index, 'discountPercent', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="ลิงก์ดาวน์โหลด (URL เต็ม https://...)">
                  <input
                    value={p.downloadUrl}
                    onChange={(e) => setPlatform(index, 'downloadUrl', e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </Field>
              </div>
            ))}
            <button
              type="button"
              onClick={addPlatform}
              className="rounded-lg border border-sky-500/60 px-4 py-2 text-sm font-medium text-sky-400 hover:bg-sky-500/10"
            >
              + เพิ่มช่องทาง
            </button>
          </Card>

          {error && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-sky-500 px-7 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:bg-slate-600"
            >
              {saving ? 'กำลังบันทึก...' : 'บันทึก'}
            </button>
            <Link
              to="/admin/games"
              className="rounded-xl border border-slate-600 px-7 py-3 font-semibold text-slate-300 transition hover:border-sky-400"
            >
              ยกเลิก
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AdminGameForm;

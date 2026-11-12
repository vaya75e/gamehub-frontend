import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getGenres, adminGetGame, adminCreateGame, adminUpdateGame } from '../../api/backend';
import { useAuth } from '../../auth/AuthContext';

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100';

const empty = {
  title: '', imageUrl: '', price: 0, description: '',
  players: '', downloadUrl: '', platform: '', genreId: '',
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function AdminGameForm() {
  const { id } = useParams();            // มี id = แก้ไข, ไม่มี = เพิ่มใหม่
  const isEdit = Boolean(id);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getGenres().then(setGenres).catch(() => setGenres([]));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    let ignore = false;
    adminGetGame(id, token)
      .then(g => {
        if (ignore) return;
        setForm({
          title: g.title ?? '',
          imageUrl: g.imageUrl ?? '',
          price: g.price ?? 0,
          description: g.description ?? '',
          players: g.players ?? '',
          downloadUrl: g.downloadUrl ?? '',
          platform: g.platform ?? '',
          genreId: g.genreId ?? '',
        });
      })
      .catch(err => { if (!ignore) setError(err.message); });
    return () => { ignore = true; };
  }, [id, isEdit, token]);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    // ช่องว่าง -> null (Backend ก็ตัดช่องว่างซ้ำอีกชั้น)
    const body = {
      title: form.title,
      imageUrl: form.imageUrl || null,
      price: Number(form.price),
      description: form.description || null,
      players: form.players || null,
      downloadUrl: form.downloadUrl || null,
      platform: form.platform || null,
      genreId: form.genreId === '' ? null : Number(form.genreId),
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
    <div className="max-w-xl">
      <Link to="/admin/games" className="text-sm text-slate-500 hover:text-sky-600">← กลับไปรายการเกม</Link>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">{isEdit ? 'แก้ไขเกม' : 'เพิ่มเกมใหม่'}</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <Field label="ชื่อเกม *">
          <input value={form.title} onChange={set('title')} required maxLength={255} className={inputClass} />
        </Field>
        <Field label="รูปเกม (URL เต็ม https://...)">
          <input value={form.imageUrl} onChange={set('imageUrl')} className={inputClass} />
        </Field>
        <Field label="ราคา (บาท, 0 = ฟรี)">
          <input type="number" min="0" step="0.01" value={form.price} onChange={set('price')} className={inputClass} />
        </Field>
        <Field label="แนวเกม">
          <select value={form.genreId} onChange={set('genreId')} className={inputClass}>
            <option value="">ไม่ระบุ</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.nameTh ?? g.nameEn}</option>)}
          </select>
        </Field>
        <Field label="จำนวนผู้เล่น (เช่น 1, 1-4, Online 2-8)">
          <input value={form.players} onChange={set('players')} className={inputClass} />
        </Field>
        <Field label="แพลตฟอร์ม (เช่น Steam, Epic, Mobile)">
          <input value={form.platform} onChange={set('platform')} className={inputClass} />
        </Field>
        <Field label="ช่องทางดาวน์โหลด (URL เต็ม https://...)">
          <input value={form.downloadUrl} onChange={set('downloadUrl')} className={inputClass} />
        </Field>
        <Field label="รายละเอียด">
          <textarea rows={5} value={form.description} onChange={set('description')} className={inputClass} />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={saving}
                className="rounded-lg bg-sky-500 px-5 py-2 text-sm font-medium text-white hover:bg-sky-600 disabled:bg-slate-300">
          {saving ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </form>
    </div>
  );
}

export default AdminGameForm;
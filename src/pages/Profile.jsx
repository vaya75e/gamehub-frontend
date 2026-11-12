import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { updateMe, changePassword } from '../api/backend';

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100';

function Profile() {
  const { member, token, updateMember } = useAuth();

  // ----- แก้ชื่อที่แสดง -----
  const [name, setName] = useState(member?.displayName ?? '');
  const [nameMsg, setNameMsg] = useState(null);   // { ok: boolean, text: string }

  async function saveName(e) {
    e.preventDefault();
    setNameMsg(null);
    try {
      const m = await updateMe(name, token);
      updateMember({ ...member, displayName: m.displayName });
      setNameMsg({ ok: true, text: 'บันทึกชื่อแล้ว' });
    } catch (err) {
      setNameMsg({ ok: false, text: err.message });
    }
  }

  // ----- เปลี่ยนรหัสผ่าน -----
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwMsg, setPwMsg] = useState(null);

  async function savePassword(e) {
    e.preventDefault();
    setPwMsg(null);
    if (next !== confirm) {
      setPwMsg({ ok: false, text: 'รหัสผ่านใหม่ทั้งสองช่องไม่ตรงกัน' });
      return;
    }
    try {
      await changePassword(current, next, token);
      setCurrent(''); setNext(''); setConfirm('');
      setPwMsg({ ok: true, text: 'เปลี่ยนรหัสผ่านสำเร็จ' });
    } catch (err) {
      setPwMsg({ ok: false, text: err.message });
    }
  }

  const msgClass = (m) => 'text-sm ' + (m.ok ? 'text-emerald-600' : 'text-red-600');

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">โปรไฟล์ของฉัน</h1>
      <p className="mt-1 text-sm text-slate-500">
        {member?.email} · บทบาท: {member?.role}
      </p>

      <form onSubmit={saveName} className="mt-8 space-y-3 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">ชื่อที่แสดง</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={50} className={inputClass} />
        <button type="submit" className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600">
          บันทึกชื่อ
        </button>
        {nameMsg && <p className={msgClass(nameMsg)}>{nameMsg.text}</p>}
      </form>

      <form onSubmit={savePassword} className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">เปลี่ยนรหัสผ่าน</h2>
        <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)}
               placeholder="รหัสผ่านปัจจุบัน" required className={inputClass} />
        <input type="password" value={next} onChange={(e) => setNext(e.target.value)}
               placeholder="รหัสผ่านใหม่ (8 ตัวขึ้นไป)" required minLength={8} className={inputClass} />
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
               placeholder="ยืนยันรหัสผ่านใหม่" required minLength={8} className={inputClass} />
        <button type="submit" className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600">
          เปลี่ยนรหัสผ่าน
        </button>
        {pwMsg && <p className={msgClass(pwMsg)}>{pwMsg.text}</p>}
      </form>
    </div>
  );
}

export default Profile;
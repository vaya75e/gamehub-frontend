
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { updateMe, changePassword } from '../api/backend';

const inputClass =
  'w-full rounded-xl border border-slate-700 bg-[#111c2b] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20';

function Profile() {
  const { member, token, updateMember } = useAuth();

  const [name, setName] = useState(member?.displayName ?? '');
  const [nameMsg, setNameMsg] = useState(null);

  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwMsg, setPwMsg] = useState(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function saveName(e) {
    e.preventDefault();
    setNameMsg(null);

    try {
      const m = await updateMe(name, token);
      updateMember({ ...member, displayName: m.displayName });
      setNameMsg({ ok: true, text: 'บันทึกชื่อเรียบร้อยแล้ว' });
    } catch (err) {
      setNameMsg({ ok: false, text: err.message });
    }
  }

  async function savePassword(e) {
    e.preventDefault();
    setPwMsg(null);

    if (next !== confirm) {
      setPwMsg({ ok: false, text: 'รหัสผ่านใหม่ทั้งสองช่องไม่ตรงกัน' });
      return;
    }

    try {
      await changePassword(current, next, token);
      setCurrent('');
      setNext('');
      setConfirm('');
      setPwMsg({ ok: true, text: 'เปลี่ยนรหัสผ่านสำเร็จแล้ว' });
    } catch (err) {
      setPwMsg({ ok: false, text: err.message });
    }
  }

  const msgClass = (m) =>
    `mt-3 rounded-lg px-4 py-3 text-sm ${
      m.ok
        ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
        : 'border border-red-500/20 bg-red-500/10 text-red-400'
    }`;

  function PasswordField({
    label,
    value,
    onChange,
    placeholder,
    show,
    toggle,
    minLength,
  }) {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          {label}
        </label>

        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            minLength={minLength}
            className={`${inputClass} pr-16`}
          />

          <button
            type="button"
            onClick={toggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-sky-400 hover:text-sky-300"
          >
            {show ? 'ซ่อน' : 'แสดง'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b111b] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-widest text-sky-400">
            GAMEHUB ACCOUNT
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            โปรไฟล์ของฉัน
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            จัดการข้อมูลส่วนตัวและความปลอดภัยของบัญชี
          </p>
        </div>

        {/* Account Information */}
        <section className="mb-6 flex items-center gap-5 rounded-2xl border border-slate-700 bg-[#1a2330] p-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-500/15 text-3xl text-sky-400">
            👤
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold">
              {member?.displayName || 'ผู้ใช้งาน'}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-400">
              {member?.email}
            </p>
            <span className="mt-2 inline-block rounded-full bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-400">
              {member?.role || 'Member'}
            </span>
          </div>
        </section>

        {/* Edit Name */}
        <form
          onSubmit={saveName}
          className="mb-6 rounded-2xl border border-slate-700 bg-[#1a2330] p-6 md:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-xl">
              ✏️
            </div>
            <div>
              <h2 className="font-bold">แก้ไขชื่อที่แสดง</h2>
              <p className="text-xs text-slate-400">
                ชื่อนี้จะแสดงบนบัญชีของคุณ
              </p>
            </div>
          </div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            ชื่อที่แสดง
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
            placeholder="กรอกชื่อที่ต้องการแสดง"
            className={inputClass}
          />

          <button
            type="submit"
            className="mt-5 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            บันทึกชื่อ
          </button>

          {nameMsg && (
            <p className={msgClass(nameMsg)}>{nameMsg.text}</p>
          )}
        </form>

        {/* Change Password */}
        <form
          onSubmit={savePassword}
          className="rounded-2xl border border-slate-700 bg-[#1a2330] p-6 md:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-xl">
              🔒
            </div>
            <div>
              <h2 className="font-bold">เปลี่ยนรหัสผ่าน</h2>
              <p className="text-xs text-slate-400">
                ตั้งรหัสผ่านใหม่เพื่อความปลอดภัยของบัญชี
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <PasswordField
              label="รหัสผ่านปัจจุบัน"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="กรอกรหัสผ่านปัจจุบัน"
              show={showCurrent}
              toggle={() => setShowCurrent(!showCurrent)}
            />

            <PasswordField
              label="รหัสผ่านใหม่"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              placeholder="รหัสผ่านใหม่ (8 ตัวขึ้นไป)"
              show={showNext}
              toggle={() => setShowNext(!showNext)}
              minLength={8}
            />

            <PasswordField
              label="ยืนยันรหัสผ่านใหม่"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
              show={showConfirm}
              toggle={() => setShowConfirm(!showConfirm)}
              minLength={8}
            />
          </div>

          <button
            type="submit"
            className="mt-6 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            เปลี่ยนรหัสผ่าน
          </button>

          {pwMsg && (
            <p className={msgClass(pwMsg)}>{pwMsg.text}</p>
          )}
        </form>

      </div>
    </main>
  );
}

export default Profile;

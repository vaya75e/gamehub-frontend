
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      await register(email, password, displayName);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setStatus('typing');
    }
  }

  const input =
    'w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative w-full max-w-md">

        {/* Register Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">

          {/* Logo / Heading */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="h-8 w-8 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 4.5 1.122c.993 0 1.953-.16 2.85-.456M15 19.128v-.003c0-1.156-.29-2.244-.8-3.197M15 19.128v.003c0 .53-.21 1.04-.586 1.414M15 19.128a9.38 9.38 0 0 1-6 0m0 0v-.003c0-1.156.29-2.244.8-3.197M9 19.128a9.38 9.38 0 0 1-4.5 1.122c-.993 0-1.953-.16-2.85-.456M9 19.128v.003c0 .53.21 1.04.586 1.414M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-white">
              สร้างบัญชีสมาชิก
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              เข้าร่วมชุมชนคนรักเกมกับ GameHub
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                ชื่อที่แสดง
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="กรอกชื่อที่ต้องการแสดง"
                required
                className={input}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                อีเมล
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className={input}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                รหัสผ่าน
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่านอย่างน้อย 4 ตัว"
                required
                minLength={4}
                className={input}
              />
              <p className="mt-2 text-xs text-slate-500">
                รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'submitting'
                ? 'กำลังสมัครสมาชิก...'
                : 'สมัครสมาชิก'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-7 border-t border-slate-800 pt-6 text-center">
            <p className="text-sm text-slate-400">
              มีบัญชีสมาชิกอยู่แล้ว?
              <Link
                to="/login"
                className="ml-2 font-semibold text-blue-400 transition hover:text-cyan-300"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>

        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          © GameHub — Your Gaming Community
        </p>
      </div>
    </div>
  );
}

export default Register;

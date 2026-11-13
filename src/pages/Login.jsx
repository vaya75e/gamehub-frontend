
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  const location = useLocation();
  const from = location.state?.from || '/';
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      await login(email, password);
      navigate(from);
    } catch (err) {
      setError(err.message);
      setStatus('typing');
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-blue-950/30">

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-5xl">🎮</div>

          <h1 className="text-3xl font-bold text-white">
            เข้าสู่ระบบ
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            ยินดีต้อนรับกลับสู่
            <span className="font-semibold text-blue-400"> GameHub </span>
            <br />
            เข้าสู่ระบบเพื่อใช้งานฟีเจอร์ต่าง ๆ
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              อีเมล
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="กรอกอีเมลของคุณ"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
              placeholder="กรอกรหัสผ่านของคุณ"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {status === 'submitting'
              ? 'กำลังเข้าสู่ระบบ...'
              : 'เข้าสู่ระบบ'}
          </button>
        </form>

        {/* Register */}
        <div className="mt-7 border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-400">
            ยังไม่มีบัญชี?
            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
            >
              สมัครสมาชิก
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;

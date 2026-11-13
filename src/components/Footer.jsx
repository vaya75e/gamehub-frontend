
function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-7 text-sm sm:flex-row">
        <p className="font-semibold tracking-wide text-white">
          GAME<span className="text-cyan-400">HUB</span>
        </p>

        <p className="text-center text-xs text-slate-500">
          Your world of games, all in one place.
        </p>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} GameHub
        </p>
      </div>
    </footer>
  );
}

export default Footer;

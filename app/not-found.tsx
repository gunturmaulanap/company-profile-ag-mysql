import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center shadow-2xl">
        <p className="text-xs tracking-[0.25em] uppercase text-slate-300 mb-4">
          Adibayu Group
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
          The page you requested does not exist or has been moved. Return to the
          main website to continue browsing.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-slate-100 transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}

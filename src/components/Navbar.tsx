"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0e17]/70 backdrop-blur-xl border-b border-[rgba(114,220,255,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">⌨️</span>
          <span className="text-2xl font-black tracking-tighter text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] group-hover:drop-shadow-[0_0_16px_rgba(0,210,255,0.7)] transition-all">
            PyExam Prep
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-[#00d2ff] font-bold tracking-tight transition-colors"
          >
            Home
          </Link>
          <Link
            href="/practice"
            className="text-[#ebedfb]/70 hover:text-[#00d2ff] transition-colors font-semibold tracking-tight"
          >
            Practice
          </Link>
        </nav>
        <Link
          href="/practice"
          className="px-4 py-2 bg-gradient-to-br from-[#00d2ff] to-[#3b82f6] text-[#0a0f1e] font-bold rounded-lg text-sm hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
        >
          Start Now
        </Link>
      </div>
    </header>
  );
}

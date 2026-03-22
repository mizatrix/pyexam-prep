"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0e17]/70 backdrop-blur-xl border-b border-[rgba(114,220,255,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl">⌨️</span>
          <span className="text-lg sm:text-2xl font-black tracking-tighter text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] group-hover:drop-shadow-[0_0_16px_rgba(0,210,255,0.7)] transition-all">
            PyExam Prep
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#00d2ff] font-bold tracking-tight transition-colors">
            Home
          </Link>
          <Link href="/practice" className="text-[#ebedfb]/70 hover:text-[#00d2ff] transition-colors font-semibold tracking-tight">
            Practice
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/practice"
            className="hidden sm:inline-block px-4 py-2 bg-gradient-to-br from-[#00d2ff] to-[#3b82f6] text-[#0a0f1e] font-bold rounded-lg text-sm hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
          >
            Start Now
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#ebedfb] hover:text-[#00d2ff] transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[rgba(114,220,255,0.1)] bg-[#0a0e17]/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block text-[#00d2ff] font-bold py-2">
              Home
            </Link>
            <Link href="/practice" onClick={() => setMobileOpen(false)} className="block text-[#ebedfb]/70 font-semibold py-2">
              Practice
            </Link>
            <Link
              href="/practice"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-3 bg-gradient-to-br from-[#00d2ff] to-[#3b82f6] text-[#0a0f1e] font-bold rounded-lg"
            >
              Start Practicing →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

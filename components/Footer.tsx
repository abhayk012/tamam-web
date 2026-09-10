"use client";

import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black text-white/60 py-12 px-6 md:px-16 lg:px-24 border-t border-white/10 text-xs font-medium">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-white text-base tracking-tighter uppercase">
            TAMAM<span className="text-primary font-black">.</span> EVENTS
          </span>
          <span className="text-white/30">|</span>
          <span>tamamevents LLC &copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6 text-white/50">
          <span>Dubai &amp; Abu Dhabi, UAE</span>
          <button
            onClick={scrollToTop}
            className="hover:text-primary transition-colors cursor-pointer uppercase tracking-widest text-[10px] font-bold"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

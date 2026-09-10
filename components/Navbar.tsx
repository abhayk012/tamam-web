"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#"
          className="group flex items-center gap-3 text-white transition-opacity hover:opacity-80"
        >
          <span className="font-extrabold text-xl md:text-2xl tracking-tighter uppercase text-white">
            TAMAM<span className="text-primary font-black">.</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.3em] font-semibold text-white/50 border-l border-white/20 pl-3 uppercase">
            Events Dubai
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          <a
            href="#event-management"
            className="hover:text-primary transition-colors duration-300"
          >
            01 / Management
          </a>
          <a
            href="#experience"
            className="hover:text-primary transition-colors duration-300"
          >
            02 / Experience
          </a>
          <a
            href="#catering"
            className="hover:text-primary transition-colors duration-300"
          >
            03 / Catering
          </a>
          <a
            href="#activities"
            className="hover:text-primary transition-colors duration-300"
          >
            04 / Activities &amp; AV
          </a>
          <a
            href="#clients"
            className="hover:text-primary transition-colors duration-300"
          >
            05 / Clients
          </a>
          <a
            href="#contact"
            className="hover:text-accent transition-colors duration-300 font-bold text-white border border-white/20 hover:border-accent rounded-full px-5 py-2 backdrop-blur-sm"
          >
            Contact
          </a>
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white focus:outline-none p-2"
          aria-label="Toggle Navigation"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-black/95 backdrop-blur-xl z-50 flex flex-col justify-center px-8 space-y-6 text-lg font-bold uppercase tracking-widest text-white border-t border-white/10">
          <a
            href="#event-management"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-primary transition-colors"
          >
            01 / Event Management
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-primary transition-colors"
          >
            02 / Experience
          </a>
          <a
            href="#catering"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-primary transition-colors"
          >
            03 / Catering &amp; Transportation
          </a>
          <a
            href="#activities"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-primary transition-colors"
          >
            04 / Activities &amp; AV
          </a>
          <a
            href="#clients"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-primary transition-colors"
          >
            05 / Our Clients
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-primary hover:text-accent transition-colors pt-4 border-t border-white/10"
          >
            Contact Us →
          </a>
        </div>
      )}
    </header>
  );
}

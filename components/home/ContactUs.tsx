"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !headlineRef.current) return;

      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-surface-alt text-white overflow-hidden"
    >
      {/* BACKGROUND WATERMARK */}
      <div className="absolute bottom-0 right-0 text-[18vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none">
        TAMAM
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div ref={headlineRef} className="space-y-12">
          {/* OUR STRENGTH BLOCK (PAGE 9) */}
          <div className="p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 max-w-4xl">
            <span className="text-xs tracking-widest text-accent uppercase font-bold border-l-2 border-accent pl-3 py-1 mb-4 block">
              TAMAM events
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Our Strength
            </h3>
            <p className="text-xl md:text-2xl text-zinc-300 font-medium">
              An experienced and dedicated team
            </p>
          </div>

          {/* CONTACT US BLOCK */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-primary" />
              <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-accent">
                WE ADD <span className="italic text-white">flair!</span> TO YOUR EVENTS
              </p>
            </div>

            <h2 className="text-display-section font-extrabold uppercase tracking-tight text-white">
              Contact <span className="italic font-light text-primary">Us</span>
            </h2>

            {/* DIRECT CONTACT INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
              {/* PHONE & MOBILE */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">
                  Telephone &amp; Mobile
                </span>
                <p className="text-lg font-bold text-white">
                  <a href="tel:971553429288" className="hover:text-primary transition-colors">
                    +971 55 3429288
                  </a>
                </p>
                <p className="text-lg font-bold text-white">
                  <a href="tel:971553842020" className="hover:text-primary transition-colors">
                    +971 55 3842020
                  </a>
                </p>
                <p className="text-sm text-zinc-400">
                  Tel: +971 4 2960071 | Fax: +971 4 2960071
                </p>
              </div>

              {/* EMAIL */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">
                  Official Email &amp; Web
                </span>
                <p className="text-lg font-bold text-white">
                  <a
                    href="mailto:info@tamamevents.com"
                    className="hover:text-primary transition-colors underline"
                  >
                    info@tamamevents.com
                  </a>
                </p>
                <p className="text-sm text-primary font-semibold">
                  tamamevents.com
                </p>
              </div>

              {/* LOCATION */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">
                  Corporate Office
                </span>
                <p className="text-base font-bold text-white">
                  tamamevents LLC
                </p>
                <p className="text-sm text-zinc-400">
                  PO Box 125385, Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

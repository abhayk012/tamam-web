"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function OurActivities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !contentRef.current) return;

      gsap.from(contentRef.current, {
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
      id="activities"
      ref={containerRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-background text-foreground border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-primary" />
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-primary">
              WE ADD <span className="italic text-accent">flair!</span> TO YOUR EVENTS
            </p>
          </div>
          <span className="text-[11px] tracking-[0.25em] text-white/40 uppercase font-semibold border-l border-white/20 pl-3">
            TAMAM events
          </span>
        </div>

        {/* 2 EDITORIAL PANELS MATCHING PAGE 6 */}
        <div ref={contentRef} className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* PANEL 1: OUR ACTIVITIES */}
            <div className="p-8 md:p-12 rounded-3xl bg-surface border border-white/10 flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block mb-4">
                  01 // Indoors &amp; Outdoors
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight mb-6">
                  Our Activities
                </h3>
                <p className="text-xl md:text-2xl text-primary font-bold leading-relaxed">
                  Be it indoors or outdoors - we have you covered
                </p>
              </div>
            </div>

            {/* PANEL 2: EVENTS */}
            <div className="p-8 md:p-12 rounded-3xl bg-surface border border-white/10 flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block mb-4">
                  02 // Corporate &amp; Grand Galas
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight mb-6">
                  Events
                </h3>
                <p className="text-xl md:text-2xl text-white font-bold leading-relaxed">
                  Boardroom meetings and Ballroom activities – we are well experienced.
                </p>
              </div>
            </div>
          </div>

          {/* GRAND BALLROOM VISUAL */}
          <div className="relative w-full h-[320px] md:h-[460px] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="/images/grand-ballroom.jpg"
              alt="Ballroom and Corporate Events"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                Boardroom Meetings &amp; Ballroom Productions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

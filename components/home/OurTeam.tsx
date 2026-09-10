"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function OurTeam() {
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
      ref={containerRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-surface text-foreground border-b border-white/10 overflow-hidden"
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

        {/* HEADINGS */}
        <div ref={contentRef} className="space-y-6 mb-12">
          <h2 className="text-display-section font-extrabold uppercase tracking-tight text-white">
            Our <span className="italic font-light text-white/70">Team</span>
          </h2>

          <p className="text-xl md:text-3xl font-bold text-primary max-w-4xl tracking-tight">
            We have an experienced and dedicated team to manage our activities.
          </p>

          <div className="p-8 md:p-12 rounded-3xl bg-background border border-white/10 max-w-4xl">
            <p className="text-muted-text text-lg md:text-xl leading-relaxed font-normal">
              In addition to managing entire events on our own, we do support the events of a select group of clients in the city of Dubai on a regular basis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

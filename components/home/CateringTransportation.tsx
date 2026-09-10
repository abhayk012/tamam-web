"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CateringTransportation() {
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
      id="catering"
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

        {/* HEADINGS */}
        <div ref={contentRef} className="space-y-6 mb-12">
          <h2 className="text-display-section font-extrabold uppercase tracking-tight text-white">
            Catering &amp; <span className="italic font-light text-white/70">Transportation</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 p-8 md:p-12 rounded-3xl bg-surface border border-white/10">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest px-3 py-1 bg-accent/10 rounded-full border border-accent/20 mb-6 inline-block">
                HACCP Compliant Logistics
              </span>
              <p className="text-muted-text text-lg md:text-xl leading-relaxed font-normal">
                We provide catering and transportation of ready foods in our own refrigerated vehicles, to ensure that your guests enjoy our food at its freshest - respecting all HACCP guidelines.
              </p>
            </div>

            <div className="lg:col-span-5 relative h-[280px] md:h-[340px] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/catering-luxury.jpg"
                alt="Luxury Catering and Refrigerated Transportation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

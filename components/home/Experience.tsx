"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
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
      id="experience"
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
            Experience
          </h2>

          <p className="text-xl md:text-3xl font-bold text-accent tracking-tight">
            Is our strength
          </p>

          <div className="p-8 md:p-12 rounded-3xl bg-background border border-white/10 max-w-4xl">
            <p className="text-muted-text text-lg md:text-xl leading-relaxed font-normal">
              We have a strong in-house team with a vast experience in doing our core business – managing events. We have been very active in the city of Dubai for the past few years and aim to get the same acceptance and recognition in Abu Dhabi too.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 rounded-full bg-primary shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Dubai Established
                  </h4>
                  <p className="text-xs text-muted-text">Active across leading venues</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 rounded-full bg-accent shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Abu Dhabi Reach
                  </h4>
                  <p className="text-xs text-muted-text">Recognized excellence across UAE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

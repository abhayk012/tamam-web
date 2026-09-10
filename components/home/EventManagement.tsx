"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function EventManagement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 0.96,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="event-management"
      ref={containerRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-background text-foreground border-b border-white/10 overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-10 right-10 text-[14vw] font-black text-white/[0.015] select-none pointer-events-none tracking-tighter leading-none">
        TAMAM
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* TOP METADATA BAR */}
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
        <div ref={textRef} className="space-y-6 mb-16">
          <h2 className="text-display-section font-extrabold uppercase tracking-tight text-white">
            Event <span className="italic font-light text-white/70">Management</span>
          </h2>

          <p className="text-xl md:text-3xl font-bold text-primary max-w-4xl tracking-tight leading-snug">
            A name to rely on when you require an experienced team
          </p>
        </div>

        {/* 2-COLUMN EDITORIAL CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-surface border border-white/10 flex flex-col justify-between hover:border-primary/40 transition-colors">
            <div>
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block mb-4">
                01 // Core Business
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                Event Management is our core business:
              </h3>
              <p className="text-muted-text text-base md:text-lg leading-relaxed font-normal">
                Be it facilitation of trained manpower in the food and beverages department or managing an entire event, we have the manpower and experience to cater to your every need.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-surface border border-white/10 flex flex-col justify-between hover:border-primary/40 transition-colors">
            <div>
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block mb-4">
                02 // In-House Expertise
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                Experienced In-House Team:
              </h3>
              <p className="text-muted-text text-base md:text-lg leading-relaxed font-normal">
                We have an experienced in-house team to manage any event you might be planning, be it a small gathering on your lawn or a business meeting – we can manage your event with our experienced staff in the food and beverages department or with our technical staff in organizing a flawless meeting.
              </p>
            </div>
          </div>
        </div>

        {/* EDITORIAL IMAGE BANNER */}
        <div
          ref={imageRef}
          className="relative w-full h-[320px] md:h-[480px] rounded-3xl overflow-hidden border border-white/10"
        >
          <Image
            src="/images/luxury-stage.jpg"
            alt="Event Management Dubai Stage"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-white/70">
              Dubai &amp; Abu Dhabi Event Operations
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Flawless Execution
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const clientList = [
  "ARMANI Hotel",
  "CROWN PLAZA",
  "The Ritz-Carlton, Dubai International Financial Centre",
  "InterContinental Hotels and Resorts, Dubai",
  "Novotel, World Trade Centre, Dubai",
  "Ibis, World Trade Centre, Dubai",
  "Novotel, Sharjah Expo Centre",
  "Le Meridien Dubai, Hotel and Conference Centre",
  "JW Marriott, Deira",
];

export default function OurClients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !listRef.current) return;

      const items = listRef.current.querySelectorAll(".client-tile");
      gsap.from(items, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
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
      id="clients"
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
        <div className="space-y-6 mb-16">
          <h2 className="text-display-section font-extrabold uppercase tracking-tight text-white">
            Our <span className="italic font-light text-white/70">Clients</span>
          </h2>

          <p className="text-xl md:text-2xl font-semibold text-primary max-w-4xl tracking-tight">
            We have a vast portfolio of clients to whom we have been providing regular services in Dubai.
          </p>
        </div>

        {/* LUXURY EDITORIAL CLIENT GRID */}
        <div
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {clientList.map((client, index) => (
            <div
              key={index}
              className="client-tile group bg-surface p-8 rounded-2xl border border-white/10 flex flex-col justify-between transition-all duration-300 hover:border-primary/60 hover:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-accent font-bold">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
                {client}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

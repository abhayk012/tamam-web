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
  const tagRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1.2,
        },
      });

      tl.from(tagRef.current, { opacity: 0, y: 20, duration: 0.5 })
        .from(headingRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(descRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
        .from(listRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.3");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-16 lg:px-24 bg-surface text-foreground flex flex-col justify-center border-b border-black/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
          <div>
            <p
              ref={tagRef}
              className="text-xs md:text-sm font-semibold tracking-widest text-muted-text uppercase mb-2"
            >
              WE ADD flair! TO YOUR EVENTS
            </p>
            <h2
              ref={headingRef}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight"
            >
              Our Clients
            </h2>
          </div>
          <div className="self-end md:self-auto">
            <span className="text-xs tracking-widest text-primary uppercase font-bold border-l-2 border-primary pl-3 py-1">
              TAMAM events
            </span>
          </div>
        </div>

        <p
          ref={descRef}
          className="text-lg md:text-2xl font-semibold text-primary mb-12 max-w-3xl"
        >
          We have a vast portfolio of clients to whom we have been providing regular services in Dubai.
        </p>

        <div
          ref={listRef}
          className="p-8 md:p-12 rounded-3xl bg-white border border-black/5 shadow-sm max-w-4xl"
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground font-semibold text-base md:text-lg">
            {clientList.map((client, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-black/5"
              >
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{client}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

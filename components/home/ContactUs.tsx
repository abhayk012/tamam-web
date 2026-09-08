"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

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

      tl.from([leftCardRef.current, rightCardRef.current], {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 0.8,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-16 lg:px-24 bg-surface-alt text-white flex flex-col justify-center border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Our Strength Block */}
        <div
          ref={leftCardRef}
          className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-xs tracking-widest text-accent uppercase font-bold border-l-2 border-accent pl-3 py-1 mb-4 block">
              TAMAM events
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Our Strength
            </h2>
          </div>
          <p className="text-lg md:text-xl text-zinc-300 font-medium mt-6">
            An experienced and dedicated team
          </p>
        </div>

        {/* Contact Us Block */}
        <div
          ref={rightCardRef}
          className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm flex flex-col justify-between"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-widest text-accent uppercase mb-4">
              WE ADD flair! TO YOUR EVENTS
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              Contact Us
            </h2>
          </div>

          <div className="space-y-3 text-base md:text-lg font-medium text-zinc-200">
            <p className="flex items-center gap-3">
              <span className="text-accent font-bold">Tel / Mobile:</span>
              <a href="tel:971553429288" className="hover:text-accent transition-colors">
                971 55 3429288
              </a>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-accent font-bold">Mobile:</span>
              <a href="tel:971553842020" className="hover:text-accent transition-colors">
                971553842020
              </a>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-accent font-bold">Email:</span>
              <a
                href="mailto:info@tamamevents.com"
                className="hover:text-accent transition-colors underline"
              >
                info@tamamevents.com
              </a>
            </p>

            <div className="pt-6 border-t border-white/10 mt-6 text-sm text-zinc-400">
              <p className="font-semibold text-white">tamamevents LLC</p>
              <p>PO Box 125385, Dubai, UAE</p>
              <p>Tel 97142960071 | Fax 97142960071</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CateringTransportation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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
        .from(bodyRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.4");
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
              Catering &amp; Transportation
            </h2>
          </div>
          <div className="self-end md:self-auto">
            <span className="text-xs tracking-widest text-primary uppercase font-bold border-l-2 border-primary pl-3 py-1">
              TAMAM events
            </span>
          </div>
        </div>

        <div
          ref={bodyRef}
          className="max-w-3xl p-8 rounded-2xl bg-white border border-black/5 shadow-sm text-muted-text text-base md:text-lg leading-relaxed font-medium mt-6"
        >
          <p>
            We provide catering and transportation of ready foods in our own refrigerated vehicles, to ensure that your guests enjoy our food at its freshest -respecting all HACCP guidelines.
          </p>
        </div>
      </div>
    </section>
  );
}

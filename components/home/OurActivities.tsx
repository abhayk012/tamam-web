"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function OurActivities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

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

      tl.from([card1Ref.current, card2Ref.current], {
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
      className="relative w-full py-24 px-6 md:px-16 lg:px-24 bg-surface text-foreground flex flex-col justify-center border-b border-black/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Our Activities Block */}
        <div
          ref={card1Ref}
          className="p-8 md:p-12 rounded-3xl bg-white border border-black/5 shadow-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-xs tracking-widest text-primary uppercase font-bold border-l-2 border-primary pl-3 py-1 mb-4 block">
              TAMAM events
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4">
              Our Activities
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-text font-medium mt-6">
            Be it indoors or outdoors - we have you covered
          </p>
        </div>

        {/* Events Block */}
        <div
          ref={card2Ref}
          className="p-8 md:p-12 rounded-3xl bg-white border border-black/5 shadow-sm flex flex-col justify-between"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-widest text-muted-text uppercase mb-4">
              WE ADD flair! TO YOUR EVENTS
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4">
              Events
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-text font-medium mt-6">
            Boardroom meetings and Ballroom activities – we are well experienced.
          </p>
        </div>
      </div>
    </section>
  );
}

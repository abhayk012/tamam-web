"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function EventManagement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

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
        .from(subheadingRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
        .from([col1Ref.current, col2Ref.current], {
          opacity: 0,
          y: 40,
          stagger: 0.3,
          duration: 0.8,
        }, "-=0.3");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] py-24 px-6 md:px-16 lg:px-24 bg-surface text-foreground flex flex-col justify-center border-b border-black/5 overflow-hidden"
    >
      {/* Background Watermark / Accent Text */}
      <div className="absolute top-10 right-10 text-8xl md:text-[14rem] font-black text-black/[0.02] select-none pointer-events-none tracking-tighter">
        tamam
      </div>

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
              Event Management
            </h2>
          </div>
          <div className="self-end md:self-auto">
            <span className="text-xs tracking-widest text-primary uppercase font-bold border-l-2 border-primary pl-3 py-1">
              TAMAM events
            </span>
          </div>
        </div>

        <p
          ref={subheadingRef}
          className="text-xl md:text-3xl font-bold text-primary mb-12 max-w-3xl"
        >
          A name to rely on when you require an experienced team
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 text-muted-text text-base md:text-lg leading-relaxed font-medium">
          <div
            ref={col1Ref}
            className="p-8 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow"
          >
            <p>
              Event Management is our core business:
              <br />
              Be it facilitation of trained manpower in the food and beverages department or managing an entire event, we have the manpower and experience to cater to your every need.
            </p>
          </div>

          <div
            ref={col2Ref}
            className="p-8 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow"
          >
            <p>
              We have an experienced in-house team to manage any event you might be planning, be it a small gathering on your lawn or a business meeting – we can mange your event with our experienced staff in the food and beverages department or with our technical staff in organizing a flawless meeting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

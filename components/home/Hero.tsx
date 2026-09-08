"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

// Increase/decrease this to control how long the cinematic sequence takes.
// 6 = approximately 6 viewport heights of scrolling.
const SCROLL_DISTANCE = 6;

const getFramePath = (frameNumber: number): string => {
  const paddedIndex = String(frameNumber).padStart(3, "0");

  return `/heroframeslap/ezgif-frame-${paddedIndex}.jpg`;
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);

  const rafRef = useRef<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  /**
   * Render image with object-fit: cover behavior.
   *
   * Canvas itself is rendered at full device-pixel resolution,
   * so high-resolution source images remain sharp.
   */
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (!ctx) return;

    const safeFrameIndex = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex))
    );

    // Don't redraw the exact same frame unnecessarily.
    if (safeFrameIndex === lastRenderedFrameRef.current) {
      return;
    }

    const image = imagesRef.current[safeFrameIndex];

    if (
      !image ||
      !image.complete ||
      image.naturalWidth === 0 ||
      image.naturalHeight === 0
    ) {
      return;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    if (!canvasWidth || !canvasHeight) return;

    const imageRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imageRatio) {
      // Canvas is proportionally wider than image.
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imageRatio;

      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is proportionally taller than image.
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imageRatio;

      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    // Best possible browser scaling quality.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(
      image,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );

    lastRenderedFrameRef.current = safeFrameIndex;
  }, []);

  /**
   * Rendering through requestAnimationFrame prevents excessive
   * canvas draws during very fast scroll updates.
   */
  const requestFrameRender = useCallback(
    (frameIndex: number) => {
      currentFrameRef.current = frameIndex;

      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        renderFrame(currentFrameRef.current);

        rafRef.current = null;
      });
    },
    [renderFrame]
  );

  /**
   * Correctly size canvas using browser devicePixelRatio.
   *
   * Example:
   * 1920x1080 screen with DPR 2
   * Canvas internally becomes 3840x2160.
   *
   * CSS still displays it at 1920x1080.
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Full device pixel ratio — no artificial quality cap.
    const dpr = window.devicePixelRatio || 1;

    const targetWidth = Math.round(width * dpr);
    const targetHeight = Math.round(height * dpr);

    if (
      canvas.width !== targetWidth ||
      canvas.height !== targetHeight
    ) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Force redraw after resize.
      lastRenderedFrameRef.current = -1;

      renderFrame(currentFrameRef.current);
    }
  }, [renderFrame]);

  /**
   * Preload every frame.
   */
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadImage = async (index: number) => {
      return new Promise<void>((resolve) => {
        const image = new Image();

        const frameNumber = index + 1;

        image.src = getFramePath(frameNumber);

        image.onload = async () => {
          try {
            // Wait until browser has decoded the JPEG.
            if ("decode" in image) {
              await image.decode().catch(() => {});
            }
          } finally {
            resolve();
          }
        };

        image.onerror = () => {
          console.error(
            `Failed loading frame ${frameNumber}:`,
            getFramePath(frameNumber)
          );

          resolve();
        };

        images[index] = image;
      });
    };

    const preloadFrames = async () => {
      /**
       * We load in batches instead of starting 240 network
       * requests simultaneously.
       *
       * This generally improves stability and startup performance.
       */
      const batchSize = 12;

      for (
        let batchStart = 0;
        batchStart < TOTAL_FRAMES;
        batchStart += batchSize
      ) {
        if (cancelled) return;

        const batchPromises: Promise<void>[] = [];

        const batchEnd = Math.min(
          batchStart + batchSize,
          TOTAL_FRAMES
        );

        for (let i = batchStart; i < batchEnd; i++) {
          batchPromises.push(
            loadImage(i).then(() => {
              loadedCount += 1;

              if (!cancelled) {
                setLoadProgress(
                  Math.round(
                    (loadedCount / TOTAL_FRAMES) * 100
                  )
                );
              }
            })
          );
        }

        await Promise.all(batchPromises);
      }

      if (cancelled) return;

      imagesRef.current = images;

      setLoadProgress(100);
      setIsLoading(false);

      requestAnimationFrame(() => {
        resizeCanvas();
        renderFrame(0);
      });
    };

    preloadFrames();

    return () => {
      cancelled = true;
    };
  }, [renderFrame, resizeCanvas]);

  /**
   * Canvas resizing.
   */
  useEffect(() => {
    resizeCanvas();

    let resizeRaf: number | null = null;

    const handleResize = () => {
      if (resizeRaf !== null) {
        cancelAnimationFrame(resizeRaf);
      }

      resizeRaf = requestAnimationFrame(() => {
        resizeCanvas();

        ScrollTrigger.refresh();

        resizeRaf = null;
      });
    };

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", handleResize);

      if (resizeRaf !== null) {
        cancelAnimationFrame(resizeRaf);
      }
    };
  }, [resizeCanvas]);

  /**
   * GSAP ScrollTrigger.
   */
  useGSAP(
    () => {
      if (isLoading) return;
      if (!containerRef.current) return;

      /**
       * Instead of animating an object with a timeline,
       * calculate the exact frame directly from ScrollTrigger progress.
       *
       * progress:
       * 0.0 = frame 1
       * 0.5 = frame 120
       * 1.0 = frame 240
       */
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,

        start: "top top",

        end: () =>
          `+=${window.innerHeight * SCROLL_DISTANCE}`,

        pin: true,

        // Slight smoothing while still feeling connected to scroll.
        scrub: 0.65,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(
              progress * TOTAL_FRAMES
            )
          );

          requestFrameRender(frameIndex);
        },

        onEnter: () => {
          requestFrameRender(0);
        },

        onLeave: () => {
          // Guarantee final image is displayed.
          requestFrameRender(TOTAL_FRAMES - 1);
        },

        onEnterBack: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(
              self.progress * TOTAL_FRAMES
            )
          );

          requestFrameRender(frameIndex);
        },

        onLeaveBack: () => {
          requestFrameRender(0);
        },
      });

      // Ensure canvas starts with frame 1.
      requestFrameRender(0);

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();

        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    },
    {
      scope: containerRef,
      dependencies: [
        isLoading,
        requestFrameRender,
      ],
    }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* FRAME CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* OPTIONAL CINEMATIC OVERLAY */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-gradient-to-b
          from-black/10
          via-transparent
          to-black/20
        "
      />

      {/* LOADER */}
      {isLoading && (
        <div
          className="
            absolute
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black
          "
        >
          <div className="flex flex-col items-center">
            <div
              className="
                mb-6
                h-10
                w-10
                animate-spin
                rounded-full
                border-2
                border-white/20
                border-t-white
              "
            />

            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/80">
              Loading Experience
            </p>

            <p className="mt-3 text-xs tabular-nums text-white/40">
              {loadProgress}%
            </p>

            {/* PROGRESS LINE */}
            <div className="mt-5 h-px w-40 overflow-hidden bg-white/10">
              <div
                className="h-full bg-white transition-[width] duration-200"
                style={{
                  width: `${loadProgress}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

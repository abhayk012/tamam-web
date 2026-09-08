"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 60;

/**
 * Generates the frame file URL based on 1-based index.
 * Adjust format/padding string pattern below if needed (e.g. `frame_${String(index).padStart(3, '0')}.png`).
 */
const getFrameUrl = (index: number): string => {
  // Adjust this comment/code depending on your file naming scheme:
  // Option A (Padded 3-digit): `/heroframeslap/frame_${String(index).padStart(3, "0")}.png`
  // Option B (Simple integer): `/heroframeslap/${index}.png`
  const paddedIndex = String(index).padStart(3, "0");
  return `/heroframeslap/frame_${paddedIndex}.png`;
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Helper function to render a given image onto canvas using object-fit: cover math
  const renderFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (!imgWidth || !imgHeight) return;

    // Calculate aspect ratios for object-fit: cover behavior
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Preload frames effect
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      const onImageLoad = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));

        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      img.onload = onImageLoad;
      img.onerror = onImageLoad; // Continue progress even if an image fails

      loadedImages.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Window resize handler to update canvas internal dimensions & re-render frame
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Re-render current active image frame if images are ready
      if (images.length > 0) {
        // Render first frame as fallback on resize if needed
        renderFrame(images[0]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      renderFrame(images[0]);
    }
  }, [isLoaded, images]);

  // GSAP ScrollTrigger timeline setup using @gsap/react
  useGSAP(
    () => {
      if (!isLoaded || images.length === 0) return;

      const frameObj = { currentFrame: 0 };

      gsap.to(frameObj, {
        currentFrame: TOTAL_FRAMES - 1,
        snap: "currentFrame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.5,
        },
        onUpdate: () => {
          const frameIndex = Math.round(frameObj.currentFrame);
          if (images[frameIndex]) {
            renderFrame(images[frameIndex]);
          }
        },
      });
    },
    { dependencies: [isLoaded, images], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium tracking-widest uppercase">
            Loading {loadingProgress}%
          </p>
        </div>
      )}

      {/* Frame Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
          Experience Next Generation
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl drop-shadow-md">
          Scroll down to explore the seamless frame sequence animation.
        </p>
      </div>
    </div>
  );
}

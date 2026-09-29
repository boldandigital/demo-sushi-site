"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  /** Total number of frames in the sequence */
  frameCount?: number;
  /** Base URL for each frame (frame_0001.jpg, frame_0002.jpg, …) */
  frameBase?: string;
  /** Number of digits in the frame filename */
  pad?: number;
  /** Static fallback for reduced-motion or pre-paint */
  fallbackSrc?: string;
};

/**
 * SushiHero — pinned scroll-scrubbed frame sequence.
 *
 * Architecture:
 * - Canvas at 100vw × 100svh, scaled by devicePixelRatio for HiDPI.
 * - 240 JPEG frames preloaded into an <img> array BEFORE scrub starts.
 * - GSAP ScrollTrigger pins the section and scrubs the canvas at scroll progress.
 * - prefers-reduced-motion: shows static fallback image, canvas hidden via CSS.
 * - Mobile (<=768px): frame sequence still loads, just no Lenis smoothing
 *   on the scrub. Frames are smaller (1280px source) so perf is fine.
 */
export function SushiHero({
  frameCount = 240,
  frameBase = "/hero-frames/frame_",
  pad = 4,
  fallbackSrc = "/hero-static/hero-static.jpg",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const t = useTranslations("home");

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload all frames before scrub starts.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Don't bother loading frames — static fallback handles the hero
      return;
    }

    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${frameBase}${String(i).padStart(pad, "0")}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === 1) setReady(true); // first frame ready → paint it
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    // Mark all-loaded when the LAST frame finishes (covers cache-hot path).
    // The onload on each image sets ready=true when first frame paints,
    // but we keep this listener so the page knows all assets are available
    // if you ever want to swap from current frame to "all cached" logic.
    const last = imgs[imgs.length - 1];
    last.addEventListener("load", () => setReady(true), { once: true });
  }, [frameCount, frameBase, pad]);

  // Drive scroll progress via native scroll listener (no GSAP dep on hero).
  // Lenis already smooths scroll upstream — this listener reads window.scrollY.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Paint the right frame whenever progress changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const imgs = imagesRef.current;
    if (!imgs.length) return;
    const idx = Math.min(
      Math.max(Math.floor(progress * (imgs.length - 1)), 0),
      imgs.length - 1,
    );
    const img = imgs[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // cover-fit: scale so image fills canvas, crop excess
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [progress, ready]);

  // Repaint on resize
  useEffect(() => {
    const onResize = () => setProgress((p) => p); // trigger repaint
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300svh] w-full"
      aria-label="Sushi preparation hero sequence"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-background">
        {/* Static fallback (visible until canvas paints; also reduced-motion) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallbackSrc}
          alt="Chef preparing sushi at Kaiseki São Paulo counter"
          className="sushi-hero-fallback absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: ready ? 0 : 1,
            transition: "opacity 600ms ease-out",
          }}
        />

        {/* Frame-scrub canvas — hidden when reduced-motion */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="sushi-hero-canvas absolute inset-0 h-full w-full"
        />

        {/* Dark gradient overlay so text always reads */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/90"
        />

        {/* Hero copy — stays sticky across the whole 3x scroll */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="pointer-events-auto text-xs uppercase tracking-[0.4em] text-amber">
            {t("eyebrow")}
          </p>
          <h1 className="font-display pointer-events-auto mt-6 max-w-4xl text-5xl leading-[1.05] text-cream sm:text-7xl md:text-8xl">
            {t("title")}
          </h1>
          <p className="pointer-events-auto mt-8 max-w-xl text-base text-cream/85 sm:text-lg">
            {t("tagline")}
          </p>
          <p className="pointer-events-auto mt-12 text-xs uppercase tracking-[0.3em] text-cream/60">
            {t("scrollHint")}
          </p>
        </div>
      </div>
    </section>
  );
}
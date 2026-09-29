"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MagneticButton } from "@/components/MagneticButton";

/**
 * ChefStory — full-bleed portrait + scroll-reveal paragraphs.
 * Portrait comes from /public/story/chef-portrait.jpg
 * (Wikimedia Commons, CC-BY-SA, attribution in footer).
 */
export function ChefStory() {
  const t = useTranslations("story");
  const sectionRef = useRef<HTMLElement | null>(null);

  // Reveal-on-scroll for each paragraph using IntersectionObserver.
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-6");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const paragraphs = ["p1", "p2", "p3", "p4"] as const;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      {/* Top eyebrow + title */}
      <header className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:pb-24">
        <p className="text-xs uppercase tracking-[0.4em] text-amber">{t("eyebrow")}</p>
        <h2 className="font-display mt-6 text-5xl leading-tight text-cream sm:text-6xl md:text-7xl">
          {t("title")}
        </h2>
      </header>

      {/* Full-bleed portrait */}
      <div className="relative h-[70svh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/story/chef-portrait.jpg"
          alt="Chef at Kaiseki São Paulo working the omakase counter"
          className="h-full w-full object-cover object-[center_30%]"
          loading="lazy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background"
        />
      </div>

      {/* Story body — paragraphs reveal on scroll */}
      <div className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        {paragraphs.map((p, i) => (
          <p
            key={p}
            data-reveal
            className="mb-8 text-lg leading-relaxed text-cream/85 opacity-0 translate-y-6 transition-all duration-700 ease-out sm:text-xl"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {t(p)}
          </p>
        ))}

        <div
          data-reveal
          className="mt-16 border-t border-border/60 pt-8 opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          <p className="font-display text-3xl text-amber">{t("signature")}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cream/60">
            {t("signatureSub")}
          </p>
        </div>
      </div>

      {/* Bottom CTA to reserve */}
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-32 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-amber">{t("ctaEyebrow")}</p>
        <h3 className="font-display mt-4 text-3xl text-cream sm:text-4xl">
          {t("ctaTitle")}
        </h3>
        <Link
          href="/reserve"
          className="mt-10 inline-block rounded-full border border-amber bg-amber px-8 py-4 text-sm uppercase tracking-[0.2em] text-background transition-colors hover:bg-transparent hover:text-amber"
        >
          <MagneticButton className="bg-transparent p-0 text-inherit">
            {t("ctaButton")}
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
}
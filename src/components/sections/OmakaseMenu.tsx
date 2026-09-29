"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * OmakaseMenu — sticky-scroll course narrative.
 *
 * On desktop: left column sticks (course # + Japanese name),
 * right column scrolls through 12 course descriptions.
 * On mobile: stacked, no sticky (just normal flow).
 */
export function OmakaseMenu() {
  const t = useTranslations("menu");
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const courses = [
    { id: "sakizuke", romaji: "Sakizuke" },
    { id: "mukozuke", romaji: "Mukozuke" },
    { id: "wanmono", romaji: "Wanmono" },
    { id: "hassun", romaji: "Hassun" },
    { id: "mizumono", romaji: "Mizumono" },
    { id: "nimono", romaji: "Nimono" },
    { id: "yakimono", romaji: "Yakimono" },
    { id: "shiizakana", romaji: "Shiizakana" },
    { id: "sushi", romaji: "Omae-sushi" },
    { id: "takiawase", romaji: "Takiawase" },
    { id: "tomewan", romaji: "Tomewan" },
    { id: "mizumochi", romaji: "Mizumochi" },
  ] as const;

  // Track which course is currently in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll<HTMLElement>("[data-course-card]");
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-course-idx"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Section header */}
      <header className="mx-auto max-w-6xl px-6 pb-24 pt-32 text-center sm:pb-32">
        <p className="text-xs uppercase tracking-[0.4em] text-amber">{t("eyebrow")}</p>
        <h2 className="font-display mt-6 text-5xl leading-tight text-cream sm:text-6xl md:text-7xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base text-cream/75 sm:text-lg">
          {t("intro")}
        </p>
      </header>

      {/* Sticky-scroll body */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-32 md:grid-cols-[260px_1fr] md:gap-20">
        {/* Sticky left: course index */}
        <aside
          ref={stickyRef}
          className="hidden md:block"
        >
          <div className="sticky top-32">
            <p className="text-xs uppercase tracking-[0.3em] text-amber/70">
              {t("courseIndex")}
            </p>
            <ol className="mt-6 space-y-2 font-display text-3xl">
              {courses.map((c, i) => {
                const isActive = i === activeIndex;
                return (
                  <li
                    key={c.id}
                    className={`transition-all duration-500 ${
                      isActive
                        ? "translate-x-2 text-amber"
                        : "translate-x-0 text-cream/30"
                    }`}
                  >
                    <span className="mr-3 font-sans text-xs uppercase tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.romaji}
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        {/* Scrolling right: course cards */}
        <div className="space-y-32 sm:space-y-40">
          {courses.map((c, i) => {
            // Access nested keys directly — next-intl returns the raw value
            const course = {
              name: t(`courses.${c.id}.name`),
              description: t(`courses.${c.id}.description`),
              ingredients: t(`courses.${c.id}.ingredients`),
            };
            return (
              <article
                key={c.id}
                data-course-card
                data-course-idx={i}
                className="border-t border-border/60 pt-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-amber/70">
                    {String(i + 1).padStart(2, "0")} / 12
                  </span>
                  <span className="font-display text-xs uppercase tracking-[0.2em] text-cream/50">
                    {c.romaji}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-4xl leading-tight text-cream sm:text-5xl">
                  {course.name}
                </h3>
                <p className="mt-6 max-w-xl text-base text-cream/80 sm:text-lg">
                  {course.description}
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-amber">
                  {course.ingredients}
                </p>
              </article>
            );
          })}

          <div className="border-t border-border/60 pt-8 text-center">
            <p className="font-display text-2xl text-cream/70">{t("closing")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
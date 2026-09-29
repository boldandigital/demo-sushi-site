"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * HomeIntro — brief tagline + CTA to /menu, sits below the frame-scrub hero.
 */
export function HomeIntro() {
  const t = useTranslations("home");
  return (
    <section className="relative bg-background px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-2xl italic text-amber/80">
          &ldquo;{t("tagline")}&rdquo;
        </p>
        <Link
          href="/menu"
          className="mt-12 inline-flex items-center gap-3 rounded-full border border-amber bg-transparent px-8 py-4 text-sm uppercase tracking-[0.2em] text-amber transition-all duration-300 hover:bg-amber hover:text-background hover:shadow-[0_0_40px_rgba(212,165,116,0.4)]"
        >
          {t("scrollHint")}
        </Link>
      </div>
    </section>
  );
}
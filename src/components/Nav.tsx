"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useState, useTransition } from "react";

/**
 * Nav — minimal top nav. Left: B&D mark. Center: route links.
 * Right: locale switcher (EN / NL / PT-BR) + dark mode toggle.
 *
 * Locale switcher preserves the current pathname so the user stays on the
 * same page after switching language.
 */
export function Nav() {
  const t = useTranslations("nav");
  const tl = useTranslations("locale");
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function switchLocale(locale: (typeof routing.locales)[number]) {
    startTransition(() => {
      router.replace(pathname, { locale });
      setOpen(false);
    });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-base tracking-tight text-cream"
        >
          Kaiseki São Paulo
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/"
            className="font-display text-sm text-cream/80 transition-colors hover:text-amber"
          >
            {t("home")}
          </Link>
          <Link
            href="/menu"
            className="font-display text-sm text-cream/80 transition-colors hover:text-amber"
          >
            {t("menu")}
          </Link>
          <Link
            href="/story"
            className="font-display text-sm text-cream/80 transition-colors hover:text-amber"
          >
            {t("story")}
          </Link>
          <Link
            href="/reserve"
            className="font-display text-sm text-cream/80 transition-colors hover:text-amber"
          >
            {t("reserve")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              aria-label={tl("switcher")}
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-cream/70 transition-colors hover:text-amber"
            >
              <span aria-hidden>🌐</span>
              <span className="uppercase">{(pathname.split("/")[1] || "en")}</span>
              <span aria-hidden>▾</span>
            </button>
            {open && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 w-40 overflow-hidden rounded-md border border-border bg-surface shadow-sm"
              >
                {routing.locales.map((loc) => (
                  <li key={loc}>
                    <button
                      type="button"
                      onClick={() => switchLocale(loc)}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-cream hover:bg-muted"
                    >
                      <span>{tl(loc)}</span>
                      <span className="text-xs uppercase text-cream/60">{loc}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

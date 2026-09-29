import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

/**
 * Footer — brand mark, tagline, locale switcher, image credits.
 * Server component (renders inside the locale layout).
 */
export function Footer() {
  const t = useTranslations("footer");
  const tl = useTranslations("locale");

  return (
    <footer className="mt-32 border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="font-display text-lg tracking-tight text-cream">
            {t("mark")}
          </p>
          <p className="mt-1 text-xs text-cream/60">{t("tagline")}</p>
          <p className="mt-4 max-w-md text-[10px] leading-relaxed text-cream/40">
            {t("credits")}
          </p>
        </div>

        <ul className="flex items-center gap-3">
          {routing.locales.map((loc) => (
            <li key={loc}>
              <Link
                href={getPathname({ locale: loc, href: "/" })}
                className="rounded-md border border-border px-2 py-1 text-xs uppercase text-cream/70 transition-colors hover:text-amber"
                aria-label={tl(loc)}
              >
                {loc}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
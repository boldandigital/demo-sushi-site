"use client";

import { useTranslations } from "next-intl";

type Props = {
  /** E.164 phone, no + or spaces. Default is B&D placeholder — replace per demo. */
  phone?: string;
};

/**
 * ReservationCTA — primary WhatsApp deep-link CTA.
 * Builds wa.me URL with locale-specific pre-filled message + visible phone/email.
 */
export function ReservationCTA({ phone = "5511999999999" }: Props) {
  const t = useTranslations("reserve");
  const message = t("message");
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-amber">{t("eyebrow")}</p>
        <h1 className="font-display mt-6 text-5xl leading-tight text-cream sm:text-6xl md:text-7xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-base text-cream/80 sm:text-lg">
          {t("body")}
        </p>

        <div className="mt-12 flex flex-col items-center gap-6">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-amber bg-amber px-10 py-5 text-base uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-transparent hover:text-amber hover:shadow-[0_0_40px_rgba(212,165,116,0.4)]"
          >
            {/* WhatsApp glyph */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            {t("cta")}
          </a>
          <p className="text-xs uppercase tracking-[0.3em] text-cream/50">
            {t("note")}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-border/60 pt-12 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber">{t("hours")}</p>
            <p className="mt-3 font-display text-xl text-cream">{t("hoursValue")}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber">{t("address")}</p>
            <p className="mt-3 font-display text-xl text-cream">{t("addressValue")}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber">{t("seats")}</p>
            <p className="mt-3 font-display text-xl text-cream">{t("seatsValue")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
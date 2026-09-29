import { setRequestLocale } from "next-intl/server";
import { SushiHero } from "@/components/hero-sequence/SushiHero";
import { HomeIntro } from "@/components/sections/HomeIntro";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SushiHero />
      <HomeIntro />
    </>
  );
}
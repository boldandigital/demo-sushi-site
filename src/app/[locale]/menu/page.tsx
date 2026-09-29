import { setRequestLocale } from "next-intl/server";
import { OmakaseMenu } from "@/components/sections/OmakaseMenu";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <OmakaseMenu />;
}
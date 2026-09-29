import { setRequestLocale } from "next-intl/server";
import { ReservationCTA } from "@/components/ui/ReservationCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ReservePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReservationCTA />;
}
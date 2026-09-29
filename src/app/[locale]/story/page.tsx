import { setRequestLocale } from "next-intl/server";
import { ChefStory } from "@/components/sections/ChefStory";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ChefStory />;
}
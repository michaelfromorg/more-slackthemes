import { HomeClient } from "@/components/HomeClient";
import { StructuredData } from "@/components/seo/StructuredData";
import { ThemeSeoContent } from "@/components/seo/ThemeSeoContent";

export default function Home() {
  return (
    <>
      <ThemeSeoContent />
      <StructuredData />
      <HomeClient />
    </>
  );
}

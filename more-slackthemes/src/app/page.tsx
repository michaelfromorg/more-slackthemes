"use client";

import { ChannelHeader } from "@/components/layout/ChannelHeader";
import { ThemeGrid } from "@/components/themes/ThemeGrid";
import { ThemeShare } from "@/components/themes/ThemeShare";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <ChannelHeader />
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <ThemeGrid />
        </div>
      </div>
      <ThemeShare />
    </div>
  );
}

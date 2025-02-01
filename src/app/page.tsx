"use client";

import { ChannelHeader } from "@/components/layout/ChannelHeader";
import { ThemeGrid } from "@/components/themes/ThemeGrid";
import { ThemeGridMobile } from "@/components/themes/ThemeGridMobile";
import { ThemeShare } from "@/components/themes/ThemeShare";
import { ThemeShareMobile } from "@/components/themes/ThemeShareMobile";
import { useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex flex-col">
      <ChannelHeader />
      <div className="flex-1 overflow-auto">
        {isMobile ? <ThemeGridMobile /> : <ThemeGrid />}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4">
        {isMobile ? <ThemeShareMobile /> : <ThemeShare />}
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface CopyThemeButtonProps {
  themeString: string;
}

/**
 * Copies a theme's color string to the clipboard and opens the Slack app so
 * the user can paste it. Standalone (no store dependency) for use on the
 * per-theme detail pages.
 */
export function CopyThemeButton({ themeString }: CopyThemeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(themeString);
      setCopied(true);
      window.location.href = "slack://open";
    } catch (err) {
      console.error("Failed to copy theme:", err);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-[#4A154B] hover:bg-[#611f69] text-white"
    >
      {copied ? "Copied!" : "Copy & open Slack"}
      <ExternalLink className="w-4 h-4 ml-2" />
    </Button>
  );
}

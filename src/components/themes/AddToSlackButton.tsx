import { Button } from "@/components/ui/button";
import { useThemeAnalytics } from "@/hooks/useThemeAnalytics";
import useThemeStore from "@/store/theme-store";
import { ExternalLink } from "lucide-react";
import { useCallback } from "react";

interface AddToSlackButtonProps {
  className?: string;
}

export function AddToSlackButton({ className }: AddToSlackButtonProps) {
  const { trackThemeApply } = useThemeAnalytics();
  const { getCurrentThemeString, currentTheme } = useThemeStore();

  const handleAddToSlack = useCallback(async () => {
    try {
      // Copy theme string
      await navigator.clipboard.writeText(getCurrentThemeString());
      // Open Slack
      window.location.href = "slack://open";

      trackThemeApply(currentTheme);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  }, [currentTheme, getCurrentThemeString, trackThemeApply]);

  return (
    <Button
      onClick={handleAddToSlack}
      className={`bg-[#4A154B] hover:bg-[#611f69] text-white ${className}`}
    >
      <div className="flex items-center gap-2">
        Copy & Go to Slack
        <ExternalLink className="w-4 h-4" />
      </div>
    </Button>
  );
}

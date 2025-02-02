// components/themes/ThemeShareMobile.tsx
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useThemeAnalytics } from "@/hooks/useThemeAnalytics";
import { generateThemeString } from "@/lib/theme-utils";
import useThemeStore from "@/store/theme-store";
import { Copy, ExternalLink, Share2 } from "lucide-react";
import { useState } from "react";

export function ThemeShareMobile() {
  const { currentTheme } = useThemeStore();
  const { trackThemeApply } = useThemeAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const themeString = generateThemeString(currentTheme);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(themeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleOpenSlack = async () => {
    try {
      await navigator.clipboard.writeText(themeString);
      window.location.href = "slack://open";
      trackThemeApply(currentTheme);
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const canShare = navigator.share !== undefined;

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: `Slack Theme: ${currentTheme.name}`,
          text: themeString,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Failed to share:", err);
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Share2 className="w-4 h-4 mr-2" />
          Share Theme
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[70vh] rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Share Theme</SheetTitle>
          <SheetDescription>
            {currentTheme.windowGradient
              ? "Copy these colors and gradient to use in Slack."
              : "Copy these colors to use in Slack."}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Color Preview */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <ColorPreview
                label="System Navigation"
                color={currentTheme.colors.systemNavigation}
              />
              <ColorPreview
                label="Selected Items"
                color={currentTheme.colors.selectedItems}
              />
              <ColorPreview
                label="Presence"
                color={currentTheme.colors.presenceIndication}
              />
              <ColorPreview
                label="Notifications"
                color={currentTheme.colors.notifications}
              />
            </div>
            {currentTheme.windowGradient && (
              <div className="mt-4">
                <GradientPreview
                  start={currentTheme.colors.inferred.gradientStart!}
                  end={currentTheme.colors.inferred.gradientEnd!}
                />
              </div>
            )}
          </div>

          {/* Theme String */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Theme String</h3>
            <div className="p-3 bg-gray-100 rounded-md">
              <code className="text-sm break-all">{themeString}</code>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              className="w-full bg-[#4A154B] hover:bg-[#611f69] text-white"
              onClick={handleOpenSlack}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Copy & Open Slack
            </Button>
            <Button variant="outline" className="w-full" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy Theme String"}
            </Button>
            {canShare && (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Theme
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface ColorPreviewProps {
  label: string;
  color: string;
}

function ColorPreview({ label, color }: ColorPreviewProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-6 h-6 rounded-full border border-gray-200"
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col">
        <span className="text-sm">{label}</span>
        <span className="text-xs text-gray-500">{color}</span>
      </div>
    </div>
  );
}

interface GradientPreviewProps {
  start: string;
  end: string;
}

function GradientPreview({ start, end }: GradientPreviewProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-6 rounded border border-gray-200"
        style={{
          background: `linear-gradient(to right, ${start}, ${end})`,
        }}
      />
      <div className="flex flex-col">
        <span className="text-sm">Window Gradient</span>
        <span className="text-xs text-gray-500">
          {start} → {end}
        </span>
      </div>
    </div>
  );
}

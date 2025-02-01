// components/themes/ThemeShare.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useThemeAnalytics } from "@/hooks/useThemeAnalytics";
import { generateThemeString } from "@/lib/theme-utils";
import useThemeStore from "@/store/theme-store";
import { ExternalLink, ImagePlus } from "lucide-react";
import { useState } from "react";
import { ThemeGenerator } from "./ThemeGenerator";

function ResponsiveButton({ children, icon, ...props }: any) {
  return (
    <Button {...props}>
      <span className="hidden sm:flex items-center gap-2">
        {children}
        {icon}
      </span>
      <span className="sm:hidden">{icon}</span>
    </Button>
  );
}

export function ThemeShare() {
  const { currentTheme } = useThemeStore();
  const { trackThemeApply } = useThemeAnalytics();
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  // Generate theme string in new format
  const themeString = generateThemeString(currentTheme);

  const handleAddToSlack = async () => {
    try {
      await navigator.clipboard.writeText(themeString);
      window.location.href = "slack://open";
      trackThemeApply(currentTheme);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  // Create description based on whether gradient is enabled
  const description = `Copy and paste ${
    currentTheme.windowGradient ? "these colors and gradient" : "these colors"
  } into Slack to import this theme.`;

  return (
    <div className="p-4 border-t bg-white w-full">
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1 min-w-0">
          <Input
            value={themeString}
            readOnly
            className="font-mono text-sm w-full"
            title={`Theme colors: ${themeString}`}
          />
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <ResponsiveButton
            onClick={handleAddToSlack}
            className="shrink-0 bg-[#4A154B] hover:bg-[#611f69] text-white"
            icon={<ExternalLink className="w-4 h-4" />}
          >
            Copy & Go to Slack
          </ResponsiveButton>
          <ResponsiveButton
            variant="outline"
            size="default"
            className="shrink-0"
            onClick={() => setIsGeneratorOpen(true)}
            icon={<ImagePlus className="w-4 h-4" />}
          >
            Generate theme
          </ResponsiveButton>
        </div>
      </div>

      {/* Color Preview Section */}
      <div className="mt-4 flex flex-wrap gap-2">
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
        {currentTheme.windowGradient && (
          <GradientPreview
            start={currentTheme.colors.inferred.gradientStart!}
            end={currentTheme.colors.inferred.gradientEnd!}
          />
        )}
      </div>

      <ThemeGenerator
        open={isGeneratorOpen}
        onOpenChange={setIsGeneratorOpen}
      />
    </div>
  );
}

interface ColorPreviewProps {
  label: string;
  color: string;
}

function ColorPreview({ label, color }: ColorPreviewProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-full border border-gray-200"
        style={{ backgroundColor: color }}
        title={color}
      />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
}

interface GradientPreviewProps {
  start: string;
  end: string;
}

function GradientPreview({ start, end }: GradientPreviewProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-4 rounded border border-gray-200"
        style={{
          background: `linear-gradient(to right, ${start}, ${end})`,
        }}
        title={`Gradient: ${start} → ${end}`}
      />
      <span className="text-xs text-gray-600">Window Gradient</span>
    </div>
  );
}

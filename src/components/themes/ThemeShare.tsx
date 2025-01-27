import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <span className="sm:hidden">
        {icon}
      </span>
    </Button>
  );
}

export function ThemeShare() {
  const { getCurrentThemeString } = useThemeStore();
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  const handleAddToSlack = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentThemeString());
      window.location.href = 'slack://open';
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <p className="text-sm text-muted-foreground mb-2">
        Copy and paste these values into Slack to import this theme.
      </p>
      <div className="flex gap-2">
        <Input
          value={getCurrentThemeString()}
          readOnly
          className="font-mono text-sm"
        />
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
      <ThemeGenerator open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen} />
    </div>
  );
}

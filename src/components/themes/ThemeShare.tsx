import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useThemeStore from "@/store/theme-store";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { ThemeGenerator } from "./ThemeGenerator";

export function ThemeShare() {
  const [copied, setCopied] = useState(false);
  const { getCurrentThemeString } = useThemeStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentThemeString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-muted-foreground">
          Copy and paste these values into Slack to import this theme. (If you
          send a DM to yourself with this content, a magic{" "}
          {`'Apply Slack Theme'`}
          button will appear!)
        </p>
        <ThemeGenerator />
      </div>
      <div className="flex gap-2">
        <Input
          value={getCurrentThemeString()}
          readOnly
          className="font-mono text-sm"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className="shrink-0"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

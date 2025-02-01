// components/themes/ThemeGenerator.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useThemeAnalytics } from "@/hooks/useThemeAnalytics";
import { processTheme } from "@/lib/theme-utils";
import useThemeStore from "@/store/theme-store";
import { RawTheme } from "@/types/theme";
import chroma from "chroma-js";
import { AlertCircle, Upload } from "lucide-react";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

function extractDominantColors(imageEl: HTMLImageElement): chroma.Color[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  canvas.width = imageEl.width;
  canvas.height = imageEl.height;
  ctx.drawImage(imageEl, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  // const colors: chroma.Color[] = [];
  const colorMap = new Map<string, number>();

  // Sample colors at regular intervals
  for (let i = 0; i < imageData.length; i += 40) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    if (r !== undefined && g !== undefined && b !== undefined) {
      const color = chroma(r, g, b);
      const hex = color.hex();
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }
  }

  // Sort colors by frequency and convert back to chroma colors
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([hex]) => chroma(hex));

  return sortedColors;
}

function generateSlackTheme(
  colors: chroma.Color[],
  useGradient: boolean
): RawTheme {
  // Sort colors by luminance
  const sortedByLuminance = [...colors].sort(
    (a, b) => b.luminance() - a.luminance()
  );

  // Get dark colors for system navigation
  const darkColors = sortedByLuminance.filter((c) => c.luminance() < 0.3);
  // Get mid-range colors for selected items and presence
  const midColors = sortedByLuminance.filter(
    (c) => c.luminance() >= 0.3 && c.luminance() < 0.7
  );
  // Get bright colors for notifications
  const brightColors = sortedByLuminance.filter((c) => c.luminance() >= 0.7);

  // Select the most appropriate colors
  const systemNavigation = darkColors[0]?.hex() || "#1a1d21";
  const selectedItems = midColors[0]?.hex() || "#1164A3";
  const presenceIndication = midColors[1]?.hex() || "#2BAC76";
  const notifications = brightColors[0]?.hex() || "#CD2553";

  return {
    name: "Generated Theme",
    systemNavigation,
    selectedItems,
    presenceIndication,
    notifications,
    windowGradient: useGradient,
    submitterName: undefined,
    submitterLink: undefined,
    tags: "generated",
  };
}

interface ThemeGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeGenerator({ open, onOpenChange }: ThemeGeneratorProps) {
  const { trackThemeView } = useThemeAnalytics();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useGradient, setUseGradient] = useState(false);
  const { setCurrentTheme } = useThemeStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 5MB");
      return;
    }

    setIsLoading(true);

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        try {
          const colors = extractDominantColors(img);
          const rawTheme = generateSlackTheme(colors, useGradient);
          const newTheme = processTheme(rawTheme);

          setCurrentTheme(newTheme);
          trackThemeView(newTheme);
          onOpenChange(false);
        } catch (error) {
          console.error("Error generating theme:", error);
          setError("Failed to generate theme. Please try a different image.");
        } finally {
          setIsLoading(false);
        }
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setError("Failed to read image file");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate theme from logo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isLoading
                    ? "Generating theme..."
                    : "Upload a logo to generate a theme"}
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="gradient-mode"
              checked={useGradient}
              onCheckedChange={setUseGradient}
            />
            <Label htmlFor="gradient-mode">Use window gradient</Label>
          </div>

          <p className="text-xs text-muted-foreground">
            Upload your workspace logo (max 5MB) to automatically generate a
            matching Slack theme. The generator will create a theme with:
            <ul className="mt-2 list-disc list-inside">
              <li>System Navigation color (from darkest colors)</li>
              <li>Selected Items color (from mid-range colors)</li>
              <li>Presence Indication (from mid-range colors)</li>
              <li>Notifications (from brightest colors)</li>
              {useGradient && <li>Window gradient effect</li>}
            </ul>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

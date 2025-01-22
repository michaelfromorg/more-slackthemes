import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { processTheme } from "@/lib/theme-utils";
import useThemeStore from "@/store/theme-store";
import chroma from "chroma-js";
import { AlertCircle, ImagePlus, Upload } from "lucide-react";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

function extractColors(imageEl: any) {
  // Create a canvas to draw the image
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  canvas.width = imageEl.width;
  canvas.height = imageEl.height;

  // Draw image on canvas
  ctx.drawImage(imageEl, 0, 0);

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // Sample colors from the image (every 10th pixel)
  const colors = [];
  for (let i = 0; i < imageData.length; i += 40) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    if (r !== undefined && g !== undefined && b !== undefined) {
      colors.push(chroma(r, g, b));
    }
  }

  return colors;
}

function generateTheme(colors: any) {
  // Sort colors by brightness
  const sortedColors = colors.sort(
    (a: any, b: any) => chroma(b).luminance() - chroma(a).luminance()
  );

  // Get most common colors in different luminance ranges
  const darkColors = sortedColors.filter(
    (c: any) => chroma(c).luminance() < 0.3
  );
  const midColors = sortedColors.filter(
    (c: any) => chroma(c).luminance() >= 0.3 && chroma(c).luminance() < 0.7
  );
  // const lightColors = sortedColors.filter(
  //   (c: any) => chroma(c).luminance() >= 0.7
  // );

  // Select colors for the theme
  const columnBg = darkColors[0]?.hex() || "#1a1d21";
  const menuBg =
    darkColors[Math.floor(darkColors.length / 2)]?.hex() || "#1a1d21";
  const activeItem = midColors[0]?.hex() || "#4a154b";
  const activeItemText = "#FFFFFF";
  const hoverItem = chroma(activeItem).brighten().hex();
  const textColor = "#FFFFFF";
  const activePresence =
    midColors[Math.floor(midColors.length / 2)]?.hex() || "#007a5a";
  const mentionBadge = midColors[midColors.length - 1]?.hex() || "#dc2626";

  return [
    columnBg,
    menuBg,
    activeItem,
    activeItemText,
    hoverItem,
    textColor,
    activePresence,
    mentionBadge,
  ].join(",");
}

export function ThemeGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { setCurrentTheme } = useThemeStore();

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear any previous errors
    setError(null);

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 5MB");
      return;
    }

    setIsLoading(true);

    // Create image element to load the file
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        try {
          // Extract colors from the image
          const colors = extractColors(img);

          // Generate theme from colors
          const themeColors = generateTheme(colors);

          // Create and set the new theme
          const newTheme = processTheme({
            name: "Generated Theme",
            colors: themeColors,
          });

          setCurrentTheme(newTheme);

          // Close the dialog after successful generation
          setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ImagePlus className="w-4 h-4" />
          Generate a theme from your logo
        </Button>
      </DialogTrigger>
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
          <p className="text-xs text-muted-foreground">
            Upload your workspace logo (max 5MB) to automatically generate a
            matching Slack theme. The generator will analyze your {`logo's`}{" "}
            colors to create a harmonious theme. Results may vary, a lot!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

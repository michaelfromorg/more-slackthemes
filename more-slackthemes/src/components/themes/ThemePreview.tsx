import { Theme } from "@/types/theme";
import { Hash, CircleDot } from "lucide-react";
import useThemeStore from "@/store/theme-store";
import { mixColors, alphaColor } from "@/lib/theme-utils";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface ThemePreviewProps {
  theme: Theme;
  isSelected?: boolean;
}

export function ThemePreview({ theme, isSelected }: ThemePreviewProps) {
  const { parsedColors } = theme;

  return (
    <div className="flex flex-col rounded-md overflow-hidden border">
      <div className="relative">
        {/* Theme Preview */}
        <div className="w-full h-24">
          {/* Top Nav Preview */}
          <div
            className="h-4"
            style={{
              backgroundColor: parsedColors.topNavBg,
              boxShadow: `${alphaColor(
                parsedColors.textColor,
                0.1
              )} 0px 1px 0px 0px`,
            }}
          >
            <div
              className="w-12 h-3 mx-2 rounded-sm"
              style={{
                backgroundColor: mixColors(
                  parsedColors.topNavText,
                  parsedColors.topNavBg,
                  0.9
                ),
              }}
            />
          </div>

          {/* Sidebar Preview */}
          <div
            className="h-20 w-full flex"
            style={{ backgroundColor: parsedColors.columnBg }}
          >
            <div className="w-12 flex-shrink-0 py-1 px-2">
              <div className="w-8 h-8 rounded bg-gray-400" />
            </div>

            <div className="flex-1 p-1 space-y-1">
              {/* Channel Item */}
              <div
                className="h-4 rounded flex items-center px-1 gap-1"
                style={{ backgroundColor: parsedColors.activeItem }}
              >
                <Hash
                  className="w-3 h-3"
                  style={{ color: parsedColors.activeItemText }}
                />
                <div
                  className="w-12 h-2 rounded"
                  style={{ backgroundColor: parsedColors.activeItemText }}
                />
              </div>

              {/* DM Item */}
              <div className="h-4 rounded flex items-center px-1 gap-1">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-gray-400" />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: parsedColors.activePresence,
                      border: `2px solid ${parsedColors.columnBg}`,
                    }}
                  />
                </div>
                <div
                  className="w-12 h-2 rounded"
                  style={{
                    backgroundColor: mixColors(
                      parsedColors.textColor,
                      parsedColors.columnBg,
                      0.8
                    ),
                  }}
                />
              </div>

              {/* Mention Badge Example */}
              <div className="h-4 rounded flex items-center px-1 gap-1">
                <Hash
                  className="w-3 h-3"
                  style={{ color: parsedColors.textColor }}
                />
                <div
                  className="w-8 h-2 rounded"
                  style={{
                    backgroundColor: mixColors(
                      parsedColors.textColor,
                      parsedColors.columnBg,
                      0.8
                    ),
                  }}
                />
                <div
                  className="w-4 h-3 rounded-full"
                  style={{ backgroundColor: parsedColors.mentionBadge }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Theme Name and Radio - Now with explicit white background */}
        <div className="p-2 flex items-center justify-between bg-white border-t">
          <div className="flex items-center gap-2">
            <RadioGroupItem value={theme.slug} id={theme.slug} />
            <label
              htmlFor={theme.slug}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900"
            >
              {theme.name}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

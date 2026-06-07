// components/themes/ThemeMockup.tsx
import { alphaColor, mixColors } from "@/lib/theme-utils";
import { Theme } from "@/types/theme";
import { Hash } from "lucide-react";

interface ThemeMockupProps {
  theme: Theme;
}

/**
 * Presentational miniature of a Slack window painted in a theme's colors.
 * Shared by the grid card (ThemePreview) and the per-theme detail page so the
 * preview markup lives in one place.
 */
export function ThemeMockup({ theme }: ThemeMockupProps) {
  const { colors, windowGradient } = theme;
  const {
    systemNavigation,
    selectedItems,
    presenceIndication,
    notifications,
    inferred,
  } = colors;

  const backgroundStyle =
    windowGradient && inferred.gradientStart && inferred.gradientEnd
      ? {
          background: `linear-gradient(to bottom, ${inferred.gradientStart}, ${inferred.gradientEnd})`,
        }
      : {
          backgroundColor: systemNavigation,
        };

  return (
    <div className="w-full h-24">
      {/* Top Nav Preview */}
      <div
        className="h-4"
        style={{
          backgroundColor: systemNavigation,
          boxShadow: `${alphaColor(
            inferred.systemNavigationText,
            0.1
          )} 0px 1px 0px 0px`,
        }}
      >
        <div
          className="w-12 h-3 mx-2 rounded-sm"
          style={{
            backgroundColor: mixColors(
              inferred.systemNavigationText,
              systemNavigation,
              0.9
            ),
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="h-20 w-full flex">
        {/* Workspace Switcher */}
        <div
          className="w-8 flex-shrink-0 h-full flex flex-col items-center py-1 gap-1"
          style={backgroundStyle}
        >
          <div className="w-6 h-6 rounded bg-gray-400" />
          <div
            className="w-6 h-6 rounded"
            style={{
              backgroundColor: alphaColor(inferred.systemNavigationText, 0.2),
            }}
          />
        </div>

        {/* Channel Sidebar */}
        <div className="flex-1 flex" style={backgroundStyle}>
          <div className="flex-1 p-1 space-y-1">
            {/* Selected Channel Item */}
            <div
              className="h-4 rounded flex items-center px-1 gap-1"
              style={{
                backgroundColor: selectedItems,
                color: inferred.selectedItemsText,
              }}
            >
              <Hash className="w-3 h-3" />
              <div
                className="w-12 h-2 rounded"
                style={{ backgroundColor: inferred.selectedItemsText }}
              />
            </div>

            {/* Presence Indicator Example */}
            <div className="h-4 rounded flex items-center gap-1 px-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: presenceIndication }}
              />
              <div
                className="w-12 h-2 rounded"
                style={{
                  backgroundColor: alphaColor(
                    inferred.systemNavigationText,
                    0.6
                  ),
                }}
              />
            </div>

            {/* Notification Badge Example */}
            <div className="h-4 rounded flex items-center justify-between px-1">
              <div
                className="w-12 h-2 rounded"
                style={{
                  backgroundColor: alphaColor(
                    inferred.systemNavigationText,
                    0.6
                  ),
                }}
              />
              <div
                className="w-4 h-3 rounded-full"
                style={{ backgroundColor: notifications }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

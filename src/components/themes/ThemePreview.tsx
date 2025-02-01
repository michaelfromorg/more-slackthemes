// components/themes/ThemePreview.tsx
import { Badge } from "@/components/ui/badge";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { alphaColor, mixColors } from "@/lib/theme-utils";
import { Theme } from "@/types/theme";
import { ExternalLink, Hash } from "lucide-react";

interface ThemePreviewProps {
  theme: Theme;
  setActiveTag: (tag: string) => void;
}

export function ThemePreview({ theme, setActiveTag }: ThemePreviewProps) {
  const { colors, windowGradient } = theme;
  const {
    systemNavigation,
    selectedItems,
    presenceIndication,
    notifications,
    inferred,
  } = colors;

  // Create background style based on whether gradient is enabled
  const backgroundStyle =
    windowGradient && inferred.gradientStart && inferred.gradientEnd
      ? {
          background: `linear-gradient(to bottom, ${inferred.gradientStart}, ${inferred.gradientEnd})`,
        }
      : {
          backgroundColor: systemNavigation,
        };

  return (
    <div className="flex flex-col rounded-md overflow-hidden border h-full">
      <div className="relative">
        <div className="w-full h-24">
          {/* Top Nav Preview */}
          <div
            className="h-4"
            style={{
              ...backgroundStyle,
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
                  backgroundColor: alphaColor(
                    inferred.systemNavigationText,
                    0.2
                  ),
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

        {/* Theme Information Section */}
        <div className="p-2 space-y-2 border-t">
          {/* Theme Name and Radio */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem value={theme.slug} id={theme.slug} />
              <label
                htmlFor={theme.slug}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {theme.name}
              </label>
            </div>

            {/* Submitter Info */}
            {theme.submitter && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {theme.submitter.link ? (
                  <a
                    href={theme.submitter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    {theme.submitter.name}
                    <ExternalLink
                      className="w-3 h-3"
                      style={{ marginTop: 1 }}
                    />
                  </a>
                ) : (
                  <span>{theme.submitter.name}</span>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          {theme.tags && theme.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <TooltipProvider>
                {theme.tags.map((tag) => (
                  <Tooltip key={tag}>
                    <TooltipTrigger>
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0"
                        onClick={() => setActiveTag(tag)}
                      >
                        {tag}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter by {tag}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { alphaColor, mixColors } from "@/lib/theme-utils";
import { ExternalLink, Hash, User } from "lucide-react";

// Enhanced Theme type
interface Theme {
  name: string;
  slug: string;
  parsedColors: {
    menuBg: string;
    columnBg: string;
    activeItem: string;
    activeItemText: string;
    textColor: string;
    activePresence: string;
    mentionBadge: string;
    topNavText: string;
  };
  // New optional fields
  submitter?: {
    name: string;
    link?: string;
  };
  tags?: string[];
}

interface ThemePreviewProps {
  theme: Theme;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const { parsedColors } = theme;

  return (
    <div className="flex flex-col rounded-md overflow-hidden border h-full">
      <div className="relative">
        {/* Theme Preview - Same as before */}
        <div className="w-full h-24">
          {/* Top Nav Preview */}
          <div
            className="h-4"
            style={{
              backgroundColor: parsedColors.menuBg,
              boxShadow: `${alphaColor(parsedColors.textColor, 0.1)} 0px 1px 0px 0px`,
            }}
          >
            <div
              className="w-12 h-3 mx-2 rounded-sm"
              style={{
                backgroundColor: mixColors(parsedColors.topNavText, parsedColors.menuBg, 0.9),
              }}
            />
          </div>

          {/* Main Content Area */}
          <div className="h-20 w-full flex">
            {/* Workspace Switcher */}
            <div
              className="w-8 flex-shrink-0 h-full flex flex-col items-center py-1 gap-1"
              style={{ backgroundColor: parsedColors.menuBg }}
            >
              <div className="w-6 h-6 rounded bg-gray-400" />
              <div
                className="w-6 h-6 rounded"
                style={{
                  backgroundColor: alphaColor(parsedColors.textColor, 0.2),
                }}
              />
            </div>

            {/* Channel Sidebar */}
            <div
              className="flex-1 flex"
              style={{ backgroundColor: parsedColors.columnBg }}
            >
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

                {/* Other items remain the same... */}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Theme Information Section */}
        <div className="p-2 space-y-2 bg-white border-t">
          {/* Theme Name and Radio - First Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem value={theme.slug} id={theme.slug} />
              <label
                htmlFor={theme.slug}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900"
              >
                {theme.name}
              </label>
            </div>

            {/* Submitter Info - If exists */}
            {theme.submitter && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <User className="w-3 h-3" />
                {theme.submitter.link ? (
                  <a
                    href={theme.submitter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    {theme.submitter.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span>{theme.submitter.name}</span>
                )}
              </div>
            )}
          </div>

          {/* Tags - Second Row - Only shown if tags exist */}
          {theme.tags && theme.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <TooltipProvider>
                {theme.tags.map((tag) => (
                  <Tooltip key={tag}>
                    <TooltipTrigger>
                      <Badge variant="secondary" className="text-xs px-2 py-0">
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

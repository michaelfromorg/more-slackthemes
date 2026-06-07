// components/themes/ThemePreview.tsx
import { Badge } from "@/components/ui/badge";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Theme } from "@/types/theme";
import { ExternalLink } from "lucide-react";
import { ThemeMockup } from "./ThemeMockup";

interface ThemePreviewProps {
  theme: Theme;
  setActiveTag: (tag: string) => void;
}

export function ThemePreview({ theme, setActiveTag }: ThemePreviewProps) {
  return (
    <div className="flex flex-col rounded-md overflow-hidden border h-full">
      <div className="relative">
        <ThemeMockup theme={theme} />

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

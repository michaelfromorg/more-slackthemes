import { NOTION_FORM_URL } from "@/lib/constants";
import { alphaColor } from "@/lib/theme-utils";
import { getShortcutText } from "@/lib/utils";
import useThemeStore from "@/store/theme-store";
import { Search, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MobileNav } from "./MobileNav";

export function TopNav() {
  const { currentTheme, searchQuery, setSearchQuery } = useThemeStore();
  const { colors, windowGradient } = currentTheme;
  const { systemNavigation, inferred } = colors;

  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [shortcutText] = useState(getShortcutText("K"));

  // Create background style based on whether gradient is enabled
  const backgroundStyle =
    windowGradient && inferred.gradientStart && inferred.gradientEnd
      ? {
          background: `linear-gradient(to bottom, ${inferred.gradientStart}, ${inferred.gradientEnd})`,
        }
      : {
          backgroundColor: systemNavigation,
        };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      } else if (
        event.key === "Escape" &&
        document.activeElement === searchInputRef.current
      ) {
        searchInputRef.current?.blur();
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setSearchQuery]);

  return (
    <div
      className="flex items-center h-12 px-4 border-b"
      style={{
        ...backgroundStyle,
        color: inferred.systemNavigationText,
        borderColor: alphaColor(inferred.systemNavigationText, 0.1),
      }}
    >
      <div className="flex items-center gap-2">
        <MobileNav />
        <div className="hidden lg:block w-52" />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div
          className={`flex items-center w-full max-w-2xl h-8 px-3 rounded text-sm relative ${
            isFocused ? "ring-1 ring-white/30" : ""
          }`}
          style={{
            backgroundColor: alphaColor(inferred.systemNavigationText, 0.05),
            color: inferred.systemNavigationText,
          }}
        >
          <Search
            className="w-4 h-4 mr-2 shrink-0"
            style={{ opacity: isFocused ? 1 : 0.5 }}
          />
          <input
            ref={searchInputRef}
            type="text"
            className="flex-1 bg-transparent outline-none placeholder:text-inherit placeholder:opacity-50"
            placeholder={`Search themes... ${
              shortcutText !== "" ? `(${shortcutText})` : ""
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{ color: inferred.systemNavigationText }}
          />
          {searchQuery && (
            <button
              className="p-1 rounded hover:bg-black/10"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-3 h-3 opacity-50" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={NOTION_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded hover:bg-black/10"
          style={{ color: inferred.systemNavigationText }}
        >
          <span className="text-sm">Suggest a new theme!</span>
        </a>

        <button
          className="p-2 rounded hover:bg-black/10"
          style={{ color: inferred.systemNavigationText }}
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

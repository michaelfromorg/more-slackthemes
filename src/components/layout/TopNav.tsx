import { NOTION_FORM_URL } from "@/lib/constants";
import useThemeStore from "@/store/theme-store";
import chroma from "chroma-js";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  PlusCircle,
  Search,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function TopNav() {
  const { currentTheme, searchQuery, setSearchQuery } = useThemeStore();
  const { parsedColors } = currentTheme;
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      } else if (event.key === 'Escape' && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="flex items-center h-12 px-4 border-b"
      style={{
        backgroundColor: parsedColors.menuBg,
        color: parsedColors.textColor,
        borderColor: chroma(parsedColors.textColor).alpha(0.1).css(),
      }}
    >
      <div className="w-60" />

      <div className="flex-1 flex justify-center items-center">
        <div className="flex items-center gap-1 mr-2">
          <button
            className="p-2 rounded hover:bg-black/10 disabled:opacity-50"
            style={{ color: parsedColors.textColor }}
            disabled
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded hover:bg-black/10 disabled:opacity-50"
            style={{ color: parsedColors.textColor }}
            disabled
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          className="p-2 rounded hover:bg-black/10 mr-2"
          style={{ color: parsedColors.textColor }}
        >
          <Clock className="w-4 h-4" />
        </button>

        <div
          className={`flex items-center w-[720px] h-8 px-3 rounded text-sm relative ${isFocused ? "ring-1 ring-white/30" : ""}`}
          style={{
            backgroundColor: chroma(parsedColors.textColor).alpha(0.05).css(),
            color: parsedColors.textColor,
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
            placeholder="Search themes... (CTRL-K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{ color: parsedColors.textColor }}
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

      <div className="w-80 flex items-center gap-2 justify-end">
        <a
          href={NOTION_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 px-3 py-1.5 rounded hover:bg-black/10"
          style={{ color: parsedColors.textColor }}
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm">Submit a new theme!</span>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Add your theme to the collection
          </span>
        </a>
        <button
          className="p-2 rounded hover:bg-black/10"
          style={{ color: parsedColors.textColor }}
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          className="flex items-center gap-2 p-1 rounded hover:bg-black/10"
          style={{ color: parsedColors.textColor }}
        >
          <div className="relative">
            <div className="w-6 h-6 rounded bg-gray-300 overflow-hidden">
              <User className="w-full h-full p-1" />
            </div>
            <div
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2"
              style={{
                backgroundColor: parsedColors.activePresence,
                borderColor: parsedColors.menuBg,
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}

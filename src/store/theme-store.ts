import defaultThemes from "@/data/themes";
import { Theme } from "@/types/theme";
import { create } from "zustand";

interface ThemeStore {
  themes: Theme[];
  currentTheme: Theme;
  searchQuery: string;
  filteredThemes: Theme[];
  setCurrentTheme: (theme: Theme) => void;
  setSearchQuery: (query: string) => void;
  getCurrentThemeString: () => string;
  initializeFromUrl: () => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  themes: defaultThemes,
  currentTheme: defaultThemes[0],
  searchQuery: "",
  filteredThemes: defaultThemes,

  setCurrentTheme: (theme: Theme) => {
    // Update URL with theme slug
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("theme", theme.slug);
      window.history.replaceState({}, "", url.toString());
    }
    set({ currentTheme: theme });
  },

  setSearchQuery: (query: string) => {
    const searchQuery = query.toLowerCase();
    set({
      searchQuery,
      filteredThemes: searchQuery
        ? get().themes.filter((theme) =>
            theme.name.toLowerCase().includes(searchQuery)
          )
        : get().themes,
    });
  },

  getCurrentThemeString: () => {
    const { parsedColors } = get().currentTheme;
    return [
      parsedColors.columnBg,
      parsedColors.menuBg,
      parsedColors.activeItem,
      parsedColors.activeItemText,
      parsedColors.hoverItem,
      parsedColors.textColor,
      parsedColors.activePresence,
      parsedColors.mentionBadge,
      parsedColors.topNavBg,
      parsedColors.topNavText,
    ].join(",");
  },

  initializeFromUrl: () => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const themeSlug = url.searchParams.get("theme");

    if (themeSlug) {
      const theme = get().themes.find((t) => t.slug === themeSlug);
      if (theme) {
        set({ currentTheme: theme });
      }
    }
  },
}));

export default useThemeStore;

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
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  themes: defaultThemes,
  currentTheme: defaultThemes[0],
  searchQuery: "",
  filteredThemes: defaultThemes,
  setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
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
    return (
      [
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
      ]
        // .map((color) => color.replace("#", ""))
        .join(",")
    );
  },
}));

export default useThemeStore;

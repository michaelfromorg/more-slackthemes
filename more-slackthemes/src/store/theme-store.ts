import { create } from "zustand";
import { Theme } from "@/types/theme";
import defaultThemes from "@/data/themes";

interface ThemeStore {
  themes: Theme[];
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  getCurrentThemeString: () => string;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  themes: defaultThemes,
  currentTheme: defaultThemes[0],
  setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
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
    ]
      .map((color) => color.replace("#", ""))
      .join(",");
  },
}));

export default useThemeStore;

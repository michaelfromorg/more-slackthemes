import defaultThemes from "@/data/themes";
import { Theme } from "@/types/theme";
import { create } from "zustand";

interface ThemeStore {
  themes: Theme[];
  currentTheme: Theme;
  searchQuery: string;
  activeTag: string;
  filteredThemes: Theme[];
  setCurrentTheme: (theme: Theme) => void;
  setSearchQuery: (query: string) => void;
  setActiveTag: (tag: string) => void;
  getCurrentThemeString: () => string;
  initializeFromUrl: () => void;
  getAllTags: () => string[];
  getTagCount: (tag: string) => number;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  themes: defaultThemes,
  currentTheme: defaultThemes[0],
  searchQuery: "",
  activeTag: "general",
  filteredThemes: defaultThemes,

  setCurrentTheme: (theme: Theme) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("theme", theme.slug);
      window.history.replaceState({}, "", url.toString());
    }
    set({ currentTheme: theme });
  },

  setActiveTag: (tag: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tag === "general") {
        url.searchParams.delete("tag");
      } else {
        url.searchParams.set("tag", tag);
      }
      window.history.replaceState({}, "", url.toString());
    }

    set((state) => ({
      activeTag: tag,
      filteredThemes: state.themes.filter((theme) => {
        const matchesSearch = theme.name
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
        const matchesTag = tag === "general" || theme.tags?.includes(tag);
        return matchesSearch && matchesTag;
      }),
    }));
  },

  setSearchQuery: (query: string) => {
    const searchQuery = query.toLowerCase();
    set((state) => ({
      searchQuery,
      filteredThemes: state.themes.filter((theme) => {
        const matchesSearch = theme.name.toLowerCase().includes(searchQuery);
        const matchesTag =
          state.activeTag === "general" ||
          theme.tags?.includes(state.activeTag);
        return matchesSearch && matchesTag;
      }),
    }));
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
    const tag = url.searchParams.get("tag") || "general";

    if (themeSlug) {
      if (themeSlug === "generated-theme") {
        // TODO(michaelfromyeg): check this
        url.searchParams.delete("theme");
        window.history.replaceState({}, "", url.toString());
      } else {
        const theme = get().themes.find((t) => t.slug === themeSlug);
        if (theme) {
          set({ currentTheme: theme });
        }
      }
    }

    get().setActiveTag(tag);
  },

  getAllTags: () => {
    const { themes } = get();
    const tagsSet = new Set<string>();
    themes.forEach((theme) => {
      theme.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  },

  getTagCount: (tag: string) => {
    const { themes } = get();
    if (tag === "general") return themes.length;
    return themes.filter((theme) => theme.tags?.includes(tag)).length;
  },
}));

export default useThemeStore;

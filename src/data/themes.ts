// data/themes.ts
import { processTheme } from "@/lib/theme-utils";
import { Theme } from "@/types/theme";
import rawThemes from "./themes.json";

// Process themes at import time
export const themes: Theme[] = rawThemes.map(processTheme);

// Export default theme for initial state
export const defaultTheme = themes[0];

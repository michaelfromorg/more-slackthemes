import chroma from "chroma-js";
import { ParsedThemeColors, SlackTheme, Theme } from "@/types/theme";

export function parseThemeColors(colors: string): ParsedThemeColors {
  const colorArray = colors.split(",");

  return {
    columnBg: colorArray[0],
    menuBg: colorArray[1],
    activeItem: colorArray[2],
    activeItemText: colorArray[3],
    hoverItem: colorArray[4],
    textColor: colorArray[5],
    activePresence: colorArray[6],
    mentionBadge: colorArray[7],
    topNavBg: colorArray[8] || colorArray[1], // Fallback to menuBg
    topNavText: colorArray[9] || colorArray[5], // Fallback to textColor
  };
}

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function processTheme(theme: SlackTheme): Theme {
  return {
    ...theme,
    slug: createSlug(theme.name),
    parsedColors: parseThemeColors(theme.colors),
  };
}

export function mixColors(
  color1: string,
  color2: string,
  ratio: number
): string {
  return chroma.mix(color2, color1, ratio, "rgb").css();
}

export function alphaColor(color: string, alpha: number): string {
  return chroma(color).alpha(alpha).css();
}

// Helper for getting rgb version of a color
export function rgbColor(color: string): string {
  return chroma(color).css();
}

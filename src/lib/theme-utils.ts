// lib/theme-utils.ts
import { ParsedThemeColors, SlackTheme, Theme } from "@/types/theme";
import chroma from "chroma-js";

export function parseThemeColors(colors: string): ParsedThemeColors {
  const colorArray = colors.split(",");
  const menuBg = colorArray[1]; // Use the secondary color as workspace/top nav bg
  const columnBg = chroma(menuBg).brighten(0.3).hex(); // Lighten for main sidebar

  return {
    columnBg, // Lighter background for channel sidebar
    menuBg, // Darker background for workspace switcher
    activeItem: colorArray[2],
    activeItemText: colorArray[3],
    hoverItem: colorArray[4],
    textColor: colorArray[5],
    activePresence: colorArray[6],
    mentionBadge: colorArray[7],
    topNavBg: menuBg, // Match workspace switcher background
    topNavText: colorArray[5], // Use main text color
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

export function rgbColor(color: string): string {
  return chroma(color).css();
}

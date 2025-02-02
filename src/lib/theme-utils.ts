// lib/theme-utils.ts
import { InferredColors, RawTheme, Theme } from "@/types/theme";
import chroma from "chroma-js";

/**
 * Creates a URL-friendly slug from a theme name
 */
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Infers necessary colors from base Slack theme colors
 */
export function inferColors(
  systemNavigation: string,
  selectedItems: string
): InferredColors {
  return {
    // Text colors - use white or black based on contrast
    systemNavigationText:
      chroma.contrast(systemNavigation, "white") > 4.5 ? "#FFFFFF" : "#000000",
    selectedItemsText:
      chroma.contrast(selectedItems, "white") > 4.5 ? "#FFFFFF" : "#000000",

    // Sidebar states
    sidebarHover: chroma(systemNavigation).brighten(0.2).hex(),
    sidebarActive: chroma(systemNavigation).darken(0.1).hex(),
  };
}

/**
 * Creates gradient colors between two given colors
 */
export function createGradient(
  color1: string,
  color2: string
): {
  start: string;
  end: string;
} {
  return {
    start: chroma(color1).hex(),
    end: chroma(color2).hex(),
  };
}

/**
 * Processes a raw theme from CSV into our application format
 */
export function processTheme(rawTheme: RawTheme): Theme {
  const inferred = inferColors(
    rawTheme.systemNavigation,
    rawTheme.selectedItems
  );

  // Add gradient colors if enabled
  if (rawTheme.windowGradient) {
    const gradient = createGradient(
      rawTheme.systemNavigation,
      rawTheme.selectedItems
    );
    inferred.gradientStart = gradient.start;
    inferred.gradientEnd = gradient.end;
  }

  return {
    name: rawTheme.name,
    slug: createSlug(rawTheme.name),
    colors: {
      systemNavigation: rawTheme.systemNavigation,
      selectedItems: rawTheme.selectedItems,
      presenceIndication: rawTheme.presenceIndication,
      notifications: rawTheme.notifications,
      inferred,
    },
    windowGradient: rawTheme.windowGradient,
    darkerSidebars: rawTheme.darkerSidebars,
    submitter: rawTheme.submitterName
      ? {
          name: rawTheme.submitterName,
          link: rawTheme.submitterLink,
        }
      : undefined,
    tags: rawTheme.tags ? rawTheme.tags.map((tag) => tag.trim()) : [],
  };
}

/**
 * Generates the theme string for Slack
 */
export function generateThemeString(theme: Theme): string {
  return `${theme.colors.systemNavigation},${theme.colors.selectedItems},${theme.colors.presenceIndication},${theme.colors.notifications}`;
}

/**
 * Mix two colors with a given ratio
 */
export function mixColors(
  color1: string,
  color2: string,
  ratio: number
): string {
  return chroma.mix(color1, color2, ratio, "rgb").hex();
}

/**
 * Add alpha channel to a color
 */
export function alphaColor(color: string, alpha: number): string {
  return chroma(color).alpha(alpha).css();
}

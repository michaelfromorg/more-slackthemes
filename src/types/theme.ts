// types/theme.ts

// Submitter information
interface Submitter {
  name: string;
  link?: string;
}

// Raw theme data from YAML/JSON
export interface SlackTheme {
  name: string;
  colors: string; // Comma-separated color values
  submitter?: Submitter;
  tags?: string[];
}

export interface ParsedThemeColors {
  columnBg: string;
  menuBg: string;
  activeItem: string;
  activeItemText: string;
  hoverItem: string;
  textColor: string;
  activePresence: string;
  mentionBadge: string;

  topNavBg?: string;
  topNavText: string;
}

// Processed theme with parsed colors
export interface Theme {
  name: string;
  slug: string;
  colors: string;
  submitter?: Submitter;
  tags?: string[];
  parsedColors: ParsedThemeColors;
}

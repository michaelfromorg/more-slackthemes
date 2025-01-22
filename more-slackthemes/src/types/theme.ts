export interface SlackTheme {
  name: string;
  colors: string; // Comma-separated color values
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
  topNavBg: string;
  topNavText: string;
}

export interface Theme extends SlackTheme {
  slug: string;
  parsedColors: ParsedThemeColors;
}

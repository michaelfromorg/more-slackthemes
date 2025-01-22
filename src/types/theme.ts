export interface SlackTheme {
  name: string;
  colors: string; // Comma-separated color values
}

export interface ParsedThemeColors {
  columnBg: string; // Main sidebar background
  menuBg: string; // Workspace switcher and top nav background
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

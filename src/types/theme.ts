// types/theme.ts

// Raw theme data from Notion
export interface RawTheme {
  name: string;
  systemNavigation: string;
  selectedItems: string;
  presenceIndication: string;
  notifications: string;
  windowGradient: boolean;
  darkerSidebars: boolean;
  submitterName?: string;
  submitterLink?: string;
  tags?: string[];
}

// Submitter information
interface Submitter {
  name: string;
  link?: string;
}

// Derived colors that we need to infer from the base colors
export interface InferredColors {
  // Text colors
  systemNavigationText: string;
  selectedItemsText: string;

  // Background variants
  sidebarHover: string;
  sidebarActive: string;

  // Gradients (if windowGradient is true)
  gradientStart?: string;
  gradientEnd?: string;
}

// Processed theme with all necessary colors
export interface Theme {
  name: string;
  slug: string;
  colors: {
    // Base colors from Slack
    systemNavigation: string;
    selectedItems: string;
    presenceIndication: string;
    notifications: string;

    // Inferred colors
    inferred: InferredColors;
  };
  windowGradient: boolean;
  // TODO(michaelfromyeg): implement
  darkerSidebars: boolean;
  submitter?: Submitter;
  tags: string[];
}

// Theme with necessary UI states for components
export interface ProcessedTheme extends Theme {
  ui: {
    isSelected: boolean;
    isHovered: boolean;
  };
}

// Export a type for the theme string format
export type ThemeString = `${string},${string},${string},${string}${string}`;

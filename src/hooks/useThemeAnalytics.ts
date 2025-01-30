// hooks/useThemeAnalytics.ts
import { Theme } from "@/types/theme";
import { useCallback } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useThemeAnalytics() {
  const trackThemeView = useCallback((theme: Theme) => {
    if (!window.gtag) return;

    window.gtag("event", "view_theme", {
      theme_name: theme.name,
      theme_slug: theme.slug,
      has_submitter: !!theme.submitter,
      tags: theme.tags?.join(",") || "",
    });
  }, []);

  const trackThemeCopy = useCallback((theme: Theme) => {
    if (!window.gtag) return;

    window.gtag("event", "copy_theme", {
      theme_name: theme.name,
      theme_slug: theme.slug,
      has_submitter: !!theme.submitter,
      tags: theme.tags?.join(",") || "",
    });
  }, []);

  const trackThemeApply = useCallback((theme: Theme) => {
    if (!window.gtag) return;

    // Track as both an event and a conversion
    window.gtag("event", "apply_theme", {
      theme_name: theme.name,
      theme_slug: theme.slug,
      has_submitter: !!theme.submitter,
      tags: theme.tags?.join(",") || "",
    });

    // Track as a conversion
    window.gtag("event", "conversion", {
      send_to: "G-JXC4LZFZCH", // Replace with your GA4 measurement ID
      theme_name: theme.name,
    });
  }, []);

  return {
    trackThemeView,
    trackThemeCopy,
    trackThemeApply,
  };
}

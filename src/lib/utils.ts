import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getMobileOS = (): "desktop" | "android" | "ios" => {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  return "desktop";
};

/**
 * Ignore the deprecation warning.
 *
 * > "But there is one case where, among the options you could use,
 * > navigator.platform may be the least-bad option: When you need
 * > to show users advice about whether the modifier key for keyboard
 * > shortcuts is the ⌘ command key (found on Apple systems) rather
 * > than the ⌃ control key (on non-Apple systems)."
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform}
 */
export const getShortcutText = (key: string): string => {
  if (typeof window === "undefined") return "CTRL-K";
  const isMobile = getMobileOS() !== "desktop";
  if (isMobile) return "";

  const isMac = navigator.platform.toLowerCase().includes("mac");
  return isMac ? `⌘${key}` : `CTRL-${key}`;
};

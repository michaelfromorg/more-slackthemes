import { SlackTheme, Theme } from "@/types/theme";
import { processTheme } from "@/lib/theme-utils";

// Original themes from themes.yml
const rawThemes: SlackTheme[] = [
  {
    name: "Aubergine",
    colors: "#3F0E40,#350d36,#1164A3,#FFFFFF,#350D36,#FFFFFF,#2BAC76,#CD2553",
  },
  {
    name: "Ochin",
    colors: "#303E4D,#2C3849,#6698C8,#FFFFFF,#4A5664,#FFFFFF,#94E864,#78AF8F",
  },
  {
    name: "Monument",
    colors: "#0D7E83,#076570,#F79F66,#FFFFFF,#D37C71,#FFFFFF,#F79F66,#F15340",
  },
  // ... Add more themes as needed
];

const themes: Theme[] = rawThemes.map(processTheme);

export default themes;

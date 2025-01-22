// data/themes.ts
import { processTheme } from "@/lib/theme-utils";
import { SlackTheme, Theme } from "@/types/theme";

const rawThemes: SlackTheme[] = [
  {
    name: "Aubergine",
    colors: "#4A154B,#2B0A2C,#611F69,#FFFFFF,#350D36,#FFFFFF,#2BAC76,#CD2553",
  },
  {
    name: "Ochin",
    colors: "#303E4D,#1C2B3A,#6698C8,#FFFFFF,#4A5664,#FFFFFF,#94E864,#78AF8F",
  },
  {
    name: "Monument",
    colors: "#0D7E83,#076570,#F79F66,#FFFFFF,#D37C71,#FFFFFF,#F79F66,#F15340",
  },
  {
    name: "Midnight Blue",
    colors: "#1164A3,#0B4C8C,#1D9BD1,#FFFFFF,#0B4C8C,#FFFFFF,#2BAC76,#CD2553",
  },
  {
    name: "Clean Dark",
    colors: "#1A1D21,#0B0C0D,#1164A3,#FFFFFF,#222529,#FFFFFF,#24A06B,#CD2553",
  },
];

const themes: Theme[] = rawThemes.map(processTheme);

export default themes;

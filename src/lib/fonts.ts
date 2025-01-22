import localFont from "next/font/local";

export const lato = localFont({
  src: [
    {
      path: "../fonts/Lato-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Lato-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Lato-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-lato",
  display: "swap",
});

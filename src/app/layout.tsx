import { Layout } from "@/components/layout/Layout";
import { lato } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slack Themes",
  description: "Browse and share Slack themes",
  icons: {
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  // Optional: Add theme color to match your app's theme
  themeColor: "#ffffff",
  // Optional: Add Apple web app status bar style
  appleWebApp: {
    statusBarStyle: "default",
    title: "Slack Themes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

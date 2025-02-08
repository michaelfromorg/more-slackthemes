import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { Layout } from "@/components/layout/Layout";
import { lato } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slack Themes - Browse, Share & Generate Custom Workspace Themes",
  description:
    "Create, customize, and share beautiful Slack themes. Preview themes live, generate colors from workspace logos, and apply them instantly to your Slack workspace.",
  keywords:
    "slack themes, slack customization, workspace themes, slack colors, theme generator",
  openGraph: {
    title: "Slack Themes - Customize Your Workspace",
    description:
      "Browse, create and share beautiful Slack themes with live preview",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Slack Themes Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slack Themes - Customize Your Workspace",
    description:
      "Browse, create and share beautiful Slack themes with live preview",
    images: ["/twitter-image.png"],
    creator: "@michaelfromyeg",
  },
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
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  // TODO(michaelfromyeg): validate this!/
  // https://search.google.com/search-console?resource_id=sc-domain%3Aslack.michaeldemar.co
  // verification: {
  //   google: "your-google-site-verification",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} font-sans`}>
        <ThemeProvider defaultTheme="light" storageKey="theme-mode">
          <Layout>{children}</Layout>
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

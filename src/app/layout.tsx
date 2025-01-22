import { Layout } from "@/components/layout/Layout";
import { lato } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slack Themes",
  description: "Browse and share Slack themes",
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

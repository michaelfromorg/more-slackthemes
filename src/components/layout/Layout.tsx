"use client";

import { alphaColor } from "@/lib/theme-utils";
import useThemeStore from "@/store/theme-store";
import { useEffect } from "react";
import { ChannelSidebar } from "./ChannelSidebar";
import { TeamSidebar } from "./TeamSidebar";
import { TopNav } from "./TopNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentTheme, initializeFromUrl } = useThemeStore();
  const { colors, windowGradient } = currentTheme;
  const { inferred } = colors;

  useEffect(() => {
    initializeFromUrl();
  }, [initializeFromUrl]);

  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      <div className="flex-1 flex min-h-0">
        {/* Team Sidebar - Hidden on mobile */}
        <div className="hidden lg:block h-full">
          <TeamSidebar />
        </div>

        <div className="flex-1 flex min-w-0">
          {/* Channel Sidebar - Hidden on mobile, shown via MobileNav */}
          <div className="hidden lg:block h-full">
            <ChannelSidebar />
          </div>

          {/* Main Content Area */}
          <main
            className="flex-1 flex flex-col min-w-0 bg-white"
            style={
              windowGradient
                ? { boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }
                : undefined
            }
          >
            <div className="flex-1 overflow-auto bg-white">{children}</div>

            {/* Footer */}
            <div
              className="px-4 py-2 text-sm border-t flex flex-col lg:flex-row justify-between items-center gap-2 bg-white text-gray-900"
              style={{
                borderColor: alphaColor(inferred.systemNavigationText, 0.1),
              }}
            >
              <div className="text-center lg:text-left">
                Not affiliated with{" "}
                <a
                  href="https://slack.com"
                  className="underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Slack
                </a>
                {"."}
              </div>
              <div className="text-center lg:text-right">
                Made by{" "}
                <a
                  href="https://twitter.com/michaelfromyeg"
                  className="font-bold underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Michael DeMarco
                </a>
                {"."}{" "}
                <a
                  href="https://github.com/michaelfromorg/more-slackthemes"
                  className="font-bold underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code
                </a>
                {"."}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

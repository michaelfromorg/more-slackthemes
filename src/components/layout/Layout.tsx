"use client";

import useThemeStore from "@/store/theme-store";
import chroma from "chroma-js";
import { ChannelSidebar } from "./ChannelSidebar";
import { TeamSidebar } from "./TeamSidebar";
import { TopNav } from "./TopNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      <div className="flex-1 flex min-h-0">
        <div className="hidden lg:block">
          <TeamSidebar />
        </div>

        <div className="flex-1 flex min-w-0">
          <div className="hidden lg:block">
            <ChannelSidebar />
          </div>

          <main className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex-1 overflow-auto bg-white">{children}</div>

            <div
              className="px-4 py-2 text-sm border-t flex flex-col lg:flex-row justify-between items-center gap-2 bg-white text-gray-900"
              style={{
                borderColor: chroma(parsedColors.textColor).alpha(0.1).css(),
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
                </a>{"."}
              </div>
              <div className="text-center lg:text-right">
                Forked and furthered by{" "}
                <a
                  href="https://twitter.com/michaelfromyeg"
                  className="font-bold underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Michael DeMarco
                </a>{"."}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

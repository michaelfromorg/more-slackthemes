"use client";

import { TeamSidebar } from "./TeamSidebar";
import { ChannelSidebar } from "./ChannelSidebar";
import { TopNav } from "./TopNav";
import useThemeStore from "@/store/theme-store";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div className="h-screen flex">
      <TeamSidebar />

      <div className="flex-1 flex">
        <ChannelSidebar />

        {/* Changed the background color to be white always */}
        <main className="flex-1 flex flex-col bg-white">
          <TopNav />

          {/* Main content area - explicitly white */}
          <div className="flex-1 overflow-auto bg-white">{children}</div>

          {/* Footer credits */}
          <div
            className="px-4 py-2 text-sm border-t flex justify-between items-center bg-white text-gray-900"
            style={{
              borderColor: `${parsedColors.textColor}1a`,
            }}
          >
            <div>
              Not affiliated with{" "}
              <a
                href="https://slack.com"
                className="underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slack
              </a>{" "}
              in any way or form; but it is a great tool, use it.
            </div>
            <div>
              Made with ♥ in Istanbul by{" "}
              <a
                href="https://twitter.com/paracycle"
                className="font-bold underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ufuk Kayserilioglu
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

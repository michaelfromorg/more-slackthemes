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
      {/* Top Nav now spans full width */}
      <TopNav />

      {/* Main content area with sidebars */}
      <div className="flex-1 flex min-h-0">
        <TeamSidebar />

        <div className="flex-1 flex min-w-0">
          <ChannelSidebar />

          {/* Main content */}
          <main className="flex-1 flex flex-col min-w-0 bg-white">
            {/* Main content area */}
            <div className="flex-1 overflow-auto bg-white">{children}</div>

            {/* Footer credits */}
            <div
              className="px-4 py-2 text-sm border-t flex justify-between items-center bg-white text-gray-900"
              style={{
                borderColor: chroma(parsedColors.textColor).alpha(0.1).css(),
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
                in any way or form.
              </div>
              <div>
                First made by{" "}
                <a
                  href="https://twitter.com/paracycle"
                  className="font-bold underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ufuk Kayserilioglu
                </a>{" "}
                and forked by{" "}
                <a
                  href="https://twitter.com/michaelfromyeg"
                  className="font-bold underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Michael DeMarco
                </a>
                {`.`}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

"use client";

import Avatar from "@/components/layout/Avatar";
import { Button } from "@/components/ui/button";
import { alphaColor } from "@/lib/theme-utils";
import useThemeStore from "@/store/theme-store";
import { Bot, Hash } from "lucide-react";

export default function NotFound() {
  const { currentTheme } = useThemeStore();
  const { colors, windowGradient } = currentTheme;
  const { systemNavigation, selectedItems, notifications, inferred } = colors;

  // Create background style for system navigation color
  const backgroundStyle =
    windowGradient && inferred.gradientStart && inferred.gradientEnd
      ? {
          background: `linear-gradient(to bottom, ${inferred.gradientStart}, ${inferred.gradientEnd})`,
        }
      : {
          backgroundColor: systemNavigation,
        };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
      style={backgroundStyle}
    >
      {/* Mock Slack Message Interface */}
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg overflow-hidden border">
        {/* Channel Header */}
        <div className="border-b p-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-gray-500" />
          <span className="font-bold">404</span>
        </div>

        {/* Message Content */}
        <div className="p-6 space-y-6">
          {/* Slackbot Message */}
          <div className="flex items-start gap-3">
            <Avatar name="Slackbot" size={40} />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold">Slackbot</span>
                <span className="text-sm text-gray-500">4:04 PM</span>
              </div>
              <div className="mt-1 space-y-2 text-left">
                <p>
                  👋 Hey there! Looks like {`you've`} wandered into uncharted
                  territory.
                </p>
                <p>
                  The page {`you're`} looking for seems to have gone for a
                  coffee break. Maybe {`it's`} having a meeting with /dev/null?
                  🤔
                </p>
              </div>
            </div>
          </div>

          {/* Error Bot Message */}
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded flex items-center justify-center"
              style={{
                backgroundColor: selectedItems,
                color: inferred.selectedItemsText,
              }}
            >
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold">Error Bot</span>
                <span className="text-sm text-gray-500">4:04 PM</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: notifications, color: "#FFFFFF" }}
                >
                  Bot
                </span>
              </div>
              <div
                className="mt-1 p-3 rounded text-left"
                style={backgroundStyle}
              >
                <pre
                  className="text-sm font-mono whitespace-pre-wrap"
                  style={{ color: inferred.systemNavigationText }}
                >
                  {`Error: 404 PAGE_NOT_FOUND
at /path/to/happiness
at Object.findPage (reality.js:404:20)
at Stack.Overflow (caffeine.js:24/7)
`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t p-4 flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => (window.location.href = "/")}
            className="hover:brightness-110"
            style={{
              backgroundColor: selectedItems,
              color: inferred.selectedItemsText,
            }}
          >
            Go Home
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            style={{
              borderColor: alphaColor(systemNavigation, 0.2),
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

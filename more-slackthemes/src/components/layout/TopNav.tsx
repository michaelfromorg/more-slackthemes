import { Search, Clock, HelpCircle, User } from "lucide-react";
import useThemeStore from "@/store/theme-store";

export function TopNav() {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div
      className="flex items-center h-12 px-4 border-b"
      style={{
        backgroundColor: parsedColors.topNavBg,
        color: parsedColors.topNavText,
        borderColor: `${parsedColors.textColor}1a`, // 10% opacity
      }}
    >
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded hover:bg-black/10"
          style={{ color: parsedColors.topNavText }}
        >
          <Clock className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 mx-4">
        <button
          className="flex items-center w-full max-w-[720px] h-8 px-3 rounded text-sm"
          style={{
            backgroundColor: `${parsedColors.topNavText}0d`, // 5% opacity
            color: parsedColors.topNavText,
          }}
        >
          <Search className="w-4 h-4 mr-2 opacity-50" />
          <span className="opacity-50">Search Slack Themes</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded hover:bg-black/10"
          style={{ color: parsedColors.topNavText }}
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          className="flex items-center gap-2 p-1 rounded hover:bg-black/10"
          style={{ color: parsedColors.topNavText }}
        >
          <div className="relative">
            <div className="w-6 h-6 rounded bg-gray-300 overflow-hidden">
              <User className="w-full h-full p-1" />
            </div>
            <div
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2"
              style={{
                backgroundColor: parsedColors.activePresence,
                borderColor: parsedColors.topNavBg,
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}

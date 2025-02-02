// components/ChannelSidebar.tsx
import useThemeStore from "@/store/theme-store";
import { ChevronDown, Hash, MessageSquarePlus } from "lucide-react";
import Avatar from "./Avatar";
import { TopSidebarSections } from "./SidebarSection";

export function ChannelSidebar() {
  const { currentTheme, activeTag, getAllTags, getTagCount, setActiveTag } =
    useThemeStore();
  const { colors, windowGradient } = currentTheme;
  const {
    systemNavigation,
    selectedItems,
    // presenceIndication,
    notifications,
    inferred,
  } = colors;
  const allTags = getAllTags();

  // Create background style based on whether gradient is enabled
  const backgroundStyle =
    windowGradient && inferred.gradientStart && inferred.gradientEnd
      ? {
          background: `linear-gradient(to bottom, ${inferred.gradientStart}, ${inferred.gradientEnd})`,
        }
      : {
          backgroundColor: systemNavigation,
        };

  return (
    <div className="w-60 flex flex-col h-full" style={backgroundStyle}>
      {/* Workspace Header */}
      <button
        className="h-12 px-4 flex items-center justify-between hover:brightness-95"
        style={{ color: inferred.systemNavigationText }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold">Slack Themes</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <MessageSquarePlus className="w-4 h-4" />
      </button>

      {/* Top Sections */}
      <TopSidebarSections />

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Theme Categories Section */}
        <div className="mb-6">
          <button
            className="w-full px-2 py-1 text-sm flex items-center justify-between hover:brightness-95"
            style={{ color: inferred.systemNavigationText }}
          >
            <span>Channels</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="mt-1 space-y-0.5">
            {/* General (No filter) */}
            <button
              className="w-full px-2 py-1 text-sm flex items-center justify-between hover:brightness-95"
              style={{
                backgroundColor:
                  activeTag === "general" ? selectedItems : undefined,
                color:
                  activeTag === "general"
                    ? inferred.selectedItemsText
                    : inferred.systemNavigationText,
              }}
              onClick={() => setActiveTag("general")}
            >
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                <span>general</span>
              </div>
              {activeTag !== "general" && (
                <span
                  className="px-1.5 py-0.5 rounded text-xs font-bold"
                  style={{
                    backgroundColor: notifications,
                  }}
                >
                  {getTagCount("general")}
                </span>
              )}
            </button>

            {/* Tag Filters */}
            {allTags
              .sort((a, b) => a.localeCompare(b))
              .map((tag) => (
                <button
                  key={tag}
                  className="w-full px-2 py-1 text-sm flex items-center justify-between hover:brightness-95"
                  style={{
                    backgroundColor:
                      activeTag === tag ? selectedItems : "transparent",
                    color:
                      activeTag === tag
                        ? inferred.selectedItemsText
                        : inferred.systemNavigationText,
                  }}
                  onClick={() => setActiveTag(tag)}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span>{tag}</span>
                  </div>
                  {activeTag !== tag && (
                    <span
                      className="px-1.5 py-0.5 rounded text-xs font-bold"
                      style={{
                        backgroundColor: notifications,
                      }}
                    >
                      {getTagCount(tag)}
                    </span>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* Direct Messages Section */}
        <div className="mb-6">
          <button
            className="w-full px-2 py-1 text-sm flex items-center justify-between hover:brightness-95"
            style={{ color: inferred.systemNavigationText }}
          >
            <span>Direct messages</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="mt-1 space-y-0.5">
            <DirectMessageItem name="Slackbot" isBot={true} />
            <DirectMessageItem name="michael" isActive={true} isYou={true} />
            <DirectMessageItem name="sam a" />
            <DirectMessageItem name="elon m" isDND={true} notifications={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface DirectMessageItemProps {
  name: string;
  isBot?: boolean;
  isActive?: boolean;
  isDND?: boolean;
  isYou?: boolean;
  notifications?: number;
}

function DirectMessageItem({
  name,
  isBot,
  isActive,
  isDND,
  isYou,
  notifications,
}: DirectMessageItemProps) {
  const { currentTheme } = useThemeStore();
  const { colors } = currentTheme;
  const {
    notifications: notificationColor,
    presenceIndication,
    inferred,
  } = colors;

  return (
    <button
      className="w-full px-2 py-1 text-sm flex items-center justify-between hover:bg-black/5"
      style={{ color: inferred.systemNavigationText }}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar name={name} size={20} />
          {!isBot && (
            <div
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2"
              style={{
                backgroundColor: isActive
                  ? presenceIndication
                  : isDND
                  ? "#F40B0B"
                  : "#949494",
                borderColor: inferred.systemNavigationText,
              }}
            />
          )}
        </div>
        <span>{name}</span>
        {isYou && <span className="text-xs opacity-50">you</span>}
      </div>
      {notifications && (
        <span
          className="px-1.5 py-0.5 rounded text-xs font-bold"
          style={{
            backgroundColor: notificationColor,
          }}
        >
          {notifications}
        </span>
      )}
    </button>
  );
}

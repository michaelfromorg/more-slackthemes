import useThemeStore from "@/store/theme-store";
import { ChevronDown, Hash, MessageSquarePlus, Plus } from "lucide-react";
import Image from "next/image";
import { TopSidebarSections } from "./SidebarSection";

export function ChannelSidebar() {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div
      className="w-60 flex flex-col h-full"
      style={{ backgroundColor: parsedColors.columnBg }}
    >
      {/* Workspace Header */}
      <button
        className="h-12 px-4 flex items-center justify-between hover:brightness-95"
        style={{ color: parsedColors.textColor }}
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
        <SidebarSection title="Channels">
          <ChannelItem name="general" active={true} />
          <ChannelItem name="random" notifications={3} />
          <button
            className="w-full px-2 py-1 text-sm flex items-center gap-2 rounded hover:bg-black/5"
            style={{ color: `${parsedColors.textColor}99` }}
          >
            <Plus className="w-4 h-4" />
            Add channels
          </button>
        </SidebarSection>

        <SidebarSection title="Direct messages">
          <DirectMessageItem
            name="Slackbot"
            src="/images/slackbot.jpeg"
            isBot={true}
          />
          <DirectMessageItem
            name="ufuk"
            src="/images/profile.jpg"
            isActive={true}
            isYou={true}
          />
          <DirectMessageItem name="jack" src="/images/jack.jpg" />
          <DirectMessageItem
            name="jane"
            src="/images/jane.jpg"
            isDND={true}
            notifications={10}
          />
          <DirectMessageItem
            name="hanna"
            src="/images/hanna.jpg"
            isActive={true}
          />
          <button
            className="w-full px-2 py-1 text-sm flex items-center gap-2 rounded hover:bg-black/5"
            style={{ color: `${parsedColors.textColor}99` }}
          >
            <Plus className="w-4 h-4" />
            Add teammates
          </button>
        </SidebarSection>
      </div>
    </div>
  );
}

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

function SidebarSection({ title, children }: SidebarSectionProps) {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div className="mb-6">
      <button
        className="w-full px-2 py-1 text-sm flex items-center justify-between hover:brightness-95"
        style={{ color: parsedColors.textColor }}
      >
        <span>{title}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      <div className="mt-1 space-y-0.5">{children}</div>
    </div>
  );
}

interface ChannelItemProps {
  name: string;
  active?: boolean;
  notifications?: number;
}

function ChannelItem({ name, active, notifications }: ChannelItemProps) {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <button
      className="w-full px-2 py-1 text-sm flex items-center justify-between rounded group"
      style={{
        backgroundColor: active ? parsedColors.activeItem : "transparent",
        color: active ? parsedColors.activeItemText : parsedColors.textColor,
      }}
    >
      <div className="flex items-center gap-2">
        <Hash className="w-4 h-4" />
        <span>{name}</span>
      </div>
      {notifications && (
        <span
          className="px-1.5 py-0.5 rounded text-xs font-bold"
          style={{
            backgroundColor: active ? undefined : parsedColors.mentionBadge,
            color: "#FFFFFF",
          }}
        >
          {notifications}
        </span>
      )}
    </button>
  );
}

interface DirectMessageItemProps {
  name: string;
  src: string;
  isBot?: boolean;
  isActive?: boolean;
  // isAway?: boolean;
  isDND?: boolean;
  isYou?: boolean;
  notifications?: number;
}

function DirectMessageItem({
  name,
  src,
  isBot,
  isActive,
  isDND,
  isYou,
  notifications,
}: DirectMessageItemProps) {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <button
      className="w-full px-2 py-1 text-sm flex items-center justify-between rounded hover:bg-black/5"
      style={{ color: parsedColors.textColor }}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <Image
            src={src}
            alt={name}
            width={20}
            height={20}
            className="rounded"
          />
          {!isBot && (
            <div
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2"
              style={{
                backgroundColor: isActive
                  ? parsedColors.activePresence
                  : isDND
                    ? "#F40B0B"
                    : "#949494",
                borderColor: parsedColors.columnBg,
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
            backgroundColor: parsedColors.mentionBadge,
            color: "#FFFFFF",
          }}
        >
          {notifications}
        </span>
      )}
    </button>
  );
}

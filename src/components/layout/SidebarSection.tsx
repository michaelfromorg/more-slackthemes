// components/SidebarSection.tsx
import useThemeStore from "@/store/theme-store";
import {
  AtSign,
  Bookmark,
  MessageSquare,
  MessagesSquare,
  MoreHorizontal,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  notifications?: number;
}

function SidebarItem({ icon, label, notifications }: SidebarItemProps) {
  const { currentTheme } = useThemeStore();
  const { colors } = currentTheme;
  const { notifications: notificationColor, inferred } = colors;

  return (
    <button
      className="w-full px-2 py-1 text-sm flex items-center justify-between rounded hover:bg-black/5"
      style={{ color: inferred.systemNavigationText }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {notifications && (
        <span
          className="px-1.5 rounded text-xs font-bold"
          style={{
            backgroundColor: notificationColor,
            color: "#FFFFFF",
          }}
        >
          {notifications}
        </span>
      )}
    </button>
  );
}

export function TopSidebarSections() {
  const { currentTheme } = useThemeStore();
  const { colors } = currentTheme;
  const { inferred } = colors;

  return (
    <div className="space-y-1 px-2 py-3">
      <SidebarItem
        icon={<MessageSquare className="w-4 h-4" />}
        label="Threads"
      />

      <SidebarItem
        icon={<MessagesSquare className="w-4 h-4" />}
        label="All DMs"
      />

      <SidebarItem
        icon={<AtSign className="w-4 h-4" />}
        label="Mentions & reactions"
      />

      <SidebarItem
        icon={<Bookmark className="w-4 h-4" />}
        label="Saved items"
      />

      <button
        className="w-full px-2 py-1 text-sm flex items-center gap-2 rounded hover:bg-black/5"
        style={{ color: inferred.systemNavigationText }}
      >
        <MoreHorizontal className="w-4 h-4" />
        <span>More</span>
      </button>
    </div>
  );
}

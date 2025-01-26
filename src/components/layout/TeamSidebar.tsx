import useThemeStore from "@/store/theme-store";
import { Plus } from "lucide-react";
import Avatar from "./Avatar";

export function TeamSidebar() {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div
      className="flex flex-col items-center w-12 py-3 space-y-4 h-full"
      style={{ backgroundColor: parsedColors.menuBg }}
    >
      {/* Main workspace icon */}
      <WorkspaceButton name="Slack Themes" active={true} />

      {/* Example workspace icons */}
      <WorkspaceButton
        name="Pied Piper"
        notifications={1}
      />

      <WorkspaceButton name="Ruby Team" />

      {/* Add workspace button */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded border border-solid hover:opacity-80"
        style={{
          borderColor: `${parsedColors.textColor}1a`,
          color: `${parsedColors.textColor}cc`,
        }}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

interface WorkspaceButtonProps {
  name: string;
  active?: boolean;
  notifications?: number;
}

function WorkspaceButton({
  name,
  active,
  notifications,
}: WorkspaceButtonProps) {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div className="relative">
      <button
        className={`w-8 h-8 rounded relative flex items-center justify-center ${active ? "border-2 p-0.5" : ""
          } hover:opacity-80`}
        style={{
          borderColor: active ? parsedColors.textColor : "transparent",
        }}
      >
        <div className="w-full h-full rounded overflow-hidden">
          <Avatar name={name} size={active ? 28 : 32} />
        </div>
      </button>
      {notifications && (
        <div
          className="absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-bold px-1"
          style={{
            backgroundColor: parsedColors.mentionBadge,
            color: "#FFFFFF",
          }}
        >
          {notifications}
        </div>
      )}
    </div>
  );
}

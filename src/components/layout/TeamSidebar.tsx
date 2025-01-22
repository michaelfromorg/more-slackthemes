import useThemeStore from "@/store/theme-store";
import { Plus } from "lucide-react";
import Image from "next/image";

export function TeamSidebar() {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div
      className="flex flex-col items-center w-12 py-3 space-y-4"
      style={{ backgroundColor: parsedColors.menuBg }} // Changed from columnBg to menuBg
    >
      {/* Main workspace icon */}
      <WorkspaceButton src="/favicon-32.png" alt="Slack Themes" active={true} />

      {/* Example workspace icons */}
      <WorkspaceButton
        src="/images/pied-piper.jpg"
        alt="Pied Piper"
        notifications={1}
      />

      <WorkspaceButton src="/images/rubytr.png" alt="Ruby Turkey" />

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
  src: string;
  alt: string;
  active?: boolean;
  notifications?: number;
}

function WorkspaceButton({
  src,
  alt,
  active,
  notifications,
}: WorkspaceButtonProps) {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;

  return (
    <div className="relative">
      <button
        className={`w-8 h-8 rounded relative flex items-center justify-center ${
          active ? "border-2" : ""
        } hover:opacity-80`}
        style={{
          borderColor: active ? parsedColors.textColor : "transparent",
        }}
      >
        <Image src={src} alt={alt} width={32} height={32} className="rounded" />
      </button>

      {notifications && (
        <div
          className="absolute -bottom-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-bold px-1"
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

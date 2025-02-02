// components/TeamSidebar.tsx
import { alphaColor } from "@/lib/theme-utils";
import useThemeStore from "@/store/theme-store";
import { Plus } from "lucide-react";
import Avatar from "./Avatar";

export function TeamSidebar() {
  const { currentTheme } = useThemeStore();
  const { colors, windowGradient } = currentTheme;
  const { systemNavigation, notifications, inferred } = colors;

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
    <div
      className="flex flex-col items-center w-12 py-3 space-y-4 h-full"
      style={backgroundStyle}
    >
      {/* Main workspace icon */}
      <WorkspaceButton name="Slack Themes" active={true} />

      {/* Example workspace icons */}
      <WorkspaceButton
        name="Pied Piper"
        notifications={1}
        notificationColor={notifications}
        textColor={inferred.systemNavigationText}
      />

      <WorkspaceButton
        name="Ruby Team"
        textColor={inferred.systemNavigationText}
      />

      {/* Add workspace button */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded border border-solid hover:opacity-80"
        style={{
          borderColor: alphaColor(inferred.systemNavigationText, 0.1),
          color: alphaColor(inferred.systemNavigationText, 0.8),
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
  notificationColor?: string;
  textColor?: string;
}

function WorkspaceButton({
  name,
  active,
  notifications,
  notificationColor = "#CD2553",
  textColor = "#FFFFFF",
}: WorkspaceButtonProps) {
  return (
    <div className="relative">
      <button
        className={`w-8 h-8 rounded relative flex items-center justify-center ${
          active ? "border-2" : ""
        } hover:opacity-80`}
        style={{
          borderColor: active ? textColor : "transparent",
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
            color: textColor,
            backgroundColor: notificationColor,
          }}
        >
          {notifications}
        </div>
      )}
    </div>
  );
}

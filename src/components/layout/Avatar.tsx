import { UserRound } from "lucide-react";

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getBackgroundColor = (name: string) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-orange-500",
  ];

  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
};

export default function Avatar({
  name,
  size = 32,
  className = "",
}: AvatarProps) {
  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name);

  if (name === "Slackbot") {
    return (
      <div
        className={`flex items-center justify-center rounded ${bgColor} ${className}`}
        style={{ width: size, height: size }}
      >
        <UserRound className="w-3/4 h-3/4 text-white" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded ${bgColor} ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-medium" style={{ fontSize: size * 0.4 }}>
        {initials}
      </span>
    </div>
  );
}

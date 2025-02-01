// components/MobileNav.tsx
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useThemeStore from "@/store/theme-store";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ChannelSidebar } from "./ChannelSidebar";

export function MobileNav() {
  const { currentTheme } = useThemeStore();
  const { colors, windowGradient } = currentTheme;
  const { systemNavigation, inferred } = colors;
  const [open, setOpen] = useState(false);

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          style={{ color: inferred.systemNavigationText }}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-[85vw] max-w-[320px]"
        style={{
          ...backgroundStyle,
          border: "none",
        }}
      >
        <ChannelSidebar />
      </SheetContent>
    </Sheet>
  );
}

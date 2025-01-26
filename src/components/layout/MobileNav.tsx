import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import useThemeStore from '@/store/theme-store';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { ChannelSidebar } from './ChannelSidebar';

export function MobileNav() {
  const { currentTheme } = useThemeStore();
  const { parsedColors } = currentTheme;
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          style={{ color: parsedColors.textColor }}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <ChannelSidebar />
      </SheetContent>
    </Sheet>
  );
}

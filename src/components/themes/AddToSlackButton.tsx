import { Button } from '@/components/ui/button';
import useThemeStore from '@/store/theme-store';
import { ExternalLink } from 'lucide-react';
import { useCallback } from 'react';

interface AddToSlackButtonProps {
  className?: string;
}

export function AddToSlackButton({ className }: AddToSlackButtonProps) {
  const { getCurrentThemeString } = useThemeStore();

  const handleAddToSlack = useCallback(async () => {
    try {
      // Copy theme string
      await navigator.clipboard.writeText(getCurrentThemeString());
      // Open Slack
      window.location.href = 'slack://open';
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [getCurrentThemeString]);

  return (
    <Button
      onClick={handleAddToSlack}
      className={`bg-[#4A154B] hover:bg-[#611f69] text-white ${className}`}
    >
      <div className="flex items-center gap-2">
        Copy & Go to Slack
        <ExternalLink className="w-4 h-4" />
      </div>
    </Button>
  );
}

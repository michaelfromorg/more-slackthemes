import { ThemePreview } from "./ThemePreview";
import useThemeStore from "@/store/theme-store";
import { RadioGroup } from "@/components/ui/radio-group";

export function ThemeGrid() {
  const { themes, currentTheme, setCurrentTheme } = useThemeStore();

  return (
    <div className="p-6 bg-white min-h-full">
      <RadioGroup
        value={currentTheme.slug}
        onValueChange={(value) => {
          const theme = themes.find((t) => t.slug === value);
          if (theme) setCurrentTheme(theme);
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <ThemePreview
              key={theme.slug}
              theme={theme}
              isSelected={theme.slug === currentTheme.slug}
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

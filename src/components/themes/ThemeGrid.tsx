import { RadioGroup } from "@/components/ui/radio-group";
import useThemeStore from "@/store/theme-store";
import { ThemePreview } from "./ThemePreview";

export function ThemeGrid() {
  const { filteredThemes, currentTheme, setCurrentTheme, searchQuery } =
    useThemeStore();

  if (filteredThemes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No themes found matching {`"`}
        {searchQuery}
        {`"`}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-full">
      <RadioGroup
        value={currentTheme.slug}
        onValueChange={(value) => {
          const theme = filteredThemes.find((t) => t.slug === value);
          if (theme) setCurrentTheme(theme);
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredThemes.map((theme) => (
            <ThemePreview
              key={theme.slug}
              theme={theme}
              // isSelected={theme.slug === currentTheme.slug}
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

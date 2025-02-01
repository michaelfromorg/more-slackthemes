// components/themes/ThemeGridMobile.tsx
import { RadioGroup } from "@/components/ui/radio-group";
import { useThemeAnalytics } from "@/hooks/useThemeAnalytics";
import useThemeStore from "@/store/theme-store";
import { Theme } from "@/types/theme";
import { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { ThemePreview } from "./ThemePreview";

const THEME_CARD_HEIGHT = 180;
const GRID_GAP = 16;
const ROW_HEIGHT = THEME_CARD_HEIGHT + GRID_GAP;
const PADDING_SIZE = 16;

interface RowProps {
  data: {
    themes: Theme[];
    setActiveTag: (tag: string) => void;
    columnWidth: number;
    columnCount: number;
  };
  index: number;
  style: React.CSSProperties;
}

const Row = ({ data, index, style }: RowProps) => {
  const { themes, setActiveTag, columnWidth, columnCount } = data;
  const startIndex = index * columnCount;
  const rowThemes = themes.slice(startIndex, startIndex + columnCount);

  const rowStyle = {
    ...style,
    height: THEME_CARD_HEIGHT,
    display: "flex",
    gap: GRID_GAP,
    paddingBottom: 0,
    top: `${parseFloat(style.top as string) + PADDING_SIZE}px`,
  };

  return (
    <div style={rowStyle}>
      {rowThemes.map((theme) => (
        <div key={theme.slug} style={{ width: columnWidth }}>
          <ThemePreview theme={theme} setActiveTag={setActiveTag} />
        </div>
      ))}
    </div>
  );
};

export function ThemeGridMobile() {
  const { trackThemeView } = useThemeAnalytics();
  const {
    filteredThemes,
    currentTheme,
    setCurrentTheme,
    setActiveTag,
    searchQuery,
  } = useThemeStore();

  const [containerWidth, setContainerWidth] = useState(0);
  const [columnCount, setColumnCount] = useState(1);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const listRef = useRef<List>(null);

  // Update column count based on screen size
  useEffect(() => {
    if (!containerRef) return;

    const updateLayout = () => {
      const width = containerRef.offsetWidth - 32; // Account for padding
      setContainerWidth(width);

      // Determine column count based on container width
      if (width < 600) setColumnCount(1);
      else if (width < 900) setColumnCount(2);
      else setColumnCount(3);
    };

    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(containerRef);
    return () => observer.disconnect();
  }, [containerRef]);

  if (filteredThemes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No themes found matching {`"`}
        {searchQuery}
        {`"`}
      </div>
    );
  }

  const rowCount = Math.ceil(filteredThemes.length / columnCount);
  const columnWidth =
    (containerWidth - GRID_GAP * (columnCount - 1)) / columnCount;

  return (
    <div ref={setContainerRef} className="px-4 h-full overflow-hidden">
      <RadioGroup
        value={currentTheme.slug}
        onValueChange={(value) => {
          const theme = filteredThemes.find((t) => t.slug === value);
          if (theme) {
            setCurrentTheme(theme);
            trackThemeView(theme);
          }
        }}
      >
        {containerWidth > 0 && (
          <List
            ref={listRef}
            height={window.innerHeight - 200} // Adjust based on your header/footer height
            itemCount={rowCount}
            itemSize={ROW_HEIGHT}
            width={containerWidth}
            itemData={{
              themes: filteredThemes,
              setActiveTag,
              columnWidth,
              columnCount,
            }}
          >
            {Row}
          </List>
        )}
      </RadioGroup>
    </div>
  );
}

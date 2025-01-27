import { RadioGroup } from "@/components/ui/radio-group";
import useThemeStore from "@/store/theme-store";
import { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { ThemePreview } from "./ThemePreview";

const THEME_CARD_HEIGHT = 180;
const GRID_GAP = 16;
const ROW_HEIGHT = THEME_CARD_HEIGHT + GRID_GAP; // Include gap in row height

export function ThemeGrid() {
  const { filteredThemes, currentTheme, setCurrentTheme, searchQuery } = useThemeStore();
  const [columnCount, setColumnCount] = useState(4);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState<number>(800);

  useEffect(() => {
    const updateListHeight = () => {
      if (typeof window !== 'undefined') {
        const totalRows = Math.ceil(filteredThemes.length / columnCount);
        const totalHeight = totalRows * ROW_HEIGHT - GRID_GAP; // Subtract last row's gap
        setListHeight(Math.min(window.innerHeight - 200, totalHeight));
      }
    };

    updateListHeight();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateListHeight);
      return () => window.removeEventListener('resize', updateListHeight);
    }
  }, [columnCount, filteredThemes.length]);

  useEffect(() => {
    if (!containerRef) return;

    const updateColumnCount = () => {
      // Account for container padding
      const width = containerRef.offsetWidth - 32;
      setContainerWidth(width);

      if (width < 768) setColumnCount(1);
      else if (width < 1024) setColumnCount(2);
      else if (width < 1280) setColumnCount(3);
      else if (width < 1536) setColumnCount(4);
      else setColumnCount(5);
    };

    updateColumnCount();
    const observer = new ResizeObserver(updateColumnCount);
    observer.observe(containerRef);
    return () => observer.disconnect();
  }, [containerRef]);

  if (filteredThemes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No themes found matching {`"`}{searchQuery}{`"`}
      </div>
    );
  }

  const rowCount = Math.ceil(filteredThemes.length / columnCount);
  const columnWidth = (containerWidth - (GRID_GAP * (columnCount - 1))) / columnCount;

  const Row = ({ index, style }: any) => {
    const startIndex = index * columnCount;
    const rowThemes = filteredThemes.slice(startIndex, startIndex + columnCount);

    // Apply padding to the row's style to create the gap
    const rowStyle = {
      ...style,
      height: THEME_CARD_HEIGHT,
      display: 'flex',
      gap: GRID_GAP,
      paddingBottom: GRID_GAP // This creates the vertical gap
    };

    return (
      <div style={rowStyle}>
        {rowThemes.map((theme) => (
          <div key={theme.slug} style={{ width: columnWidth }}>
            <ThemePreview theme={theme} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={setContainerRef}
      className="bg-white min-h-full p-4"
    >
      <RadioGroup
        value={currentTheme.slug}
        onValueChange={(value) => {
          const theme = filteredThemes.find((t) => t.slug === value);
          if (theme) setCurrentTheme(theme);
        }}
      >
        {containerWidth > 0 && (
          <List
            height={listHeight}
            itemCount={rowCount}
            itemSize={ROW_HEIGHT}
            width={containerWidth}
            style={{ overflow: 'auto' }}
            overscanCount={5}
          >
            {Row}
          </List>
        )}
      </RadioGroup>
    </div>
  );
}

export default ThemeGrid;

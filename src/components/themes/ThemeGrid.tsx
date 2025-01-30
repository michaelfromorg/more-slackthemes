import { RadioGroup } from "@/components/ui/radio-group";
import { useThemeAnalytics } from "@/hooks/useThemeAnalytics";
import useThemeStore from "@/store/theme-store";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { ThemePreview } from "./ThemePreview";

const THEME_CARD_HEIGHT = 180;
const GRID_GAP = 16;
const ROW_HEIGHT = THEME_CARD_HEIGHT + GRID_GAP;

const PADDING_SIZE = 16;

const InnerElementType = forwardRef<HTMLDivElement, any>(
  ({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        height: `${parseFloat(style.height) + PADDING_SIZE * 2}px`,
      }}
      {...rest}
    />
  )
);
InnerElementType.displayName = "InnerElementType";

export function ThemeGrid() {
  const { trackThemeView } = useThemeAnalytics();

  const {
    filteredThemes,
    currentTheme,
    setCurrentTheme,
    setActiveTag,
    searchQuery,
  } = useThemeStore();

  // This is stupid
  filteredThemes.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );

  const [columnCount, setColumnCount] = useState(4);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const listRef = useRef<List>(null);

  // Find the current theme's index in the filtered themes
  const currentIndex = filteredThemes.findIndex(
    (theme) => theme.slug === currentTheme.slug
  );

  const scrollToTheme = useCallback(
    (index: number) => {
      if (!listRef.current) return;
      const row = Math.floor(index / columnCount);
      listRef.current.scrollToItem(row, "smart");
    },
    [columnCount]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
        return;

      e.preventDefault(); // Prevent page scrolling

      let newIndex = currentIndex;
      const lastIndex = filteredThemes.length - 1;
      const isLastRow =
        Math.floor(currentIndex / columnCount) ===
        Math.floor(lastIndex / columnCount);
      // const remainingInLastRow = filteredThemes.length % columnCount || columnCount;

      switch (e.key) {
        case "ArrowLeft":
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case "ArrowRight":
          // Don't go beyond the last theme
          newIndex = Math.min(lastIndex, currentIndex + 1);
          break;
        case "ArrowUp":
          // Move up one row if possible
          if (currentIndex >= columnCount) {
            newIndex = currentIndex - columnCount;
          }
          break;
        case "ArrowDown":
          // Move down one row if possible
          const nextRowIndex = currentIndex + columnCount;

          // Check if we're moving to the last row (which might be partial)
          if (isLastRow) {
            newIndex = currentIndex; // Stay in current position
          } else if (
            Math.floor(nextRowIndex / columnCount) ===
            Math.floor(lastIndex / columnCount)
          ) {
            // Moving to last row - ensure we don't exceed the actual last theme
            newIndex = Math.min(nextRowIndex, lastIndex);
          } else {
            // Normal down movement
            newIndex = nextRowIndex;
          }
          break;
      }

      if (
        newIndex !== currentIndex &&
        newIndex >= 0 &&
        newIndex < filteredThemes.length
      ) {
        setCurrentTheme(filteredThemes[newIndex]);
        scrollToTheme(newIndex);
      }
    },
    [currentIndex, columnCount, filteredThemes, setCurrentTheme, scrollToTheme]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!containerRef) return;

    const updateColumnCount = () => {
      const width = containerRef.offsetWidth - 32;
      setContainerWidth(width);
      setContainerHeight(containerRef.offsetHeight);

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
        No themes found matching {`"`}
        {searchQuery}
        {`"`}
      </div>
    );
  }

  const rowCount = Math.ceil(filteredThemes.length / columnCount);
  const columnWidth =
    (containerWidth - GRID_GAP * (columnCount - 1)) / columnCount;

  const Row = ({ index, style }: any) => {
    const startIndex = index * columnCount;
    const rowThemes = filteredThemes.slice(
      startIndex,
      startIndex + columnCount
    );

    const rowStyle = {
      ...style,
      height: THEME_CARD_HEIGHT,
      display: "flex",
      gap: GRID_GAP,
      paddingBottom: 0,
      top: `${parseFloat(style.top) + PADDING_SIZE}px`,
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

  return (
    <div ref={setContainerRef} className="bg-white px-4 h-full">
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
            height={containerHeight}
            itemCount={rowCount}
            innerElementType={InnerElementType}
            itemSize={ROW_HEIGHT}
            width={containerWidth}
            style={{ overflow: "auto" }}
            overscanCount={5}
          >
            {Row}
          </List>
        )}
      </RadioGroup>
    </div>
  );
}

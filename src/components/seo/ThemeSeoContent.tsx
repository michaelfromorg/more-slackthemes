import { themes } from "@/data/themes";
import { describeTheme } from "@/lib/theme-utils";
import Link from "next/link";

/**
 * Server-rendered, screen-reader-only catalog of every theme. The interactive
 * grid is virtualized and only populates after a client-side measurement, so
 * the statically exported HTML would otherwise contain none of the themes.
 * This gives crawlers (and screen readers) the full, indexable content.
 */
export function ThemeSeoContent() {
  const sortedThemes = [...themes].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );

  return (
    <section className="sr-only" aria-label="All Slack themes">
      <h1>Slack Themes - Browse, Share &amp; Generate Custom Workspace Themes</h1>
      <p>
        Browse {themes.length} free Slack themes. Preview each theme live, copy
        its colors, and apply it to your Slack workspace in one click. Generate
        your own theme or share one with the community.
      </p>
      <ul>
        {sortedThemes.map((theme) => (
          <li key={theme.slug}>
            <h2>
              <Link href={`/themes/${theme.slug}`}>{theme.name} Slack theme</Link>
            </h2>
            <p>{describeTheme(theme)}</p>
            {theme.tags.length > 0 && <p>Tags: {theme.tags.join(", ")}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

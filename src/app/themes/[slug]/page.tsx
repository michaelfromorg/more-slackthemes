import { CopyThemeButton } from "@/components/themes/CopyThemeButton";
import { ThemeMockup } from "@/components/themes/ThemeMockup";
import { themes } from "@/data/themes";
import { SITE_URL } from "@/lib/constants";
import { describeTheme, generateThemeString } from "@/lib/theme-utils";
import { Theme } from "@/types/theme";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return themes.map((theme) => ({ slug: theme.slug }));
}

function getTheme(slug: string): Theme | undefined {
  return themes.find((theme) => theme.slug === slug);
}

// Themes sharing a tag, padded with alphabetical neighbors, for internal links.
function relatedThemes(theme: Theme): Theme[] {
  const sorted = [...themes].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );
  const shared = sorted.filter(
    (t) => t.slug !== theme.slug && t.tags.some((tag) => theme.tags.includes(tag))
  );
  if (shared.length >= 6) return shared.slice(0, 12);

  const index = sorted.findIndex((t) => t.slug === theme.slug);
  const neighbors = sorted
    .slice(Math.max(0, index - 6), index + 7)
    .filter((t) => t.slug !== theme.slug);
  return [...new Map([...shared, ...neighbors].map((t) => [t.slug, t])).values()].slice(
    0,
    12
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) return {};

  const title = `${theme.name} Slack Theme — Colors & One-Click Install`;
  const description = describeTheme(theme);
  const ogImage = `/og/themes/${theme.slug}.png`;

  return {
    title,
    description,
    alternates: { canonical: `/themes/${theme.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/themes/${theme.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${theme.name} Slack theme` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const COLOR_FIELDS: { key: keyof Theme["colors"]; label: string }[] = [
  { key: "systemNavigation", label: "System navigation (sidebar)" },
  { key: "selectedItems", label: "Selected items" },
  { key: "presenceIndication", label: "Presence indication" },
  { key: "notifications", label: "Notifications" },
];

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();

  const themeString = generateThemeString(theme);
  const related = relatedThemes(theme);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Slack Themes", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: `${theme.name} Slack theme`,
            item: `${SITE_URL}/themes/${theme.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: `${theme.name} Slack theme`,
        url: `${SITE_URL}/themes/${theme.slug}`,
        description: describeTheme(theme),
        image: `${SITE_URL}/og/themes/${theme.slug}.png`,
        ...(theme.submitter
          ? { creator: { "@type": "Person", name: theme.submitter.name } }
          : {}),
      },
    ],
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">
          All Slack themes
        </Link>
        <span className="mx-2">/</span>
        <span>{theme.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{theme.name} Slack Theme</h1>
      <p className="text-muted-foreground mb-6">{describeTheme(theme)}</p>

      <div className="rounded-lg overflow-hidden border mb-6 max-w-md">
        <ThemeMockup theme={theme} />
      </div>

      <h2 className="text-xl font-semibold mb-3">Colors</h2>
      <ul className="space-y-2 mb-6">
        {COLOR_FIELDS.map(({ key, label }) => {
          const value = theme.colors[key] as string;
          return (
            <li key={key} className="flex items-center gap-3">
              <span
                className="w-6 h-6 rounded border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: value }}
              />
              <span className="text-sm">{label}</span>
              <span className="text-sm font-mono text-gray-500">{value}</span>
            </li>
          );
        })}
        {theme.windowGradient && (
          <li className="text-sm text-gray-500">Includes a window gradient.</li>
        )}
      </ul>

      <h2 className="text-xl font-semibold mb-3">Add to Slack</h2>
      <p className="text-sm text-muted-foreground mb-3">
        Copy the color string below, then in Slack go to Preferences -&gt; Themes
        and paste it into the custom theme field.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center mb-2">
        <code className="flex-1 px-3 py-2 rounded border bg-muted font-mono text-sm break-all">
          {themeString}
        </code>
        <CopyThemeButton themeString={themeString} />
      </div>

      {theme.submitter && (
        <p className="text-sm text-gray-500 mt-4">
          Submitted by{" "}
          {theme.submitter.link ? (
            <a
              href={theme.submitter.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              {theme.submitter.name}
            </a>
          ) : (
            theme.submitter.name
          )}
          .
        </p>
      )}

      {related.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-3">Related themes</h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/themes/${t.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm hover:bg-muted"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.colors.systemNavigation }}
                  />
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

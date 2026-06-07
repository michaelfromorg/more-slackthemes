import { themes } from "@/data/themes";
import { SITE_URL } from "@/lib/constants";
import { describeTheme } from "@/lib/theme-utils";

/**
 * JSON-LD structured data: a WebSite node plus an ItemList enumerating every
 * theme. Server-rendered so it lands in the static HTML for rich results.
 */
export function StructuredData() {
  const sortedThemes = [...themes].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Slack Themes",
        description:
          "Browse, create and share beautiful Slack themes with live preview.",
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "Slack Themes - Browse, Share & Generate Custom Workspace Themes",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: sortedThemes.length,
          itemListElement: sortedThemes.map((theme, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: `${theme.name} Slack theme`,
              url: `${SITE_URL}/themes/${theme.slug}`,
              description: describeTheme(theme),
              ...(theme.submitter
                ? { creator: { "@type": "Person", name: theme.submitter.name } }
                : {}),
            },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

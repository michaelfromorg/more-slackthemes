// Generates a 1200x630 OG image per theme into public/og/themes/<slug>.png.
//
// Why a build script instead of Next's `opengraph-image` metadata route:
// the site is statically exported to GitHub Pages, which serves Next's
// extensionless `opengraph-image` files as application/octet-stream. Social
// crawlers (Slack, X, Facebook) reject that, so previews wouldn't render. Real
// .png files served from public/ get the correct image/png content type.

import chroma from "chroma-js";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ImageResponse } from "next/og.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outDir = resolve(root, "public/og/themes");

const createSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const h = (type, style, children) => ({ type, props: { style, children } });

const textOn = (bg) => (chroma.contrast(bg, "white") > 4.5 ? "#FFFFFF" : "#111111");

function swatch(label, color, fg) {
  return h(
    "div",
    { display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
    [
      h("div", {
        width: 180,
        height: 120,
        borderRadius: 16,
        background: color,
        border: `2px solid ${chroma(fg).alpha(0.25).css()}`,
      }),
      h("div", { fontSize: 26, fontFamily: "monospace", color: fg }, color.toUpperCase()),
      h("div", { fontSize: 20, color: chroma(fg).alpha(0.7).css() }, label),
    ]
  );
}

function render(theme) {
  const { name, systemNavigation, selectedItems, presenceIndication, notifications, windowGradient } = theme;
  const fg = textOn(systemNavigation);
  const background = windowGradient
    ? `linear-gradient(135deg, ${systemNavigation}, ${selectedItems})`
    : systemNavigation;

  return h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 80,
      background,
      color: fg,
      fontFamily: "sans-serif",
    },
    [
      h("div", { display: "flex", flexDirection: "column", gap: 8 }, [
        h("div", { fontSize: 32, color: chroma(fg).alpha(0.7).css() }, "Slack theme"),
        h("div", { fontSize: 96, fontWeight: 700 }, name),
      ]),
      h("div", { display: "flex", gap: 48 }, [
        swatch("Sidebar", systemNavigation, fg),
        swatch("Active", selectedItems, fg),
        swatch("Presence", presenceIndication, fg),
        swatch("Alerts", notifications, fg),
      ]),
      h("div", { fontSize: 28, color: chroma(fg).alpha(0.7).css() }, "slack.michaeldemar.co"),
    ]
  );
}

async function main() {
  const raw = JSON.parse(await readFile(resolve(root, "src/data/themes.json"), "utf8"));
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  let count = 0;
  for (const theme of raw) {
    const img = new ImageResponse(render(theme), { width: 1200, height: 630 });
    const buf = Buffer.from(await img.arrayBuffer());
    await writeFile(resolve(outDir, `${createSlug(theme.name)}.png`), buf);
    count += 1;
  }
  console.log(`Generated ${count} OG images in public/og/themes/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

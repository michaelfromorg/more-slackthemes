/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://slack.michaeldemar.co",
  // Write into the static-export dir (out/), which is what GitHub Pages
  // deploys. The default (public/) is copied into out/ during `next build`,
  // i.e. before this runs in postbuild, so it would never reach the artifact.
  outDir: "./out",
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/api/*", "/_next/*", "/static/*", "/404", "/500"],
  generateIndexSitemap: false,
};

const fs = require("fs");
const path = require("path");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ambertraining.co.uk/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ambertraining.co.uk/our-courses</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ambertraining.co.uk/about</loc>
    <priority>0.7</priority>
  </url>
</urlset>`;

const buildPath = path.join(__dirname, "../build");
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath, { recursive: true });
}

fs.writeFileSync(path.join(buildPath, "sitemap.xml"), sitemap);
console.log("✅ Sitemap generated successfully");

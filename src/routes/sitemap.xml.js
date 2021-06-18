import Sitemap from "../components/Sitemap.svelte";
import { artists } from "../js/artists";

const lastmod = new Date().toISOString().slice(0, 10);

const pages = [];

pages.push(`/live`);
pages.push(`/artists`);

artists.forEach((artist) => {
  pages.push(`/artists/${artist.slug}`);
});

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/xml; charset=utf-8",
  });
  const sitemap = Sitemap.render({ pages, lastmod });
  const out = `<?xml version="1.0" encoding="UTF-8"?>${sitemap.html}`;
  res.end(out);
}

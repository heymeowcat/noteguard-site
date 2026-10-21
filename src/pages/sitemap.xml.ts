import type { APIRoute } from "astro";

/*
 * One sitemap, written by hand rather than by the integration, so the
 * addresses, the modification dates and the priorities are all in one
 * readable place. The addresses match the canonical tags exactly.
 */
const pages = [
	{ path: "/", changefreq: "weekly", priority: "1.0", lastmod: "2026-11-10" },
	{
		path: "/release-notes/",
		changefreq: "monthly",
		priority: "0.8",
		lastmod: "2026-11-10",
	},
	{
		path: "/press/",
		changefreq: "monthly",
		priority: "0.5",
		lastmod: "2026-11-10",
	},
	{
		path: "/privacy-policy/",
		changefreq: "yearly",
		priority: "0.3",
		lastmod: "2026-11-10",
	},
	{
		path: "/terms-of-service/",
		changefreq: "yearly",
		priority: "0.3",
		lastmod: "2026-11-10",
	},
];

export const GET: APIRoute = ({ site: astroSite }) => {
	const origin = astroSite?.toString().replace(/\/$/, "") ?? "";
	const base = import.meta.env.BASE_URL.replace(/\/$/, "");

	const entries = pages
		.map((page) => {
			const loc = `${origin}${base}${page.path}`;
			return `\t<url>\n\t\t<loc>${loc}</loc>\n\t\t<lastmod>${page.lastmod}</lastmod>\n\t\t<changefreq>${page.changefreq}</changefreq>\n\t\t<priority>${page.priority}</priority>\n\t</url>`;
		})
		.join("\n");

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

	return new Response(body, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};

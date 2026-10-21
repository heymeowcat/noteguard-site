# NoteGuard — search and link strategy

The site is the only part of NoteGuard that can be found by people who have
not heard of it. This is what the site is for, and how it is meant to earn
links and search traffic.

## What the site has to do

Three jobs, in this order:

1. **Say what the app is, in one sentence, to someone who has never heard of
   it.** The homepage does this in the headline and the paragraph under it.
2. **Earn trust from a stranger.** Encryption detail, the privacy policy and
   the release notes exist so a writer, a reviewer or a security-minded
   visitor can check a claim rather than take it on faith.
3. **Give away something worth linking to.** A page that only says "download
   the app" gets no links. A page that says something true, specific and
   reusable gets quoted and cited.

## The technical position

Everything technical is already in place. This is the checklist, so a change
that breaks one of them is caught.

| Thing | Where | Notes |
| --- | --- | --- |
| One `h1` per page | every page | The mockups use `p` for the editor's title so they cannot add one |
| Heading order | every page | No level is skipped; the footer headings are `h3` under the last `h2` |
| Unique title and description | `src/layouts/Layout.astro` | Titles under 60 characters, descriptions under 160 |
| Canonical URL | `src/layouts/Layout.astro` | Trailing slash, matching the sitemap exactly |
| Open Graph and Twitter card | `src/layouts/Layout.astro` | 1200×630 image, with alt text |
| Structured data | `src/layouts/Layout.astro` | `WebSite` and `Organization` everywhere; `SoftwareApplication` and `FAQPage` on the homepage; `BreadcrumbList` on the inner pages |
| Sitemap | `src/pages/sitemap.xml.ts` | One hand-written file, with `lastmod` and priorities |
| Robots | `public/robots.txt` | Points at the sitemap above |
| HTTPS | `src/layouts/Layout.astro` | A CSP with `upgrade-insecure-requests`, and no absolute asset URLs |
| Search Console | `src/layouts/Layout.astro` | Set `PUBLIC_GOOGLE_SITE_VERIFICATION` and `PUBLIC_BING_SITE_VERIFICATION` in the deployment environment |
| Alt text | every image | Decorative images take `alt=""`, which is the correct answer for them |

## Core Web Vitals

The site ships **no JavaScript framework**. The app mockups are static
markup, and the two things that move — which screen the device is showing,
and the few degrees it leans with the pointer — are a dozen lines of plain
script in `src/components/Showcase.astro`. React, framer-motion and
lucide-react were removed from the project for this reason.

What that buys:

- Nothing to download, parse, hydrate or execute before the page is
  interactive. The whole page is HTML and one small stylesheet.
- No layout shift from a framework hydrating late.
- Below-the-fold sections use `content-visibility: auto`, so the browser
  paints the first screen rather than the whole page.
- The font is preloaded, so the headline paints in Outfit the first time.

The cost is that the mockups cannot be written as React components. They
live in `src/components/screens/` as Astro files, and the icons in
`src/lib/mockup-icons.ts` are static markup generated from lucide.

## Linkable assets

A page is only worth linking to if it contains something a writer can
reuse. These are the pages, and what each one gives away:

| Page | What it gives a writer |
| --- | --- |
| `/` | The headline, the feature list and the download button |
| `/release-notes/` | The full feature list, written plainly, with no marketing language |
| `/press/` | A one-paragraph description that can be copied verbatim, plus the numbers |
| `/privacy-policy/` | What is collected, which is nothing |

If a site publishes a round-up of offline notes apps, the fair thing is for
it to link to `/press/` and to `/`, and to link the Play listing only when
it is linking the download itself.

## Where links come from

**Directories and app lists.** The app is on Google Play. It should also be
listed where Android apps are collected — F-Droid, IzzyOnDroid, APKMirror
and the privacy and self-hosting lists that people who care about this kind
of app actually read. Each listing is a link, and several of them are
exactly the audience that would write about it.

**Privacy and self-hosting communities.** The audience for NoteGuard is
people who already distrust cloud notes apps. They are on Lobsters, Hacker
News, r/androidapps, r/degoogle, r/privacy and the Mastodon instances that
talk about local-first software. A post there should lead with the vault
and the PIN, not with the AI.

**Open source communities.** The repository is the strongest link target the
project has, because a source link is worth more to a technical audience
than a download link. A README that says plainly what the app does and what
it refuses to do gets quoted; a README that says "seamless" does not.

**Reviews and comparisons.** Comparisons against other private notes apps
are the highest-intent traffic the site can get. They are written by
people, not produced by the site, and the site's job is to make the claims
easy to check: the encryption detail, the privacy policy and the release
notes are all citable.

**Podcasts and newsletters.** The press kit exists for this. One paragraph
and a set of numbers is enough for someone to describe the app on air
without getting it wrong.

## Search

The words the site should be found for, in the order they matter:

- `offline notes app` / `private notes android` — the head terms
- `encrypted notes android` / `notes app with PIN lock` — the security intent
- `markdown notes app` / `obsidian vault android` — the format intent
- `on device ai notes` / `local llm notes app` — the AI intent, and the
  one that is least contested by competitors
- `version history notes` / `notes app with task reminders` — the features
  that are hard to copy

The homepage title, description and headings carry those terms. The release
notes carry the long tail, because they say in full what the features are
called.

## What is deliberately not done

- **No guest posts and no link exchanges.** They bring nothing but a
  followed link and the wrong readers.
- **No directories that want a listing fee.** A paid listing is a link that
  gets filtered, and it says something untrue about the app.
- **No artificial engagement.** No comment sections, no "leave a review"
  widgets, no share counters. None of them are features of a private notes
  app, and every one of them would add a tracker to a site whose whole
  argument is that it has none.
- **No tracking of any kind on this site either.** There is no analytics
  script, and there will not be one. Search Console's own performance
  report answers the question that an analytics script would have answered.

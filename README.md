# NoteGuard — website

The marketing site for [NoteGuard](https://play.google.com/store/apps/details?id=com.heymeowcat.list&hl=en),
the private, offline notes app for Android.

The copy on this site is meant to describe the app that actually ships. When
the app changes, the facts that live in
[`src/lib/site.ts`](src/lib/site.ts) — the version, the Play package, the
on-device model catalog — change with it, so the site cannot drift into
describing a feature the app does not have.

## Commands

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Start the dev server at `localhost:4321`          |
| `npm run build`   | Build the production site to `./dist/`            |
| `npm run preview` | Preview the build locally, before deploying       |

## The site ships no framework

There is no React, no virtual DOM and no hydration. The app mockups are
static markup, and the only two things that move — which screen the device
is showing, and the few degrees it leans with the pointer — are a dozen
lines of plain script at the bottom of
[`src/components/Showcase.astro`](src/components/Showcase.astro).

That is why `@astrojs/react`, `framer-motion`, `lucide-react`, `clsx` and
`tailwind-merge` are not dependencies. The build output is a handful of
files and no JavaScript at all beyond that one inline module.

## Structure

```text
src/
├── components/
│   ├── Showcase.astro          # the sticky device, one screen per feature
│   ├── screens/                # the mock screens, as plain Astro
│   │   ├── Folders.astro
│   │   ├── Notes.astro         # the note list, with the unlock dialog
│   │   ├── Editor.astro
│   │   ├── Tasks.astro
│   │   └── AI.astro
│   ├── Hero.astro              # headline and the vault file visual
│   ├── FeatureGrid.astro       # everything the app does, in one grid
│   ├── SecuritySection.astro
│   ├── AISection.astro
│   ├── AndroidSection.astro
│   ├── PrivacySection.astro    # privacy claims and the FAQ
│   ├── DownloadCta.astro
│   ├── PageHeader.astro        # shared header for the inner pages
│   └── Footer.astro
├── layouts/Layout.astro        # <head>, structured data, the site nav
├── lib/
│   ├── site.ts                 # the facts about the app
│   ├── faq.ts                  # the FAQ, and the FAQPage structured data
│   └── mockup-icons.ts         # the icons the mock screens use
├── pages/
│   ├── index.astro             # the homepage
│   ├── release-notes.astro      # the release notes
│   ├── press.astro             # the press kit, and a link target
│   ├── privacy-policy.astro
│   ├── terms-of-service.astro
│   ├── sitemap.xml.ts          # one hand-written sitemap
│   └── whats-new.astro         # a redirect from the old address
└── styles/global.css           # Tailwind theme tokens and the legal page styles
```

## Notes for editing

- **Astro templates use `class`, not `className`.** `className` is silently
  rendered as a `classname` attribute and the element ends up with no styles.
- **The site is served from a subpath** (`/noteguard-site`). Build links with
  `url()` and `home()` from `src/lib/site.ts` rather than hard-coding a path.
- **Grid tracks need `minmax(0, 1fr)`.** A track written as `1fr` still
  takes its base size from the content's min-content width, so one long
  unbreakable string can push the page past the viewport. The grids use
  `grid-cols-1` for the same reason.
- **The phone mockups** in `src/components/screens/` use the app's own dark
  theme and the real labels it shows. They are illustrations, so they are
  `aria-hidden`, and the editor's title is a `p` rather than an `h1` so the
  page keeps exactly one heading of the first level.
- **Contrast.** The greys on the near-black surfaces are picked to clear
  4.5:1 — use `#9E9EA4` and `#8E8E93` rather than `zinc-500`/`zinc-600`.
  Lighthouse is at 100 for accessibility, best practices and SEO on every
  page.
- **The mock icons** in `src/lib/mockup-icons.ts` are static markup. If one
  needs changing, change the path in that file rather than reaching for a
  component.

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

## Structure

```text
src/
├── components/
│   ├── FeatureShowcase.tsx  # the sticky phone, one screen per feature
│   ├── screens.tsx          # the phone mockups, drawn from the app's theme
│   ├── Hero.astro           # headline and the vault file visual
│   ├── FeatureGrid.astro    # everything the app does, in one grid
│   ├── SecuritySection.astro
│   ├── AISection.astro
│   ├── AndroidSection.astro
│   ├── PrivacySection.astro # privacy claims and the FAQ
│   ├── DownloadCta.astro
│   ├── PageHeader.astro     # shared header for the inner pages
│   ├── Footer.astro
│   └── Nav (in Layout.astro)
├── layouts/Layout.astro     # <head>, structured data, the site nav
├── lib/
│   ├── site.ts              # the facts about the app
│   └── faq.ts               # the FAQ, and the FAQPage structured data
├── pages/
│   ├── index.astro          # the homepage
│   ├── whats-new.astro      # the release notes
│   ├── privacy-policy.astro
│   └── terms-of-service.astro
└── styles/global.css        # Tailwind theme tokens and the legal page styles
```

## Notes for editing

- **Astro templates use `class`, not `className`.** `className` is silently
  rendered as a `classname` attribute and the element ends up with no styles.
- **The site is served from a subpath** (`/noteguard-site`). Build links with
  `url()` and `home()` from `src/lib/site.ts` rather than hard-coding a path.
- **The phone mockups** in `src/components/screens.tsx` use the app's own dark
  theme (`#000000` screens, `#1C1C1E` cards, `#BB86FC` accent) and the real
  labels the app shows. They are illustrations, so they are `aria-hidden`.
- **Contrast.** The greys on the near-black surfaces are picked to clear
  4.5:1 — use `#9E9EA4` and `#8E8E93` rather than `zinc-500`/`zinc-600`.
  Lighthouse is at 100 for accessibility, best practices and SEO.

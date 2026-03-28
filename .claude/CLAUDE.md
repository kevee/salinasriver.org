# Salinas River Recreation Guide

A bilingual (English/Spanish) static site built with Eleventy 3 and WebC components. The site helps people find access points, plan paddling trips, check water conditions, and view photos of the Salinas River in Central California.

## Core Principles

1. **All changes must support both English and Spanish.** Every user-facing string must use the i18n system. Never hardcode English text in templates.
2. **WCAG 2 AA compliance is required.** Use semantic HTML, ARIA labels, sufficient color contrast, keyboard navigability, and accessible form controls.
3. **Prioritize usability.** The site serves real people trying to safely access the river. Clarity and simplicity over cleverness.

## Tech Stack

- **Eleventy 3** with TypeScript config (`eleventy.config.ts`)
- **WebC** for components (`src/_components/`)
- **i18next** for translations (`src/_data/locales/en.json`, `es.json`)
- **Leaflet 2** for interactive maps
- **Sass** for styling (scoped in WebC `<style>` blocks)
- **Pagefind** for client-side search

## Internationalization

Translation files live in `src/_data/locales/en.json` and `src/_data/locales/es.json`. The i18n system is defined in `src/_lib/i18n/filters.ts`.

### Key filters (available in all WebC templates)

- `t(key)` - Translate a string key for the current page language. Usage: `@text="t('accessPoints')"` or `@raw="t('footer.by')"` for HTML content.
- `u(path)` - Prefix a URL path with the current language. Usage: `:href="u('/access-points/')"` outputs `/en/access-points/` or `/es/access-points/`.
- `l(object, value)` - Get a localized value from a `translate` object in data files. Usage: `@text="l(point.translate, 'title')"` reads `point.translate.en.title` or `point.translate.es.title`.
- `formatDate(dateStr)`, `formatDateTime(dateStr)`, `formatNumber(value)` - Locale-aware formatting.
- `switchLanguagePath()` - Generate URL to the same page in the other language.

### Adding new strings

1. Add the key to both `en.json` and `es.json`
2. Use `t('key')` in templates
3. For data files (access points, trips), add translations under `translate.en` and `translate.es`

### Page structure

English and Spanish pages mirror each other under `src/en/` and `src/es/`. Each page sets `lang` in its front matter. Dynamic pages (access points, trips) use Eleventy pagination with `permalink` functions that include the language prefix.

## Project Structure

```
src/
  _components/
    common/       # Reusable components (flow-badge, flood-warning, etc.)
    layout/       # Header, footer, global styles
    pages/        # Page-level components
  _data/
    locales/      # en.json, es.json translation files
    accessPoints/ # JSON files per access point
    trips/        # JSON files per trip
    images/       # Source photos
  _includes/      # Layouts (base.webc, default.webc)
  _js/            # Client-side JS (maps, interactivity)
  _lib/           # Build-time code
    i18n/         # i18next init and filters
    data/         # Data processing (gauges, photos, maps)
  en/             # English pages
  es/             # Spanish pages (mirrors en/)
  assets/         # Static assets
```

## Data Model

- **Access points**: JSON files in `src/_data/accessPoints/`. Include lat/lon, county, gauge association, flow recommendations, GeoJSON directions, ADA accessibility, and bilingual translate blocks.
- **Trips**: JSON files in `src/_data/trips/`. Include route as GeoJSON LineString, put-in/take-out points, and bilingual translate blocks.
- **Gauges**: Fetched from USGS at build time (`src/_lib/data/fetch-gauges.ts`). Six stations with real-time flow (cfs) and height data.

## Commands

- `npm run dev` - Start dev server (Eleventy with `--serve`)
- `npm run build` - Full build (Eleventy + Pagefind indexing)

## Style Conventions

- CSS variables are defined in `src/_components/layout/site-styles.webc`
- Component styles are scoped inside each `.webc` file's `<style>` block
- Key colors: `--main-blue: #0050b8`, `--light-blue: #bde2e8`

# Roadworks IRE — Claude Guide

## Adding a New Blog Post

Every new blog post follows the same workflow. Use this as a checklist.

### 1. Gather Info

- **Owner name, car details, write-up text** from the user
- **Photos** placed in `public/cars/<folder_name>/` (e.g. `public/cars/chris_jzx/`)
- Photo `01` is always the **hero/cover image**
- Sequential photos after `01` go **inline between paragraphs** (one per paragraph gap)
- Remaining photos go in the **gallery section** at the bottom
- Look at the car's photos to determine a **theme color** that matches the build

### 2. Create the Blog Post HTML

Create `blog/<slug>.html` using an existing post (e.g. `blog/joshs-s15.html`) as the template. Key sections:

```
<head>
  - Google Analytics tag
  - Meta tags (title, description, keywords, author, canonical)
  - Preload/preconnect for image folder
  - Preload critical images (01, 02, 03)
  - Open Graph (og:type article, og:image, article:published_time, article:tag)
  - Twitter card
  - Schema.org structured data (@type Article, Car, EngineSpecification)
  - Favicon, fonts, CSS, dark mode script
</head>
<body>
  - Skip to content link
  - Progress bar
  - Header (with ../  relative paths, Blog nav-link marked active)
  - Mobile menu (same ../  relative paths, Blog marked active)
  - Hero section (post-hero class, cover image 01, title, date, read time, author)
  - Article content:
    - Paragraphs with inline images between them
    - Section headings (h2 with font-display) for natural breaks (Exterior, Interior, Under the Bonnet, etc.)
    - Bold key specs/names with <strong> tags
    - Closing paragraph + italic "// Noah"
    - Share buttons (Copy, WhatsApp, X/Twitter)
    - Spec sheet (owner, make/model, engine, power, key mods list)
    - Post navigation (see step 5)
    - Gallery section with gallery-grid
  - Lightbox
  - Back to top button
  - Footer
  - JS script (../js/main.js)
</body>
```

**Gallery image loading pattern:**
- First 6 images: `loading="eager" decoding="sync" fetchpriority="high"`
- Remaining images: `loading="lazy" decoding="async"`

**Image paths** from the `blog/` directory use `../public/cars/<folder>/` prefix.

### 3. Update the Site Theme Color

The theme color should match the featured car. Update in **all** of these places:

| File | What to change |
|---|---|
| `js/main.js` | `featuredCar` object — `themeColor` and `secondaryColor` hex values, plus `id`, `name`, `slug`, `tagline`, `owner` |
| `css/input.css` | `:root` variables — `--theme-color` (RGB), `--theme-hex`, `--theme-dark` |
| `tailwind.config.js` | `colors.theme` and `colors['theme-dark']` |
| `css/styles.css` | Find-replace old hex/RGB values with new ones (this is the compiled CSS the browser loads — if not rebuilt via `npm run build:css`, update manually with sed) |
| Blog post Instagram buttons | Any `bg-[#OLDHEX]` / `hover:bg-[#OLDHEX]` Tailwind arbitrary classes in all `blog/*.html` files |
| `index.html` | `<meta name="theme-color">` value |

**To find all remaining old color references:** `grep -r '#OLDHEX' --include='*.html' --include='*.css' --include='*.js'`

### 4. Update the Homepage (`index.html`)

- **Hero section**: image src, alt text, h1 title, subtitle, CTA link
- **Latest Story card**: image, title, description, date, read time, image count, link
- **Meta tags**: title, description, keywords, OG tags, Twitter tags, theme-color
- **Structured data**: description text

### 5. Fix Post Navigation Links

The navigation chain runs newest (left empty) to oldest (right empty):

```
[Newest] → post2 → post3 → ... → [Oldest]
          ←       ←              ←
```

- Left arrow (←) = **newer** post
- Right arrow (→) = **older** post
- The **newest** post has an empty `<div></div>` on the left
- The **oldest** post has an empty `<div></div>` on the right

When adding a new post:
1. **New post**: left = empty div, right = link to previous newest post
2. **Previous newest post**: replace its empty left div with a left-arrow link to the new post

### 6. Update the Blog Index (`blog.html`)

- Add the new post as the **first card** in the grid (before all others)
- Update the page's meta tags (title, description, OG) to reference the new post
- Add a new `BlogPosting` entry to the Schema.org structured data

### 7. Update the Sitemap (`sitemap.xml`)

Add a new `<url>` entry under the `<!-- Blog Posts -->` section:
```xml
<url>
    <loc>https://roadworksire.com/blog/<slug>.html</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
```

### 8. Verification Checklist

- [ ] No references to old theme color hex remain (grep for it)
- [ ] Navigation chain is complete — every post links to its neighbours
- [ ] New post appears first in `blog.html` grid
- [ ] Homepage hero and Latest Story point to new post
- [ ] `featuredCar` in `main.js` matches new post
- [ ] Sitemap includes new post URL
- [ ] All image paths resolve (check `public/cars/<folder>/` contents match what the HTML references)

---

## Project Structure Reference

```
index.html          — Homepage (hero + latest story + sections)
intro.html          — About page
blog.html           — Blog index grid
blog/*.html         — Individual blog posts
events.html         — Events index
events/*.html       — Individual event pages
featured-sheds.html — Coming soon
sunroof.html        — Coming soon
projects.html       — Coming soon
css/input.css       — CSS source (Tailwind + custom)
css/styles.css      — Compiled CSS (what the browser loads)
js/main.js          — All JS (theme, gallery, lightbox, nav, etc.)
public/brand/       — Logo
public/cars/        — Car photo folders
public/events/      — Event photo folders
tailwind.config.js  — Tailwind configuration
sitemap.xml         — SEO sitemap
sw.js               — Service worker
```

## Blog Post Order (newest first)

1. Chris' 90 (JZX90) — April 10, 2026
2. Summer Nights — February 24, 2026
3. Team Fool JZX — February 23, 2026
4. Sean's EP3 Type R — February 20, 2026
5. Garry's IS200 — February 6, 2026
6. Andrew's Sierra — January 29, 2026
7. Jordon's HCR32 — January 28, 2026
8. Shane's JZX81 — January 27, 2026
9. Josh's S15 — January 26, 2024

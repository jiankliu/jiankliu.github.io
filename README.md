# Neural Computation Laboratory

The public laboratory website at https://jiankliu.github.io/, hosted by GitHub Pages from `main`.

## Files

- `index.html`: homepage, research, selected projects, news, joining and contact information.
- `people.html`: principal investigator, team directory and alumni.
- `publications.html`: complete publication archive, with search and year filters.
- `assets/css/styles.css`: shared typography, colours and responsive layouts.
- `assets/js/site.js`: mobile navigation, directory filters and publication search.
- `assets/images/people/`: local, optimized team portraits.
- `assets/images/sources.json`: original portrait sources and image processing notes.

The site uses plain HTML, CSS and JavaScript. It needs no framework, package install, API key or build step. All content is readable when JavaScript is disabled.

## Preview locally

From the repository directory, run `python3 -m http.server 8000`, then open http://localhost:8000/.

## Update a person or photo

Save an approved portrait in `assets/images/people/` using a descriptive filename such as `firstname-lastname.jpg`. Use a JPEG around 640 pixels on its longest edge, and remove private metadata. Update the relevant image and name in `people.html`; update `index.html` too if the person is featured there. Keep the image `alt` text matched to the person's name, and update the portrait source record.

Lana Whitmarsh's original source image is a recruitment mascot rather than a portrait. Her directory card intentionally uses initials. To add her photo, replace that fallback with the same `portrait-wrap` / `img data-portrait` structure used by the other team cards.

When adding a person, preserve `data-filter-item`, `data-category` (`fellows` or `students`) and `data-search-text` so filters include the new card.

## Update publications

Add a `publication-item` in `publications.html` in descending year order, following an existing item. Set `data-year`, `data-category` (the year, or `earlier` for 2023 and before) and `data-search-text`. Use the paper's verified DOI link. Selected recent papers are also featured in `index.html`.

## Publishing

Commit changes to `main`. GitHub Pages builds and publishes the static files. Keep the existing `notebook_images/` and `index.md` teaching/archive files unless their removal is intentional.

The redesign preserves the existing publication archive and legacy homepage fragments, including `#about` and `#projects`. Portrait names and roles were matched to the cards on the original lab People page. The original Google Sites website remains linked for older news and additional material.

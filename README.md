# Neural Computation Laboratory

The public laboratory website at https://jiankliu.github.io/, hosted by GitHub Pages from `main`.

## Files

- `index.html`: homepage, research, selected projects, news, joining and contact information.
- `people.html`: principal investigator, team directory and alumni.
- `publications.html`: complete publication archive, with search and year filters.
- `publications.json`: structured publication resources, profile links and migration provenance.
- `visual-coding.html`: local visual coding demonstration notes and links to the paper, code and data.
- `visual-coding.json`: demonstration source notes, including the three original videos that are currently unavailable.
- `news.html`: lab news archive, with search and year filters from 2022 onwards.
- `news.json`: structured news records, original dates and source provenance.
- `assets/css/styles.css`: shared typography, colours and responsive layouts.
- `assets/js/site.js`: mobile navigation, directory filters, publication search and news search.
- `assets/images/people/`: local, optimized team portraits.
- `assets/images/sources.json`: original portrait sources and image processing notes.

The site uses plain HTML, CSS and JavaScript. It needs no framework, package install, API key or build step. All content is readable when JavaScript is disabled. The root HTML pages contain the content directly; the JSON records are maintenance and provenance files, with no browser JavaScript dependency.

## Preview locally

From the repository directory, run `python3 -m http.server 8000`, then open http://localhost:8000/.

## Update a person or photo

Save an approved portrait in `assets/images/people/` using a descriptive filename such as `firstname-lastname.jpg`. Use a JPEG around 640 pixels on its longest edge, and remove private metadata. Update the relevant image and name in `people.html`; update `index.html` too if the person is featured there. Keep the image `alt` text matched to the person's name, and update the portrait source record.

Lana Whitmarsh's original source image is a recruitment mascot rather than a portrait. Her directory card intentionally uses initials. To add her photo, replace that fallback with the same `portrait-wrap` / `img data-portrait` structure used by the other team cards.

When adding a person, preserve `data-filter-item`, `data-category` (`fellows` or `students`) and `data-search-text` so filters include the new card.

## Update publications

Add a `publication-item` in `publications.html` in descending year order, following an existing item. Set `data-year`, `data-category` (the year, or `earlier` for 2023 and before) and `data-search-text`. Use the paper's verified DOI link. Put full-text, code, data, poster, video and supplementary links in its `publication-links` group, and record the same destinations in `publications.json`. Selected recent papers are also featured in `index.html`.

The Google Scholar and ResearchGate profile buttons use the verified Jian K. Liu profiles recorded in `publications.json`. All publication resources are linked directly from this site; the former Google Sites archive is no longer required. The visual coding demos have their own local page, `visual-coding.html`. Its three original YouTube videos are currently unavailable; the page preserves the demonstration descriptions and working paper, code and data links, while `visual-coding.json` records their source status. During migration, three source links labelled PDF were found to point to different papers; the manifest records these errors and the corrected targets. The former Striking Image page had also been repurposed, so its link now opens the matching paper's Figure 1. The obsolete Göttingen press link is replaced by its institutional Gö-VIP summary.

## Publishing

Commit changes to `main`. GitHub Pages builds and publishes the static files. Keep the existing `notebook_images/` and `index.md` teaching/archive files unless their removal is intentional.

The redesign preserves the existing publication archive and legacy homepage fragments, including `#about` and `#projects`. Portrait names and roles were matched to the cards on the original lab People page. The original Google Sites website remains linked as a source for additional material; the news archive is now hosted here.

## Update news

Add a `news-row` article to `news.html` in descending date order, following an existing archive item. Use `time datetime="YYYY-MM"`, `data-filter-item`, `data-year`, `data-category` (the year) and `data-search-text` so dates and filters remain accessible. Add a year button when the archive enters a new year. Record the same content and source in `news.json`; it is a maintenance record rather than a browser dependency. Highlighted news on `index.html` is maintained separately.

Future-dated announcements must remain visibly labelled “Upcoming” until the event is confirmed. The November 2026 Congrui Yang announcement was upcoming when migrated on 25 October 2026. Dates and degree details were preserved from the original Google Sites homepage. Zhile Yang’s May 2022 welcome was retained from its indexed archive even though it no longer appears on the current source homepage. Recruitment links point directly to the university for current application and funding information.

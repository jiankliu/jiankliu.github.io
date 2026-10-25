# Neural Computation Laboratory

The public laboratory website at https://jiankliu.github.io/, hosted by GitHub Pages from `main`.

## Files

- `index.html`: homepage, research, selected projects, news, joining and contact information.
- `join-us.html`: joining guidance and eleven PhD questions, using native expandable answers.
- `joining-faq.json`: joining questions, source answers and notes on refreshed university guidance.
- `research-highlights.html`: project explanations, research figures, references and code links.
- `research-highlights.json`: structured highlight content, figure locations and source provenance.
- `people.html`: principal investigator, team directory and alumni.
- `publications.html`: selected publications with code, with search and year filters.
- `publications.json`: structured publication resources, profile links and migration provenance.
- `news.html`: lab news archive, with search and year filters from 2022 onwards.
- `news.json`: structured news records, original dates and source provenance.
- `assets/css/styles.css`: shared typography, colours and responsive layouts.
- `assets/js/site.js`: mobile navigation, directory filters, publication search and news search.
- `assets/images/people/`: local, optimized team portraits.
- `assets/images/sources.json`: original portrait sources and image processing notes.
- `assets/images/highlight-*.png`: local figures used in the research highlights.
- `assets/images/highlight-sources.json`: figure source URLs, dimensions and checksums.

The site uses plain HTML, CSS and JavaScript. It needs no framework, package install, API key or build step. All content is readable when JavaScript is disabled. The root HTML pages contain the content directly; the JSON records are maintenance and provenance files, with no browser JavaScript dependency.

External web links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`. Keep these attributes when adding links to other websites. Navigation within this site and email links use their normal behaviour.

## Preview locally

From the repository directory, run `python3 -m http.server 8000`, then open http://localhost:8000/.

## Update a person or photo

Save an approved portrait in `assets/images/people/` using a descriptive filename such as `firstname-lastname.jpg`. Use a JPEG around 640 pixels on its longest edge, and remove private metadata. Update the relevant image and name in `people.html`; update `index.html` too if the person is featured there. Keep the image `alt` text matched to the person's name, and update the portrait source record.

Lana Whitmarsh's original source image is a recruitment mascot rather than a portrait. Her directory card intentionally uses initials. To add her photo, replace that fallback with the same `portrait-wrap` / `img data-portrait` structure used by the other team cards.

When adding a person, preserve `data-filter-item`, `data-category` (`fellows` or `students`) and `data-search-text` so filters include the new card.

## Update publications

List only papers that have a code link. The complete bibliography is linked through Google Scholar. Add an eligible `publication-item` in `publications.html` in descending year order, following an existing item. Set `data-year`, `data-category` (the year, or `earlier` for 2023 and before) and `data-search-text`. Use the paper's verified DOI link. Put code, data, poster, video and supplementary links in its `publication-links` group, and record the same destinations in `publications.json`. The provenance manifest retains all source entries; `listing_policy: code_available` limits the rendered list to papers with a Code resource. Selected recent papers are also featured in `index.html`.

The Google Scholar and ResearchGate profile buttons use the verified Jian K. Liu profiles recorded in `publications.json`. Resources for the listed publications are linked directly from this site.

## Publishing

Commit changes to `main`. GitHub Pages builds and publishes the static files. 

## Update news

Add a `news-row` article to `news.html` in descending date order, following an existing archive item. Use `time datetime="YYYY-MM"`, `data-filter-item`, `data-year`, `data-category` (the year) and `data-search-text` so dates and filters remain accessible. Add a year button when the archive enters a new year. Record the same content and source in `news.json`; it is a maintenance record rather than a browser dependency. Highlighted news on `index.html` is maintained separately.



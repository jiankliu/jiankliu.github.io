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

## Preview locally

From the repository directory, run `python3 -m http.server 8000`, then open http://localhost:8000/.

## Update a person or photo

Save an approved portrait in `assets/images/people/` using a descriptive filename such as `firstname-lastname.jpg`. Use a JPEG around 640 pixels on its longest edge, and remove private metadata. Update the relevant image and name in `people.html`; update `index.html` too if the person is featured there. Keep the image `alt` text matched to the person's name, and update the portrait source record.

Lana Whitmarsh's original source image is a recruitment mascot rather than a portrait. Her directory card intentionally uses initials. To add her photo, replace that fallback with the same `portrait-wrap` / `img data-portrait` structure used by the other team cards.

When adding a person, preserve `data-filter-item`, `data-category` (`fellows` or `students`) and `data-search-text` so filters include the new card.

## Update publications

List only papers that have a code link. The complete bibliography is linked through Google Scholar. Add an eligible `publication-item` in `publications.html` in descending year order, following an existing item. Set `data-year`, `data-category` (the year, or `earlier` for 2023 and before) and `data-search-text`. Use the paper's verified DOI link. Put code, data, poster, video and supplementary links in its `publication-links` group, and record the same destinations in `publications.json`. The provenance manifest retains all source entries; `listing_policy: code_available` limits the rendered list to papers with a Code resource. Selected recent papers are also featured in `index.html`.

Keep the primary Read paper link. Separate Preprint, Institutional record, Published version, PDF and full-text controls are omitted.

The Google Scholar and ResearchGate profile buttons use the verified Jian K. Liu profiles recorded in `publications.json`. Resources for the listed publications are linked directly from this site; the former Google Sites archive is no longer required. During migration, three source links labelled PDF were found to point to different papers; the manifest records these errors and the corrected targets. The obsolete Göttingen press link is replaced by its institutional Gö-VIP summary.

## Publishing

Commit changes to `main`. GitHub Pages builds and publishes the static files. Keep the existing `notebook_images/` and `index.md` teaching/archive files unless their removal is intentional.

The site retains publication source records and legacy homepage fragments, including `#about` and `#projects`. Portrait names and roles were matched to the cards on the original lab People page. The original Google Sites website remains linked as a source for additional material; the news archive, research highlights and joining FAQ are now hosted here.

## Update the joining FAQ

The homepage’s Joining the lab: FAQ link opens `join-us.html`. Keep the eleven questions and their funding, application and lab-life group IDs stable when editing. Each answer uses native `details` and `summary` elements, so it can be expanded with a mouse or keyboard and works without JavaScript. Record the same wording, source evidence and changes in `joining-faq.json`.

The original joining page contained outdated degree, English-test and funding-cycle details. The new FAQ preserves the lab’s guidance while linking to current University of Birmingham requirements. Check the current programme and funding pages before updating eligibility, fee coverage, deadlines or study duration; avoid promising funding or copying a fixed score or deadline without current evidence.

## Update research highlights

The four Selected work cards on `index.html` link to matching section IDs in `research-highlights.html`. Keep those IDs stable when editing a project so existing links continue to work. The dedicated page includes the four existing selections and the GPCR bioactivity project from the current source page.

Keep each highlight's explanation, figure caption and reference together. Use only Paper and Code resource controls, following the site's simplified publication links. Use accurate image `alt` text and retain local figures under `assets/images/`. Record the same content and source details in `research-highlights.json`, and figure provenance in `assets/images/highlight-sources.json`; it is a maintenance record, and the HTML works without JavaScript. Preserve the scope of the reported evidence, including simulated robotic control and experimental findings rather than clinical deployment claims.

## Update news

Add a `news-row` article to `news.html` in descending date order, following an existing archive item. Use `time datetime="YYYY-MM"`, `data-filter-item`, `data-year`, `data-category` (the year) and `data-search-text` so dates and filters remain accessible. Add a year button when the archive enters a new year. Record the same content and source in `news.json`; it is a maintenance record rather than a browser dependency. Highlighted news on `index.html` is maintained separately.

Future-dated announcements must remain visibly labelled “Upcoming” until the event is confirmed. The November 2026 Congrui Yang announcement was upcoming when migrated on 25 October 2026. Dates and degree details were preserved from the original Google Sites homepage. Zhile Yang’s May 2022 welcome was retained from its indexed archive even though it no longer appears on the current source homepage. Recruitment links point directly to the university for current application and funding information.

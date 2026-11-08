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
- `assets/js/selected-work.js`: keeps homepage section 05 synchronized with section 02’s Paper links.
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

When adding a person, preserve `data-filter-item`, `data-category` (`fellows` or `students`) and `data-search-text` so filters include the new card.

## Update publications

List only papers that have a code link. The complete bibliography is linked through Google Scholar. Add an eligible `publication-item` in `publications.html` in descending year order, following an existing item. Set `data-year`, `data-category` (the year, or `earlier` for 2023 and before) and `data-search-text`. Use the paper's verified DOI link. Put code, data, poster, video and supplementary links in its `publication-links` group, and record the same destinations in `publications.json`. The provenance manifest retains all source entries; `listing_policy: code_available` limits the rendered list to papers with a Code resource. The papers selected in homepage section 02 are also featured in section 05, in the same order.

## Update selected work

The research highlights order controls the homepage. Its first two `.research-highlight` sections are featured in homepage section 02, including their pictures, descriptions and links. The homepage retrieves `research-highlights.html` on page load, so changing that page’s order also updates the selection without editing `index.html` separately. Section 05 follows the same two papers and retrieves full citations from `publications.html`.

Add new records to `research-highlights.json` without an `added_at` field. When pages are regenerated, the generator assigns a creation timestamp, places each new addition first, and renumbers all highlights. Keep existing timestamps when editing a project; records with the same timestamp retain their stored order. Optional `home_title` and `home_kicker` fields provide shorter homepage wording. The first two records also generate the homepage’s readable fallback cards and citations.

Keep `data-home-title`, `data-home-kicker`, `data-highlight-year`, and the Paper/Code attributes on each generated highlight section when editing HTML. The generated homepage remains usable if JavaScript is disabled or either source page cannot be fetched. Papers without a publication entry use the highlight title and year until their full citation is added.

## Update news

Add a `news-row` article to `news.html` in descending date order, following an existing archive item. Use `time datetime="YYYY-MM"`, `data-filter-item`, `data-year`, `data-category` (the year) and `data-search-text` so dates and filters remain accessible. Add a year button when the archive enters a new year. Record the same content and source in `news.json`; it is a maintenance record rather than a browser dependency. Highlighted news on `index.html` is maintained separately.

/* Section 02's Paper links determine the selection and order in section 05. */
(() => {
  'use strict';

  const cards = document.querySelector('#highlights .highlights-grid');
  const list = document.querySelector('[data-selected-publications]');
  if (!cards || !list) return;

  const catalog = new Map();
  const text = (element) => element?.textContent.trim() || '';

  function paperKey(href) {
    try {
      const url = new URL(href, document.baseURI);
      if (!['http:', 'https:'].includes(url.protocol)) return '';
      url.hash = '';
      // DOI names are case-insensitive, including the arXiv DOI prefix.
      if (url.hostname === 'doi.org' || url.hostname === 'dx.doi.org') {
        return `doi:${url.pathname.replace(/\/$/, '').toLowerCase()}`;
      }
      return url.href;
    } catch {
      return '';
    }
  }

  function readCatalog(root) {
    for (const item of root.querySelectorAll('.publication-item')) {
      const link = item.querySelector('.publication-link[href]');
      const key = link && paperKey(link.getAttribute('href'));
      const title = text(item.querySelector('.publication-title'));
      if (key && title) {
        catalog.set(key, {
          title,
          year: text(item.querySelector('.publication-year')),
          meta: text(item.querySelector('.publication-meta')),
        });
      }
    }
  }

  function render() {
    const items = document.createDocumentFragment();
    for (const card of cards.querySelectorAll('.highlight-card')) {
      const paper = card.querySelector('[data-highlight-paper]')
        || [...card.querySelectorAll('.highlight-links a')]
          .find((link) => /^paper\b/i.test(text(link)));
      const href = paper?.getAttribute('href');
      const key = href && paperKey(href);
      if (!key) continue;

      const record = catalog.get(key) || {
        title: text(card.querySelector('h3')),
        year: '',
        meta: '',
      };
      const item = document.createElement('li');
      item.className = 'publication-item';
      const year = document.createElement('span');
      year.className = 'publication-year';
      year.textContent = record.year;
      const body = document.createElement('div');
      body.className = 'publication-body';
      const title = document.createElement('h3');
      title.className = 'publication-title';
      title.textContent = record.title;
      body.append(title);
      if (record.meta) {
        const meta = document.createElement('p');
        meta.className = 'publication-meta';
        meta.textContent = record.meta;
        body.append(meta);
      }
      const link = document.createElement('a');
      link.className = 'publication-link';
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Read ${record.title}`);
      link.append('Read paper ');
      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      link.append(arrow);
      body.append(link);
      item.append(year, body);
      items.append(item);
    }
    list.replaceChildren(items);
  }

  // Existing citations remain available even if the catalog request fails.
  // A newly selected, unlisted paper uses its card title and current Paper URL.
  readCatalog(list);
  render();

  const source = new URL(list.dataset.publicationSource, document.baseURI);
  if (source.origin !== location.origin) return;
  fetch(source, { cache: 'no-cache' })
    .then((response) => {
      if (!response.ok) throw new Error('Publication catalog unavailable');
      return response.text();
    })
    .then((markup) => {
      readCatalog(new DOMParser().parseFromString(markup, 'text/html'));
      render();
    })
    .catch(() => { /* The matching fallback selection is already displayed. */ });
})();

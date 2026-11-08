/* The first two research highlights drive homepage cards and recent work. */
(() => {
  'use strict';

  const cards = document.querySelector('#highlights .highlights-grid');
  const list = document.querySelector('[data-selected-publications]');
  if (!cards || !list) return;

  const catalog = new Map();
  const text = (element) => element?.textContent.trim() || '';

  function webUrl(href, base = document.baseURI) {
    if (!href) return null;
    try {
      const url = new URL(href, base);
      return ['http:', 'https:'].includes(url.protocol) ? url : null;
    } catch {
      return null;
    }
  }

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

  function actionLink(href, label, external, accessibleLabel) {
    const link = document.createElement('a');
    link.href = href;
    if (external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    if (accessibleLabel) link.setAttribute('aria-label', accessibleLabel);
    link.append(`${label} `);
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = external ? '↗' : '→';
    link.append(arrow);
    return link;
  }

  function renderHighlights(root, source) {
    const records = [...root.querySelectorAll('.research-highlight')].slice(0, 2)
      .map((section) => {
        const links = [...section.querySelectorAll('.highlight-reference a')];
        const paper = section.querySelector('[data-highlight-paper]')
          || links.find((link) => /^paper\b/i.test(text(link)));
        const code = section.querySelector('[data-highlight-code]')
          || links.find((link) => /^code\b/i.test(text(link)));
        const paperUrl = webUrl(paper?.getAttribute('href'), source);
        const codeUrl = webUrl(code?.getAttribute('href'), source);
        const title = text(section.querySelector('h2'));
        if (!section.id || !paperUrl || !title) return null;
        const detailUrl = new URL(source);
        detailUrl.hash = section.id;
        const image = section.querySelector('.highlight-figure img');
        const imageUrl = webUrl(image?.getAttribute('src'), source);
        const label = text(section.querySelector('.section-label')).split('/');
        const year = section.dataset.highlightYear || label.at(-1)?.trim() || '';
        const key = paperKey(paperUrl.href);
        if (!catalog.has(key)) catalog.set(key, { title, year, meta: '' });
        return {
          id: section.id,
          title: section.dataset.homeTitle || title,
          kicker: section.dataset.homeKicker || label.slice(1, -1).join('/').trim(),
          summary: text(section.querySelector('.highlight-detail-lead')),
          paperUrl, codeUrl, detailUrl,
          image: image && imageUrl ? {
            url: imageUrl,
            alt: image.getAttribute('alt') || '',
            width: image.getAttribute('width'),
            height: image.getAttribute('height'),
          } : null,
        };
      }).filter(Boolean);
    if (!records.length) return; // Retain the generated selection on a bad response.

    const items = document.createDocumentFragment();
    records.forEach((record, index) => {
      const card = document.createElement('article');
      card.className = `highlight-card${record.image ? ' highlight-card-featured' : ''}`;
      card.dataset.highlightId = record.id;
      const top = document.createElement('div');
      top.className = 'highlight-top';
      const kicker = document.createElement('span');
      kicker.className = 'highlight-kicker';
      kicker.textContent = record.kicker;
      const number = document.createElement('span');
      number.className = 'highlight-index';
      number.setAttribute('aria-hidden', 'true');
      number.textContent = String(index + 1).padStart(2, '0');
      top.append(kicker, number);
      card.append(top);
      if (record.image) {
        const image = document.createElement('img');
        image.className = 'highlight-card-image';
        image.src = record.image.url.href;
        image.alt = record.image.alt;
        for (const dimension of ['width', 'height']) {
          if (/^[1-9]\d*$/.test(record.image[dimension] || '')) {
            image.setAttribute(dimension, record.image[dimension]);
          }
        }
        image.loading = 'lazy';
        image.decoding = 'async';
        card.append(image);
      }
      const heading = document.createElement('h3');
      const headingLink = document.createElement('a');
      headingLink.href = record.detailUrl.href;
      headingLink.textContent = record.title;
      heading.append(headingLink);
      const summary = document.createElement('p');
      summary.textContent = record.summary;
      const links = document.createElement('div');
      links.className = 'highlight-links';
      links.append(actionLink(record.detailUrl.href, 'Highlight', false,
        `Read highlight: ${record.title}`));
      const paper = actionLink(record.paperUrl.href, 'Paper', true);
      paper.dataset.highlightPaper = '';
      links.append(paper);
      if (record.codeUrl) links.append(actionLink(record.codeUrl.href, 'Code', true));
      card.append(heading, summary, links);
      items.append(card);
    });
    cards.replaceChildren(items);
    render();
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

  function loadMarkup(path, apply) {
    const source = webUrl(path);
    if (!source || source.origin !== location.origin) return;
    fetch(source, { cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Selection source unavailable');
        return response.text();
      })
      .then((markup) => apply(new DOMParser().parseFromString(markup, 'text/html'), source))
      .catch(() => { /* Keep the readable generated cards and citations. */ });
  }

  loadMarkup(cards.dataset.highlightSource, renderHighlights);
  loadMarkup(list.dataset.publicationSource, (root) => {
      readCatalog(root);
      render();
  });
})();

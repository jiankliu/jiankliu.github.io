/* Progressive enhancement for the Neural Computation Laboratory website. */
(() => {
  'use strict';

  const normalize = (text) => String(text || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  function initializeNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    toggle.hidden = false;
    toggle.setAttribute('aria-expanded', 'false');

    function setOpen(open, restoreFocus = false) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.classList.toggle('is-open', open);
      nav.classList.toggle('is-open', open);
      if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false, true);
      }
    });

    document.addEventListener('click', (event) => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    // Reset an open mobile menu when the layout switches to or from desktop.
    window.matchMedia('(max-width: 800px)').addEventListener('change', () => setOpen(false));
  }

  function initializeFilters(section) {
    const search = section.querySelector('[data-search]');
    const buttons = [...section.querySelectorAll('[data-filter]')];
    const items = [...section.querySelectorAll('[data-filter-item]')].map((element) => ({
      element,
      text: normalize(element.dataset.searchText || element.textContent),
      categories: (element.dataset.category || '').split(/\s+/).filter(Boolean),
      year: element.dataset.year || '',
    }));
    const count = section.querySelector('[data-result-count]');
    const empty = section.querySelector('[data-no-results]');
    const controls = section.querySelectorAll('[data-filter-controls]');
    const noun = section.dataset.resultNoun || 'results';
    const singulars = { people: 'person', publications: 'publication', results: 'result' };
    let selected = buttons.find((button) => button.getAttribute('aria-pressed') === 'true')
      ?.dataset.filter || 'all';

    function update() {
      const terms = normalize(search?.value).split(/\s+/).filter(Boolean);
      let visible = 0;

      for (const item of items) {
        const matchesFilter = selected === 'all'
          || item.categories.includes(selected)
          || item.year === selected;
        const matchesSearch = terms.every((term) => item.text.includes(term));
        const show = matchesFilter && matchesSearch;
        item.element.hidden = !show;
        if (show) visible += 1;
      }

      for (const button of buttons) {
        const active = button.dataset.filter === selected;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('is-active', active);
      }

      if (count) {
        const label = visible === 1 ? (singulars[noun] || noun.replace(/s$/, '')) : noun;
        count.textContent = `${visible} ${label}`;
      }
      if (empty) empty.hidden = visible !== 0;
    }

    for (const button of buttons) {
      button.addEventListener('click', () => {
        selected = button.dataset.filter || 'all';
        update();
      });
    }

    search?.addEventListener('input', update);
    search?.addEventListener('search', update);
    search?.form?.addEventListener('submit', (event) => event.preventDefault());

    for (const reset of section.querySelectorAll('[data-clear-filters]')) {
      reset.addEventListener('click', () => {
        selected = 'all';
        if (search) search.value = '';
        update();
        if (search) search.focus();
        else buttons.find((button) => button.dataset.filter === 'all')?.focus();
      });
    }

    update();
    for (const control of controls) control.hidden = false;
  }

  function initializePortraits() {
    for (const image of document.querySelectorAll('img[data-portrait]')) {
      const showFallback = () => {
        const fallback = image.previousElementSibling;
        image.hidden = true;
        if (fallback?.classList.contains('portrait-fallback')) fallback.hidden = false;
      };
      image.addEventListener('error', showFallback, { once: true });
      if (image.complete && image.naturalWidth === 0) showFallback();
    }
  }

  function initialize() {
    document.documentElement.classList.add('js');
    initializeNavigation();
    document.querySelectorAll('[data-filter-list]').forEach(initializeFilters);
    initializePortraits();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();

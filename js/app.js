/* ============================================
   Linux for Windows Users — Slide App Logic
   ============================================ */

const STORAGE_KEY   = 'linux4win_progress';
const THEME_KEY     = 'linux4win_theme';
const DARK_KEY      = 'linux4win_dark';
const VISITED_KEY   = 'linux4win_visited';
const SLIDE_KEY     = 'linux4win_slide';

/* ---------- State ---------- */
let sections    = [];
let progress    = JSON.parse(localStorage.getItem(STORAGE_KEY)  || '{}');
let visited     = JSON.parse(localStorage.getItem(VISITED_KEY)  || '[]');
let darkMode    = localStorage.getItem(DARK_KEY)   === 'true';
let colorTheme  = localStorage.getItem(THEME_KEY)  || 'ubuntu';
let currentIdx  = parseInt(localStorage.getItem(SLIDE_KEY) || '0', 10);
let searchQ     = '';
let contentCache = {}; // cache fetched markdown

/* ---------- Boot ---------- */
/* ---------- Boot ---------- */

// Define About modal functions globally BEFORE init runs
// so the onclick handler works even if setupTweaks hasn't run yet
window.openAbout = function() {
  const m = document.getElementById('about-modal');
  if (!m) return;
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => m.querySelector('.about-close')?.focus(), 50);
};
window.closeAbout = function() {
  const m = document.getElementById('about-modal');
  if (!m) return;
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
document.addEventListener('click', e => {
  const m = document.getElementById('about-modal');
  if (m && e.target === m) window.closeAbout();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const m = document.getElementById('about-modal');
    if (m?.classList.contains('open')) window.closeAbout();
  }
});

async function init() {
  applyDarkMode(false);
  applyColorTheme(colorTheme);

  try {
    const res = await fetch('data/sections.json');
    sections = await res.json();
  } catch (e) {
    document.getElementById('slide-stage').innerHTML =
      `<div style="padding:3rem;text-align:center;color:var(--text-muted)">
        ⚠️ Could not load <code>data/sections.json</code>.<br>
        Make sure you're running via a local server or GitHub Pages.
       </div>`;
    return;
  }

  // Clamp currentIdx in case sections count changed
  currentIdx = Math.max(0, Math.min(currentIdx, sections.length - 1));

  buildChapterBar();
  await renderSlide(currentIdx, null);
  updateChapterBar();
  updateNavArrows();
  setupSearch();
  setupTweaks();
  setupKeyboard();
}

/* ---------- Dark Mode ---------- */
function applyDarkMode(animate = true) {
  if (!animate) document.body.style.transition = 'none';
  document.body.classList.toggle('dark', darkMode);
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = darkMode ? '☀️' : '🌙';
  if (!animate) requestAnimationFrame(() => document.body.style.transition = '');
}

function toggleDark() {
  darkMode = !darkMode;
  localStorage.setItem(DARK_KEY, darkMode);
  applyDarkMode();
  syncTweakToggle('dark-tweak', darkMode);
}

/* ---------- Color Theme ---------- */
function applyColorTheme(theme) {
  colorTheme = theme;
  if (theme === 'ubuntu') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem(THEME_KEY, theme);
  document.querySelectorAll('.swatch').forEach(s =>
    s.classList.toggle('active', s.dataset.theme === theme)
  );
}

/* ============================================
   CHAPTER BAR
   ============================================ */
function buildChapterBar() {
  const track = document.getElementById('chapters-track');
  const totalSections = sections.length;

  sections.forEach((sec, i) => {
    const seg = document.createElement('div');
    seg.className = 'chapter-segment';
    seg.dataset.index = i;
    seg.setAttribute('role', 'button');
    seg.setAttribute('tabindex', '0');
    seg.setAttribute('aria-label', `Go to: ${sec.title}`);

    seg.innerHTML = `
      <div class="chapter-tooltip">${sec.icon} ${sec.title}</div>
      <div class="chapter-track-bar">
        <div class="chapter-fill-inner" id="cfill-${i}"></div>
      </div>
      <div class="chapter-icon-label">${sec.icon}</div>`;

    seg.addEventListener('click', () => goToSlide(i));
    seg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') goToSlide(i); });
    track.appendChild(seg);
  });
}

function updateChapterBar() {
  const segments = document.querySelectorAll('.chapter-segment');
  const label    = document.getElementById('chapter-current-label');

  segments.forEach((seg, i) => {
    const sec    = sections[i];
    const total  = (sec.checklistItems || []).length;
    const done   = total > 0
      ? sec.checklistItems.filter((_, j) => progress[`${sec.id}_${j}`]).length
      : 0;

    const isVisited   = visited.includes(sec.id);
    const isCompleted = total > 0 && done === total;
    const isCurrent   = i === currentIdx;

    seg.classList.toggle('current',   isCurrent);
    seg.classList.toggle('completed', isCompleted && !isCurrent);
    seg.classList.toggle('visited',   isVisited && !isCompleted && !isCurrent);

    // Fill width: proportion of checklist done (or 100% if visited with no checklist)
    const fill = document.getElementById(`cfill-${i}`);
    if (fill) {
      if (total === 0) {
        fill.style.width = isVisited ? '100%' : '0%';
      } else {
        fill.style.width = (done / total * 100) + '%';
      }
    }
  });

  // Move the floating label to sit above the current segment
  if (label && segments[currentIdx]) {
    const sec = sections[currentIdx];
    const seg = segments[currentIdx];
    const track = document.getElementById('chapters-track');
    const trackRect = track.getBoundingClientRect();
    const segRect   = seg.getBoundingClientRect();
    const leftPct   = ((segRect.left + segRect.width / 2) - trackRect.left);
    label.style.left = leftPct + 'px';
    label.style.transform = 'translateX(-50%)';
    label.textContent = `${sec.icon} ${sec.title}`;
  }
}

/* ============================================
   SLIDE RENDERING & NAVIGATION
   ============================================ */
async function goToSlide(newIdx, direction) {
  if (newIdx < 0 || newIdx >= sections.length) return;
  if (newIdx === currentIdx) return;

  const dir = direction || (newIdx > currentIdx ? 'forward' : 'backward');
  const exitClass  = dir === 'forward' ? 'exit-left'  : 'exit-right';
  const enterClass = dir === 'forward' ? 'enter-left' : 'enter-right';

  const wrap = document.querySelector('.slide-wrap');
  if (wrap) {
    wrap.classList.add(exitClass);
    await delay(260);
  }

  currentIdx = newIdx;
  localStorage.setItem(SLIDE_KEY, currentIdx);

  await renderSlide(currentIdx, enterClass);
  updateChapterBar();
  updateNavArrows();
  announceSlide(sections[currentIdx]);
}

async function renderSlide(idx, enterClass) {
  const stage = document.getElementById('slide-stage');
  const sec   = sections[idx];

  // Mark as visited
  if (!visited.includes(sec.id)) {
    visited.push(sec.id);
    localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
  }

  // Build the slide
  const wrap = document.createElement('div');
  wrap.className = 'slide-wrap' + (enterClass ? ` ${enterClass}` : '');

  const inner = document.createElement('div');
  inner.className = 'slide-content';

  // Hero slide (first item gets a hero treatment)
  const isHero = idx === 0 && !searchQ;

  inner.innerHTML = buildCardHTML(sec, isHero);
  wrap.appendChild(inner);

  // Swap in
  stage.innerHTML = '';
  stage.appendChild(wrap);

  // Trigger enter animation — force reflow then remove class to start transition
  if (enterClass) {
    void wrap.offsetWidth; // force layout
    setTimeout(() => wrap.classList.remove(enterClass), 16);
  }

  // Fetch and render markdown
  await loadMarkdown(sec, inner);

  // Wire up checklist events
  wireChecklist(sec, inner);
}

function buildCardHTML(sec, isHero) {
  const newCallout = sec.isNew
    ? `<div class="new-callout"><span class="new-pill">New</span><span>${escHtml(sec.newLabel)}</span></div>`
    : '';

  const checklistItems = (sec.checklistItems || []).map((item, i) => {
    const key     = `${sec.id}_${i}`;
    const checked = progress[key] ? 'checked' : '';
    return `<div class="checklist-item${progress[key] ? ' done' : ''}" data-key="${key}">
      <input type="checkbox" id="${key}" ${checked}>
      <label for="${key}">${escHtml(item)}</label>
    </div>`;
  }).join('');

  const hasChecklist = sec.checklistItems && sec.checklistItems.length > 0;
  const total  = hasChecklist ? sec.checklistItems.length : 0;
  const done   = total > 0 ? sec.checklistItems.filter((_, i) => progress[`${sec.id}_${i}`]).length : 0;
  const progText = total > 0
    ? (done === total ? `🎉 All ${total} complete!` : `${done} of ${total} complete`)
    : '';

  return `
    <div class="section-card" data-screen-label="${escHtml(sec.title)}">
      ${newCallout}
      <div class="section-header">
        <div class="section-title-group">
          <span class="section-icon">${sec.icon}</span>
          <h2 class="section-title">${escHtml(sec.title)}</h2>
        </div>
        <div class="section-actions">
          ${hasChecklist ? `<button class="section-btn" id="cl-toggle-btn" title="Jump to checklist">✅ Checklist</button>` : ''}
          <button class="section-btn" id="print-btn">🖨️ Print</button>
        </div>
      </div>
      <div class="section-body loading" id="section-body">
        <span class="spin">⏳</span> Loading…
      </div>
      ${hasChecklist ? `
      <div class="checklist-panel" id="checklist-panel">
        <h4>📋 Your Progress</h4>
        ${checklistItems}
        <div class="checklist-progress" id="cl-progress">${progText}</div>
      </div>` : ''}
    </div>`;
}

/* ---------- Load Markdown ---------- */
async function loadMarkdown(sec, container) {
  const body = container.querySelector('#section-body');
  if (!body) return;

  try {
    let md = contentCache[sec.id];
    if (!md) {
      const res = await fetch(sec.file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      md = await res.text();
      contentCache[sec.id] = md;
    }
    body.classList.remove('loading');
    body.innerHTML = marked.parse(md);
    body.querySelectorAll('a[href^="http"]').forEach(a => {
      a.target = '_blank'; a.rel = 'noopener noreferrer';
    });
  } catch (e) {
    body.classList.remove('loading');
    body.innerHTML = `<p style="color:var(--text-muted)">⚠️ Could not load <code>${sec.file}</code>.</p>`;
  }
}

/* ---------- Wire Checklist ---------- */
function wireChecklist(sec, container) {
  const toggleBtn = container.querySelector('#cl-toggle-btn');
  const panel     = container.querySelector('#checklist-panel');
  const printBtn  = container.querySelector('#print-btn');

  // Scroll to checklist panel instead of toggling
  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', () => {
      const wrap = document.querySelector('.slide-wrap');
      if (wrap && panel) {
        const wrapTop  = wrap.getBoundingClientRect().top;
        const panelTop = panel.getBoundingClientRect().top;
        wrap.scrollTop += (panelTop - wrapTop) - 80;
      }
      // Flash highlight on the panel briefly
      panel.style.outline = `2px solid var(--primary)`;
      setTimeout(() => panel.style.outline = '', 1200);
    });
  }

  // Reading focus: click any content element to highlight it
  // Clicking a heading highlights the entire section beneath it
  const body = container.querySelector('#section-body');
  if (body) {
    body.addEventListener('click', e => {
      const target = e.target.closest('p, h2, h3, h4, li, tr, blockquote, pre');
      if (!target) return;

      // Remove previous focus
      body.querySelectorAll('.reading-focus, .reading-focus-heading').forEach(el => {
        el.classList.remove('reading-focus');
        el.classList.remove('reading-focus-heading');
      });

      const isHeading = /^H[2-4]$/.test(target.tagName);

      if (isHeading) {
        // Collect heading + all siblings until next heading of same/higher level
        const level = parseInt(target.tagName[1]);
        const group = [target];
        let sib = target.nextElementSibling;
        while (sib) {
          const m = sib.tagName.match(/^H([1-6])$/);
          if (m && parseInt(m[1]) <= level) break; // stop at same/higher heading
          group.push(sib);
          sib = sib.nextElementSibling;
        }
        group.forEach((el, i) => {
          el.classList.add('reading-focus');
          if (i === 0) el.classList.add('reading-focus-heading');
        });
      } else {
        target.classList.add('reading-focus');
      }
    });
  }

  container.querySelectorAll('.checklist-item input').forEach(cb => {
    cb.addEventListener('change', e => {
      const key = e.target.id;
      progress[key] = e.target.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      e.target.closest('.checklist-item').classList.toggle('done', e.target.checked);
      refreshChecklistProgress(sec, container);
      updateChapterBar();
    });
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => printSection(sec, container));
  }
}

function refreshChecklistProgress(sec, container) {
  const el = container.querySelector('#cl-progress');
  if (!el) return;
  const total = (sec.checklistItems || []).length;
  const done  = sec.checklistItems.filter((_, i) => progress[`${sec.id}_${i}`]).length;
  el.textContent = done === total ? `🎉 All ${total} complete!` : `${done} of ${total} complete`;
}

/* ---------- Nav arrows ---------- */
function updateNavArrows() {
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  const counter = document.getElementById('slide-counter');
  const sec = sections[currentIdx];

  if (prev) prev.disabled = currentIdx === 0;
  if (next) next.disabled = currentIdx === sections.length - 1;

  if (counter) {
    counter.innerHTML = `<strong>${currentIdx + 1}</strong> / ${sections.length} &nbsp;·&nbsp; ${sec.icon} ${escHtml(sec.title)}`;
  }

  // Prev label
  if (prev && currentIdx > 0) {
    const ps = sections[currentIdx - 1];
    prev.innerHTML = `← ${ps.icon} <span class="nav-label">${escHtml(ps.title)}</span>`;
  } else if (prev) {
    prev.innerHTML = '←';
  }

  // Next label
  if (next && currentIdx < sections.length - 1) {
    const ns = sections[currentIdx + 1];
    next.innerHTML = `<span class="nav-label">${escHtml(ns.title)}</span> ${ns.icon} →`;
  } else if (next) {
    next.innerHTML = '→';
  }
}

/* ---------- Search ---------- */
function setupSearch() {
  const input   = document.getElementById('search-input');
  const overlay = document.getElementById('search-results-overlay');
  if (!input || !overlay) return;

  input.addEventListener('input', async e => {
    searchQ = e.target.value.trim().toLowerCase();
    if (!searchQ) {
      overlay.classList.remove('open');
      return;
    }
    overlay.classList.add('open');
    await buildSearchResults(overlay);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchQ = '';
      input.value = '';
      overlay.classList.remove('open');
    }
  });
}

async function buildSearchResults(overlay) {
  const inner = overlay.querySelector('.search-overlay-inner');
  inner.innerHTML = '<p style="color:var(--text-muted);padding:1rem 0">Searching…</p>';

  const results = [];
  for (const sec of sections) {
    let md = contentCache[sec.id];
    if (!md) {
      try {
        const res = await fetch(sec.file);
        md = await res.text();
        contentCache[sec.id] = md;
      } catch { md = ''; }
    }
    const plain = md.replace(/[#*`>\[\]]/g, ' ').toLowerCase();
    if (sec.title.toLowerCase().includes(searchQ) || plain.includes(searchQ)) {
      // Extract a preview snippet
      const idx = plain.indexOf(searchQ);
      const snippet = idx >= 0 ? md.slice(Math.max(0, idx - 60), idx + 120).replace(/[#*`>\[\]]/g, '').trim() : '';
      results.push({ sec, snippet });
    }
  }

  if (results.length === 0) {
    inner.innerHTML = `<div class="search-empty">🔍 No results for "<strong>${escHtml(searchQ)}</strong>"</div>`;
    return;
  }

  inner.innerHTML = `<p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:1rem">${results.length} result${results.length > 1 ? 's' : ''} for "<strong>${escHtml(searchQ)}</strong>"</p>`;
  results.forEach(({ sec, snippet }) => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
      <div class="search-result-title">${sec.icon} ${escHtml(sec.title)}</div>
      <div class="search-result-preview">${escHtml(snippet.slice(0, 140))}…</div>`;
    item.addEventListener('click', () => {
      const idx = sections.indexOf(sec);
      document.getElementById('search-input').value = '';
      document.getElementById('search-results-overlay').classList.remove('open');
      searchQ = '';
      goToSlide(idx);
    });
    inner.appendChild(item);
  });
}

/* ---------- Keyboard nav ---------- */
function setupKeyboard() {
  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToSlide(currentIdx + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goToSlide(currentIdx - 1);
    if (e.key === 'Escape') closeMobileMenu();
  });
}

/* ---------- Print ---------- */
function printSection(sec, container) {
  const content = container.querySelector('#section-body')?.innerHTML || '';
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head>
    <title>${sec.title} — Linux for Windows Users</title>
    <style>
      body{font-family:Georgia,serif;max-width:720px;margin:40px auto;color:#111;line-height:1.7}
      h1,h2,h3{font-family:sans-serif} h1{border-bottom:2px solid #eee;padding-bottom:.5rem}
      code{background:#f5f5f5;padding:2px 6px;border-radius:4px;font-size:.9em}
      pre{background:#f5f5f5;padding:1rem;border-radius:6px;overflow-x:auto}
      pre code{background:none;padding:0}
      table{width:100%;border-collapse:collapse}
      th{background:#333;color:#fff;padding:.5rem .8rem;text-align:left}
      td{padding:.5rem .8rem;border-bottom:1px solid #ddd}
      blockquote{border-left:4px solid #999;padding-left:1rem;color:#555;margin:1rem 0}
    </style>
  </head><body>
    <h1>${sec.icon} ${sec.title}</h1>${content}
    <p style="margin-top:3rem;color:#999;font-size:.82rem;border-top:1px solid #eee;padding-top:1rem">
      From: Linux for Windows Users Guide
    </p>
  </body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 400);
}

/* ---------- Mobile Menu ---------- */
function buildMobileMenu() {
  const list = document.getElementById('mobile-menu-list');
  if (!list) return;
  list.innerHTML = '';
  sections.forEach((sec, i) => {
    const total = (sec.checklistItems || []).length;
    const done  = total > 0 ? sec.checklistItems.filter((_, j) => progress[`${sec.id}_${j}`]).length : 0;
    const progText = total > 0 ? `${done} / ${total} complete` : '';
    const item = document.createElement('div');
    item.className = 'mobile-menu-section';
    item.innerHTML = `
      <div class="mobile-menu-item${i === currentIdx ? ' current' : ''}" role="button" tabindex="0" aria-label="Go to: ${escHtml(sec.title)}">
        <span class="mobile-menu-icon" aria-hidden="true">${sec.icon}</span>
        <div class="mobile-menu-meta">
          <span class="mobile-menu-title">${escHtml(sec.title)}</span>
          ${progText ? `<span class="mobile-menu-progress">${progText}</span>` : ''}
        </div>
        ${sec.isNew ? `<span class="mobile-menu-badge">New</span>` : ''}
      </div>`;
    const btn = item.querySelector('.mobile-menu-item');
    btn.addEventListener('click', () => { closeMobileMenu(); goToSlide(i); });
    btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { closeMobileMenu(); goToSlide(i); } });
    list.appendChild(item);
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger');
  const open = menu.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open);
  if (open) buildMobileMenu();
}

function closeMobileMenu() {
  document.getElementById('mobile-menu')?.classList.remove('open');
  const btn = document.getElementById('hamburger');
  btn?.classList.remove('open');
  btn?.setAttribute('aria-expanded', 'false');
}

/* ---------- Accessibility: announce slide change ---------- */
function announceSlide(sec) {
  let region = document.getElementById('a11y-announce');
  if (!region) {
    region = document.createElement('div');
    region.id = 'a11y-announce';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);';
    document.body.appendChild(region);
  }
  region.textContent = `Now viewing: ${sec.title}`;
}
function setupTweaks() {
  window.addEventListener('message', e => {
    if (e.data?.type === '__activate_edit_mode')   document.getElementById('tweaks-panel').classList.add('open');
    if (e.data?.type === '__deactivate_edit_mode') document.getElementById('tweaks-panel').classList.remove('open');
  });
  window.parent.postMessage({ type: '__edit_mode_available' }, '*');

  document.querySelectorAll('.swatch').forEach(s => {
    s.addEventListener('click', () => {
      applyColorTheme(s.dataset.theme);
      updateChapterBar(); // refresh gradient colors
    });
  });

  syncTweakToggle('dark-tweak', darkMode);
}

function syncTweakToggle(id, state) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.classList.toggle('on', state);
  const knob = btn.querySelector('.toggle-knob');
  if (knob) knob.style.left = state ? '19px' : '3px';
}

/* ---------- Helpers ---------- */
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function escHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ---------- Start ---------- */
document.addEventListener('DOMContentLoaded', init);

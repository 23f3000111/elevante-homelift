/* ============================================================
   ELEVANTE - motion engine (shared by both directions)
   GSAP + ScrollTrigger + Lenis.

   Motion rule for this brief: the audience is 60-75+ (brief s.4), so
   motion REVEALS content and never GATES it. Nothing is hidden behind a
   hover, every control is a real button or link, and the whole layer
   collapses to static under prefers-reduced-motion (brief s.15).

   The drawn components are not decoration. Brief s.9 and s.14 ask for
   animation to explain the cabin's movement, because photography cannot.

   No window.addEventListener('scroll') anywhere: ScrollTrigger and Lenis
   own the scroll loop.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var animate = hasGSAP && !reduced;

  if (animate) document.documentElement.classList.add('js-on');
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function debounce(fn, wait) { var t; return function () { clearTimeout(t); t = setTimeout(fn, wait); }; }

  /* ---------- 1. SMOOTH SCROLL ---------- */
  // Set to false for plain native scrolling. Everything else still works:
  // ScrollTrigger does not depend on Lenis.
  var SMOOTH_SCROLL = true;
  var lenis = null;

  function initLenis() {
    if (!SMOOTH_SCROLL || reduced || typeof window.Lenis === 'undefined') return;
    lenis = new Lenis({ lerp: 0.12, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 });
    if (hasGSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* ---------- 2. NAV ---------- */
  function initNav() {
    var nav = $('.nav'), burger = $('.burger'), drawer = $('.drawer');
    if (!nav) return;

    if (hasGSAP) {
      ScrollTrigger.create({
        start: 'top -80', end: 99999,
        onUpdate: function (self) {
          nav.classList.toggle('is-stuck', self.scroll() > 80);
          var down = self.direction === 1 && self.scroll() > 460;
          nav.classList.toggle('is-hidden', down && !document.body.classList.contains('is-locked'));
        }
      });
    }
    if (!burger || !drawer) return;

    function setDrawer(open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('is-locked', open);
      if (lenis) open ? lenis.stop() : lenis.start();
      if (open) { nav.classList.remove('is-hidden'); var f = $('a', drawer); if (f) f.focus({ preventScroll: true }); }
    }
    burger.addEventListener('click', function () { setDrawer(burger.getAttribute('aria-expanded') !== 'true'); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setDrawer(false); burger.focus(); }
    });
  }

  /* ---------- 3. HEADLINE LINE REVEAL ---------- */
  function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function splitLines(el) {
    if (el.dataset.split === 'done') return;
    var text = el.textContent.replace(/\s+/g, ' ').trim();
    el.innerHTML = text.split(' ').map(function (w) {
      return '<span class="sw" style="display:inline-block">' + esc(w) + '</span>';
    }).join(' ');
    var lines = [], top = null;
    $$('.sw', el).forEach(function (s) {
      var t = Math.round(s.offsetTop);
      if (top === null || t !== top) { lines.push([]); top = t; }
      lines[lines.length - 1].push(s.textContent);
    });
    el.innerHTML = lines.map(function (w) {
      return '<span class="split-line"><span>' + esc(w.join(' ')) + '</span></span>';
    }).join('');
    el.dataset.split = 'done';
  }
  function initHeadlines() {
    if (!animate) return;
    $$('[data-split]').forEach(function (el) {
      splitLines(el);
      // fromTo, not to: GSAP parses the CSS translateY(105%) as `y` in px,
      // so animating yPercent alone would leave that offset behind.
      gsap.fromTo($$('.split-line > span', el), { yPercent: 105, y: 0 },
        { yPercent: 0, y: 0, duration: 1.05, ease: 'expo.out', stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
  }

  /* ---------- 4. REVEALS ---------- */
  function initReveals() {
    if (!animate) return;
    $$('[data-reveal]').forEach(function (el) {
      gsap.to(el, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1,
        delay: parseFloat(el.dataset.delay || 0), ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    $$('[data-stagger]').forEach(function (g) {
      gsap.to(g.querySelectorAll(':scope > *'), { opacity: 1, x: 0, y: 0, scale: 1,
        duration: 1, ease: 'expo.out', stagger: 0.085,
        scrollTrigger: { trigger: g, start: 'top 88%', once: true } });
    });
  }

  /* ---------- 5. PARALLAX ---------- */
  function initParallax() {
    if (!animate) return;
    $$('.px').forEach(function (el) {
      var a = parseFloat(el.dataset.px || 12);
      gsap.fromTo(el, { yPercent: -a / 2, scale: 1.12 }, { yPercent: a / 2, ease: 'none',
        scrollTrigger: { trigger: el.closest('.px-wrap') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ---------- 6. COUNTERS ---------- */
  function initCounters() {
    $$('[data-count]').forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      var dp = (el.dataset.count.split('.')[1] || '').length;
      var render = function (v) {
        el.textContent = v.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp });
      };
      if (!animate) { render(target); return; }
      render(0);
      var o = { v: 0 };
      gsap.to(o, { v: target, duration: 1.9, ease: 'power2.out',
        onUpdate: function () { render(o.v); },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
  }

  /* ---------- 7. THE SECTION DRAWING (brief s.9, s.14) ---------- */
  // Pins the drawing and lets the reader drive the mechanism with the
  // scrollbar: the upper door slides aside, the cabin rises inside the
  // staircase footprint, the lower opening closes behind it, the upper
  // opening closes again once the cabin has arrived.
  function initSection() {
    $$('.dwg-scene').forEach(function (scene) {
      var cabin = $('[data-cabin]', scene);
      var upper = $('[data-upper-door]', scene);
      var lower = $('[data-lower-door]', scene);
      var readout = $('[data-readout]', scene);
      var note = function (n) { return $('[data-note="' + n + '"]', scene); };
      if (!cabin) return;

      var TRAVEL = -322;   // ground floor to first floor, in viewBox units

      if (!animate) {
        // Static: show the cabin arrived at the first floor with the
        // opening closed. The caption still explains the movement.
        gsap.set ? gsap.set(cabin, { y: TRAVEL }) : cabin.setAttribute('transform', 'translate(0,' + TRAVEL + ')');
        if (lower) lower.setAttribute('opacity', '1');
        [note('stair'), note('void'), note('door')].forEach(function (n) { if (n) n.setAttribute('opacity', '1'); });
        if (readout) readout.textContent = 'First floor';
        return;
      }

      var tl = gsap.timeline({
        scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom bottom', scrub: 0.4 }
      });
      tl.to(note('stair'), { opacity: 1, duration: 0.4 }, 0)
        .to(note('void'), { opacity: 1, duration: 0.4 }, 0.5)
        .to(note('stair'), { opacity: 0, duration: 0.3 }, 1.3)
        .to(upper, { x: -238, duration: 1, ease: 'power2.inOut' }, 1.2)
        .to(note('door'), { opacity: 0, duration: 0.25 }, 1.2)
        .to(cabin, { y: TRAVEL, duration: 2.6, ease: 'power1.inOut' }, 1.7)
        .to(lower, { opacity: 1, duration: 0.3 }, 2.4)
        .to(note('void'), { opacity: 0, duration: 0.3 }, 2.2)
        .to(upper, { x: 0, duration: 0.9, ease: 'power2.inOut' }, 4.5)
        .to(note('door'), { opacity: 1, duration: 0.35 }, 4.8);

      if (readout) {
        ScrollTrigger.create({
          trigger: scene, start: 'top top', end: 'bottom bottom', scrub: true,
          onUpdate: function (s) {
            readout.textContent = s.progress < 0.32 ? 'Ground floor'
                                : s.progress < 0.78 ? 'Travelling'
                                : 'First floor';
          }
        });
      }
    });
  }

  /* ---------- 8. CABIN SCENE (brief s.9 "Everyday Use") ---------- */
  // Real tabs, keyboard operable. "Show what happens", not lifestyle claims.
  function initCabinScene() {
    $$('.cab').forEach(function (cab) {
      var tabs = $$('[data-cab-tab]', cab);
      if (!tabs.length) return;

      function show(key, focusTab) {
        tabs.forEach(function (t) {
          var on = t.dataset.cabTab === key;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          if (on && focusTab) t.focus();
        });
        $$('[data-cab-state]', cab).forEach(function (g) {
          var on = g.dataset.cabState === key;
          // SVGElement has no .hidden IDL property, so g.hidden = true is a
          // no-op and every state would stay painted. Drive display instead,
          // and keep the attribute in sync for assistive technology.
          g.style.display = on ? '' : 'none';
          if (on) {
            g.removeAttribute('hidden');
            if (animate) gsap.fromTo(g, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
          } else {
            g.setAttribute('hidden', '');
          }
        });
        $$('[data-cab-note]', cab).forEach(function (n) { n.hidden = n.dataset.cabNote !== key; });
      }

      tabs.forEach(function (t, i) {
        t.tabIndex = i === 0 ? 0 : -1;
        t.addEventListener('click', function () { show(t.dataset.cabTab); });
        t.addEventListener('keydown', function (e) {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          show(tabs[(i + d + tabs.length) % tabs.length].dataset.cabTab, true);
        });
      });
    });
  }

  /* ---------- 9. MATERIAL SWITCH (brief s.18 "Design") ---------- */
  // Re-colours the section drawing live, so a finish choice is shown on the
  // product rather than described.
  function initMaterials() {
    $$('[data-materials]').forEach(function (group) {
      var swatches = $$('[data-material]', group);
      var targetSel = group.dataset.materials;
      var targets = targetSel ? $$(targetSel) : $$('.dwg-figure, .cab-svg');

      swatches.forEach(function (sw) {
        sw.addEventListener('click', function () {
          swatches.forEach(function (o) { o.setAttribute('aria-pressed', String(o === sw)); });
          targets.forEach(function (t) {
            t.style.setProperty('--mat', sw.dataset.material);
            t.style.setProperty('--mat-lt', sw.dataset.materialLt || sw.dataset.material);
            t.style.setProperty('--mat-dk', sw.dataset.materialDk || sw.dataset.material);
            if (animate) gsap.fromTo(t, { opacity: 0.75 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
          });
        });
      });
    });
  }

  /* ---------- 10. PLAN COMPARISON (brief s.1, s.2) ---------- */
  function initPlans() {
    if (!animate) return;
    $$('.plans').forEach(function (p) {
      var lost = $('[data-plan-lost]', p), cabin = $('[data-plan-cabin]', p);
      var tl = gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 72%', once: true } });
      if (lost) tl.fromTo(lost, { opacity: 0, scale: 0.9, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)' }, 0.2);
      if (cabin) tl.fromTo(cabin, { opacity: 0, scaleY: 0, transformOrigin: '50% 100%' },
        { opacity: 1, scaleY: 1, duration: 0.7, ease: 'power3.out' }, 0.45);
    });
  }

  /* ---------- 11. HORIZONTAL PAN (Direction B) ---------- */
  function initPan() {
    var section = $('[data-pan]');
    if (!section) return;
    var pinned = $('.pan-viewport', section), fallback = $('.pan-fallback', section), track = $('.pan-track', section);
    if (!pinned || !fallback || !track) return;
    var st = null;

    function build() {
      if (st) { st.kill(true); st = null; gsap.set(track, { clearProps: 'transform' }); }
      var usePinned = animate && window.matchMedia('(min-width: 981px)').matches;
      if (!usePinned) { pinned.hidden = true; fallback.hidden = false; return; }
      pinned.hidden = false; fallback.hidden = true;
      var distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) { pinned.hidden = true; fallback.hidden = false; return; }
      st = ScrollTrigger.create({
        animation: gsap.to(track, { x: -distance, ease: 'none' }),
        trigger: section, start: 'top top', end: function () { return '+=' + distance; },
        pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true
      });
    }
    build();
    window.addEventListener('resize', debounce(build, 220));
  }

  /* ---------- 12. PROGRESS ---------- */
  function initProgress() {
    var bar = $('.progress');
    if (!bar || !hasGSAP) return;
    if (reduced) { bar.remove(); return; }
    gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.25 } });
  }

  /* ---------- 13. FAQ ---------- */
  function initFaq() {
    $$('.faq details').forEach(function (d) {
      var panel = $('.faq-answer', d);
      d.addEventListener('toggle', function () {
        if (animate && d.open && panel) {
          gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' });
        }
        if (!d.open) return;
        $$('details', d.closest('.faq')).forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  }

  /* ---------- 14. DEALER FILTER ---------- */
  function initDealerFilter() {
    var form = $('[data-dealer-filter]');
    if (!form) return;
    var input = $('input[name="location"]', form), select = $('select[name="country"]', form);
    var list = $('[data-dealer-list]'), empty = $('[data-dealer-empty]'), countEl = $('[data-dealer-count]');
    if (!list) return;
    var cards = $$('.dealer', list);

    function apply(e) {
      if (e) e.preventDefault();
      var q = ((input && input.value) || '').trim().toLowerCase();
      var c = (select && select.value) || 'all';
      var shown = 0;
      cards.forEach(function (card) {
        var hay = (card.dataset.search || card.textContent).toLowerCase();
        var ok = (!q || hay.indexOf(q) !== -1) && (c === 'all' || card.dataset.country === c);
        card.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (countEl) countEl.textContent = shown === 1 ? '1 authorised installer' : shown + ' authorised installers';
      if (hasGSAP) ScrollTrigger.refresh();
    }
    form.addEventListener('submit', apply);
    if (input) input.addEventListener('input', apply);
    if (select) select.addEventListener('change', apply);
    apply();
  }

  /* ---------- 15. CONTACT FORM ---------- */
  function initForm() {
    var form = $('[data-contact-form]');
    if (!form) return;
    var status = $('.form-status', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      $$('[required]', form).forEach(function (i) {
        var field = i.closest('.field');
        var ok = i.checkValidity() && i.value.trim() !== '';
        if (field) field.classList.toggle('has-error', !ok);
        if (!ok && valid) { i.focus(); valid = false; }
      });
      if (!valid) return;
      if (status) {
        status.textContent = 'Thank you. Your request has gone to the authorised installer for your area. They will contact you within two working days.';
        status.hidden = false;
        status.classList.add('is-shown');
      }
      $$('input, textarea, select', form).forEach(function (i) { if (i.type !== 'submit') i.value = ''; });
    });
    $$('[required]', form).forEach(function (i) {
      i.addEventListener('blur', function () {
        var f = i.closest('.field');
        if (f && i.value.trim() !== '') f.classList.remove('has-error');
      });
    });
  }

  /* ---------- 16. ANCHORS + VIDEO ---------- */
  function initAnchors() {
    $$('a[href^="#"]:not([href="#"])').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = $(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(t, { offset: -90 });
        else t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }
  function initVideo() {
    $$('video[data-autoplay]').forEach(function (v) {
      v.muted = true; v.playsInline = true;
      if (reduced) { v.removeAttribute('autoplay'); v.pause(); return; }
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { var p = v.play(); if (p) p.catch(function () {}); }
          else v.pause();
        });
      }, { threshold: 0.15 }).observe(v);
    });
  }

  /* ---------- BOOT ---------- */
  function boot() {
    initLenis(); initNav(); initPan();
    initHeadlines(); initReveals(); initParallax(); initCounters();
    initSection(); initCabinScene(); initMaterials(); initPlans();
    initProgress(); initFaq(); initDealerFilter(); initForm();
    initAnchors(); initVideo();
    if (hasGSAP) {
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
      window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

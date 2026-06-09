/* ============================================
   Elise Veille Sommeil — Script principal
   ============================================ */
(function () {
  'use strict';

  /* ---------- Menu mobile (burger) ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Fermer le menu après clic sur un lien
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Ombre du header au scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Rotation des mots du hero ---------- */
  const rotator = document.querySelector('.rotator__word');
  if (rotator) {
    const words = [
      'ton sommeil profond',
      'ton énergie',
      'tes matins légers',
      'ta sérénité',
      'ta clarté mentale',
      'ta vraie vie',
      'ton équilibre',
      'tes nuits réparatrices'
    ];

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let index = 0;
    rotator.textContent = words[0];

    if (!reduceMotion) {
      setInterval(function () {
        rotator.classList.add('is-out'); // fondu sortie (~0,6 s)
        setTimeout(function () {
          index = (index + 1) % words.length;
          rotator.textContent = words[index];
          rotator.classList.remove('is-out'); // fondu entrée
        }, 600);
      }, 3800); // chaque mot reste affiché ~3,8 s
    }
  }

  /* ---------- Fade-in au scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  /* ---------- Carrousel de témoignages (fondu, ~4s) ---------- */
  const slides = document.querySelectorAll('.testi-slide');
  if (slides.length > 1) {
    let current = 0;
    setInterval(function () {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 4000);
  }

  /* ---------- Année dynamique footer ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

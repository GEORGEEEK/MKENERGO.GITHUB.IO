(function () {
  'use strict';

  // ——— Hero slider ———
  var sliderInterval = 6000;
  var slides = document.querySelectorAll('.hero__slide');
  var currentSlide = 0;

  function nextSlide() {
    if (!slides.length) return;
    slides[currentSlide].classList.remove('hero__slide--active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('hero__slide--active');
  }

  if (slides.length) {
    setInterval(nextSlide, sliderInterval);
  }

  // ——— Burger menu ———
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var navLinks = document.querySelectorAll('.nav__link');

  function toggleMenu() {
    burger.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  }

  function closeMenu() {
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (burger && nav) {
    burger.addEventListener('click', toggleMenu);
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // ——— Smooth scroll for anchor links (polyfill for older browsers) ———
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ——— Scroll animations (AOS-like) ———
  var aosElements = document.querySelectorAll('[data-aos]');
  var observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
      }
    });
  }, observerOptions);

  aosElements.forEach(function (el) {
    observer.observe(el);
  });

  // ——— Header scroll (optional: add class when scrolled)
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    });
  }
})();

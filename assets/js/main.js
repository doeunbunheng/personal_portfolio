/**
* Template Name: MyPage
* Template URL: https://bootstrapmade.com/mypage-bootstrap-personal-template/
* Updated: Sep 20 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle with backdrop overlay for mobile
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  let overlay = document.createElement('div');
  overlay.className = 'header-overlay';
  document.body.appendChild(overlay);

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
    overlay.classList.toggle('active');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
    overlay.addEventListener('click', headerToggle);
  }

  const portfolioHeader = document.querySelector('.portfolio-header');
  if (portfolioHeader) {
    const menu = portfolioHeader.querySelector('.portfolio-menu');
    const theme = portfolioHeader.querySelector('.theme-toggle');
    const root = document.documentElement;

    function setMenu(expanded) {
      portfolioHeader.classList.toggle('menu-open', expanded);
      menu.setAttribute('aria-expanded', String(expanded));
      menu.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
      menu.classList.toggle('bi-list', !expanded);
      menu.classList.toggle('bi-x-lg', expanded);
    }

    menu.addEventListener('click', () => setMenu(!portfolioHeader.classList.contains('menu-open')));
    portfolioHeader.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('click', event => {
      if (!portfolioHeader.contains(event.target)) setMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && portfolioHeader.classList.contains('menu-open')) {
        setMenu(false);
        menu.focus();
      }
    });

    function updateThemeToggle() {
      const dark = root.dataset.theme === 'dark';
      theme.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      theme.querySelector('i').className = dark ? 'bi bi-sun' : 'bi bi-moon-stars';
    }

    updateThemeToggle();
    theme.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('portfolio-theme', root.dataset.theme);
      } catch {}
      updateThemeToggle();
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  if (portfolioHeader) {
    const links = [...portfolioHeader.querySelectorAll('nav a')];

    function updatePortfolioNav() {
      const position = window.scrollY + portfolioHeader.offsetHeight + 32;
      const current = links.findLast(link => document.getElementById(link.hash.slice(1)).offsetTop <= position) ?? links[0];
      links.forEach(link => {
        link.classList.toggle('active', link === current);
        if (link === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    window.addEventListener('load', updatePortfolioNav);
    window.addEventListener('resize', updatePortfolioNav);
    document.addEventListener('scroll', updatePortfolioNav, { passive: true });
  }

})();

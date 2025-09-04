"use strict";
self["webpackHotUpdateroom187"]("main",{

/***/ "./app/pages/Playlists/index.js":
/*!**************************************!*\
  !*** ./app/pages/Playlists/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Playlists)
/* harmony export */ });
/* harmony import */ var classes_Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classes/Page */ "./app/classes/Page.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");
/* harmony import */ var gsap_CustomEase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap/CustomEase */ "./node_modules/gsap/CustomEase.js");
/* harmony import */ var gsap_Flip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gsap/Flip */ "./node_modules/gsap/Flip.js");
/* harmony import */ var utils_LenisScroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/LenisScroll */ "./app/utils/LenisScroll.js");
/* harmony import */ var gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gsap/ScrollToPlugin */ "./node_modules/gsap/ScrollToPlugin.js");
/* harmony import */ var gsap_SplitText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gsap/SplitText */ "./node_modules/gsap/SplitText.js");








class Playlists extends classes_Page__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      id: 'playlists',
      elements: {
        trackList: '[data-track-list]',
        trackListItems: '[data-track-list-item]',
        playlistGroup: '[data-playlist-group]',
        playlistCards: '[data-playlist-card]',
        pageTrigger: '[data-playlist-trigger]',
        mainTitle: '[data-main-title]',
        playlistCardMeta: '[data-playlist-meta]',
        hero: '[data-hero]',
        container: '[data-inner-content]',
        pageContainer: '[data-page-view-type]',
        indicator: '[data-playlist-indicator]'
      }
    });
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_3__.ScrollTrigger, gsap_CustomEase__WEBPACK_IMPORTED_MODULE_4__.CustomEase, gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip, gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_6__.ScrollToPlugin, gsap_SplitText__WEBPACK_IMPORTED_MODULE_7__.SplitText);
    gsap_CustomEase__WEBPACK_IMPORTED_MODULE_4__.CustomEase.create('zoom', '0.71, 0, 0.06, 1');
    this.clickEfx = new Audio('/click.mp3');
    this.scroll = utils_LenisScroll__WEBPACK_IMPORTED_MODULE_1__.scroll;
    this.tl = gsap__WEBPACK_IMPORTED_MODULE_2__["default"].timeline();
    this.init();
  }
  loadAnimations() {
    if (this.viewPageType === "grid") {
      this.animateCardsInView();
      this.scrollCardAnimations();
    } else {
      gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(this.elements.trackListItems, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05
      });
    }
  }
  updateIndicator(targetEl) {
    const playlistScroll = this.elements.playlistGroup;
    const indicator = this.elements.indicator;
    if (!playlistScroll || !indicator || !targetEl) return;
    const scrollLeft = playlistScroll.scrollLeft;
    const paddingLeft = parseFloat(getComputedStyle(playlistScroll).paddingLeft) || 0;

    // Current position of target relative to container (including scroll)
    const targetX = targetEl.offsetLeft + targetEl.offsetWidth / 2 - paddingLeft;

    // Animate scroll to align target’s left edge (existing working logic)
    const offset = targetEl.offsetLeft - paddingLeft;
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(playlistScroll, {
      scrollLeft: offset,
      duration: 0.6,
      ease: "power3.out"
    });
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(indicator, {
      x: offset,
      duration: 0.6,
      ease: "power3.out"
    });
  }
  scrollCardAnimations() {
    const cards = this.elements.playlistCards;
    if (!cards || !cards.length) return;

    // only hide cards that have NOT been animated
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(cards, {
      opacity: (i, el) => el.dataset.animated === "true" ? 1 : 0
    });
    const animateBatch = batch => {
      gsap__WEBPACK_IMPORTED_MODULE_2__["default"].fromTo(batch, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
        onStart: () => {
          batch.forEach(card => card.dataset.animated = "true"); // mark as animated
        }
      });
    };
    gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_3__.ScrollTrigger.batch(cards, {
      onEnter: batch => {
        batch = batch.filter(card => card.dataset.animated !== "true");
        if (batch.length) animateBatch(batch);
      },
      start: "top 80%"
    });

    // Refresh ScrollTrigger on resize to prevent glitches
    window.addEventListener('resize', () => {
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_3__.ScrollTrigger.refresh();
    });
  }
  animateCardsInView() {
    const cards = this.elements.playlistCards;
    if (!cards || !cards.length || this.viewPageType !== "grid") return;
    const inViewCards = Array.from(cards).filter(card => {
      const rect = card.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.95 && card.dataset.animated !== "true";
    });
    if (!inViewCards.length) return;
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].fromTo(inViewCards, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
      onStart: () => inViewCards.forEach(card => card.dataset.animated = "true")
    });
  }
  lockScroll(lock = true) {
    document.body.style.overflow = lock ? 'hidden' : '';
    lock ? this.scroll.stop() : this.scroll.start();
  }
  detailToDetailTransition(card) {
    return new Promise(resolve => {
      this.updateIndicator(card);
      const splitText = document.querySelectorAll('[data-split-text]');
      const trackListSection = this.elements.trackList;
      splitText.forEach((el, i) => {
        let divs = el.querySelectorAll('div > div');
        this.tl.to(divs, {
          yPercent: 100,
          duration: 0.6,
          ease: 'zoom'
        }, 'group');
        this.tl.add(() => el.remove(), 'group+=0.6');
      });
      this.tl.to(trackListSection, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          trackListSection.remove();
        }
      }, 'group');
      this.tl.add(resolve, '>');
    });
  }
  gridToDetailTransition(selectedCard) {
    if (!selectedCard) return;
    const gridEl = this.elements.playlistGroup;
    const cards = Array.from(this.elements.playlistCards || []);
    const mainTitleSection = this.elements.hero;
    const meta = this.elements.playlistCardMeta;
    const indicator = this.elements.indicator;
    const mainTitleMask = this.elements.mainTitle.querySelectorAll('div > div');
    if (!gridEl || !cards.length) return Promise.resolve();
    return new Promise(resolve => {
      this.lockScroll(true);
      cards.forEach(el => {
        if (el.dataset.animated !== "true") {
          gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(el, {
            opacity: 1
          });
        }
      });
      this.tl.to(meta, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      }).to(window, {
        scrollTo: {
          y: 0
        },
        duration: 0.8,
        ease: 'power2.out'
      }).to(mainTitleMask, {
        yPercent: 100,
        duration: 0.6,
        ease: 'zoom'
      }, '-=0.2').add(() => {
        const state = gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.getState(cards, {
          absolute: true
        });
        if (mainTitleSection) mainTitleSection.remove();
        this.elements.container.classList.remove('hero--l-p-t');
        this.elements.container.classList.add('hero--s-p-t');
        gridEl.classList.add('playlist-group--row');
        gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.from(state, {
          duration: 0.6,
          ease: 'zoom',
          absolute: true,
          onComplete: () => {
            gridEl.classList.add('relative');
            this.updateIndicator(selectedCard);
            resolve();
          }
        });
      }).to(indicator, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }
  detailToGridTransition() {
    const splitText = document.querySelectorAll('[data-split-text]');
    const trackListSection = this.elements.trackList;
    const hero = document.querySelector('[data-hero]');
    return new Promise(resolve => {
      this.lockScroll(true);
      splitText.forEach((el, i) => {
        let divs = el.querySelectorAll('div > div');
        this.tl.to(divs, {
          yPercent: 100,
          duration: 0.6,
          ease: 'zoom'
        }, 'group');
      });
      this.tl.to(trackListSection, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          trackListSection.remove();
        }
      }, 'group');
      this.tl.add(() => {
        hero.remove();
        resolve();
      });
    });
  }
  async beforeNavigate(card, url) {
    this.tl.clear();
    const currentType = this.viewPageType; // "grid" or "detail"
    const pathSegments = new URL(url, location.origin).pathname.split('/').filter(Boolean);
    const nextType = pathSegments.length === 1 ? 'grid' : 'detail';
    if (currentType === "grid" && nextType === "detail") {
      // Grid → Detail
      await this.gridToDetailTransition(card);
    } else if (currentType === "detail" && nextType === "detail") {
      // Detail → Detail
      await this.detailToDetailTransition(card);
    } else if (currentType === "detail" && nextType === "grid") {
      // Detail → Grid (e.g., back button)
      await this.detailToGridTransition();
    }
  }
  async handleNavigation(url, {
    replaceState = false
  } = {}) {
    try {
      // Determine page types
      const currentType = this.viewPageType; // current page type
      const pathSegments = new URL(url, location.origin).pathname.split('/').filter(Boolean);
      const nextType = pathSegments.length === 1 ? 'grid' : 'detail'; // next page type based on URL

      const res = await fetch(url);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const container = this.elements.container;
      const pageWrapper = container.querySelector('[data-playlist-page-wrapper]');
      const newHero = doc.querySelector('[data-hero]');
      const mainTitle = doc.querySelector('[data-main-title]');
      const currentMeta = document.querySelector('.playlist-detail-header__meta');
      const newMetaText = doc.querySelectorAll('.playlist-detail-header__meta [data-split-text]');
      const newTrackListSection = doc.querySelector('[data-track-list]');
      if (currentType === "grid" && nextType === "detail") {
        if (newHero) {
          gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(newHero, {
            opacity: 0,
            pointerEvents: "none"
          });
          pageWrapper.appendChild(newHero);
          this.elements.hero = newHero;
        }
      } else if (currentType === "detail" && nextType === "detail") {
        const heroContainer = document.querySelector('[data-hero] .container');
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(mainTitle, {
          opacity: 0,
          pointerEvents: "none"
        });
        heroContainer.prepend(mainTitle);
        newMetaText.forEach(el => {
          gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(el, {
            opacity: 0,
            pointerEvents: "none"
          });
          currentMeta.appendChild(el);
        });

        // this bit is what i need for grid to detail and detail to detail 
      } else if (currentType === "detail" && nextType === "grid") {
        const cards = Array.from(this.elements.playlistCards || []);
        const gridEl = this.elements.playlistGroup;
        const indicator = this.elements.indicator;
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(indicator, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        gridEl.classList.remove('relative');
        const state = gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.getState(cards, {
          absolute: true
        });
        gridEl.classList.remove('playlist-group--row');
        this.updatePageViewType(nextType);
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(newHero, {
          opacity: 0
        });
        container.prepend(newHero);
        gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.from(state, {
          duration: 0.6,
          ease: 'zoom',
          absolute: true
        });
        this.elements.hero = newHero;
      }
      if (newTrackListSection) {
        const newItems = newTrackListSection.querySelectorAll('[data-track-list-item]');
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(newItems, {
          opacity: 0,
          visibility: "hidden"
        });
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(newTrackListSection, {
          opacity: 0,
          pointerEvents: "none",
          visibility: "hidden"
        });
        pageWrapper.appendChild(newTrackListSection);
      }

      // Refresh element references
      this.elements.trackListItems = document.querySelectorAll('[data-track-list-item]');
      this.elements.playlistCards = document.querySelectorAll('[data-playlist-card]');
      this.elements.pageTrigger = document.querySelectorAll('[data-playlist-trigger]');
      this.elements.mainTitle = document.querySelector('[data-main-title]');
      this.elements.trackList = document.querySelector('[data-track-list]');
      this.addHoverListeners();
      this.playListCardListeners();
      this.updatePageViewType(nextType);
      if (replaceState) {
        history.replaceState({}, '', url);
      } else {
        history.pushState({}, '', url);
      }
      return true;
    } catch (err) {
      console.error('Playlist navigation error:', err);
      return false;
    }
  }
  afterNavigateAnimations() {
    return new Promise(resolve => {
      const currentType = this.viewPageType; // current page type

      const hero = this.elements.hero;
      const trackSection = this.elements.trackList;
      const pTitles = hero.querySelectorAll('[data-split-text]');
      const items = Array.from(this.elements.trackListItems);
      let titlesArr = [];
      this.tl.to(hero, {
        opacity: 1,
        clearProps: "pointerEvents"
      });
      pTitles.forEach(el => {
        const split = gsap_SplitText__WEBPACK_IMPORTED_MODULE_7__.SplitText.create(el, {
          type: "lines",
          lineClass: "line",
          mask: "lines",
          autoSplit: true
        });
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(el, {
          opacity: 1,
          clearProps: "pointerEvents"
        });
        titlesArr.push(split.lines);
      });
      titlesArr.forEach(text => {
        this.tl.fromTo(text, {
          yPercent: 100
        }, {
          yPercent: 0,
          duration: 0.8,
          ease: "zoom",
          stagger: 0.05
        }, 'titles -=0.2');
      });
      if (currentType === "detail") {
        trackSection.style.visibility = "visible";
        trackSection.style.opacity = 1;
        trackSection.style.pointerEvents = "auto";
        items.forEach(i => i.style.visibility = "visible");
        this.tl.add(() => {
          this.lockScroll(false);
          resolve();
        });
        this.tl.to(items, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05
        }, "-=0.2");
      } else {
        this.tl.add(() => {
          this.lockScroll(false);
          resolve();
        });
      }
    });
  }
  updatePageViewType(nextType) {
    if (!nextType) return;
    this.elements.pageContainer.dataset.pageViewType = nextType;
    if (nextType === "grid") {
      this.elements.container.classList.remove('hero--s-p-t');
      this.elements.container.classList.add('hero--l-p-t');
    } else if (nextType === "detail") {
      this.elements.container.classList.remove('hero--l-p-t');
      this.elements.container.classList.add('hero--s-p-t');
    }
  }
  get viewPageType() {
    let vPageType = this.elements.pageContainer.dataset.pageViewType;
    return vPageType;
  }
  playListCardListeners() {
    const cards = Array.from(document.querySelectorAll('[data-playlist-trigger]') || []);
    cards.forEach(card => {
      const cardImg = card.querySelector('.playlist-card__img');
      const glow = cardImg.querySelector('.glow-overlay');
      card.addEventListener('click', async e => {
        e.preventDefault();
        const url = card.href;
        await this.beforeNavigate(card, url);
        if (await this.handleNavigation(url)) {
          await this.afterNavigateAnimations(); // Run after navigation animations
        }
      });
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const maxTilt = 8; // adjust this for intensity
        const rotateX = (y / rect.height - 0.5) * -2 * maxTilt;
        const rotateY = (x / rect.width - 0.5) * 2 * maxTilt;
        const glowX = x / rect.width * 100;
        const glowY = y / rect.height * 100;
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(cardImg, {
          rotateX,
          rotateY,
          scale: 1.03,
          transformPerspective: 1000,
          ease: "cubic-bezier(0.03, 0.98, 0.52, 0.99)",
          duration: 0.4
        });
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(glow, {
          xPercent: glowX - 50,
          yPercent: glowY - 50,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(cardImg, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          // natural "settle back"
          duration: 1.2
        });
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(glow, {
          opacity: 0,
          duration: 0.6,
          ease: "power3.out"
        });
      });
    });
  }
  playListIndicatorSetup() {
    const activeCard = Array.from(this.elements.playlistCards || []).find(card => card.href.includes(window.location.pathname));
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(this.elements.indicator, {
      opacity: 1
    });
    if (!activeCard) return;

    // Use GSAP zero-duration set to wait for layout to finalize
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set({}, {
      onComplete: () => {
        this.updateIndicator(activeCard);
      }
    });
  }
  hideCards() {
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(this.elements.playlistCards, {
      opacity: 0
    });
  }
  hideTracks() {
    if (this.elements.trackListItems) {
      gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(this.elements.trackListItems, {
        opacity: 0,
        pointerEvents: "none"
      });
    }
  }
  addHoverListeners() {
    if (!this.elements.trackListItems) return;
    const items = this.elements.trackListItems.length !== undefined ? Array.from(this.elements.trackListItems) : [this.elements.trackListItems];
    items.forEach(element => {
      let bg = element.querySelector('[data-track-list-bg]');
      let albumImg = element.querySelector('[data-track-list-img]');
      element.addEventListener('mouseenter', () => {
        element.classList.add('active');
        this.clickEfx.currentTime = 0;
        this.clickEfx.play();
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(bg, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.3,
          ease: 'zoom'
        });
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(albumImg, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.3,
          ease: 'zoom'
        });
      });
      element.addEventListener('mouseleave', () => {
        element.classList.remove('active');
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(bg, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          duration: 0.3,
          ease: 'zoom'
        });
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(albumImg, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          duration: 0.3,
          ease: 'zoom'
        });
      });
    });
  }
  init() {
    this.addHoverListeners();
    this.playListCardListeners();
    this.hideCards();
    this.hideTracks();
    this.playListIndicatorSetup();
    window.addEventListener('pageLoaded', e => {
      if (e.detail.template === 'playlists') {
        this.loadAnimations();
      }
    });
    window.addEventListener('popstate', async () => {
      const url = window.location.href;
      await this.beforeNavigate(null, url);
      if (await this.handleNavigation(url, {
        replaceState: true
      })) {
        await this.afterNavigateAnimations();
      }
    });
  }
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6074d6c407696b5ac406")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDO0VBQ0o7QUFDRixDOzs7Ozs7OztVQ3JuQkEsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb29tMTg3Ly4vYXBwL3BhZ2VzL1BsYXlsaXN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb29tMTg3L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZSBmcm9tICdjbGFzc2VzL1BhZ2UnXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xuaW1wb3J0IHsgU2Nyb2xsVHJpZ2dlciB9IGZyb20gJ2dzYXAvU2Nyb2xsVHJpZ2dlcidcbmltcG9ydCB7IEN1c3RvbUVhc2UgfSBmcm9tICdnc2FwL0N1c3RvbUVhc2UnXG5pbXBvcnQgeyBGbGlwIH0gZnJvbSAnZ3NhcC9GbGlwJ1xuaW1wb3J0IHsgc2Nyb2xsIH0gZnJvbSAndXRpbHMvTGVuaXNTY3JvbGwnXG5pbXBvcnQgeyBTY3JvbGxUb1BsdWdpbiB9IGZyb20gJ2dzYXAvU2Nyb2xsVG9QbHVnaW4nXG5pbXBvcnQgeyBTcGxpdFRleHQgfSBmcm9tICdnc2FwL1NwbGl0VGV4dCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWxpc3RzIGV4dGVuZHMgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGlkOiAncGxheWxpc3RzJyxcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHRyYWNrTGlzdDogJ1tkYXRhLXRyYWNrLWxpc3RdJywgXG4gICAgICAgIHRyYWNrTGlzdEl0ZW1zOiAnW2RhdGEtdHJhY2stbGlzdC1pdGVtXScsXG4gICAgICAgIHBsYXlsaXN0R3JvdXA6ICdbZGF0YS1wbGF5bGlzdC1ncm91cF0nLFxuICAgICAgICBwbGF5bGlzdENhcmRzOiAnW2RhdGEtcGxheWxpc3QtY2FyZF0nLFxuICAgICAgICBwYWdlVHJpZ2dlcjogJ1tkYXRhLXBsYXlsaXN0LXRyaWdnZXJdJyxcbiAgICAgICAgbWFpblRpdGxlOiAnW2RhdGEtbWFpbi10aXRsZV0nLFxuICAgICAgICBwbGF5bGlzdENhcmRNZXRhOiAnW2RhdGEtcGxheWxpc3QtbWV0YV0nLCBcbiAgICAgICAgaGVybzogJ1tkYXRhLWhlcm9dJyxcbiAgICAgICAgY29udGFpbmVyOiAnW2RhdGEtaW5uZXItY29udGVudF0nLFxuICAgICAgICBwYWdlQ29udGFpbmVyOiAnW2RhdGEtcGFnZS12aWV3LXR5cGVdJyxcbiAgICAgICAgaW5kaWNhdG9yOiAnW2RhdGEtcGxheWxpc3QtaW5kaWNhdG9yXSdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBDdXN0b21FYXNlLCBGbGlwLCBTY3JvbGxUb1BsdWdpbiwgU3BsaXRUZXh0KVxuICAgIEN1c3RvbUVhc2UuY3JlYXRlKCd6b29tJywgJzAuNzEsIDAsIDAuMDYsIDEnKVxuXG4gICAgdGhpcy5jbGlja0VmeCA9IG5ldyBBdWRpbygnL2NsaWNrLm1wMycpXG4gICAgdGhpcy5zY3JvbGwgPSBzY3JvbGxcbiAgICB0aGlzLnRsID0gZ3NhcC50aW1lbGluZSgpXG5cbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgbG9hZEFuaW1hdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMudmlld1BhZ2VUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgdGhpcy5hbmltYXRlQ2FyZHNJblZpZXcoKVxuICAgICAgdGhpcy5zY3JvbGxDYXJkQW5pbWF0aW9ucygpXG4gICAgfSBlbHNlIHtcbiAgICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcyxcbiAgICAgICAgeyBcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IFwiYXV0b1wiLCBcbiAgICAgICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIiwgXG4gICAgICAgICAgc3RhZ2dlcjogMC4wNSBcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUluZGljYXRvcih0YXJnZXRFbCkge1xuICAgIGNvbnN0IHBsYXlsaXN0U2Nyb2xsID0gdGhpcy5lbGVtZW50cy5wbGF5bGlzdEdyb3VwXG4gICAgY29uc3QgaW5kaWNhdG9yID0gdGhpcy5lbGVtZW50cy5pbmRpY2F0b3JcbiAgICBpZiAoIXBsYXlsaXN0U2Nyb2xsIHx8ICFpbmRpY2F0b3IgfHwgIXRhcmdldEVsKSByZXR1cm5cblxuICAgIGNvbnN0IHNjcm9sbExlZnQgPSBwbGF5bGlzdFNjcm9sbC5zY3JvbGxMZWZ0XG4gICAgY29uc3QgcGFkZGluZ0xlZnQgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUocGxheWxpc3RTY3JvbGwpLnBhZGRpbmdMZWZ0KSB8fCAwXG5cbiAgICAvLyBDdXJyZW50IHBvc2l0aW9uIG9mIHRhcmdldCByZWxhdGl2ZSB0byBjb250YWluZXIgKGluY2x1ZGluZyBzY3JvbGwpXG4gICAgY29uc3QgdGFyZ2V0WCA9IHRhcmdldEVsLm9mZnNldExlZnQgKyB0YXJnZXRFbC5vZmZzZXRXaWR0aCAvIDIgLSBwYWRkaW5nTGVmdFxuXG4gICAgLy8gQW5pbWF0ZSBzY3JvbGwgdG8gYWxpZ24gdGFyZ2V04oCZcyBsZWZ0IGVkZ2UgKGV4aXN0aW5nIHdvcmtpbmcgbG9naWMpXG4gICAgY29uc3Qgb2Zmc2V0ID0gdGFyZ2V0RWwub2Zmc2V0TGVmdCAtIHBhZGRpbmdMZWZ0XG4gICAgZ3NhcC50byhwbGF5bGlzdFNjcm9sbCwge1xuICAgICAgc2Nyb2xsTGVmdDogb2Zmc2V0LFxuICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgIGVhc2U6IFwicG93ZXIzLm91dFwiXG4gICAgfSlcblxuICAgIGdzYXAudG8oaW5kaWNhdG9yLCB7XG4gICAgICB4OiBvZmZzZXQsXG4gICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgZWFzZTogXCJwb3dlcjMub3V0XCJcbiAgICB9KVxuICB9XG5cbiAgc2Nyb2xsQ2FyZEFuaW1hdGlvbnMoKSB7XG4gICAgY29uc3QgY2FyZHMgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHM7XG4gICAgaWYgKCFjYXJkcyB8fCAhY2FyZHMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAvLyBvbmx5IGhpZGUgY2FyZHMgdGhhdCBoYXZlIE5PVCBiZWVuIGFuaW1hdGVkXG4gICAgZ3NhcC5zZXQoY2FyZHMsIHsgb3BhY2l0eTogKGksIGVsKSA9PiBlbC5kYXRhc2V0LmFuaW1hdGVkID09PSBcInRydWVcIiA/IDEgOiAwIH0pO1xuXG4gICAgY29uc3QgYW5pbWF0ZUJhdGNoID0gKGJhdGNoKSA9PiB7XG4gICAgICBnc2FwLmZyb21UbyhiYXRjaCxcbiAgICAgICAgeyBvcGFjaXR5OiAwIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICAgICAgc3RhZ2dlcjogMC4xNSxcbiAgICAgICAgICBvblN0YXJ0OiAoKSA9PiB7XG4gICAgICAgICAgICBiYXRjaC5mb3JFYWNoKGNhcmQgPT4gY2FyZC5kYXRhc2V0LmFuaW1hdGVkID0gXCJ0cnVlXCIpOyAvLyBtYXJrIGFzIGFuaW1hdGVkXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICBTY3JvbGxUcmlnZ2VyLmJhdGNoKGNhcmRzLCB7XG4gICAgICBvbkVudGVyOiAoYmF0Y2gpID0+IHtcbiAgICAgICAgYmF0Y2ggPSBiYXRjaC5maWx0ZXIoY2FyZCA9PiBjYXJkLmRhdGFzZXQuYW5pbWF0ZWQgIT09IFwidHJ1ZVwiKTtcbiAgICAgICAgaWYgKGJhdGNoLmxlbmd0aCkgYW5pbWF0ZUJhdGNoKGJhdGNoKTtcbiAgICAgIH0sXG4gICAgICBzdGFydDogXCJ0b3AgODAlXCIsXG4gICAgfSk7XG5cbiAgICAvLyBSZWZyZXNoIFNjcm9sbFRyaWdnZXIgb24gcmVzaXplIHRvIHByZXZlbnQgZ2xpdGNoZXNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XG4gICAgfSk7XG4gIH1cblxuICBhbmltYXRlQ2FyZHNJblZpZXcoKSB7XG4gICAgY29uc3QgY2FyZHMgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHM7XG4gICAgaWYgKCFjYXJkcyB8fCAhY2FyZHMubGVuZ3RoIHx8IHRoaXMudmlld1BhZ2VUeXBlICE9PSBcImdyaWRcIiApIHJldHVybjtcblxuICAgIGNvbnN0IGluVmlld0NhcmRzID0gQXJyYXkuZnJvbShjYXJkcykuZmlsdGVyKGNhcmQgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IGNhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICByZXR1cm4gcmVjdC50b3AgPCB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjk1ICYmIGNhcmQuZGF0YXNldC5hbmltYXRlZCAhPT0gXCJ0cnVlXCI7XG4gICAgfSk7XG5cbiAgICBpZiAoIWluVmlld0NhcmRzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgZ3NhcC5mcm9tVG8oaW5WaWV3Q2FyZHMsXG4gICAgICB7IG9wYWNpdHk6IDAgfSxcbiAgICAgIHtcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICAgIHN0YWdnZXI6IDAuMTUsXG4gICAgICAgIG9uU3RhcnQ6ICgpID0+IGluVmlld0NhcmRzLmZvckVhY2goY2FyZCA9PiBjYXJkLmRhdGFzZXQuYW5pbWF0ZWQgPSBcInRydWVcIilcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbG9ja1Njcm9sbChsb2NrID0gdHJ1ZSkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBsb2NrID8gJ2hpZGRlbicgOiAnJ1xuICAgIGxvY2s/IHRoaXMuc2Nyb2xsLnN0b3AoKSA6IHRoaXMuc2Nyb2xsLnN0YXJ0KClcbiAgfVxuXG4gIGRldGFpbFRvRGV0YWlsVHJhbnNpdGlvbihjYXJkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUluZGljYXRvcihjYXJkKVxuICAgICAgY29uc3Qgc3BsaXRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BsaXQtdGV4dF0nKVxuICAgICAgY29uc3QgdHJhY2tMaXN0U2VjdGlvbiA9IHRoaXMuZWxlbWVudHMudHJhY2tMaXN0XG5cbiAgICAgIHNwbGl0VGV4dC5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgICBsZXQgZGl2cyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdiA+IGRpdicpXG4gICAgICAgIHRoaXMudGwudG8oZGl2cywgeyBcbiAgICAgICAgICB5UGVyY2VudDogMTAwLCBcbiAgICAgICAgICBkdXJhdGlvbjogMC42LCBcbiAgICAgICAgICBlYXNlOiAnem9vbSdcbiAgICAgICAgfSwgJ2dyb3VwJylcblxuICAgICAgICB0aGlzLnRsLmFkZCgoKSA9PiBlbC5yZW1vdmUoKSwgJ2dyb3VwKz0wLjYnKVxuICAgICAgfSlcblxuICAgICAgdGhpcy50bC50byh0cmFja0xpc3RTZWN0aW9uLCB7IFxuICAgICAgICBvcGFjaXR5OiAwLCBcbiAgICAgICAgZHVyYXRpb246IDAuNCwgXG4gICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JywgXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICB0cmFja0xpc3RTZWN0aW9uLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAnZ3JvdXAnKVxuXG4gICAgICB0aGlzLnRsLmFkZChyZXNvbHZlLCAnPicpXG4gICAgfSlcblxuICB9XG5cbiAgZ3JpZFRvRGV0YWlsVHJhbnNpdGlvbihzZWxlY3RlZENhcmQpIHtcbiAgICBpZighc2VsZWN0ZWRDYXJkKSByZXR1cm5cblxuICAgIGNvbnN0IGdyaWRFbCA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RHcm91cFxuICAgIGNvbnN0IGNhcmRzID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHMgfHwgW10pXG4gICAgY29uc3QgbWFpblRpdGxlU2VjdGlvbiA9IHRoaXMuZWxlbWVudHMuaGVyb1xuICAgIGNvbnN0IG1ldGEgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZE1ldGFcbiAgICBjb25zdCBpbmRpY2F0b3IgPSB0aGlzLmVsZW1lbnRzLmluZGljYXRvclxuICAgIGNvbnN0IG1haW5UaXRsZU1hc2sgPSB0aGlzLmVsZW1lbnRzLm1haW5UaXRsZS5xdWVyeVNlbGVjdG9yQWxsKCdkaXYgPiBkaXYnKVxuXG4gICAgaWYgKCFncmlkRWwgfHwgIWNhcmRzLmxlbmd0aCApIHJldHVybiBQcm9taXNlLnJlc29sdmUoKSBcbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMubG9ja1Njcm9sbCh0cnVlKVxuXG4gICAgICBjYXJkcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKGVsLmRhdGFzZXQuYW5pbWF0ZWQgIT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgZ3NhcC5zZXQoZWwsIHsgb3BhY2l0eTogMSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICB0aGlzLnRsLnRvKG1ldGEsIHsgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNCwgZWFzZTogXCJwb3dlcjIub3V0XCJ9KVxuICAgICAgXG4gICAgICAudG8od2luZG93LCB7XG4gICAgICAgIHNjcm9sbFRvOiB7IHk6IDAgfSxcbiAgICAgICAgZHVyYXRpb246IDAuOCxcbiAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnXG4gICAgICB9KVxuXG4gICAgICAudG8obWFpblRpdGxlTWFzaywgXG4gICAgICAgIHsgXG4gICAgICAgICAgeVBlcmNlbnQ6IDEwMCxcbiAgICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICAgIGVhc2U6ICd6b29tJ1xuICAgICAgICB9LCBcbiAgICAgICctPTAuMicpXG5cbiAgICAgIC5hZGQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IEZsaXAuZ2V0U3RhdGUoY2FyZHMsIHsgYWJzb2x1dGU6IHRydWUgfSlcblxuICAgICAgICBpZiAobWFpblRpdGxlU2VjdGlvbikgbWFpblRpdGxlU2VjdGlvbi5yZW1vdmUoKVxuXG4gICAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlcm8tLWwtcC10JylcbiAgICAgICAgdGhpcy5lbGVtZW50cy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGVyby0tcy1wLXQnKVxuICAgICAgICAgICAgXG4gICAgICAgIGdyaWRFbC5jbGFzc0xpc3QuYWRkKCdwbGF5bGlzdC1ncm91cC0tcm93JylcblxuICAgICAgICBGbGlwLmZyb20oc3RhdGUsIHtcbiAgICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICAgIGVhc2U6ICd6b29tJyxcbiAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZSxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBncmlkRWwuY2xhc3NMaXN0LmFkZCgncmVsYXRpdmUnKVxuICAgICAgICAgICAgdGhpcy51cGRhdGVJbmRpY2F0b3Ioc2VsZWN0ZWRDYXJkKVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KSBcbiAgICAgIH0pXG4gICAgICAudG8oaW5kaWNhdG9yLCB7b3BhY2l0eTogMSwgZHVyYXRpb246IDAuMywgZWFzZTogXCJwb3dlcjIub3V0XCJ9KVxuICAgIH0pXG4gIH1cblxuICBkZXRhaWxUb0dyaWRUcmFuc2l0aW9uKCkge1xuICAgIGNvbnN0IHNwbGl0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwbGl0LXRleHRdJylcbiAgICBjb25zdCB0cmFja0xpc3RTZWN0aW9uID0gdGhpcy5lbGVtZW50cy50cmFja0xpc3RcbiAgICBjb25zdCBoZXJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVyb10nKVxuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5sb2NrU2Nyb2xsKHRydWUpXG4gICAgXG4gICAgICBzcGxpdFRleHQuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgICAgbGV0IGRpdnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYgPiBkaXYnKVxuICAgICAgICB0aGlzLnRsLnRvKGRpdnMsIHsgXG4gICAgICAgICAgeVBlcmNlbnQ6IDEwMCwgXG4gICAgICAgICAgZHVyYXRpb246IDAuNiwgXG4gICAgICAgICAgZWFzZTogJ3pvb20nXG4gICAgICAgIH0sICdncm91cCcpXG4gICAgICB9KVxuXG4gICAgICB0aGlzLnRsLnRvKHRyYWNrTGlzdFNlY3Rpb24sIHsgXG4gICAgICAgIG9wYWNpdHk6IDAsIFxuICAgICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLCBcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIHRyYWNrTGlzdFNlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sICdncm91cCcpXG5cbiAgICAgIHRoaXMudGwuYWRkKCgpID0+IHtcbiAgICAgICAgaGVyby5yZW1vdmUoKVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfSlcblxuICB9XG5cbiAgYXN5bmMgYmVmb3JlTmF2aWdhdGUoY2FyZCwgdXJsKSB7XG4gICAgdGhpcy50bC5jbGVhcigpO1xuICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gdGhpcy52aWV3UGFnZVR5cGU7IC8vIFwiZ3JpZFwiIG9yIFwiZGV0YWlsXCJcbiAgICBjb25zdCBwYXRoU2VnbWVudHMgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24ub3JpZ2luKS5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKTtcbiAgICBjb25zdCBuZXh0VHlwZSA9IHBhdGhTZWdtZW50cy5sZW5ndGggPT09IDEgPyAnZ3JpZCcgOiAnZGV0YWlsJztcblxuICAgIGlmIChjdXJyZW50VHlwZSA9PT0gXCJncmlkXCIgJiYgbmV4dFR5cGUgPT09IFwiZGV0YWlsXCIpIHtcbiAgICAgIC8vIEdyaWQg4oaSIERldGFpbFxuICAgICAgYXdhaXQgdGhpcy5ncmlkVG9EZXRhaWxUcmFuc2l0aW9uKGNhcmQpXG4gICAgfSBlbHNlIGlmIChjdXJyZW50VHlwZSA9PT0gXCJkZXRhaWxcIiAmJiBuZXh0VHlwZSA9PT0gXCJkZXRhaWxcIikge1xuICAgICAgLy8gRGV0YWlsIOKGkiBEZXRhaWxcbiAgICAgIGF3YWl0IHRoaXMuZGV0YWlsVG9EZXRhaWxUcmFuc2l0aW9uKGNhcmQpXG4gICAgfSBlbHNlIGlmIChjdXJyZW50VHlwZSA9PT0gXCJkZXRhaWxcIiAmJiBuZXh0VHlwZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgIC8vIERldGFpbCDihpIgR3JpZCAoZS5nLiwgYmFjayBidXR0b24pXG4gICAgICBhd2FpdCB0aGlzLmRldGFpbFRvR3JpZFRyYW5zaXRpb24oKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZU5hdmlnYXRpb24odXJsLCB7IHJlcGxhY2VTdGF0ZSA9IGZhbHNlIH0gPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXRlcm1pbmUgcGFnZSB0eXBlc1xuICAgICAgY29uc3QgY3VycmVudFR5cGUgPSB0aGlzLnZpZXdQYWdlVHlwZTsgLy8gY3VycmVudCBwYWdlIHR5cGVcbiAgICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5vcmlnaW4pLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgY29uc3QgbmV4dFR5cGUgPSBwYXRoU2VnbWVudHMubGVuZ3RoID09PSAxID8gJ2dyaWQnIDogJ2RldGFpbCc7IC8vIG5leHQgcGFnZSB0eXBlIGJhc2VkIG9uIFVSTFxuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgICBjb25zdCBodG1sID0gYXdhaXQgcmVzLnRleHQoKVxuICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKVxuICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbGVtZW50cy5jb250YWluZXJcbiAgICAgIGNvbnN0IHBhZ2VXcmFwcGVyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsYXlsaXN0LXBhZ2Utd3JhcHBlcl0nKVxuICAgICAgY29uc3QgbmV3SGVybyA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZXJvXScpXG4gICAgICBjb25zdCBtYWluVGl0bGUgPSBkb2MucXVlcnlTZWxlY3RvcignW2RhdGEtbWFpbi10aXRsZV0nKVxuICAgICAgY29uc3QgY3VycmVudE1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWxpc3QtZGV0YWlsLWhlYWRlcl9fbWV0YScpIFxuICAgICAgY29uc3QgbmV3TWV0YVRleHQgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LWRldGFpbC1oZWFkZXJfX21ldGEgW2RhdGEtc3BsaXQtdGV4dF0nKVxuICAgICAgY29uc3QgbmV3VHJhY2tMaXN0U2VjdGlvbiA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS10cmFjay1saXN0XScpXG5cbiAgICAgIGlmIChjdXJyZW50VHlwZSA9PT0gXCJncmlkXCIgJiYgbmV4dFR5cGUgPT09IFwiZGV0YWlsXCIpIHtcblxuICAgICAgICBpZiAobmV3SGVybykge1xuICAgICAgICAgIGdzYXAuc2V0KG5ld0hlcm8sIHsgb3BhY2l0eTogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIgfSlcbiAgICAgICAgICBwYWdlV3JhcHBlci5hcHBlbmRDaGlsZChuZXdIZXJvKVxuICAgICAgICAgIHRoaXMuZWxlbWVudHMuaGVybyA9IG5ld0hlcm9cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImRldGFpbFwiKSB7XG4gICAgICAgIGNvbnN0IGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZXJvXSAuY29udGFpbmVyJylcbiAgICAgIFxuICAgICAgICBnc2FwLnNldChtYWluVGl0bGUsIHsgb3BhY2l0eTogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIgfSlcblxuICAgICAgICBoZXJvQ29udGFpbmVyLnByZXBlbmQobWFpblRpdGxlKVxuXG4gICAgICAgIG5ld01ldGFUZXh0LmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGdzYXAuc2V0KGVsLCB7IG9wYWNpdHk6IDAsIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH0pXG4gICAgICAgICAgY3VycmVudE1ldGEuYXBwZW5kQ2hpbGQoZWwpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gdGhpcyBiaXQgaXMgd2hhdCBpIG5lZWQgZm9yIGdyaWQgdG8gZGV0YWlsIGFuZCBkZXRhaWwgdG8gZGV0YWlsIFxuXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgICBjb25zdCBjYXJkcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzIHx8IFtdKVxuICAgICAgICBjb25zdCBncmlkRWwgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0R3JvdXBcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gdGhpcy5lbGVtZW50cy5pbmRpY2F0b3JcblxuICAgICAgICBnc2FwLnRvKGluZGljYXRvciwgeyBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC4zLCBlYXNlOiBcInBvd2VyMi5vdXRcIiB9KVxuXG4gICAgICAgIGdyaWRFbC5jbGFzc0xpc3QucmVtb3ZlKCdyZWxhdGl2ZScpXG4gICAgICAgIFxuICAgICAgICBjb25zdCBzdGF0ZSA9IEZsaXAuZ2V0U3RhdGUoY2FyZHMsIHsgYWJzb2x1dGU6IHRydWUgfSlcbiAgICAgICAgZ3JpZEVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlsaXN0LWdyb3VwLS1yb3cnKVxuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VWaWV3VHlwZShuZXh0VHlwZSlcbiAgICAgICAgXG4gICAgICAgIGdzYXAuc2V0KG5ld0hlcm8sIHsgb3BhY2l0eTogMCB9KVxuICAgICAgICBjb250YWluZXIucHJlcGVuZChuZXdIZXJvKVxuXG4gICAgICAgIEZsaXAuZnJvbShzdGF0ZSwge1xuICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgICAgZWFzZTogJ3pvb20nLFxuICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5oZXJvID0gbmV3SGVyb1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3VHJhY2tMaXN0U2VjdGlvbikge1xuICAgICAgICBjb25zdCBuZXdJdGVtcyA9IG5ld1RyYWNrTGlzdFNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhY2stbGlzdC1pdGVtXScpXG4gICAgICAgIFxuICAgICAgICBnc2FwLnNldChuZXdJdGVtcywgeyBvcGFjaXR5OiAwLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiIH0pXG5cbiAgICAgICAgZ3NhcC5zZXQobmV3VHJhY2tMaXN0U2VjdGlvbiwge1xuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgcG9pbnRlckV2ZW50czogXCJub25lXCIsXG4gICAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIlxuICAgICAgICB9KVxuXG4gICAgICAgIHBhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG5ld1RyYWNrTGlzdFNlY3Rpb24pXG4gICAgICB9XG5cbiAgICAgIC8vIFJlZnJlc2ggZWxlbWVudCByZWZlcmVuY2VzXG4gICAgICB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhY2stbGlzdC1pdGVtXScpXG4gICAgICB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbGF5bGlzdC1jYXJkXScpXG4gICAgICB0aGlzLmVsZW1lbnRzLnBhZ2VUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWxpc3QtdHJpZ2dlcl0nKVxuICAgICAgdGhpcy5lbGVtZW50cy5tYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tYWluLXRpdGxlXScpXG4gICAgICB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRyYWNrLWxpc3RdJylcblxuICAgICAgdGhpcy5hZGRIb3Zlckxpc3RlbmVycygpXG4gICAgICB0aGlzLnBsYXlMaXN0Q2FyZExpc3RlbmVycygpXG4gICAgICB0aGlzLnVwZGF0ZVBhZ2VWaWV3VHlwZShuZXh0VHlwZSlcblxuICAgICAgaWYgKHJlcGxhY2VTdGF0ZSkge1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIHVybClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdQbGF5bGlzdCBuYXZpZ2F0aW9uIGVycm9yOicsIGVycilcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGFmdGVyTmF2aWdhdGVBbmltYXRpb25zKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFR5cGUgPSB0aGlzLnZpZXdQYWdlVHlwZTsgLy8gY3VycmVudCBwYWdlIHR5cGVcbiAgICAgIFxuICAgICAgY29uc3QgaGVybyA9IHRoaXMuZWxlbWVudHMuaGVyb1xuICAgICAgY29uc3QgdHJhY2tTZWN0aW9uID0gdGhpcy5lbGVtZW50cy50cmFja0xpc3RcbiAgICAgIGNvbnN0IHBUaXRsZXMgPSBoZXJvLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwbGl0LXRleHRdJylcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zKTtcblxuICAgICAgbGV0IHRpdGxlc0FyciA9IFtdXG5cbiAgICAgIHRoaXMudGwudG8oaGVybywge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBjbGVhclByb3BzOiBcInBvaW50ZXJFdmVudHNcIlxuICAgICAgfSlcblxuICAgICAgcFRpdGxlcy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdCA9IFNwbGl0VGV4dC5jcmVhdGUoZWwsIFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJsaW5lc1wiLFxuICAgICAgICAgIGxpbmVDbGFzczogXCJsaW5lXCIsXG4gICAgICAgICAgbWFzazogXCJsaW5lc1wiLFxuICAgICAgICAgIGF1dG9TcGxpdDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgZ3NhcC5zZXQoZWwsIHsgb3BhY2l0eTogMSwgY2xlYXJQcm9wczogXCJwb2ludGVyRXZlbnRzXCIgfSlcblxuICAgICAgICB0aXRsZXNBcnIucHVzaChzcGxpdC5saW5lcylcbiAgICAgIH0pXG4gICAgICBcbiAgICAgIHRpdGxlc0Fyci5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMudGwuZnJvbVRvKHRleHQsXG4gICAgICAgICAgeyB5UGVyY2VudDogMTAwIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgeVBlcmNlbnQ6IDAsIFxuICAgICAgICAgICAgZHVyYXRpb246IDAuOCwgXG4gICAgICAgICAgICBlYXNlOiBcInpvb21cIixcbiAgICAgICAgICAgIHN0YWdnZXI6IDAuMDVcbiAgICAgICAgICB9XG4gICAgICAgICwndGl0bGVzIC09MC4yJylcbiAgICAgIH0pXG4gICAgICBcbiAgICAgIGlmIChjdXJyZW50VHlwZSA9PT0gXCJkZXRhaWxcIikge1xuICAgICAgICB0cmFja1NlY3Rpb24uc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiXG4gICAgICAgIHRyYWNrU2VjdGlvbi5zdHlsZS5vcGFjaXR5ID0gMVxuICAgICAgICB0cmFja1NlY3Rpb24uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiXG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IGkuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiKVxuXG4gICAgICAgIHRoaXMudGwuYWRkKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvY2tTY3JvbGwoZmFsc2UpXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0pXG4gICAgICAgXG4gICAgICAgIHRoaXMudGwudG8oaXRlbXMsXG4gICAgICAgIHsgXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiBcImF1dG9cIiwgXG4gICAgICAgICAgZHVyYXRpb246IDAuNCwgXG4gICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsIFxuICAgICAgICAgIHN0YWdnZXI6IDAuMDUgXG4gICAgICAgIH0sIFwiLT0wLjJcIilcbiAgICAgICAgXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGwuYWRkKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvY2tTY3JvbGwoZmFsc2UpXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZVBhZ2VWaWV3VHlwZShuZXh0VHlwZSkge1xuICAgIGlmICghbmV4dFR5cGUpIHJldHVybjtcblxuICAgIHRoaXMuZWxlbWVudHMucGFnZUNvbnRhaW5lci5kYXRhc2V0LnBhZ2VWaWV3VHlwZSA9IG5leHRUeXBlXG5cbiAgICBpZiAobmV4dFR5cGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoZXJvLS1zLXAtdCcpXG4gICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoZXJvLS1sLXAtdCcpXG5cbiAgICB9IGVsc2UgaWYgKG5leHRUeXBlID09PSBcImRldGFpbFwiICkge1xuICAgICAgdGhpcy5lbGVtZW50cy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVyby0tbC1wLXQnKVxuICAgICAgdGhpcy5lbGVtZW50cy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGVyby0tcy1wLXQnKVxuICAgIH1cbiAgfVxuXG4gIGdldCB2aWV3UGFnZVR5cGUoKSB7XG4gICAgbGV0IHZQYWdlVHlwZSA9IHRoaXMuZWxlbWVudHMucGFnZUNvbnRhaW5lci5kYXRhc2V0LnBhZ2VWaWV3VHlwZVxuICAgIHJldHVybiB2UGFnZVR5cGVcbiAgfVxuXG4gIHBsYXlMaXN0Q2FyZExpc3RlbmVycygpIHtcbiAgICBjb25zdCBjYXJkcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWxpc3QtdHJpZ2dlcl0nKSB8fCBbXSlcblxuICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICBjb25zdCBjYXJkSW1nID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcucGxheWxpc3QtY2FyZF9faW1nJylcbiAgICAgIGNvbnN0IGdsb3cgPSBjYXJkSW1nLnF1ZXJ5U2VsZWN0b3IoJy5nbG93LW92ZXJsYXknKVxuXG4gICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IHVybCA9IGNhcmQuaHJlZlxuXG4gICAgICAgIGF3YWl0IHRoaXMuYmVmb3JlTmF2aWdhdGUoY2FyZCwgdXJsKVxuXG4gICAgICAgIGlmKGF3YWl0IHRoaXMuaGFuZGxlTmF2aWdhdGlvbih1cmwpKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hZnRlck5hdmlnYXRlQW5pbWF0aW9ucygpIC8vIFJ1biBhZnRlciBuYXZpZ2F0aW9uIGFuaW1hdGlvbnNcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIH0pXG5cbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGNhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdFxuICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3BcblxuICAgICAgICBjb25zdCBtYXhUaWx0ID0gOCAvLyBhZGp1c3QgdGhpcyBmb3IgaW50ZW5zaXR5XG4gICAgICAgIGNvbnN0IHJvdGF0ZVggPSAoKHkgLyByZWN0LmhlaWdodCkgLSAwLjUpICogLTIgKiBtYXhUaWx0XG4gICAgICAgIGNvbnN0IHJvdGF0ZVkgPSAoKHggLyByZWN0LndpZHRoKSAtIDAuNSkgKiAyICogbWF4VGlsdFxuICAgICAgICBjb25zdCBnbG93WCA9ICh4IC8gcmVjdC53aWR0aCkgKiAxMDBcbiAgICAgICAgY29uc3QgZ2xvd1kgPSAoeSAvIHJlY3QuaGVpZ2h0KSAqIDEwMFxuXG4gICAgICAgIGdzYXAudG8oY2FyZEltZywge1xuICAgICAgICAgIHJvdGF0ZVgsXG4gICAgICAgICAgcm90YXRlWSxcbiAgICAgICAgICBzY2FsZTogMS4wMyxcbiAgICAgICAgICB0cmFuc2Zvcm1QZXJzcGVjdGl2ZTogMTAwMCxcbiAgICAgICAgICBlYXNlOiBcImN1YmljLWJlemllcigwLjAzLCAwLjk4LCAwLjUyLCAwLjk5KVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ3NhcC50byhnbG93LCB7XG4gICAgICAgICAgeFBlcmNlbnQ6IGdsb3dYIC0gNTAsXG4gICAgICAgICAgeVBlcmNlbnQ6IGdsb3dZIC0gNTAsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMC40LFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiXG4gICAgICAgIH0pXG4gICAgICB9KTtcblxuICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICBnc2FwLnRvKGNhcmRJbWcsIHtcbiAgICAgICAgICByb3RhdGVYOiAwLFxuICAgICAgICAgIHJvdGF0ZVk6IDAsXG4gICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgZWFzZTogXCJlbGFzdGljLm91dCgxLCAwLjMpXCIsIC8vIG5hdHVyYWwgXCJzZXR0bGUgYmFja1wiXG4gICAgICAgICAgZHVyYXRpb246IDEuMlxuICAgICAgICB9KTtcblxuICAgICAgICBnc2FwLnRvKGdsb3csIHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgICAgZWFzZTogXCJwb3dlcjMub3V0XCJcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuXG4gICAgfSlcbiAgfVxuXG4gIHBsYXlMaXN0SW5kaWNhdG9yU2V0dXAoKSB7XG4gICAgY29uc3QgYWN0aXZlQ2FyZCA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzIHx8IFtdKS5maW5kKGNhcmQgPT5cbiAgICAgIGNhcmQuaHJlZi5pbmNsdWRlcyh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpXG4gICAgKTtcblxuICAgIGdzYXAuc2V0KHRoaXMuZWxlbWVudHMuaW5kaWNhdG9yLCB7IG9wYWNpdHk6IDEgfSlcblxuICAgIGlmICghYWN0aXZlQ2FyZCkgcmV0dXJuO1xuXG4gICAgLy8gVXNlIEdTQVAgemVyby1kdXJhdGlvbiBzZXQgdG8gd2FpdCBmb3IgbGF5b3V0IHRvIGZpbmFsaXplXG4gICAgZ3NhcC5zZXQoe30sIHtcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVJbmRpY2F0b3IoYWN0aXZlQ2FyZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIGhpZGVDYXJkcygpIHtcbiAgICBnc2FwLnNldCh0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHMsIHsgb3BhY2l0eTogMCB9KVxuICB9XG5cbiAgaGlkZVRyYWNrcygpIHtcbiAgICBpZih0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zKSB7XG4gICAgICBnc2FwLnNldCh0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zLCB7IG9wYWNpdHk6IDAsIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH0pXG4gICAgfVxuICB9XG5cbiAgYWRkSG92ZXJMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zKSByZXR1cm5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMubGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgID8gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zKVxuICAgICAgOiBbdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtc11cblxuICAgIGl0ZW1zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBsZXQgYmcgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRyYWNrLWxpc3QtYmddJylcbiAgICAgIGxldCBhbGJ1bUltZyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdHJhY2stbGlzdC1pbWddJylcblxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgIHRoaXMuY2xpY2tFZnguY3VycmVudFRpbWUgPSAwXG4gICAgICAgIHRoaXMuY2xpY2tFZngucGxheSgpXG4gICAgICAgIGdzYXAudG8oYmcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDAlLCAxMDAlIDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICAgIGdzYXAudG8oYWxidW1JbWcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDAlLCAxMDAlIDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICB9KVxuXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgZ3NhcC50byhiZywgeyBjbGlwUGF0aDogJ3BvbHlnb24oMCUgMTAwJSwgMTAwJSAxMDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICAgIGdzYXAudG8oYWxidW1JbWcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDEwMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkZEhvdmVyTGlzdGVuZXJzKClcbiAgICB0aGlzLnBsYXlMaXN0Q2FyZExpc3RlbmVycygpXG4gICAgdGhpcy5oaWRlQ2FyZHMoKVxuICAgIHRoaXMuaGlkZVRyYWNrcygpXG4gICAgdGhpcy5wbGF5TGlzdEluZGljYXRvclNldHVwKClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlTG9hZGVkJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmRldGFpbC50ZW1wbGF0ZSA9PT0gJ3BsYXlsaXN0cycpIHtcbiAgICAgICAgdGhpcy5sb2FkQW5pbWF0aW9ucygpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgYXdhaXQgdGhpcy5iZWZvcmVOYXZpZ2F0ZShudWxsLCB1cmwpO1xuICAgICAgaWYoYXdhaXQgdGhpcy5oYW5kbGVOYXZpZ2F0aW9uKHVybCwgeyByZXBsYWNlU3RhdGU6IHRydWUgfSkpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5hZnRlck5hdmlnYXRlQW5pbWF0aW9ucygpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cbn0iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI2MDc0ZDZjNDA3Njk2YjVhYzQwNlwiKSJdLCJuYW1lcyI6WyJQYWdlIiwiZ3NhcCIsIlNjcm9sbFRyaWdnZXIiLCJDdXN0b21FYXNlIiwiRmxpcCIsInNjcm9sbCIsIlNjcm9sbFRvUGx1Z2luIiwiU3BsaXRUZXh0IiwiUGxheWxpc3RzIiwiY29uc3RydWN0b3IiLCJpZCIsImVsZW1lbnRzIiwidHJhY2tMaXN0IiwidHJhY2tMaXN0SXRlbXMiLCJwbGF5bGlzdEdyb3VwIiwicGxheWxpc3RDYXJkcyIsInBhZ2VUcmlnZ2VyIiwibWFpblRpdGxlIiwicGxheWxpc3RDYXJkTWV0YSIsImhlcm8iLCJjb250YWluZXIiLCJwYWdlQ29udGFpbmVyIiwiaW5kaWNhdG9yIiwicmVnaXN0ZXJQbHVnaW4iLCJjcmVhdGUiLCJjbGlja0VmeCIsIkF1ZGlvIiwidGwiLCJ0aW1lbGluZSIsImluaXQiLCJsb2FkQW5pbWF0aW9ucyIsInZpZXdQYWdlVHlwZSIsImFuaW1hdGVDYXJkc0luVmlldyIsInNjcm9sbENhcmRBbmltYXRpb25zIiwidG8iLCJvcGFjaXR5IiwicG9pbnRlckV2ZW50cyIsImR1cmF0aW9uIiwiZWFzZSIsInN0YWdnZXIiLCJ1cGRhdGVJbmRpY2F0b3IiLCJ0YXJnZXRFbCIsInBsYXlsaXN0U2Nyb2xsIiwic2Nyb2xsTGVmdCIsInBhZGRpbmdMZWZ0IiwicGFyc2VGbG9hdCIsImdldENvbXB1dGVkU3R5bGUiLCJ0YXJnZXRYIiwib2Zmc2V0TGVmdCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0IiwieCIsImNhcmRzIiwibGVuZ3RoIiwic2V0IiwiaSIsImVsIiwiZGF0YXNldCIsImFuaW1hdGVkIiwiYW5pbWF0ZUJhdGNoIiwiYmF0Y2giLCJmcm9tVG8iLCJvblN0YXJ0IiwiZm9yRWFjaCIsImNhcmQiLCJvbkVudGVyIiwiZmlsdGVyIiwic3RhcnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVmcmVzaCIsImluVmlld0NhcmRzIiwiQXJyYXkiLCJmcm9tIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImlubmVySGVpZ2h0IiwibG9ja1Njcm9sbCIsImxvY2siLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIm92ZXJmbG93Iiwic3RvcCIsImRldGFpbFRvRGV0YWlsVHJhbnNpdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwic3BsaXRUZXh0IiwicXVlcnlTZWxlY3RvckFsbCIsInRyYWNrTGlzdFNlY3Rpb24iLCJkaXZzIiwieVBlcmNlbnQiLCJhZGQiLCJyZW1vdmUiLCJvbkNvbXBsZXRlIiwiZ3JpZFRvRGV0YWlsVHJhbnNpdGlvbiIsInNlbGVjdGVkQ2FyZCIsImdyaWRFbCIsIm1haW5UaXRsZVNlY3Rpb24iLCJtZXRhIiwibWFpblRpdGxlTWFzayIsInNjcm9sbFRvIiwieSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhYnNvbHV0ZSIsImNsYXNzTGlzdCIsImRldGFpbFRvR3JpZFRyYW5zaXRpb24iLCJxdWVyeVNlbGVjdG9yIiwiYmVmb3JlTmF2aWdhdGUiLCJ1cmwiLCJjbGVhciIsImN1cnJlbnRUeXBlIiwicGF0aFNlZ21lbnRzIiwiVVJMIiwibG9jYXRpb24iLCJvcmlnaW4iLCJwYXRobmFtZSIsInNwbGl0IiwiQm9vbGVhbiIsIm5leHRUeXBlIiwiaGFuZGxlTmF2aWdhdGlvbiIsInJlcGxhY2VTdGF0ZSIsInJlcyIsImZldGNoIiwiaHRtbCIsInRleHQiLCJwYXJzZXIiLCJET01QYXJzZXIiLCJkb2MiLCJwYXJzZUZyb21TdHJpbmciLCJwYWdlV3JhcHBlciIsIm5ld0hlcm8iLCJjdXJyZW50TWV0YSIsIm5ld01ldGFUZXh0IiwibmV3VHJhY2tMaXN0U2VjdGlvbiIsImFwcGVuZENoaWxkIiwiaGVyb0NvbnRhaW5lciIsInByZXBlbmQiLCJ1cGRhdGVQYWdlVmlld1R5cGUiLCJuZXdJdGVtcyIsInZpc2liaWxpdHkiLCJhZGRIb3Zlckxpc3RlbmVycyIsInBsYXlMaXN0Q2FyZExpc3RlbmVycyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJhZnRlck5hdmlnYXRlQW5pbWF0aW9ucyIsInRyYWNrU2VjdGlvbiIsInBUaXRsZXMiLCJpdGVtcyIsInRpdGxlc0FyciIsImNsZWFyUHJvcHMiLCJ0eXBlIiwibGluZUNsYXNzIiwibWFzayIsImF1dG9TcGxpdCIsInB1c2giLCJsaW5lcyIsInBhZ2VWaWV3VHlwZSIsInZQYWdlVHlwZSIsImNhcmRJbWciLCJnbG93IiwiZSIsInByZXZlbnREZWZhdWx0IiwiaHJlZiIsImNsaWVudFgiLCJsZWZ0IiwiY2xpZW50WSIsIm1heFRpbHQiLCJyb3RhdGVYIiwiaGVpZ2h0Iiwicm90YXRlWSIsIndpZHRoIiwiZ2xvd1giLCJnbG93WSIsInNjYWxlIiwidHJhbnNmb3JtUGVyc3BlY3RpdmUiLCJ4UGVyY2VudCIsInBsYXlMaXN0SW5kaWNhdG9yU2V0dXAiLCJhY3RpdmVDYXJkIiwiZmluZCIsImluY2x1ZGVzIiwiaGlkZUNhcmRzIiwiaGlkZVRyYWNrcyIsInVuZGVmaW5lZCIsImVsZW1lbnQiLCJiZyIsImFsYnVtSW1nIiwiY3VycmVudFRpbWUiLCJwbGF5IiwiY2xpcFBhdGgiLCJkZXRhaWwiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=
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

    // Keep track of the currently active card so the resize handler can re-align it.
    this._activeIndicatorTarget = targetEl;

    // Always recompute padding / offsets when called
    const paddingLeft = parseFloat(getComputedStyle(playlistScroll).paddingLeft) || 0;
    const offset = targetEl.offsetLeft - paddingLeft;
    const width = targetEl.offsetWidth;

    // kill any previous tweens that might conflict
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].killTweensOf(playlistScroll, "scrollLeft");
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].killTweensOf(indicator, ["x", "width"]);

    // Animate scroll (as before)
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(playlistScroll, {
      scrollLeft: offset,
      duration: 0.6,
      ease: "power3.out"
    });

    // Animate indicator to match position + size of the card
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(indicator, {
      x: offset,
      width: width,
      duration: 0.6,
      ease: "power3.out"
    });

    // --- Robust, low-latency resize handling (bound once) ---
    if (!this._indicatorResizeBound) {
      this._indicatorResizeBound = true;
      this._indicatorResizeRaf = null;
      this._onIndicatorResize = () => {
        if (this._indicatorResizeRaf) cancelAnimationFrame(this._indicatorResizeRaf);
        this._indicatorResizeRaf = requestAnimationFrame(() => {
          const t = this._activeIndicatorTarget;
          if (!t || !playlistScroll || !indicator) return;

          // Recompute values every resize
          const paddingLeftNow = parseFloat(getComputedStyle(playlistScroll).paddingLeft) || 0;
          const newOffset = t.offsetLeft - paddingLeftNow;
          const newWidth = t.offsetWidth;
          gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(playlistScroll, {
            scrollLeft: newOffset
          });
          gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(indicator, {
            x: newOffset,
            width: newWidth
          });
        });
      };
      window.addEventListener("resize", this._onIndicatorResize);
    }
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
            this.tl.to(meta, {
              clearProps: "opacity"
            });
            resolve();
          }
        });
      }).to(indicator, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, '+=1');
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
        const meta = this.elements.playlistCardMeta;
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(indicator, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(meta, {
          opacity: 0,
          duration: 0.2,
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
          absolute: true,
          onComplete: () => {
            gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(meta, {
              opacity: 1,
              duration: 0.4,
              delay: 0.2,
              ease: "power2.out"
            });
            cards.forEach(card => card.dataset.animated = "true");
          }
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

        // Always reset starting position before animating
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(el, {
          opacity: 1,
          clearProps: "pointerEvents"
        });

        // Force browser to register layout before animating
        split.lines.forEach(line => line.getBoundingClientRect());
        this.tl.set(split.lines, {
          yPercent: 100,
          immediateRender: true
        });
        this.tl.to(split.lines, {
          yPercent: 0,
          duration: 0.8,
          ease: "zoom",
          stagger: 0.05
        }, 'titles -=0.2');
      });
      if (currentType === "detail") {
        trackSection.style.visibility = "visible";
        trackSection.style.opacity = 1;
        items.forEach(i => i.style.visibility = "visible");
        this.tl.add(() => {
          this.lockScroll(false);
          resolve();
        });
        this.tl.to(items, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
          onComplete: () => {
            trackSection.style.pointerEvents = "auto";
            gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(items, {
              pointerEvents: "auto"
            });
          }
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
    const activeCard = Array.from(document.querySelectorAll('[data-playlist-trigger]') || []).find(card => card.href.includes(window.location.pathname));
    if (this.viewPageType === "detail") {
      gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(this.elements.indicator, {
        opacity: 1
      });
    }
    if (!activeCard) return;
    this.updateIndicator(activeCard);
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
        this.clickEfx.play().catch(() => {});
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
      const activeCard = Array.from(document.querySelectorAll('[data-playlist-trigger]') || []).find(card => card.href.includes(window.location.pathname));
      await this.beforeNavigate(activeCard, url);
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
/******/ 	__webpack_require__.h = () => ("b69dcacecd1f3ee7ef1a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wNzRkZjQ0ODJhMmFkMGUzNjNhZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUNSO0FBQzJCO0FBQ047QUFDWjtBQUNVO0FBQ1U7QUFDVjtBQUUzQixNQUFNUSxTQUFTLFNBQVNSLG9EQUFJLENBQUM7RUFDMUNTLFdBQVdBLENBQUEsRUFBRztJQUNaLEtBQUssQ0FBQztNQUNKQyxFQUFFLEVBQUUsV0FBVztNQUNmQyxRQUFRLEVBQUU7UUFDUkMsU0FBUyxFQUFFLG1CQUFtQjtRQUM5QkMsY0FBYyxFQUFFLHdCQUF3QjtRQUN4Q0MsYUFBYSxFQUFFLHVCQUF1QjtRQUN0Q0MsYUFBYSxFQUFFLHNCQUFzQjtRQUNyQ0MsV0FBVyxFQUFFLHlCQUF5QjtRQUN0Q0MsU0FBUyxFQUFFLG1CQUFtQjtRQUM5QkMsZ0JBQWdCLEVBQUUsc0JBQXNCO1FBQ3hDQyxJQUFJLEVBQUUsYUFBYTtRQUNuQkMsU0FBUyxFQUFFLHNCQUFzQjtRQUNqQ0MsYUFBYSxFQUFFLHVCQUF1QjtRQUN0Q0MsU0FBUyxFQUFFO01BQ2I7SUFDRixDQUFDLENBQUM7SUFFRnJCLDRDQUFJLENBQUNzQixjQUFjLENBQUNyQiw2REFBYSxFQUFFQyx1REFBVSxFQUFFQywyQ0FBSSxFQUFFRSwrREFBYyxFQUFFQyxxREFBUyxDQUFDO0lBQy9FSix1REFBVSxDQUFDcUIsTUFBTSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQztJQUU3QyxJQUFJLENBQUNDLFFBQVEsR0FBRyxJQUFJQyxLQUFLLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLElBQUksQ0FBQ3JCLE1BQU0sR0FBR0EscURBQU07SUFDcEIsSUFBSSxDQUFDc0IsRUFBRSxHQUFHMUIsNENBQUksQ0FBQzJCLFFBQVEsQ0FBQyxDQUFDO0lBRXpCLElBQUksQ0FBQ0MsSUFBSSxDQUFDLENBQUM7RUFDYjtFQUVBQyxjQUFjQSxDQUFBLEVBQUc7SUFDZixJQUFJLElBQUksQ0FBQ0MsWUFBWSxLQUFLLE1BQU0sRUFBRTtNQUNoQyxJQUFJLENBQUNDLGtCQUFrQixDQUFDLENBQUM7TUFDekIsSUFBSSxDQUFDQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzdCLENBQUMsTUFBTTtNQUNMaEMsNENBQUksQ0FBQ2lDLEVBQUUsQ0FBQyxJQUFJLENBQUN2QixRQUFRLENBQUNFLGNBQWMsRUFDbEM7UUFDRXNCLE9BQU8sRUFBRSxDQUFDO1FBQ1ZDLGFBQWEsRUFBRSxNQUFNO1FBQ3JCQyxRQUFRLEVBQUUsR0FBRztRQUNiQyxJQUFJLEVBQUUsWUFBWTtRQUNsQkMsT0FBTyxFQUFFO01BQ1gsQ0FDRixDQUFDO0lBQ0g7RUFDRjtFQUVBQyxlQUFlQSxDQUFDQyxRQUFRLEVBQUU7SUFDeEIsTUFBTUMsY0FBYyxHQUFHLElBQUksQ0FBQy9CLFFBQVEsQ0FBQ0csYUFBYTtJQUNsRCxNQUFNUSxTQUFTLEdBQUcsSUFBSSxDQUFDWCxRQUFRLENBQUNXLFNBQVM7SUFDekMsSUFBSSxDQUFDb0IsY0FBYyxJQUFJLENBQUNwQixTQUFTLElBQUksQ0FBQ21CLFFBQVEsRUFBRTs7SUFFaEQ7SUFDQSxJQUFJLENBQUNFLHNCQUFzQixHQUFHRixRQUFROztJQUV0QztJQUNBLE1BQU1HLFdBQVcsR0FBR0MsVUFBVSxDQUFDQyxnQkFBZ0IsQ0FBQ0osY0FBYyxDQUFDLENBQUNFLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDakYsTUFBTUcsTUFBTSxHQUFHTixRQUFRLENBQUNPLFVBQVUsR0FBR0osV0FBVztJQUNoRCxNQUFNSyxLQUFLLEdBQUdSLFFBQVEsQ0FBQ1MsV0FBVzs7SUFFbEM7SUFDQWpELDRDQUFJLENBQUNrRCxZQUFZLENBQUNULGNBQWMsRUFBRSxZQUFZLENBQUM7SUFDL0N6Qyw0Q0FBSSxDQUFDa0QsWUFBWSxDQUFDN0IsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztJQUU1QztJQUNBckIsNENBQUksQ0FBQ2lDLEVBQUUsQ0FBQ1EsY0FBYyxFQUFFO01BQ3RCVSxVQUFVLEVBQUVMLE1BQU07TUFDbEJWLFFBQVEsRUFBRSxHQUFHO01BQ2JDLElBQUksRUFBRTtJQUNSLENBQUMsQ0FBQzs7SUFFRjtJQUNBckMsNENBQUksQ0FBQ2lDLEVBQUUsQ0FBQ1osU0FBUyxFQUFFO01BQ2pCK0IsQ0FBQyxFQUFFTixNQUFNO01BQ1RFLEtBQUssRUFBRUEsS0FBSztNQUNaWixRQUFRLEVBQUUsR0FBRztNQUNiQyxJQUFJLEVBQUU7SUFDUixDQUFDLENBQUM7O0lBRUY7SUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDZ0IscUJBQXFCLEVBQUU7TUFDL0IsSUFBSSxDQUFDQSxxQkFBcUIsR0FBRyxJQUFJO01BRWpDLElBQUksQ0FBQ0MsbUJBQW1CLEdBQUcsSUFBSTtNQUMvQixJQUFJLENBQUNDLGtCQUFrQixHQUFHLE1BQU07UUFDOUIsSUFBSSxJQUFJLENBQUNELG1CQUFtQixFQUFFRSxvQkFBb0IsQ0FBQyxJQUFJLENBQUNGLG1CQUFtQixDQUFDO1FBQzVFLElBQUksQ0FBQ0EsbUJBQW1CLEdBQUdHLHFCQUFxQixDQUFDLE1BQU07VUFDckQsTUFBTUMsQ0FBQyxHQUFHLElBQUksQ0FBQ2hCLHNCQUFzQjtVQUNyQyxJQUFJLENBQUNnQixDQUFDLElBQUksQ0FBQ2pCLGNBQWMsSUFBSSxDQUFDcEIsU0FBUyxFQUFFOztVQUV6QztVQUNBLE1BQU1zQyxjQUFjLEdBQUdmLFVBQVUsQ0FBQ0MsZ0JBQWdCLENBQUNKLGNBQWMsQ0FBQyxDQUFDRSxXQUFXLENBQUMsSUFBSSxDQUFDO1VBQ3BGLE1BQU1pQixTQUFTLEdBQUdGLENBQUMsQ0FBQ1gsVUFBVSxHQUFHWSxjQUFjO1VBQy9DLE1BQU1FLFFBQVEsR0FBR0gsQ0FBQyxDQUFDVCxXQUFXO1VBRTlCakQsNENBQUksQ0FBQzhELEdBQUcsQ0FBQ3JCLGNBQWMsRUFBRTtZQUFFVSxVQUFVLEVBQUVTO1VBQVUsQ0FBQyxDQUFDO1VBQ25ENUQsNENBQUksQ0FBQzhELEdBQUcsQ0FBQ3pDLFNBQVMsRUFBRTtZQUFFK0IsQ0FBQyxFQUFFUSxTQUFTO1lBQUVaLEtBQUssRUFBRWE7VUFBUyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDO01BQ0osQ0FBQztNQUVERSxNQUFNLENBQUNDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUNULGtCQUFrQixDQUFDO0lBQzVEO0VBQ0Y7RUFFQXZCLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQ3JCLE1BQU1pQyxLQUFLLEdBQUcsSUFBSSxDQUFDdkQsUUFBUSxDQUFDSSxhQUFhO0lBQ3pDLElBQUksQ0FBQ21ELEtBQUssSUFBSSxDQUFDQSxLQUFLLENBQUNDLE1BQU0sRUFBRTs7SUFFN0I7SUFDQWxFLDRDQUFJLENBQUM4RCxHQUFHLENBQUNHLEtBQUssRUFBRTtNQUFFL0IsT0FBTyxFQUFFQSxDQUFDaUMsQ0FBQyxFQUFFQyxFQUFFLEtBQUtBLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDQyxRQUFRLEtBQUssTUFBTSxHQUFHLENBQUMsR0FBRztJQUFFLENBQUMsQ0FBQztJQUUvRSxNQUFNQyxZQUFZLEdBQUlDLEtBQUssSUFBSztNQUM5QnhFLDRDQUFJLENBQUN5RSxNQUFNLENBQUNELEtBQUssRUFDZjtRQUFFdEMsT0FBTyxFQUFFO01BQUUsQ0FBQyxFQUNkO1FBQ0VBLE9BQU8sRUFBRSxDQUFDO1FBQ1ZFLFFBQVEsRUFBRSxHQUFHO1FBQ2JDLElBQUksRUFBRSxZQUFZO1FBQ2xCQyxPQUFPLEVBQUUsSUFBSTtRQUNib0MsT0FBTyxFQUFFQSxDQUFBLEtBQU07VUFDYkYsS0FBSyxDQUFDRyxPQUFPLENBQUNDLElBQUksSUFBSUEsSUFBSSxDQUFDUCxPQUFPLENBQUNDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pEO01BQ0YsQ0FDRixDQUFDO0lBQ0gsQ0FBQztJQUVEckUsNkRBQWEsQ0FBQ3VFLEtBQUssQ0FBQ1AsS0FBSyxFQUFFO01BQ3pCWSxPQUFPLEVBQUdMLEtBQUssSUFBSztRQUNsQkEsS0FBSyxHQUFHQSxLQUFLLENBQUNNLE1BQU0sQ0FBQ0YsSUFBSSxJQUFJQSxJQUFJLENBQUNQLE9BQU8sQ0FBQ0MsUUFBUSxLQUFLLE1BQU0sQ0FBQztRQUM5RCxJQUFJRSxLQUFLLENBQUNOLE1BQU0sRUFBRUssWUFBWSxDQUFDQyxLQUFLLENBQUM7TUFDdkMsQ0FBQztNQUNETyxLQUFLLEVBQUU7SUFDVCxDQUFDLENBQUM7O0lBRUY7SUFDQWhCLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE1BQU07TUFDdEMvRCw2REFBYSxDQUFDK0UsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDO0VBQ0o7RUFFQWpELGtCQUFrQkEsQ0FBQSxFQUFHO0lBQ25CLE1BQU1rQyxLQUFLLEdBQUcsSUFBSSxDQUFDdkQsUUFBUSxDQUFDSSxhQUFhO0lBQ3pDLElBQUksQ0FBQ21ELEtBQUssSUFBSSxDQUFDQSxLQUFLLENBQUNDLE1BQU0sSUFBSSxJQUFJLENBQUNwQyxZQUFZLEtBQUssTUFBTSxFQUFHO0lBRTlELE1BQU1tRCxXQUFXLEdBQUdDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDbEIsS0FBSyxDQUFDLENBQUNhLE1BQU0sQ0FBQ0YsSUFBSSxJQUFJO01BQ25ELE1BQU1RLElBQUksR0FBR1IsSUFBSSxDQUFDUyxxQkFBcUIsQ0FBQyxDQUFDO01BQ3pDLE9BQU9ELElBQUksQ0FBQ0UsR0FBRyxHQUFHdkIsTUFBTSxDQUFDd0IsV0FBVyxHQUFHLElBQUksSUFBSVgsSUFBSSxDQUFDUCxPQUFPLENBQUNDLFFBQVEsS0FBSyxNQUFNO0lBQ2pGLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ1csV0FBVyxDQUFDZixNQUFNLEVBQUU7SUFFekJsRSw0Q0FBSSxDQUFDeUUsTUFBTSxDQUFDUSxXQUFXLEVBQ3JCO01BQUUvQyxPQUFPLEVBQUU7SUFBRSxDQUFDLEVBQ2Q7TUFDRUEsT0FBTyxFQUFFLENBQUM7TUFDVkUsUUFBUSxFQUFFLEdBQUc7TUFDYkMsSUFBSSxFQUFFLFlBQVk7TUFDbEJDLE9BQU8sRUFBRSxJQUFJO01BQ2JvQyxPQUFPLEVBQUVBLENBQUEsS0FBTU8sV0FBVyxDQUFDTixPQUFPLENBQUNDLElBQUksSUFBSUEsSUFBSSxDQUFDUCxPQUFPLENBQUNDLFFBQVEsR0FBRyxNQUFNO0lBQzNFLENBQ0YsQ0FBQztFQUNIO0VBRUFrQixVQUFVQSxDQUFDQyxJQUFJLEdBQUcsSUFBSSxFQUFFO0lBQ3RCQyxRQUFRLENBQUNDLElBQUksQ0FBQ0MsS0FBSyxDQUFDQyxRQUFRLEdBQUdKLElBQUksR0FBRyxRQUFRLEdBQUcsRUFBRTtJQUNuREEsSUFBSSxHQUFFLElBQUksQ0FBQ3JGLE1BQU0sQ0FBQzBGLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDMUYsTUFBTSxDQUFDMkUsS0FBSyxDQUFDLENBQUM7RUFDaEQ7RUFFQWdCLHdCQUF3QkEsQ0FBQ25CLElBQUksRUFBRTtJQUM3QixPQUFPLElBQUlvQixPQUFPLENBQUVDLE9BQU8sSUFBSztNQUM5QixJQUFJLENBQUMxRCxlQUFlLENBQUNxQyxJQUFJLENBQUM7TUFDMUIsTUFBTXNCLFNBQVMsR0FBR1IsUUFBUSxDQUFDUyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztNQUNoRSxNQUFNQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMxRixRQUFRLENBQUNDLFNBQVM7TUFFaER1RixTQUFTLENBQUN2QixPQUFPLENBQUMsQ0FBQ1AsRUFBRSxFQUFFRCxDQUFDLEtBQUs7UUFDM0IsSUFBSWtDLElBQUksR0FBR2pDLEVBQUUsQ0FBQytCLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUMzQyxJQUFJLENBQUN6RSxFQUFFLENBQUNPLEVBQUUsQ0FBQ29FLElBQUksRUFBRTtVQUNmQyxRQUFRLEVBQUUsR0FBRztVQUNibEUsUUFBUSxFQUFFLEdBQUc7VUFDYkMsSUFBSSxFQUFFO1FBQ1IsQ0FBQyxFQUFFLE9BQU8sQ0FBQztRQUVYLElBQUksQ0FBQ1gsRUFBRSxDQUFDNkUsR0FBRyxDQUFDLE1BQU1uQyxFQUFFLENBQUNvQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQztNQUM5QyxDQUFDLENBQUM7TUFFRixJQUFJLENBQUM5RSxFQUFFLENBQUNPLEVBQUUsQ0FBQ21FLGdCQUFnQixFQUFFO1FBQzNCbEUsT0FBTyxFQUFFLENBQUM7UUFDVkUsUUFBUSxFQUFFLEdBQUc7UUFDYkMsSUFBSSxFQUFFLFlBQVk7UUFDbEJvRSxVQUFVLEVBQUVBLENBQUEsS0FBTTtVQUNoQkwsZ0JBQWdCLENBQUNJLE1BQU0sQ0FBQyxDQUFDO1FBQzNCO01BQ0YsQ0FBQyxFQUFFLE9BQU8sQ0FBQztNQUVYLElBQUksQ0FBQzlFLEVBQUUsQ0FBQzZFLEdBQUcsQ0FBQ04sT0FBTyxFQUFFLEdBQUcsQ0FBQztJQUMzQixDQUFDLENBQUM7RUFFSjtFQUVBUyxzQkFBc0JBLENBQUNDLFlBQVksRUFBRTtJQUNuQyxJQUFHLENBQUNBLFlBQVksRUFBRTtJQUVsQixNQUFNQyxNQUFNLEdBQUcsSUFBSSxDQUFDbEcsUUFBUSxDQUFDRyxhQUFhO0lBQzFDLE1BQU1vRCxLQUFLLEdBQUdpQixLQUFLLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUN6RSxRQUFRLENBQUNJLGFBQWEsSUFBSSxFQUFFLENBQUM7SUFDM0QsTUFBTStGLGdCQUFnQixHQUFHLElBQUksQ0FBQ25HLFFBQVEsQ0FBQ1EsSUFBSTtJQUMzQyxNQUFNNEYsSUFBSSxHQUFHLElBQUksQ0FBQ3BHLFFBQVEsQ0FBQ08sZ0JBQWdCO0lBQzNDLE1BQU1JLFNBQVMsR0FBRyxJQUFJLENBQUNYLFFBQVEsQ0FBQ1csU0FBUztJQUN6QyxNQUFNMEYsYUFBYSxHQUFHLElBQUksQ0FBQ3JHLFFBQVEsQ0FBQ00sU0FBUyxDQUFDbUYsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBRTNFLElBQUksQ0FBQ1MsTUFBTSxJQUFJLENBQUMzQyxLQUFLLENBQUNDLE1BQU0sRUFBRyxPQUFPOEIsT0FBTyxDQUFDQyxPQUFPLENBQUMsQ0FBQztJQUV2RCxPQUFPLElBQUlELE9BQU8sQ0FBRUMsT0FBTyxJQUFLO01BQzlCLElBQUksQ0FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQztNQUVyQnZCLEtBQUssQ0FBQ1UsT0FBTyxDQUFDUCxFQUFFLElBQUk7UUFDbEIsSUFBSUEsRUFBRSxDQUFDQyxPQUFPLENBQUNDLFFBQVEsS0FBSyxNQUFNLEVBQUU7VUFDbEN0RSw0Q0FBSSxDQUFDOEQsR0FBRyxDQUFDTSxFQUFFLEVBQUU7WUFBRWxDLE9BQU8sRUFBRTtVQUFFLENBQUMsQ0FBQztRQUM5QjtNQUNGLENBQUMsQ0FBQztNQUVGLElBQUksQ0FBQ1IsRUFBRSxDQUFDTyxFQUFFLENBQUM2RSxJQUFJLEVBQUU7UUFBRTVFLE9BQU8sRUFBRSxDQUFDO1FBQUVFLFFBQVEsRUFBRSxHQUFHO1FBQUVDLElBQUksRUFBRTtNQUFZLENBQUMsQ0FBQyxDQUVqRUosRUFBRSxDQUFDOEIsTUFBTSxFQUFFO1FBQ1ZpRCxRQUFRLEVBQUU7VUFBRUMsQ0FBQyxFQUFFO1FBQUUsQ0FBQztRQUNsQjdFLFFBQVEsRUFBRSxHQUFHO1FBQ2JDLElBQUksRUFBRTtNQUNSLENBQUMsQ0FBQyxDQUVESixFQUFFLENBQUM4RSxhQUFhLEVBQ2Y7UUFDRVQsUUFBUSxFQUFFLEdBQUc7UUFDYmxFLFFBQVEsRUFBRSxHQUFHO1FBQ2JDLElBQUksRUFBRTtNQUNSLENBQUMsRUFDSCxPQUFPLENBQUMsQ0FFUGtFLEdBQUcsQ0FBQyxNQUFNO1FBQ1QsTUFBTVcsS0FBSyxHQUFHL0csMkNBQUksQ0FBQ2dILFFBQVEsQ0FBQ2xELEtBQUssRUFBRTtVQUFFbUQsUUFBUSxFQUFFO1FBQUssQ0FBQyxDQUFDO1FBRXRELElBQUlQLGdCQUFnQixFQUFFQSxnQkFBZ0IsQ0FBQ0wsTUFBTSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDOUYsUUFBUSxDQUFDUyxTQUFTLENBQUNrRyxTQUFTLENBQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDdkQsSUFBSSxDQUFDOUYsUUFBUSxDQUFDUyxTQUFTLENBQUNrRyxTQUFTLENBQUNkLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFFcERLLE1BQU0sQ0FBQ1MsU0FBUyxDQUFDZCxHQUFHLENBQUMscUJBQXFCLENBQUM7UUFFM0NwRywyQ0FBSSxDQUFDZ0YsSUFBSSxDQUFDK0IsS0FBSyxFQUFFO1VBQ2Y5RSxRQUFRLEVBQUUsR0FBRztVQUNiQyxJQUFJLEVBQUUsTUFBTTtVQUNaK0UsUUFBUSxFQUFFLElBQUk7VUFDZFgsVUFBVSxFQUFFQSxDQUFBLEtBQU07WUFDaEJHLE1BQU0sQ0FBQ1MsU0FBUyxDQUFDZCxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ2hDLElBQUksQ0FBQ2hFLGVBQWUsQ0FBQ29FLFlBQVksQ0FBQztZQUNsQyxJQUFJLENBQUNqRixFQUFFLENBQUNPLEVBQUUsQ0FBQzZFLElBQUksRUFBRTtjQUFFUSxVQUFVLEVBQUU7WUFBVSxDQUFFLENBQUM7WUFDNUNyQixPQUFPLENBQUMsQ0FBQztVQUNYO1FBQ0YsQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDLENBQ0RoRSxFQUFFLENBQUNaLFNBQVMsRUFBRTtRQUFDYSxPQUFPLEVBQUUsQ0FBQztRQUFFRSxRQUFRLEVBQUUsR0FBRztRQUFFQyxJQUFJLEVBQUU7TUFBWSxDQUFDLEVBQUUsS0FBSyxDQUFDO0lBQ3hFLENBQUMsQ0FBQztFQUNKO0VBRUFrRixzQkFBc0JBLENBQUEsRUFBRztJQUN2QixNQUFNckIsU0FBUyxHQUFHUixRQUFRLENBQUNTLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO0lBQ2hFLE1BQU1DLGdCQUFnQixHQUFHLElBQUksQ0FBQzFGLFFBQVEsQ0FBQ0MsU0FBUztJQUNoRCxNQUFNTyxJQUFJLEdBQUd3RSxRQUFRLENBQUM4QixhQUFhLENBQUMsYUFBYSxDQUFDO0lBRWxELE9BQU8sSUFBSXhCLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO01BQzlCLElBQUksQ0FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQztNQUVyQlUsU0FBUyxDQUFDdkIsT0FBTyxDQUFDLENBQUNQLEVBQUUsRUFBRUQsQ0FBQyxLQUFLO1FBQzNCLElBQUlrQyxJQUFJLEdBQUdqQyxFQUFFLENBQUMrQixnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7UUFDM0MsSUFBSSxDQUFDekUsRUFBRSxDQUFDTyxFQUFFLENBQUNvRSxJQUFJLEVBQUU7VUFDZkMsUUFBUSxFQUFFLEdBQUc7VUFDYmxFLFFBQVEsRUFBRSxHQUFHO1VBQ2JDLElBQUksRUFBRTtRQUNSLENBQUMsRUFBRSxPQUFPLENBQUM7TUFDYixDQUFDLENBQUM7TUFFRixJQUFJLENBQUNYLEVBQUUsQ0FBQ08sRUFBRSxDQUFDbUUsZ0JBQWdCLEVBQUU7UUFDM0JsRSxPQUFPLEVBQUUsQ0FBQztRQUNWRSxRQUFRLEVBQUUsR0FBRztRQUNiQyxJQUFJLEVBQUUsWUFBWTtRQUNsQm9FLFVBQVUsRUFBRUEsQ0FBQSxLQUFNO1VBQ2hCTCxnQkFBZ0IsQ0FBQ0ksTUFBTSxDQUFDLENBQUM7UUFDM0I7TUFDRixDQUFDLEVBQUUsT0FBTyxDQUFDO01BRVgsSUFBSSxDQUFDOUUsRUFBRSxDQUFDNkUsR0FBRyxDQUFDLE1BQU07UUFDaEJyRixJQUFJLENBQUNzRixNQUFNLENBQUMsQ0FBQztRQUNiUCxPQUFPLENBQUMsQ0FBQztNQUNYLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUVKO0VBRUEsTUFBTXdCLGNBQWNBLENBQUM3QyxJQUFJLEVBQUU4QyxHQUFHLEVBQUU7SUFDOUIsSUFBSSxDQUFDaEcsRUFBRSxDQUFDaUcsS0FBSyxDQUFDLENBQUM7SUFDZixNQUFNQyxXQUFXLEdBQUcsSUFBSSxDQUFDOUYsWUFBWSxDQUFDLENBQUM7SUFDdkMsTUFBTStGLFlBQVksR0FBRyxJQUFJQyxHQUFHLENBQUNKLEdBQUcsRUFBRUssUUFBUSxDQUFDQyxNQUFNLENBQUMsQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNwRCxNQUFNLENBQUNxRCxPQUFPLENBQUM7SUFDdEYsTUFBTUMsUUFBUSxHQUFHUCxZQUFZLENBQUMzRCxNQUFNLEtBQUssQ0FBQyxHQUFHLE1BQU0sR0FBRyxRQUFRO0lBRTlELElBQUkwRCxXQUFXLEtBQUssTUFBTSxJQUFJUSxRQUFRLEtBQUssUUFBUSxFQUFFO01BQ25EO01BQ0EsTUFBTSxJQUFJLENBQUMxQixzQkFBc0IsQ0FBQzlCLElBQUksQ0FBQztJQUN6QyxDQUFDLE1BQU0sSUFBSWdELFdBQVcsS0FBSyxRQUFRLElBQUlRLFFBQVEsS0FBSyxRQUFRLEVBQUU7TUFDNUQ7TUFDQSxNQUFNLElBQUksQ0FBQ3JDLHdCQUF3QixDQUFDbkIsSUFBSSxDQUFDO0lBQzNDLENBQUMsTUFBTSxJQUFJZ0QsV0FBVyxLQUFLLFFBQVEsSUFBSVEsUUFBUSxLQUFLLE1BQU0sRUFBRTtNQUMxRDtNQUNBLE1BQU0sSUFBSSxDQUFDYixzQkFBc0IsQ0FBQyxDQUFDO0lBQ3JDO0VBQ0Y7RUFFQSxNQUFNYyxnQkFBZ0JBLENBQUNYLEdBQUcsRUFBRTtJQUFFWSxZQUFZLEdBQUc7RUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDekQsSUFBSTtNQUNGO01BQ0EsTUFBTVYsV0FBVyxHQUFHLElBQUksQ0FBQzlGLFlBQVksQ0FBQyxDQUFDO01BQ3ZDLE1BQU0rRixZQUFZLEdBQUcsSUFBSUMsR0FBRyxDQUFDSixHQUFHLEVBQUVLLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDLENBQUNDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDcEQsTUFBTSxDQUFDcUQsT0FBTyxDQUFDO01BQ3RGLE1BQU1DLFFBQVEsR0FBR1AsWUFBWSxDQUFDM0QsTUFBTSxLQUFLLENBQUMsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUM7O01BRWhFLE1BQU1xRSxHQUFHLEdBQUcsTUFBTUMsS0FBSyxDQUFDZCxHQUFHLENBQUM7TUFDNUIsTUFBTWUsSUFBSSxHQUFHLE1BQU1GLEdBQUcsQ0FBQ0csSUFBSSxDQUFDLENBQUM7TUFDN0IsTUFBTUMsTUFBTSxHQUFHLElBQUlDLFNBQVMsQ0FBQyxDQUFDO01BQzlCLE1BQU1DLEdBQUcsR0FBR0YsTUFBTSxDQUFDRyxlQUFlLENBQUNMLElBQUksRUFBRSxXQUFXLENBQUM7TUFDckQsTUFBTXRILFNBQVMsR0FBRyxJQUFJLENBQUNULFFBQVEsQ0FBQ1MsU0FBUztNQUN6QyxNQUFNNEgsV0FBVyxHQUFHNUgsU0FBUyxDQUFDcUcsYUFBYSxDQUFDLDhCQUE4QixDQUFDO01BQzNFLE1BQU13QixPQUFPLEdBQUdILEdBQUcsQ0FBQ3JCLGFBQWEsQ0FBQyxhQUFhLENBQUM7TUFDaEQsTUFBTXhHLFNBQVMsR0FBRzZILEdBQUcsQ0FBQ3JCLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztNQUN4RCxNQUFNeUIsV0FBVyxHQUFHdkQsUUFBUSxDQUFDOEIsYUFBYSxDQUFDLCtCQUErQixDQUFDO01BQzNFLE1BQU0wQixXQUFXLEdBQUdMLEdBQUcsQ0FBQzFDLGdCQUFnQixDQUFDLGlEQUFpRCxDQUFDO01BQzNGLE1BQU1nRCxtQkFBbUIsR0FBR04sR0FBRyxDQUFDckIsYUFBYSxDQUFDLG1CQUFtQixDQUFDO01BRWxFLElBQUlJLFdBQVcsS0FBSyxNQUFNLElBQUlRLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFFbkQsSUFBSVksT0FBTyxFQUFFO1VBQ1hoSiw0Q0FBSSxDQUFDOEQsR0FBRyxDQUFDa0YsT0FBTyxFQUFFO1lBQUU5RyxPQUFPLEVBQUUsQ0FBQztZQUFFQyxhQUFhLEVBQUU7VUFBTyxDQUFDLENBQUM7VUFDeEQ0RyxXQUFXLENBQUNLLFdBQVcsQ0FBQ0osT0FBTyxDQUFDO1VBQ2hDLElBQUksQ0FBQ3RJLFFBQVEsQ0FBQ1EsSUFBSSxHQUFHOEgsT0FBTztRQUM5QjtNQUVGLENBQUMsTUFBTSxJQUFJcEIsV0FBVyxLQUFLLFFBQVEsSUFBSVEsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUM1RCxNQUFNaUIsYUFBYSxHQUFHM0QsUUFBUSxDQUFDOEIsYUFBYSxDQUFDLHdCQUF3QixDQUFDO1FBRXRFeEgsNENBQUksQ0FBQzhELEdBQUcsQ0FBQzlDLFNBQVMsRUFBRTtVQUFFa0IsT0FBTyxFQUFFLENBQUM7VUFBRUMsYUFBYSxFQUFFO1FBQU8sQ0FBQyxDQUFDO1FBRTFEa0gsYUFBYSxDQUFDQyxPQUFPLENBQUN0SSxTQUFTLENBQUM7UUFFaENrSSxXQUFXLENBQUN2RSxPQUFPLENBQUNQLEVBQUUsSUFBSTtVQUN4QnBFLDRDQUFJLENBQUM4RCxHQUFHLENBQUNNLEVBQUUsRUFBRTtZQUFFbEMsT0FBTyxFQUFFLENBQUM7WUFBRUMsYUFBYSxFQUFFO1VBQU8sQ0FBQyxDQUFDO1VBQ25EOEcsV0FBVyxDQUFDRyxXQUFXLENBQUNoRixFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDOztRQUVGO01BRUYsQ0FBQyxNQUFNLElBQUl3RCxXQUFXLEtBQUssUUFBUSxJQUFJUSxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQzFELE1BQU1uRSxLQUFLLEdBQUdpQixLQUFLLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUN6RSxRQUFRLENBQUNJLGFBQWEsSUFBSSxFQUFFLENBQUM7UUFDM0QsTUFBTThGLE1BQU0sR0FBRyxJQUFJLENBQUNsRyxRQUFRLENBQUNHLGFBQWE7UUFDMUMsTUFBTVEsU0FBUyxHQUFHLElBQUksQ0FBQ1gsUUFBUSxDQUFDVyxTQUFTO1FBQ3pDLE1BQU15RixJQUFJLEdBQUcsSUFBSSxDQUFDcEcsUUFBUSxDQUFDTyxnQkFBZ0I7UUFFM0NqQiw0Q0FBSSxDQUFDaUMsRUFBRSxDQUFDWixTQUFTLEVBQUU7VUFBRWEsT0FBTyxFQUFFLENBQUM7VUFBRUUsUUFBUSxFQUFFLEdBQUc7VUFBRUMsSUFBSSxFQUFFO1FBQWEsQ0FBQyxDQUFDO1FBQ3JFckMsNENBQUksQ0FBQzhELEdBQUcsQ0FBQ2dELElBQUksRUFBRTtVQUFFNUUsT0FBTyxFQUFFLENBQUM7VUFBRUUsUUFBUSxFQUFFLEdBQUc7VUFBRUMsSUFBSSxFQUFFO1FBQWEsQ0FBQyxDQUFDO1FBRWpFdUUsTUFBTSxDQUFDUyxTQUFTLENBQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFFbkMsTUFBTVUsS0FBSyxHQUFHL0csMkNBQUksQ0FBQ2dILFFBQVEsQ0FBQ2xELEtBQUssRUFBRTtVQUFFbUQsUUFBUSxFQUFFO1FBQUssQ0FBQyxDQUFDO1FBQ3REUixNQUFNLENBQUNTLFNBQVMsQ0FBQ2IsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQzlDLElBQUksQ0FBQytDLGtCQUFrQixDQUFDbkIsUUFBUSxDQUFDO1FBRWpDcEksNENBQUksQ0FBQzhELEdBQUcsQ0FBQ2tGLE9BQU8sRUFBRTtVQUFFOUcsT0FBTyxFQUFFO1FBQUUsQ0FBQyxDQUFDO1FBQ2pDZixTQUFTLENBQUNtSSxPQUFPLENBQUNOLE9BQU8sQ0FBQztRQUUxQjdJLDJDQUFJLENBQUNnRixJQUFJLENBQUMrQixLQUFLLEVBQUU7VUFDZjlFLFFBQVEsRUFBRSxHQUFHO1VBQ2JDLElBQUksRUFBRSxNQUFNO1VBQ1orRSxRQUFRLEVBQUUsSUFBSTtVQUNkWCxVQUFVLEVBQUVBLENBQUEsS0FBTTtZQUNoQnpHLDRDQUFJLENBQUNpQyxFQUFFLENBQUM2RSxJQUFJLEVBQUU7Y0FBRTVFLE9BQU8sRUFBRSxDQUFDO2NBQUVFLFFBQVEsRUFBRSxHQUFHO2NBQUVvSCxLQUFLLEVBQUUsR0FBRztjQUFFbkgsSUFBSSxFQUFFO1lBQWEsQ0FBQyxDQUFDO1lBQzVFNEIsS0FBSyxDQUFDVSxPQUFPLENBQUNDLElBQUksSUFBSUEsSUFBSSxDQUFDUCxPQUFPLENBQUNDLFFBQVEsR0FBRyxNQUFNLENBQUM7VUFDdkQ7UUFFRixDQUFDLENBQUM7UUFFRixJQUFJLENBQUM1RCxRQUFRLENBQUNRLElBQUksR0FBRzhILE9BQU87TUFDOUI7TUFFQSxJQUFJRyxtQkFBbUIsRUFBRTtRQUN2QixNQUFNTSxRQUFRLEdBQUdOLG1CQUFtQixDQUFDaEQsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUM7UUFFL0VuRyw0Q0FBSSxDQUFDOEQsR0FBRyxDQUFDMkYsUUFBUSxFQUFFO1VBQUV2SCxPQUFPLEVBQUUsQ0FBQztVQUFFd0gsVUFBVSxFQUFFO1FBQVMsQ0FBQyxDQUFDO1FBRXhEMUosNENBQUksQ0FBQzhELEdBQUcsQ0FBQ3FGLG1CQUFtQixFQUFFO1VBQzVCakgsT0FBTyxFQUFFLENBQUM7VUFDVkMsYUFBYSxFQUFFLE1BQU07VUFDckJ1SCxVQUFVLEVBQUU7UUFDZCxDQUFDLENBQUM7UUFFRlgsV0FBVyxDQUFDSyxXQUFXLENBQUNELG1CQUFtQixDQUFDO01BQzlDOztNQUVBO01BQ0EsSUFBSSxDQUFDekksUUFBUSxDQUFDRSxjQUFjLEdBQUc4RSxRQUFRLENBQUNTLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDO01BQ2xGLElBQUksQ0FBQ3pGLFFBQVEsQ0FBQ0ksYUFBYSxHQUFHNEUsUUFBUSxDQUFDUyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztNQUMvRSxJQUFJLENBQUN6RixRQUFRLENBQUNLLFdBQVcsR0FBRzJFLFFBQVEsQ0FBQ1MsZ0JBQWdCLENBQUMseUJBQXlCLENBQUM7TUFDaEYsSUFBSSxDQUFDekYsUUFBUSxDQUFDTSxTQUFTLEdBQUcwRSxRQUFRLENBQUM4QixhQUFhLENBQUMsbUJBQW1CLENBQUM7TUFDckUsSUFBSSxDQUFDOUcsUUFBUSxDQUFDQyxTQUFTLEdBQUcrRSxRQUFRLENBQUM4QixhQUFhLENBQUMsbUJBQW1CLENBQUM7TUFFckUsSUFBSSxDQUFDbUMsaUJBQWlCLENBQUMsQ0FBQztNQUN4QixJQUFJLENBQUNDLHFCQUFxQixDQUFDLENBQUM7TUFDNUIsSUFBSSxDQUFDTCxrQkFBa0IsQ0FBQ25CLFFBQVEsQ0FBQztNQUVqQyxJQUFJRSxZQUFZLEVBQUU7UUFDaEJ1QixPQUFPLENBQUN2QixZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFWixHQUFHLENBQUM7TUFDbkMsQ0FBQyxNQUFNO1FBQ0xtQyxPQUFPLENBQUNDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUVwQyxHQUFHLENBQUM7TUFDaEM7TUFFQSxPQUFPLElBQUk7SUFFYixDQUFDLENBQUMsT0FBT3FDLEdBQUcsRUFBRTtNQUNaQyxPQUFPLENBQUNDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRUYsR0FBRyxDQUFDO01BQ2hELE9BQU8sS0FBSztJQUNkO0VBQ0Y7RUFFQUcsdUJBQXVCQSxDQUFBLEVBQUc7SUFDeEIsT0FBTyxJQUFJbEUsT0FBTyxDQUFFQyxPQUFPLElBQUs7TUFDOUIsTUFBTTJCLFdBQVcsR0FBRyxJQUFJLENBQUM5RixZQUFZLENBQUMsQ0FBQzs7TUFFdkMsTUFBTVosSUFBSSxHQUFHLElBQUksQ0FBQ1IsUUFBUSxDQUFDUSxJQUFJO01BQy9CLE1BQU1pSixZQUFZLEdBQUcsSUFBSSxDQUFDekosUUFBUSxDQUFDQyxTQUFTO01BQzVDLE1BQU15SixPQUFPLEdBQUdsSixJQUFJLENBQUNpRixnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztNQUMxRCxNQUFNa0UsS0FBSyxHQUFHbkYsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDekUsUUFBUSxDQUFDRSxjQUFjLENBQUM7TUFFdEQsSUFBSSxDQUFDYyxFQUFFLENBQUNPLEVBQUUsQ0FBQ2YsSUFBSSxFQUFFO1FBQ2ZnQixPQUFPLEVBQUUsQ0FBQztRQUNWb0YsVUFBVSxFQUFFO01BQ2QsQ0FBQyxDQUFDO01BRUY4QyxPQUFPLENBQUN6RixPQUFPLENBQUVQLEVBQUUsSUFBSztRQUN0QixNQUFNOEQsS0FBSyxHQUFHNUgscURBQVMsQ0FBQ2lCLE1BQU0sQ0FBQzZDLEVBQUUsRUFDakM7VUFDRWtHLElBQUksRUFBRSxPQUFPO1VBQ2JDLFNBQVMsRUFBRSxNQUFNO1VBQ2pCQyxJQUFJLEVBQUUsT0FBTztVQUNiQyxTQUFTLEVBQUU7UUFDYixDQUFDLENBQUM7O1FBRUQ7UUFDRHpLLDRDQUFJLENBQUM4RCxHQUFHLENBQUNNLEVBQUUsRUFBRTtVQUFFbEMsT0FBTyxFQUFFLENBQUM7VUFBR29GLFVBQVUsRUFBRTtRQUFnQixDQUFDLENBQUM7O1FBRTFEO1FBQ0FZLEtBQUssQ0FBQ3dDLEtBQUssQ0FBQy9GLE9BQU8sQ0FBQ2dHLElBQUksSUFBSUEsSUFBSSxDQUFDdEYscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQzNELEVBQUUsQ0FBQ29DLEdBQUcsQ0FBQ29FLEtBQUssQ0FBQ3dDLEtBQUssRUFBRTtVQUFFcEUsUUFBUSxFQUFFLEdBQUc7VUFBRXNFLGVBQWUsRUFBRTtRQUFLLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUNsSixFQUFFLENBQUNPLEVBQUUsQ0FBQ2lHLEtBQUssQ0FBQ3dDLEtBQUssRUFDcEI7VUFDRXBFLFFBQVEsRUFBRSxDQUFDO1VBQ1hsRSxRQUFRLEVBQUUsR0FBRztVQUNiQyxJQUFJLEVBQUUsTUFBTTtVQUNaQyxPQUFPLEVBQUU7UUFDWCxDQUFDLEVBQ0YsY0FBYyxDQUFDO01BQ2xCLENBQUMsQ0FBQztNQUdGLElBQUlzRixXQUFXLEtBQUssUUFBUSxFQUFFO1FBQzVCdUMsWUFBWSxDQUFDdkUsS0FBSyxDQUFDOEQsVUFBVSxHQUFHLFNBQVM7UUFDekNTLFlBQVksQ0FBQ3ZFLEtBQUssQ0FBQzFELE9BQU8sR0FBRyxDQUFDO1FBRTlCbUksS0FBSyxDQUFDMUYsT0FBTyxDQUFDUixDQUFDLElBQUlBLENBQUMsQ0FBQ3lCLEtBQUssQ0FBQzhELFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFbEQsSUFBSSxDQUFDaEksRUFBRSxDQUFDNkUsR0FBRyxDQUFDLE1BQU07VUFDaEIsSUFBSSxDQUFDZixVQUFVLENBQUMsS0FBSyxDQUFDO1VBQ3RCUyxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQ3ZFLEVBQUUsQ0FBQ08sRUFBRSxDQUFDb0ksS0FBSyxFQUNoQjtVQUNFbkksT0FBTyxFQUFFLENBQUM7VUFDVkUsUUFBUSxFQUFFLEdBQUc7VUFDYkMsSUFBSSxFQUFFLFlBQVk7VUFDbEJDLE9BQU8sRUFBRSxJQUFJO1VBQ2JtRSxVQUFVLEVBQUVBLENBQUEsS0FBTTtZQUNoQjBELFlBQVksQ0FBQ3ZFLEtBQUssQ0FBQ3pELGFBQWEsR0FBRyxNQUFNO1lBQ3pDbkMsNENBQUksQ0FBQzhELEdBQUcsQ0FBQ3VHLEtBQUssRUFBRTtjQUFFbEksYUFBYSxFQUFFO1lBQU0sQ0FBQyxDQUFDO1VBQzNDO1FBQ0YsQ0FBQyxFQUFFLE9BQU8sQ0FBQztNQUViLENBQUMsTUFBTTtRQUNMLElBQUksQ0FBQ1QsRUFBRSxDQUFDNkUsR0FBRyxDQUFDLE1BQU07VUFDaEIsSUFBSSxDQUFDZixVQUFVLENBQUMsS0FBSyxDQUFDO1VBQ3RCUyxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQztNQUNKO0lBQ0YsQ0FBQyxDQUFDO0VBQ0o7RUFFQXNELGtCQUFrQkEsQ0FBQ25CLFFBQVEsRUFBRTtJQUMzQixJQUFJLENBQUNBLFFBQVEsRUFBRTtJQUVmLElBQUksQ0FBQzFILFFBQVEsQ0FBQ1UsYUFBYSxDQUFDaUQsT0FBTyxDQUFDd0csWUFBWSxHQUFHekMsUUFBUTtJQUUzRCxJQUFJQSxRQUFRLEtBQUssTUFBTSxFQUFFO01BQ3ZCLElBQUksQ0FBQzFILFFBQVEsQ0FBQ1MsU0FBUyxDQUFDa0csU0FBUyxDQUFDYixNQUFNLENBQUMsYUFBYSxDQUFDO01BQ3ZELElBQUksQ0FBQzlGLFFBQVEsQ0FBQ1MsU0FBUyxDQUFDa0csU0FBUyxDQUFDZCxHQUFHLENBQUMsYUFBYSxDQUFDO0lBRXRELENBQUMsTUFBTSxJQUFJNkIsUUFBUSxLQUFLLFFBQVEsRUFBRztNQUNqQyxJQUFJLENBQUMxSCxRQUFRLENBQUNTLFNBQVMsQ0FBQ2tHLFNBQVMsQ0FBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQztNQUN2RCxJQUFJLENBQUM5RixRQUFRLENBQUNTLFNBQVMsQ0FBQ2tHLFNBQVMsQ0FBQ2QsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUN0RDtFQUNGO0VBRUEsSUFBSXpFLFlBQVlBLENBQUEsRUFBRztJQUNqQixJQUFJZ0osU0FBUyxHQUFHLElBQUksQ0FBQ3BLLFFBQVEsQ0FBQ1UsYUFBYSxDQUFDaUQsT0FBTyxDQUFDd0csWUFBWTtJQUNoRSxPQUFPQyxTQUFTO0VBQ2xCO0VBRUFsQixxQkFBcUJBLENBQUEsRUFBRztJQUN0QixNQUFNM0YsS0FBSyxHQUFHaUIsS0FBSyxDQUFDQyxJQUFJLENBQUNPLFFBQVEsQ0FBQ1MsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFcEZsQyxLQUFLLENBQUNVLE9BQU8sQ0FBQ0MsSUFBSSxJQUFJO01BQ3BCLE1BQU1tRyxPQUFPLEdBQUduRyxJQUFJLENBQUM0QyxhQUFhLENBQUMscUJBQXFCLENBQUM7TUFDekQsTUFBTXdELElBQUksR0FBR0QsT0FBTyxDQUFDdkQsYUFBYSxDQUFDLGVBQWUsQ0FBQztNQUVuRDVDLElBQUksQ0FBQ1osZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU9pSCxDQUFDLElBQUs7UUFDMUNBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7UUFDbEIsTUFBTXhELEdBQUcsR0FBRzlDLElBQUksQ0FBQ3VHLElBQUk7UUFFckIsTUFBTSxJQUFJLENBQUMxRCxjQUFjLENBQUM3QyxJQUFJLEVBQUU4QyxHQUFHLENBQUM7UUFFcEMsSUFBRyxNQUFNLElBQUksQ0FBQ1csZ0JBQWdCLENBQUNYLEdBQUcsQ0FBQyxFQUFFO1VBQ25DLE1BQU0sSUFBSSxDQUFDd0MsdUJBQXVCLENBQUMsQ0FBQyxFQUFDO1FBQ3ZDO01BRUYsQ0FBQyxDQUFDO01BRUZ0RixJQUFJLENBQUNaLGdCQUFnQixDQUFDLFdBQVcsRUFBR2lILENBQUMsSUFBSztRQUN4QyxNQUFNN0YsSUFBSSxHQUFHUixJQUFJLENBQUNTLHFCQUFxQixDQUFDLENBQUM7UUFDekMsTUFBTWpDLENBQUMsR0FBRzZILENBQUMsQ0FBQ0csT0FBTyxHQUFHaEcsSUFBSSxDQUFDaUcsSUFBSTtRQUMvQixNQUFNcEUsQ0FBQyxHQUFHZ0UsQ0FBQyxDQUFDSyxPQUFPLEdBQUdsRyxJQUFJLENBQUNFLEdBQUc7UUFFOUIsTUFBTWlHLE9BQU8sR0FBRyxDQUFDLEVBQUM7UUFDbEIsTUFBTUMsT0FBTyxHQUFHLENBQUV2RSxDQUFDLEdBQUc3QixJQUFJLENBQUNxRyxNQUFNLEdBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHRixPQUFPO1FBQ3hELE1BQU1HLE9BQU8sR0FBRyxDQUFFdEksQ0FBQyxHQUFHZ0MsSUFBSSxDQUFDcEMsS0FBSyxHQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUd1SSxPQUFPO1FBQ3RELE1BQU1JLEtBQUssR0FBSXZJLENBQUMsR0FBR2dDLElBQUksQ0FBQ3BDLEtBQUssR0FBSSxHQUFHO1FBQ3BDLE1BQU00SSxLQUFLLEdBQUkzRSxDQUFDLEdBQUc3QixJQUFJLENBQUNxRyxNQUFNLEdBQUksR0FBRztRQUVyQ3pMLDRDQUFJLENBQUNpQyxFQUFFLENBQUM4SSxPQUFPLEVBQUU7VUFDZlMsT0FBTztVQUNQRSxPQUFPO1VBQ1BHLEtBQUssRUFBRSxJQUFJO1VBQ1hDLG9CQUFvQixFQUFFLElBQUk7VUFDMUJ6SixJQUFJLEVBQUUsc0NBQXNDO1VBQzVDRCxRQUFRLEVBQUU7UUFDWixDQUFDLENBQUM7UUFFRnBDLDRDQUFJLENBQUNpQyxFQUFFLENBQUMrSSxJQUFJLEVBQUU7VUFDWmUsUUFBUSxFQUFFSixLQUFLLEdBQUcsRUFBRTtVQUNwQnJGLFFBQVEsRUFBRXNGLEtBQUssR0FBRyxFQUFFO1VBQ3BCMUosT0FBTyxFQUFFLENBQUM7VUFDVkUsUUFBUSxFQUFFLEdBQUc7VUFDYkMsSUFBSSxFQUFFO1FBQ1IsQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDO01BRUZ1QyxJQUFJLENBQUNaLGdCQUFnQixDQUFDLFlBQVksRUFBRSxNQUFNO1FBQ3hDaEUsNENBQUksQ0FBQ2lDLEVBQUUsQ0FBQzhJLE9BQU8sRUFBRTtVQUNmUyxPQUFPLEVBQUUsQ0FBQztVQUNWRSxPQUFPLEVBQUUsQ0FBQztVQUNWRyxLQUFLLEVBQUUsQ0FBQztVQUNSeEosSUFBSSxFQUFFLHFCQUFxQjtVQUFFO1VBQzdCRCxRQUFRLEVBQUU7UUFDWixDQUFDLENBQUM7UUFFRnBDLDRDQUFJLENBQUNpQyxFQUFFLENBQUMrSSxJQUFJLEVBQUU7VUFDWjlJLE9BQU8sRUFBRSxDQUFDO1VBQ1ZFLFFBQVEsRUFBRSxHQUFHO1VBQ2JDLElBQUksRUFBRTtRQUNSLENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztJQUVKLENBQUMsQ0FBQztFQUNKO0VBRUEySixzQkFBc0JBLENBQUEsRUFBRztJQUN2QixNQUFNQyxVQUFVLEdBQUcvRyxLQUFLLENBQUNDLElBQUksQ0FBQ08sUUFBUSxDQUFDUyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDK0YsSUFBSSxDQUFDdEgsSUFBSSxJQUNqR0EsSUFBSSxDQUFDdUcsSUFBSSxDQUFDZ0IsUUFBUSxDQUFDcEksTUFBTSxDQUFDZ0UsUUFBUSxDQUFDRSxRQUFRLENBQzdDLENBQUM7SUFFRCxJQUFHLElBQUksQ0FBQ25HLFlBQVksS0FBSyxRQUFRLEVBQUU7TUFDakM5Qiw0Q0FBSSxDQUFDOEQsR0FBRyxDQUFDLElBQUksQ0FBQ3BELFFBQVEsQ0FBQ1csU0FBUyxFQUFFO1FBQUVhLE9BQU8sRUFBRTtNQUFFLENBQUMsQ0FBQztJQUNuRDtJQUVBLElBQUksQ0FBQytKLFVBQVUsRUFBRTtJQUVqQixJQUFJLENBQUMxSixlQUFlLENBQUMwSixVQUFVLENBQUM7RUFDbEM7RUFFQUcsU0FBU0EsQ0FBQSxFQUFHO0lBQ1ZwTSw0Q0FBSSxDQUFDOEQsR0FBRyxDQUFDLElBQUksQ0FBQ3BELFFBQVEsQ0FBQ0ksYUFBYSxFQUFFO01BQUVvQixPQUFPLEVBQUU7SUFBRSxDQUFDLENBQUM7RUFDdkQ7RUFFQW1LLFVBQVVBLENBQUEsRUFBRztJQUNYLElBQUcsSUFBSSxDQUFDM0wsUUFBUSxDQUFDRSxjQUFjLEVBQUU7TUFDL0JaLDRDQUFJLENBQUM4RCxHQUFHLENBQUMsSUFBSSxDQUFDcEQsUUFBUSxDQUFDRSxjQUFjLEVBQUU7UUFBRXNCLE9BQU8sRUFBRSxDQUFDO1FBQUVDLGFBQWEsRUFBRTtNQUFPLENBQUMsQ0FBQztJQUMvRTtFQUNGO0VBRUF3SCxpQkFBaUJBLENBQUEsRUFBRztJQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDakosUUFBUSxDQUFDRSxjQUFjLEVBQUU7SUFDbkMsTUFBTXlKLEtBQUssR0FBRyxJQUFJLENBQUMzSixRQUFRLENBQUNFLGNBQWMsQ0FBQ3NELE1BQU0sS0FBS29JLFNBQVMsR0FDM0RwSCxLQUFLLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUN6RSxRQUFRLENBQUNFLGNBQWMsQ0FBQyxHQUN4QyxDQUFDLElBQUksQ0FBQ0YsUUFBUSxDQUFDRSxjQUFjLENBQUM7SUFFbEN5SixLQUFLLENBQUMxRixPQUFPLENBQUM0SCxPQUFPLElBQUk7TUFDdkIsSUFBSUMsRUFBRSxHQUFHRCxPQUFPLENBQUMvRSxhQUFhLENBQUMsc0JBQXNCLENBQUM7TUFDdEQsSUFBSWlGLFFBQVEsR0FBR0YsT0FBTyxDQUFDL0UsYUFBYSxDQUFDLHVCQUF1QixDQUFDO01BRTdEK0UsT0FBTyxDQUFDdkksZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE1BQU07UUFDM0N1SSxPQUFPLENBQUNsRixTQUFTLENBQUNkLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDL0UsUUFBUSxDQUFDa0wsV0FBVyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDbEwsUUFBUSxDQUFDbUwsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEM1TSw0Q0FBSSxDQUFDaUMsRUFBRSxDQUFDdUssRUFBRSxFQUFFO1VBQUVLLFFBQVEsRUFBRSw2Q0FBNkM7VUFBRXpLLFFBQVEsRUFBRSxHQUFHO1VBQUVDLElBQUksRUFBRTtRQUFPLENBQUMsQ0FBQztRQUNyR3JDLDRDQUFJLENBQUNpQyxFQUFFLENBQUN3SyxRQUFRLEVBQUU7VUFBRUksUUFBUSxFQUFFLDZDQUE2QztVQUFFekssUUFBUSxFQUFFLEdBQUc7VUFBRUMsSUFBSSxFQUFFO1FBQU8sQ0FBQyxDQUFDO01BQzdHLENBQUMsQ0FBQztNQUVGa0ssT0FBTyxDQUFDdkksZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE1BQU07UUFDM0N1SSxPQUFPLENBQUNsRixTQUFTLENBQUNiLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbEN4Ryw0Q0FBSSxDQUFDaUMsRUFBRSxDQUFDdUssRUFBRSxFQUFFO1VBQUVLLFFBQVEsRUFBRSxpREFBaUQ7VUFBRXpLLFFBQVEsRUFBRSxHQUFHO1VBQUVDLElBQUksRUFBRTtRQUFPLENBQUMsQ0FBQztRQUN6R3JDLDRDQUFJLENBQUNpQyxFQUFFLENBQUN3SyxRQUFRLEVBQUU7VUFBRUksUUFBUSxFQUFFLGlEQUFpRDtVQUFFekssUUFBUSxFQUFFLEdBQUc7VUFBRUMsSUFBSSxFQUFFO1FBQU8sQ0FBQyxDQUFDO01BQ2pILENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKO0VBRUFULElBQUlBLENBQUEsRUFBRztJQUNMLElBQUksQ0FBQytILGlCQUFpQixDQUFDLENBQUM7SUFDeEIsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVCLElBQUksQ0FBQ3dDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQ0MsVUFBVSxDQUFDLENBQUM7SUFDakIsSUFBSSxDQUFDTCxzQkFBc0IsQ0FBQyxDQUFDO0lBRTdCakksTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUdpSCxDQUFDLElBQUs7TUFDM0MsSUFBSUEsQ0FBQyxDQUFDNkIsTUFBTSxDQUFDQyxRQUFRLEtBQUssV0FBVyxFQUFFO1FBQ3JDLElBQUksQ0FBQ2xMLGNBQWMsQ0FBQyxDQUFDO01BQ3ZCO0lBQ0YsQ0FBQyxDQUFDO0lBRUZrQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxZQUFZO01BQzlDLE1BQU0wRCxHQUFHLEdBQUczRCxNQUFNLENBQUNnRSxRQUFRLENBQUNvRCxJQUFJO01BQ2hDLE1BQU1jLFVBQVUsR0FBRy9HLEtBQUssQ0FBQ0MsSUFBSSxDQUFDTyxRQUFRLENBQUNTLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMrRixJQUFJLENBQUN0SCxJQUFJLElBQ2pHQSxJQUFJLENBQUN1RyxJQUFJLENBQUNnQixRQUFRLENBQUNwSSxNQUFNLENBQUNnRSxRQUFRLENBQUNFLFFBQVEsQ0FDN0MsQ0FBQztNQUVELE1BQU0sSUFBSSxDQUFDUixjQUFjLENBQUN3RSxVQUFVLEVBQUV2RSxHQUFHLENBQUM7TUFDMUMsSUFBRyxNQUFNLElBQUksQ0FBQ1csZ0JBQWdCLENBQUNYLEdBQUcsRUFBRTtRQUFFWSxZQUFZLEVBQUU7TUFBSyxDQUFDLENBQUMsRUFBRTtRQUMzRCxNQUFNLElBQUksQ0FBQzRCLHVCQUF1QixDQUFDLENBQUM7TUFDdEM7SUFDRixDQUFDLENBQUM7RUFDSjtBQUNGLEM7Ozs7Ozs7O1VDN3BCQSxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL3Jvb20xODcvLi9hcHAvcGFnZXMvUGxheWxpc3RzL2luZGV4LmpzIiwid2VicGFjazovL3Jvb20xODcvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlIGZyb20gJ2NsYXNzZXMvUGFnZSdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSAnZ3NhcC9TY3JvbGxUcmlnZ2VyJ1xuaW1wb3J0IHsgQ3VzdG9tRWFzZSB9IGZyb20gJ2dzYXAvQ3VzdG9tRWFzZSdcbmltcG9ydCB7IEZsaXAgfSBmcm9tICdnc2FwL0ZsaXAnXG5pbXBvcnQgeyBzY3JvbGwgfSBmcm9tICd1dGlscy9MZW5pc1Njcm9sbCdcbmltcG9ydCB7IFNjcm9sbFRvUGx1Z2luIH0gZnJvbSAnZ3NhcC9TY3JvbGxUb1BsdWdpbidcbmltcG9ydCB7IFNwbGl0VGV4dCB9IGZyb20gJ2dzYXAvU3BsaXRUZXh0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5bGlzdHMgZXh0ZW5kcyBQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgaWQ6ICdwbGF5bGlzdHMnLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgdHJhY2tMaXN0OiAnW2RhdGEtdHJhY2stbGlzdF0nLCBcbiAgICAgICAgdHJhY2tMaXN0SXRlbXM6ICdbZGF0YS10cmFjay1saXN0LWl0ZW1dJyxcbiAgICAgICAgcGxheWxpc3RHcm91cDogJ1tkYXRhLXBsYXlsaXN0LWdyb3VwXScsXG4gICAgICAgIHBsYXlsaXN0Q2FyZHM6ICdbZGF0YS1wbGF5bGlzdC1jYXJkXScsXG4gICAgICAgIHBhZ2VUcmlnZ2VyOiAnW2RhdGEtcGxheWxpc3QtdHJpZ2dlcl0nLFxuICAgICAgICBtYWluVGl0bGU6ICdbZGF0YS1tYWluLXRpdGxlXScsXG4gICAgICAgIHBsYXlsaXN0Q2FyZE1ldGE6ICdbZGF0YS1wbGF5bGlzdC1tZXRhXScsIFxuICAgICAgICBoZXJvOiAnW2RhdGEtaGVyb10nLFxuICAgICAgICBjb250YWluZXI6ICdbZGF0YS1pbm5lci1jb250ZW50XScsXG4gICAgICAgIHBhZ2VDb250YWluZXI6ICdbZGF0YS1wYWdlLXZpZXctdHlwZV0nLFxuICAgICAgICBpbmRpY2F0b3I6ICdbZGF0YS1wbGF5bGlzdC1pbmRpY2F0b3JdJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIEN1c3RvbUVhc2UsIEZsaXAsIFNjcm9sbFRvUGx1Z2luLCBTcGxpdFRleHQpXG4gICAgQ3VzdG9tRWFzZS5jcmVhdGUoJ3pvb20nLCAnMC43MSwgMCwgMC4wNiwgMScpXG5cbiAgICB0aGlzLmNsaWNrRWZ4ID0gbmV3IEF1ZGlvKCcvY2xpY2subXAzJylcbiAgICB0aGlzLnNjcm9sbCA9IHNjcm9sbFxuICAgIHRoaXMudGwgPSBnc2FwLnRpbWVsaW5lKClcblxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBsb2FkQW5pbWF0aW9ucygpIHtcbiAgICBpZiAodGhpcy52aWV3UGFnZVR5cGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICB0aGlzLmFuaW1hdGVDYXJkc0luVmlldygpXG4gICAgICB0aGlzLnNjcm9sbENhcmRBbmltYXRpb25zKClcbiAgICB9IGVsc2Uge1xuICAgICAgZ3NhcC50byh0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zLFxuICAgICAgICB7IFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgcG9pbnRlckV2ZW50czogXCJhdXRvXCIsIFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjQsIFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLCBcbiAgICAgICAgICBzdGFnZ2VyOiAwLjA1IFxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlSW5kaWNhdG9yKHRhcmdldEVsKSB7XG4gICAgY29uc3QgcGxheWxpc3RTY3JvbGwgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0R3JvdXA7XG4gICAgY29uc3QgaW5kaWNhdG9yID0gdGhpcy5lbGVtZW50cy5pbmRpY2F0b3I7XG4gICAgaWYgKCFwbGF5bGlzdFNjcm9sbCB8fCAhaW5kaWNhdG9yIHx8ICF0YXJnZXRFbCkgcmV0dXJuO1xuXG4gICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBjYXJkIHNvIHRoZSByZXNpemUgaGFuZGxlciBjYW4gcmUtYWxpZ24gaXQuXG4gICAgdGhpcy5fYWN0aXZlSW5kaWNhdG9yVGFyZ2V0ID0gdGFyZ2V0RWw7XG5cbiAgICAvLyBBbHdheXMgcmVjb21wdXRlIHBhZGRpbmcgLyBvZmZzZXRzIHdoZW4gY2FsbGVkXG4gICAgY29uc3QgcGFkZGluZ0xlZnQgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUocGxheWxpc3RTY3JvbGwpLnBhZGRpbmdMZWZ0KSB8fCAwO1xuICAgIGNvbnN0IG9mZnNldCA9IHRhcmdldEVsLm9mZnNldExlZnQgLSBwYWRkaW5nTGVmdDtcbiAgICBjb25zdCB3aWR0aCA9IHRhcmdldEVsLm9mZnNldFdpZHRoO1xuXG4gICAgLy8ga2lsbCBhbnkgcHJldmlvdXMgdHdlZW5zIHRoYXQgbWlnaHQgY29uZmxpY3RcbiAgICBnc2FwLmtpbGxUd2VlbnNPZihwbGF5bGlzdFNjcm9sbCwgXCJzY3JvbGxMZWZ0XCIpO1xuICAgIGdzYXAua2lsbFR3ZWVuc09mKGluZGljYXRvciwgW1wieFwiLCBcIndpZHRoXCJdKTtcblxuICAgIC8vIEFuaW1hdGUgc2Nyb2xsIChhcyBiZWZvcmUpXG4gICAgZ3NhcC50byhwbGF5bGlzdFNjcm9sbCwge1xuICAgICAgc2Nyb2xsTGVmdDogb2Zmc2V0LFxuICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgIGVhc2U6IFwicG93ZXIzLm91dFwiXG4gICAgfSk7XG5cbiAgICAvLyBBbmltYXRlIGluZGljYXRvciB0byBtYXRjaCBwb3NpdGlvbiArIHNpemUgb2YgdGhlIGNhcmRcbiAgICBnc2FwLnRvKGluZGljYXRvciwge1xuICAgICAgeDogb2Zmc2V0LFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgIGVhc2U6IFwicG93ZXIzLm91dFwiXG4gICAgfSk7XG5cbiAgICAvLyAtLS0gUm9idXN0LCBsb3ctbGF0ZW5jeSByZXNpemUgaGFuZGxpbmcgKGJvdW5kIG9uY2UpIC0tLVxuICAgIGlmICghdGhpcy5faW5kaWNhdG9yUmVzaXplQm91bmQpIHtcbiAgICAgIHRoaXMuX2luZGljYXRvclJlc2l6ZUJvdW5kID0gdHJ1ZTtcblxuICAgICAgdGhpcy5faW5kaWNhdG9yUmVzaXplUmFmID0gbnVsbDtcbiAgICAgIHRoaXMuX29uSW5kaWNhdG9yUmVzaXplID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5faW5kaWNhdG9yUmVzaXplUmFmKSBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9pbmRpY2F0b3JSZXNpemVSYWYpO1xuICAgICAgICB0aGlzLl9pbmRpY2F0b3JSZXNpemVSYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHQgPSB0aGlzLl9hY3RpdmVJbmRpY2F0b3JUYXJnZXQ7XG4gICAgICAgICAgaWYgKCF0IHx8ICFwbGF5bGlzdFNjcm9sbCB8fCAhaW5kaWNhdG9yKSByZXR1cm47XG5cbiAgICAgICAgICAvLyBSZWNvbXB1dGUgdmFsdWVzIGV2ZXJ5IHJlc2l6ZVxuICAgICAgICAgIGNvbnN0IHBhZGRpbmdMZWZ0Tm93ID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKHBsYXlsaXN0U2Nyb2xsKS5wYWRkaW5nTGVmdCkgfHwgMDtcbiAgICAgICAgICBjb25zdCBuZXdPZmZzZXQgPSB0Lm9mZnNldExlZnQgLSBwYWRkaW5nTGVmdE5vdztcbiAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IHQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICBnc2FwLnNldChwbGF5bGlzdFNjcm9sbCwgeyBzY3JvbGxMZWZ0OiBuZXdPZmZzZXQgfSk7XG4gICAgICAgICAgZ3NhcC5zZXQoaW5kaWNhdG9yLCB7IHg6IG5ld09mZnNldCwgd2lkdGg6IG5ld1dpZHRoIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX29uSW5kaWNhdG9yUmVzaXplKTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxDYXJkQW5pbWF0aW9ucygpIHtcbiAgICBjb25zdCBjYXJkcyA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkcztcbiAgICBpZiAoIWNhcmRzIHx8ICFjYXJkcy5sZW5ndGgpIHJldHVybjtcblxuICAgIC8vIG9ubHkgaGlkZSBjYXJkcyB0aGF0IGhhdmUgTk9UIGJlZW4gYW5pbWF0ZWRcbiAgICBnc2FwLnNldChjYXJkcywgeyBvcGFjaXR5OiAoaSwgZWwpID0+IGVsLmRhdGFzZXQuYW5pbWF0ZWQgPT09IFwidHJ1ZVwiID8gMSA6IDAgfSk7XG5cbiAgICBjb25zdCBhbmltYXRlQmF0Y2ggPSAoYmF0Y2gpID0+IHtcbiAgICAgIGdzYXAuZnJvbVRvKGJhdGNoLFxuICAgICAgICB7IG9wYWNpdHk6IDAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIixcbiAgICAgICAgICBzdGFnZ2VyOiAwLjE1LFxuICAgICAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgICAgIGJhdGNoLmZvckVhY2goY2FyZCA9PiBjYXJkLmRhdGFzZXQuYW5pbWF0ZWQgPSBcInRydWVcIik7IC8vIG1hcmsgYXMgYW5pbWF0ZWRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIFNjcm9sbFRyaWdnZXIuYmF0Y2goY2FyZHMsIHtcbiAgICAgIG9uRW50ZXI6IChiYXRjaCkgPT4ge1xuICAgICAgICBiYXRjaCA9IGJhdGNoLmZpbHRlcihjYXJkID0+IGNhcmQuZGF0YXNldC5hbmltYXRlZCAhPT0gXCJ0cnVlXCIpO1xuICAgICAgICBpZiAoYmF0Y2gubGVuZ3RoKSBhbmltYXRlQmF0Y2goYmF0Y2gpO1xuICAgICAgfSxcbiAgICAgIHN0YXJ0OiBcInRvcCA4MCVcIixcbiAgICB9KTtcblxuICAgIC8vIFJlZnJlc2ggU2Nyb2xsVHJpZ2dlciBvbiByZXNpemUgdG8gcHJldmVudCBnbGl0Y2hlc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVDYXJkc0luVmlldygpIHtcbiAgICBjb25zdCBjYXJkcyA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkcztcbiAgICBpZiAoIWNhcmRzIHx8ICFjYXJkcy5sZW5ndGggfHwgdGhpcy52aWV3UGFnZVR5cGUgIT09IFwiZ3JpZFwiICkgcmV0dXJuO1xuXG4gICAgY29uc3QgaW5WaWV3Q2FyZHMgPSBBcnJheS5mcm9tKGNhcmRzKS5maWx0ZXIoY2FyZCA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gY2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiByZWN0LnRvcCA8IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuOTUgJiYgY2FyZC5kYXRhc2V0LmFuaW1hdGVkICE9PSBcInRydWVcIjtcbiAgICB9KTtcblxuICAgIGlmICghaW5WaWV3Q2FyZHMubGVuZ3RoKSByZXR1cm47XG5cbiAgICBnc2FwLmZyb21UbyhpblZpZXdDYXJkcyxcbiAgICAgIHsgb3BhY2l0eTogMCB9LFxuICAgICAge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIixcbiAgICAgICAgc3RhZ2dlcjogMC4xNSxcbiAgICAgICAgb25TdGFydDogKCkgPT4gaW5WaWV3Q2FyZHMuZm9yRWFjaChjYXJkID0+IGNhcmQuZGF0YXNldC5hbmltYXRlZCA9IFwidHJ1ZVwiKVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBsb2NrU2Nyb2xsKGxvY2sgPSB0cnVlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IGxvY2sgPyAnaGlkZGVuJyA6ICcnXG4gICAgbG9jaz8gdGhpcy5zY3JvbGwuc3RvcCgpIDogdGhpcy5zY3JvbGwuc3RhcnQoKVxuICB9XG5cbiAgZGV0YWlsVG9EZXRhaWxUcmFuc2l0aW9uKGNhcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlSW5kaWNhdG9yKGNhcmQpXG4gICAgICBjb25zdCBzcGxpdFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcGxpdC10ZXh0XScpXG4gICAgICBjb25zdCB0cmFja0xpc3RTZWN0aW9uID0gdGhpcy5lbGVtZW50cy50cmFja0xpc3RcblxuICAgICAgc3BsaXRUZXh0LmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgICAgIGxldCBkaXZzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2ID4gZGl2JylcbiAgICAgICAgdGhpcy50bC50byhkaXZzLCB7IFxuICAgICAgICAgIHlQZXJjZW50OiAxMDAsIFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjYsIFxuICAgICAgICAgIGVhc2U6ICd6b29tJ1xuICAgICAgICB9LCAnZ3JvdXAnKVxuXG4gICAgICAgIHRoaXMudGwuYWRkKCgpID0+IGVsLnJlbW92ZSgpLCAnZ3JvdXArPTAuNicpXG4gICAgICB9KVxuXG4gICAgICB0aGlzLnRsLnRvKHRyYWNrTGlzdFNlY3Rpb24sIHsgXG4gICAgICAgIG9wYWNpdHk6IDAsIFxuICAgICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLCBcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIHRyYWNrTGlzdFNlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sICdncm91cCcpXG5cbiAgICAgIHRoaXMudGwuYWRkKHJlc29sdmUsICc+JylcbiAgICB9KVxuXG4gIH1cblxuICBncmlkVG9EZXRhaWxUcmFuc2l0aW9uKHNlbGVjdGVkQ2FyZCkge1xuICAgIGlmKCFzZWxlY3RlZENhcmQpIHJldHVyblxuXG4gICAgY29uc3QgZ3JpZEVsID0gdGhpcy5lbGVtZW50cy5wbGF5bGlzdEdyb3VwXG4gICAgY29uc3QgY2FyZHMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkcyB8fCBbXSlcbiAgICBjb25zdCBtYWluVGl0bGVTZWN0aW9uID0gdGhpcy5lbGVtZW50cy5oZXJvXG4gICAgY29uc3QgbWV0YSA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkTWV0YVxuICAgIGNvbnN0IGluZGljYXRvciA9IHRoaXMuZWxlbWVudHMuaW5kaWNhdG9yXG4gICAgY29uc3QgbWFpblRpdGxlTWFzayA9IHRoaXMuZWxlbWVudHMubWFpblRpdGxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdiA+IGRpdicpXG5cbiAgICBpZiAoIWdyaWRFbCB8fCAhY2FyZHMubGVuZ3RoICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpIFxuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5sb2NrU2Nyb2xsKHRydWUpXG5cbiAgICAgIGNhcmRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAoZWwuZGF0YXNldC5hbmltYXRlZCAhPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICBnc2FwLnNldChlbCwgeyBvcGFjaXR5OiAxIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHRoaXMudGwudG8obWV0YSwgeyBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC40LCBlYXNlOiBcInBvd2VyMi5vdXRcIn0pXG4gICAgICBcbiAgICAgIC50byh3aW5kb3csIHtcbiAgICAgICAgc2Nyb2xsVG86IHsgeTogMCB9LFxuICAgICAgICBkdXJhdGlvbjogMC44LFxuICAgICAgICBlYXNlOiAncG93ZXIyLm91dCdcbiAgICAgIH0pXG5cbiAgICAgIC50byhtYWluVGl0bGVNYXNrLCBcbiAgICAgICAgeyBcbiAgICAgICAgICB5UGVyY2VudDogMTAwLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgICAgZWFzZTogJ3pvb20nXG4gICAgICAgIH0sIFxuICAgICAgJy09MC4yJylcblxuICAgICAgLmFkZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gRmxpcC5nZXRTdGF0ZShjYXJkcywgeyBhYnNvbHV0ZTogdHJ1ZSB9KVxuXG4gICAgICAgIGlmIChtYWluVGl0bGVTZWN0aW9uKSBtYWluVGl0bGVTZWN0aW9uLnJlbW92ZSgpXG5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVyby0tbC1wLXQnKVxuICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoZXJvLS1zLXAtdCcpXG4gICAgICAgICAgICBcbiAgICAgICAgZ3JpZEVsLmNsYXNzTGlzdC5hZGQoJ3BsYXlsaXN0LWdyb3VwLS1yb3cnKVxuXG4gICAgICAgIEZsaXAuZnJvbShzdGF0ZSwge1xuICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgICAgZWFzZTogJ3pvb20nLFxuICAgICAgICAgIGFic29sdXRlOiB0cnVlLFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGdyaWRFbC5jbGFzc0xpc3QuYWRkKCdyZWxhdGl2ZScpXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUluZGljYXRvcihzZWxlY3RlZENhcmQpXG4gICAgICAgICAgICB0aGlzLnRsLnRvKG1ldGEsIHsgY2xlYXJQcm9wczogXCJvcGFjaXR5XCIgfSApXG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pIFxuICAgICAgfSlcbiAgICAgIC50byhpbmRpY2F0b3IsIHtvcGFjaXR5OiAxLCBkdXJhdGlvbjogMC4zLCBlYXNlOiBcInBvd2VyMi5vdXRcIn0sICcrPTEnKVxuICAgIH0pXG4gIH1cblxuICBkZXRhaWxUb0dyaWRUcmFuc2l0aW9uKCkge1xuICAgIGNvbnN0IHNwbGl0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwbGl0LXRleHRdJylcbiAgICBjb25zdCB0cmFja0xpc3RTZWN0aW9uID0gdGhpcy5lbGVtZW50cy50cmFja0xpc3RcbiAgICBjb25zdCBoZXJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVyb10nKVxuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5sb2NrU2Nyb2xsKHRydWUpXG4gICAgXG4gICAgICBzcGxpdFRleHQuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgICAgbGV0IGRpdnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYgPiBkaXYnKVxuICAgICAgICB0aGlzLnRsLnRvKGRpdnMsIHsgXG4gICAgICAgICAgeVBlcmNlbnQ6IDEwMCwgXG4gICAgICAgICAgZHVyYXRpb246IDAuNiwgXG4gICAgICAgICAgZWFzZTogJ3pvb20nXG4gICAgICAgIH0sICdncm91cCcpXG4gICAgICB9KVxuXG4gICAgICB0aGlzLnRsLnRvKHRyYWNrTGlzdFNlY3Rpb24sIHsgXG4gICAgICAgIG9wYWNpdHk6IDAsIFxuICAgICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLCBcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIHRyYWNrTGlzdFNlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sICdncm91cCcpXG5cbiAgICAgIHRoaXMudGwuYWRkKCgpID0+IHtcbiAgICAgICAgaGVyby5yZW1vdmUoKVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfSlcblxuICB9XG5cbiAgYXN5bmMgYmVmb3JlTmF2aWdhdGUoY2FyZCwgdXJsKSB7XG4gICAgdGhpcy50bC5jbGVhcigpO1xuICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gdGhpcy52aWV3UGFnZVR5cGU7IC8vIFwiZ3JpZFwiIG9yIFwiZGV0YWlsXCJcbiAgICBjb25zdCBwYXRoU2VnbWVudHMgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24ub3JpZ2luKS5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKTtcbiAgICBjb25zdCBuZXh0VHlwZSA9IHBhdGhTZWdtZW50cy5sZW5ndGggPT09IDEgPyAnZ3JpZCcgOiAnZGV0YWlsJztcblxuICAgIGlmIChjdXJyZW50VHlwZSA9PT0gXCJncmlkXCIgJiYgbmV4dFR5cGUgPT09IFwiZGV0YWlsXCIpIHtcbiAgICAgIC8vIEdyaWQg4oaSIERldGFpbFxuICAgICAgYXdhaXQgdGhpcy5ncmlkVG9EZXRhaWxUcmFuc2l0aW9uKGNhcmQpXG4gICAgfSBlbHNlIGlmIChjdXJyZW50VHlwZSA9PT0gXCJkZXRhaWxcIiAmJiBuZXh0VHlwZSA9PT0gXCJkZXRhaWxcIikge1xuICAgICAgLy8gRGV0YWlsIOKGkiBEZXRhaWxcbiAgICAgIGF3YWl0IHRoaXMuZGV0YWlsVG9EZXRhaWxUcmFuc2l0aW9uKGNhcmQpXG4gICAgfSBlbHNlIGlmIChjdXJyZW50VHlwZSA9PT0gXCJkZXRhaWxcIiAmJiBuZXh0VHlwZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgIC8vIERldGFpbCDihpIgR3JpZCAoZS5nLiwgYmFjayBidXR0b24pXG4gICAgICBhd2FpdCB0aGlzLmRldGFpbFRvR3JpZFRyYW5zaXRpb24oKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZU5hdmlnYXRpb24odXJsLCB7IHJlcGxhY2VTdGF0ZSA9IGZhbHNlIH0gPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXRlcm1pbmUgcGFnZSB0eXBlc1xuICAgICAgY29uc3QgY3VycmVudFR5cGUgPSB0aGlzLnZpZXdQYWdlVHlwZTsgLy8gY3VycmVudCBwYWdlIHR5cGVcbiAgICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5vcmlnaW4pLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgY29uc3QgbmV4dFR5cGUgPSBwYXRoU2VnbWVudHMubGVuZ3RoID09PSAxID8gJ2dyaWQnIDogJ2RldGFpbCc7IC8vIG5leHQgcGFnZSB0eXBlIGJhc2VkIG9uIFVSTFxuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgICBjb25zdCBodG1sID0gYXdhaXQgcmVzLnRleHQoKVxuICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKVxuICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbGVtZW50cy5jb250YWluZXJcbiAgICAgIGNvbnN0IHBhZ2VXcmFwcGVyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsYXlsaXN0LXBhZ2Utd3JhcHBlcl0nKVxuICAgICAgY29uc3QgbmV3SGVybyA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZXJvXScpXG4gICAgICBjb25zdCBtYWluVGl0bGUgPSBkb2MucXVlcnlTZWxlY3RvcignW2RhdGEtbWFpbi10aXRsZV0nKVxuICAgICAgY29uc3QgY3VycmVudE1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWxpc3QtZGV0YWlsLWhlYWRlcl9fbWV0YScpIFxuICAgICAgY29uc3QgbmV3TWV0YVRleHQgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LWRldGFpbC1oZWFkZXJfX21ldGEgW2RhdGEtc3BsaXQtdGV4dF0nKVxuICAgICAgY29uc3QgbmV3VHJhY2tMaXN0U2VjdGlvbiA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS10cmFjay1saXN0XScpXG5cbiAgICAgIGlmIChjdXJyZW50VHlwZSA9PT0gXCJncmlkXCIgJiYgbmV4dFR5cGUgPT09IFwiZGV0YWlsXCIpIHtcblxuICAgICAgICBpZiAobmV3SGVybykge1xuICAgICAgICAgIGdzYXAuc2V0KG5ld0hlcm8sIHsgb3BhY2l0eTogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIgfSlcbiAgICAgICAgICBwYWdlV3JhcHBlci5hcHBlbmRDaGlsZChuZXdIZXJvKVxuICAgICAgICAgIHRoaXMuZWxlbWVudHMuaGVybyA9IG5ld0hlcm9cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImRldGFpbFwiKSB7XG4gICAgICAgIGNvbnN0IGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZXJvXSAuY29udGFpbmVyJylcbiAgICAgIFxuICAgICAgICBnc2FwLnNldChtYWluVGl0bGUsIHsgb3BhY2l0eTogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIgfSlcblxuICAgICAgICBoZXJvQ29udGFpbmVyLnByZXBlbmQobWFpblRpdGxlKVxuXG4gICAgICAgIG5ld01ldGFUZXh0LmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGdzYXAuc2V0KGVsLCB7IG9wYWNpdHk6IDAsIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH0pXG4gICAgICAgICAgY3VycmVudE1ldGEuYXBwZW5kQ2hpbGQoZWwpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gdGhpcyBiaXQgaXMgd2hhdCBpIG5lZWQgZm9yIGdyaWQgdG8gZGV0YWlsIGFuZCBkZXRhaWwgdG8gZGV0YWlsIFxuXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgICBjb25zdCBjYXJkcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzIHx8IFtdKVxuICAgICAgICBjb25zdCBncmlkRWwgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0R3JvdXBcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gdGhpcy5lbGVtZW50cy5pbmRpY2F0b3JcbiAgICAgICAgY29uc3QgbWV0YSA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkTWV0YVxuXG4gICAgICAgIGdzYXAudG8oaW5kaWNhdG9yLCB7IG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjMsIGVhc2U6IFwicG93ZXIyLm91dFwiIH0pXG4gICAgICAgIGdzYXAuc2V0KG1ldGEsIHsgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuMiwgZWFzZTogXCJwb3dlcjIub3V0XCIgfSlcbiAgICAgICAgIFxuICAgICAgICBncmlkRWwuY2xhc3NMaXN0LnJlbW92ZSgncmVsYXRpdmUnKVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBGbGlwLmdldFN0YXRlKGNhcmRzLCB7IGFic29sdXRlOiB0cnVlIH0pXG4gICAgICAgIGdyaWRFbC5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5bGlzdC1ncm91cC0tcm93JylcbiAgICAgICAgdGhpcy51cGRhdGVQYWdlVmlld1R5cGUobmV4dFR5cGUpXG4gICAgICAgIFxuICAgICAgICBnc2FwLnNldChuZXdIZXJvLCB7IG9wYWNpdHk6IDAgfSlcbiAgICAgICAgY29udGFpbmVyLnByZXBlbmQobmV3SGVybylcblxuICAgICAgICBGbGlwLmZyb20oc3RhdGUsIHtcbiAgICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICAgIGVhc2U6ICd6b29tJyxcbiAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZSxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBnc2FwLnRvKG1ldGEsIHsgb3BhY2l0eTogMSwgZHVyYXRpb246IDAuNCwgZGVsYXk6IDAuMiwgZWFzZTogXCJwb3dlcjIub3V0XCIgfSlcbiAgICAgICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiBjYXJkLmRhdGFzZXQuYW5pbWF0ZWQgPSBcInRydWVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuZWxlbWVudHMuaGVybyA9IG5ld0hlcm9cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1RyYWNrTGlzdFNlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgbmV3SXRlbXMgPSBuZXdUcmFja0xpc3RTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYWNrLWxpc3QtaXRlbV0nKVxuICAgICAgICBcbiAgICAgICAgZ3NhcC5zZXQobmV3SXRlbXMsIHsgb3BhY2l0eTogMCwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiB9KVxuXG4gICAgICAgIGdzYXAuc2V0KG5ld1RyYWNrTGlzdFNlY3Rpb24sIHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiLFxuICAgICAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCJcbiAgICAgICAgfSlcblxuICAgICAgICBwYWdlV3JhcHBlci5hcHBlbmRDaGlsZChuZXdUcmFja0xpc3RTZWN0aW9uKVxuICAgICAgfVxuXG4gICAgICAvLyBSZWZyZXNoIGVsZW1lbnQgcmVmZXJlbmNlc1xuICAgICAgdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYWNrLWxpc3QtaXRlbV0nKVxuICAgICAgdGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWxpc3QtY2FyZF0nKVxuICAgICAgdGhpcy5lbGVtZW50cy5wYWdlVHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXlsaXN0LXRyaWdnZXJdJylcbiAgICAgIHRoaXMuZWxlbWVudHMubWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbWFpbi10aXRsZV0nKVxuICAgICAgdGhpcy5lbGVtZW50cy50cmFja0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10cmFjay1saXN0XScpXG5cbiAgICAgIHRoaXMuYWRkSG92ZXJMaXN0ZW5lcnMoKVxuICAgICAgdGhpcy5wbGF5TGlzdENhcmRMaXN0ZW5lcnMoKVxuICAgICAgdGhpcy51cGRhdGVQYWdlVmlld1R5cGUobmV4dFR5cGUpXG5cbiAgICAgIGlmIChyZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCB1cmwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsIHVybClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignUGxheWxpc3QgbmF2aWdhdGlvbiBlcnJvcjonLCBlcnIpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBhZnRlck5hdmlnYXRlQW5pbWF0aW9ucygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gdGhpcy52aWV3UGFnZVR5cGU7IC8vIGN1cnJlbnQgcGFnZSB0eXBlXG4gICAgICBcbiAgICAgIGNvbnN0IGhlcm8gPSB0aGlzLmVsZW1lbnRzLmhlcm9cbiAgICAgIGNvbnN0IHRyYWNrU2VjdGlvbiA9IHRoaXMuZWxlbWVudHMudHJhY2tMaXN0XG4gICAgICBjb25zdCBwVGl0bGVzID0gaGVyby5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcGxpdC10ZXh0XScpXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcyk7XG5cbiAgICAgIHRoaXMudGwudG8oaGVybywge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBjbGVhclByb3BzOiBcInBvaW50ZXJFdmVudHNcIlxuICAgICAgfSlcblxuICAgICAgcFRpdGxlcy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdCA9IFNwbGl0VGV4dC5jcmVhdGUoZWwsIFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJsaW5lc1wiLFxuICAgICAgICAgIGxpbmVDbGFzczogXCJsaW5lXCIsXG4gICAgICAgICAgbWFzazogXCJsaW5lc1wiLFxuICAgICAgICAgIGF1dG9TcGxpdDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgICAvLyBBbHdheXMgcmVzZXQgc3RhcnRpbmcgcG9zaXRpb24gYmVmb3JlIGFuaW1hdGluZ1xuICAgICAgICBnc2FwLnNldChlbCwgeyBvcGFjaXR5OiAxLCAgY2xlYXJQcm9wczogXCJwb2ludGVyRXZlbnRzXCIgfSk7XG5cbiAgICAgICAgLy8gRm9yY2UgYnJvd3NlciB0byByZWdpc3RlciBsYXlvdXQgYmVmb3JlIGFuaW1hdGluZ1xuICAgICAgICBzcGxpdC5saW5lcy5mb3JFYWNoKGxpbmUgPT4gbGluZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSlcbiAgICAgICAgdGhpcy50bC5zZXQoc3BsaXQubGluZXMsIHsgeVBlcmNlbnQ6IDEwMCwgaW1tZWRpYXRlUmVuZGVyOiB0cnVlIH0pXG5cbiAgICAgICAgdGhpcy50bC50byhzcGxpdC5saW5lcyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB5UGVyY2VudDogMCwgXG4gICAgICAgICAgICBkdXJhdGlvbjogMC44LCBcbiAgICAgICAgICAgIGVhc2U6IFwiem9vbVwiLFxuICAgICAgICAgICAgc3RhZ2dlcjogMC4wNVxuICAgICAgICAgIH1cbiAgICAgICAgLCd0aXRsZXMgLT0wLjInKVxuICAgICAgfSlcbiAgICAgIFxuICAgICAgXG4gICAgICBpZiAoY3VycmVudFR5cGUgPT09IFwiZGV0YWlsXCIpIHtcbiAgICAgICAgdHJhY2tTZWN0aW9uLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIlxuICAgICAgICB0cmFja1NlY3Rpb24uc3R5bGUub3BhY2l0eSA9IDFcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4gaS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCIpXG5cbiAgICAgICAgdGhpcy50bC5hZGQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9ja1Njcm9sbChmYWxzZSlcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfSlcbiAgICAgICBcbiAgICAgICAgdGhpcy50bC50byhpdGVtcyxcbiAgICAgICAgeyBcbiAgICAgICAgICBvcGFjaXR5OiAxLCBcbiAgICAgICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIiwgXG4gICAgICAgICAgc3RhZ2dlcjogMC4wNSxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICB0cmFja1NlY3Rpb24uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiXG4gICAgICAgICAgICBnc2FwLnNldChpdGVtcywgeyBwb2ludGVyRXZlbnRzOiBcImF1dG9cIn0pXG4gICAgICAgICAgfSBcbiAgICAgICAgfSwgXCItPTAuMlwiKVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRsLmFkZCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2NrU2Nyb2xsKGZhbHNlKVxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVQYWdlVmlld1R5cGUobmV4dFR5cGUpIHtcbiAgICBpZiAoIW5leHRUeXBlKSByZXR1cm47XG5cbiAgICB0aGlzLmVsZW1lbnRzLnBhZ2VDb250YWluZXIuZGF0YXNldC5wYWdlVmlld1R5cGUgPSBuZXh0VHlwZVxuXG4gICAgaWYgKG5leHRUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgdGhpcy5lbGVtZW50cy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVyby0tcy1wLXQnKVxuICAgICAgdGhpcy5lbGVtZW50cy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGVyby0tbC1wLXQnKVxuXG4gICAgfSBlbHNlIGlmIChuZXh0VHlwZSA9PT0gXCJkZXRhaWxcIiApIHtcbiAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlcm8tLWwtcC10JylcbiAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hlcm8tLXMtcC10JylcbiAgICB9XG4gIH1cblxuICBnZXQgdmlld1BhZ2VUeXBlKCkge1xuICAgIGxldCB2UGFnZVR5cGUgPSB0aGlzLmVsZW1lbnRzLnBhZ2VDb250YWluZXIuZGF0YXNldC5wYWdlVmlld1R5cGVcbiAgICByZXR1cm4gdlBhZ2VUeXBlXG4gIH1cblxuICBwbGF5TGlzdENhcmRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgY2FyZHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXlsaXN0LXRyaWdnZXJdJykgfHwgW10pXG5cbiAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgY29uc3QgY2FyZEltZyA9IGNhcmQucXVlcnlTZWxlY3RvcignLnBsYXlsaXN0LWNhcmRfX2ltZycpXG4gICAgICBjb25zdCBnbG93ID0gY2FyZEltZy5xdWVyeVNlbGVjdG9yKCcuZ2xvdy1vdmVybGF5JylcblxuICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCB1cmwgPSBjYXJkLmhyZWZcblxuICAgICAgICBhd2FpdCB0aGlzLmJlZm9yZU5hdmlnYXRlKGNhcmQsIHVybClcblxuICAgICAgICBpZihhd2FpdCB0aGlzLmhhbmRsZU5hdmlnYXRpb24odXJsKSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWZ0ZXJOYXZpZ2F0ZUFuaW1hdGlvbnMoKSAvLyBSdW4gYWZ0ZXIgbmF2aWdhdGlvbiBhbmltYXRpb25zXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9KVxuXG4gICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSBjYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSByZWN0LmxlZnRcbiAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wXG5cbiAgICAgICAgY29uc3QgbWF4VGlsdCA9IDggLy8gYWRqdXN0IHRoaXMgZm9yIGludGVuc2l0eVxuICAgICAgICBjb25zdCByb3RhdGVYID0gKCh5IC8gcmVjdC5oZWlnaHQpIC0gMC41KSAqIC0yICogbWF4VGlsdFxuICAgICAgICBjb25zdCByb3RhdGVZID0gKCh4IC8gcmVjdC53aWR0aCkgLSAwLjUpICogMiAqIG1heFRpbHRcbiAgICAgICAgY29uc3QgZ2xvd1ggPSAoeCAvIHJlY3Qud2lkdGgpICogMTAwXG4gICAgICAgIGNvbnN0IGdsb3dZID0gKHkgLyByZWN0LmhlaWdodCkgKiAxMDBcblxuICAgICAgICBnc2FwLnRvKGNhcmRJbWcsIHtcbiAgICAgICAgICByb3RhdGVYLFxuICAgICAgICAgIHJvdGF0ZVksXG4gICAgICAgICAgc2NhbGU6IDEuMDMsXG4gICAgICAgICAgdHJhbnNmb3JtUGVyc3BlY3RpdmU6IDEwMDAsXG4gICAgICAgICAgZWFzZTogXCJjdWJpYy1iZXppZXIoMC4wMywgMC45OCwgMC41MiwgMC45OSlcIixcbiAgICAgICAgICBkdXJhdGlvbjogMC40XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdzYXAudG8oZ2xvdywge1xuICAgICAgICAgIHhQZXJjZW50OiBnbG93WCAtIDUwLFxuICAgICAgICAgIHlQZXJjZW50OiBnbG93WSAtIDUwLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDAuNCxcbiAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIlxuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgZ3NhcC50byhjYXJkSW1nLCB7XG4gICAgICAgICAgcm90YXRlWDogMCxcbiAgICAgICAgICByb3RhdGVZOiAwLFxuICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgIGVhc2U6IFwiZWxhc3RpYy5vdXQoMSwgMC4zKVwiLCAvLyBuYXR1cmFsIFwic2V0dGxlIGJhY2tcIlxuICAgICAgICAgIGR1cmF0aW9uOiAxLjJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ3NhcC50byhnbG93LCB7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIzLm91dFwiXG4gICAgICAgIH0pXG4gICAgICB9KTtcblxuICAgIH0pXG4gIH1cblxuICBwbGF5TGlzdEluZGljYXRvclNldHVwKCkge1xuICAgIGNvbnN0IGFjdGl2ZUNhcmQgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXlsaXN0LXRyaWdnZXJdJykgfHwgW10pLmZpbmQoY2FyZCA9PlxuICAgICAgY2FyZC5ocmVmLmluY2x1ZGVzKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSlcbiAgICApO1xuXG4gICAgaWYodGhpcy52aWV3UGFnZVR5cGUgPT09IFwiZGV0YWlsXCIpIHtcbiAgICAgIGdzYXAuc2V0KHRoaXMuZWxlbWVudHMuaW5kaWNhdG9yLCB7IG9wYWNpdHk6IDEgfSkgXG4gICAgfVxuICAgXG4gICAgaWYgKCFhY3RpdmVDYXJkKSByZXR1cm47XG5cbiAgICB0aGlzLnVwZGF0ZUluZGljYXRvcihhY3RpdmVDYXJkKVxuICB9XG5cbiAgaGlkZUNhcmRzKCkge1xuICAgIGdzYXAuc2V0KHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkcywgeyBvcGFjaXR5OiAwIH0pXG4gIH1cblxuICBoaWRlVHJhY2tzKCkge1xuICAgIGlmKHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMpIHtcbiAgICAgIGdzYXAuc2V0KHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMsIHsgb3BhY2l0eTogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIgfSlcbiAgICB9XG4gIH1cblxuICBhZGRIb3Zlckxpc3RlbmVycygpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMpIHJldHVyblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcy5sZW5ndGggIT09IHVuZGVmaW5lZFxuICAgICAgPyBBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMpXG4gICAgICA6IFt0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zXVxuXG4gICAgaXRlbXMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGxldCBiZyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdHJhY2stbGlzdC1iZ10nKVxuICAgICAgbGV0IGFsYnVtSW1nID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10cmFjay1saXN0LWltZ10nKVxuXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgdGhpcy5jbGlja0VmeC5jdXJyZW50VGltZSA9IDBcbiAgICAgICAgdGhpcy5jbGlja0VmeC5wbGF5KCkuY2F0Y2goKCkgPT4ge30pXG4gICAgICAgIGdzYXAudG8oYmcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDAlLCAxMDAlIDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICAgIGdzYXAudG8oYWxidW1JbWcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDAlLCAxMDAlIDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICB9KVxuXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgZ3NhcC50byhiZywgeyBjbGlwUGF0aDogJ3BvbHlnb24oMCUgMTAwJSwgMTAwJSAxMDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICAgIGdzYXAudG8oYWxidW1JbWcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDEwMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkZEhvdmVyTGlzdGVuZXJzKClcbiAgICB0aGlzLnBsYXlMaXN0Q2FyZExpc3RlbmVycygpXG4gICAgdGhpcy5oaWRlQ2FyZHMoKVxuICAgIHRoaXMuaGlkZVRyYWNrcygpXG4gICAgdGhpcy5wbGF5TGlzdEluZGljYXRvclNldHVwKClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlTG9hZGVkJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmRldGFpbC50ZW1wbGF0ZSA9PT0gJ3BsYXlsaXN0cycpIHtcbiAgICAgICAgdGhpcy5sb2FkQW5pbWF0aW9ucygpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgY29uc3QgYWN0aXZlQ2FyZCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWxpc3QtdHJpZ2dlcl0nKSB8fCBbXSkuZmluZChjYXJkID0+XG4gICAgICAgIGNhcmQuaHJlZi5pbmNsdWRlcyh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpXG4gICAgICApO1xuXG4gICAgICBhd2FpdCB0aGlzLmJlZm9yZU5hdmlnYXRlKGFjdGl2ZUNhcmQsIHVybCk7XG4gICAgICBpZihhd2FpdCB0aGlzLmhhbmRsZU5hdmlnYXRpb24odXJsLCB7IHJlcGxhY2VTdGF0ZTogdHJ1ZSB9KSkge1xuICAgICAgICBhd2FpdCB0aGlzLmFmdGVyTmF2aWdhdGVBbmltYXRpb25zKCk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImI2OWRjYWNlY2QxZjNlZTdlZjFhXCIpIl0sIm5hbWVzIjpbIlBhZ2UiLCJnc2FwIiwiU2Nyb2xsVHJpZ2dlciIsIkN1c3RvbUVhc2UiLCJGbGlwIiwic2Nyb2xsIiwiU2Nyb2xsVG9QbHVnaW4iLCJTcGxpdFRleHQiLCJQbGF5bGlzdHMiLCJjb25zdHJ1Y3RvciIsImlkIiwiZWxlbWVudHMiLCJ0cmFja0xpc3QiLCJ0cmFja0xpc3RJdGVtcyIsInBsYXlsaXN0R3JvdXAiLCJwbGF5bGlzdENhcmRzIiwicGFnZVRyaWdnZXIiLCJtYWluVGl0bGUiLCJwbGF5bGlzdENhcmRNZXRhIiwiaGVybyIsImNvbnRhaW5lciIsInBhZ2VDb250YWluZXIiLCJpbmRpY2F0b3IiLCJyZWdpc3RlclBsdWdpbiIsImNyZWF0ZSIsImNsaWNrRWZ4IiwiQXVkaW8iLCJ0bCIsInRpbWVsaW5lIiwiaW5pdCIsImxvYWRBbmltYXRpb25zIiwidmlld1BhZ2VUeXBlIiwiYW5pbWF0ZUNhcmRzSW5WaWV3Iiwic2Nyb2xsQ2FyZEFuaW1hdGlvbnMiLCJ0byIsIm9wYWNpdHkiLCJwb2ludGVyRXZlbnRzIiwiZHVyYXRpb24iLCJlYXNlIiwic3RhZ2dlciIsInVwZGF0ZUluZGljYXRvciIsInRhcmdldEVsIiwicGxheWxpc3RTY3JvbGwiLCJfYWN0aXZlSW5kaWNhdG9yVGFyZ2V0IiwicGFkZGluZ0xlZnQiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsIm9mZnNldCIsIm9mZnNldExlZnQiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwia2lsbFR3ZWVuc09mIiwic2Nyb2xsTGVmdCIsIngiLCJfaW5kaWNhdG9yUmVzaXplQm91bmQiLCJfaW5kaWNhdG9yUmVzaXplUmFmIiwiX29uSW5kaWNhdG9yUmVzaXplIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0IiwicGFkZGluZ0xlZnROb3ciLCJuZXdPZmZzZXQiLCJuZXdXaWR0aCIsInNldCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYXJkcyIsImxlbmd0aCIsImkiLCJlbCIsImRhdGFzZXQiLCJhbmltYXRlZCIsImFuaW1hdGVCYXRjaCIsImJhdGNoIiwiZnJvbVRvIiwib25TdGFydCIsImZvckVhY2giLCJjYXJkIiwib25FbnRlciIsImZpbHRlciIsInN0YXJ0IiwicmVmcmVzaCIsImluVmlld0NhcmRzIiwiQXJyYXkiLCJmcm9tIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImlubmVySGVpZ2h0IiwibG9ja1Njcm9sbCIsImxvY2siLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIm92ZXJmbG93Iiwic3RvcCIsImRldGFpbFRvRGV0YWlsVHJhbnNpdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwic3BsaXRUZXh0IiwicXVlcnlTZWxlY3RvckFsbCIsInRyYWNrTGlzdFNlY3Rpb24iLCJkaXZzIiwieVBlcmNlbnQiLCJhZGQiLCJyZW1vdmUiLCJvbkNvbXBsZXRlIiwiZ3JpZFRvRGV0YWlsVHJhbnNpdGlvbiIsInNlbGVjdGVkQ2FyZCIsImdyaWRFbCIsIm1haW5UaXRsZVNlY3Rpb24iLCJtZXRhIiwibWFpblRpdGxlTWFzayIsInNjcm9sbFRvIiwieSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhYnNvbHV0ZSIsImNsYXNzTGlzdCIsImNsZWFyUHJvcHMiLCJkZXRhaWxUb0dyaWRUcmFuc2l0aW9uIiwicXVlcnlTZWxlY3RvciIsImJlZm9yZU5hdmlnYXRlIiwidXJsIiwiY2xlYXIiLCJjdXJyZW50VHlwZSIsInBhdGhTZWdtZW50cyIsIlVSTCIsImxvY2F0aW9uIiwib3JpZ2luIiwicGF0aG5hbWUiLCJzcGxpdCIsIkJvb2xlYW4iLCJuZXh0VHlwZSIsImhhbmRsZU5hdmlnYXRpb24iLCJyZXBsYWNlU3RhdGUiLCJyZXMiLCJmZXRjaCIsImh0bWwiLCJ0ZXh0IiwicGFyc2VyIiwiRE9NUGFyc2VyIiwiZG9jIiwicGFyc2VGcm9tU3RyaW5nIiwicGFnZVdyYXBwZXIiLCJuZXdIZXJvIiwiY3VycmVudE1ldGEiLCJuZXdNZXRhVGV4dCIsIm5ld1RyYWNrTGlzdFNlY3Rpb24iLCJhcHBlbmRDaGlsZCIsImhlcm9Db250YWluZXIiLCJwcmVwZW5kIiwidXBkYXRlUGFnZVZpZXdUeXBlIiwiZGVsYXkiLCJuZXdJdGVtcyIsInZpc2liaWxpdHkiLCJhZGRIb3Zlckxpc3RlbmVycyIsInBsYXlMaXN0Q2FyZExpc3RlbmVycyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJhZnRlck5hdmlnYXRlQW5pbWF0aW9ucyIsInRyYWNrU2VjdGlvbiIsInBUaXRsZXMiLCJpdGVtcyIsInR5cGUiLCJsaW5lQ2xhc3MiLCJtYXNrIiwiYXV0b1NwbGl0IiwibGluZXMiLCJsaW5lIiwiaW1tZWRpYXRlUmVuZGVyIiwicGFnZVZpZXdUeXBlIiwidlBhZ2VUeXBlIiwiY2FyZEltZyIsImdsb3ciLCJlIiwicHJldmVudERlZmF1bHQiLCJocmVmIiwiY2xpZW50WCIsImxlZnQiLCJjbGllbnRZIiwibWF4VGlsdCIsInJvdGF0ZVgiLCJoZWlnaHQiLCJyb3RhdGVZIiwiZ2xvd1giLCJnbG93WSIsInNjYWxlIiwidHJhbnNmb3JtUGVyc3BlY3RpdmUiLCJ4UGVyY2VudCIsInBsYXlMaXN0SW5kaWNhdG9yU2V0dXAiLCJhY3RpdmVDYXJkIiwiZmluZCIsImluY2x1ZGVzIiwiaGlkZUNhcmRzIiwiaGlkZVRyYWNrcyIsInVuZGVmaW5lZCIsImVsZW1lbnQiLCJiZyIsImFsYnVtSW1nIiwiY3VycmVudFRpbWUiLCJwbGF5IiwiY2F0Y2giLCJjbGlwUGF0aCIsImRldGFpbCIsInRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==
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
        pageContainer: '[data-page-view-type]'
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
    let playlistScroll = this.elements.playlistGroup;
    if (!playlistScroll) return;
    const scrollRect = playlistScroll.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    // How far the card is from the left edge of the scroll container
    const deltaX = targetRect.left - scrollRect.left;
    const targetX = -deltaX;
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].to(playlistScroll, {
      x: targetX,
      duration: 0.4,
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
    //gsap.set(cards, { opacity: 0 }); // start all cards invisible

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
      console.log(trackListSection);
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
  gridToDetailTransition() {
    const gridEl = this.elements.playlistGroup;
    const cards = Array.from(this.elements.playlistCards || []);
    const mainTitleSection = this.elements.hero;
    const meta = this.elements.playlistCardMeta;
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
      });
      this.tl.to(window, {
        scrollTo: {
          y: 0
        },
        duration: 0.8,
        ease: 'power2.out'
      });
      this.tl.to(mainTitleMask, {
        yPercent: 100,
        duration: 0.6,
        ease: 'zoom',
        onComplete: () => {
          if (mainTitleSection) mainTitleSection.remove();
          this.elements.container.classList.remove('hero--l-p-t');
          this.elements.container.classList.add('hero--s-p-t');
          const state = gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.getState(cards, {
            absolute: true
          });
          gridEl.classList.add('playlist-group--row');
          gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.from(state, {
            duration: 0.6,
            ease: 'zoom',
            absolute: true
          });
        }
      }, '-=0.2');
      this.tl.add(() => {
        resolve();
      }, '-=0.2');
    });
  }
  detailToGridTransition() {
    const splitText = document.querySelectorAll('[data-split-text]');
    const cards = Array.from(this.elements.playlistCards || []);
    const trackListSection = this.elements.trackList;
    const hero = this.elements.hero;
    const gridEl = this.elements.playlistGroup;
    const state = gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.getState(cards, {
      absolute: true
    });
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
      gridEl.classList.remove('playlist-group--row');
      gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.from(state, {
        duration: 0.6,
        ease: 'zoom',
        absolute: true
      });
    });
    this.tl.add(() => {
      return Promise.resolve();
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
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(newHero, {
          opacity: 0
        });
        pageWrapper.prepend(newHero);
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
      this.updatePageViewType();
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

      const hero = document.querySelector('[data-hero]');
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
        items.forEach(i => i.style.visibility = "visible");
        this.tl.add(() => {
          this.lockScroll(false);
          resolve();
        });

        // gsap.set(trackSection, { opacity: 1, visibility: "visible", clearProps: "pointerEvents" })
        // gsap.set(items, { clearProps: "visibility" })

        this.tl.to(items, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05
        }, "-=0.2");
      } else {
        this.tl.add(() => {
          resolve();
        });
      }
    });
  }
  updatePageViewType(nextType) {
    if (!nextType) return;
    if (nextType === "grid") {
      this.elements.pageContainer.dataset.pageViewType = "detail";
      this.elements.container.classList.remove('hero--s-p-t');
      this.elements.container.classList.add('hero--l-p-t');
    } else if (nextType === "detail") {
      this.elements.pageContainer.dataset.pageViewType = "grid";
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
      card.addEventListener('click', async e => {
        e.preventDefault();
        const url = card.href;
        await this.beforeNavigate(card, url);
        if (await this.handleNavigation(url)) {
          await this.afterNavigateAnimations(); // Run after navigation animations
        }
      });
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
    window.addEventListener('pageLoaded', e => {
      if (e.detail.template === 'playlists') {
        this.loadAnimations();
      }
    });
    window.addEventListener('popstate', async () => {
      const url = window.location.href;
      // call the same beforeNavigate logic, no card in this case
      await this.beforeNavigate(null, url);
      await this.handleNavigation(url, {
        replaceState: true
      });
      await this.afterNavigateAnimations();
    });
  }
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6563cb8d881c986ba163")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iM2JjMWQ5Y2U0NDJjYTVmY2Q3My5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUNSO0FBQzJCO0FBQ047QUFDWjtBQUNVO0FBQ1U7QUFDVjtBQUUzQixNQUFNUSxTQUFTLFNBQVNSLG9EQUFJLENBQUM7RUFDMUNTLFdBQVdBLENBQUEsRUFBRztJQUNaLEtBQUssQ0FBQztNQUNKQyxFQUFFLEVBQUUsV0FBVztNQUNmQyxRQUFRLEVBQUU7UUFDUkMsU0FBUyxFQUFFLG1CQUFtQjtRQUM5QkMsY0FBYyxFQUFFLHdCQUF3QjtRQUN4Q0MsYUFBYSxFQUFFLHVCQUF1QjtRQUN0Q0MsYUFBYSxFQUFFLHNCQUFzQjtRQUNyQ0MsV0FBVyxFQUFFLHlCQUF5QjtRQUN0Q0MsU0FBUyxFQUFFLG1CQUFtQjtRQUM5QkMsZ0JBQWdCLEVBQUUsc0JBQXNCO1FBQ3hDQyxJQUFJLEVBQUUsYUFBYTtRQUNuQkMsU0FBUyxFQUFFLHNCQUFzQjtRQUNqQ0MsYUFBYSxFQUFFO01BQ2pCO0lBQ0YsQ0FBQyxDQUFDO0lBRUZwQiw0Q0FBSSxDQUFDcUIsY0FBYyxDQUFDcEIsNkRBQWEsRUFBRUMsdURBQVUsRUFBRUMsMkNBQUksRUFBRUUsK0RBQWMsRUFBRUMscURBQVMsQ0FBQztJQUMvRUosdURBQVUsQ0FBQ29CLE1BQU0sQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUM7SUFFN0MsSUFBSSxDQUFDQyxRQUFRLEdBQUcsSUFBSUMsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUN2QyxJQUFJLENBQUNwQixNQUFNLEdBQUdBLHFEQUFNO0lBQ3BCLElBQUksQ0FBQ3FCLEVBQUUsR0FBR3pCLDRDQUFJLENBQUMwQixRQUFRLENBQUMsQ0FBQztJQUV6QixJQUFJLENBQUNDLElBQUksQ0FBQyxDQUFDO0VBQ2I7RUFFQUMsY0FBY0EsQ0FBQSxFQUFHO0lBQ2YsSUFBSSxJQUFJLENBQUNDLFlBQVksS0FBSyxNQUFNLEVBQUU7TUFDaEMsSUFBSSxDQUFDQyxrQkFBa0IsQ0FBQyxDQUFDO01BQ3pCLElBQUksQ0FBQ0Msb0JBQW9CLENBQUMsQ0FBQztJQUM3QixDQUFDLE1BQU07TUFDTC9CLDRDQUFJLENBQUNnQyxFQUFFLENBQUMsSUFBSSxDQUFDdEIsUUFBUSxDQUFDRSxjQUFjLEVBQ2xDO1FBQ0VxQixPQUFPLEVBQUUsQ0FBQztRQUNWQyxhQUFhLEVBQUUsTUFBTTtRQUNyQkMsUUFBUSxFQUFFLEdBQUc7UUFDYkMsSUFBSSxFQUFFLFlBQVk7UUFDbEJDLE9BQU8sRUFBRTtNQUNYLENBQ0YsQ0FBQztJQUNIO0VBQ0Y7RUFFQUMsZUFBZUEsQ0FBQ0MsUUFBUSxFQUFFO0lBQ3hCLElBQUlDLGNBQWMsR0FBRyxJQUFJLENBQUM5QixRQUFRLENBQUNHLGFBQWE7SUFDaEQsSUFBSSxDQUFDMkIsY0FBYyxFQUFFO0lBRXJCLE1BQU1DLFVBQVUsR0FBR0QsY0FBYyxDQUFDRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pELE1BQU1DLFVBQVUsR0FBR0osUUFBUSxDQUFDRyxxQkFBcUIsQ0FBQyxDQUFDOztJQUVuRDtJQUNBLE1BQU1FLE1BQU0sR0FBR0QsVUFBVSxDQUFDRSxJQUFJLEdBQUdKLFVBQVUsQ0FBQ0ksSUFBSTtJQUNoRCxNQUFNQyxPQUFPLEdBQUcsQ0FBQ0YsTUFBTTtJQUV2QjVDLDRDQUFJLENBQUNnQyxFQUFFLENBQUNRLGNBQWMsRUFBRTtNQUN0Qk8sQ0FBQyxFQUFFRCxPQUFPO01BQ1ZYLFFBQVEsRUFBRSxHQUFHO01BQ2JDLElBQUksRUFBRTtJQUNSLENBQUMsQ0FBQztFQUNKO0VBRUFMLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQ3JCLE1BQU1pQixLQUFLLEdBQUcsSUFBSSxDQUFDdEMsUUFBUSxDQUFDSSxhQUFhO0lBQ3pDLElBQUksQ0FBQ2tDLEtBQUssSUFBSSxDQUFDQSxLQUFLLENBQUNDLE1BQU0sRUFBRTs7SUFFN0I7SUFDQWpELDRDQUFJLENBQUNrRCxHQUFHLENBQUNGLEtBQUssRUFBRTtNQUFFZixPQUFPLEVBQUVBLENBQUNrQixDQUFDLEVBQUVDLEVBQUUsS0FBS0EsRUFBRSxDQUFDQyxPQUFPLENBQUNDLFFBQVEsS0FBSyxNQUFNLEdBQUcsQ0FBQyxHQUFHO0lBQUUsQ0FBQyxDQUFDO0lBQy9FOztJQUVBLE1BQU1DLFlBQVksR0FBSUMsS0FBSyxJQUFLO01BQzlCeEQsNENBQUksQ0FBQ3lELE1BQU0sQ0FBQ0QsS0FBSyxFQUNmO1FBQUV2QixPQUFPLEVBQUU7TUFBRSxDQUFDLEVBQ2Q7UUFDRUEsT0FBTyxFQUFFLENBQUM7UUFDVkUsUUFBUSxFQUFFLEdBQUc7UUFDYkMsSUFBSSxFQUFFLFlBQVk7UUFDbEJDLE9BQU8sRUFBRSxJQUFJO1FBQ2JxQixPQUFPLEVBQUVBLENBQUEsS0FBTTtVQUNiRixLQUFLLENBQUNHLE9BQU8sQ0FBQ0MsSUFBSSxJQUFJQSxJQUFJLENBQUNQLE9BQU8sQ0FBQ0MsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQ7TUFDRixDQUNGLENBQUM7SUFDSCxDQUFDO0lBRURyRCw2REFBYSxDQUFDdUQsS0FBSyxDQUFDUixLQUFLLEVBQUU7TUFDekJhLE9BQU8sRUFBR0wsS0FBSyxJQUFLO1FBQ2xCQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ00sTUFBTSxDQUFDRixJQUFJLElBQUlBLElBQUksQ0FBQ1AsT0FBTyxDQUFDQyxRQUFRLEtBQUssTUFBTSxDQUFDO1FBQzlELElBQUlFLEtBQUssQ0FBQ1AsTUFBTSxFQUFFTSxZQUFZLENBQUNDLEtBQUssQ0FBQztNQUN2QyxDQUFDO01BQ0RPLEtBQUssRUFBRTtJQUNULENBQUMsQ0FBQzs7SUFFRjtJQUNBQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxNQUFNO01BQ3RDaEUsNkRBQWEsQ0FBQ2lFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQztFQUNKO0VBRUFwQyxrQkFBa0JBLENBQUEsRUFBRztJQUNuQixNQUFNa0IsS0FBSyxHQUFHLElBQUksQ0FBQ3RDLFFBQVEsQ0FBQ0ksYUFBYTtJQUN6QyxJQUFJLENBQUNrQyxLQUFLLElBQUksQ0FBQ0EsS0FBSyxDQUFDQyxNQUFNLElBQUksSUFBSSxDQUFDcEIsWUFBWSxLQUFLLE1BQU0sRUFBRztJQUU5RCxNQUFNc0MsV0FBVyxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQ3JCLEtBQUssQ0FBQyxDQUFDYyxNQUFNLENBQUNGLElBQUksSUFBSTtNQUNuRCxNQUFNVSxJQUFJLEdBQUdWLElBQUksQ0FBQ2xCLHFCQUFxQixDQUFDLENBQUM7TUFDekMsT0FBTzRCLElBQUksQ0FBQ0MsR0FBRyxHQUFHUCxNQUFNLENBQUNRLFdBQVcsR0FBRyxJQUFJLElBQUlaLElBQUksQ0FBQ1AsT0FBTyxDQUFDQyxRQUFRLEtBQUssTUFBTTtJQUNqRixDQUFDLENBQUM7SUFFRixJQUFJLENBQUNhLFdBQVcsQ0FBQ2xCLE1BQU0sRUFBRTtJQUV6QmpELDRDQUFJLENBQUN5RCxNQUFNLENBQUNVLFdBQVcsRUFDckI7TUFBRWxDLE9BQU8sRUFBRTtJQUFFLENBQUMsRUFDZDtNQUNFQSxPQUFPLEVBQUUsQ0FBQztNQUNWRSxRQUFRLEVBQUUsR0FBRztNQUNiQyxJQUFJLEVBQUUsWUFBWTtNQUNsQkMsT0FBTyxFQUFFLElBQUk7TUFDYnFCLE9BQU8sRUFBRUEsQ0FBQSxLQUFNUyxXQUFXLENBQUNSLE9BQU8sQ0FBQ0MsSUFBSSxJQUFJQSxJQUFJLENBQUNQLE9BQU8sQ0FBQ0MsUUFBUSxHQUFHLE1BQU07SUFDM0UsQ0FDRixDQUFDO0VBQ0g7RUFFQW1CLFVBQVVBLENBQUNDLElBQUksR0FBRyxJQUFJLEVBQUU7SUFDdEJDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxLQUFLLENBQUNDLFFBQVEsR0FBR0osSUFBSSxHQUFHLFFBQVEsR0FBRyxFQUFFO0lBQ25EQSxJQUFJLEdBQUUsSUFBSSxDQUFDdEUsTUFBTSxDQUFDMkUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMzRSxNQUFNLENBQUMyRCxLQUFLLENBQUMsQ0FBQztFQUNoRDtFQUVBaUIsd0JBQXdCQSxDQUFDcEIsSUFBSSxFQUFFO0lBQzdCLE9BQU8sSUFBSXFCLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO01BQzlCLElBQUksQ0FBQzVDLGVBQWUsQ0FBQ3NCLElBQUksQ0FBQztNQUMxQixNQUFNdUIsU0FBUyxHQUFHUixRQUFRLENBQUNTLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO01BQ2hFLE1BQU1DLGdCQUFnQixHQUFHLElBQUksQ0FBQzNFLFFBQVEsQ0FBQ0MsU0FBUztNQUVoRDJFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixnQkFBZ0IsQ0FBQztNQUU3QkYsU0FBUyxDQUFDeEIsT0FBTyxDQUFDLENBQUNQLEVBQUUsRUFBRUQsQ0FBQyxLQUFLO1FBQzNCLElBQUlxQyxJQUFJLEdBQUdwQyxFQUFFLENBQUNnQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7UUFDM0MsSUFBSSxDQUFDM0QsRUFBRSxDQUFDTyxFQUFFLENBQUN3RCxJQUFJLEVBQUU7VUFDZkMsUUFBUSxFQUFFLEdBQUc7VUFDYnRELFFBQVEsRUFBRSxHQUFHO1VBQ2JDLElBQUksRUFBRTtRQUNSLENBQUMsRUFBRSxPQUFPLENBQUM7UUFFWCxJQUFJLENBQUNYLEVBQUUsQ0FBQ2lFLEdBQUcsQ0FBQyxNQUFNdEMsRUFBRSxDQUFDdUMsTUFBTSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUM7TUFDOUMsQ0FBQyxDQUFDO01BRUYsSUFBSSxDQUFDbEUsRUFBRSxDQUFDTyxFQUFFLENBQUNxRCxnQkFBZ0IsRUFBRTtRQUMzQnBELE9BQU8sRUFBRSxDQUFDO1FBQ1ZFLFFBQVEsRUFBRSxHQUFHO1FBQ2JDLElBQUksRUFBRSxZQUFZO1FBQ2xCd0QsVUFBVSxFQUFFQSxDQUFBLEtBQU07VUFDaEJQLGdCQUFnQixDQUFDTSxNQUFNLENBQUMsQ0FBQztRQUMzQjtNQUNGLENBQUMsRUFBRSxPQUFPLENBQUM7TUFFWCxJQUFJLENBQUNsRSxFQUFFLENBQUNpRSxHQUFHLENBQUNSLE9BQU8sRUFBRSxHQUFHLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0VBRUo7RUFFQVcsc0JBQXNCQSxDQUFBLEVBQUc7SUFDdkIsTUFBTUMsTUFBTSxHQUFHLElBQUksQ0FBQ3BGLFFBQVEsQ0FBQ0csYUFBYTtJQUMxQyxNQUFNbUMsS0FBSyxHQUFHb0IsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDM0QsUUFBUSxDQUFDSSxhQUFhLElBQUksRUFBRSxDQUFDO0lBQzNELE1BQU1pRixnQkFBZ0IsR0FBRyxJQUFJLENBQUNyRixRQUFRLENBQUNRLElBQUk7SUFDM0MsTUFBTThFLElBQUksR0FBRyxJQUFJLENBQUN0RixRQUFRLENBQUNPLGdCQUFnQjtJQUMzQyxNQUFNZ0YsYUFBYSxHQUFHLElBQUksQ0FBQ3ZGLFFBQVEsQ0FBQ00sU0FBUyxDQUFDb0UsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBRTNFLElBQUksQ0FBQ1UsTUFBTSxJQUFJLENBQUM5QyxLQUFLLENBQUNDLE1BQU0sRUFBRyxPQUFPZ0MsT0FBTyxDQUFDQyxPQUFPLENBQUMsQ0FBQztJQUV2RCxPQUFPLElBQUlELE9BQU8sQ0FBRUMsT0FBTyxJQUFLO01BQzlCLElBQUksQ0FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQztNQUVyQnpCLEtBQUssQ0FBQ1csT0FBTyxDQUFDUCxFQUFFLElBQUk7UUFDbEIsSUFBSUEsRUFBRSxDQUFDQyxPQUFPLENBQUNDLFFBQVEsS0FBSyxNQUFNLEVBQUU7VUFDbEN0RCw0Q0FBSSxDQUFDa0QsR0FBRyxDQUFDRSxFQUFFLEVBQUU7WUFBRW5CLE9BQU8sRUFBRTtVQUFFLENBQUMsQ0FBQztRQUM5QjtNQUNGLENBQUMsQ0FBQztNQUVGLElBQUksQ0FBQ1IsRUFBRSxDQUFDTyxFQUFFLENBQUNnRSxJQUFJLEVBQUU7UUFBRS9ELE9BQU8sRUFBRSxDQUFDO1FBQUVFLFFBQVEsRUFBRSxHQUFHO1FBQUVDLElBQUksRUFBRTtNQUFZLENBQUMsQ0FBQztNQUVsRSxJQUFJLENBQUNYLEVBQUUsQ0FBQ08sRUFBRSxDQUFDZ0MsTUFBTSxFQUFFO1FBQ2pCa0MsUUFBUSxFQUFFO1VBQUVDLENBQUMsRUFBRTtRQUFFLENBQUM7UUFDbEJoRSxRQUFRLEVBQUUsR0FBRztRQUNiQyxJQUFJLEVBQUU7TUFDUixDQUFDLENBQUM7TUFFRixJQUFJLENBQUNYLEVBQUUsQ0FBQ08sRUFBRSxDQUFDaUUsYUFBYSxFQUN0QjtRQUNFUixRQUFRLEVBQUUsR0FBRztRQUNidEQsUUFBUSxFQUFFLEdBQUc7UUFDYkMsSUFBSSxFQUFFLE1BQU07UUFDWndELFVBQVUsRUFBRUEsQ0FBQSxLQUFNO1VBQ2hCLElBQUlHLGdCQUFnQixFQUFFQSxnQkFBZ0IsQ0FBQ0osTUFBTSxDQUFDLENBQUM7VUFFL0MsSUFBSSxDQUFDakYsUUFBUSxDQUFDUyxTQUFTLENBQUNpRixTQUFTLENBQUNULE1BQU0sQ0FBQyxhQUFhLENBQUM7VUFDdkQsSUFBSSxDQUFDakYsUUFBUSxDQUFDUyxTQUFTLENBQUNpRixTQUFTLENBQUNWLEdBQUcsQ0FBQyxhQUFhLENBQUM7VUFFcEQsTUFBTVcsS0FBSyxHQUFHbEcsMkNBQUksQ0FBQ21HLFFBQVEsQ0FBQ3RELEtBQUssRUFBRTtZQUFFdUQsUUFBUSxFQUFFO1VBQUssQ0FBQyxDQUFDO1VBRXREVCxNQUFNLENBQUNNLFNBQVMsQ0FBQ1YsR0FBRyxDQUFDLHFCQUFxQixDQUFDO1VBRTNDdkYsMkNBQUksQ0FBQ2tFLElBQUksQ0FBQ2dDLEtBQUssRUFBRTtZQUNmbEUsUUFBUSxFQUFFLEdBQUc7WUFDYkMsSUFBSSxFQUFFLE1BQU07WUFDWm1FLFFBQVEsRUFBRTtVQUNaLENBQUMsQ0FBQztRQUNKO01BQ0YsQ0FBQyxFQUNILE9BQU8sQ0FBQztNQUVSLElBQUksQ0FBQzlFLEVBQUUsQ0FBQ2lFLEdBQUcsQ0FBQyxNQUFNO1FBQ2hCUixPQUFPLENBQUMsQ0FBQztNQUNYLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDYixDQUFDLENBQUM7RUFDSjtFQUVBc0Isc0JBQXNCQSxDQUFBLEVBQUc7SUFDdkIsTUFBTXJCLFNBQVMsR0FBR1IsUUFBUSxDQUFDUyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztJQUNoRSxNQUFNcEMsS0FBSyxHQUFHb0IsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDM0QsUUFBUSxDQUFDSSxhQUFhLElBQUksRUFBRSxDQUFDO0lBQzNELE1BQU11RSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMzRSxRQUFRLENBQUNDLFNBQVM7SUFDaEQsTUFBTU8sSUFBSSxHQUFHLElBQUksQ0FBQ1IsUUFBUSxDQUFDUSxJQUFJO0lBQy9CLE1BQU00RSxNQUFNLEdBQUcsSUFBSSxDQUFDcEYsUUFBUSxDQUFDRyxhQUFhO0lBQzFDLE1BQU13RixLQUFLLEdBQUdsRywyQ0FBSSxDQUFDbUcsUUFBUSxDQUFDdEQsS0FBSyxFQUFFO01BQUV1RCxRQUFRLEVBQUU7SUFBSyxDQUFDLENBQUM7SUFFdERwQixTQUFTLENBQUN4QixPQUFPLENBQUMsQ0FBQ1AsRUFBRSxFQUFFRCxDQUFDLEtBQUs7TUFDM0IsSUFBSXFDLElBQUksR0FBR3BDLEVBQUUsQ0FBQ2dDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztNQUMzQyxJQUFJLENBQUMzRCxFQUFFLENBQUNPLEVBQUUsQ0FBQ3dELElBQUksRUFBRTtRQUNmQyxRQUFRLEVBQUUsR0FBRztRQUNidEQsUUFBUSxFQUFFLEdBQUc7UUFDYkMsSUFBSSxFQUFFO01BQ1IsQ0FBQyxFQUFFLE9BQU8sQ0FBQztJQUNiLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ1gsRUFBRSxDQUFDTyxFQUFFLENBQUNxRCxnQkFBZ0IsRUFBRTtNQUMzQnBELE9BQU8sRUFBRSxDQUFDO01BQ1ZFLFFBQVEsRUFBRSxHQUFHO01BQ2JDLElBQUksRUFBRSxZQUFZO01BQ2xCd0QsVUFBVSxFQUFFQSxDQUFBLEtBQU07UUFDaEJQLGdCQUFnQixDQUFDTSxNQUFNLENBQUMsQ0FBQztNQUMzQjtJQUNGLENBQUMsRUFBRSxPQUFPLENBQUM7SUFFWCxJQUFJLENBQUNsRSxFQUFFLENBQUNpRSxHQUFHLENBQUMsTUFBTTtNQUNoQnhFLElBQUksQ0FBQ3lFLE1BQU0sQ0FBQyxDQUFDO01BQ2JHLE1BQU0sQ0FBQ00sU0FBUyxDQUFDVCxNQUFNLENBQUMscUJBQXFCLENBQUM7TUFFOUN4RiwyQ0FBSSxDQUFDa0UsSUFBSSxDQUFDZ0MsS0FBSyxFQUFFO1FBQ2ZsRSxRQUFRLEVBQUUsR0FBRztRQUNiQyxJQUFJLEVBQUUsTUFBTTtRQUNabUUsUUFBUSxFQUFFO01BQ1osQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDOUUsRUFBRSxDQUFDaUUsR0FBRyxDQUFDLE1BQU07TUFDaEIsT0FBT1QsT0FBTyxDQUFDQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7RUFFSjtFQUVBLE1BQU11QixjQUFjQSxDQUFDN0MsSUFBSSxFQUFFOEMsR0FBRyxFQUFFO0lBQzlCLElBQUksQ0FBQ2pGLEVBQUUsQ0FBQ2tGLEtBQUssQ0FBQyxDQUFDO0lBQ2YsTUFBTUMsV0FBVyxHQUFHLElBQUksQ0FBQy9FLFlBQVksQ0FBQyxDQUFDO0lBQ3ZDLE1BQU1nRixZQUFZLEdBQUcsSUFBSUMsR0FBRyxDQUFDSixHQUFHLEVBQUVLLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDLENBQUNDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDcEQsTUFBTSxDQUFDcUQsT0FBTyxDQUFDO0lBQ3RGLE1BQU1DLFFBQVEsR0FBR1AsWUFBWSxDQUFDNUQsTUFBTSxLQUFLLENBQUMsR0FBRyxNQUFNLEdBQUcsUUFBUTtJQUU5RCxJQUFJMkQsV0FBVyxLQUFLLE1BQU0sSUFBSVEsUUFBUSxLQUFLLFFBQVEsRUFBRTtNQUNuRDtNQUNBLE1BQU0sSUFBSSxDQUFDdkIsc0JBQXNCLENBQUNqQyxJQUFJLENBQUM7SUFDekMsQ0FBQyxNQUFNLElBQUlnRCxXQUFXLEtBQUssUUFBUSxJQUFJUSxRQUFRLEtBQUssUUFBUSxFQUFFO01BQzVEO01BQ0EsTUFBTSxJQUFJLENBQUNwQyx3QkFBd0IsQ0FBQ3BCLElBQUksQ0FBQztJQUMzQyxDQUFDLE1BQU0sSUFBSWdELFdBQVcsS0FBSyxRQUFRLElBQUlRLFFBQVEsS0FBSyxNQUFNLEVBQUU7TUFDMUQ7TUFDQSxNQUFNLElBQUksQ0FBQ1osc0JBQXNCLENBQUMsQ0FBQztJQUNyQztFQUNGO0VBR0EsTUFBTWEsZ0JBQWdCQSxDQUFDWCxHQUFHLEVBQUU7SUFBRVksWUFBWSxHQUFHO0VBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQ3pELElBQUk7TUFDRjtNQUNBLE1BQU1WLFdBQVcsR0FBRyxJQUFJLENBQUMvRSxZQUFZLENBQUMsQ0FBQztNQUN2QyxNQUFNZ0YsWUFBWSxHQUFHLElBQUlDLEdBQUcsQ0FBQ0osR0FBRyxFQUFFSyxRQUFRLENBQUNDLE1BQU0sQ0FBQyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ3BELE1BQU0sQ0FBQ3FELE9BQU8sQ0FBQztNQUN0RixNQUFNQyxRQUFRLEdBQUdQLFlBQVksQ0FBQzVELE1BQU0sS0FBSyxDQUFDLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDOztNQUVoRSxNQUFNc0UsR0FBRyxHQUFHLE1BQU1DLEtBQUssQ0FBQ2QsR0FBRyxDQUFDO01BQzVCLE1BQU1lLElBQUksR0FBRyxNQUFNRixHQUFHLENBQUNHLElBQUksQ0FBQyxDQUFDO01BQzdCLE1BQU1DLE1BQU0sR0FBRyxJQUFJQyxTQUFTLENBQUMsQ0FBQztNQUM5QixNQUFNQyxHQUFHLEdBQUdGLE1BQU0sQ0FBQ0csZUFBZSxDQUFDTCxJQUFJLEVBQUUsV0FBVyxDQUFDO01BQ3JELE1BQU10RyxTQUFTLEdBQUcsSUFBSSxDQUFDVCxRQUFRLENBQUNTLFNBQVM7TUFDekMsTUFBTTRHLFdBQVcsR0FBRzVHLFNBQVMsQ0FBQzZHLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQztNQUMzRSxNQUFNQyxPQUFPLEdBQUdKLEdBQUcsQ0FBQ0csYUFBYSxDQUFDLGFBQWEsQ0FBQztNQUNoRCxNQUFNaEgsU0FBUyxHQUFHNkcsR0FBRyxDQUFDRyxhQUFhLENBQUMsbUJBQW1CLENBQUM7TUFDeEQsTUFBTUUsV0FBVyxHQUFHdkQsUUFBUSxDQUFDcUQsYUFBYSxDQUFDLCtCQUErQixDQUFDO01BQzNFLE1BQU1HLFdBQVcsR0FBR04sR0FBRyxDQUFDekMsZ0JBQWdCLENBQUMsaURBQWlELENBQUM7TUFDM0YsTUFBTWdELG1CQUFtQixHQUFHUCxHQUFHLENBQUNHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztNQUVsRSxJQUFJcEIsV0FBVyxLQUFLLE1BQU0sSUFBSVEsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUVuRCxJQUFJYSxPQUFPLEVBQUU7VUFDWGpJLDRDQUFJLENBQUNrRCxHQUFHLENBQUMrRSxPQUFPLEVBQUU7WUFBRWhHLE9BQU8sRUFBRSxDQUFDO1lBQUVDLGFBQWEsRUFBRTtVQUFPLENBQUMsQ0FBQztVQUN4RDZGLFdBQVcsQ0FBQ00sV0FBVyxDQUFDSixPQUFPLENBQUM7UUFDbEM7TUFFRixDQUFDLE1BQU0sSUFBSXJCLFdBQVcsS0FBSyxRQUFRLElBQUlRLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDNUQsTUFBTWtCLGFBQWEsR0FBRzNELFFBQVEsQ0FBQ3FELGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztRQUV0RWhJLDRDQUFJLENBQUNrRCxHQUFHLENBQUNsQyxTQUFTLEVBQUU7VUFBRWlCLE9BQU8sRUFBRSxDQUFDO1VBQUVDLGFBQWEsRUFBRTtRQUFPLENBQUMsQ0FBQztRQUUxRG9HLGFBQWEsQ0FBQ0MsT0FBTyxDQUFDdkgsU0FBUyxDQUFDO1FBRWhDbUgsV0FBVyxDQUFDeEUsT0FBTyxDQUFDUCxFQUFFLElBQUk7VUFDeEJwRCw0Q0FBSSxDQUFDa0QsR0FBRyxDQUFDRSxFQUFFLEVBQUU7WUFBRW5CLE9BQU8sRUFBRSxDQUFDO1lBQUVDLGFBQWEsRUFBRTtVQUFPLENBQUMsQ0FBQztVQUNuRGdHLFdBQVcsQ0FBQ0csV0FBVyxDQUFDakYsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQzs7UUFFRjtNQUVGLENBQUMsTUFBTSxJQUFJd0QsV0FBVyxLQUFLLFFBQVEsSUFBSVEsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUMxRHBILDRDQUFJLENBQUNrRCxHQUFHLENBQUMrRSxPQUFPLEVBQUU7VUFBRWhHLE9BQU8sRUFBRTtRQUFFLENBQUMsQ0FBQztRQUNqQzhGLFdBQVcsQ0FBQ1EsT0FBTyxDQUFDTixPQUFPLENBQUM7TUFDOUI7TUFFQSxJQUFJRyxtQkFBbUIsRUFBRTtRQUN2QixNQUFNSSxRQUFRLEdBQUdKLG1CQUFtQixDQUFDaEQsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUM7UUFFL0VwRiw0Q0FBSSxDQUFDa0QsR0FBRyxDQUFDc0YsUUFBUSxFQUFFO1VBQUV2RyxPQUFPLEVBQUUsQ0FBQztVQUFFd0csVUFBVSxFQUFFO1FBQVMsQ0FBQyxDQUFDO1FBRXhEekksNENBQUksQ0FBQ2tELEdBQUcsQ0FBQ2tGLG1CQUFtQixFQUFFO1VBQzVCbkcsT0FBTyxFQUFFLENBQUM7VUFDVkMsYUFBYSxFQUFFLE1BQU07VUFDckJ1RyxVQUFVLEVBQUU7UUFDZCxDQUFDLENBQUM7UUFFRlYsV0FBVyxDQUFDTSxXQUFXLENBQUNELG1CQUFtQixDQUFDO01BQzlDOztNQUVBO01BQ0EsSUFBSSxDQUFDMUgsUUFBUSxDQUFDRSxjQUFjLEdBQUcrRCxRQUFRLENBQUNTLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDO01BQ2xGLElBQUksQ0FBQzFFLFFBQVEsQ0FBQ0ksYUFBYSxHQUFHNkQsUUFBUSxDQUFDUyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztNQUMvRSxJQUFJLENBQUMxRSxRQUFRLENBQUNLLFdBQVcsR0FBRzRELFFBQVEsQ0FBQ1MsZ0JBQWdCLENBQUMseUJBQXlCLENBQUM7TUFDaEYsSUFBSSxDQUFDMUUsUUFBUSxDQUFDTSxTQUFTLEdBQUcyRCxRQUFRLENBQUNxRCxhQUFhLENBQUMsbUJBQW1CLENBQUM7TUFDckUsSUFBSSxDQUFDdEgsUUFBUSxDQUFDQyxTQUFTLEdBQUdnRSxRQUFRLENBQUNxRCxhQUFhLENBQUMsbUJBQW1CLENBQUM7TUFFckUsSUFBSSxDQUFDVSxpQkFBaUIsQ0FBQyxDQUFDO01BQ3hCLElBQUksQ0FBQ0MscUJBQXFCLENBQUMsQ0FBQztNQUM1QixJQUFJLENBQUNDLGtCQUFrQixDQUFDLENBQUM7TUFFekIsSUFBSXRCLFlBQVksRUFBRTtRQUNoQnVCLE9BQU8sQ0FBQ3ZCLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUVaLEdBQUcsQ0FBQztNQUNuQyxDQUFDLE1BQU07UUFDTG1DLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRXBDLEdBQUcsQ0FBQztNQUNoQztNQUVBLE9BQU8sSUFBSTtJQUViLENBQUMsQ0FBQyxPQUFPcUMsR0FBRyxFQUFFO01BQ1p6RCxPQUFPLENBQUMwRCxLQUFLLENBQUMsNEJBQTRCLEVBQUVELEdBQUcsQ0FBQztNQUNoRCxPQUFPLEtBQUs7SUFDZDtFQUNGO0VBRUFFLHVCQUF1QkEsQ0FBQSxFQUFHO0lBQ3hCLE9BQU8sSUFBSWhFLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO01BQzlCLE1BQU0wQixXQUFXLEdBQUcsSUFBSSxDQUFDL0UsWUFBWSxDQUFDLENBQUM7O01BRXZDLE1BQU1YLElBQUksR0FBR3lELFFBQVEsQ0FBQ3FELGFBQWEsQ0FBQyxhQUFhLENBQUM7TUFDbEQsTUFBTWtCLFlBQVksR0FBRyxJQUFJLENBQUN4SSxRQUFRLENBQUNDLFNBQVM7TUFDNUMsTUFBTXdJLE9BQU8sR0FBR2pJLElBQUksQ0FBQ2tFLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO01BQzFELE1BQU1nRSxLQUFLLEdBQUdoRixLQUFLLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUMzRCxRQUFRLENBQUNFLGNBQWMsQ0FBQztNQUV0RCxJQUFJeUksU0FBUyxHQUFHLEVBQUU7TUFFbEIsSUFBSSxDQUFDNUgsRUFBRSxDQUFDTyxFQUFFLENBQUNkLElBQUksRUFBRTtRQUNmZSxPQUFPLEVBQUUsQ0FBQztRQUNWcUgsVUFBVSxFQUFFO01BQ2QsQ0FBQyxDQUFDO01BRUZILE9BQU8sQ0FBQ3hGLE9BQU8sQ0FBRVAsRUFBRSxJQUFLO1FBQ3RCLE1BQU04RCxLQUFLLEdBQUc1RyxxREFBUyxDQUFDZ0IsTUFBTSxDQUFDOEIsRUFBRSxFQUNqQztVQUNFbUcsSUFBSSxFQUFFLE9BQU87VUFDYkMsU0FBUyxFQUFFLE1BQU07VUFDakJDLElBQUksRUFBRSxPQUFPO1VBQ2JDLFNBQVMsRUFBRTtRQUNiLENBQUMsQ0FBQztRQUNGMUosNENBQUksQ0FBQ2tELEdBQUcsQ0FBQ0UsRUFBRSxFQUFFO1VBQUVuQixPQUFPLEVBQUUsQ0FBQztVQUFFcUgsVUFBVSxFQUFFO1FBQWdCLENBQUMsQ0FBQztRQUV6REQsU0FBUyxDQUFDTSxJQUFJLENBQUN6QyxLQUFLLENBQUMwQyxLQUFLLENBQUM7TUFDN0IsQ0FBQyxDQUFDO01BRUZQLFNBQVMsQ0FBQzFGLE9BQU8sQ0FBRStELElBQUksSUFBSztRQUMxQixJQUFJLENBQUNqRyxFQUFFLENBQUNnQyxNQUFNLENBQUNpRSxJQUFJLEVBQ2pCO1VBQUVqQyxRQUFRLEVBQUU7UUFBSSxDQUFDLEVBQ2pCO1VBQ0VBLFFBQVEsRUFBRSxDQUFDO1VBQ1h0RCxRQUFRLEVBQUUsR0FBRztVQUNiQyxJQUFJLEVBQUUsTUFBTTtVQUNaQyxPQUFPLEVBQUU7UUFDWCxDQUFDLEVBQ0YsY0FBYyxDQUFDO01BQ2xCLENBQUMsQ0FBQztNQUVGLElBQUl1RSxXQUFXLEtBQUssUUFBUSxFQUFFO1FBQzVCc0MsWUFBWSxDQUFDckUsS0FBSyxDQUFDNEQsVUFBVSxHQUFHLFNBQVM7UUFDekNXLEtBQUssQ0FBQ3pGLE9BQU8sQ0FBQ1IsQ0FBQyxJQUFJQSxDQUFDLENBQUMwQixLQUFLLENBQUM0RCxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRWxELElBQUksQ0FBQ2hILEVBQUUsQ0FBQ2lFLEdBQUcsQ0FBQyxNQUFNO1VBQ2hCLElBQUksQ0FBQ2pCLFVBQVUsQ0FBQyxLQUFLLENBQUM7VUFDdEJTLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDOztRQUVGO1FBQ0E7O1FBR0UsSUFBSSxDQUFDekQsRUFBRSxDQUFDTyxFQUFFLENBQUNvSCxLQUFLLEVBQ2hCO1VBQ0VuSCxPQUFPLEVBQUUsQ0FBQztVQUNWQyxhQUFhLEVBQUUsTUFBTTtVQUNyQkMsUUFBUSxFQUFFLEdBQUc7VUFDYkMsSUFBSSxFQUFFLFlBQVk7VUFDbEJDLE9BQU8sRUFBRTtRQUNYLENBQUMsRUFBRSxPQUFPLENBQUM7TUFHZixDQUFDLE1BQU07UUFDTCxJQUFJLENBQUNaLEVBQUUsQ0FBQ2lFLEdBQUcsQ0FBQyxNQUFNO1VBQ2hCUixPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQztNQUNKO0lBQ0YsQ0FBQyxDQUFDO0VBQ0o7RUFFQTBELGtCQUFrQkEsQ0FBQ3hCLFFBQVEsRUFBRTtJQUMzQixJQUFJLENBQUNBLFFBQVEsRUFBRTtJQUVmLElBQUlBLFFBQVEsS0FBSyxNQUFNLEVBQUU7TUFDdkIsSUFBSSxDQUFDMUcsUUFBUSxDQUFDVSxhQUFhLENBQUNpQyxPQUFPLENBQUN3RyxZQUFZLEdBQUcsUUFBUTtNQUMzRCxJQUFJLENBQUNuSixRQUFRLENBQUNTLFNBQVMsQ0FBQ2lGLFNBQVMsQ0FBQ1QsTUFBTSxDQUFDLGFBQWEsQ0FBQztNQUN2RCxJQUFJLENBQUNqRixRQUFRLENBQUNTLFNBQVMsQ0FBQ2lGLFNBQVMsQ0FBQ1YsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUV0RCxDQUFDLE1BQU0sSUFBSTBCLFFBQVEsS0FBSyxRQUFRLEVBQUc7TUFDakMsSUFBSSxDQUFDMUcsUUFBUSxDQUFDVSxhQUFhLENBQUNpQyxPQUFPLENBQUN3RyxZQUFZLEdBQUcsTUFBTTtNQUN6RCxJQUFJLENBQUNuSixRQUFRLENBQUNTLFNBQVMsQ0FBQ2lGLFNBQVMsQ0FBQ1QsTUFBTSxDQUFDLGFBQWEsQ0FBQztNQUN2RCxJQUFJLENBQUNqRixRQUFRLENBQUNTLFNBQVMsQ0FBQ2lGLFNBQVMsQ0FBQ1YsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUN0RDtFQUNGO0VBRUEsSUFBSTdELFlBQVlBLENBQUEsRUFBRztJQUNqQixJQUFJaUksU0FBUyxHQUFHLElBQUksQ0FBQ3BKLFFBQVEsQ0FBQ1UsYUFBYSxDQUFDaUMsT0FBTyxDQUFDd0csWUFBWTtJQUNoRSxPQUFPQyxTQUFTO0VBQ2xCO0VBRUFuQixxQkFBcUJBLENBQUEsRUFBRztJQUN0QixNQUFNM0YsS0FBSyxHQUFHb0IsS0FBSyxDQUFDQyxJQUFJLENBQUNNLFFBQVEsQ0FBQ1MsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFcEZwQyxLQUFLLENBQUNXLE9BQU8sQ0FBQ0MsSUFBSSxJQUFJO01BQ3BCQSxJQUFJLENBQUNLLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFPOEYsQ0FBQyxJQUFLO1FBQzFDQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU10RCxHQUFHLEdBQUc5QyxJQUFJLENBQUNxRyxJQUFJO1FBRXJCLE1BQU0sSUFBSSxDQUFDeEQsY0FBYyxDQUFDN0MsSUFBSSxFQUFFOEMsR0FBRyxDQUFDO1FBRXBDLElBQUcsTUFBTSxJQUFJLENBQUNXLGdCQUFnQixDQUFDWCxHQUFHLENBQUMsRUFBRTtVQUNuQyxNQUFNLElBQUksQ0FBQ3VDLHVCQUF1QixDQUFDLENBQUMsRUFBQztRQUN2QztNQUVGLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKO0VBRUFpQixTQUFTQSxDQUFBLEVBQUc7SUFDVmxLLDRDQUFJLENBQUNrRCxHQUFHLENBQUMsSUFBSSxDQUFDeEMsUUFBUSxDQUFDSSxhQUFhLEVBQUU7TUFBRW1CLE9BQU8sRUFBRTtJQUFFLENBQUMsQ0FBQztFQUN2RDtFQUVBa0ksVUFBVUEsQ0FBQSxFQUFHO0lBQ1gsSUFBRyxJQUFJLENBQUN6SixRQUFRLENBQUNFLGNBQWMsRUFBRTtNQUMvQlosNENBQUksQ0FBQ2tELEdBQUcsQ0FBQyxJQUFJLENBQUN4QyxRQUFRLENBQUNFLGNBQWMsRUFBRTtRQUFFcUIsT0FBTyxFQUFFLENBQUM7UUFBRUMsYUFBYSxFQUFFO01BQU8sQ0FBQyxDQUFDO0lBQy9FO0VBQ0Y7RUFFQXdHLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUNoSSxRQUFRLENBQUNFLGNBQWMsRUFBRTtJQUNuQyxNQUFNd0ksS0FBSyxHQUFHLElBQUksQ0FBQzFJLFFBQVEsQ0FBQ0UsY0FBYyxDQUFDcUMsTUFBTSxLQUFLbUgsU0FBUyxHQUMzRGhHLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQzNELFFBQVEsQ0FBQ0UsY0FBYyxDQUFDLEdBQ3hDLENBQUMsSUFBSSxDQUFDRixRQUFRLENBQUNFLGNBQWMsQ0FBQztJQUVsQ3dJLEtBQUssQ0FBQ3pGLE9BQU8sQ0FBQzBHLE9BQU8sSUFBSTtNQUN2QixJQUFJQyxFQUFFLEdBQUdELE9BQU8sQ0FBQ3JDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztNQUN0RCxJQUFJdUMsUUFBUSxHQUFHRixPQUFPLENBQUNyQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7TUFFN0RxQyxPQUFPLENBQUNwRyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTTtRQUMzQ29HLE9BQU8sQ0FBQ2pFLFNBQVMsQ0FBQ1YsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUNuRSxRQUFRLENBQUNpSixXQUFXLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUNqSixRQUFRLENBQUNrSixJQUFJLENBQUMsQ0FBQztRQUNwQnpLLDRDQUFJLENBQUNnQyxFQUFFLENBQUNzSSxFQUFFLEVBQUU7VUFBRUksUUFBUSxFQUFFLDZDQUE2QztVQUFFdkksUUFBUSxFQUFFLEdBQUc7VUFBRUMsSUFBSSxFQUFFO1FBQU8sQ0FBQyxDQUFDO1FBQ3JHcEMsNENBQUksQ0FBQ2dDLEVBQUUsQ0FBQ3VJLFFBQVEsRUFBRTtVQUFFRyxRQUFRLEVBQUUsNkNBQTZDO1VBQUV2SSxRQUFRLEVBQUUsR0FBRztVQUFFQyxJQUFJLEVBQUU7UUFBTyxDQUFDLENBQUM7TUFDN0csQ0FBQyxDQUFDO01BRUZpSSxPQUFPLENBQUNwRyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTTtRQUMzQ29HLE9BQU8sQ0FBQ2pFLFNBQVMsQ0FBQ1QsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNsQzNGLDRDQUFJLENBQUNnQyxFQUFFLENBQUNzSSxFQUFFLEVBQUU7VUFBRUksUUFBUSxFQUFFLGlEQUFpRDtVQUFFdkksUUFBUSxFQUFFLEdBQUc7VUFBRUMsSUFBSSxFQUFFO1FBQU8sQ0FBQyxDQUFDO1FBQ3pHcEMsNENBQUksQ0FBQ2dDLEVBQUUsQ0FBQ3VJLFFBQVEsRUFBRTtVQUFFRyxRQUFRLEVBQUUsaURBQWlEO1VBQUV2SSxRQUFRLEVBQUUsR0FBRztVQUFFQyxJQUFJLEVBQUU7UUFBTyxDQUFDLENBQUM7TUFDakgsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0o7RUFFQVQsSUFBSUEsQ0FBQSxFQUFHO0lBQ0wsSUFBSSxDQUFDK0csaUJBQWlCLENBQUMsQ0FBQztJQUN4QixJQUFJLENBQUNDLHFCQUFxQixDQUFDLENBQUM7SUFDNUIsSUFBSSxDQUFDdUIsU0FBUyxDQUFDLENBQUM7SUFDaEIsSUFBSSxDQUFDQyxVQUFVLENBQUMsQ0FBQztJQUVqQm5HLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUMsWUFBWSxFQUFHOEYsQ0FBQyxJQUFLO01BQzNDLElBQUlBLENBQUMsQ0FBQ1ksTUFBTSxDQUFDQyxRQUFRLEtBQUssV0FBVyxFQUFFO1FBQ3JDLElBQUksQ0FBQ2hKLGNBQWMsQ0FBQyxDQUFDO01BQ3ZCO0lBQ0YsQ0FBQyxDQUFDO0lBRUZvQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxZQUFZO01BQzlDLE1BQU15QyxHQUFHLEdBQUcxQyxNQUFNLENBQUMrQyxRQUFRLENBQUNrRCxJQUFJO01BQ2hDO01BQ0EsTUFBTSxJQUFJLENBQUN4RCxjQUFjLENBQUMsSUFBSSxFQUFFQyxHQUFHLENBQUM7TUFDcEMsTUFBTSxJQUFJLENBQUNXLGdCQUFnQixDQUFDWCxHQUFHLEVBQUU7UUFBRVksWUFBWSxFQUFFO01BQUssQ0FBQyxDQUFDO01BQ3hELE1BQU0sSUFBSSxDQUFDMkIsdUJBQXVCLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7RUFDSjtBQUNGLEM7Ozs7Ozs7O1VDMWhCQSxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL3Jvb20xODcvLi9hcHAvcGFnZXMvUGxheWxpc3RzL2luZGV4LmpzIiwid2VicGFjazovL3Jvb20xODcvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlIGZyb20gJ2NsYXNzZXMvUGFnZSdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSAnZ3NhcC9TY3JvbGxUcmlnZ2VyJ1xuaW1wb3J0IHsgQ3VzdG9tRWFzZSB9IGZyb20gJ2dzYXAvQ3VzdG9tRWFzZSdcbmltcG9ydCB7IEZsaXAgfSBmcm9tICdnc2FwL0ZsaXAnXG5pbXBvcnQgeyBzY3JvbGwgfSBmcm9tICd1dGlscy9MZW5pc1Njcm9sbCdcbmltcG9ydCB7IFNjcm9sbFRvUGx1Z2luIH0gZnJvbSAnZ3NhcC9TY3JvbGxUb1BsdWdpbidcbmltcG9ydCB7IFNwbGl0VGV4dCB9IGZyb20gJ2dzYXAvU3BsaXRUZXh0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5bGlzdHMgZXh0ZW5kcyBQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgaWQ6ICdwbGF5bGlzdHMnLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgdHJhY2tMaXN0OiAnW2RhdGEtdHJhY2stbGlzdF0nLCBcbiAgICAgICAgdHJhY2tMaXN0SXRlbXM6ICdbZGF0YS10cmFjay1saXN0LWl0ZW1dJyxcbiAgICAgICAgcGxheWxpc3RHcm91cDogJ1tkYXRhLXBsYXlsaXN0LWdyb3VwXScsXG4gICAgICAgIHBsYXlsaXN0Q2FyZHM6ICdbZGF0YS1wbGF5bGlzdC1jYXJkXScsXG4gICAgICAgIHBhZ2VUcmlnZ2VyOiAnW2RhdGEtcGxheWxpc3QtdHJpZ2dlcl0nLFxuICAgICAgICBtYWluVGl0bGU6ICdbZGF0YS1tYWluLXRpdGxlXScsXG4gICAgICAgIHBsYXlsaXN0Q2FyZE1ldGE6ICdbZGF0YS1wbGF5bGlzdC1tZXRhXScsIFxuICAgICAgICBoZXJvOiAnW2RhdGEtaGVyb10nLFxuICAgICAgICBjb250YWluZXI6ICdbZGF0YS1pbm5lci1jb250ZW50XScsXG4gICAgICAgIHBhZ2VDb250YWluZXI6ICdbZGF0YS1wYWdlLXZpZXctdHlwZV0nXG4gICAgICB9XG4gICAgfSlcblxuICAgIGdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlciwgQ3VzdG9tRWFzZSwgRmxpcCwgU2Nyb2xsVG9QbHVnaW4sIFNwbGl0VGV4dClcbiAgICBDdXN0b21FYXNlLmNyZWF0ZSgnem9vbScsICcwLjcxLCAwLCAwLjA2LCAxJylcblxuICAgIHRoaXMuY2xpY2tFZnggPSBuZXcgQXVkaW8oJy9jbGljay5tcDMnKVxuICAgIHRoaXMuc2Nyb2xsID0gc2Nyb2xsXG4gICAgdGhpcy50bCA9IGdzYXAudGltZWxpbmUoKVxuXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGxvYWRBbmltYXRpb25zKCkge1xuICAgIGlmICh0aGlzLnZpZXdQYWdlVHlwZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUNhcmRzSW5WaWV3KClcbiAgICAgIHRoaXMuc2Nyb2xsQ2FyZEFuaW1hdGlvbnMoKVxuICAgIH0gZWxzZSB7XG4gICAgICBnc2FwLnRvKHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMsXG4gICAgICAgIHsgXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiBcImF1dG9cIiwgXG4gICAgICAgICAgZHVyYXRpb246IDAuNCwgXG4gICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsIFxuICAgICAgICAgIHN0YWdnZXI6IDAuMDUgXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICB1cGRhdGVJbmRpY2F0b3IodGFyZ2V0RWwpIHtcbiAgICBsZXQgcGxheWxpc3RTY3JvbGwgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0R3JvdXBcbiAgICBpZiAoIXBsYXlsaXN0U2Nyb2xsKSByZXR1cm5cbiAgICBcbiAgICBjb25zdCBzY3JvbGxSZWN0ID0gcGxheWxpc3RTY3JvbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBjb25zdCB0YXJnZXRSZWN0ID0gdGFyZ2V0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIC8vIEhvdyBmYXIgdGhlIGNhcmQgaXMgZnJvbSB0aGUgbGVmdCBlZGdlIG9mIHRoZSBzY3JvbGwgY29udGFpbmVyXG4gICAgY29uc3QgZGVsdGFYID0gdGFyZ2V0UmVjdC5sZWZ0IC0gc2Nyb2xsUmVjdC5sZWZ0XG4gICAgY29uc3QgdGFyZ2V0WCA9IC1kZWx0YVhcbiAgICBcbiAgICBnc2FwLnRvKHBsYXlsaXN0U2Nyb2xsLCB7XG4gICAgICB4OiB0YXJnZXRYLFxuICAgICAgZHVyYXRpb246IDAuNCxcbiAgICAgIGVhc2U6IFwicG93ZXIzLm91dFwiXG4gICAgfSlcbiAgfVxuXG4gIHNjcm9sbENhcmRBbmltYXRpb25zKCkge1xuICAgIGNvbnN0IGNhcmRzID0gdGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzO1xuICAgIGlmICghY2FyZHMgfHwgIWNhcmRzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgLy8gb25seSBoaWRlIGNhcmRzIHRoYXQgaGF2ZSBOT1QgYmVlbiBhbmltYXRlZFxuICAgIGdzYXAuc2V0KGNhcmRzLCB7IG9wYWNpdHk6IChpLCBlbCkgPT4gZWwuZGF0YXNldC5hbmltYXRlZCA9PT0gXCJ0cnVlXCIgPyAxIDogMCB9KTtcbiAgICAvL2dzYXAuc2V0KGNhcmRzLCB7IG9wYWNpdHk6IDAgfSk7IC8vIHN0YXJ0IGFsbCBjYXJkcyBpbnZpc2libGVcblxuICAgIGNvbnN0IGFuaW1hdGVCYXRjaCA9IChiYXRjaCkgPT4ge1xuICAgICAgZ3NhcC5mcm9tVG8oYmF0Y2gsXG4gICAgICAgIHsgb3BhY2l0eTogMCB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICAgIHN0YWdnZXI6IDAuMTUsXG4gICAgICAgICAgb25TdGFydDogKCkgPT4ge1xuICAgICAgICAgICAgYmF0Y2guZm9yRWFjaChjYXJkID0+IGNhcmQuZGF0YXNldC5hbmltYXRlZCA9IFwidHJ1ZVwiKTsgLy8gbWFyayBhcyBhbmltYXRlZFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgU2Nyb2xsVHJpZ2dlci5iYXRjaChjYXJkcywge1xuICAgICAgb25FbnRlcjogKGJhdGNoKSA9PiB7XG4gICAgICAgIGJhdGNoID0gYmF0Y2guZmlsdGVyKGNhcmQgPT4gY2FyZC5kYXRhc2V0LmFuaW1hdGVkICE9PSBcInRydWVcIik7XG4gICAgICAgIGlmIChiYXRjaC5sZW5ndGgpIGFuaW1hdGVCYXRjaChiYXRjaCk7XG4gICAgICB9LFxuICAgICAgc3RhcnQ6IFwidG9wIDgwJVwiLFxuICAgIH0pO1xuXG4gICAgLy8gUmVmcmVzaCBTY3JvbGxUcmlnZ2VyIG9uIHJlc2l6ZSB0byBwcmV2ZW50IGdsaXRjaGVzXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgYW5pbWF0ZUNhcmRzSW5WaWV3KCkge1xuICAgIGNvbnN0IGNhcmRzID0gdGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzO1xuICAgIGlmICghY2FyZHMgfHwgIWNhcmRzLmxlbmd0aCB8fCB0aGlzLnZpZXdQYWdlVHlwZSAhPT0gXCJncmlkXCIgKSByZXR1cm47XG5cbiAgICBjb25zdCBpblZpZXdDYXJkcyA9IEFycmF5LmZyb20oY2FyZHMpLmZpbHRlcihjYXJkID0+IHtcbiAgICAgIGNvbnN0IHJlY3QgPSBjYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcmV0dXJuIHJlY3QudG9wIDwgd2luZG93LmlubmVySGVpZ2h0ICogMC45NSAmJiBjYXJkLmRhdGFzZXQuYW5pbWF0ZWQgIT09IFwidHJ1ZVwiO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpblZpZXdDYXJkcy5sZW5ndGgpIHJldHVybjtcblxuICAgIGdzYXAuZnJvbVRvKGluVmlld0NhcmRzLFxuICAgICAgeyBvcGFjaXR5OiAwIH0sXG4gICAgICB7XG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICBzdGFnZ2VyOiAwLjE1LFxuICAgICAgICBvblN0YXJ0OiAoKSA9PiBpblZpZXdDYXJkcy5mb3JFYWNoKGNhcmQgPT4gY2FyZC5kYXRhc2V0LmFuaW1hdGVkID0gXCJ0cnVlXCIpXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGxvY2tTY3JvbGwobG9jayA9IHRydWUpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gbG9jayA/ICdoaWRkZW4nIDogJydcbiAgICBsb2NrPyB0aGlzLnNjcm9sbC5zdG9wKCkgOiB0aGlzLnNjcm9sbC5zdGFydCgpXG4gIH1cblxuICBkZXRhaWxUb0RldGFpbFRyYW5zaXRpb24oY2FyZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVJbmRpY2F0b3IoY2FyZClcbiAgICAgIGNvbnN0IHNwbGl0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwbGl0LXRleHRdJylcbiAgICAgIGNvbnN0IHRyYWNrTGlzdFNlY3Rpb24gPSB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdFxuXG4gICAgICBjb25zb2xlLmxvZyh0cmFja0xpc3RTZWN0aW9uKVxuXG4gICAgICBzcGxpdFRleHQuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgICAgbGV0IGRpdnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYgPiBkaXYnKVxuICAgICAgICB0aGlzLnRsLnRvKGRpdnMsIHsgXG4gICAgICAgICAgeVBlcmNlbnQ6IDEwMCwgXG4gICAgICAgICAgZHVyYXRpb246IDAuNiwgXG4gICAgICAgICAgZWFzZTogJ3pvb20nXG4gICAgICAgIH0sICdncm91cCcpXG5cbiAgICAgICAgdGhpcy50bC5hZGQoKCkgPT4gZWwucmVtb3ZlKCksICdncm91cCs9MC42JylcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMudGwudG8odHJhY2tMaXN0U2VjdGlvbiwgeyBcbiAgICAgICAgb3BhY2l0eTogMCwgXG4gICAgICAgIGR1cmF0aW9uOiAwLjQsIFxuICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsIFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgdHJhY2tMaXN0U2VjdGlvbi5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgJ2dyb3VwJylcblxuICAgICAgdGhpcy50bC5hZGQocmVzb2x2ZSwgJz4nKVxuICAgIH0pXG5cbiAgfVxuXG4gIGdyaWRUb0RldGFpbFRyYW5zaXRpb24oKSB7XG4gICAgY29uc3QgZ3JpZEVsID0gdGhpcy5lbGVtZW50cy5wbGF5bGlzdEdyb3VwXG4gICAgY29uc3QgY2FyZHMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkcyB8fCBbXSlcbiAgICBjb25zdCBtYWluVGl0bGVTZWN0aW9uID0gdGhpcy5lbGVtZW50cy5oZXJvXG4gICAgY29uc3QgbWV0YSA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkTWV0YVxuICAgIGNvbnN0IG1haW5UaXRsZU1hc2sgPSB0aGlzLmVsZW1lbnRzLm1haW5UaXRsZS5xdWVyeVNlbGVjdG9yQWxsKCdkaXYgPiBkaXYnKVxuXG4gICAgaWYgKCFncmlkRWwgfHwgIWNhcmRzLmxlbmd0aCApIHJldHVybiBQcm9taXNlLnJlc29sdmUoKSBcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5sb2NrU2Nyb2xsKHRydWUpXG5cbiAgICAgIGNhcmRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAoZWwuZGF0YXNldC5hbmltYXRlZCAhPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICBnc2FwLnNldChlbCwgeyBvcGFjaXR5OiAxIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHRoaXMudGwudG8obWV0YSwgeyBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC40LCBlYXNlOiBcInBvd2VyMi5vdXRcIn0pXG4gICAgICBcbiAgICAgIHRoaXMudGwudG8od2luZG93LCB7XG4gICAgICAgIHNjcm9sbFRvOiB7IHk6IDAgfSxcbiAgICAgICAgZHVyYXRpb246IDAuOCxcbiAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnXG4gICAgICB9KVxuXG4gICAgICB0aGlzLnRsLnRvKG1haW5UaXRsZU1hc2ssIFxuICAgICAgICB7IFxuICAgICAgICAgIHlQZXJjZW50OiAxMDAsXG4gICAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgICBlYXNlOiAnem9vbScsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1haW5UaXRsZVNlY3Rpb24pIG1haW5UaXRsZVNlY3Rpb24ucmVtb3ZlKClcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVyby0tbC1wLXQnKVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGVyby0tcy1wLXQnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IEZsaXAuZ2V0U3RhdGUoY2FyZHMsIHsgYWJzb2x1dGU6IHRydWUgfSlcblxuICAgICAgICAgICAgZ3JpZEVsLmNsYXNzTGlzdC5hZGQoJ3BsYXlsaXN0LWdyb3VwLS1yb3cnKVxuXG4gICAgICAgICAgICBGbGlwLmZyb20oc3RhdGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgICAgICAgZWFzZTogJ3pvb20nLFxuICAgICAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICAgICAgfSkgXG4gICAgICAgICAgfVxuICAgICAgICB9LCBcbiAgICAgICctPTAuMicpXG4gICAgICBcbiAgICAgIHRoaXMudGwuYWRkKCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9LCAnLT0wLjInKVxuICAgIH0pXG4gIH1cblxuICBkZXRhaWxUb0dyaWRUcmFuc2l0aW9uKCkge1xuICAgIGNvbnN0IHNwbGl0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwbGl0LXRleHRdJylcbiAgICBjb25zdCBjYXJkcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzIHx8IFtdKVxuICAgIGNvbnN0IHRyYWNrTGlzdFNlY3Rpb24gPSB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdFxuICAgIGNvbnN0IGhlcm8gPSB0aGlzLmVsZW1lbnRzLmhlcm9cbiAgICBjb25zdCBncmlkRWwgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0R3JvdXBcbiAgICBjb25zdCBzdGF0ZSA9IEZsaXAuZ2V0U3RhdGUoY2FyZHMsIHsgYWJzb2x1dGU6IHRydWUgfSlcbiAgICBcbiAgICBzcGxpdFRleHQuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgIGxldCBkaXZzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2ID4gZGl2JylcbiAgICAgIHRoaXMudGwudG8oZGl2cywgeyBcbiAgICAgICAgeVBlcmNlbnQ6IDEwMCwgXG4gICAgICAgIGR1cmF0aW9uOiAwLjYsIFxuICAgICAgICBlYXNlOiAnem9vbSdcbiAgICAgIH0sICdncm91cCcpXG4gICAgfSlcblxuICAgIHRoaXMudGwudG8odHJhY2tMaXN0U2VjdGlvbiwgeyBcbiAgICAgIG9wYWNpdHk6IDAsIFxuICAgICAgZHVyYXRpb246IDAuNCwgXG4gICAgICBlYXNlOiAncG93ZXIyLm91dCcsIFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0cmFja0xpc3RTZWN0aW9uLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0sICdncm91cCcpXG5cbiAgICB0aGlzLnRsLmFkZCgoKSA9PiB7XG4gICAgICBoZXJvLnJlbW92ZSgpXG4gICAgICBncmlkRWwuY2xhc3NMaXN0LnJlbW92ZSgncGxheWxpc3QtZ3JvdXAtLXJvdycpXG5cbiAgICAgIEZsaXAuZnJvbShzdGF0ZSwge1xuICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICBlYXNlOiAnem9vbScsXG4gICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLnRsLmFkZCgoKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9KVxuXG4gIH1cblxuICBhc3luYyBiZWZvcmVOYXZpZ2F0ZShjYXJkLCB1cmwpIHtcbiAgICB0aGlzLnRsLmNsZWFyKCk7XG4gICAgY29uc3QgY3VycmVudFR5cGUgPSB0aGlzLnZpZXdQYWdlVHlwZTsgLy8gXCJncmlkXCIgb3IgXCJkZXRhaWxcIlxuICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5vcmlnaW4pLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGNvbnN0IG5leHRUeXBlID0gcGF0aFNlZ21lbnRzLmxlbmd0aCA9PT0gMSA/ICdncmlkJyA6ICdkZXRhaWwnO1xuXG4gICAgaWYgKGN1cnJlbnRUeXBlID09PSBcImdyaWRcIiAmJiBuZXh0VHlwZSA9PT0gXCJkZXRhaWxcIikge1xuICAgICAgLy8gR3JpZCDihpIgRGV0YWlsXG4gICAgICBhd2FpdCB0aGlzLmdyaWRUb0RldGFpbFRyYW5zaXRpb24oY2FyZClcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImRldGFpbFwiKSB7XG4gICAgICAvLyBEZXRhaWwg4oaSIERldGFpbFxuICAgICAgYXdhaXQgdGhpcy5kZXRhaWxUb0RldGFpbFRyYW5zaXRpb24oY2FyZClcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgLy8gRGV0YWlsIOKGkiBHcmlkIChlLmcuLCBiYWNrIGJ1dHRvbilcbiAgICAgIGF3YWl0IHRoaXMuZGV0YWlsVG9HcmlkVHJhbnNpdGlvbigpXG4gICAgfVxuICB9XG5cblxuICBhc3luYyBoYW5kbGVOYXZpZ2F0aW9uKHVybCwgeyByZXBsYWNlU3RhdGUgPSBmYWxzZSB9ID0ge30pIHtcbiAgICB0cnkge1xuICAgICAgLy8gRGV0ZXJtaW5lIHBhZ2UgdHlwZXNcbiAgICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gdGhpcy52aWV3UGFnZVR5cGU7IC8vIGN1cnJlbnQgcGFnZSB0eXBlXG4gICAgICBjb25zdCBwYXRoU2VnbWVudHMgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24ub3JpZ2luKS5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIGNvbnN0IG5leHRUeXBlID0gcGF0aFNlZ21lbnRzLmxlbmd0aCA9PT0gMSA/ICdncmlkJyA6ICdkZXRhaWwnOyAvLyBuZXh0IHBhZ2UgdHlwZSBiYXNlZCBvbiBVUkxcblxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKVxuICAgICAgY29uc3QgaHRtbCA9IGF3YWl0IHJlcy50ZXh0KClcbiAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJylcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxlbWVudHMuY29udGFpbmVyXG4gICAgICBjb25zdCBwYWdlV3JhcHBlciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wbGF5bGlzdC1wYWdlLXdyYXBwZXJdJylcbiAgICAgIGNvbnN0IG5ld0hlcm8gPSBkb2MucXVlcnlTZWxlY3RvcignW2RhdGEtaGVyb10nKVxuICAgICAgY29uc3QgbWFpblRpdGxlID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1haW4tdGl0bGVdJylcbiAgICAgIGNvbnN0IGN1cnJlbnRNZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXlsaXN0LWRldGFpbC1oZWFkZXJfX21ldGEnKSBcbiAgICAgIGNvbnN0IG5ld01ldGFUZXh0ID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5bGlzdC1kZXRhaWwtaGVhZGVyX19tZXRhIFtkYXRhLXNwbGl0LXRleHRdJylcbiAgICAgIGNvbnN0IG5ld1RyYWNrTGlzdFNlY3Rpb24gPSBkb2MucXVlcnlTZWxlY3RvcignW2RhdGEtdHJhY2stbGlzdF0nKVxuXG4gICAgICBpZiAoY3VycmVudFR5cGUgPT09IFwiZ3JpZFwiICYmIG5leHRUeXBlID09PSBcImRldGFpbFwiKSB7XG5cbiAgICAgICAgaWYgKG5ld0hlcm8pIHtcbiAgICAgICAgICBnc2FwLnNldChuZXdIZXJvLCB7IG9wYWNpdHk6IDAsIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH0pXG4gICAgICAgICAgcGFnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobmV3SGVybylcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImRldGFpbFwiKSB7XG4gICAgICAgIGNvbnN0IGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZXJvXSAuY29udGFpbmVyJylcbiAgICAgIFxuICAgICAgICBnc2FwLnNldChtYWluVGl0bGUsIHsgb3BhY2l0eTogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIgfSlcblxuICAgICAgICBoZXJvQ29udGFpbmVyLnByZXBlbmQobWFpblRpdGxlKVxuXG4gICAgICAgIG5ld01ldGFUZXh0LmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGdzYXAuc2V0KGVsLCB7IG9wYWNpdHk6IDAsIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH0pXG4gICAgICAgICAgY3VycmVudE1ldGEuYXBwZW5kQ2hpbGQoZWwpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gdGhpcyBiaXQgaXMgd2hhdCBpIG5lZWQgZm9yIGdyaWQgdG8gZGV0YWlsIGFuZCBkZXRhaWwgdG8gZGV0YWlsIFxuXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgICBnc2FwLnNldChuZXdIZXJvLCB7IG9wYWNpdHk6IDAgfSlcbiAgICAgICAgcGFnZVdyYXBwZXIucHJlcGVuZChuZXdIZXJvKVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VHJhY2tMaXN0U2VjdGlvbikge1xuICAgICAgICBjb25zdCBuZXdJdGVtcyA9IG5ld1RyYWNrTGlzdFNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhY2stbGlzdC1pdGVtXScpXG4gICAgICAgIFxuICAgICAgICBnc2FwLnNldChuZXdJdGVtcywgeyBvcGFjaXR5OiAwLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiIH0pXG5cbiAgICAgICAgZ3NhcC5zZXQobmV3VHJhY2tMaXN0U2VjdGlvbiwge1xuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgcG9pbnRlckV2ZW50czogXCJub25lXCIsXG4gICAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIlxuICAgICAgICB9KVxuXG4gICAgICAgIHBhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG5ld1RyYWNrTGlzdFNlY3Rpb24pXG4gICAgICB9XG5cbiAgICAgIC8vIFJlZnJlc2ggZWxlbWVudCByZWZlcmVuY2VzXG4gICAgICB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhY2stbGlzdC1pdGVtXScpXG4gICAgICB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbGF5bGlzdC1jYXJkXScpXG4gICAgICB0aGlzLmVsZW1lbnRzLnBhZ2VUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWxpc3QtdHJpZ2dlcl0nKVxuICAgICAgdGhpcy5lbGVtZW50cy5tYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tYWluLXRpdGxlXScpXG4gICAgICB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRyYWNrLWxpc3RdJylcblxuICAgICAgdGhpcy5hZGRIb3Zlckxpc3RlbmVycygpXG4gICAgICB0aGlzLnBsYXlMaXN0Q2FyZExpc3RlbmVycygpXG4gICAgICB0aGlzLnVwZGF0ZVBhZ2VWaWV3VHlwZSgpXG5cbiAgICAgIGlmIChyZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCB1cmwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsIHVybClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignUGxheWxpc3QgbmF2aWdhdGlvbiBlcnJvcjonLCBlcnIpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBhZnRlck5hdmlnYXRlQW5pbWF0aW9ucygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gdGhpcy52aWV3UGFnZVR5cGU7IC8vIGN1cnJlbnQgcGFnZSB0eXBlXG4gICAgICBcbiAgICAgIGNvbnN0IGhlcm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZXJvXScpXG4gICAgICBjb25zdCB0cmFja1NlY3Rpb24gPSB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdFxuICAgICAgY29uc3QgcFRpdGxlcyA9IGhlcm8ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BsaXQtdGV4dF0nKVxuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMpO1xuICAgIFxuICAgICAgbGV0IHRpdGxlc0FyciA9IFtdXG5cbiAgICAgIHRoaXMudGwudG8oaGVybywge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBjbGVhclByb3BzOiBcInBvaW50ZXJFdmVudHNcIlxuICAgICAgfSlcblxuICAgICAgcFRpdGxlcy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdCA9IFNwbGl0VGV4dC5jcmVhdGUoZWwsIFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJsaW5lc1wiLFxuICAgICAgICAgIGxpbmVDbGFzczogXCJsaW5lXCIsXG4gICAgICAgICAgbWFzazogXCJsaW5lc1wiLFxuICAgICAgICAgIGF1dG9TcGxpdDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgZ3NhcC5zZXQoZWwsIHsgb3BhY2l0eTogMSwgY2xlYXJQcm9wczogXCJwb2ludGVyRXZlbnRzXCIgfSlcblxuICAgICAgICB0aXRsZXNBcnIucHVzaChzcGxpdC5saW5lcylcbiAgICAgIH0pXG4gICAgICBcbiAgICAgIHRpdGxlc0Fyci5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMudGwuZnJvbVRvKHRleHQsXG4gICAgICAgICAgeyB5UGVyY2VudDogMTAwIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgeVBlcmNlbnQ6IDAsIFxuICAgICAgICAgICAgZHVyYXRpb246IDAuOCwgXG4gICAgICAgICAgICBlYXNlOiBcInpvb21cIixcbiAgICAgICAgICAgIHN0YWdnZXI6IDAuMDVcbiAgICAgICAgICB9XG4gICAgICAgICwndGl0bGVzIC09MC4yJylcbiAgICAgIH0pXG4gICAgICBcbiAgICAgIGlmIChjdXJyZW50VHlwZSA9PT0gXCJkZXRhaWxcIikge1xuICAgICAgICB0cmFja1NlY3Rpb24uc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiBpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIilcblxuICAgICAgICB0aGlzLnRsLmFkZCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2NrU2Nyb2xsKGZhbHNlKVxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGdzYXAuc2V0KHRyYWNrU2VjdGlvbiwgeyBvcGFjaXR5OiAxLCB2aXNpYmlsaXR5OiBcInZpc2libGVcIiwgY2xlYXJQcm9wczogXCJwb2ludGVyRXZlbnRzXCIgfSlcbiAgICAgICAgLy8gZ3NhcC5zZXQoaXRlbXMsIHsgY2xlYXJQcm9wczogXCJ2aXNpYmlsaXR5XCIgfSlcblxuICAgICAgIFxuICAgICAgICAgIHRoaXMudGwudG8oaXRlbXMsXG4gICAgICAgICAgeyBcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBcImF1dG9cIiwgXG4gICAgICAgICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLCBcbiAgICAgICAgICAgIHN0YWdnZXI6IDAuMDUgXG4gICAgICAgICAgfSwgXCItPTAuMlwiKVxuICAgICAgICBcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50bC5hZGQoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVQYWdlVmlld1R5cGUobmV4dFR5cGUpIHtcbiAgICBpZiAoIW5leHRUeXBlKSByZXR1cm47XG5cbiAgICBpZiAobmV4dFR5cGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnBhZ2VDb250YWluZXIuZGF0YXNldC5wYWdlVmlld1R5cGUgPSBcImRldGFpbFwiXG4gICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoZXJvLS1zLXAtdCcpXG4gICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoZXJvLS1sLXAtdCcpXG5cbiAgICB9IGVsc2UgaWYgKG5leHRUeXBlID09PSBcImRldGFpbFwiICkge1xuICAgICAgdGhpcy5lbGVtZW50cy5wYWdlQ29udGFpbmVyLmRhdGFzZXQucGFnZVZpZXdUeXBlID0gXCJncmlkXCJcbiAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlcm8tLWwtcC10JylcbiAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hlcm8tLXMtcC10JylcbiAgICB9XG4gIH1cblxuICBnZXQgdmlld1BhZ2VUeXBlKCkge1xuICAgIGxldCB2UGFnZVR5cGUgPSB0aGlzLmVsZW1lbnRzLnBhZ2VDb250YWluZXIuZGF0YXNldC5wYWdlVmlld1R5cGVcbiAgICByZXR1cm4gdlBhZ2VUeXBlXG4gIH1cblxuICBwbGF5TGlzdENhcmRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgY2FyZHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXlsaXN0LXRyaWdnZXJdJykgfHwgW10pXG5cbiAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCB1cmwgPSBjYXJkLmhyZWZcblxuICAgICAgICBhd2FpdCB0aGlzLmJlZm9yZU5hdmlnYXRlKGNhcmQsIHVybClcblxuICAgICAgICBpZihhd2FpdCB0aGlzLmhhbmRsZU5hdmlnYXRpb24odXJsKSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWZ0ZXJOYXZpZ2F0ZUFuaW1hdGlvbnMoKSAvLyBSdW4gYWZ0ZXIgbmF2aWdhdGlvbiBhbmltYXRpb25zXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaWRlQ2FyZHMoKSB7XG4gICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzLCB7IG9wYWNpdHk6IDAgfSlcbiAgfVxuXG4gIGhpZGVUcmFja3MoKSB7XG4gICAgaWYodGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcykge1xuICAgICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcywgeyBvcGFjaXR5OiAwLCBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9KVxuICAgIH1cbiAgfVxuXG4gIGFkZEhvdmVyTGlzdGVuZXJzKCkge1xuICAgIGlmICghdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcykgcmV0dXJuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zLmxlbmd0aCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcylcbiAgICAgIDogW3RoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXNdXG5cbiAgICBpdGVtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgbGV0IGJnID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10cmFjay1saXN0LWJnXScpXG4gICAgICBsZXQgYWxidW1JbWcgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRyYWNrLWxpc3QtaW1nXScpXG5cbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICB0aGlzLmNsaWNrRWZ4LmN1cnJlbnRUaW1lID0gMFxuICAgICAgICB0aGlzLmNsaWNrRWZ4LnBsYXkoKVxuICAgICAgICBnc2FwLnRvKGJnLCB7IGNsaXBQYXRoOiAncG9seWdvbigwJSAwJSwgMTAwJSAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgICBnc2FwLnRvKGFsYnVtSW1nLCB7IGNsaXBQYXRoOiAncG9seWdvbigwJSAwJSwgMTAwJSAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgfSlcblxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIGdzYXAudG8oYmcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDEwMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgICBnc2FwLnRvKGFsYnVtSW1nLCB7IGNsaXBQYXRoOiAncG9seWdvbigwJSAxMDAlLCAxMDAlIDEwMCUsIDEwMCUgMTAwJSwgMCUgMTAwJSknLCBkdXJhdGlvbjogMC4zLCBlYXNlOiAnem9vbScgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGRIb3Zlckxpc3RlbmVycygpXG4gICAgdGhpcy5wbGF5TGlzdENhcmRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuaGlkZUNhcmRzKClcbiAgICB0aGlzLmhpZGVUcmFja3MoKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VMb2FkZWQnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUuZGV0YWlsLnRlbXBsYXRlID09PSAncGxheWxpc3RzJykge1xuICAgICAgICB0aGlzLmxvYWRBbmltYXRpb25zKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAvLyBjYWxsIHRoZSBzYW1lIGJlZm9yZU5hdmlnYXRlIGxvZ2ljLCBubyBjYXJkIGluIHRoaXMgY2FzZVxuICAgICAgYXdhaXQgdGhpcy5iZWZvcmVOYXZpZ2F0ZShudWxsLCB1cmwpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVOYXZpZ2F0aW9uKHVybCwgeyByZXBsYWNlU3RhdGU6IHRydWUgfSk7XG4gICAgICBhd2FpdCB0aGlzLmFmdGVyTmF2aWdhdGVBbmltYXRpb25zKCk7XG4gICAgfSlcbiAgfVxufSIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjY1NjNjYjhkODgxYzk4NmJhMTYzXCIpIl0sIm5hbWVzIjpbIlBhZ2UiLCJnc2FwIiwiU2Nyb2xsVHJpZ2dlciIsIkN1c3RvbUVhc2UiLCJGbGlwIiwic2Nyb2xsIiwiU2Nyb2xsVG9QbHVnaW4iLCJTcGxpdFRleHQiLCJQbGF5bGlzdHMiLCJjb25zdHJ1Y3RvciIsImlkIiwiZWxlbWVudHMiLCJ0cmFja0xpc3QiLCJ0cmFja0xpc3RJdGVtcyIsInBsYXlsaXN0R3JvdXAiLCJwbGF5bGlzdENhcmRzIiwicGFnZVRyaWdnZXIiLCJtYWluVGl0bGUiLCJwbGF5bGlzdENhcmRNZXRhIiwiaGVybyIsImNvbnRhaW5lciIsInBhZ2VDb250YWluZXIiLCJyZWdpc3RlclBsdWdpbiIsImNyZWF0ZSIsImNsaWNrRWZ4IiwiQXVkaW8iLCJ0bCIsInRpbWVsaW5lIiwiaW5pdCIsImxvYWRBbmltYXRpb25zIiwidmlld1BhZ2VUeXBlIiwiYW5pbWF0ZUNhcmRzSW5WaWV3Iiwic2Nyb2xsQ2FyZEFuaW1hdGlvbnMiLCJ0byIsIm9wYWNpdHkiLCJwb2ludGVyRXZlbnRzIiwiZHVyYXRpb24iLCJlYXNlIiwic3RhZ2dlciIsInVwZGF0ZUluZGljYXRvciIsInRhcmdldEVsIiwicGxheWxpc3RTY3JvbGwiLCJzY3JvbGxSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidGFyZ2V0UmVjdCIsImRlbHRhWCIsImxlZnQiLCJ0YXJnZXRYIiwieCIsImNhcmRzIiwibGVuZ3RoIiwic2V0IiwiaSIsImVsIiwiZGF0YXNldCIsImFuaW1hdGVkIiwiYW5pbWF0ZUJhdGNoIiwiYmF0Y2giLCJmcm9tVG8iLCJvblN0YXJ0IiwiZm9yRWFjaCIsImNhcmQiLCJvbkVudGVyIiwiZmlsdGVyIiwic3RhcnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVmcmVzaCIsImluVmlld0NhcmRzIiwiQXJyYXkiLCJmcm9tIiwicmVjdCIsInRvcCIsImlubmVySGVpZ2h0IiwibG9ja1Njcm9sbCIsImxvY2siLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIm92ZXJmbG93Iiwic3RvcCIsImRldGFpbFRvRGV0YWlsVHJhbnNpdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwic3BsaXRUZXh0IiwicXVlcnlTZWxlY3RvckFsbCIsInRyYWNrTGlzdFNlY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiZGl2cyIsInlQZXJjZW50IiwiYWRkIiwicmVtb3ZlIiwib25Db21wbGV0ZSIsImdyaWRUb0RldGFpbFRyYW5zaXRpb24iLCJncmlkRWwiLCJtYWluVGl0bGVTZWN0aW9uIiwibWV0YSIsIm1haW5UaXRsZU1hc2siLCJzY3JvbGxUbyIsInkiLCJjbGFzc0xpc3QiLCJzdGF0ZSIsImdldFN0YXRlIiwiYWJzb2x1dGUiLCJkZXRhaWxUb0dyaWRUcmFuc2l0aW9uIiwiYmVmb3JlTmF2aWdhdGUiLCJ1cmwiLCJjbGVhciIsImN1cnJlbnRUeXBlIiwicGF0aFNlZ21lbnRzIiwiVVJMIiwibG9jYXRpb24iLCJvcmlnaW4iLCJwYXRobmFtZSIsInNwbGl0IiwiQm9vbGVhbiIsIm5leHRUeXBlIiwiaGFuZGxlTmF2aWdhdGlvbiIsInJlcGxhY2VTdGF0ZSIsInJlcyIsImZldGNoIiwiaHRtbCIsInRleHQiLCJwYXJzZXIiLCJET01QYXJzZXIiLCJkb2MiLCJwYXJzZUZyb21TdHJpbmciLCJwYWdlV3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJuZXdIZXJvIiwiY3VycmVudE1ldGEiLCJuZXdNZXRhVGV4dCIsIm5ld1RyYWNrTGlzdFNlY3Rpb24iLCJhcHBlbmRDaGlsZCIsImhlcm9Db250YWluZXIiLCJwcmVwZW5kIiwibmV3SXRlbXMiLCJ2aXNpYmlsaXR5IiwiYWRkSG92ZXJMaXN0ZW5lcnMiLCJwbGF5TGlzdENhcmRMaXN0ZW5lcnMiLCJ1cGRhdGVQYWdlVmlld1R5cGUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiZXJyIiwiZXJyb3IiLCJhZnRlck5hdmlnYXRlQW5pbWF0aW9ucyIsInRyYWNrU2VjdGlvbiIsInBUaXRsZXMiLCJpdGVtcyIsInRpdGxlc0FyciIsImNsZWFyUHJvcHMiLCJ0eXBlIiwibGluZUNsYXNzIiwibWFzayIsImF1dG9TcGxpdCIsInB1c2giLCJsaW5lcyIsInBhZ2VWaWV3VHlwZSIsInZQYWdlVHlwZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhyZWYiLCJoaWRlQ2FyZHMiLCJoaWRlVHJhY2tzIiwidW5kZWZpbmVkIiwiZWxlbWVudCIsImJnIiwiYWxidW1JbWciLCJjdXJyZW50VGltZSIsInBsYXkiLCJjbGlwUGF0aCIsImRldGFpbCIsInRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==
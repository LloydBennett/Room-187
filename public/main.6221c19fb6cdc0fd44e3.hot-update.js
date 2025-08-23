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
  detailPageTransitionOut(card) {
    this.updateIndicator(card);
    const splitText = document.querySelectorAll('[data-split-text]');
    const trackListSection = this.elements.trackListSection;
    splitText.forEach((el, i) => {
      let divs = el.querySelectorAll('div > div');
      this.tl.to(el, {
        yPercent: 100,
        duration: 0.6,
        ease: 'zoom',
        onComplete: () => {
          el.remove();
        }
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
      return Promise.resolve();
    }, 'group +=0.2');
  }
  gridPageTransitionOut() {
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
  async beforeNavigate(card, url) {
    const currentType = this.viewPageType; // "grid" or "detail"
    const pathSegments = new URL(url, location.origin).pathname.split('/').filter(Boolean);
    const nextType = pathSegments.length === 1 ? 'grid' : 'detail';
    if (currentType === "grid" && nextType === "detail") {
      // Grid → Detail
      await this.gridPageTransitionOut(card);
      this.updatePageViewType(); // grid → detail
    } else if (currentType === "detail" && nextType === "detail") {
      // Detail → Detail
      await this.detailPageTransitionOut(card);
    } else if (currentType === "detail" && nextType === "grid") {
      // Detail → Grid (e.g., back button)
      await this.gridPageTransitionFromDetail(); // we’ll define a Flip-based transition
      this.updatePageViewType(); // detail → grid
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
      const newHero = doc.querySelector('[data-hero]');
      const mainTitle = doc.querySelector('[data-main-title]');
      const currentMeta = this.elements.playlistCardMeta;
      const newMetaText = doc.querySelectorAll('.playlist-detail-header__meta [data-split-text]');
      if (currentType === "grid" && nextType === "detail") {
        if (newHero) {
          gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(newHero, {
            opacity: 0,
            pointerEvents: "none"
          });
          container.appendChild(newHero);
        }
      } else if (currentType === "detail" && nextType === "detail") {
        const heroContainer = document.querySelector('[data-hero] .container');
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(mainTitle, {
          opacity: 0,
          pointerEvents: "none"
        });
        heroContainer.appendChild(mainTitle);
        newMetaText.forEach(el => {
          gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(el, {
            opacity: 0,
            pointerEvents: "none"
          });
          currentMeta.appendChild(el);
        });

        // gsap.set(newHero, {
        //   opacity: 0,
        //   pointerEvents: "none"
        // })
      } else if (currentType === "detail" && nextType === "grid") {
        // nothing happens - as we wont need anything
      }

      // this bit is what i need for grid to detail and detail to detail 
      const newTrackListSection = doc.querySelector('[data-playlist-tracks]');
      if (newTrackListSection) {
        const newItems = newTrackListSection.querySelectorAll('[data-track-list-item]');
        newTrackListSection.style.visibility = 'hidden';
        newTrackListSection.style.opacity = '0';
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(newTrackListSection, {
          opacity: 0,
          pointerEvents: "none"
        });
        container.appendChild(newTrackListSection);
      }

      // Refresh element references
      this.elements.trackListItems = document.querySelectorAll('[data-track-list-item]');
      this.elements.playlistCards = document.querySelectorAll('[data-playlist-card]');
      this.elements.pageTrigger = document.querySelectorAll('[data-playlist-trigger]');
      this.elements.mainTitle = document.querySelector('[data-main-title]');
      this.addHoverListeners();
      this.playListCardListeners();
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
      const hero = document.querySelector('[data-hero]');
      const trackSection = document.querySelector('[data-playlist-tracks]');
      const pTitles = hero.querySelectorAll('[data-split-text]');
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
      this.tl.to(trackSection, {
        opacity: 1,
        clearProps: "pointerEvents",
        onComplete: () => {
          this.lockScroll(false);
          resolve();
        }
      });
      if (this.elements.trackListItems) {
        const items = Array.from(this.elements.trackListItems);
        gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(items, {
          opacity: 0,
          visibility: "visible"
        });
        this.tl.to(items, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05
        }, "-=0.2");
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
/******/ 	__webpack_require__.h = () => ("a71813755be40cac9746")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztVQzFlQSxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL3Jvb20xODcvLi9hcHAvcGFnZXMvUGxheWxpc3RzL2luZGV4LmpzIiwid2VicGFjazovL3Jvb20xODcvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlIGZyb20gJ2NsYXNzZXMvUGFnZSdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSAnZ3NhcC9TY3JvbGxUcmlnZ2VyJ1xuaW1wb3J0IHsgQ3VzdG9tRWFzZSB9IGZyb20gJ2dzYXAvQ3VzdG9tRWFzZSdcbmltcG9ydCB7IEZsaXAgfSBmcm9tICdnc2FwL0ZsaXAnXG5pbXBvcnQgeyBzY3JvbGwgfSBmcm9tICd1dGlscy9MZW5pc1Njcm9sbCdcbmltcG9ydCB7IFNjcm9sbFRvUGx1Z2luIH0gZnJvbSAnZ3NhcC9TY3JvbGxUb1BsdWdpbidcbmltcG9ydCB7IFNwbGl0VGV4dCB9IGZyb20gJ2dzYXAvU3BsaXRUZXh0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5bGlzdHMgZXh0ZW5kcyBQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgaWQ6ICdwbGF5bGlzdHMnLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgdHJhY2tMaXN0OiAnW2RhdGEtdHJhY2stbGlzdF0nLFxuICAgICAgICB0cmFja0xpc3RJdGVtczogJ1tkYXRhLXRyYWNrLWxpc3QtaXRlbV0nLFxuICAgICAgICBwbGF5bGlzdEdyb3VwOiAnW2RhdGEtcGxheWxpc3QtZ3JvdXBdJyxcbiAgICAgICAgcGxheWxpc3RDYXJkczogJ1tkYXRhLXBsYXlsaXN0LWNhcmRdJyxcbiAgICAgICAgcGFnZVRyaWdnZXI6ICdbZGF0YS1wbGF5bGlzdC10cmlnZ2VyXScsXG4gICAgICAgIG1haW5UaXRsZTogJ1tkYXRhLW1haW4tdGl0bGVdJyxcbiAgICAgICAgcGxheWxpc3RDYXJkTWV0YTogJ1tkYXRhLXBsYXlsaXN0LW1ldGFdJywgXG4gICAgICAgIGhlcm86ICdbZGF0YS1oZXJvXScsXG4gICAgICAgIGNvbnRhaW5lcjogJ1tkYXRhLWlubmVyLWNvbnRlbnRdJyxcbiAgICAgICAgcGFnZUNvbnRhaW5lcjogJ1tkYXRhLXBhZ2Utdmlldy10eXBlXSdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBDdXN0b21FYXNlLCBGbGlwLCBTY3JvbGxUb1BsdWdpbiwgU3BsaXRUZXh0KVxuICAgIEN1c3RvbUVhc2UuY3JlYXRlKCd6b29tJywgJzAuNzEsIDAsIDAuMDYsIDEnKVxuXG4gICAgdGhpcy5jbGlja0VmeCA9IG5ldyBBdWRpbygnL2NsaWNrLm1wMycpXG4gICAgdGhpcy5zY3JvbGwgPSBzY3JvbGxcbiAgICB0aGlzLnRsID0gZ3NhcC50aW1lbGluZSgpXG5cbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgbG9hZEFuaW1hdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMudmlld1BhZ2VUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgdGhpcy5hbmltYXRlQ2FyZHNJblZpZXcoKVxuICAgICAgdGhpcy5zY3JvbGxDYXJkQW5pbWF0aW9ucygpXG4gICAgfSBlbHNlIHtcbiAgICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcyxcbiAgICAgICAgeyBcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IFwiYXV0b1wiLCBcbiAgICAgICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIiwgXG4gICAgICAgICAgc3RhZ2dlcjogMC4wNSBcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUluZGljYXRvcih0YXJnZXRFbCkge1xuICAgIGxldCBwbGF5bGlzdFNjcm9sbCA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RHcm91cFxuICAgIGlmICghcGxheWxpc3RTY3JvbGwpIHJldHVyblxuICAgIFxuICAgIGNvbnN0IHNjcm9sbFJlY3QgPSBwbGF5bGlzdFNjcm9sbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IHRhcmdldFJlY3QgPSB0YXJnZXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgLy8gSG93IGZhciB0aGUgY2FyZCBpcyBmcm9tIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIHNjcm9sbCBjb250YWluZXJcbiAgICBjb25zdCBkZWx0YVggPSB0YXJnZXRSZWN0LmxlZnQgLSBzY3JvbGxSZWN0LmxlZnRcbiAgICBjb25zdCB0YXJnZXRYID0gLWRlbHRhWFxuICAgIFxuICAgIGdzYXAudG8ocGxheWxpc3RTY3JvbGwsIHtcbiAgICAgIHg6IHRhcmdldFgsXG4gICAgICBkdXJhdGlvbjogMC40LFxuICAgICAgZWFzZTogXCJwb3dlcjMub3V0XCJcbiAgICB9KVxuICB9XG5cbiAgc2Nyb2xsQ2FyZEFuaW1hdGlvbnMoKSB7XG4gICAgY29uc3QgY2FyZHMgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHM7XG4gICAgaWYgKCFjYXJkcyB8fCAhY2FyZHMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAvLyBvbmx5IGhpZGUgY2FyZHMgdGhhdCBoYXZlIE5PVCBiZWVuIGFuaW1hdGVkXG4gICAgZ3NhcC5zZXQoY2FyZHMsIHsgb3BhY2l0eTogKGksIGVsKSA9PiBlbC5kYXRhc2V0LmFuaW1hdGVkID09PSBcInRydWVcIiA/IDEgOiAwIH0pO1xuICAgIC8vZ3NhcC5zZXQoY2FyZHMsIHsgb3BhY2l0eTogMCB9KTsgLy8gc3RhcnQgYWxsIGNhcmRzIGludmlzaWJsZVxuXG4gICAgY29uc3QgYW5pbWF0ZUJhdGNoID0gKGJhdGNoKSA9PiB7XG4gICAgICBnc2FwLmZyb21UbyhiYXRjaCxcbiAgICAgICAgeyBvcGFjaXR5OiAwIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICAgICAgc3RhZ2dlcjogMC4xNSxcbiAgICAgICAgICBvblN0YXJ0OiAoKSA9PiB7XG4gICAgICAgICAgICBiYXRjaC5mb3JFYWNoKGNhcmQgPT4gY2FyZC5kYXRhc2V0LmFuaW1hdGVkID0gXCJ0cnVlXCIpOyAvLyBtYXJrIGFzIGFuaW1hdGVkXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICBTY3JvbGxUcmlnZ2VyLmJhdGNoKGNhcmRzLCB7XG4gICAgICBvbkVudGVyOiAoYmF0Y2gpID0+IHtcbiAgICAgICAgYmF0Y2ggPSBiYXRjaC5maWx0ZXIoY2FyZCA9PiBjYXJkLmRhdGFzZXQuYW5pbWF0ZWQgIT09IFwidHJ1ZVwiKTtcbiAgICAgICAgaWYgKGJhdGNoLmxlbmd0aCkgYW5pbWF0ZUJhdGNoKGJhdGNoKTtcbiAgICAgIH0sXG4gICAgICBzdGFydDogXCJ0b3AgODAlXCIsXG4gICAgfSk7XG5cbiAgICAvLyBSZWZyZXNoIFNjcm9sbFRyaWdnZXIgb24gcmVzaXplIHRvIHByZXZlbnQgZ2xpdGNoZXNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XG4gICAgfSk7XG4gIH1cblxuICBhbmltYXRlQ2FyZHNJblZpZXcoKSB7XG4gICAgY29uc3QgY2FyZHMgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHM7XG4gICAgaWYgKCFjYXJkcyB8fCAhY2FyZHMubGVuZ3RoIHx8IHRoaXMudmlld1BhZ2VUeXBlICE9PSBcImdyaWRcIiApIHJldHVybjtcblxuICAgIGNvbnN0IGluVmlld0NhcmRzID0gQXJyYXkuZnJvbShjYXJkcykuZmlsdGVyKGNhcmQgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IGNhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICByZXR1cm4gcmVjdC50b3AgPCB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjk1ICYmIGNhcmQuZGF0YXNldC5hbmltYXRlZCAhPT0gXCJ0cnVlXCI7XG4gICAgfSk7XG5cbiAgICBpZiAoIWluVmlld0NhcmRzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgZ3NhcC5mcm9tVG8oaW5WaWV3Q2FyZHMsXG4gICAgICB7IG9wYWNpdHk6IDAgfSxcbiAgICAgIHtcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICAgIHN0YWdnZXI6IDAuMTUsXG4gICAgICAgIG9uU3RhcnQ6ICgpID0+IGluVmlld0NhcmRzLmZvckVhY2goY2FyZCA9PiBjYXJkLmRhdGFzZXQuYW5pbWF0ZWQgPSBcInRydWVcIilcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbG9ja1Njcm9sbChsb2NrID0gdHJ1ZSkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBsb2NrID8gJ2hpZGRlbicgOiAnJ1xuICAgIGxvY2s/IHRoaXMuc2Nyb2xsLnN0b3AoKSA6IHRoaXMuc2Nyb2xsLnN0YXJ0KClcbiAgfVxuXG4gIGRldGFpbFBhZ2VUcmFuc2l0aW9uT3V0KGNhcmQpIHtcbiAgICB0aGlzLnVwZGF0ZUluZGljYXRvcihjYXJkKVxuICAgIGNvbnN0IHNwbGl0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwbGl0LXRleHRdJylcbiAgICBjb25zdCB0cmFja0xpc3RTZWN0aW9uID0gdGhpcy5lbGVtZW50cy50cmFja0xpc3RTZWN0aW9uXG5cbiAgICBzcGxpdFRleHQuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgIGxldCBkaXZzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2ID4gZGl2JylcbiAgICAgIHRoaXMudGwudG8oZWwsIHsgXG4gICAgICAgIHlQZXJjZW50OiAxMDAsIFxuICAgICAgICBkdXJhdGlvbjogMC42LCBcbiAgICAgICAgZWFzZTogJ3pvb20nLFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgfVxuICAgICAgfSwgJ2dyb3VwJylcbiAgICB9KVxuXG4gICAgdGhpcy50bC50byh0cmFja0xpc3RTZWN0aW9uLCB7IFxuICAgICAgb3BhY2l0eTogMCwgXG4gICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgIGVhc2U6ICdwb3dlcjIub3V0JywgXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRyYWNrTGlzdFNlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSwgJ2dyb3VwJylcblxuICAgIHRoaXMudGwuYWRkKCgpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIH0sICdncm91cCArPTAuMicpXG5cbiAgfVxuXG4gIGdyaWRQYWdlVHJhbnNpdGlvbk91dCgpIHtcbiAgICBjb25zdCBncmlkRWwgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0R3JvdXBcbiAgICBjb25zdCBjYXJkcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzIHx8IFtdKVxuICAgIGNvbnN0IG1haW5UaXRsZVNlY3Rpb24gPSB0aGlzLmVsZW1lbnRzLmhlcm9cbiAgICBjb25zdCBtZXRhID0gdGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRNZXRhXG4gICAgY29uc3QgbWFpblRpdGxlTWFzayA9IHRoaXMuZWxlbWVudHMubWFpblRpdGxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdiA+IGRpdicpXG5cbiAgICBpZiAoIWdyaWRFbCB8fCAhY2FyZHMubGVuZ3RoICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpIFxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmxvY2tTY3JvbGwodHJ1ZSlcblxuICAgICAgY2FyZHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGlmIChlbC5kYXRhc2V0LmFuaW1hdGVkICE9PSBcInRydWVcIikge1xuICAgICAgICAgIGdzYXAuc2V0KGVsLCB7IG9wYWNpdHk6IDEgfSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgdGhpcy50bC50byhtZXRhLCB7IG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjQsIGVhc2U6IFwicG93ZXIyLm91dFwifSlcbiAgICAgIFxuICAgICAgdGhpcy50bC50byh3aW5kb3csIHtcbiAgICAgICAgc2Nyb2xsVG86IHsgeTogMCB9LFxuICAgICAgICBkdXJhdGlvbjogMC44LFxuICAgICAgICBlYXNlOiAncG93ZXIyLm91dCdcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMudGwudG8obWFpblRpdGxlTWFzaywgXG4gICAgICAgIHsgXG4gICAgICAgICAgeVBlcmNlbnQ6IDEwMCxcbiAgICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICAgIGVhc2U6ICd6b29tJyxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAobWFpblRpdGxlU2VjdGlvbikgbWFpblRpdGxlU2VjdGlvbi5yZW1vdmUoKVxuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoZXJvLS1sLXAtdCcpXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoZXJvLS1zLXAtdCcpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gRmxpcC5nZXRTdGF0ZShjYXJkcywgeyBhYnNvbHV0ZTogdHJ1ZSB9KVxuXG4gICAgICAgICAgICBncmlkRWwuY2xhc3NMaXN0LmFkZCgncGxheWxpc3QtZ3JvdXAtLXJvdycpXG5cbiAgICAgICAgICAgIEZsaXAuZnJvbShzdGF0ZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICAgICAgICBlYXNlOiAnem9vbScsXG4gICAgICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgICAgICB9KSBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFxuICAgICAgJy09MC4yJylcbiAgICAgIFxuICAgICAgdGhpcy50bC5hZGQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0sICctPTAuMicpXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGJlZm9yZU5hdmlnYXRlKGNhcmQsIHVybCkge1xuICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gdGhpcy52aWV3UGFnZVR5cGU7IC8vIFwiZ3JpZFwiIG9yIFwiZGV0YWlsXCJcbiAgICBjb25zdCBwYXRoU2VnbWVudHMgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24ub3JpZ2luKS5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKTtcbiAgICBjb25zdCBuZXh0VHlwZSA9IHBhdGhTZWdtZW50cy5sZW5ndGggPT09IDEgPyAnZ3JpZCcgOiAnZGV0YWlsJztcblxuICAgIGlmIChjdXJyZW50VHlwZSA9PT0gXCJncmlkXCIgJiYgbmV4dFR5cGUgPT09IFwiZGV0YWlsXCIpIHtcbiAgICAgIC8vIEdyaWQg4oaSIERldGFpbFxuICAgICAgYXdhaXQgdGhpcy5ncmlkUGFnZVRyYW5zaXRpb25PdXQoY2FyZCk7XG4gICAgICB0aGlzLnVwZGF0ZVBhZ2VWaWV3VHlwZSgpOyAvLyBncmlkIOKGkiBkZXRhaWxcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImRldGFpbFwiKSB7XG4gICAgICAvLyBEZXRhaWwg4oaSIERldGFpbFxuICAgICAgYXdhaXQgdGhpcy5kZXRhaWxQYWdlVHJhbnNpdGlvbk91dChjYXJkKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgLy8gRGV0YWlsIOKGkiBHcmlkIChlLmcuLCBiYWNrIGJ1dHRvbilcbiAgICAgIGF3YWl0IHRoaXMuZ3JpZFBhZ2VUcmFuc2l0aW9uRnJvbURldGFpbCgpOyAvLyB3ZeKAmWxsIGRlZmluZSBhIEZsaXAtYmFzZWQgdHJhbnNpdGlvblxuICAgICAgdGhpcy51cGRhdGVQYWdlVmlld1R5cGUoKTsgLy8gZGV0YWlsIOKGkiBncmlkXG4gICAgfVxuICB9XG5cblxuICBhc3luYyBoYW5kbGVOYXZpZ2F0aW9uKHVybCwgeyByZXBsYWNlU3RhdGUgPSBmYWxzZSB9ID0ge30pIHtcbiAgICB0cnkge1xuXG4gICAgICAgLy8gRGV0ZXJtaW5lIHBhZ2UgdHlwZXNcbiAgICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gdGhpcy52aWV3UGFnZVR5cGU7IC8vIGN1cnJlbnQgcGFnZSB0eXBlXG4gICAgICBjb25zdCBwYXRoU2VnbWVudHMgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24ub3JpZ2luKS5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIGNvbnN0IG5leHRUeXBlID0gcGF0aFNlZ21lbnRzLmxlbmd0aCA9PT0gMSA/ICdncmlkJyA6ICdkZXRhaWwnOyAvLyBuZXh0IHBhZ2UgdHlwZSBiYXNlZCBvbiBVUkxcblxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKVxuICAgICAgY29uc3QgaHRtbCA9IGF3YWl0IHJlcy50ZXh0KClcbiAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJylcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxlbWVudHMuY29udGFpbmVyXG4gICAgICBjb25zdCBuZXdIZXJvID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlcm9dJylcbiAgICAgIGNvbnN0IG1haW5UaXRsZSA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tYWluLXRpdGxlXScpXG4gICAgICBjb25zdCBjdXJyZW50TWV0YSA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RDYXJkTWV0YSBcbiAgICAgIGNvbnN0IG5ld01ldGFUZXh0ID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5bGlzdC1kZXRhaWwtaGVhZGVyX19tZXRhIFtkYXRhLXNwbGl0LXRleHRdJylcbiAgICAgICBcblxuICAgICAgaWYgKGN1cnJlbnRUeXBlID09PSBcImdyaWRcIiAmJiBuZXh0VHlwZSA9PT0gXCJkZXRhaWxcIikge1xuXG4gICAgICAgIGlmIChuZXdIZXJvKSB7XG4gICAgICAgICAgZ3NhcC5zZXQobmV3SGVybywgeyBvcGFjaXR5OiAwLCBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9KVxuICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdIZXJvKVxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFR5cGUgPT09IFwiZGV0YWlsXCIgJiYgbmV4dFR5cGUgPT09IFwiZGV0YWlsXCIpIHtcbiAgICAgICAgY29uc3QgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlcm9dIC5jb250YWluZXInKVxuICAgICAgICBcbiAgICAgICAgZ3NhcC5zZXQobWFpblRpdGxlLCB7IG9wYWNpdHk6IDAsIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH0pXG5cbiAgICAgICAgaGVyb0NvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluVGl0bGUpXG5cbiAgICAgICAgbmV3TWV0YVRleHQuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgZ3NhcC5zZXQoZWwsIHsgb3BhY2l0eTogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIgfSlcbiAgICAgICAgICBjdXJyZW50TWV0YS5hcHBlbmRDaGlsZChlbClcbiAgICAgICAgfSlcbiAgICBcblxuICAgICAgICAvLyBnc2FwLnNldChuZXdIZXJvLCB7XG4gICAgICAgIC8vICAgb3BhY2l0eTogMCxcbiAgICAgICAgLy8gICBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIlxuICAgICAgICAvLyB9KVxuXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSBcImRldGFpbFwiICYmIG5leHRUeXBlID09PSBcImdyaWRcIikge1xuICAgICAgICAvLyBub3RoaW5nIGhhcHBlbnMgLSBhcyB3ZSB3b250IG5lZWQgYW55dGhpbmdcbiAgICAgIH1cblxuXG4gICAgICAvLyB0aGlzIGJpdCBpcyB3aGF0IGkgbmVlZCBmb3IgZ3JpZCB0byBkZXRhaWwgYW5kIGRldGFpbCB0byBkZXRhaWwgXG4gICAgICBjb25zdCBuZXdUcmFja0xpc3RTZWN0aW9uID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsYXlsaXN0LXRyYWNrc10nKVxuXG4gICAgICBpZiAobmV3VHJhY2tMaXN0U2VjdGlvbikge1xuICAgICAgICBjb25zdCBuZXdJdGVtcyA9IG5ld1RyYWNrTGlzdFNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhY2stbGlzdC1pdGVtXScpXG4gICAgICAgIFxuICAgICAgICBuZXdUcmFja0xpc3RTZWN0aW9uLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICAgICAgICBuZXdUcmFja0xpc3RTZWN0aW9uLnN0eWxlLm9wYWNpdHkgPSAnMCdcblxuICAgICAgICBnc2FwLnNldChuZXdUcmFja0xpc3RTZWN0aW9uLCB7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIlxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdUcmFja0xpc3RTZWN0aW9uKVxuICAgICAgfVxuXG4gICAgICAvLyBSZWZyZXNoIGVsZW1lbnQgcmVmZXJlbmNlc1xuICAgICAgdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYWNrLWxpc3QtaXRlbV0nKVxuICAgICAgdGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWxpc3QtY2FyZF0nKVxuICAgICAgdGhpcy5lbGVtZW50cy5wYWdlVHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXlsaXN0LXRyaWdnZXJdJylcbiAgICAgIHRoaXMuZWxlbWVudHMubWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbWFpbi10aXRsZV0nKVxuXG4gICAgICB0aGlzLmFkZEhvdmVyTGlzdGVuZXJzKClcbiAgICAgIHRoaXMucGxheUxpc3RDYXJkTGlzdGVuZXJzKClcblxuICAgICAgaWYgKHJlcGxhY2VTdGF0ZSkge1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIHVybClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdQbGF5bGlzdCBuYXZpZ2F0aW9uIGVycm9yOicsIGVycilcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGFmdGVyTmF2aWdhdGVBbmltYXRpb25zKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaGVybyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlcm9dJylcbiAgICAgIGNvbnN0IHRyYWNrU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsYXlsaXN0LXRyYWNrc10nKVxuICAgICAgY29uc3QgcFRpdGxlcyA9IGhlcm8ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BsaXQtdGV4dF0nKVxuICAgICAgbGV0IHRpdGxlc0FyciA9IFtdXG5cbiAgICAgIHRoaXMudGwudG8oaGVybywge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBjbGVhclByb3BzOiBcInBvaW50ZXJFdmVudHNcIlxuICAgICAgfSlcblxuICAgICAgcFRpdGxlcy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdCA9IFNwbGl0VGV4dC5jcmVhdGUoZWwsIFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJsaW5lc1wiLFxuICAgICAgICAgIGxpbmVDbGFzczogXCJsaW5lXCIsXG4gICAgICAgICAgbWFzazogXCJsaW5lc1wiLFxuICAgICAgICAgIGF1dG9TcGxpdDogdHJ1ZSxcbiAgICAgICAgfSlcblxuICAgICAgICB0aXRsZXNBcnIucHVzaChzcGxpdC5saW5lcylcbiAgICAgIH0pXG4gICAgICBcbiAgICAgIHRpdGxlc0Fyci5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMudGwuZnJvbVRvKHRleHQsXG4gICAgICAgICAgeyB5UGVyY2VudDogMTAwIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgeVBlcmNlbnQ6IDAsIFxuICAgICAgICAgICAgZHVyYXRpb246IDAuOCwgXG4gICAgICAgICAgICBlYXNlOiBcInpvb21cIixcbiAgICAgICAgICAgIHN0YWdnZXI6IDAuMDVcbiAgICAgICAgICB9XG4gICAgICAgICwndGl0bGVzIC09MC4yJylcbiAgICAgIH0pXG4gICAgICBcbiAgICAgIHRoaXMudGwudG8odHJhY2tTZWN0aW9uLCB7XG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGNsZWFyUHJvcHM6IFwicG9pbnRlckV2ZW50c1wiLFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2NrU2Nyb2xsKGZhbHNlKVxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAodGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcykge1xuICAgICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcyk7XG5cbiAgICAgICAgZ3NhcC5zZXQoaXRlbXMsIHsgb3BhY2l0eTogMCwgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIgfSlcbiAgICAgICBcbiAgICAgICAgdGhpcy50bC50byhpdGVtcyxcbiAgICAgICAgeyBcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IFwiYXV0b1wiLCBcbiAgICAgICAgICBkdXJhdGlvbjogMC40LCBcbiAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIiwgXG4gICAgICAgICAgc3RhZ2dlcjogMC4wNSBcbiAgICAgICAgfSwgXCItPTAuMlwiKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVQYWdlVmlld1R5cGUobmV4dFR5cGUpIHtcbiAgICBpZiAoIW5leHRUeXBlKSByZXR1cm47XG5cbiAgICBpZiAobmV4dFR5cGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnBhZ2VDb250YWluZXIuZGF0YXNldC5wYWdlVmlld1R5cGUgPSBcImRldGFpbFwiXG4gICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoZXJvLS1zLXAtdCcpXG4gICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoZXJvLS1sLXAtdCcpXG5cbiAgICB9IGVsc2UgaWYgKG5leHRUeXBlID09PSBcImRldGFpbFwiICkge1xuICAgICAgdGhpcy5lbGVtZW50cy5wYWdlQ29udGFpbmVyLmRhdGFzZXQucGFnZVZpZXdUeXBlID0gXCJncmlkXCJcbiAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlcm8tLWwtcC10JylcbiAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hlcm8tLXMtcC10JylcbiAgICB9XG4gIH1cblxuICBnZXQgdmlld1BhZ2VUeXBlKCkge1xuICAgIGxldCB2UGFnZVR5cGUgPSB0aGlzLmVsZW1lbnRzLnBhZ2VDb250YWluZXIuZGF0YXNldC5wYWdlVmlld1R5cGVcbiAgICByZXR1cm4gdlBhZ2VUeXBlXG4gIH1cblxuICBwbGF5TGlzdENhcmRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgY2FyZHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXlsaXN0LXRyaWdnZXJdJykgfHwgW10pXG5cbiAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCB1cmwgPSBjYXJkLmhyZWZcblxuICAgICAgICBhd2FpdCB0aGlzLmJlZm9yZU5hdmlnYXRlKGNhcmQsIHVybClcblxuICAgICAgICBpZihhd2FpdCB0aGlzLmhhbmRsZU5hdmlnYXRpb24odXJsKSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWZ0ZXJOYXZpZ2F0ZUFuaW1hdGlvbnMoKSAvLyBSdW4gYWZ0ZXIgbmF2aWdhdGlvbiBhbmltYXRpb25zXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaWRlQ2FyZHMoKSB7XG4gICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy5wbGF5bGlzdENhcmRzLCB7IG9wYWNpdHk6IDAgfSlcbiAgfVxuXG4gIGhpZGVUcmFja3MoKSB7XG4gICAgaWYodGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcykge1xuICAgICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcywgeyBvcGFjaXR5OiAwLCBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9KVxuICAgIH1cbiAgfVxuXG4gIGFkZEhvdmVyTGlzdGVuZXJzKCkge1xuICAgIGlmICghdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcykgcmV0dXJuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zLmxlbmd0aCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcylcbiAgICAgIDogW3RoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXNdXG5cbiAgICBpdGVtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgbGV0IGJnID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10cmFjay1saXN0LWJnXScpXG4gICAgICBsZXQgYWxidW1JbWcgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRyYWNrLWxpc3QtaW1nXScpXG5cbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICB0aGlzLmNsaWNrRWZ4LmN1cnJlbnRUaW1lID0gMFxuICAgICAgICB0aGlzLmNsaWNrRWZ4LnBsYXkoKVxuICAgICAgICBnc2FwLnRvKGJnLCB7IGNsaXBQYXRoOiAncG9seWdvbigwJSAwJSwgMTAwJSAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgICBnc2FwLnRvKGFsYnVtSW1nLCB7IGNsaXBQYXRoOiAncG9seWdvbigwJSAwJSwgMTAwJSAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgfSlcblxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIGdzYXAudG8oYmcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDEwMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgICBnc2FwLnRvKGFsYnVtSW1nLCB7IGNsaXBQYXRoOiAncG9seWdvbigwJSAxMDAlLCAxMDAlIDEwMCUsIDEwMCUgMTAwJSwgMCUgMTAwJSknLCBkdXJhdGlvbjogMC4zLCBlYXNlOiAnem9vbScgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGRIb3Zlckxpc3RlbmVycygpXG4gICAgdGhpcy5wbGF5TGlzdENhcmRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuaGlkZUNhcmRzKClcbiAgICB0aGlzLmhpZGVUcmFja3MoKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VMb2FkZWQnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUuZGV0YWlsLnRlbXBsYXRlID09PSAncGxheWxpc3RzJykge1xuICAgICAgICB0aGlzLmxvYWRBbmltYXRpb25zKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAvLyBjYWxsIHRoZSBzYW1lIGJlZm9yZU5hdmlnYXRlIGxvZ2ljLCBubyBjYXJkIGluIHRoaXMgY2FzZVxuICAgICAgYXdhaXQgdGhpcy5iZWZvcmVOYXZpZ2F0ZShudWxsLCB1cmwpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVOYXZpZ2F0aW9uKHVybCwgeyByZXBsYWNlU3RhdGU6IHRydWUgfSk7XG4gICAgICBhd2FpdCB0aGlzLmFmdGVyTmF2aWdhdGVBbmltYXRpb25zKCk7XG4gICAgfSlcbiAgfVxufSIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImE3MTgxMzc1NWJlNDBjYWM5NzQ2XCIpIl0sIm5hbWVzIjpbIlBhZ2UiLCJnc2FwIiwiU2Nyb2xsVHJpZ2dlciIsIkN1c3RvbUVhc2UiLCJGbGlwIiwic2Nyb2xsIiwiU2Nyb2xsVG9QbHVnaW4iLCJTcGxpdFRleHQiLCJQbGF5bGlzdHMiLCJjb25zdHJ1Y3RvciIsImlkIiwiZWxlbWVudHMiLCJ0cmFja0xpc3QiLCJ0cmFja0xpc3RJdGVtcyIsInBsYXlsaXN0R3JvdXAiLCJwbGF5bGlzdENhcmRzIiwicGFnZVRyaWdnZXIiLCJtYWluVGl0bGUiLCJwbGF5bGlzdENhcmRNZXRhIiwiaGVybyIsImNvbnRhaW5lciIsInBhZ2VDb250YWluZXIiLCJyZWdpc3RlclBsdWdpbiIsImNyZWF0ZSIsImNsaWNrRWZ4IiwiQXVkaW8iLCJ0bCIsInRpbWVsaW5lIiwiaW5pdCIsImxvYWRBbmltYXRpb25zIiwidmlld1BhZ2VUeXBlIiwiYW5pbWF0ZUNhcmRzSW5WaWV3Iiwic2Nyb2xsQ2FyZEFuaW1hdGlvbnMiLCJ0byIsIm9wYWNpdHkiLCJwb2ludGVyRXZlbnRzIiwiZHVyYXRpb24iLCJlYXNlIiwic3RhZ2dlciIsInVwZGF0ZUluZGljYXRvciIsInRhcmdldEVsIiwicGxheWxpc3RTY3JvbGwiLCJzY3JvbGxSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidGFyZ2V0UmVjdCIsImRlbHRhWCIsImxlZnQiLCJ0YXJnZXRYIiwieCIsImNhcmRzIiwibGVuZ3RoIiwic2V0IiwiaSIsImVsIiwiZGF0YXNldCIsImFuaW1hdGVkIiwiYW5pbWF0ZUJhdGNoIiwiYmF0Y2giLCJmcm9tVG8iLCJvblN0YXJ0IiwiZm9yRWFjaCIsImNhcmQiLCJvbkVudGVyIiwiZmlsdGVyIiwic3RhcnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVmcmVzaCIsImluVmlld0NhcmRzIiwiQXJyYXkiLCJmcm9tIiwicmVjdCIsInRvcCIsImlubmVySGVpZ2h0IiwibG9ja1Njcm9sbCIsImxvY2siLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIm92ZXJmbG93Iiwic3RvcCIsImRldGFpbFBhZ2VUcmFuc2l0aW9uT3V0Iiwic3BsaXRUZXh0IiwicXVlcnlTZWxlY3RvckFsbCIsInRyYWNrTGlzdFNlY3Rpb24iLCJkaXZzIiwieVBlcmNlbnQiLCJvbkNvbXBsZXRlIiwicmVtb3ZlIiwiYWRkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJncmlkUGFnZVRyYW5zaXRpb25PdXQiLCJncmlkRWwiLCJtYWluVGl0bGVTZWN0aW9uIiwibWV0YSIsIm1haW5UaXRsZU1hc2siLCJzY3JvbGxUbyIsInkiLCJjbGFzc0xpc3QiLCJzdGF0ZSIsImdldFN0YXRlIiwiYWJzb2x1dGUiLCJiZWZvcmVOYXZpZ2F0ZSIsInVybCIsImN1cnJlbnRUeXBlIiwicGF0aFNlZ21lbnRzIiwiVVJMIiwibG9jYXRpb24iLCJvcmlnaW4iLCJwYXRobmFtZSIsInNwbGl0IiwiQm9vbGVhbiIsIm5leHRUeXBlIiwidXBkYXRlUGFnZVZpZXdUeXBlIiwiZ3JpZFBhZ2VUcmFuc2l0aW9uRnJvbURldGFpbCIsImhhbmRsZU5hdmlnYXRpb24iLCJyZXBsYWNlU3RhdGUiLCJyZXMiLCJmZXRjaCIsImh0bWwiLCJ0ZXh0IiwicGFyc2VyIiwiRE9NUGFyc2VyIiwiZG9jIiwicGFyc2VGcm9tU3RyaW5nIiwibmV3SGVybyIsInF1ZXJ5U2VsZWN0b3IiLCJjdXJyZW50TWV0YSIsIm5ld01ldGFUZXh0IiwiYXBwZW5kQ2hpbGQiLCJoZXJvQ29udGFpbmVyIiwibmV3VHJhY2tMaXN0U2VjdGlvbiIsIm5ld0l0ZW1zIiwidmlzaWJpbGl0eSIsImFkZEhvdmVyTGlzdGVuZXJzIiwicGxheUxpc3RDYXJkTGlzdGVuZXJzIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsImFmdGVyTmF2aWdhdGVBbmltYXRpb25zIiwidHJhY2tTZWN0aW9uIiwicFRpdGxlcyIsInRpdGxlc0FyciIsImNsZWFyUHJvcHMiLCJ0eXBlIiwibGluZUNsYXNzIiwibWFzayIsImF1dG9TcGxpdCIsInB1c2giLCJsaW5lcyIsIml0ZW1zIiwicGFnZVZpZXdUeXBlIiwidlBhZ2VUeXBlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaHJlZiIsImhpZGVDYXJkcyIsImhpZGVUcmFja3MiLCJ1bmRlZmluZWQiLCJlbGVtZW50IiwiYmciLCJhbGJ1bUltZyIsImN1cnJlbnRUaW1lIiwicGxheSIsImNsaXBQYXRoIiwiZGV0YWlsIiwidGVtcGxhdGUiXSwic291cmNlUm9vdCI6IiJ9
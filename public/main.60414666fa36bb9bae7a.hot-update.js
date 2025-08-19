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
        hero: '[data-hero]'
      }
    });
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_3__.ScrollTrigger, gsap_CustomEase__WEBPACK_IMPORTED_MODULE_4__.CustomEase, gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip, gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_6__.ScrollToPlugin);
    gsap_CustomEase__WEBPACK_IMPORTED_MODULE_4__.CustomEase.create('zoom', '0.71, 0, 0.06, 1');
    this.clickEfx = new Audio('/click.mp3');
    this.scroll = utils_LenisScroll__WEBPACK_IMPORTED_MODULE_1__.scroll;
    this.init();
  }
  l;
  lockScroll(lock = true) {
    document.body.style.overflow = lock ? 'hidden' : '';
    lock ? this.scroll.stop() : this.scroll.start();
  }
  beforeNavigate(linkEl) {
    const gridEl = this.elements.playlistGroup;
    const cards = Array.from(this.elements.playlistCards || []);
    const mainTitleSection = this.elements.hero;
    const meta = this.elements.playlistCardMeta;
    const mainTitleMask = this.elements.mainTitle.querySelectorAll('div > div');
    if (!gridEl || !cards.length || !linkEl) return Promise.resolve();
    console.log(mainTitleMask);
    return new Promise(resolve => {
      let tl = gsap__WEBPACK_IMPORTED_MODULE_2__["default"].timeline();
      this.lockScroll(true);
      tl.to(meta, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      tl.to(window, {
        scrollTo: {
          y: 0
        },
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          gsap__WEBPACK_IMPORTED_MODULE_2__["default"].set(gridEl, {
            height: Math.max(gridEl.offsetHeight, window.innerHeight)
          });
        }
      });
      tl.to(mainTitleMask, {
        yPercent: 100,
        duration: 0.6,
        ease: 'zoom',
        onComplete: () => {
          if (mainTitleSection) mainTitleSection.remove();
          const state = gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.getState(cards, {
            absolute: true
          });
          gridEl.classList.add('playlist-group--row');
          gsap_Flip__WEBPACK_IMPORTED_MODULE_5__.Flip.from(state, {
            duration: 0.6,
            ease: 'zoom',
            absolute: true,
            onComplete: () => {
              resolve();
            }
          });
        }
      }, '-=0.2');
    });
  }
  async handleNavigation(url, {
    replaceState = false
  } = {}) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Inject hero section
      const newHero = doc.querySelector('[data-hero]');
      if (newHero) {
        this.elements.playlistGroup.insertAdjacentElement('afterend', newHero);
      }

      // Inject track list section
      const newTrackListSection = doc.querySelector('[data-playlist-tracks]');
      if (newTrackListSection) {
        newHero.insertAdjacentElement('afterend', newTrackListSection);
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

      // Run after navigation animations
      this.afterNavigateAnimations();
    } catch (err) {
      console.error('Playlist navigation error:', err);
    }
  }
  afterNavigateAnimations() {
    const splitTextEls = document.querySelectorAll('[data-split-text]');
    splitTextEls.forEach(el => {
      const text = el.textContent;
      el.innerHTML = text.split('').map(ch => `<span>${ch}</span>`).join('');
    });

    // Animate text in
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].fromTo(splitTextEls, {
      yPercent: -100
    }, {
      yPercent: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.02
    });

    // Delay then fade in track items
    if (this.elements.trackListItems) {
      gsap__WEBPACK_IMPORTED_MODULE_2__["default"].fromTo(this.elements.trackListItems, {
        opacity: 0,
        y: 10
      }, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        delay: 0.2
      });
    }

    // Unlock scroll after animations
    gsap__WEBPACK_IMPORTED_MODULE_2__["default"].delayedCall(1.2, () => this.lockScroll(false));
  }
  playListCardListeners() {
    const cards = Array.from(document.querySelectorAll('[data-playlist-trigger]') || []);
    cards.forEach(card => {
      card.addEventListener('click', async e => {
        e.preventDefault();
        await this.beforeNavigate(card);
        const url = card.href;
        //this.handleNavigation(url)
      });
    });
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
  }
}

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1755618012232
        var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"publicPath":""});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9601aeb9429c99141650")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0VBRUE5QixJQUFJQSxDQUFBLEVBQUc7SUFDTCxJQUFJLENBQUMrRCxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3hCLElBQUksQ0FBQ0MscUJBQXFCLENBQUMsQ0FBQztFQUM5QjtBQUNGLEM7Ozs7Ozs7Ozs7O0FDeE1BO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFPLENBQUMseUpBQTBFLGNBQWMsZ0JBQWdCO0FBQ3hJO0FBQ0E7QUFDQSxVQUFVLFVBQVU7QUFDcEIsVUFBVSxVQUFVO0FBQ3BCLFVBQVUsVUFBVTtBQUNwQjtBQUNBLFVBQVUsVUFBVTtBQUNwQixVQUFVO0FBQ1YsVUFBVSxpQkFBaUI7QUFDM0I7QUFDQSxRQUFRLFVBQVU7QUFDbEI7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxFOzs7Ozs7OztVQ3ZCQSxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL3Jvb20xODcvLi9hcHAvcGFnZXMvUGxheWxpc3RzL2luZGV4LmpzIiwid2VicGFjazovL3Jvb20xODcvLi9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9yb29tMTg3L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZSBmcm9tICdjbGFzc2VzL1BhZ2UnXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xuaW1wb3J0IHsgU2Nyb2xsVHJpZ2dlciB9IGZyb20gJ2dzYXAvU2Nyb2xsVHJpZ2dlcidcbmltcG9ydCB7IEN1c3RvbUVhc2UgfSBmcm9tICdnc2FwL0N1c3RvbUVhc2UnXG5pbXBvcnQgeyBGbGlwIH0gZnJvbSAnZ3NhcC9GbGlwJ1xuaW1wb3J0IHsgc2Nyb2xsIH0gZnJvbSAndXRpbHMvTGVuaXNTY3JvbGwnXG5pbXBvcnQgeyBTY3JvbGxUb1BsdWdpbiB9IGZyb20gJ2dzYXAvU2Nyb2xsVG9QbHVnaW4nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlsaXN0cyBleHRlbmRzIFBhZ2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBpZDogJ3BsYXlsaXN0cycsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICB0cmFja0xpc3Q6ICdbZGF0YS10cmFjay1saXN0XScsXG4gICAgICAgIHRyYWNrTGlzdEl0ZW1zOiAnW2RhdGEtdHJhY2stbGlzdC1pdGVtXScsXG4gICAgICAgIHBsYXlsaXN0R3JvdXA6ICdbZGF0YS1wbGF5bGlzdC1ncm91cF0nLFxuICAgICAgICBwbGF5bGlzdENhcmRzOiAnW2RhdGEtcGxheWxpc3QtY2FyZF0nLFxuICAgICAgICBwYWdlVHJpZ2dlcjogJ1tkYXRhLXBsYXlsaXN0LXRyaWdnZXJdJyxcbiAgICAgICAgbWFpblRpdGxlOiAnW2RhdGEtbWFpbi10aXRsZV0nLFxuICAgICAgICBwbGF5bGlzdENhcmRNZXRhOiAnW2RhdGEtcGxheWxpc3QtbWV0YV0nLCBcbiAgICAgICAgaGVybzogJ1tkYXRhLWhlcm9dJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIEN1c3RvbUVhc2UsIEZsaXAsIFNjcm9sbFRvUGx1Z2luKVxuICAgIEN1c3RvbUVhc2UuY3JlYXRlKCd6b29tJywgJzAuNzEsIDAsIDAuMDYsIDEnKVxuXG4gICAgdGhpcy5jbGlja0VmeCA9IG5ldyBBdWRpbygnL2NsaWNrLm1wMycpXG4gICAgdGhpcy5zY3JvbGwgPSBzY3JvbGxcblxuICAgIHRoaXMuaW5pdCgpXG4gIH1sXG5cbiAgbG9ja1Njcm9sbChsb2NrID0gdHJ1ZSkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBsb2NrID8gJ2hpZGRlbicgOiAnJ1xuICAgIGxvY2s/IHRoaXMuc2Nyb2xsLnN0b3AoKSA6IHRoaXMuc2Nyb2xsLnN0YXJ0KClcbiAgfVxuXG4gIGJlZm9yZU5hdmlnYXRlKGxpbmtFbCkge1xuICAgIGNvbnN0IGdyaWRFbCA9IHRoaXMuZWxlbWVudHMucGxheWxpc3RHcm91cFxuICAgIGNvbnN0IGNhcmRzID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHMgfHwgW10pXG4gICAgY29uc3QgbWFpblRpdGxlU2VjdGlvbiA9IHRoaXMuZWxlbWVudHMuaGVyb1xuICAgIGNvbnN0IG1ldGEgPSB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZE1ldGFcbiAgICBjb25zdCBtYWluVGl0bGVNYXNrID0gdGhpcy5lbGVtZW50cy5tYWluVGl0bGUucXVlcnlTZWxlY3RvckFsbCgnZGl2ID4gZGl2JylcblxuICAgIGlmICghZ3JpZEVsIHx8ICFjYXJkcy5sZW5ndGggfHwgIWxpbmtFbCkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cbiAgICBjb25zb2xlLmxvZyhtYWluVGl0bGVNYXNrKSAgXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGxldCB0bCA9IGdzYXAudGltZWxpbmUoKVxuICAgICAgdGhpcy5sb2NrU2Nyb2xsKHRydWUpXG5cbiAgICAgIHRsLnRvKG1ldGEsIHsgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNCwgZWFzZTogXCJwb3dlcjIub3V0XCJ9KVxuICAgICAgXG4gICAgICB0bC50byh3aW5kb3csIHtcbiAgICAgICAgc2Nyb2xsVG86IHsgeTogMCB9LFxuICAgICAgICBkdXJhdGlvbjogMC44LFxuICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICBnc2FwLnNldChncmlkRWwsIHsgaGVpZ2h0OiBNYXRoLm1heChncmlkRWwub2Zmc2V0SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQpIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHRsLnRvKG1haW5UaXRsZU1hc2ssIFxuICAgICAgICB7IFxuICAgICAgICAgIHlQZXJjZW50OiAxMDAsXG4gICAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgICBlYXNlOiAnem9vbScsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1haW5UaXRsZVNlY3Rpb24pIG1haW5UaXRsZVNlY3Rpb24ucmVtb3ZlKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBGbGlwLmdldFN0YXRlKGNhcmRzLCB7IGFic29sdXRlOiB0cnVlIH0pXG5cbiAgICAgICAgICAgIGdyaWRFbC5jbGFzc0xpc3QuYWRkKCdwbGF5bGlzdC1ncm91cC0tcm93JylcblxuICAgICAgICAgICAgRmxpcC5mcm9tKHN0YXRlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgICAgICAgIGVhc2U6ICd6b29tJyxcbiAgICAgICAgICAgICAgYWJzb2x1dGU6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkgXG4gICAgICAgICAgfVxuICAgICAgICB9LCBcbiAgICAgICctPTAuMicpXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZU5hdmlnYXRpb24odXJsLCB7IHJlcGxhY2VTdGF0ZSA9IGZhbHNlIH0gPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgICBjb25zdCBodG1sID0gYXdhaXQgcmVzLnRleHQoKVxuICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKVxuXG4gICAgICAvLyBJbmplY3QgaGVybyBzZWN0aW9uXG4gICAgICBjb25zdCBuZXdIZXJvID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlcm9dJylcbiAgICAgIGlmIChuZXdIZXJvKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMucGxheWxpc3RHcm91cC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgbmV3SGVybylcbiAgICAgIH1cblxuICAgICAgLy8gSW5qZWN0IHRyYWNrIGxpc3Qgc2VjdGlvblxuICAgICAgY29uc3QgbmV3VHJhY2tMaXN0U2VjdGlvbiA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wbGF5bGlzdC10cmFja3NdJylcbiAgICAgIGlmIChuZXdUcmFja0xpc3RTZWN0aW9uKSB7XG4gICAgICAgIG5ld0hlcm8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIG5ld1RyYWNrTGlzdFNlY3Rpb24pXG4gICAgICB9XG5cbiAgICAgIC8vIFJlZnJlc2ggZWxlbWVudCByZWZlcmVuY2VzXG4gICAgICB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhY2stbGlzdC1pdGVtXScpXG4gICAgICB0aGlzLmVsZW1lbnRzLnBsYXlsaXN0Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbGF5bGlzdC1jYXJkXScpXG4gICAgICB0aGlzLmVsZW1lbnRzLnBhZ2VUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWxpc3QtdHJpZ2dlcl0nKVxuICAgICAgdGhpcy5lbGVtZW50cy5tYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tYWluLXRpdGxlXScpXG5cbiAgICAgIHRoaXMuYWRkSG92ZXJMaXN0ZW5lcnMoKVxuICAgICAgdGhpcy5wbGF5TGlzdENhcmRMaXN0ZW5lcnMoKVxuXG4gICAgICBpZiAocmVwbGFjZVN0YXRlKSB7XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgdXJsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCB1cmwpXG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biBhZnRlciBuYXZpZ2F0aW9uIGFuaW1hdGlvbnNcbiAgICAgIHRoaXMuYWZ0ZXJOYXZpZ2F0ZUFuaW1hdGlvbnMoKVxuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdQbGF5bGlzdCBuYXZpZ2F0aW9uIGVycm9yOicsIGVycilcbiAgICB9XG4gIH1cblxuICBhZnRlck5hdmlnYXRlQW5pbWF0aW9ucygpIHtcbiAgICBjb25zdCBzcGxpdFRleHRFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcGxpdC10ZXh0XScpXG4gICAgc3BsaXRUZXh0RWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGVsLnRleHRDb250ZW50XG4gICAgICBlbC5pbm5lckhUTUwgPSB0ZXh0LnNwbGl0KCcnKS5tYXAoY2ggPT4gYDxzcGFuPiR7Y2h9PC9zcGFuPmApLmpvaW4oJycpXG4gICAgfSlcblxuICAgIC8vIEFuaW1hdGUgdGV4dCBpblxuICAgIGdzYXAuZnJvbVRvKHNwbGl0VGV4dEVscywgXG4gICAgICB7IHlQZXJjZW50OiAtMTAwIH0sIFxuICAgICAgeyB5UGVyY2VudDogMCwgZHVyYXRpb246IDAuNSwgZWFzZTogJ3Bvd2VyMi5vdXQnLCBzdGFnZ2VyOiAwLjAyIH1cbiAgICApXG5cbiAgICAvLyBEZWxheSB0aGVuIGZhZGUgaW4gdHJhY2sgaXRlbXNcbiAgICBpZiAodGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcykge1xuICAgICAgZ3NhcC5mcm9tVG8odGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcyxcbiAgICAgICAgeyBvcGFjaXR5OiAwLCB5OiAxMCB9LFxuICAgICAgICB7IG9wYWNpdHk6IDEsIHk6IDAsIGR1cmF0aW9uOiAwLjMsIHN0YWdnZXI6IDAuMDUsIGRlbGF5OiAwLjIgfVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIFVubG9jayBzY3JvbGwgYWZ0ZXIgYW5pbWF0aW9uc1xuICAgIGdzYXAuZGVsYXllZENhbGwoMS4yLCAoKSA9PiB0aGlzLmxvY2tTY3JvbGwoZmFsc2UpKVxuICB9XG5cbiAgcGxheUxpc3RDYXJkTGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGNhcmRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbGF5bGlzdC10cmlnZ2VyXScpIHx8IFtdKVxuXG4gICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgYXdhaXQgdGhpcy5iZWZvcmVOYXZpZ2F0ZShjYXJkKVxuICAgICAgICBjb25zdCB1cmwgPSBjYXJkLmhyZWZcbiAgICAgICAgLy90aGlzLmhhbmRsZU5hdmlnYXRpb24odXJsKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgYWRkSG92ZXJMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zKSByZXR1cm5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMubGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgID8gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zKVxuICAgICAgOiBbdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtc11cblxuICAgIGl0ZW1zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBsZXQgYmcgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRyYWNrLWxpc3QtYmddJylcbiAgICAgIGxldCBhbGJ1bUltZyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdHJhY2stbGlzdC1pbWddJylcblxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgIHRoaXMuY2xpY2tFZnguY3VycmVudFRpbWUgPSAwXG4gICAgICAgIHRoaXMuY2xpY2tFZngucGxheSgpXG4gICAgICAgIGdzYXAudG8oYmcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDAlLCAxMDAlIDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICAgIGdzYXAudG8oYWxidW1JbWcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDAlLCAxMDAlIDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICB9KVxuXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgZ3NhcC50byhiZywgeyBjbGlwUGF0aDogJ3BvbHlnb24oMCUgMTAwJSwgMTAwJSAxMDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpJywgZHVyYXRpb246IDAuMywgZWFzZTogJ3pvb20nIH0pXG4gICAgICAgIGdzYXAudG8oYWxidW1JbWcsIHsgY2xpcFBhdGg6ICdwb2x5Z29uKDAlIDEwMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKScsIGR1cmF0aW9uOiAwLjMsIGVhc2U6ICd6b29tJyB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkZEhvdmVyTGlzdGVuZXJzKClcbiAgICB0aGlzLnBsYXlMaXN0Q2FyZExpc3RlbmVycygpXG4gIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsb2NhbHNKc29uU3RyaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyAxNzU1NjE4MDEyMjMyXG4gICAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wicHVibGljUGF0aFwiOlwiXCJ9KTtcbiAgICAgICAgLy8gb25seSBpbnZhbGlkYXRlIHdoZW4gbG9jYWxzIGNoYW5nZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhICYmXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhLnZhbHVlICYmXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhLnZhbHVlICE9PSBsb2NhbHNKc29uU3RyaW5nXG4gICAgICAgICkge1xuICAgICAgICAgIG1vZHVsZS5ob3QuaW52YWxpZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBkYXRhLnZhbHVlID0gbG9jYWxzSnNvblN0cmluZztcbiAgICAgICAgICBjc3NSZWxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiOTYwMWFlYjk0MjljOTkxNDE2NTBcIikiXSwibmFtZXMiOlsiUGFnZSIsImdzYXAiLCJTY3JvbGxUcmlnZ2VyIiwiQ3VzdG9tRWFzZSIsIkZsaXAiLCJzY3JvbGwiLCJTY3JvbGxUb1BsdWdpbiIsIlBsYXlsaXN0cyIsImNvbnN0cnVjdG9yIiwiaWQiLCJlbGVtZW50cyIsInRyYWNrTGlzdCIsInRyYWNrTGlzdEl0ZW1zIiwicGxheWxpc3RHcm91cCIsInBsYXlsaXN0Q2FyZHMiLCJwYWdlVHJpZ2dlciIsIm1haW5UaXRsZSIsInBsYXlsaXN0Q2FyZE1ldGEiLCJoZXJvIiwicmVnaXN0ZXJQbHVnaW4iLCJjcmVhdGUiLCJjbGlja0VmeCIsIkF1ZGlvIiwiaW5pdCIsImwiLCJsb2NrU2Nyb2xsIiwibG9jayIsImRvY3VtZW50IiwiYm9keSIsInN0eWxlIiwib3ZlcmZsb3ciLCJzdG9wIiwic3RhcnQiLCJiZWZvcmVOYXZpZ2F0ZSIsImxpbmtFbCIsImdyaWRFbCIsImNhcmRzIiwiQXJyYXkiLCJmcm9tIiwibWFpblRpdGxlU2VjdGlvbiIsIm1ldGEiLCJtYWluVGl0bGVNYXNrIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29uc29sZSIsImxvZyIsInRsIiwidGltZWxpbmUiLCJ0byIsIm9wYWNpdHkiLCJkdXJhdGlvbiIsImVhc2UiLCJ3aW5kb3ciLCJzY3JvbGxUbyIsInkiLCJvbkNvbXBsZXRlIiwic2V0IiwiaGVpZ2h0IiwiTWF0aCIsIm1heCIsIm9mZnNldEhlaWdodCIsImlubmVySGVpZ2h0IiwieVBlcmNlbnQiLCJyZW1vdmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYWJzb2x1dGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJoYW5kbGVOYXZpZ2F0aW9uIiwidXJsIiwicmVwbGFjZVN0YXRlIiwicmVzIiwiZmV0Y2giLCJodG1sIiwidGV4dCIsInBhcnNlciIsIkRPTVBhcnNlciIsImRvYyIsInBhcnNlRnJvbVN0cmluZyIsIm5ld0hlcm8iLCJxdWVyeVNlbGVjdG9yIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwibmV3VHJhY2tMaXN0U2VjdGlvbiIsImFkZEhvdmVyTGlzdGVuZXJzIiwicGxheUxpc3RDYXJkTGlzdGVuZXJzIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImFmdGVyTmF2aWdhdGVBbmltYXRpb25zIiwiZXJyIiwiZXJyb3IiLCJzcGxpdFRleHRFbHMiLCJmb3JFYWNoIiwiZWwiLCJ0ZXh0Q29udGVudCIsImlubmVySFRNTCIsInNwbGl0IiwibWFwIiwiY2giLCJqb2luIiwiZnJvbVRvIiwic3RhZ2dlciIsImRlbGF5IiwiZGVsYXllZENhbGwiLCJjYXJkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhyZWYiLCJpdGVtcyIsInVuZGVmaW5lZCIsImVsZW1lbnQiLCJiZyIsImFsYnVtSW1nIiwiY3VycmVudFRpbWUiLCJwbGF5IiwiY2xpcFBhdGgiXSwic291cmNlUm9vdCI6IiJ9
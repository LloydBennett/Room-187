"use strict";
self["webpackHotUpdateroom187"]("main",{

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_LenisScroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/LenisScroll */ "./app/utils/LenisScroll.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");
/* harmony import */ var classes_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classes/Page */ "./app/classes/Page.js");
/* harmony import */ var pages_About__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pages/About */ "./app/pages/About/index.js");
/* harmony import */ var pages_Home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pages/Home */ "./app/pages/Home/index.js");
/* harmony import */ var pages_Gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pages/Gallery */ "./app/pages/Gallery/index.js");
/* harmony import */ var _pages_Contact__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/Contact */ "./app/pages/Contact/index.js");
/* harmony import */ var _pages_Playlists__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/Playlists */ "./app/pages/Playlists/index.js");
/* harmony import */ var components_Navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Navigation */ "./app/components/Navigation.js");
/* harmony import */ var components_TextSplit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components/TextSplit */ "./app/components/TextSplit.js");
/* harmony import */ var _components_VideoPlayer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/VideoPlayer */ "./app/components/VideoPlayer.js");
/* harmony import */ var _components_Stats__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Stats */ "./app/components/Stats.js");
/* harmony import */ var _components_Hero__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Hero */ "./app/components/Hero.js");
/* harmony import */ var _components_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/tooltip */ "./app/components/tooltip.js");
/* harmony import */ var _components_SubscriptionForm__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/SubscriptionForm */ "./app/components/SubscriptionForm.js");
















class App {
  constructor() {
    this.lenisScroll = utils_LenisScroll__WEBPACK_IMPORTED_MODULE_0__.scroll;
    this.isFirstVisit;
    this.bootstrap();
    this.createNavigation();
  }
  setUpScrollTrigger() {
    gsap__WEBPACK_IMPORTED_MODULE_14__["default"].registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_15__.ScrollTrigger);

    // Bail out if we're on mobile (dummy Lenis object)
    if (this.lenisScroll.__isDummy) {
      // Let ScrollTrigger use native scroll
      return;
    }
    this.lenisScroll.on('scroll', gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_15__.ScrollTrigger.update);
    gsap__WEBPACK_IMPORTED_MODULE_14__["default"].ticker.add(time => {
      this.lenisScroll.raf(time * 1000);
    });
    gsap__WEBPACK_IMPORTED_MODULE_14__["default"].ticker.lagSmoothing(0);
  }
  createVideoPlayer() {
    this.videoPlayer = new _components_VideoPlayer__WEBPACK_IMPORTED_MODULE_9__["default"]();
  }
  createStats() {
    this.stats = new _components_Stats__WEBPACK_IMPORTED_MODULE_10__["default"]();
  }
  createHero() {
    this.hero = new _components_Hero__WEBPACK_IMPORTED_MODULE_11__["default"]();
  }
  addSplitText() {
    this.textSplit = new components_TextSplit__WEBPACK_IMPORTED_MODULE_8__["default"]();
  }
  createPreloader() {
    this.preloader = new Preloader();
  }
  createTooltip() {
    this.tooltip = new _components_tooltip__WEBPACK_IMPORTED_MODULE_12__["default"]();
  }
  createNavigation() {
    this.navigation = new components_Navigation__WEBPACK_IMPORTED_MODULE_7__["default"]();
  }
  createContent() {
    this.content = document.querySelector('.main');
    this.template = this.content.getAttribute('data-page');
  }
  createSubscriptionForm() {
    this.subscriptionForm = new _components_SubscriptionForm__WEBPACK_IMPORTED_MODULE_13__["default"]();
  }
  async initPages() {
    const pageClasses = {
      home: pages_Home__WEBPACK_IMPORTED_MODULE_3__["default"],
      about: pages_About__WEBPACK_IMPORTED_MODULE_2__["default"],
      gallery: pages_Gallery__WEBPACK_IMPORTED_MODULE_4__["default"],
      contact: _pages_Contact__WEBPACK_IMPORTED_MODULE_5__["default"],
      playlists: _pages_Playlists__WEBPACK_IMPORTED_MODULE_6__["default"]
    };
    const id = this.template;
    const PageClass = pageClasses[id] || classes_Page__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.isFirstVisit = this.isFirstVisit === undefined;
    this.page = new PageClass();
    await this.page.show(this.isFirstVisit);
    this.isFirstVisit = false;
    window.dispatchEvent(new CustomEvent('pageLoaded', {
      detail: {
        page: this.page,
        template: this.template
      }
    }));
  }
  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false
    });
  }
  async onChange({
    url,
    push = true
  }) {
    const animations = this.page && this.page.hide ? [this.page.hide()] : [];
    const req = await window.fetch(url);
    if (this.navigation.isOpen) {
      new Promise(resolve => {
        setTimeout(() => {
          this.navigation.closeMenu();
          resolve();
        }, 300);
      });
    }
    await Promise.all(animations);
    if (req.status === 200) {
      const html = await req.text();
      const div = document.createElement('div');
      if (push) {
        window.history.pushState({}, "", url);
      }
      div.innerHTML = html;
      const title = document.querySelector('title');
      const newTitleText = div.querySelector('title').innerText;
      title.innerHTML = newTitleText;
      this.createNewPage(div);
      await this.init();
    } else {
      console.log('Error loading page!');
    }
  }
  createNewPage(div) {
    const body = document.querySelector('body');
    const divContent = div.querySelector('.main');
    const loaderHero = document.querySelector('[data-loader-hero]');
    const loaderImg = document.querySelector('[data-loader-image] [data-bg]');
    const newList = divContent.classList;
    this.content.classList.remove(this.template);
    this.content.classList.add(...newList);
    this.template = divContent.getAttribute('data-page');
    this.content.setAttribute('data-page', this.template);
    if (this.template === "playlists") {
      this.content.setAttribute('data-page-view-type', 'grid');
    } else {
      this.content.removeAttribute('data-page-view-type');
    }
    if (this.template !== "error") {
      if (body.classList.contains('error')) {
        body.classList.remove('error');
      }
    } else {
      body.classList.add('error');
    }
    this.content.innerHTML = divContent.innerHTML;
    let newImg = this.content.querySelector('[data-image-hero] [data-bg]');
    if (newImg) {
      let style = window.getComputedStyle(newImg);
      let backgroundImage = style.backgroundImage;
      let url = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      loaderImg.style.backgroundImage = `url("${url}")`;
      if (loaderHero.classList.contains('hidden')) {
        loaderHero.classList.remove('hidden');
      }
    } else {
      if (!loaderImg.classList.contains('hidden')) {
        loaderHero.classList.add('hidden');
      }
    }
  }
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this));
  }
  async bootstrap() {
    this.setUpScrollTrigger();
    await this.init();
  }
  addLinkListeners() {
    const links = document.querySelectorAll('[data-page-trigger]');
    links.forEach(l => {
      l.onclick = event => {
        event.preventDefault();
        const href = l.href;
        this.transitionType = l.dataset.pageTrigger;
        if (href === window.location.href) return;
        this.onChange({
          url: href
        });
      };
    });
  }
  async init() {
    this.addSplitText();
    this.createContent();
    await this.initPages();
    this.addLinkListeners();
    this.createVideoPlayer();
    this.createStats();
    this.createHero();
    this.createTooltip();
    this.createSubscriptionForm();
  }
}
new App();

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1391ce071c995d58629c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lYzQwM2YzZDgyOTYwY2EwYzJlNi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQ25CO0FBQzJCO0FBQ25CO0FBQ0E7QUFDRjtBQUNNO0FBQ0U7QUFDSTtBQUNLO0FBQ0Y7QUFDTTtBQUNaO0FBQ0Y7QUFDTTtBQUNrQjtBQUU1RCxNQUFNZ0IsR0FBRyxDQUFDO0VBQ1JDLFdBQVdBLENBQUEsRUFBRztJQUNaLElBQUksQ0FBQ0MsV0FBVyxHQUFHbEIscURBQU07SUFDekIsSUFBSSxDQUFDbUIsWUFBWTtJQUNqQixJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUMsQ0FBQztFQUN6QjtFQUVBQyxrQkFBa0JBLENBQUEsRUFBRztJQUNuQnJCLDZDQUFJLENBQUNzQixjQUFjLENBQUNyQiw4REFBYSxDQUFDOztJQUVqQztJQUNELElBQUksSUFBSSxDQUFDZ0IsV0FBVyxDQUFDTSxTQUFTLEVBQUU7TUFDOUI7TUFDQTtJQUNGO0lBRUEsSUFBSSxDQUFDTixXQUFXLENBQUNPLEVBQUUsQ0FBQyxRQUFRLEVBQUV2Qiw4REFBYSxDQUFDd0IsTUFBTSxDQUFDO0lBRW5EekIsNkNBQUksQ0FBQzBCLE1BQU0sQ0FBQ0MsR0FBRyxDQUFFQyxJQUFJLElBQUs7TUFDeEIsSUFBSSxDQUFDWCxXQUFXLENBQUNZLEdBQUcsQ0FBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRjVCLDZDQUFJLENBQUMwQixNQUFNLENBQUNJLFlBQVksQ0FBQyxDQUFDLENBQUM7RUFDN0I7RUFFQUMsaUJBQWlCQSxDQUFBLEVBQUc7SUFDbEIsSUFBSSxDQUFDQyxXQUFXLEdBQUcsSUFBSXRCLCtEQUFXLENBQUMsQ0FBQztFQUN0QztFQUVBdUIsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osSUFBSSxDQUFDQyxLQUFLLEdBQUcsSUFBSXZCLDBEQUFLLENBQUMsQ0FB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TUFDbkJBLENBQUMsQ0FBQ0MsT0FBTyxHQUFHQyxLQUFLLElBQUk7UUFDbkJBLEtBQUssQ0FBQ0MsY0FBYyxDQUFDLENBQUM7UUFDdEIsTUFBTUMsSUFBSSxHQUFHSixDQUFDLENBQUNJLElBQUk7UUFDbkIsSUFBSSxDQUFDQyxjQUFjLEdBQUdMLENBQUMsQ0FBQ00sT0FBTyxDQUFDQyxXQUFXO1FBQzNDLElBQUdILElBQUksS0FBSzdELE1BQU0sQ0FBQ08sUUFBUSxDQUFDc0QsSUFBSSxFQUFFO1FBQ2xDLElBQUksQ0FBQ3hELFFBQVEsQ0FBQztVQUFFQyxHQUFHLEVBQUV1RDtRQUFLLENBQUMsQ0FBQztNQUM5QixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0VBQ0o7RUFFQSxNQUFNN0IsSUFBSUEsQ0FBQSxFQUFHO0lBQ1gsSUFBSSxDQUFDNUQsWUFBWSxDQUFDLENBQUM7SUFDbkIsSUFBSSxDQUFDUSxhQUFhLENBQUMsQ0FBQztJQUNwQixNQUFNLElBQUksQ0FBQ1EsU0FBUyxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDaUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QixJQUFJLENBQUN2RixpQkFBaUIsQ0FBQyxDQUFDO0lBQ3hCLElBQUksQ0FBQ0UsV0FBVyxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDRSxVQUFVLENBQUMsQ0FBQztJQUNqQixJQUFJLENBQUNPLGFBQWEsQ0FBQyxDQUFDO0lBQ3BCLElBQUksQ0FBQ1Msc0JBQXNCLENBQUMsQ0FBQztFQUMvQjtBQUNGO0FBRUEsSUFBSXBDLEdBQUcsQ0FBQyxDQUFDLEM7Ozs7Ozs7O1VDM09ULHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9vbTE4Ny8uL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb29tMTg3L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzY3JvbGwgfSBmcm9tICd1dGlscy9MZW5pc1Njcm9sbCdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSAnZ3NhcC9TY3JvbGxUcmlnZ2VyJ1xuaW1wb3J0IFBhZ2UgZnJvbSAnY2xhc3Nlcy9QYWdlJ1xuaW1wb3J0IEFib3V0IGZyb20gJ3BhZ2VzL0Fib3V0J1xuaW1wb3J0IEhvbWUgZnJvbSAncGFnZXMvSG9tZSdcbmltcG9ydCBHYWxsZXJ5IGZyb20gJ3BhZ2VzL0dhbGxlcnknXG5pbXBvcnQgQ29udGFjdCBmcm9tICcuL3BhZ2VzL0NvbnRhY3QnXG5pbXBvcnQgUGxheWxpc3RzIGZyb20gJy4vcGFnZXMvUGxheWxpc3RzJ1xuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSAnY29tcG9uZW50cy9OYXZpZ2F0aW9uJ1xuaW1wb3J0IFRleHRTcGxpdCBmcm9tICdjb21wb25lbnRzL1RleHRTcGxpdCdcbmltcG9ydCBWaWRlb1BsYXllciBmcm9tICcuL2NvbXBvbmVudHMvVmlkZW9QbGF5ZXInXG5pbXBvcnQgU3RhdHMgZnJvbSAnLi9jb21wb25lbnRzL1N0YXRzJ1xuaW1wb3J0IEhlcm8gZnJvbSAnLi9jb21wb25lbnRzL0hlcm8nXG5pbXBvcnQgVG9vbHRpcCBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcCdcbmltcG9ydCBTdWJzY3JpcHRpb25Gb3JtIGZyb20gJy4vY29tcG9uZW50cy9TdWJzY3JpcHRpb25Gb3JtJ1xuXG5jbGFzcyBBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxlbmlzU2Nyb2xsID0gc2Nyb2xsXG4gICAgdGhpcy5pc0ZpcnN0VmlzaXRcbiAgICB0aGlzLmJvb3RzdHJhcCgpXG4gICAgdGhpcy5jcmVhdGVOYXZpZ2F0aW9uKClcbiAgfVxuXG4gIHNldFVwU2Nyb2xsVHJpZ2dlcigpIHtcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpXG5cbiAgICAgLy8gQmFpbCBvdXQgaWYgd2UncmUgb24gbW9iaWxlIChkdW1teSBMZW5pcyBvYmplY3QpXG4gICAgaWYgKHRoaXMubGVuaXNTY3JvbGwuX19pc0R1bW15KSB7XG4gICAgICAvLyBMZXQgU2Nyb2xsVHJpZ2dlciB1c2UgbmF0aXZlIHNjcm9sbFxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmxlbmlzU2Nyb2xsLm9uKCdzY3JvbGwnLCBTY3JvbGxUcmlnZ2VyLnVwZGF0ZSk7XG5cbiAgICBnc2FwLnRpY2tlci5hZGQoKHRpbWUpID0+IHtcbiAgICAgIHRoaXMubGVuaXNTY3JvbGwucmFmKHRpbWUgKiAxMDAwKTtcbiAgICB9KTtcblxuICAgIGdzYXAudGlja2VyLmxhZ1Ntb290aGluZygwKTtcbiAgfVxuXG4gIGNyZWF0ZVZpZGVvUGxheWVyKCkge1xuICAgIHRoaXMudmlkZW9QbGF5ZXIgPSBuZXcgVmlkZW9QbGF5ZXIoKVxuICB9XG5cbiAgY3JlYXRlU3RhdHMoKSB7XG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cygpXG4gIH1cblxuICBjcmVhdGVIZXJvKCkge1xuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKClcbiAgfVxuXG4gIGFkZFNwbGl0VGV4dCgpIHtcbiAgICB0aGlzLnRleHRTcGxpdCA9IG5ldyBUZXh0U3BsaXQoKVxuICB9XG5cbiAgY3JlYXRlUHJlbG9hZGVyKCkge1xuICAgIHRoaXMucHJlbG9hZGVyID0gbmV3IFByZWxvYWRlcigpXG4gIH1cblxuICBjcmVhdGVUb29sdGlwKCkge1xuICAgIHRoaXMudG9vbHRpcCA9IG5ldyBUb29sdGlwKClcbiAgfVxuXG4gIGNyZWF0ZU5hdmlnYXRpb24oKSB7XG4gICAgdGhpcy5uYXZpZ2F0aW9uID0gbmV3IE5hdmlnYXRpb24oKVxuICB9XG5cbiAgY3JlYXRlQ29udGVudCgpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpXG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMuY29udGVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZScpXG4gIH1cblxuICBjcmVhdGVTdWJzY3JpcHRpb25Gb3JtKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uRm9ybSA9IG5ldyBTdWJzY3JpcHRpb25Gb3JtKClcbiAgfVxuXG4gIGFzeW5jIGluaXRQYWdlcygpIHtcbiAgICBjb25zdCBwYWdlQ2xhc3NlcyA9IHtcbiAgICAgIGhvbWU6IEhvbWUsXG4gICAgICBhYm91dDogQWJvdXQsXG4gICAgICBnYWxsZXJ5OiBHYWxsZXJ5LFxuICAgICAgY29udGFjdDogQ29udGFjdCxcbiAgICAgIHBsYXlsaXN0czogUGxheWxpc3RzXG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB0aGlzLnRlbXBsYXRlXG4gICAgY29uc3QgUGFnZUNsYXNzID0gcGFnZUNsYXNzZXNbaWRdIHx8IFBhZ2VcblxuICAgIHRoaXMuaXNGaXJzdFZpc2l0ID0gdGhpcy5pc0ZpcnN0VmlzaXQgPT09IHVuZGVmaW5lZFxuXG4gICAgdGhpcy5wYWdlID0gbmV3IFBhZ2VDbGFzcygpXG5cbiAgICBhd2FpdCB0aGlzLnBhZ2Uuc2hvdyh0aGlzLmlzRmlyc3RWaXNpdClcblxuICAgIHRoaXMuaXNGaXJzdFZpc2l0ID0gZmFsc2VcblxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncGFnZUxvYWRlZCcsIHtcbiAgICAgIGRldGFpbDogeyBwYWdlOiB0aGlzLnBhZ2UsIHRlbXBsYXRlOiB0aGlzLnRlbXBsYXRlIH1cbiAgICB9KSlcbiAgfVxuXG4gIG9uUG9wU3RhdGUgKCkge1xuICAgIHRoaXMub25DaGFuZ2Uoe1xuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICBwdXNoOiBmYWxzZVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBvbkNoYW5nZSh7IHVybCwgcHVzaCA9IHRydWUgfSkge1xuICAgIGNvbnN0IGFuaW1hdGlvbnMgPSB0aGlzLnBhZ2UgJiYgdGhpcy5wYWdlLmhpZGVcbiAgPyBbdGhpcy5wYWdlLmhpZGUoKV1cbiAgOiBbXVxuICAgIFxuICAgIGNvbnN0IHJlcSA9IGF3YWl0IHdpbmRvdy5mZXRjaCh1cmwpXG5cbiAgICBpZiAodGhpcy5uYXZpZ2F0aW9uLmlzT3Blbikge1xuICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmF2aWdhdGlvbi5jbG9zZU1lbnUoKVxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9LCAzMDApXG4gICAgICB9KSAgICBcbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChhbmltYXRpb25zKVxuXG4gICAgaWYocmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBjb25zdCBodG1sID0gYXdhaXQgcmVxLnRleHQoKVxuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICAgICAgaWYocHVzaCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIHVybClcbiAgICAgIH1cbiAgICAgIFxuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWxcbiAgICAgIFxuICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpXG4gICAgICBjb25zdCBuZXdUaXRsZVRleHQgPSBkaXYucXVlcnlTZWxlY3RvcigndGl0bGUnKS5pbm5lclRleHRcbiAgICAgIHRpdGxlLmlubmVySFRNTCA9IG5ld1RpdGxlVGV4dFxuXG4gICAgICB0aGlzLmNyZWF0ZU5ld1BhZ2UoZGl2KVxuICAgICAgYXdhaXQgdGhpcy5pbml0KClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgbG9hZGluZyBwYWdlIScpXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTmV3UGFnZShkaXYpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgY29uc3QgZGl2Q29udGVudCA9IGRpdi5xdWVyeVNlbGVjdG9yKCcubWFpbicpXG4gICAgY29uc3QgbG9hZGVySGVybyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxvYWRlci1oZXJvXScpO1xuICAgIGNvbnN0IGxvYWRlckltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxvYWRlci1pbWFnZV0gW2RhdGEtYmddJylcbiAgICBjb25zdCBuZXdMaXN0ID0gZGl2Q29udGVudC5jbGFzc0xpc3RcblxuICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMudGVtcGxhdGUpXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoLi4ubmV3TGlzdClcbiAgICBcbiAgICB0aGlzLnRlbXBsYXRlID0gZGl2Q29udGVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZScpXG4gICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1wYWdlJywgdGhpcy50ZW1wbGF0ZSlcblxuICAgIGlmKHRoaXMudGVtcGxhdGUgPT09IFwicGxheWxpc3RzXCIpIHtcbiAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS12aWV3LXR5cGUnLCAnZ3JpZCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtcGFnZS12aWV3LXR5cGUnKVxuICAgIH1cblxuICAgIGlmKHRoaXMudGVtcGxhdGUgIT09IFwiZXJyb3JcIikge1xuICAgICAgaWYoYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vycm9yJykpIHtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZXJyb3InKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gZGl2Q29udGVudC5pbm5lckhUTUxcblxuICAgIGxldCBuZXdJbWcgPSB0aGlzLmNvbnRlbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaW1hZ2UtaGVyb10gW2RhdGEtYmddJylcblxuICAgIGlmKG5ld0ltZykge1xuICAgICAgbGV0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobmV3SW1nKTtcbiAgICAgIGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSBzdHlsZS5iYWNrZ3JvdW5kSW1hZ2U7XG4gICAgICBsZXQgdXJsID0gYmFja2dyb3VuZEltYWdlLnJlcGxhY2UoL151cmxcXChbXCInXT8vLCAnJykucmVwbGFjZSgvW1wiJ10/XFwpJC8sICcnKTtcbiAgICAgIGxvYWRlckltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHt1cmx9XCIpYFxuXG4gICAgICBpZihsb2FkZXJIZXJvLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcbiAgICAgICAgbG9hZGVySGVyby5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgfVxuICAgIH0gXG4gICAgZWxzZSB7XG4gICAgICBpZighbG9hZGVySW1nLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcbiAgICAgICAgbG9hZGVySGVyby5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBhZGRFdmVudExpc3RlbmVycyAoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlLmJpbmQodGhpcykpXG4gIH1cblxuICBhc3luYyBib290c3RyYXAoKSB7XG4gICAgdGhpcy5zZXRVcFNjcm9sbFRyaWdnZXIoKVxuICAgIGF3YWl0IHRoaXMuaW5pdCgpXG4gIH1cblxuICBhZGRMaW5rTGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGFnZS10cmlnZ2VyXScpXG4gICAgXG4gICAgbGlua3MuZm9yRWFjaCgobCkgPT4ge1xuICAgICAgbC5vbmNsaWNrID0gZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGhyZWYgPSBsLmhyZWZcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uVHlwZSA9IGwuZGF0YXNldC5wYWdlVHJpZ2dlclxuICAgICAgICBpZihocmVmID09PSB3aW5kb3cubG9jYXRpb24uaHJlZikgcmV0dXJuXG4gICAgICAgIHRoaXMub25DaGFuZ2UoeyB1cmw6IGhyZWYgfSlcbiAgICAgIH1cbiAgICB9KTsgXG4gIH1cblxuICBhc3luYyBpbml0KCkge1xuICAgIHRoaXMuYWRkU3BsaXRUZXh0KClcbiAgICB0aGlzLmNyZWF0ZUNvbnRlbnQoKVxuICAgIGF3YWl0IHRoaXMuaW5pdFBhZ2VzKClcbiAgICB0aGlzLmFkZExpbmtMaXN0ZW5lcnMoKVxuICAgIHRoaXMuY3JlYXRlVmlkZW9QbGF5ZXIoKVxuICAgIHRoaXMuY3JlYXRlU3RhdHMoKVxuICAgIHRoaXMuY3JlYXRlSGVybygpXG4gICAgdGhpcy5jcmVhdGVUb29sdGlwKClcbiAgICB0aGlzLmNyZWF0ZVN1YnNjcmlwdGlvbkZvcm0oKVxuICB9XG59XG5cbm5ldyBBcHAoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIxMzkxY2UwNzFjOTk1ZDU4NjI5Y1wiKSJdLCJuYW1lcyI6WyJzY3JvbGwiLCJnc2FwIiwiU2Nyb2xsVHJpZ2dlciIsIlBhZ2UiLCJBYm91dCIsIkhvbWUiLCJHYWxsZXJ5IiwiQ29udGFjdCIsIlBsYXlsaXN0cyIsIk5hdmlnYXRpb24iLCJUZXh0U3BsaXQiLCJWaWRlb1BsYXllciIsIlN0YXRzIiwiSGVybyIsIlRvb2x0aXAiLCJTdWJzY3JpcHRpb25Gb3JtIiwiQXBwIiwiY29uc3RydWN0b3IiLCJsZW5pc1Njcm9sbCIsImlzRmlyc3RWaXNpdCIsImJvb3RzdHJhcCIsImNyZWF0ZU5hdmlnYXRpb24iLCJzZXRVcFNjcm9sbFRyaWdnZXIiLCJyZWdpc3RlclBsdWdpbiIsIl9faXNEdW1teSIsIm9uIiwidXBkYXRlIiwidGlja2VyIiwiYWRkIiwidGltZSIsInJhZiIsImxhZ1Ntb290aGluZyIsImNyZWF0ZVZpZGVvUGxheWVyIiwidmlkZW9QbGF5ZXIiLCJjcmVhdGVTdGF0cyIsInN0YXRzIiwiY3JlYXRlSGVybyIsImhlcm8iLCJhZGRTcGxpdFRleHQiLCJ0ZXh0U3BsaXQiLCJjcmVhdGVQcmVsb2FkZXIiLCJwcmVsb2FkZXIiLCJQcmVsb2FkZXIiLCJjcmVhdGVUb29sdGlwIiwidG9vbHRpcCIsIm5hdmlnYXRpb24iLCJjcmVhdGVDb250ZW50IiwiY29udGVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRlbXBsYXRlIiwiZ2V0QXR0cmlidXRlIiwiY3JlYXRlU3Vic2NyaXB0aW9uRm9ybSIsInN1YnNjcmlwdGlvbkZvcm0iLCJpbml0UGFnZXMiLCJwYWdlQ2xhc3NlcyIsImhvbWUiLCJhYm91dCIsImdhbGxlcnkiLCJjb250YWN0IiwicGxheWxpc3RzIiwiaWQiLCJQYWdlQ2xhc3MiLCJ1bmRlZmluZWQiLCJwYWdlIiwic2hvdyIsIndpbmRvdyIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsIm9uUG9wU3RhdGUiLCJvbkNoYW5nZSIsInVybCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJwdXNoIiwiYW5pbWF0aW9ucyIsImhpZGUiLCJyZXEiLCJmZXRjaCIsImlzT3BlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsImNsb3NlTWVudSIsImFsbCIsInN0YXR1cyIsImh0bWwiLCJ0ZXh0IiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJpbm5lckhUTUwiLCJ0aXRsZSIsIm5ld1RpdGxlVGV4dCIsImlubmVyVGV4dCIsImNyZWF0ZU5ld1BhZ2UiLCJpbml0IiwiY29uc29sZSIsImxvZyIsImJvZHkiLCJkaXZDb250ZW50IiwibG9hZGVySGVybyIsImxvYWRlckltZyIsIm5ld0xpc3QiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb250YWlucyIsIm5ld0ltZyIsInN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInJlcGxhY2UiLCJhZGRFdmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kIiwiYWRkTGlua0xpc3RlbmVycyIsImxpbmtzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJsIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJocmVmIiwidHJhbnNpdGlvblR5cGUiLCJkYXRhc2V0IiwicGFnZVRyaWdnZXIiXSwic291cmNlUm9vdCI6IiJ9
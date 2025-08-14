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
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");
/* harmony import */ var gsap_CustomEase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gsap/CustomEase */ "./node_modules/gsap/CustomEase.js");




class Playlists extends classes_Page__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      id: 'playlists',
      elements: {
        trackListItems: '[data-track-list-item]'
      }
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger, gsap_CustomEase__WEBPACK_IMPORTED_MODULE_3__.CustomEase);
    gsap_CustomEase__WEBPACK_IMPORTED_MODULE_3__.CustomEase.create("zoom", "0.71, 0, 0.06, 1");
    this.clickEfx = new Audio('/click.mp3');
    console.log(this.clickEfx);
    this.init();
  }
  addEventListener() {
    if (!this.elements.trackListItems) return;

    // Always turn into an array so .forEach works
    const trackListItems = this.elements.trackListItems.length !== undefined ? Array.from(this.elements.trackListItems) // NodeList or HTMLCollection
    : [this.elements.trackListItems]; // Single element

    trackListItems.forEach(element => {
      let bg = element.querySelector('[data-track-list-bg]');
      let albumImg = element.querySelector('[data-track-list-img]');
      element.addEventListener('mouseenter', () => {
        element.classList.add('active');
        this.clickEfx.currentTime = 0;
        this.clickEfx.play();
        gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(bg, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "zoom"
        });
        gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(albumImg, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "zoom"
        });
      });
      element.addEventListener('mouseleave', () => {
        element.classList.remove('active');
        gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(bg, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "zoom"
        });
        gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(albumImg, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "zoom"
        });
      });
    });
  }
  init() {
    this.addEventListener();
  }
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("aa98d4016282abd7bd82")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5mMjZlYjFiMzNhMGU3NTZiODlhMi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ1I7QUFDMkI7QUFDTjtBQUU3QixNQUFNSSxTQUFTLFNBQVNKLG9EQUFJLENBQUM7RUFDMUNLLFdBQVdBLENBQUEsRUFBRztJQUNaLEtBQUssQ0FBQztNQUNKQyxFQUFFLEVBQUUsV0FBVztNQUNmQyxRQUFRLEVBQUU7UUFDUkMsY0FBYyxFQUFFO01BQ2xCO0lBQ0YsQ0FBQyxDQUFDO0lBRUZQLDRDQUFJLENBQUNRLGNBQWMsQ0FBQ1AsNkRBQWEsRUFBRUMsdURBQVUsQ0FBQztJQUM5Q0EsdURBQVUsQ0FBQ08sTUFBTSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQztJQUU3QyxJQUFJLENBQUNDLFFBQVEsR0FBRyxJQUFJQyxLQUFLLENBQUMsWUFBWSxDQUFDO0lBQ3ZDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUNILFFBQVEsQ0FBQztJQUUxQixJQUFJLENBQUNJLElBQUksQ0FBQyxDQUFDO0VBQ2I7RUFFQUMsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQ1QsUUFBUSxDQUFDQyxjQUFjLEVBQUU7O0lBRW5DO0lBQ0EsTUFBTUEsY0FBYyxHQUFHLElBQUksQ0FBQ0QsUUFBUSxDQUFDQyxjQUFjLENBQUNTLE1BQU0sS0FBS0MsU0FBUyxHQUNwRUMsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDYixRQUFRLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQUEsRUFDekMsQ0FBQyxJQUFJLENBQUNELFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLENBQUMsQ0FBVTs7SUFFN0NBLGNBQWMsQ0FBQ2EsT0FBTyxDQUFDQyxPQUFPLElBQUk7TUFDaEMsSUFBSUMsRUFBRSxHQUFHRCxPQUFPLENBQUNFLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztNQUN0RCxJQUFJQyxRQUFRLEdBQUdILE9BQU8sQ0FBQ0UsYUFBYSxDQUFDLHVCQUF1QixDQUFDO01BRTdERixPQUFPLENBQUNOLGdCQUFnQixDQUFDLFlBQVksRUFBRSxNQUFNO1FBQzNDTSxPQUFPLENBQUNJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUNoQixRQUFRLENBQUNpQixXQUFXLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUNqQixRQUFRLENBQUNrQixJQUFJLENBQUMsQ0FBQztRQUVwQjVCLDRDQUFJLENBQUM2QixFQUFFLENBQUNQLEVBQUUsRUFBRTtVQUNWUSxRQUFRLEVBQUUsNkNBQTZDO1VBQ3ZEQyxRQUFRLEVBQUUsR0FBRztVQUNiQyxJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7UUFFRmhDLDRDQUFJLENBQUM2QixFQUFFLENBQUNMLFFBQVEsRUFBRTtVQUNoQk0sUUFBUSxFQUFFLDZDQUE2QztVQUN2REMsUUFBUSxFQUFFLEdBQUc7VUFDYkMsSUFBSSxFQUFFO1FBQ1IsQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDO01BRUZYLE9BQU8sQ0FBQ04sZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE1BQU07UUFDM0NNLE9BQU8sQ0FBQ0ksU0FBUyxDQUFDUSxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xDakMsNENBQUksQ0FBQzZCLEVBQUUsQ0FBQ1AsRUFBRSxFQUFFO1VBQ1ZRLFFBQVEsRUFBRSxpREFBaUQ7VUFDM0RDLFFBQVEsRUFBRSxHQUFHO1VBQ2JDLElBQUksRUFBRTtRQUNSLENBQUMsQ0FBQztRQUVGaEMsNENBQUksQ0FBQzZCLEVBQUUsQ0FBQ0wsUUFBUSxFQUFFO1VBQ2hCTSxRQUFRLEVBQUUsaURBQWlEO1VBQzNEQyxRQUFRLEVBQUUsR0FBRztVQUNiQyxJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7TUFDSixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtFQUdBbEIsSUFBSUEsQ0FBQSxFQUFHO0lBQ0wsSUFBSSxDQUFDQyxnQkFBZ0IsQ0FBQyxDQUFDO0VBQ3pCO0FBR0YsQzs7Ozs7Ozs7VUM1RUEsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb29tMTg3Ly4vYXBwL3BhZ2VzL1BsYXlsaXN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb29tMTg3L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZSBmcm9tICdjbGFzc2VzL1BhZ2UnXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xuaW1wb3J0IHsgU2Nyb2xsVHJpZ2dlciB9IGZyb20gJ2dzYXAvU2Nyb2xsVHJpZ2dlcidcbmltcG9ydCB7IEN1c3RvbUVhc2UgfSBmcm9tICdnc2FwL0N1c3RvbUVhc2UnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlsaXN0cyBleHRlbmRzIFBhZ2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBpZDogJ3BsYXlsaXN0cycsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICB0cmFja0xpc3RJdGVtczogJ1tkYXRhLXRyYWNrLWxpc3QtaXRlbV0nXG4gICAgICB9XG4gICAgfSlcbiAgICBcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIEN1c3RvbUVhc2UpXG4gICAgQ3VzdG9tRWFzZS5jcmVhdGUoXCJ6b29tXCIsIFwiMC43MSwgMCwgMC4wNiwgMVwiKVxuXG4gICAgdGhpcy5jbGlja0VmeCA9IG5ldyBBdWRpbygnL2NsaWNrLm1wMycpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpY2tFZngpXG5cbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcigpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMpIHJldHVybjtcblxuICAgIC8vIEFsd2F5cyB0dXJuIGludG8gYW4gYXJyYXkgc28gLmZvckVhY2ggd29ya3NcbiAgICBjb25zdCB0cmFja0xpc3RJdGVtcyA9IHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMubGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgID8gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zKSAvLyBOb2RlTGlzdCBvciBIVE1MQ29sbGVjdGlvblxuICAgICAgOiBbdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtc107ICAgICAgICAgIC8vIFNpbmdsZSBlbGVtZW50XG5cbiAgICB0cmFja0xpc3RJdGVtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgbGV0IGJnID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10cmFjay1saXN0LWJnXScpO1xuICAgICAgbGV0IGFsYnVtSW1nID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10cmFjay1saXN0LWltZ10nKTtcblxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLmNsaWNrRWZ4LmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5jbGlja0VmeC5wbGF5KCk7XG5cbiAgICAgICAgZ3NhcC50byhiZywge1xuICAgICAgICAgIGNsaXBQYXRoOiBcInBvbHlnb24oMCUgMCUsIDEwMCUgMCUsIDEwMCUgMTAwJSwgMCUgMTAwJSlcIixcbiAgICAgICAgICBkdXJhdGlvbjogMC4zLFxuICAgICAgICAgIGVhc2U6IFwiem9vbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdzYXAudG8oYWxidW1JbWcsIHtcbiAgICAgICAgICBjbGlwUGF0aDogXCJwb2x5Z29uKDAlIDAlLCAxMDAlIDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpXCIsXG4gICAgICAgICAgZHVyYXRpb246IDAuMyxcbiAgICAgICAgICBlYXNlOiBcInpvb21cIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIGdzYXAudG8oYmcsIHtcbiAgICAgICAgICBjbGlwUGF0aDogXCJwb2x5Z29uKDAlIDEwMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjMsXG4gICAgICAgICAgZWFzZTogXCJ6b29tXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ3NhcC50byhhbGJ1bUltZywge1xuICAgICAgICAgIGNsaXBQYXRoOiBcInBvbHlnb24oMCUgMTAwJSwgMTAwJSAxMDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpXCIsXG4gICAgICAgICAgZHVyYXRpb246IDAuMyxcbiAgICAgICAgICBlYXNlOiBcInpvb21cIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigpXG4gIH1cbiAgXG4gIFxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYWE5OGQ0MDE2MjgyYWJkN2JkODJcIikiXSwibmFtZXMiOlsiUGFnZSIsImdzYXAiLCJTY3JvbGxUcmlnZ2VyIiwiQ3VzdG9tRWFzZSIsIlBsYXlsaXN0cyIsImNvbnN0cnVjdG9yIiwiaWQiLCJlbGVtZW50cyIsInRyYWNrTGlzdEl0ZW1zIiwicmVnaXN0ZXJQbHVnaW4iLCJjcmVhdGUiLCJjbGlja0VmeCIsIkF1ZGlvIiwiY29uc29sZSIsImxvZyIsImluaXQiLCJhZGRFdmVudExpc3RlbmVyIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJiZyIsInF1ZXJ5U2VsZWN0b3IiLCJhbGJ1bUltZyIsImNsYXNzTGlzdCIsImFkZCIsImN1cnJlbnRUaW1lIiwicGxheSIsInRvIiwiY2xpcFBhdGgiLCJkdXJhdGlvbiIsImVhc2UiLCJyZW1vdmUiXSwic291cmNlUm9vdCI6IiJ9
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
    if (Array.isArray(this.elements.trackListItems) || typeof this.elements.trackListItems === 'object') {
      this.elements.trackListItems.forEach(element => {
        let bg = element.querySelector('[data-track-list-bg]');
        let albumImg = element.querySelector('[data-track-list-img]');
        element.addEventListener('mouseenter', e => {
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
        element.addEventListener('mouseleave', e => {
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
    } else {
      this.elements.galleryItems.addEventListener('click', e => {
        this.openSlideShow(e);
      });
    }
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
/******/ 	__webpack_require__.h = () => ("a6d28cac19f2660a2223")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iNmE4ZjVlN2Y4MDdhOTQ3ZWYxYi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ1I7QUFDMkI7QUFDTjtBQUU3QixNQUFNSSxTQUFTLFNBQVNKLG9EQUFJLENBQUM7RUFDMUNLLFdBQVdBLENBQUEsRUFBRztJQUNaLEtBQUssQ0FBQztNQUNKQyxFQUFFLEVBQUUsV0FBVztNQUNmQyxRQUFRLEVBQUU7UUFDUkMsY0FBYyxFQUFFO01BQ2xCO0lBQ0YsQ0FBQyxDQUFDO0lBRUZQLDRDQUFJLENBQUNRLGNBQWMsQ0FBQ1AsNkRBQWEsRUFBRUMsdURBQVUsQ0FBQztJQUM5Q0EsdURBQVUsQ0FBQ08sTUFBTSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQztJQUU3QyxJQUFJLENBQUNDLFFBQVEsR0FBRyxJQUFJQyxLQUFLLENBQUMsWUFBWSxDQUFDO0lBQ3ZDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUNILFFBQVEsQ0FBQztJQUUxQixJQUFJLENBQUNJLElBQUksQ0FBQyxDQUFDO0VBQ2I7RUFFQUMsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsSUFBRyxDQUFDLElBQUksQ0FBQ1QsUUFBUSxDQUFDQyxjQUFjLEVBQUU7SUFFbEMsSUFBSVMsS0FBSyxDQUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDWCxRQUFRLENBQUNDLGNBQWMsQ0FBQyxJQUFLLE9BQU8sSUFBSSxDQUFDRCxRQUFRLENBQUNDLGNBQWMsS0FBSyxRQUFTLEVBQUU7TUFDckcsSUFBSSxDQUFDRCxRQUFRLENBQUNDLGNBQWMsQ0FBQ1csT0FBTyxDQUFDQyxPQUFPLElBQUk7UUFDOUMsSUFBSUMsRUFBRSxHQUFHRCxPQUFPLENBQUNFLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztRQUN0RCxJQUFJQyxRQUFRLEdBQUdILE9BQU8sQ0FBQ0UsYUFBYSxDQUFDLHVCQUF1QixDQUFDO1FBRTdERixPQUFPLENBQUNKLGdCQUFnQixDQUFDLFlBQVksRUFBR1EsQ0FBQyxJQUFLO1VBQzVDSixPQUFPLENBQUNLLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztVQUMvQixJQUFJLENBQUNmLFFBQVEsQ0FBQ2dCLFdBQVcsR0FBRyxDQUFDO1VBQzdCLElBQUksQ0FBQ2hCLFFBQVEsQ0FBQ2lCLElBQUksQ0FBQyxDQUFDO1VBRXBCM0IsNENBQUksQ0FBQzRCLEVBQUUsQ0FBQ1IsRUFBRSxFQUNWO1lBQ0VTLFFBQVEsRUFBRSw2Q0FBNkM7WUFDdkRDLFFBQVEsRUFBRSxHQUFHO1lBQ2JDLElBQUksRUFBRTtVQUNSLENBQUMsQ0FBQztVQUVGL0IsNENBQUksQ0FBQzRCLEVBQUUsQ0FBQ04sUUFBUSxFQUNoQjtZQUNFTyxRQUFRLEVBQUUsNkNBQTZDO1lBQ3ZEQyxRQUFRLEVBQUUsR0FBRztZQUNiQyxJQUFJLEVBQUU7VUFDUixDQUFDLENBQUM7UUFFSixDQUFDLENBQUM7UUFFRlosT0FBTyxDQUFDSixnQkFBZ0IsQ0FBQyxZQUFZLEVBQUdRLENBQUMsSUFBSztVQUM1Q0osT0FBTyxDQUFDSyxTQUFTLENBQUNRLE1BQU0sQ0FBQyxRQUFRLENBQUM7VUFDbENoQyw0Q0FBSSxDQUFDNEIsRUFBRSxDQUFDUixFQUFFLEVBQ1Y7WUFDRVMsUUFBUSxFQUFFLGlEQUFpRDtZQUMzREMsUUFBUSxFQUFFLEdBQUc7WUFDYkMsSUFBSSxFQUFFO1VBQ1IsQ0FBQyxDQUFDO1VBRUYvQiw0Q0FBSSxDQUFDNEIsRUFBRSxDQUFDTixRQUFRLEVBQ2hCO1lBQ0VPLFFBQVEsRUFBRSxpREFBaUQ7WUFDM0RDLFFBQVEsRUFBRSxHQUFHO1lBQ2JDLElBQUksRUFBRTtVQUNSLENBQUMsQ0FBQztRQUVKLENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztJQUVKLENBQUMsTUFBTTtNQUNMLElBQUksQ0FBQ3pCLFFBQVEsQ0FBQzJCLFlBQVksQ0FBQ2xCLGdCQUFnQixDQUFDLE9BQU8sRUFBR1EsQ0FBQyxJQUFLO1FBQzFELElBQUksQ0FBQ1csYUFBYSxDQUFDWCxDQUFDLENBQUM7TUFDdkIsQ0FBQyxDQUFDO0lBQ0o7RUFHRjtFQUVBVCxJQUFJQSxDQUFBLEVBQUc7SUFDTCxJQUFJLENBQUNDLGdCQUFnQixDQUFDLENBQUM7RUFDekI7QUFHRixDOzs7Ozs7OztVQ3JGQSxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL3Jvb20xODcvLi9hcHAvcGFnZXMvUGxheWxpc3RzL2luZGV4LmpzIiwid2VicGFjazovL3Jvb20xODcvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlIGZyb20gJ2NsYXNzZXMvUGFnZSdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSAnZ3NhcC9TY3JvbGxUcmlnZ2VyJ1xuaW1wb3J0IHsgQ3VzdG9tRWFzZSB9IGZyb20gJ2dzYXAvQ3VzdG9tRWFzZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWxpc3RzIGV4dGVuZHMgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGlkOiAncGxheWxpc3RzJyxcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHRyYWNrTGlzdEl0ZW1zOiAnW2RhdGEtdHJhY2stbGlzdC1pdGVtXSdcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIGdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlciwgQ3VzdG9tRWFzZSlcbiAgICBDdXN0b21FYXNlLmNyZWF0ZShcInpvb21cIiwgXCIwLjcxLCAwLCAwLjA2LCAxXCIpXG5cbiAgICB0aGlzLmNsaWNrRWZ4ID0gbmV3IEF1ZGlvKCcvY2xpY2subXAzJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5jbGlja0VmeClcblxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKCkge1xuICAgIGlmKCF0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zKSByZXR1cm5cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZWxlbWVudHMudHJhY2tMaXN0SXRlbXMpIHx8ICh0eXBlb2YgdGhpcy5lbGVtZW50cy50cmFja0xpc3RJdGVtcyA9PT0gJ29iamVjdCcpKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnRyYWNrTGlzdEl0ZW1zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGxldCBiZyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdHJhY2stbGlzdC1iZ10nKVxuICAgICAgICBsZXQgYWxidW1JbWcgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRyYWNrLWxpc3QtaW1nXScpXG5cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgIHRoaXMuY2xpY2tFZnguY3VycmVudFRpbWUgPSAwXG4gICAgICAgICAgdGhpcy5jbGlja0VmeC5wbGF5KClcblxuICAgICAgICAgIGdzYXAudG8oYmcsIFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsaXBQYXRoOiBcInBvbHlnb24oMCUgMCUsIDEwMCUgMCUsIDEwMCUgMTAwJSwgMCUgMTAwJSlcIiwgXG4gICAgICAgICAgICBkdXJhdGlvbjogMC4zLCBcbiAgICAgICAgICAgIGVhc2U6IFwiem9vbVwiXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGdzYXAudG8oYWxidW1JbWcsIFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsaXBQYXRoOiBcInBvbHlnb24oMCUgMCUsIDEwMCUgMCUsIDEwMCUgMTAwJSwgMCUgMTAwJSlcIiwgXG4gICAgICAgICAgICBkdXJhdGlvbjogMC4zLCBcbiAgICAgICAgICAgIGVhc2U6IFwiem9vbVwiXG4gICAgICAgICAgfSlcblxuICAgICAgICB9KVxuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICBnc2FwLnRvKGJnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsaXBQYXRoOiBcInBvbHlnb24oMCUgMTAwJSwgMTAwJSAxMDAlLCAxMDAlIDEwMCUsIDAlIDEwMCUpXCIsIFxuICAgICAgICAgICAgZHVyYXRpb246IDAuMywgXG4gICAgICAgICAgICBlYXNlOiBcInpvb21cIlxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBnc2FwLnRvKGFsYnVtSW1nLCBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGlwUGF0aDogXCJwb2x5Z29uKDAlIDEwMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKVwiLCBcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjMsIFxuICAgICAgICAgICAgZWFzZTogXCJ6b29tXCJcbiAgICAgICAgICB9KVxuXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLmdhbGxlcnlJdGVtcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHRoaXMub3BlblNsaWRlU2hvdyhlKVxuICAgICAgfSlcbiAgICB9XG5cblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoKVxuICB9XG4gIFxuICBcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImE2ZDI4Y2FjMTlmMjY2MGEyMjIzXCIpIl0sIm5hbWVzIjpbIlBhZ2UiLCJnc2FwIiwiU2Nyb2xsVHJpZ2dlciIsIkN1c3RvbUVhc2UiLCJQbGF5bGlzdHMiLCJjb25zdHJ1Y3RvciIsImlkIiwiZWxlbWVudHMiLCJ0cmFja0xpc3RJdGVtcyIsInJlZ2lzdGVyUGx1Z2luIiwiY3JlYXRlIiwiY2xpY2tFZngiLCJBdWRpbyIsImNvbnNvbGUiLCJsb2ciLCJpbml0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJlbGVtZW50IiwiYmciLCJxdWVyeVNlbGVjdG9yIiwiYWxidW1JbWciLCJlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY3VycmVudFRpbWUiLCJwbGF5IiwidG8iLCJjbGlwUGF0aCIsImR1cmF0aW9uIiwiZWFzZSIsInJlbW92ZSIsImdhbGxlcnlJdGVtcyIsIm9wZW5TbGlkZVNob3ciXSwic291cmNlUm9vdCI6IiJ9
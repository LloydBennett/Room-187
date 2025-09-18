"use strict";
self["webpackHotUpdateroom187"]("main",{

/***/ "./app/components/Stats.js":
/*!*********************************!*\
  !*** ./app/components/Stats.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stats)
/* harmony export */ });
/* harmony import */ var classes_Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classes/Components */ "./app/classes/Components.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");



class Stats extends classes_Components__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      elements: {
        stats: '[data-stats]'
      }
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger);
    this.setUpScrollTrigger();
  }
  setUpScrollTrigger() {
    if (this.elements.stats !== null) {
      if (Array.isArray(this.elements.stats) || typeof this.elements.stats === 'object') {
        this.elements.stats.forEach(stats => {
          gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
            trigger: stats,
            start: "top bottom",
            onEnter: () => this.count(stats),
            markers: false,
            once: true
          });
        });
      } else {
        gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
          trigger: this.elements.stats,
          start: "top bottom",
          onEnter: () => this.count(this.elements.stats),
          markers: false,
          once: true
        });
      }
    } else {
      return;
    }
  }
  count(stats) {
    let interval = 2000;
    let n = 1;
    let statsNum = parseInt(stats.getAttribute('data-stats'));
    let startVal = statsNum > 1000 ? statsNum - 500 : 0;
    let endVal = statsNum;
    let duration = Math.floor(interval / endVal);
    let counter = setInterval(() => {
      startVal += n;
      stats.textContent = new Intl.NumberFormat().format(startVal);
      if (startVal === endVal) {
        clearInterval(counter);
      }
    }, duration);
  }
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("916777b89dd6ce4b8737")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40M2Y3MmEzMDJiOWI4MTBmZWIzYi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMkM7QUFDcEI7QUFDMkI7QUFFbkMsTUFBTUcsS0FBSyxTQUFTSCwwREFBVSxDQUFDO0VBQzVDSSxXQUFXQSxDQUFBLEVBQUc7SUFDWixLQUFLLENBQUM7TUFDSkMsUUFBUSxFQUFFO1FBQ1JDLEtBQUssRUFBRTtNQUNUO0lBQ0YsQ0FBQyxDQUFDO0lBRUZMLDRDQUFJLENBQUNNLGNBQWMsQ0FBQ0wsNkRBQWEsQ0FBQztJQUNsQyxJQUFJLENBQUNNLGtCQUFrQixDQUFDLENBQUM7RUFDM0I7RUFFQUEsa0JBQWtCQSxDQUFBLEVBQUc7SUFDbkIsSUFBRyxJQUFJLENBQUNILFFBQVEsQ0FBQ0MsS0FBSyxLQUFLLElBQUksRUFBRTtNQUMvQixJQUFJRyxLQUFLLENBQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUNMLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDLElBQUssT0FBTyxJQUFJLENBQUNELFFBQVEsQ0FBQ0MsS0FBSyxLQUFLLFFBQVMsRUFBRTtRQUNuRixJQUFJLENBQUNELFFBQVEsQ0FBQ0MsS0FBSyxDQUFDSyxPQUFPLENBQUNMLEtBQUssSUFBSTtVQUNuQ0osNkRBQWEsQ0FBQ1UsTUFBTSxDQUFDO1lBQ25CQyxPQUFPLEVBQUVQLEtBQUs7WUFDZFEsS0FBSyxFQUFFLFlBQVk7WUFDbkJDLE9BQU8sRUFBRUEsQ0FBQSxLQUFNLElBQUksQ0FBQ0MsS0FBSyxDQUFDVixLQUFLLENBQUM7WUFDaENXLE9BQU8sRUFBRSxLQUFLO1lBQ2RDLElBQUksRUFBRTtVQUNSLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztNQUNKLENBQUMsTUFDSTtRQUNIaEIsNkRBQWEsQ0FBQ1UsTUFBTSxDQUFDO1VBQ25CQyxPQUFPLEVBQUUsSUFBSSxDQUFDUixRQUFRLENBQUNDLEtBQUs7VUFDNUJRLEtBQUssRUFBRSxZQUFZO1VBQ25CQyxPQUFPLEVBQUVBLENBQUEsS0FBTSxJQUFJLENBQUNDLEtBQUssQ0FBQyxJQUFJLENBQUNYLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDO1VBQzlDVyxPQUFPLEVBQUUsS0FBSztVQUNkQyxJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7TUFDSjtJQUNGLENBQUMsTUFBTTtNQUNMO0lBQ0Y7RUFDRjtFQUVBRixLQUFLQSxDQUFDVixLQUFLLEVBQUU7SUFDWCxJQUFJYSxRQUFRLEdBQUcsSUFBSTtJQUNuQixJQUFJQyxDQUFDLEdBQUcsQ0FBQztJQUNULElBQUlDLFFBQVEsR0FBR0MsUUFBUSxDQUFDaEIsS0FBSyxDQUFDaUIsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pELElBQUlDLFFBQVEsR0FBR0gsUUFBUSxHQUFHLElBQUksR0FBR0EsUUFBUSxHQUFHLEdBQUcsR0FBSSxDQUFDO0lBQ3BELElBQUlJLE1BQU0sR0FBR0osUUFBUTtJQUNyQixJQUFJSyxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDVCxRQUFRLEdBQUdNLE1BQU0sQ0FBQztJQUU1QyxJQUFJSSxPQUFPLEdBQUdDLFdBQVcsQ0FBQyxNQUFLO01BQzdCTixRQUFRLElBQUlKLENBQUM7TUFDYmQsS0FBSyxDQUFDeUIsV0FBVyxHQUFHLElBQUlDLElBQUksQ0FBQ0MsWUFBWSxDQUFDLENBQUMsQ0FBQ0MsTUFBTSxDQUFDVixRQUFRLENBQUM7TUFFNUQsSUFBR0EsUUFBUSxLQUFLQyxNQUFNLEVBQUU7UUFDdEJVLGFBQWEsQ0FBQ04sT0FBTyxDQUFDO01BQ3hCO0lBQ0YsQ0FBQyxFQUFFSCxRQUFRLENBQUM7RUFDZDtBQUNGLEM7Ozs7Ozs7O1VDNURBLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9vbTE4Ny8uL2FwcC9jb21wb25lbnRzL1N0YXRzLmpzIiwid2VicGFjazovL3Jvb20xODcvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnRzIGZyb20gJ2NsYXNzZXMvQ29tcG9uZW50cydcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSAnZ3NhcC9TY3JvbGxUcmlnZ2VyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0cyBleHRlbmRzIENvbXBvbmVudHMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBzdGF0czogJ1tkYXRhLXN0YXRzXSdcbiAgICAgIH1cbiAgICB9KVxuICBcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpXG4gICAgdGhpcy5zZXRVcFNjcm9sbFRyaWdnZXIoKVxuICB9XG5cbiAgc2V0VXBTY3JvbGxUcmlnZ2VyKCkge1xuICAgIGlmKHRoaXMuZWxlbWVudHMuc3RhdHMgIT09IG51bGwpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZWxlbWVudHMuc3RhdHMpIHx8ICh0eXBlb2YgdGhpcy5lbGVtZW50cy5zdGF0cyA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuc3RhdHMuZm9yRWFjaChzdGF0cyA9PiB7XG4gICAgICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xuICAgICAgICAgICAgdHJpZ2dlcjogc3RhdHMsXG4gICAgICAgICAgICBzdGFydDogXCJ0b3AgYm90dG9tXCIsXG4gICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB0aGlzLmNvdW50KHN0YXRzKSxcbiAgICAgICAgICAgIG1hcmtlcnM6IGZhbHNlLFxuICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMuc3RhdHMsXG4gICAgICAgICAgc3RhcnQ6IFwidG9wIGJvdHRvbVwiLFxuICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHRoaXMuY291bnQodGhpcy5lbGVtZW50cy5zdGF0cyksXG4gICAgICAgICAgbWFya2VyczogZmFsc2UsXG4gICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBjb3VudChzdGF0cykge1xuICAgIGxldCBpbnRlcnZhbCA9IDIwMDBcbiAgICBsZXQgbiA9IDFcbiAgICBsZXQgc3RhdHNOdW0gPSBwYXJzZUludChzdGF0cy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdHMnKSlcbiAgICBsZXQgc3RhcnRWYWwgPSBzdGF0c051bSA+IDEwMDA/IChzdGF0c051bSAtIDUwMCkgOiAwXG4gICAgbGV0IGVuZFZhbCA9IHN0YXRzTnVtXG4gICAgbGV0IGR1cmF0aW9uID0gTWF0aC5mbG9vcihpbnRlcnZhbCAvIGVuZFZhbClcblxuICAgIGxldCBjb3VudGVyID0gc2V0SW50ZXJ2YWwoKCk9PiB7XG4gICAgICBzdGFydFZhbCArPSBuXG4gICAgICBzdGF0cy50ZXh0Q29udGVudCA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgpLmZvcm1hdChzdGFydFZhbClcblxuICAgICAgaWYoc3RhcnRWYWwgPT09IGVuZFZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKGNvdW50ZXIpXG4gICAgICB9XG4gICAgfSwgZHVyYXRpb24pXG4gIH1cbn0iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI5MTY3NzdiODlkZDZjZTRiODczN1wiKSJdLCJuYW1lcyI6WyJDb21wb25lbnRzIiwiZ3NhcCIsIlNjcm9sbFRyaWdnZXIiLCJTdGF0cyIsImNvbnN0cnVjdG9yIiwiZWxlbWVudHMiLCJzdGF0cyIsInJlZ2lzdGVyUGx1Z2luIiwic2V0VXBTY3JvbGxUcmlnZ2VyIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImNyZWF0ZSIsInRyaWdnZXIiLCJzdGFydCIsIm9uRW50ZXIiLCJjb3VudCIsIm1hcmtlcnMiLCJvbmNlIiwiaW50ZXJ2YWwiLCJuIiwic3RhdHNOdW0iLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsInN0YXJ0VmFsIiwiZW5kVmFsIiwiZHVyYXRpb24iLCJNYXRoIiwiZmxvb3IiLCJjb3VudGVyIiwic2V0SW50ZXJ2YWwiLCJ0ZXh0Q29udGVudCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJmb3JtYXQiLCJjbGVhckludGVydmFsIl0sInNvdXJjZVJvb3QiOiIifQ==
"use strict";
self["webpackHotUpdateroom187"]("main",{

/***/ "./app/utils/LenisScroll.js":
/*!**********************************!*\
  !*** ./app/utils/LenisScroll.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scroll: () => (/* binding */ scroll)
/* harmony export */ });
/* harmony import */ var lenis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lenis */ "./node_modules/lenis/dist/lenis.mjs");


// Detect real mobile devices via user agent
const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
console.log(isMobile);
// Always export something so your imports never break
const scroll = isMobile ? {
  raf: () => {},
  // does nothing
  stop: () => {},
  // does nothing
  start: () => {
    console.log('this is running the mobile version');
  },
  // does nothing
  on: () => {} // does nothing
} : new lenis__WEBPACK_IMPORTED_MODULE_0__["default"]({
  autoRaf: false,
  lerp: 0.08,
  duration: undefined,
  // remove duration if you use lerp
  smoothTouch: true,
  touchMultiplier: 1.5
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ec403f3d82960ca0c2e6")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xYmU1MGZlYjU4NWZjMjdhN2U1NC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXlCOztBQUV6QjtBQUNBLE1BQU1DLFFBQVEsR0FBRywyREFBMkQsQ0FBQ0MsSUFBSSxDQUMvRUMsU0FBUyxDQUFDQyxTQUNaLENBQUM7QUFDREMsT0FBTyxDQUFDQyxHQUFHLENBQUNMLFFBQVEsQ0FBQztBQUNyQjtBQUNPLE1BQU1NLE1BQU0sR0FBR04sUUFBUSxHQUMxQjtFQUNFTyxHQUFHLEVBQUVBLENBQUEsS0FBTSxDQUFDLENBQUM7RUFBSTtFQUNqQkMsSUFBSSxFQUFFQSxDQUFBLEtBQU0sQ0FBQyxDQUFDO0VBQUc7RUFDakJDLEtBQUssRUFBRUEsQ0FBQSxLQUFNO0lBQUVMLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG9DQUFvQyxDQUFDO0VBQUEsQ0FBQztFQUFFO0VBQ25FSyxFQUFFLEVBQUVBLENBQUEsS0FBTSxDQUFDLENBQUMsQ0FBSztBQUNuQixDQUFDLEdBQ0QsSUFBSVgsNkNBQUssQ0FBQztFQUNSWSxPQUFPLEVBQUUsS0FBSztFQUNkQyxJQUFJLEVBQUUsSUFBSTtFQUNWQyxRQUFRLEVBQUVDLFNBQVM7RUFBRTtFQUNyQkMsV0FBVyxFQUFFLElBQUk7RUFDakJDLGVBQWUsRUFBRTtBQUNuQixDQUFDLENBQUMsQzs7Ozs7Ozs7VUNyQk4sc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb29tMTg3Ly4vYXBwL3V0aWxzL0xlbmlzU2Nyb2xsLmpzIiwid2VicGFjazovL3Jvb20xODcvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMZW5pcyBmcm9tICdsZW5pcydcblxuLy8gRGV0ZWN0IHJlYWwgbW9iaWxlIGRldmljZXMgdmlhIHVzZXIgYWdlbnRcbmNvbnN0IGlzTW9iaWxlID0gL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChcbiAgbmF2aWdhdG9yLnVzZXJBZ2VudFxuKVxuY29uc29sZS5sb2coaXNNb2JpbGUpXG4vLyBBbHdheXMgZXhwb3J0IHNvbWV0aGluZyBzbyB5b3VyIGltcG9ydHMgbmV2ZXIgYnJlYWtcbmV4cG9ydCBjb25zdCBzY3JvbGwgPSBpc01vYmlsZVxuICA/IHtcbiAgICAgIHJhZjogKCkgPT4ge30sICAgLy8gZG9lcyBub3RoaW5nXG4gICAgICBzdG9wOiAoKSA9PiB7fSwgIC8vIGRvZXMgbm90aGluZ1xuICAgICAgc3RhcnQ6ICgpID0+IHsgY29uc29sZS5sb2coJ3RoaXMgaXMgcnVubmluZyB0aGUgbW9iaWxlIHZlcnNpb24nKX0sIC8vIGRvZXMgbm90aGluZ1xuICAgICAgb246ICgpID0+IHt9ICAgICAvLyBkb2VzIG5vdGhpbmdcbiAgICB9XG4gIDogbmV3IExlbmlzKHtcbiAgICAgIGF1dG9SYWY6IGZhbHNlLFxuICAgICAgbGVycDogMC4wOCxcbiAgICAgIGR1cmF0aW9uOiB1bmRlZmluZWQsIC8vIHJlbW92ZSBkdXJhdGlvbiBpZiB5b3UgdXNlIGxlcnBcbiAgICAgIHNtb290aFRvdWNoOiB0cnVlLFxuICAgICAgdG91Y2hNdWx0aXBsaWVyOiAxLjVcbiAgICB9KVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZWM0MDNmM2Q4Mjk2MGNhMGMyZTZcIikiXSwibmFtZXMiOlsiTGVuaXMiLCJpc01vYmlsZSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjb25zb2xlIiwibG9nIiwic2Nyb2xsIiwicmFmIiwic3RvcCIsInN0YXJ0Iiwib24iLCJhdXRvUmFmIiwibGVycCIsImR1cmF0aW9uIiwidW5kZWZpbmVkIiwic21vb3RoVG91Y2giLCJ0b3VjaE11bHRpcGxpZXIiXSwic291cmNlUm9vdCI6IiJ9
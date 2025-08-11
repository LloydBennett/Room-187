"use strict";
self["webpackHotUpdateroom187"]("main",{

/***/ "./app/pages/Home/index.js":
/*!*********************************!*\
  !*** ./app/pages/Home/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var classes_Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classes/Page */ "./app/classes/Page.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");



class Home extends classes_Page__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      id: 'home',
      elements: {
        heroContent: '[data-hero-content]',
        homeBody: '[data-home-body]',
        videoBlock: '[data-video-scroll]',
        video: '[data-video-scroll] [data-video]',
        polaroid: '[data-polaroid]',
        roomKeySection: '[data-room-key-section]',
        roomKeyHeader: '[data-room-key-header]',
        roomKeyTitle: '[data-room-key-titles]',
        roomKey: '[data-room-key]',
        progressBar: '[data-progress-bar]',
        progressHighlight: '[data-progress-highlight]',
        progressIndices: '[data-progress-index]',
        steps: '[data-progress-steps]',
        artistNames: '[data-artist-name-animation]',
        stepContainer: '[data-step-container]'
      }
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger);
    this.mm = gsap__WEBPACK_IMPORTED_MODULE_1__["default"].matchMedia();
    this.pinnedHeight = this.elements.roomKeySection ? this.elements.roomKeySection.offsetHeight : 100;
    this.isProgressBarVisible = false;
    this.currentActiveIndex = -1;
    this.init();
  }
  init() {
    this.setUpScrollAnimations();
  }
  animateIndexHighlighter(newIndex) {
    if (newIndex !== this.currentActiveIndex) {
      let yPosCalc = newIndex * 100;
      let yPos = `${yPosCalc}%`;
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.progressHighlight, {
        y: yPos,
        duration: 0.4,
        ease: "power2.out"
      });
      this.currentActiveIndex = newIndex;
    }
  }
  hideProgressBar() {
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.progressBar, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    });
    this.isProgressBarVisible = false;
  }
  showProgressBar() {
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.progressBar, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    this.isProgressBarVisible = true;
  }
  setUpScrollAnimations() {
    this.polaroidParallax();
    this.roomKeyAnimations();
    this.artistSectionAnimations();
  }
  polaroidParallax() {
    if (!this.elements.polaroid) return;
    this.elements.polaroid.forEach((element, i) => {
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].fromTo(element, {
        opacity: 0
      }, {
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          start: '50% bottom',
          scrub: false,
          markers: false
        },
        ease: "power2.out",
        duration: 0.6
      });
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].fromTo(element, {
        y: "10%"
      }, {
        y: "-20%",
        scrollTrigger: {
          trigger: element,
          start: '5% bottom',
          scrub: true,
          markers: false
        },
        ease: "power2.out"
      });
    });
  }
  roomKeyAnimations() {
    if (!this.elements.roomKey || !this.elements.steps || !this.elements.roomKeyHeader || !this.elements.stepContainer || !this.elements.progressBar) return;
    let totalStepsHeight = this.elements.steps ? Array.from(this.elements.steps).reduce((total, step) => total + step.offsetHeight, 0) : null;
    let adjustedPinDuration = totalStepsHeight - (this.elements.roomKey.offsetHeight + this.elements.roomKey.offsetHeight / 4);
    let scrollOptions = {
      trigger: this.elements.roomKey,
      start: "center center",
      end: `+=${this.elements.steps[0].offsetHeight}`,
      scrub: true,
      onEnter: () => gsap__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.elements.steps, {
        opacity: 0
      })
    };
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.elements.steps, {
      opacity: 0,
      y: 50
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.elements.progressBar, {
      opacity: 0
    });
    this.mm.add("(max-width: 767px)", () => {
      const roomKeyPinStart = "center 30%";
      const roomKeyPinEnd = adjustedPinDuration + this.elements.steps.length * window.innerHeight;
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
        id: "roomKeyPin",
        trigger: this.elements.roomKeyHeader,
        start: "top top",
        end: () => {
          const headerRect = this.elements.roomKeyHeader.getBoundingClientRect();
          const roomKeyRect = this.elements.roomKey.getBoundingClientRect();
          const distance = roomKeyRect.top - headerRect.top + this.elements.roomKey.offsetHeight;
          return `+=${distance}`;
        },
        pin: true,
        pinSpacing: false,
        scrub: true
      });
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.roomKeyHeader, {
        opacity: 0,
        scrollTrigger: {
          trigger: this.elements.roomKey,
          start: "top 70%",
          end: "top 30%",
          scrub: true
        }
      });
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
        trigger: this.elements.roomKey,
        start: roomKeyPinStart,
        end: `+=${roomKeyPinEnd}`,
        pin: true,
        scrub: true
      });
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
        trigger: this.elements.stepContainer,
        start: "bottom bottom",
        end: `+=${roomKeyPinEnd}`,
        pin: true,
        scrub: true,
        onEnter: () => {
          gsap__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.elements.stepContainer, {
            y: 0,
            bottom: "2dvh",
            top: "auto",
            position: "fixed",
            width: "100%"
          });
        },
        onLeave: () => {
          gsap__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.elements.stepContainer, {
            position: "",
            bottom: "",
            top: "",
            y: ""
          });
        },
        onLeaveBack: () => {
          gsap__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.elements.stepContainer, {
            position: "",
            bottom: "",
            top: "",
            y: ""
          });
        }
      });
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.elements.steps, {
        opacity: 0,
        position: "absolute",
        width: "100%"
      });
      let stepTl = gsap__WEBPACK_IMPORTED_MODULE_1__["default"].timeline({
        scrollTrigger: {
          trigger: this.elements.stepContainer,
          start: "bottom bottom",
          end: `+=${roomKeyPinEnd}`,
          scrub: true,
          onUpdate: self => {
            let totalSteps = this.elements.steps.length;
            let rawIndex = Math.floor(self.progress * totalSteps); // 0..totalSteps-1

            // Clamp to valid index
            let activeIndex = Math.min(Math.max(rawIndex, 1), totalSteps - 1);
            this.animateIndexHighlighter(activeIndex - 1);
            if (activeIndex === 2) {
              this.elements.roomKey.classList.add("flip");
            }
            if (activeIndex < 2) {
              this.elements.roomKey.classList.remove("flip");
            }
          }
        }
      });
      this.elements.steps.forEach((step, index) => {
        stepTl.to(step, {
          opacity: 1,
          duration: 0.8
        });
        if (index < this.elements.steps.length - 1) {
          stepTl.to(step, {
            opacity: 0,
            duration: 0.8
          }, "+=1.5");
        }
      });
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
        trigger: this.elements.steps[1],
        start: "top 60%",
        end: "top 40%",
        onEnter: () => this.showProgressBar(),
        onLeaveBack: () => this.hideProgressBar(),
        scrub: true,
        pinSpacing: false
      });
      window.addEventListener("resize", () => gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.refresh());
    });
    this.mm.add("(min-width: 768px)", () => {
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
        id: "roomKeyPin",
        trigger: this.elements.roomKeyHeader,
        start: "top top",
        end: () => `+=${this.elements.roomKey.offsetHeight * 1.5}`,
        // Keep it pinned while roomKey moves over
        pin: true,
        pinSpacing: false,
        scrub: true
      });
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.roomKeyHeader, {
        opacity: 0,
        scrollTrigger: {
          trigger: this.elements.roomKey,
          start: "top 55%",
          end: "top 30%",
          scrub: true
        }
      });
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
        trigger: this.elements.roomKey,
        start: "center center",
        end: `+=${adjustedPinDuration}`,
        pin: true,
        scrub: true
      });
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.roomKey, {
        x: "85%",
        rotate: "5deg",
        ease: "power2.out",
        scrollTrigger: scrollOptions
      });

      // Step opacity should be scroll-based (fade in/out based on scroll)
      this.elements.steps.forEach((step, index) => {
        gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          end: "top 50%",
          scrub: true,
          toggleActions: "play none none reverse",
          onEnter: () => gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(step, {
            opacity: 1,
            y: 0,
            duration: 0.3
          }),
          onLeaveBack: () => gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(step, {
            opacity: 0,
            y: 50,
            duration: 0.3
          })
        });

        // **Flip room-key when the second step appears**
        if (index === 2) {
          gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
            trigger: step,
            start: "top center",
            onEnter: () => this.elements.roomKey.classList.add("flip"),
            onLeaveBack: () => this.elements.roomKey.classList.remove("flip")
          });
        }
        gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
          trigger: step,
          start: "top 50%",
          // When the step reaches 50% of the viewport
          end: "top 30%",
          // When the step is almost fully in view
          onEnter: () => {
            if (index === 0) {
              this.animateIndexHighlighter(index); // Highlight the corresponding dot for the current step
            } else {
              this.animateIndexHighlighter(index - 1); // Highlight the corresponding dot for the current step
            }
          },
          onLeaveBack: () => {
            if (index === 1) {
              this.animateIndexHighlighter(index - 1);
            } else {
              this.animateIndexHighlighter(index - 2);
            }
          }
        });
      });
    });

    // Pin progress bar at all times (only show/hide)
    gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
      trigger: this.elements.roomKeySection,
      start: "top top",
      end: "bottom bottom",
      pin: this.elements.progressBar
    });

    // Show progress bar when roomKey is fully in view

    gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
      trigger: this.elements.steps[1],
      start: "top center",
      // When the first step reaches the center of the viewport
      onEnter: () => this.showProgressBar(),
      onLeaveBack: () => this.hideProgressBar(),
      markers: false
    });
    window.addEventListener("resize", () => gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.refresh());
  }
  artistSectionAnimations() {
    if (!this.elements.videoBlock || !this.elements.video || !this.elements.artistNames) return;
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].fromTo(this.elements.videoBlock, {
      clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)"
    }, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: this.elements.videoBlock,
        start: '5% bottom',
        scrub: true,
        markers: false
      },
      ease: "power2.out"
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].fromTo(this.elements.video, {
      scale: 1.5
    }, {
      scale: 1,
      scrollTrigger: {
        trigger: this.elements.videoBlock,
        start: '5% bottom',
        // Start the animation when the top of the heroContent hits 90% of the viewport
        scrub: true,
        markers: false
      },
      ease: "power2.out"
    });
    this.elements.artistNames.forEach((name, i) => {
      let getVal = name.getAttribute('data-artist-name-animation');
      let startXpos = getVal === "left" ? "10%" : "-10%";
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].fromTo(name, {
        x: startXpos,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.4,
        scrollTrigger: {
          trigger: name,
          start: "top bottom",
          markers: false,
          scrub: true
        }
      });
    });
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
        // 1754953198502
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
/******/ 	__webpack_require__.h = () => ("3c910c4765002e157da4")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ3lCLE9BQU8sQ0FBQyxDQUFDNkQsSUFBSSxFQUFFM0QsQ0FBQyxLQUFLO01BQzdDLElBQUk0RCxNQUFNLEdBQUdELElBQUksQ0FBQ0UsWUFBWSxDQUFDLDRCQUE0QixDQUFDO01BQzVELElBQUlDLFNBQVMsR0FBR0YsTUFBTSxLQUFLLE1BQU0sR0FBRyxLQUFLLEdBQUUsTUFBTTtNQUVqRDFHLDRDQUFJLENBQUMrQyxNQUFNLENBQUMwRCxJQUFJLEVBQ2Q7UUFDRUwsQ0FBQyxFQUFFUSxTQUFTO1FBQ1pyRSxPQUFPLEVBQUU7TUFDWCxDQUFDLEVBQ0Q7UUFDRTZELENBQUMsRUFBRSxDQUFDO1FBQ0o3RCxPQUFPLEVBQUUsQ0FBQztRQUNWRixJQUFJLEVBQUUsWUFBWTtRQUNsQkQsUUFBUSxFQUFFLEdBQUc7UUFDYlksYUFBYSxFQUFFO1VBQ2JDLE9BQU8sRUFBRXdELElBQUk7VUFDYnZELEtBQUssRUFBRSxZQUFZO1VBQ25CRSxPQUFPLEVBQUUsS0FBSztVQUNkRCxLQUFLLEVBQUU7UUFDVDtNQUNGLENBQ0YsQ0FBQztJQUVILENBQUMsQ0FBQztFQUNKO0FBQ0YsQzs7Ozs7Ozs7Ozs7QUMzWUE7QUFDVTtBQUNWLE9BQU8sSUFBVTtBQUNqQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQU8sQ0FBQyx5SkFBMEUsY0FBYyxnQkFBZ0I7QUFDeEk7QUFDQTtBQUNBLFVBQVUsVUFBVTtBQUNwQixVQUFVLFVBQVU7QUFDcEIsVUFBVSxVQUFVO0FBQ3BCO0FBQ0EsVUFBVSxVQUFVO0FBQ3BCLFVBQVU7QUFDVixVQUFVLGlCQUFpQjtBQUMzQjtBQUNBLFFBQVEsVUFBVTtBQUNsQjtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEU7Ozs7Ozs7O1VDdkJBLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9vbTE4Ny8uL2FwcC9wYWdlcy9Ib21lL2luZGV4LmpzIiwid2VicGFjazovL3Jvb20xODcvLi9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9yb29tMTg3L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZSBmcm9tICdjbGFzc2VzL1BhZ2UnXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xuaW1wb3J0IHsgU2Nyb2xsVHJpZ2dlciB9IGZyb20gJ2dzYXAvU2Nyb2xsVHJpZ2dlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIFBhZ2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBpZDogJ2hvbWUnLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgaGVyb0NvbnRlbnQ6ICdbZGF0YS1oZXJvLWNvbnRlbnRdJyxcbiAgICAgICAgaG9tZUJvZHk6ICdbZGF0YS1ob21lLWJvZHldJyxcbiAgICAgICAgdmlkZW9CbG9jazogJ1tkYXRhLXZpZGVvLXNjcm9sbF0nLFxuICAgICAgICB2aWRlbzogJ1tkYXRhLXZpZGVvLXNjcm9sbF0gW2RhdGEtdmlkZW9dJyxcbiAgICAgICAgcG9sYXJvaWQ6ICdbZGF0YS1wb2xhcm9pZF0nLFxuICAgICAgICByb29tS2V5U2VjdGlvbjogJ1tkYXRhLXJvb20ta2V5LXNlY3Rpb25dJyxcbiAgICAgICAgcm9vbUtleUhlYWRlcjogJ1tkYXRhLXJvb20ta2V5LWhlYWRlcl0nLFxuICAgICAgICByb29tS2V5VGl0bGU6ICdbZGF0YS1yb29tLWtleS10aXRsZXNdJyxcbiAgICAgICAgcm9vbUtleTogJ1tkYXRhLXJvb20ta2V5XScsXG4gICAgICAgIHByb2dyZXNzQmFyOiAnW2RhdGEtcHJvZ3Jlc3MtYmFyXScsXG4gICAgICAgIHByb2dyZXNzSGlnaGxpZ2h0OiAnW2RhdGEtcHJvZ3Jlc3MtaGlnaGxpZ2h0XScsXG4gICAgICAgIHByb2dyZXNzSW5kaWNlczogJ1tkYXRhLXByb2dyZXNzLWluZGV4XScsXG4gICAgICAgIHN0ZXBzOiAnW2RhdGEtcHJvZ3Jlc3Mtc3RlcHNdJyxcbiAgICAgICAgYXJ0aXN0TmFtZXM6ICdbZGF0YS1hcnRpc3QtbmFtZS1hbmltYXRpb25dJyxcbiAgICAgICAgc3RlcENvbnRhaW5lcjogJ1tkYXRhLXN0ZXAtY29udGFpbmVyXSdcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIGdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlcilcbiAgICBcbiAgICB0aGlzLm1tID0gZ3NhcC5tYXRjaE1lZGlhKClcbiAgICB0aGlzLnBpbm5lZEhlaWdodCA9IHRoaXMuZWxlbWVudHMucm9vbUtleVNlY3Rpb24/IHRoaXMuZWxlbWVudHMucm9vbUtleVNlY3Rpb24ub2Zmc2V0SGVpZ2h0IDogMTAwXG4gICAgdGhpcy5pc1Byb2dyZXNzQmFyVmlzaWJsZSA9IGZhbHNlXG4gICAgdGhpcy5jdXJyZW50QWN0aXZlSW5kZXggPSAtMVxuXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zZXRVcFNjcm9sbEFuaW1hdGlvbnMoKVxuICB9XG5cbiAgYW5pbWF0ZUluZGV4SGlnaGxpZ2h0ZXIobmV3SW5kZXgpIHtcbiAgICBpZihuZXdJbmRleCAhPT0gdGhpcy5jdXJyZW50QWN0aXZlSW5kZXgpIHtcbiAgICAgIGxldCB5UG9zQ2FsYyA9IG5ld0luZGV4ICogMTAwXG4gICAgICBsZXQgeVBvcyA9IGAke3lQb3NDYWxjfSVgXG5cbiAgICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy5wcm9ncmVzc0hpZ2hsaWdodCwgeyB5OiB5UG9zLCBkdXJhdGlvbjogMC40LCBlYXNlOiBcInBvd2VyMi5vdXRcIiB9KVxuICAgICAgdGhpcy5jdXJyZW50QWN0aXZlSW5kZXggPSBuZXdJbmRleFxuICAgIH1cbiAgfVxuXG4gIGhpZGVQcm9ncmVzc0JhcigpIHtcbiAgICBnc2FwLnRvKHRoaXMuZWxlbWVudHMucHJvZ3Jlc3NCYXIgLCB7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgZHVyYXRpb246IDAuNCxcbiAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiXG4gICAgfSlcblxuICAgIHRoaXMuaXNQcm9ncmVzc0JhclZpc2libGUgPSBmYWxzZVxuICB9XG5cbiAgc2hvd1Byb2dyZXNzQmFyKCkge1xuICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy5wcm9ncmVzc0JhciAsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkdXJhdGlvbjogMC40LFxuICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCJcbiAgICB9KVxuXG4gICAgdGhpcy5pc1Byb2dyZXNzQmFyVmlzaWJsZSA9IHRydWVcbiAgfVxuXG4gIHNldFVwU2Nyb2xsQW5pbWF0aW9ucygpIHtcbiAgICB0aGlzLnBvbGFyb2lkUGFyYWxsYXgoKVxuICAgIHRoaXMucm9vbUtleUFuaW1hdGlvbnMoKVxuICAgIHRoaXMuYXJ0aXN0U2VjdGlvbkFuaW1hdGlvbnMoKVxuICB9XG4gIFxuICBwb2xhcm9pZFBhcmFsbGF4KCkge1xuICAgIGlmKCF0aGlzLmVsZW1lbnRzLnBvbGFyb2lkKSByZXR1cm5cblxuICAgIHRoaXMuZWxlbWVudHMucG9sYXJvaWQuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgZ3NhcC5mcm9tVG8oZWxlbWVudCwgXG4gICAgICAgIHtcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICAgIHRyaWdnZXI6IGVsZW1lbnQsXG4gICAgICAgICAgICBzdGFydDogJzUwJSBib3R0b20nLFxuICAgICAgICAgICAgc2NydWI6IGZhbHNlLFxuICAgICAgICAgICAgbWFya2VyczogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjZcbiAgICAgICAgfVxuICAgICAgKVxuXG4gICAgICBnc2FwLmZyb21UbyhlbGVtZW50LCBcbiAgICAgICAge1xuICAgICAgICAgIHk6IFwiMTAlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHk6IFwiLTIwJVwiLFxuICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICAgIHRyaWdnZXI6IGVsZW1lbnQsXG4gICAgICAgICAgICBzdGFydDogJzUlIGJvdHRvbScsXG4gICAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgICAgIG1hcmtlcnM6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9KVxuICB9XG4gIFxuICByb29tS2V5QW5pbWF0aW9ucygpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudHMucm9vbUtleSB8fCAhdGhpcy5lbGVtZW50cy5zdGVwcyB8fCAhdGhpcy5lbGVtZW50cy5yb29tS2V5SGVhZGVyIHx8ICF0aGlzLmVsZW1lbnRzLnN0ZXBDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudHMucHJvZ3Jlc3NCYXIpIHJldHVybjtcblxuICAgIGxldCB0b3RhbFN0ZXBzSGVpZ2h0ID0gdGhpcy5lbGVtZW50cy5zdGVwcz8gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLnN0ZXBzKS5yZWR1Y2UoKHRvdGFsLCBzdGVwKSA9PiB0b3RhbCArIHN0ZXAub2Zmc2V0SGVpZ2h0LCAwKSA6IG51bGw7XG4gICAgbGV0IGFkanVzdGVkUGluRHVyYXRpb24gPSB0b3RhbFN0ZXBzSGVpZ2h0IC0gKHRoaXMuZWxlbWVudHMucm9vbUtleS5vZmZzZXRIZWlnaHQgKyAodGhpcy5lbGVtZW50cy5yb29tS2V5Lm9mZnNldEhlaWdodCAvIDQpKTtcbiAgICBsZXQgc2Nyb2xsT3B0aW9ucyA9IHtcbiAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleSxcbiAgICAgIHN0YXJ0OiBcImNlbnRlciBjZW50ZXJcIixcbiAgICAgIGVuZDogYCs9JHt0aGlzLmVsZW1lbnRzLnN0ZXBzWzBdLm9mZnNldEhlaWdodH1gLFxuICAgICAgc2NydWI6IHRydWUsXG4gICAgICBvbkVudGVyOiAoKSA9PiBnc2FwLnNldCh0aGlzLmVsZW1lbnRzLnN0ZXBzLCB7IG9wYWNpdHk6IDAgfSlcbiAgICB9XG5cbiAgICBnc2FwLnNldCh0aGlzLmVsZW1lbnRzLnN0ZXBzLCB7IG9wYWNpdHk6IDAsIHk6IDUwIH0pXG4gICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy5wcm9ncmVzc0JhciwgeyBvcGFjaXR5OiAwIH0pXG5cbiAgICB0aGlzLm1tLmFkZChcIihtYXgtd2lkdGg6IDc2N3B4KVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCByb29tS2V5UGluU3RhcnQgPSBcImNlbnRlciAzMCVcIjtcbiAgICAgIGNvbnN0IHJvb21LZXlQaW5FbmQgPSBhZGp1c3RlZFBpbkR1cmF0aW9uICsgdGhpcy5lbGVtZW50cy5zdGVwcy5sZW5ndGggKiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBcbiAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgaWQ6IFwicm9vbUtleVBpblwiLFxuICAgICAgICB0cmlnZ2VyOiB0aGlzLmVsZW1lbnRzLnJvb21LZXlIZWFkZXIsXG4gICAgICAgIHN0YXJ0OiBcInRvcCB0b3BcIixcbiAgICAgICAgZW5kOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyUmVjdCA9IHRoaXMuZWxlbWVudHMucm9vbUtleUhlYWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCByb29tS2V5UmVjdCA9IHRoaXMuZWxlbWVudHMucm9vbUtleS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IChyb29tS2V5UmVjdC50b3AgLSBoZWFkZXJSZWN0LnRvcCkgKyB0aGlzLmVsZW1lbnRzLnJvb21LZXkub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIHJldHVybiBgKz0ke2Rpc3RhbmNlfWA7XG4gICAgICAgIH0sXG4gICAgICAgIHBpbjogdHJ1ZSxcbiAgICAgICAgcGluU3BhY2luZzogZmFsc2UsXG4gICAgICAgIHNjcnViOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgZ3NhcC50byh0aGlzLmVsZW1lbnRzLnJvb21LZXlIZWFkZXIsIHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleSxcbiAgICAgICAgICBzdGFydDogXCJ0b3AgNzAlXCIsXG4gICAgICAgICAgZW5kOiBcInRvcCAzMCVcIixcbiAgICAgICAgICBzY3J1YjogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleSxcbiAgICAgICAgc3RhcnQ6IHJvb21LZXlQaW5TdGFydCxcbiAgICAgICAgZW5kOiBgKz0ke3Jvb21LZXlQaW5FbmR9YCxcbiAgICAgICAgcGluOiB0cnVlLFxuICAgICAgICBzY3J1YjogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgdHJpZ2dlcjogdGhpcy5lbGVtZW50cy5zdGVwQ29udGFpbmVyLFxuICAgICAgICBzdGFydDogXCJib3R0b20gYm90dG9tXCIsXG4gICAgICAgIGVuZDogYCs9JHtyb29tS2V5UGluRW5kfWAsXG4gICAgICAgIHBpbjogdHJ1ZSxcbiAgICAgICAgc2NydWI6IHRydWUsXG4gICAgICAgIG9uRW50ZXI6ICgpID0+IHtcbiAgICAgICAgICBnc2FwLnNldCh0aGlzLmVsZW1lbnRzLnN0ZXBDb250YWluZXIsIHsgeTogMCwgYm90dG9tOiBcIjJkdmhcIiwgdG9wOiBcImF1dG9cIiwgcG9zaXRpb246IFwiZml4ZWRcIiwgd2lkdGg6IFwiMTAwJVwiIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkxlYXZlOiAoKSA9PiB7XG4gICAgICAgICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy5zdGVwQ29udGFpbmVyLCB7IHBvc2l0aW9uOiBcIlwiLCBib3R0b206IFwiXCIsIHRvcDogXCJcIiwgeTogXCJcIiB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25MZWF2ZUJhY2s6ICgpID0+IHtcbiAgICAgICAgICBnc2FwLnNldCh0aGlzLmVsZW1lbnRzLnN0ZXBDb250YWluZXIsIHsgcG9zaXRpb246IFwiXCIsIGJvdHRvbTogXCJcIiwgdG9wOiBcIlwiLCB5OiBcIlwiIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy5zdGVwcywgeyBvcGFjaXR5OiAwLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB3aWR0aDogXCIxMDAlXCIgfSk7XG5cbiAgICAgIGxldCBzdGVwVGwgPSBnc2FwLnRpbWVsaW5lKHtcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMuc3RlcENvbnRhaW5lcixcbiAgICAgICAgICBzdGFydDogXCJib3R0b20gYm90dG9tXCIsXG4gICAgICAgICAgZW5kOiBgKz0ke3Jvb21LZXlQaW5FbmR9YCxcbiAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgICBvblVwZGF0ZTogc2VsZiA9PiB7XG4gICAgICAgICAgICBsZXQgdG90YWxTdGVwcyA9IHRoaXMuZWxlbWVudHMuc3RlcHMubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHJhd0luZGV4ID0gTWF0aC5mbG9vcihzZWxmLnByb2dyZXNzICogdG90YWxTdGVwcyk7IC8vIDAuLnRvdGFsU3RlcHMtMVxuXG4gICAgICAgICAgICAvLyBDbGFtcCB0byB2YWxpZCBpbmRleFxuICAgICAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgocmF3SW5kZXgsIDEpLCB0b3RhbFN0ZXBzIC0gMSk7XG5cbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUluZGV4SGlnaGxpZ2h0ZXIoYWN0aXZlSW5kZXggLSAxKTtcblxuICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucm9vbUtleS5jbGFzc0xpc3QuYWRkKFwiZmxpcFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA8IDIpIHtcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5yb29tS2V5LmNsYXNzTGlzdC5yZW1vdmUoXCJmbGlwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZWxlbWVudHMuc3RlcHMuZm9yRWFjaCgoc3RlcCwgaW5kZXgpID0+IHtcbiAgICAgICAgc3RlcFRsLnRvKHN0ZXAsIHsgb3BhY2l0eTogMSwgZHVyYXRpb246IDAuOCB9KVxuXG4gICAgICAgIGlmIChpbmRleCA8IHRoaXMuZWxlbWVudHMuc3RlcHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHN0ZXBUbC50byhzdGVwLCB7IG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjggfSwgXCIrPTEuNVwiKTtcbiAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgfSk7XG5cbiAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgdHJpZ2dlcjogdGhpcy5lbGVtZW50cy5zdGVwc1sxXSxcbiAgICAgICAgc3RhcnQ6IFwidG9wIDYwJVwiLFxuICAgICAgICBlbmQ6IFwidG9wIDQwJVwiLFxuICAgICAgICBvbkVudGVyOiAoKSA9PiB0aGlzLnNob3dQcm9ncmVzc0JhcigpLFxuICAgICAgICBvbkxlYXZlQmFjazogKCkgPT4gdGhpcy5oaWRlUHJvZ3Jlc3NCYXIoKSxcbiAgICAgICAgc2NydWI6IHRydWUsXG4gICAgICAgIHBpblNwYWNpbmc6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCkpO1xuICAgIH0pO1xuICAgIFxuICAgIFxuICAgIHRoaXMubW0uYWRkKFwiKG1pbi13aWR0aDogNzY4cHgpXCIsICgpID0+IHtcbiAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgaWQ6IFwicm9vbUtleVBpblwiLFxuICAgICAgICB0cmlnZ2VyOiB0aGlzLmVsZW1lbnRzLnJvb21LZXlIZWFkZXIsXG4gICAgICAgIHN0YXJ0OiBcInRvcCB0b3BcIixcbiAgICAgICAgZW5kOiAoKSA9PiBgKz0ke3RoaXMuZWxlbWVudHMucm9vbUtleS5vZmZzZXRIZWlnaHQgKiAxLjV9YCwgLy8gS2VlcCBpdCBwaW5uZWQgd2hpbGUgcm9vbUtleSBtb3ZlcyBvdmVyXG4gICAgICAgIHBpbjogdHJ1ZSxcbiAgICAgICAgcGluU3BhY2luZzogZmFsc2UsXG4gICAgICAgIHNjcnViOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgZ3NhcC50byh0aGlzLmVsZW1lbnRzLnJvb21LZXlIZWFkZXIsIHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleSxcbiAgICAgICAgICBzdGFydDogXCJ0b3AgNTUlXCIsXG4gICAgICAgICAgZW5kOiBcInRvcCAzMCVcIixcbiAgICAgICAgICBzY3J1YjogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleSxcbiAgICAgICAgc3RhcnQ6IFwiY2VudGVyIGNlbnRlclwiLFxuICAgICAgICBlbmQ6IGArPSR7YWRqdXN0ZWRQaW5EdXJhdGlvbn1gLFxuICAgICAgICBwaW46IHRydWUsXG4gICAgICAgIHNjcnViOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgZ3NhcC50byh0aGlzLmVsZW1lbnRzLnJvb21LZXksIHtcbiAgICAgICAgeDogXCI4NSVcIixcbiAgICAgICAgcm90YXRlOiBcIjVkZWdcIixcbiAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHNjcm9sbE9wdGlvbnNcbiAgICAgIH0pXG5cbiAgICAgIC8vIFN0ZXAgb3BhY2l0eSBzaG91bGQgYmUgc2Nyb2xsLWJhc2VkIChmYWRlIGluL291dCBiYXNlZCBvbiBzY3JvbGwpXG4gICAgICB0aGlzLmVsZW1lbnRzLnN0ZXBzLmZvckVhY2goKHN0ZXAsIGluZGV4KSA9PiB7IFxuICAgICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgICAgdHJpZ2dlcjogc3RlcCxcbiAgICAgICAgICBzdGFydDogXCJ0b3AgNzAlXCIsXG4gICAgICAgICAgZW5kOiBcInRvcCA1MCVcIixcbiAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgICB0b2dnbGVBY3Rpb25zOiBcInBsYXkgbm9uZSBub25lIHJldmVyc2VcIixcbiAgICAgICAgICBvbkVudGVyOiAoKSA9PiBnc2FwLnRvKHN0ZXAsIHsgb3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IDAuMyB9KSxcbiAgICAgICAgICBvbkxlYXZlQmFjazogKCkgPT4gZ3NhcC50byhzdGVwLCB7IG9wYWNpdHk6IDAsIHk6IDUwLCBkdXJhdGlvbjogMC4zIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICoqRmxpcCByb29tLWtleSB3aGVuIHRoZSBzZWNvbmQgc3RlcCBhcHBlYXJzKipcbiAgICAgICAgaWYgKGluZGV4ID09PSAyKSB7XG4gICAgICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xuICAgICAgICAgICAgdHJpZ2dlcjogc3RlcCxcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCBjZW50ZXJcIixcbiAgICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHRoaXMuZWxlbWVudHMucm9vbUtleS5jbGFzc0xpc3QuYWRkKFwiZmxpcFwiKSxcbiAgICAgICAgICAgIG9uTGVhdmVCYWNrOiAoKSA9PiB0aGlzLmVsZW1lbnRzLnJvb21LZXkuY2xhc3NMaXN0LnJlbW92ZShcImZsaXBcIilcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgICB0cmlnZ2VyOiBzdGVwLFxuICAgICAgICAgIHN0YXJ0OiBcInRvcCA1MCVcIiwgLy8gV2hlbiB0aGUgc3RlcCByZWFjaGVzIDUwJSBvZiB0aGUgdmlld3BvcnRcbiAgICAgICAgICBlbmQ6IFwidG9wIDMwJVwiLCAvLyBXaGVuIHRoZSBzdGVwIGlzIGFsbW9zdCBmdWxseSBpbiB2aWV3XG4gICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xuICAgICAgICAgICAgaWYoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSW5kZXhIaWdobGlnaHRlcihpbmRleCk7IC8vIEhpZ2hsaWdodCB0aGUgY29ycmVzcG9uZGluZyBkb3QgZm9yIHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUluZGV4SGlnaGxpZ2h0ZXIoaW5kZXggLSAxKTsgLy8gSGlnaGxpZ2h0IHRoZSBjb3JyZXNwb25kaW5nIGRvdCBmb3IgdGhlIGN1cnJlbnQgc3RlcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25MZWF2ZUJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgIGlmKGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUluZGV4SGlnaGxpZ2h0ZXIoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUluZGV4SGlnaGxpZ2h0ZXIoaW5kZXggLSAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy8gUGluIHByb2dyZXNzIGJhciBhdCBhbGwgdGltZXMgKG9ubHkgc2hvdy9oaWRlKVxuICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleVNlY3Rpb24sXG4gICAgICBzdGFydDogXCJ0b3AgdG9wXCIsXG4gICAgICBlbmQ6IFwiYm90dG9tIGJvdHRvbVwiLFxuICAgICAgcGluOiB0aGlzLmVsZW1lbnRzLnByb2dyZXNzQmFyXG4gICAgfSlcblxuICAgIC8vIFNob3cgcHJvZ3Jlc3MgYmFyIHdoZW4gcm9vbUtleSBpcyBmdWxseSBpbiB2aWV3XG5cbiAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICB0cmlnZ2VyOiB0aGlzLmVsZW1lbnRzLnN0ZXBzWzFdLFxuICAgICAgc3RhcnQ6IFwidG9wIGNlbnRlclwiLCAvLyBXaGVuIHRoZSBmaXJzdCBzdGVwIHJlYWNoZXMgdGhlIGNlbnRlciBvZiB0aGUgdmlld3BvcnRcbiAgICAgIG9uRW50ZXI6ICgpID0+IHRoaXMuc2hvd1Byb2dyZXNzQmFyKCksXG4gICAgICBvbkxlYXZlQmFjazogKCkgPT4gdGhpcy5oaWRlUHJvZ3Jlc3NCYXIoKSxcbiAgICAgIG1hcmtlcnM6IGZhbHNlXG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKSk7XG5cbiAgfVxuXG4gIGFydGlzdFNlY3Rpb25BbmltYXRpb25zKCkge1xuICAgIGlmICghdGhpcy5lbGVtZW50cy52aWRlb0Jsb2NrIHx8ICF0aGlzLmVsZW1lbnRzLnZpZGVvIHx8ICF0aGlzLmVsZW1lbnRzLmFydGlzdE5hbWVzKSByZXR1cm47XG5cbiAgICBnc2FwLmZyb21Ubyh0aGlzLmVsZW1lbnRzLnZpZGVvQmxvY2ssIFxuICAgICAgeyBjbGlwUGF0aDogXCJwb2x5Z29uKDUlIDUlLCA5NSUgNSUsIDk1JSA5NSUsIDUlIDk1JSlcIn0sXG4gICAgICB7XG4gICAgICAgIGNsaXBQYXRoOiBcInBvbHlnb24oMCUgMCUsIDEwMCUgMCUsIDEwMCUgMTAwJSwgMCUgMTAwJSlcIixcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMudmlkZW9CbG9jayxcbiAgICAgICAgICBzdGFydDogJzUlIGJvdHRvbScsXG4gICAgICAgICAgc2NydWI6IHRydWUsXG4gICAgICAgICAgbWFya2VyczogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICB9XG4gICAgKVxuICAgIGdzYXAuZnJvbVRvKHRoaXMuZWxlbWVudHMudmlkZW8sIFxuICAgICAge1xuICAgICAgICBzY2FsZTogMS41XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMudmlkZW9CbG9jayxcbiAgICAgICAgICBzdGFydDogJzUlIGJvdHRvbScsIC8vIFN0YXJ0IHRoZSBhbmltYXRpb24gd2hlbiB0aGUgdG9wIG9mIHRoZSBoZXJvQ29udGVudCBoaXRzIDkwJSBvZiB0aGUgdmlld3BvcnRcbiAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgICBtYXJrZXJzOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIixcbiAgICAgIH1cbiAgICApXG5cbiAgICB0aGlzLmVsZW1lbnRzLmFydGlzdE5hbWVzLmZvckVhY2goKG5hbWUsIGkpID0+IHtcbiAgICAgIGxldCBnZXRWYWwgPSBuYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1hcnRpc3QtbmFtZS1hbmltYXRpb24nKVxuICAgICAgbGV0IHN0YXJ0WHBvcyA9IGdldFZhbCA9PT0gXCJsZWZ0XCIgPyBcIjEwJVwiOiBcIi0xMCVcIlxuICAgICAgXG4gICAgICBnc2FwLmZyb21UbyhuYW1lLFxuICAgICAgICB7IFxuICAgICAgICAgIHg6IHN0YXJ0WHBvcyxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjQsXG4gICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgICAgdHJpZ2dlcjogbmFtZSxcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCBib3R0b21cIixcbiAgICAgICAgICAgIG1hcmtlcnM6IGZhbHNlLFxuICAgICAgICAgICAgc2NydWI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcblxuICAgIH0pXG4gIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsb2NhbHNKc29uU3RyaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyAxNzU0OTUzMTk4NTAyXG4gICAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wicHVibGljUGF0aFwiOlwiXCJ9KTtcbiAgICAgICAgLy8gb25seSBpbnZhbGlkYXRlIHdoZW4gbG9jYWxzIGNoYW5nZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhICYmXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhLnZhbHVlICYmXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhLnZhbHVlICE9PSBsb2NhbHNKc29uU3RyaW5nXG4gICAgICAgICkge1xuICAgICAgICAgIG1vZHVsZS5ob3QuaW52YWxpZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBkYXRhLnZhbHVlID0gbG9jYWxzSnNvblN0cmluZztcbiAgICAgICAgICBjc3NSZWxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiM2M5MTBjNDc2NTAwMmUxNTdkYTRcIikiXSwibmFtZXMiOlsiUGFnZSIsImdzYXAiLCJTY3JvbGxUcmlnZ2VyIiwiSG9tZSIsImNvbnN0cnVjdG9yIiwiaWQiLCJlbGVtZW50cyIsImhlcm9Db250ZW50IiwiaG9tZUJvZHkiLCJ2aWRlb0Jsb2NrIiwidmlkZW8iLCJwb2xhcm9pZCIsInJvb21LZXlTZWN0aW9uIiwicm9vbUtleUhlYWRlciIsInJvb21LZXlUaXRsZSIsInJvb21LZXkiLCJwcm9ncmVzc0JhciIsInByb2dyZXNzSGlnaGxpZ2h0IiwicHJvZ3Jlc3NJbmRpY2VzIiwic3RlcHMiLCJhcnRpc3ROYW1lcyIsInN0ZXBDb250YWluZXIiLCJyZWdpc3RlclBsdWdpbiIsIm1tIiwibWF0Y2hNZWRpYSIsInBpbm5lZEhlaWdodCIsIm9mZnNldEhlaWdodCIsImlzUHJvZ3Jlc3NCYXJWaXNpYmxlIiwiY3VycmVudEFjdGl2ZUluZGV4IiwiaW5pdCIsInNldFVwU2Nyb2xsQW5pbWF0aW9ucyIsImFuaW1hdGVJbmRleEhpZ2hsaWdodGVyIiwibmV3SW5kZXgiLCJ5UG9zQ2FsYyIsInlQb3MiLCJ0byIsInkiLCJkdXJhdGlvbiIsImVhc2UiLCJoaWRlUHJvZ3Jlc3NCYXIiLCJvcGFjaXR5Iiwic2hvd1Byb2dyZXNzQmFyIiwicG9sYXJvaWRQYXJhbGxheCIsInJvb21LZXlBbmltYXRpb25zIiwiYXJ0aXN0U2VjdGlvbkFuaW1hdGlvbnMiLCJmb3JFYWNoIiwiZWxlbWVudCIsImkiLCJmcm9tVG8iLCJzY3JvbGxUcmlnZ2VyIiwidHJpZ2dlciIsInN0YXJ0Iiwic2NydWIiLCJtYXJrZXJzIiwidG90YWxTdGVwc0hlaWdodCIsIkFycmF5IiwiZnJvbSIsInJlZHVjZSIsInRvdGFsIiwic3RlcCIsImFkanVzdGVkUGluRHVyYXRpb24iLCJzY3JvbGxPcHRpb25zIiwiZW5kIiwib25FbnRlciIsInNldCIsImFkZCIsInJvb21LZXlQaW5TdGFydCIsInJvb21LZXlQaW5FbmQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImNyZWF0ZSIsImhlYWRlclJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyb29tS2V5UmVjdCIsImRpc3RhbmNlIiwidG9wIiwicGluIiwicGluU3BhY2luZyIsImJvdHRvbSIsInBvc2l0aW9uIiwid2lkdGgiLCJvbkxlYXZlIiwib25MZWF2ZUJhY2siLCJzdGVwVGwiLCJ0aW1lbGluZSIsIm9uVXBkYXRlIiwic2VsZiIsInRvdGFsU3RlcHMiLCJyYXdJbmRleCIsIk1hdGgiLCJmbG9vciIsInByb2dyZXNzIiwiYWN0aXZlSW5kZXgiLCJtaW4iLCJtYXgiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJpbmRleCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWZyZXNoIiwieCIsInJvdGF0ZSIsInRvZ2dsZUFjdGlvbnMiLCJjbGlwUGF0aCIsInNjYWxlIiwibmFtZSIsImdldFZhbCIsImdldEF0dHJpYnV0ZSIsInN0YXJ0WHBvcyJdLCJzb3VyY2VSb290IjoiIn0=
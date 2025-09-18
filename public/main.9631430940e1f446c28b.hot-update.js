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
    this.roomKeyCtx = null;
    this.init();
  }
  init() {
    this.setUpScrollAnimations();
    window.addEventListener("resize", () => {
      if (this.roomKeyCtx) this.roomKeyCtx.revert();
      this.buildRoomKeyAnimations();
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.refresh();
      this.updateProcessHighlight();
    });
  }
  animateIndexHighlighter(newIndex) {
    const maxIndex = this.elements.steps.length - 1;
    const clampedIndex = Math.min(Math.max(newIndex, 0), maxIndex);
    if (clampedIndex !== this.currentActiveIndex) {
      let yPos = `${clampedIndex * 100}%`;
      gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.progressHighlight, {
        y: yPos,
        duration: 0.4,
        ease: "power2.out"
      });
      this.currentActiveIndex = clampedIndex;
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
    this.buildRoomKeyAnimations();
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
  buildRoomKeyAnimations() {
    if (!this.elements.roomKey || !this.elements.steps || !this.elements.roomKeyHeader || !this.elements.stepContainer || !this.elements.progressBar) return;
    this.roomKeyCtx = gsap__WEBPACK_IMPORTED_MODULE_1__["default"].context(() => {
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
      if (window.innerWidth < 768) {
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

        // master pin
        gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
          trigger: this.elements.roomKey,
          start: roomKeyPinStart,
          end: `+=${roomKeyPinEnd}`,
          pin: this.elements.roomKeySection,
          pinSpacing: true,
          anticipatePin: 0.5,
          scrub: true
        });
        gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__.ScrollTrigger.create({
          trigger: this.elements.stepContainer,
          start: "bottom bottom",
          end: `+=${roomKeyPinEnd}`,
          scrub: true
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
      } else {
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
      }

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
    }, this.elements.roomKeySection);
  }
  updateProcessHighlight() {
    const steps = this.elements.steps;
    if (!steps) return;
    let foundIndex = Array.from(steps).findIndex(step => {
      const rect = step.getBoundingClientRect();
      // Middle of step is in viewport
      return rect.top + rect.height / 2 >= 0 && rect.top + rect.height / 2 <= window.innerHeight;
    });
    if (foundIndex === -1) {
      // If no step is in viewport, highlight last step scrolled past
      foundIndex = steps.length - 1;
    }
    this.animateIndexHighlighter(foundIndex);
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
        // 1758224392269
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
/******/ 	__webpack_require__.h = () => ("fbf7a4df6464026b31eb")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3BCLFVBQVUsVUFBVTtBQUNwQixVQUFVLFVBQVU7QUFDcEI7QUFDQSxVQUFVLFVBQVU7QUFDcEIsVUFBVTtBQUNWLFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0EsUUFBUSxVQUFVO0FBQ2xCO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsRTs7Ozs7Ozs7VUN2QkEsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb29tMTg3Ly4vYXBwL3BhZ2VzL0hvbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9vbTE4Ny8uL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL3Jvb20xODcvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlIGZyb20gJ2NsYXNzZXMvUGFnZSdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSAnZ3NhcC9TY3JvbGxUcmlnZ2VyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGlkOiAnaG9tZScsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBoZXJvQ29udGVudDogJ1tkYXRhLWhlcm8tY29udGVudF0nLFxuICAgICAgICBob21lQm9keTogJ1tkYXRhLWhvbWUtYm9keV0nLFxuICAgICAgICB2aWRlb0Jsb2NrOiAnW2RhdGEtdmlkZW8tc2Nyb2xsXScsXG4gICAgICAgIHZpZGVvOiAnW2RhdGEtdmlkZW8tc2Nyb2xsXSBbZGF0YS12aWRlb10nLFxuICAgICAgICBwb2xhcm9pZDogJ1tkYXRhLXBvbGFyb2lkXScsXG4gICAgICAgIHJvb21LZXlTZWN0aW9uOiAnW2RhdGEtcm9vbS1rZXktc2VjdGlvbl0nLFxuICAgICAgICByb29tS2V5SGVhZGVyOiAnW2RhdGEtcm9vbS1rZXktaGVhZGVyXScsXG4gICAgICAgIHJvb21LZXlUaXRsZTogJ1tkYXRhLXJvb20ta2V5LXRpdGxlc10nLFxuICAgICAgICByb29tS2V5OiAnW2RhdGEtcm9vbS1rZXldJyxcbiAgICAgICAgcHJvZ3Jlc3NCYXI6ICdbZGF0YS1wcm9ncmVzcy1iYXJdJyxcbiAgICAgICAgcHJvZ3Jlc3NIaWdobGlnaHQ6ICdbZGF0YS1wcm9ncmVzcy1oaWdobGlnaHRdJyxcbiAgICAgICAgcHJvZ3Jlc3NJbmRpY2VzOiAnW2RhdGEtcHJvZ3Jlc3MtaW5kZXhdJyxcbiAgICAgICAgc3RlcHM6ICdbZGF0YS1wcm9ncmVzcy1zdGVwc10nLFxuICAgICAgICBhcnRpc3ROYW1lczogJ1tkYXRhLWFydGlzdC1uYW1lLWFuaW1hdGlvbl0nLFxuICAgICAgICBzdGVwQ29udGFpbmVyOiAnW2RhdGEtc3RlcC1jb250YWluZXJdJ1xuICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyKVxuICAgIFxuICAgIHRoaXMubW0gPSBnc2FwLm1hdGNoTWVkaWEoKVxuICAgIHRoaXMucGlubmVkSGVpZ2h0ID0gdGhpcy5lbGVtZW50cy5yb29tS2V5U2VjdGlvbj8gdGhpcy5lbGVtZW50cy5yb29tS2V5U2VjdGlvbi5vZmZzZXRIZWlnaHQgOiAxMDBcbiAgICB0aGlzLmlzUHJvZ3Jlc3NCYXJWaXNpYmxlID0gZmFsc2VcbiAgICB0aGlzLmN1cnJlbnRBY3RpdmVJbmRleCA9IC0xXG4gICAgdGhpcy5yb29tS2V5Q3R4ID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0VXBTY3JvbGxBbmltYXRpb25zKClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgIGlmKHRoaXMucm9vbUtleUN0eCkgdGhpcy5yb29tS2V5Q3R4LnJldmVydCgpXG5cbiAgICAgIHRoaXMuYnVpbGRSb29tS2V5QW5pbWF0aW9ucygpXG4gICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKVxuICAgICAgdGhpcy51cGRhdGVQcm9jZXNzSGlnaGxpZ2h0KClcbiAgICB9KVxuICB9XG5cbiAgYW5pbWF0ZUluZGV4SGlnaGxpZ2h0ZXIobmV3SW5kZXgpIHtcbiAgICBjb25zdCBtYXhJbmRleCA9IHRoaXMuZWxlbWVudHMuc3RlcHMubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBjbGFtcGVkSW5kZXggPSBNYXRoLm1pbihNYXRoLm1heChuZXdJbmRleCwgMCksIG1heEluZGV4KTtcblxuICAgIGlmKGNsYW1wZWRJbmRleCAhPT0gdGhpcy5jdXJyZW50QWN0aXZlSW5kZXgpIHtcbiAgICAgIGxldCB5UG9zID0gYCR7Y2xhbXBlZEluZGV4ICogMTAwfSVgO1xuICAgICAgZ3NhcC50byh0aGlzLmVsZW1lbnRzLnByb2dyZXNzSGlnaGxpZ2h0LCB7IHk6IHlQb3MsIGR1cmF0aW9uOiAwLjQsIGVhc2U6IFwicG93ZXIyLm91dFwiIH0pO1xuICAgICAgdGhpcy5jdXJyZW50QWN0aXZlSW5kZXggPSBjbGFtcGVkSW5kZXg7XG4gICAgfVxuICB9XG5cbiAgaGlkZVByb2dyZXNzQmFyKCkge1xuICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy5wcm9ncmVzc0JhciAsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBkdXJhdGlvbjogMC40LFxuICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCJcbiAgICB9KVxuXG4gICAgdGhpcy5pc1Byb2dyZXNzQmFyVmlzaWJsZSA9IGZhbHNlXG4gIH1cblxuICBzaG93UHJvZ3Jlc3NCYXIoKSB7XG4gICAgZ3NhcC50byh0aGlzLmVsZW1lbnRzLnByb2dyZXNzQmFyICwge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGR1cmF0aW9uOiAwLjQsXG4gICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIlxuICAgIH0pXG5cbiAgICB0aGlzLmlzUHJvZ3Jlc3NCYXJWaXNpYmxlID0gdHJ1ZVxuICB9XG5cbiAgc2V0VXBTY3JvbGxBbmltYXRpb25zKCkge1xuICAgIHRoaXMucG9sYXJvaWRQYXJhbGxheCgpXG4gICAgdGhpcy5idWlsZFJvb21LZXlBbmltYXRpb25zKClcbiAgICB0aGlzLmFydGlzdFNlY3Rpb25BbmltYXRpb25zKClcbiAgfVxuICBcbiAgcG9sYXJvaWRQYXJhbGxheCgpIHtcbiAgICBpZighdGhpcy5lbGVtZW50cy5wb2xhcm9pZCkgcmV0dXJuXG5cbiAgICB0aGlzLmVsZW1lbnRzLnBvbGFyb2lkLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgIGdzYXAuZnJvbVRvKGVsZW1lbnQsIFxuICAgICAgICB7XG4gICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICB0cmlnZ2VyOiBlbGVtZW50LFxuICAgICAgICAgICAgc3RhcnQ6ICc1MCUgYm90dG9tJyxcbiAgICAgICAgICAgIHNjcnViOiBmYWxzZSxcbiAgICAgICAgICAgIG1hcmtlcnM6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIixcbiAgICAgICAgICBkdXJhdGlvbjogMC42XG4gICAgICAgIH1cbiAgICAgIClcblxuICAgICAgZ3NhcC5mcm9tVG8oZWxlbWVudCwgXG4gICAgICAgIHtcbiAgICAgICAgICB5OiBcIjEwJVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB5OiBcIi0yMCVcIixcbiAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICB0cmlnZ2VyOiBlbGVtZW50LFxuICAgICAgICAgICAgc3RhcnQ6ICc1JSBib3R0b20nLFxuICAgICAgICAgICAgc2NydWI6IHRydWUsXG4gICAgICAgICAgICBtYXJrZXJzOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICB9XG4gICAgICApXG4gICAgfSlcbiAgfVxuICBcbiAgYnVpbGRSb29tS2V5QW5pbWF0aW9ucygpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudHMucm9vbUtleSB8fCAhdGhpcy5lbGVtZW50cy5zdGVwcyB8fCAhdGhpcy5lbGVtZW50cy5yb29tS2V5SGVhZGVyIHx8ICF0aGlzLmVsZW1lbnRzLnN0ZXBDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudHMucHJvZ3Jlc3NCYXIpIHJldHVybjtcblxuICAgIHRoaXMucm9vbUtleUN0eCA9IGdzYXAuY29udGV4dCgoKSA9PiB7XG4gICAgICBsZXQgdG90YWxTdGVwc0hlaWdodCA9IHRoaXMuZWxlbWVudHMuc3RlcHM/IEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5zdGVwcykucmVkdWNlKCh0b3RhbCwgc3RlcCkgPT4gdG90YWwgKyBzdGVwLm9mZnNldEhlaWdodCwgMCkgOiBudWxsO1xuICAgICAgbGV0IGFkanVzdGVkUGluRHVyYXRpb24gPSB0b3RhbFN0ZXBzSGVpZ2h0IC0gKHRoaXMuZWxlbWVudHMucm9vbUtleS5vZmZzZXRIZWlnaHQgKyAodGhpcy5lbGVtZW50cy5yb29tS2V5Lm9mZnNldEhlaWdodCAvIDQpKTtcbiAgICAgIGxldCBzY3JvbGxPcHRpb25zID0ge1xuICAgICAgICB0cmlnZ2VyOiB0aGlzLmVsZW1lbnRzLnJvb21LZXksXG4gICAgICAgIHN0YXJ0OiBcImNlbnRlciBjZW50ZXJcIixcbiAgICAgICAgZW5kOiBgKz0ke3RoaXMuZWxlbWVudHMuc3RlcHNbMF0ub2Zmc2V0SGVpZ2h0fWAsXG4gICAgICAgIHNjcnViOiB0cnVlLFxuICAgICAgICBvbkVudGVyOiAoKSA9PiBnc2FwLnNldCh0aGlzLmVsZW1lbnRzLnN0ZXBzLCB7IG9wYWNpdHk6IDAgfSlcbiAgICAgIH1cblxuICAgICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy5zdGVwcywgeyBvcGFjaXR5OiAwLCB5OiA1MCB9KVxuICAgICAgZ3NhcC5zZXQodGhpcy5lbGVtZW50cy5wcm9ncmVzc0JhciwgeyBvcGFjaXR5OiAwIH0pXG5cbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICBjb25zdCByb29tS2V5UGluU3RhcnQgPSBcImNlbnRlciAzMCVcIjtcbiAgICAgICAgY29uc3Qgcm9vbUtleVBpbkVuZCA9IGFkanVzdGVkUGluRHVyYXRpb24gKyB0aGlzLmVsZW1lbnRzLnN0ZXBzLmxlbmd0aCAqIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgICBpZDogXCJyb29tS2V5UGluXCIsXG4gICAgICAgICAgdHJpZ2dlcjogdGhpcy5lbGVtZW50cy5yb29tS2V5SGVhZGVyLFxuICAgICAgICAgIHN0YXJ0OiBcInRvcCB0b3BcIixcbiAgICAgICAgICBlbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclJlY3QgPSB0aGlzLmVsZW1lbnRzLnJvb21LZXlIZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCByb29tS2V5UmVjdCA9IHRoaXMuZWxlbWVudHMucm9vbUtleS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKHJvb21LZXlSZWN0LnRvcCAtIGhlYWRlclJlY3QudG9wKSArIHRoaXMuZWxlbWVudHMucm9vbUtleS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICByZXR1cm4gYCs9JHtkaXN0YW5jZX1gO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcGluOiB0cnVlLFxuICAgICAgICAgIHBpblNwYWNpbmc6IGZhbHNlLFxuICAgICAgICAgIHNjcnViOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy5yb29tS2V5SGVhZGVyLCB7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICB0cmlnZ2VyOiB0aGlzLmVsZW1lbnRzLnJvb21LZXksXG4gICAgICAgICAgICBzdGFydDogXCJ0b3AgNzAlXCIsXG4gICAgICAgICAgICBlbmQ6IFwidG9wIDMwJVwiLFxuICAgICAgICAgICAgc2NydWI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gbWFzdGVyIHBpblxuICAgICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgICAgdHJpZ2dlcjogdGhpcy5lbGVtZW50cy5yb29tS2V5LFxuICAgICAgICAgIHN0YXJ0OiByb29tS2V5UGluU3RhcnQsXG4gICAgICAgICAgZW5kOiBgKz0ke3Jvb21LZXlQaW5FbmR9YCxcbiAgICAgICAgICBwaW46IHRoaXMuZWxlbWVudHMucm9vbUtleVNlY3Rpb24sXG4gICAgICAgICAgcGluU3BhY2luZzogdHJ1ZSxcbiAgICAgICAgICBhbnRpY2lwYXRlUGluOiAwLjUsXG4gICAgICAgICAgc2NydWI6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMuc3RlcENvbnRhaW5lcixcbiAgICAgICAgICBzdGFydDogXCJib3R0b20gYm90dG9tXCIsXG4gICAgICAgICAgZW5kOiBgKz0ke3Jvb21LZXlQaW5FbmR9YCxcbiAgICAgICAgICBzY3J1YjogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBnc2FwLnNldCh0aGlzLmVsZW1lbnRzLnN0ZXBzLCB7IG9wYWNpdHk6IDAsIHBvc2l0aW9uOiBcImFic29sdXRlXCIsIHdpZHRoOiBcIjEwMCVcIiB9KTtcblxuICAgICAgICBsZXQgc3RlcFRsID0gZ3NhcC50aW1lbGluZSh7XG4gICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgICAgdHJpZ2dlcjogdGhpcy5lbGVtZW50cy5zdGVwQ29udGFpbmVyLFxuICAgICAgICAgICAgc3RhcnQ6IFwiYm90dG9tIGJvdHRvbVwiLFxuICAgICAgICAgICAgZW5kOiBgKz0ke3Jvb21LZXlQaW5FbmR9YCxcbiAgICAgICAgICAgIHNjcnViOiB0cnVlLFxuICAgICAgICAgICAgb25VcGRhdGU6IHNlbGYgPT4ge1xuICAgICAgICAgICAgICBsZXQgdG90YWxTdGVwcyA9IHRoaXMuZWxlbWVudHMuc3RlcHMubGVuZ3RoO1xuICAgICAgICAgICAgICBsZXQgcmF3SW5kZXggPSBNYXRoLmZsb29yKHNlbGYucHJvZ3Jlc3MgKiB0b3RhbFN0ZXBzKTsgLy8gMC4udG90YWxTdGVwcy0xXG5cbiAgICAgICAgICAgICAgLy8gQ2xhbXAgdG8gdmFsaWQgaW5kZXhcbiAgICAgICAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgocmF3SW5kZXgsIDEpLCB0b3RhbFN0ZXBzIC0gMSk7XG5cbiAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSW5kZXhIaWdobGlnaHRlcihhY3RpdmVJbmRleCAtIDEpO1xuXG4gICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucm9vbUtleS5jbGFzc0xpc3QuYWRkKFwiZmxpcFwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5kZXggPCAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5yb29tS2V5LmNsYXNzTGlzdC5yZW1vdmUoXCJmbGlwXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLnN0ZXBzLmZvckVhY2goKHN0ZXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgc3RlcFRsLnRvKHN0ZXAsIHsgb3BhY2l0eTogMSwgZHVyYXRpb246IDAuOCB9KVxuXG4gICAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5lbGVtZW50cy5zdGVwcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBzdGVwVGwudG8oc3RlcCwgeyBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC44IH0sIFwiKz0xLjVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgICB0cmlnZ2VyOiB0aGlzLmVsZW1lbnRzLnN0ZXBzWzFdLFxuICAgICAgICAgIHN0YXJ0OiBcInRvcCA2MCVcIixcbiAgICAgICAgICBlbmQ6IFwidG9wIDQwJVwiLFxuICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHRoaXMuc2hvd1Byb2dyZXNzQmFyKCksXG4gICAgICAgICAgb25MZWF2ZUJhY2s6ICgpID0+IHRoaXMuaGlkZVByb2dyZXNzQmFyKCksXG4gICAgICAgICAgc2NydWI6IHRydWUsXG4gICAgICAgICAgcGluU3BhY2luZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgICAgaWQ6IFwicm9vbUtleVBpblwiLFxuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleUhlYWRlcixcbiAgICAgICAgICBzdGFydDogXCJ0b3AgdG9wXCIsXG4gICAgICAgICAgZW5kOiAoKSA9PiBgKz0ke3RoaXMuZWxlbWVudHMucm9vbUtleS5vZmZzZXRIZWlnaHQgKiAxLjV9YCwgLy8gS2VlcCBpdCBwaW5uZWQgd2hpbGUgcm9vbUtleSBtb3ZlcyBvdmVyXG4gICAgICAgICAgcGluOiB0cnVlLFxuICAgICAgICAgIHBpblNwYWNpbmc6IGZhbHNlLFxuICAgICAgICAgIHNjcnViOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy5yb29tS2V5SGVhZGVyLCB7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICB0cmlnZ2VyOiB0aGlzLmVsZW1lbnRzLnJvb21LZXksXG4gICAgICAgICAgICBzdGFydDogXCJ0b3AgNTUlXCIsXG4gICAgICAgICAgICBlbmQ6IFwidG9wIDMwJVwiLFxuICAgICAgICAgICAgc2NydWI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleSxcbiAgICAgICAgICBzdGFydDogXCJjZW50ZXIgY2VudGVyXCIsXG4gICAgICAgICAgZW5kOiBgKz0ke2FkanVzdGVkUGluRHVyYXRpb259YCxcbiAgICAgICAgICBwaW46IHRydWUsXG4gICAgICAgICAgc2NydWI6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBnc2FwLnRvKHRoaXMuZWxlbWVudHMucm9vbUtleSwge1xuICAgICAgICAgIHg6IFwiODUlXCIsXG4gICAgICAgICAgcm90YXRlOiBcIjVkZWdcIixcbiAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIixcbiAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiBzY3JvbGxPcHRpb25zXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gU3RlcCBvcGFjaXR5IHNob3VsZCBiZSBzY3JvbGwtYmFzZWQgKGZhZGUgaW4vb3V0IGJhc2VkIG9uIHNjcm9sbClcbiAgICAgICAgdGhpcy5lbGVtZW50cy5zdGVwcy5mb3JFYWNoKChzdGVwLCBpbmRleCkgPT4geyBcbiAgICAgICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICB0cmlnZ2VyOiBzdGVwLFxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDcwJVwiLFxuICAgICAgICAgICAgZW5kOiBcInRvcCA1MCVcIixcbiAgICAgICAgICAgIHNjcnViOiB0cnVlLFxuICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogXCJwbGF5IG5vbmUgbm9uZSByZXZlcnNlXCIsXG4gICAgICAgICAgICBvbkVudGVyOiAoKSA9PiBnc2FwLnRvKHN0ZXAsIHsgb3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IDAuMyB9KSxcbiAgICAgICAgICAgIG9uTGVhdmVCYWNrOiAoKSA9PiBnc2FwLnRvKHN0ZXAsIHsgb3BhY2l0eTogMCwgeTogNTAsIGR1cmF0aW9uOiAwLjMgfSlcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vICoqRmxpcCByb29tLWtleSB3aGVuIHRoZSBzZWNvbmQgc3RlcCBhcHBlYXJzKipcbiAgICAgICAgICBpZiAoaW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgdHJpZ2dlcjogc3RlcCxcbiAgICAgICAgICAgICAgc3RhcnQ6IFwidG9wIGNlbnRlclwiLFxuICAgICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB0aGlzLmVsZW1lbnRzLnJvb21LZXkuY2xhc3NMaXN0LmFkZChcImZsaXBcIiksXG4gICAgICAgICAgICAgIG9uTGVhdmVCYWNrOiAoKSA9PiB0aGlzLmVsZW1lbnRzLnJvb21LZXkuY2xhc3NMaXN0LnJlbW92ZShcImZsaXBcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIHRyaWdnZXI6IHN0ZXAsXG4gICAgICAgICAgICBzdGFydDogXCJ0b3AgNTAlXCIsIC8vIFdoZW4gdGhlIHN0ZXAgcmVhY2hlcyA1MCUgb2YgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICBlbmQ6IFwidG9wIDMwJVwiLCAvLyBXaGVuIHRoZSBzdGVwIGlzIGFsbW9zdCBmdWxseSBpbiB2aWV3XG4gICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSW5kZXhIaWdobGlnaHRlcihpbmRleCk7IC8vIEhpZ2hsaWdodCB0aGUgY29ycmVzcG9uZGluZyBkb3QgZm9yIHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVJbmRleEhpZ2hsaWdodGVyKGluZGV4IC0gMSk7IC8vIEhpZ2hsaWdodCB0aGUgY29ycmVzcG9uZGluZyBkb3QgZm9yIHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTGVhdmVCYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSW5kZXhIaWdobGlnaHRlcihpbmRleCAtIDEpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUluZGV4SGlnaGxpZ2h0ZXIoaW5kZXggLSAyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAvLyBQaW4gcHJvZ3Jlc3MgYmFyIGF0IGFsbCB0aW1lcyAob25seSBzaG93L2hpZGUpXG4gICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMucm9vbUtleVNlY3Rpb24sXG4gICAgICAgIHN0YXJ0OiBcInRvcCB0b3BcIixcbiAgICAgICAgZW5kOiBcImJvdHRvbSBib3R0b21cIixcbiAgICAgICAgcGluOiB0aGlzLmVsZW1lbnRzLnByb2dyZXNzQmFyXG4gICAgICB9KVxuXG4gICAgICAvLyBTaG93IHByb2dyZXNzIGJhciB3aGVuIHJvb21LZXkgaXMgZnVsbHkgaW4gdmlld1xuXG4gICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMuc3RlcHNbMV0sXG4gICAgICAgIHN0YXJ0OiBcInRvcCBjZW50ZXJcIiwgLy8gV2hlbiB0aGUgZmlyc3Qgc3RlcCByZWFjaGVzIHRoZSBjZW50ZXIgb2YgdGhlIHZpZXdwb3J0XG4gICAgICAgIG9uRW50ZXI6ICgpID0+IHRoaXMuc2hvd1Byb2dyZXNzQmFyKCksXG4gICAgICAgIG9uTGVhdmVCYWNrOiAoKSA9PiB0aGlzLmhpZGVQcm9ncmVzc0JhcigpLFxuICAgICAgICBtYXJrZXJzOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICB9LCB0aGlzLmVsZW1lbnRzLnJvb21LZXlTZWN0aW9uKVxuICB9XG5cbiAgdXBkYXRlUHJvY2Vzc0hpZ2hsaWdodCgpIHtcbiAgICBjb25zdCBzdGVwcyA9IHRoaXMuZWxlbWVudHMuc3RlcHM7XG4gICAgaWYgKCFzdGVwcykgcmV0dXJuO1xuXG4gICAgbGV0IGZvdW5kSW5kZXggPSBBcnJheS5mcm9tKHN0ZXBzKS5maW5kSW5kZXgoc3RlcCA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gc3RlcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIC8vIE1pZGRsZSBvZiBzdGVwIGlzIGluIHZpZXdwb3J0XG4gICAgICByZXR1cm4gcmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIgPj0gMCAmJiByZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMiA8PSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfSk7XG5cbiAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIHtcbiAgICAgIC8vIElmIG5vIHN0ZXAgaXMgaW4gdmlld3BvcnQsIGhpZ2hsaWdodCBsYXN0IHN0ZXAgc2Nyb2xsZWQgcGFzdFxuICAgICAgZm91bmRJbmRleCA9IHN0ZXBzLmxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRlSW5kZXhIaWdobGlnaHRlcihmb3VuZEluZGV4KTtcbiAgfVxuXG4gIGFydGlzdFNlY3Rpb25BbmltYXRpb25zKCkge1xuICAgIGlmICghdGhpcy5lbGVtZW50cy52aWRlb0Jsb2NrIHx8ICF0aGlzLmVsZW1lbnRzLnZpZGVvIHx8ICF0aGlzLmVsZW1lbnRzLmFydGlzdE5hbWVzKSByZXR1cm47XG5cbiAgICBnc2FwLmZyb21Ubyh0aGlzLmVsZW1lbnRzLnZpZGVvQmxvY2ssIFxuICAgICAgeyBjbGlwUGF0aDogXCJwb2x5Z29uKDUlIDUlLCA5NSUgNSUsIDk1JSA5NSUsIDUlIDk1JSlcIn0sXG4gICAgICB7XG4gICAgICAgIGNsaXBQYXRoOiBcInBvbHlnb24oMCUgMCUsIDEwMCUgMCUsIDEwMCUgMTAwJSwgMCUgMTAwJSlcIixcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMudmlkZW9CbG9jayxcbiAgICAgICAgICBzdGFydDogJzUlIGJvdHRvbScsXG4gICAgICAgICAgc2NydWI6IHRydWUsXG4gICAgICAgICAgbWFya2VyczogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICB9XG4gICAgKVxuICAgIGdzYXAuZnJvbVRvKHRoaXMuZWxlbWVudHMudmlkZW8sIFxuICAgICAge1xuICAgICAgICBzY2FsZTogMS41XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgIHRyaWdnZXI6IHRoaXMuZWxlbWVudHMudmlkZW9CbG9jayxcbiAgICAgICAgICBzdGFydDogJzUlIGJvdHRvbScsIC8vIFN0YXJ0IHRoZSBhbmltYXRpb24gd2hlbiB0aGUgdG9wIG9mIHRoZSBoZXJvQ29udGVudCBoaXRzIDkwJSBvZiB0aGUgdmlld3BvcnRcbiAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgICBtYXJrZXJzOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIixcbiAgICAgIH1cbiAgICApXG5cbiAgICB0aGlzLmVsZW1lbnRzLmFydGlzdE5hbWVzLmZvckVhY2goKG5hbWUsIGkpID0+IHtcbiAgICAgIGxldCBnZXRWYWwgPSBuYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1hcnRpc3QtbmFtZS1hbmltYXRpb24nKVxuICAgICAgbGV0IHN0YXJ0WHBvcyA9IGdldFZhbCA9PT0gXCJsZWZ0XCIgPyBcIjEwJVwiOiBcIi0xMCVcIlxuICAgICAgXG4gICAgICBnc2FwLmZyb21UbyhuYW1lLFxuICAgICAgICB7IFxuICAgICAgICAgIHg6IHN0YXJ0WHBvcyxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjQsXG4gICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgICAgdHJpZ2dlcjogbmFtZSxcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCBib3R0b21cIixcbiAgICAgICAgICAgIG1hcmtlcnM6IGZhbHNlLFxuICAgICAgICAgICAgc2NydWI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcblxuICAgIH0pXG4gIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsb2NhbHNKc29uU3RyaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyAxNzU4MjI0MzkyMjY5XG4gICAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wicHVibGljUGF0aFwiOlwiXCJ9KTtcbiAgICAgICAgLy8gb25seSBpbnZhbGlkYXRlIHdoZW4gbG9jYWxzIGNoYW5nZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhICYmXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhLnZhbHVlICYmXG4gICAgICAgICAgbW9kdWxlLmhvdC5kYXRhLnZhbHVlICE9PSBsb2NhbHNKc29uU3RyaW5nXG4gICAgICAgICkge1xuICAgICAgICAgIG1vZHVsZS5ob3QuaW52YWxpZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBkYXRhLnZhbHVlID0gbG9jYWxzSnNvblN0cmluZztcbiAgICAgICAgICBjc3NSZWxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZmJmN2E0ZGY2NDY0MDI2YjMxZWJcIikiXSwibmFtZXMiOlsiUGFnZSIsImdzYXAiLCJTY3JvbGxUcmlnZ2VyIiwiSG9tZSIsImNvbnN0cnVjdG9yIiwiaWQiLCJlbGVtZW50cyIsImhlcm9Db250ZW50IiwiaG9tZUJvZHkiLCJ2aWRlb0Jsb2NrIiwidmlkZW8iLCJwb2xhcm9pZCIsInJvb21LZXlTZWN0aW9uIiwicm9vbUtleUhlYWRlciIsInJvb21LZXlUaXRsZSIsInJvb21LZXkiLCJwcm9ncmVzc0JhciIsInByb2dyZXNzSGlnaGxpZ2h0IiwicHJvZ3Jlc3NJbmRpY2VzIiwic3RlcHMiLCJhcnRpc3ROYW1lcyIsInN0ZXBDb250YWluZXIiLCJyZWdpc3RlclBsdWdpbiIsIm1tIiwibWF0Y2hNZWRpYSIsInBpbm5lZEhlaWdodCIsIm9mZnNldEhlaWdodCIsImlzUHJvZ3Jlc3NCYXJWaXNpYmxlIiwiY3VycmVudEFjdGl2ZUluZGV4Iiwicm9vbUtleUN0eCIsImluaXQiLCJzZXRVcFNjcm9sbEFuaW1hdGlvbnMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmV2ZXJ0IiwiYnVpbGRSb29tS2V5QW5pbWF0aW9ucyIsInJlZnJlc2giLCJ1cGRhdGVQcm9jZXNzSGlnaGxpZ2h0IiwiYW5pbWF0ZUluZGV4SGlnaGxpZ2h0ZXIiLCJuZXdJbmRleCIsIm1heEluZGV4IiwibGVuZ3RoIiwiY2xhbXBlZEluZGV4IiwiTWF0aCIsIm1pbiIsIm1heCIsInlQb3MiLCJ0byIsInkiLCJkdXJhdGlvbiIsImVhc2UiLCJoaWRlUHJvZ3Jlc3NCYXIiLCJvcGFjaXR5Iiwic2hvd1Byb2dyZXNzQmFyIiwicG9sYXJvaWRQYXJhbGxheCIsImFydGlzdFNlY3Rpb25BbmltYXRpb25zIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJpIiwiZnJvbVRvIiwic2Nyb2xsVHJpZ2dlciIsInRyaWdnZXIiLCJzdGFydCIsInNjcnViIiwibWFya2VycyIsImNvbnRleHQiLCJ0b3RhbFN0ZXBzSGVpZ2h0IiwiQXJyYXkiLCJmcm9tIiwicmVkdWNlIiwidG90YWwiLCJzdGVwIiwiYWRqdXN0ZWRQaW5EdXJhdGlvbiIsInNjcm9sbE9wdGlvbnMiLCJlbmQiLCJvbkVudGVyIiwic2V0IiwiaW5uZXJXaWR0aCIsInJvb21LZXlQaW5TdGFydCIsInJvb21LZXlQaW5FbmQiLCJpbm5lckhlaWdodCIsImNyZWF0ZSIsImhlYWRlclJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyb29tS2V5UmVjdCIsImRpc3RhbmNlIiwidG9wIiwicGluIiwicGluU3BhY2luZyIsImFudGljaXBhdGVQaW4iLCJwb3NpdGlvbiIsIndpZHRoIiwic3RlcFRsIiwidGltZWxpbmUiLCJvblVwZGF0ZSIsInNlbGYiLCJ0b3RhbFN0ZXBzIiwicmF3SW5kZXgiLCJmbG9vciIsInByb2dyZXNzIiwiYWN0aXZlSW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJpbmRleCIsIm9uTGVhdmVCYWNrIiwieCIsInJvdGF0ZSIsInRvZ2dsZUFjdGlvbnMiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwicmVjdCIsImhlaWdodCIsImNsaXBQYXRoIiwic2NhbGUiLCJuYW1lIiwiZ2V0VmFsIiwiZ2V0QXR0cmlidXRlIiwic3RhcnRYcG9zIl0sInNvdXJjZVJvb3QiOiIifQ==
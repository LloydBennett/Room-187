"use strict";
self["webpackHotUpdateroom187"]("main",{

/***/ "./app/components/SubscriptionForm.js":
/*!********************************************!*\
  !*** ./app/components/SubscriptionForm.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SubscriptionForm)
/* harmony export */ });
/* harmony import */ var classes_Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classes/Components */ "./app/classes/Components.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");


class SubscriptionForm extends classes_Components__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      elements: {
        form: '[data-subscription-form]',
        submitBtn: '[data-subscription-submit-btn]',
        input: 'input[name="email"]',
        toast: '[data-toast]',
        toastText: '[data-toast-message]',
        inputLine: '[data-input-line]',
        inputMessage: '[data-input-message]',
        closeToastIcon: '[data-toast-close]',
        toastIcon: '[data-toast-icon]'
      }
    });
    this.isToastOpen = false;
    this.init();
  }
  create() {
    super.create();
  }
  updateToast(message, type = 'info') {
    this.elements.toastText.textContent = message;
    this.elements.toast.classList.add(`${type}`);
    this.elements.toastIcon.classList.add(`toast-icon--${type}`);
    if (type === 'error') {
      this.elements.toast.classList.remove('success', 'info');
      this.elements.toastIcon.classList.remove('toast-icon--success', 'toast-icon--info');
    } else if (type === 'success') {
      this.elements.toast.classList.remove('error', 'info');
      this.elements.toastIcon.classList.remove('toast-icon--error', 'toast-icon--info');
    } else {
      this.elements.toast.classList.remove('error', 'success');
      this.elements.toastIcon.classList.remove('toast-icon--error', 'toast-icon--success');
    }
    this.animateToast();
  }
  updateInputField(message, type) {
    if (type === 'error') {
      this.elements.inputLine.classList.add('error');
      this.elements.inputMessage.classList.add('error__text');
      this.elements.inputMessage.textContent = message;
    } else {
      this.elements.inputLine.classList.remove('error');
      this.elements.inputMessage.classList.remove('error__text');
      this.elements.inputMessage.textContent = "";
    }
  }
  animateToast() {
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.toast, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        this.isToastOpen = true;
        // setTimeout(() => {
        //   this.closeToast()
        // }, 8000)
      }
    });
  }
  closeToast() {
    gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.toast, {
      y: '200%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        this.isToastOpen = false;
      }
    });
  }
  addEventListener() {
    this.elements.closeToastIcon.addEventListener("click", () => {
      this.closeToast();
    });
    this.elements.submitBtn.addEventListener("click", async e => {
      const email = this.elements.input.value.trim();

      // Client-side email regex validation
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!validEmail) {
        this.updateInputField("Please enter a valid email address.", "error");
        this.updateToast("Email address not valid", "error");
        return;
      }

      // Honeypot trap (invisible input field, added below)
      const botTrap = document.getElementById("bot-field");
      if (botTrap && botTrap.value) {
        return; // silently ignore
      }
      this.updateToast("Subscribing...", "info");
      try {
        const res = await fetch("/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        });
        const result = await res.json();
        if (res.ok) {
          this.updateInputField("", "success");
          this.updateToast(result.message, "success");
          input.value = "";
        } else {
          this.updateInputField("", "error");
          this.updateToast(result.error || "Something went wrong. Try again.", "error");
        }
      } catch (err) {
        this.updateToast("Server error. Please try again later.", "error");
        this.updateInputField("", "error");
      }
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
/******/ 	__webpack_require__.h = () => ("f46f736a05eaf829d71c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEVBQUUsRUFBRSxPQUFPLENBQUM7VUFDbEMsSUFBSSxDQUFDUixXQUFXLENBQUNpQyxNQUFNLENBQUNHLEtBQUssSUFBSSxrQ0FBa0MsRUFBRSxPQUFPLENBQUM7UUFDL0U7TUFDRixDQUFDLENBQUMsT0FBT0MsR0FBRyxFQUFFO1FBQ1osSUFBSSxDQUFDckMsV0FBVyxDQUFDLHVDQUF1QyxFQUFFLE9BQU8sQ0FBQztRQUNsRSxJQUFJLENBQUNRLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUM7TUFDcEM7SUFDRixDQUFDLENBQUM7RUFDSjtFQUVBVixJQUFJQSxDQUFBLEVBQUc7SUFDTCxJQUFJLENBQUNrQixnQkFBZ0IsQ0FBQyxDQUFDO0VBQ3pCO0FBQ0YsQzs7Ozs7Ozs7VUMxSUEsc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb29tMTg3Ly4vYXBwL2NvbXBvbmVudHMvU3Vic2NyaXB0aW9uRm9ybS5qcyIsIndlYnBhY2s6Ly9yb29tMTg3L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50cyBmcm9tICdjbGFzc2VzL0NvbXBvbmVudHMnXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJzY3JpcHRpb25Gb3JtIGV4dGVuZHMgQ29tcG9uZW50cyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGZvcm06ICdbZGF0YS1zdWJzY3JpcHRpb24tZm9ybV0nLFxuICAgICAgICBzdWJtaXRCdG46ICdbZGF0YS1zdWJzY3JpcHRpb24tc3VibWl0LWJ0bl0nLFxuICAgICAgICBpbnB1dDogJ2lucHV0W25hbWU9XCJlbWFpbFwiXScsXG4gICAgICAgIHRvYXN0OiAnW2RhdGEtdG9hc3RdJyxcbiAgICAgICAgdG9hc3RUZXh0OiAnW2RhdGEtdG9hc3QtbWVzc2FnZV0nLFxuICAgICAgICBpbnB1dExpbmU6ICdbZGF0YS1pbnB1dC1saW5lXScsXG4gICAgICAgIGlucHV0TWVzc2FnZTogJ1tkYXRhLWlucHV0LW1lc3NhZ2VdJyxcbiAgICAgICAgY2xvc2VUb2FzdEljb246ICdbZGF0YS10b2FzdC1jbG9zZV0nLFxuICAgICAgICB0b2FzdEljb246ICdbZGF0YS10b2FzdC1pY29uXSdcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuaXNUb2FzdE9wZW4gPSBmYWxzZVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBjcmVhdGUoKSB7XG4gICAgc3VwZXIuY3JlYXRlKClcbiAgfVxuXG4gIHVwZGF0ZVRvYXN0KG1lc3NhZ2UsIHR5cGUgPSAnaW5mbycpIHtcbiAgICB0aGlzLmVsZW1lbnRzLnRvYXN0VGV4dC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgXG5cbiAgICB0aGlzLmVsZW1lbnRzLnRvYXN0LmNsYXNzTGlzdC5hZGQoYCR7dHlwZX1gKVxuICAgIHRoaXMuZWxlbWVudHMudG9hc3RJY29uLmNsYXNzTGlzdC5hZGQoYHRvYXN0LWljb24tLSR7dHlwZX1gKVxuXG4gICAgaWYodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgdGhpcy5lbGVtZW50cy50b2FzdC5jbGFzc0xpc3QucmVtb3ZlKCdzdWNjZXNzJywgJ2luZm8nKVxuICAgICAgdGhpcy5lbGVtZW50cy50b2FzdEljb24uY2xhc3NMaXN0LnJlbW92ZSgndG9hc3QtaWNvbi0tc3VjY2VzcycsICd0b2FzdC1pY29uLS1pbmZvJylcblxuICAgIH0gZWxzZSBpZih0eXBlID09PSAnc3VjY2VzcycpIHtcbiAgICAgIHRoaXMuZWxlbWVudHMudG9hc3QuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InLCAnaW5mbycpXG4gICAgICB0aGlzLmVsZW1lbnRzLnRvYXN0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2FzdC1pY29uLS1lcnJvcicsICd0b2FzdC1pY29uLS1pbmZvJylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnRvYXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJywgJ3N1Y2Nlc3MnKVxuICAgICAgdGhpcy5lbGVtZW50cy50b2FzdEljb24uY2xhc3NMaXN0LnJlbW92ZSgndG9hc3QtaWNvbi0tZXJyb3InLCAndG9hc3QtaWNvbi0tc3VjY2VzcycpXG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRlVG9hc3QoKVxuICB9XG5cbiAgdXBkYXRlSW5wdXRGaWVsZChtZXNzYWdlLCB0eXBlKSB7XG4gICAgaWYodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgdGhpcy5lbGVtZW50cy5pbnB1dExpbmUuY2xhc3NMaXN0LmFkZCgnZXJyb3InKVxuICAgICAgdGhpcy5lbGVtZW50cy5pbnB1dE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZXJyb3JfX3RleHQnKVxuICAgICAgdGhpcy5lbGVtZW50cy5pbnB1dE1lc3NhZ2UudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLmlucHV0TGluZS5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpXG4gICAgICB0aGlzLmVsZW1lbnRzLmlucHV0TWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcl9fdGV4dCcpXG4gICAgICB0aGlzLmVsZW1lbnRzLmlucHV0TWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfVxuICB9XG5cbiAgYW5pbWF0ZVRvYXN0KCkge1xuICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy50b2FzdCwge1xuICAgICAgeTogMCxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkdXJhdGlvbjogMC40LFxuICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmlzVG9hc3RPcGVuID0gdHJ1ZVxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICB0aGlzLmNsb3NlVG9hc3QoKVxuICAgICAgICAvLyB9LCA4MDAwKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjbG9zZVRvYXN0KCkge1xuICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy50b2FzdCwge1xuICAgICAgeTogJzIwMCUnLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIGR1cmF0aW9uOiAwLjUsXG4gICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNUb2FzdE9wZW4gPSBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKCkge1xuICAgIHRoaXMuZWxlbWVudHMuY2xvc2VUb2FzdEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2VUb2FzdCgpXG4gICAgfSlcblxuICAgIHRoaXMuZWxlbWVudHMuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgY29uc3QgZW1haWwgPSB0aGlzLmVsZW1lbnRzLmlucHV0LnZhbHVlLnRyaW0oKTtcbiAgXG4gICAgICAvLyBDbGllbnQtc2lkZSBlbWFpbCByZWdleCB2YWxpZGF0aW9uXG4gICAgICBjb25zdCB2YWxpZEVtYWlsID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC8udGVzdChlbWFpbCk7XG4gICAgICBpZiAoIXZhbGlkRW1haWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dEZpZWxkKFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIiwgXCJlcnJvclwiKTtcbiAgICAgICAgdGhpcy51cGRhdGVUb2FzdChcIkVtYWlsIGFkZHJlc3Mgbm90IHZhbGlkXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgXG4gICAgICAvLyBIb25leXBvdCB0cmFwIChpbnZpc2libGUgaW5wdXQgZmllbGQsIGFkZGVkIGJlbG93KVxuICAgICAgY29uc3QgYm90VHJhcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm90LWZpZWxkXCIpO1xuICAgICAgaWYgKGJvdFRyYXAgJiYgYm90VHJhcC52YWx1ZSkge1xuICAgICAgICByZXR1cm47IC8vIHNpbGVudGx5IGlnbm9yZVxuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLnVwZGF0ZVRvYXN0KFwiU3Vic2NyaWJpbmcuLi5cIiwgXCJpbmZvXCIpO1xuICBcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFwiL3N1YnNjcmliZVwiLCB7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCB9KSxcbiAgICAgICAgfSk7XG4gIFxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJbnB1dEZpZWxkKFwiXCIsIFwic3VjY2Vzc1wiKVxuICAgICAgICAgIHRoaXMudXBkYXRlVG9hc3QocmVzdWx0Lm1lc3NhZ2UsIFwic3VjY2Vzc1wiKVxuICAgICAgICAgIGlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0RmllbGQoXCJcIiwgXCJlcnJvclwiKVxuICAgICAgICAgIHRoaXMudXBkYXRlVG9hc3QocmVzdWx0LmVycm9yIHx8IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFRyeSBhZ2Fpbi5cIiwgXCJlcnJvclwiKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVG9hc3QoXCJTZXJ2ZXIgZXJyb3IuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRGaWVsZChcIlwiLCBcImVycm9yXCIpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKClcbiAgfVxufSIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImY0NmY3MzZhMDVlYWY4MjlkNzFjXCIpIl0sIm5hbWVzIjpbIkNvbXBvbmVudHMiLCJnc2FwIiwiU3Vic2NyaXB0aW9uRm9ybSIsImNvbnN0cnVjdG9yIiwiZWxlbWVudHMiLCJmb3JtIiwic3VibWl0QnRuIiwiaW5wdXQiLCJ0b2FzdCIsInRvYXN0VGV4dCIsImlucHV0TGluZSIsImlucHV0TWVzc2FnZSIsImNsb3NlVG9hc3RJY29uIiwidG9hc3RJY29uIiwiaXNUb2FzdE9wZW4iLCJpbml0IiwiY3JlYXRlIiwidXBkYXRlVG9hc3QiLCJtZXNzYWdlIiwidHlwZSIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiYW5pbWF0ZVRvYXN0IiwidXBkYXRlSW5wdXRGaWVsZCIsInRvIiwieSIsIm9wYWNpdHkiLCJkdXJhdGlvbiIsImVhc2UiLCJvbkNvbXBsZXRlIiwiY2xvc2VUb2FzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZW1haWwiLCJ2YWx1ZSIsInRyaW0iLCJ2YWxpZEVtYWlsIiwidGVzdCIsImJvdFRyYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXN1bHQiLCJqc29uIiwib2siLCJlcnJvciIsImVyciJdLCJzb3VyY2VSb290IjoiIn0=
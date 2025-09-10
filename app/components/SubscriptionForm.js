import Components from 'classes/Components'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

export default class SubscriptionForm extends Components {
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
    })

    gsap.registerPlugin(CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.isToastOpen = false
    this.toastTimeoutId = null
    this.init()
  }

  create() {
    super.create()
  }

  updateToast(message, type = 'info') {
    this.elements.toastText.textContent = message;
    

    this.elements.toast.classList.add(`${type}`)
    this.elements.toastIcon.classList.add(`toast-icon--${type}`)

    if(type === 'error') {
      this.elements.toast.classList.remove('success', 'loading')
      this.elements.toastIcon.classList.remove('toast-icon--success', 'toast-icon--loading')

    } else if(type === 'success') {
      this.elements.toast.classList.remove('error', 'loading')
      this.elements.toastIcon.classList.remove('toast-icon--error', 'toast-icon--loading')
    }
    else {
      this.elements.toast.classList.remove('error', 'success')
      this.elements.toastIcon.classList.remove('toast-icon--error', 'toast-icon--success')
    }

    this.animateToast()
  }

  updateInputField(message, type) {
    if(type === 'error') {
      this.elements.inputLine.classList.add('error')
      this.elements.inputMessage.classList.add('error__text')
      this.elements.inputMessage.textContent = message;
    } else {
      this.elements.inputLine.classList.remove('error')
      this.elements.inputMessage.classList.remove('error__text')
      this.elements.inputMessage.textContent = "";
    }
  }

  animateToast() {
    gsap.to(this.elements.toast, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'zoom',
      onComplete: () => {
        this.isToastOpen = true

        // Clear any existing timeout before setting a new one
        if (this.toastTimeoutId) {
          clearTimeout(this.toastTimeoutId)
        }

        this.toastTimeoutId = setTimeout(() => {
          this.closeToast()
          this.toastTimeoutId = null
        }, 8000)
      }
    })
  }

  closeToast() {
    // If timeout exists, clear it so it doesn't trigger after manual close
    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId)
      this.toastTimeoutId = null
    }

    gsap.to(this.elements.toast, {
      y: '200%',
      opacity: 0,
      duration: 0.6,
      ease: 'zoom',
      onComplete: () => {
        this.isToastOpen = false
      }
    })
  }

  addEventListener() {
    if(!this.elements.form || this.elements.submitBtn) return
    
    this.elements.closeToastIcon.addEventListener("click", () => {
      this.closeToast()
    })

    this.elements.submitBtn.addEventListener("click", async (e) => {
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
      
      this.updateToast("Subscribing", "loading");
  
      try {
        const res = await fetch("/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
  
        const result = await res.json();
        if (res.ok) {
          this.updateInputField("", "success")
          this.updateToast(result.message, "success")
          
        } else {
          this.updateInputField("", "")
          this.updateToast(result.error || "Something went wrong. Try again.", "error");
        }
      } catch (err) {
        this.updateToast("Server error. Please try again later.", "error");
        this.updateInputField("", "")
      }
    })
  }

  init() {
    this.addEventListener()
  }
}
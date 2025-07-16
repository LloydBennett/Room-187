import Components from 'classes/Components'
import gsap from 'gsap'

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
    this.isToastOpen = false
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
      this.elements.toast.classList.remove('success', 'info')
      this.elements.toastIcon.classList.remove('toast-icon--success', 'toast-icon--info')

    } else if(type === 'success') {
      this.elements.toast.classList.remove('error', 'info')
      this.elements.toastIcon.classList.remove('toast-icon--error', 'toast-icon--info')
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
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        this.isToastOpen = true
        // setTimeout(() => {
        //   this.closeToast()
        // }, 8000)
      }
    })
  }

  closeToast() {
    gsap.to(this.elements.toast, {
      y: '200%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        this.isToastOpen = false
      }
    })
  }

  addEventListener() {
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
      
      this.updateToast("Subscribing...", "info");
  
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
          input.value = "";
        } else {
          this.updateInputField("", "error")
          this.updateToast(result.error || "Something went wrong. Try again.", "error");
        }
      } catch (err) {
        this.updateToast("Server error. Please try again later.", "error");
        this.updateInputField("", "error")
      }
    })
  }

  init() {
    this.addEventListener()
  }
}
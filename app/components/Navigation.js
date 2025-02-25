import Components from 'classes/Components'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { scroll } from 'utils/LenisScroll'

export default class Navigation extends Components {
  constructor() {
    super({
      elements: {
        menu: '[data-nav-menu]',
        trigger: '[data-nav-trigger]',
        body: 'body',
        navBar: '[data-nav-bar]',
        navLinks: '.nav-menu__list-item [data-page-trigger]',
        navLinkText: '.nav-menu [data-text-reveal]'
      }
    })

    gsap.registerPlugin(CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")
    this.tl = gsap.timeline()

    this.isAnimating = false
    this.isOpen = false
    this.addEventListeners()
  }

  create() {
    super.create()
  }

  addEventListeners() {
    this.elements.trigger.addEventListener('click', () => {
      if(!this.isAnimating) {
        this.isAnimating = true
        this.isOpen ? this.closeMenu() : this.openMenu()
      }
    })
  }

  openMenu() {
    this.isOpen = true
    this.elements.menu.classList.add('show')

    this.tl.to(this.elements.menu, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "zoom",
    })

    this.tl.fromTo(this.elements.navLinkText, { y: "100%" }, { y: 0, duration: 0.8, ease: "zoom", stagger: (i, target) => target.dataset.textReveal ? 0.05 * Number(target.dataset.textReveal): 0.05,
      onComplete: () => {
        this.isAnimating = false
      }
    }, '-=0.1')
  }

  closeMenu() {
    this.tl.to(this.elements.menu, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "zoom",
    })

    this.tl.fromTo(this.elements.navLinkText, { y: 0 }, { y: "100%", duration: 0.01, 
      onComplete: () => {
        this.isAnimating = false
        this.isOpen = false
        this.elements.menu.classList.remove('show')
      }
    })
  }
}
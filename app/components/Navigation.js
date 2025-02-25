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
        navLinks: '[data-menu-links]',
        navLinkText: '.nav-menu [data-text-reveal]',
        navLinkHover: '[data-nav-hover]'
      }
    })

    gsap.registerPlugin(CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")
    this.tl = gsap.timeline()

    this.isAnimating = false
    this.isOpen = false
    this.scroll = scroll
    this.filterId = '#filter-3'
    this.createLinkTimeLine()
    this.addEventListeners()
    
    console.log(this.elements.navLinkHover)
  }

  create() {
    super.create()
  }

  addEventListeners() {
    this.elements.trigger.addEventListener('click', () => {
      if(!this.isAnimating) {
        this.isAnimating = true
        this.elements.trigger.classList.toggle('open')
        this.isOpen ? this.closeMenu() : this.openMenu()
      }
    })

    this.elements.navLinks.forEach(link => {
      let linkHover = link.nextElementSibling
      
      let linkTl = gsap.timeline({
        paused: true,
        onStart: () => {
          linkHover.style.filter = `url(${this.filterId}`
        },
        onComplete: () => {
          linkHover.style.filter = 'none';
        }
      });

      let onMouseEnterFn = () => linkTl.restart();
      let onMouseLeaveFn = () => linkTl.progress(1).kill();

      link.addEventListener('mouseenter', onMouseEnterFn);
      link.addEventListener('mouseleave', onMouseLeaveFn);
    });
    
  }

  openMenu() {
    this.isOpen = true
    this.scroll.stop()
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
        this.scroll.start()
      }
    })
  }

  createLinkTimeLine() {
    // init timeline
    this.linkTl = gsap.timeline({
      paused: true,
      onStart: () => {
        this.elements.navLinkHover.style.filter = `url(${this.filterId}`
      },
      onComplete: () => {
        this.elements.navLinkHover.style.filter = 'none';
      }
    });
  }
}
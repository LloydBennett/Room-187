import Components from 'classes/Components'
import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase"

export default class Preloader extends Components {
  constructor() {
    super({
      elements: {
        loader: '[data-loader]',
        images: '[data-loader-image]',
        imageHero: '[data-loader-hero]',
        mainTitle: '[data-main-title] [data-text-reveal]',
        misc: '[data-misc]',
        titles: '[data-text-reveal]',
        body: 'body',
        bg: '[data-bg]',
        navBar: '[data-nav-bar]'
      }
    })
      
    gsap.registerPlugin(CustomEase)
    this.tl = gsap.timeline()
    
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.animate()
  }

  create() {
    super.create()
  }

  animate() {
    this.elements.body.classList.add('no--scrolling')
    let delay = 2000
    let title = document.querySelector('[data-testing]')
    
    this.elements.images.forEach((img, i) => {
      this.tl.to(img, { opacity: 1, duration: 0.04, ease: "linear" }, "+=0.15")
    })
    
    if(this.elements.imageHero) {
      this.tl.to(this.elements.imageHero, { scale: 1, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.6, ease: "zoom" }, "+=0.4")
    }

    this.tl.to(this.elements.loader, { display: "none", duration: 0.01 })

    this.tl.fromTo(this.elements.titles, { y: "100%" }, { y: 0, duration: 0.8, ease: "zoom", stagger: (i, target) => { return 0.05 * target.dataset.textReveal }, 
      onComplete: () => {
        this.elements.body.classList.remove('no--scrolling')
      }
    }, '-=0.1')

    this.tl.fromTo(this.elements.misc, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out'}, "-=0.1")
    
  }
}
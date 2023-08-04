import Components from 'classes/Components'
import gsap from 'gsap'

export default class Preloader extends Components {
  constructor() {
    super({
      element: '[data-loader]',
      elements: {
        images: '[data-loader-image]',
        mainTitle: '[data-main-title] [data-char]',
        body: 'body',
        bg: '[data-bg]'
      }
    })  
    
    this.tl = gsap.timeline()
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
      this.tl.to(img, { opacity: 1, duration: 0.05, ease: "linear" }, "+=0.15")
    });

    this.tl.to(this.element, { opacity: 0, duration: 0.4, onComplete: () => {
      this.element.style.display = "none"
    } })
    this.tl.fromTo(this.elements.bg, { scale: 0.3 }, { scale: 1, duration: 0.4, ease: "CubicEaseOut" })

    this.tl.fromTo(this.elements.mainTitle, { y: "100%" }, { y: 0, duration: 0.35, stagger: 0.05, onComplete: () => {
      this.elements.body.classList.remove('no--scrolling')

    } }, "-=0.2")


    //this.tl.to(title, { opacity: 0 })
    
  }
}
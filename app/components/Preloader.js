import Components from 'classes/Components'
import gsap from 'gsap'

export default class Preloader extends Components {
  constructor() {
    super({
      element: '[data-loader]',
      elements: {
        images: '[data-loader-image]',
        body: 'body'
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
      delay = delay + 500
      this.tl.to(img, { opacity: 1, duration: 0.1, ease: "linear" }, "+=0.2")
    });

    this.tl.to(title, { opacity: 0 })
    
  }
}
import Components from 'classes/Components'
import gsap from 'gsap'

export default class Overlay extends Components {
  constructor() {
    super({
      elements: {
        close: '[data-close]',
        body: 'body'
      }
    })
    this.tl = gsap.timeline()  
    this.addEventListeners()
  }

  create() {
    super.create()
  }

  addEventListeners() {
    this.elements.close.addEventListener('click', () => {
      let parentOverlay = this.elements.close.parentNode
      
      if(parentOverlay.hasAttribute('data-video-overlay')) {
        let video = parentOverlay.querySelector('[data-video]')

        video.pause()
        video.currentTime = 0
      }
      this.tl.to(parentOverlay, { opacity: 0, pointerEvents: "none", duration: 0.4, ease: "power2.out" })      
    })
  }
}
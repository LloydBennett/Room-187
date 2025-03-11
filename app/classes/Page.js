import GSAP from 'gsap'
import Create from "../utils/create"

export default class Page {
  constructor({ elements, id }) {
    this.id = id
    this.selectors = { 
      ...elements,
      overlay: '[data-page-transition]',
      slideOne: '[data-page-transition-slide-one]',
      slideTwo: '[data-page-transition-slide-two]'
    }
    Page.prototype.create = Create
    this.create()
  }
  show() {
    return new Promise(resolve => {
      this.animationIn = GSAP.timeline()

      // this.animationIn.fromTo(this.element, {
      //   autoAlpha: 0
      // }, {
      //   autoAlpha: 1
      // })

      // this.animationIn.call(_ => {
      //   // this.scroll = new LocomotiveScroll({
      //   //   el: document.querySelector('[data-scroll-container]'),
      //   //   smooth: true
      //   // })
      //   resolve()
      // })
      resolve()
    })
  }
  hide() {
    return new Promise(resolve => {
      this.animOut = GSAP.timeline()
      console.log(this.selectors.overlay)

      this.animOut.to(this.selectors.overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "power2.out" 
      })

      this.animOut.to(this.selectors.slidesOne, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.6,
        ease: "power2.out"
      }, '-=0.3')

      this.animOut.to(this.selectors.slidesTwo, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "power2.out"
      }, '-=0.3').add(resolve)
      
      //this.animationOut = GSAP.timeline()

      // this.animationOut.to(this.element, {
      //   autoAlpha: 0,
      //   onComplete: resolve
      // })
    })
  }
}
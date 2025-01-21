import GSAP from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'

export default class Page {
  constructor({ elements, element, id }) {
    this.id = id
    this.selector = element
    this.selectorChildren = { ...elements }
  }
  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}
    
    console.log('Create', this.id, this.element)
  }
  show() {
    return new Promise(resolve => {
      this.animationIn = GSAP.timeline()

      // this.animationIn.fromTo(this.element, {
      //   autoAlpha: 0
      // }, {
      //   autoAlpha: 1
      // })

      this.animationIn.call(_ => {
        this.scroll = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]'),
          smooth: true
        })
        resolve()
      })
    })
  }
  // hide() {
  //   return new Promise(resolve => {

  //     this.animationOut = GSAP.timeline()

  //     this.animationOut.to(this.element, {
  //       autoAlpha: 0,
  //       onComplete: resolve
  //     })
  //   })
  // }
}
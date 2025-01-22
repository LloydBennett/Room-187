import GSAP from 'gsap'
import Create from "../utils/create";

//import LocomotiveScroll from 'locomotive-scroll'

export default class Page {
  constructor({ elements, id }) {
    this.id = id
    this.selectors = { 
      ...elements,
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

      this.animationIn.call(_ => {
        // this.scroll = new LocomotiveScroll({
        //   el: document.querySelector('[data-scroll-container]'),
        //   smooth: true
        // })
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
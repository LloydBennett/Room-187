import GSAP from 'gsap'

export default class Page {
  constructor({ elements, element, id }) {
    this.id = id
    this.selector = element
    this.selectorChildren = { ...elements }
  }
  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}
    // this.selectorChildren.forEach(element => {
      
    // });
    console.log('Create', this.id, this.element)
  }
  show() {
    return new Promise(resolve => {
      GSAP.from(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
  hide() {
    return new Promise(resolve => {
      GSAP.from(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
}
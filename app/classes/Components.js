export default class Components {
  constructor({ elements, element }) {
    this.selector = element
    this.selectorChildren = { ...elements }
    this.create()
    //this.addEventListeners()
  }
  create() {
    //check to see if the selector is HTML element
    if (this.selector instanceof window.HTMLElement) {
      this.element = this.selector;
    } else {
      this.element = document.querySelector(this.selector);
    }

    this.elements = {}
    for(const obj in this.selectorChildren) {
      let el = this.selectorChildren[obj]
      if(el instanceof window.HTMLElement || 
        el instanceof window.NodeList || Array.isArray(el)) {
        this.elements[obj] = el
      }
      else {
        this.elements[obj] = document.querySelectorAll(el)

        if(this.elements[obj].length == 0) {
          this.elements[obj] = null
        } else if (this.elements[obj].length == 1) {
          this.elements[obj] = document.querySelector(el)
          //console.log(this.elements[obj])
        }
      }
    }
  }
  
  addEventListeners() {

  }
  removeEventListeners() {
    
  }
}
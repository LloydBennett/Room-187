export default function Create() {
  this.elements = {}
  for(const obj in this.selectors) {
    let el = this.selectors[obj]
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
      }
    }
  }
}
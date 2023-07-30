import Components from 'classes/Components'
import gsap from 'gsap'

export default class Navigation extends Components {
  constructor() {
    super({
      element: '[data-nav-menu]',
      elements: {
        trigger: '[data-nav-trigger]',
        body: 'body',
        bg: '[data-nav-menu-bg]',
        navBar: '[data-nav-bar]',
        navLinks: '.nav-menu__list-item [data-page-trigger]'
      }
    })  
    this.addEventListeners()
  }

  create() {
    super.create()
  }

  addEventListeners() {
    this.elements.trigger.addEventListener('click', () => {
      this.element.classList.toggle('show')
    })
  }
}
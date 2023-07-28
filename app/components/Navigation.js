import Components from 'classes/Components'
import gsap from 'gsap'
import { COLOUR_GRIT_300, COLOUR_WHITE } from 'utils/colour'

export default class Navigation extends Components {
  constructor() {
    super({
      element: '[data-nav-menu]',
      elements: {
        trigger: '[data-nav-trigger]',
        body: 'body',
        bg: '[data-nav-menu-bg]',
        bgPath: '.bg-path',
        navBar: '[data-nav-bar]',
        linkText: '[data-link-text]',
        navLinks: '.nav-menu__list-item [data-page-trigger]'
      }
    })
    this.animating = false
    this.tl = gsap.timeline({ paused: true })
    this.linkSpans = []

    this.intialiseNavText()
    this.addEventListeners()
    this.animate()
  }

  create() {
    super.create()
  }

  addEventListeners() {
    this.elements.trigger.addEventListener('click', () => {
      this.animating = !this.animating
      this.tl.reversed(!this.tl.reversed());
    })

    this.intialiseNavLinks()
  }

  intialiseNavText() {
    this.elements.linkText.forEach((element) => {
      let word = element.innerHTML.trim().replace(/ /g, '\u00a0')
      let letters = word.split("");
      
      element.innerHTML = ''
      
      letters.forEach((l, i)=> {
        let elSpan = document.createElement('span')
        elSpan.innerHTML = l
        element.appendChild(elSpan)
        this.linkSpans.push(elSpan)
      })
    });
  }

  intialiseNavLinks() {
    let elTl = gsap.timeline()

    this.elements.navLinks.forEach((element, id) => { 
      let imagePrev = document.querySelectorAll('.nav-menu__list-img')[id]

      let currentSpan = element.querySelectorAll('span')
      
      let imageBounds = imagePrev.getBoundingClientRect()
      console.log(imagePrev.clientHeight)
      
      element.addEventListener('mousemove', (e) => {
        //let bounds = e.target.getBoundingClientRect()

        
        this.getPos(e, imagePrev, imageBounds)
      })

      element.addEventListener('mouseenter', (e) => {
        
        elTl.to(this.linkSpans, { duration: 0.3, color: COLOUR_GRIT_300 }, 'hover-link')
        elTl.to(currentSpan, { duration: 0.3, color: COLOUR_WHITE }, 'hover-link')
        
        gsap.set(imagePrev, { scale: 0.8, xPercent: 25, yPercent: 50, rotation: -15 })
        gsap.to(imagePrev, { duration: 0.1, opacity: 1 , scale: 1, yPercent: 0, rotation: 0 })
      })

      element.addEventListener('mouseleave', () => {
        gsap.to(imagePrev, { duration: 0.1, opacity: 0, scale: 0.8, xPercent: 25, yPercent: 50, rotation: -15 })
        gsap.to(this.linkSpans, { duration: 0.3, color: COLOUR_WHITE })
      }) 

    })
  }

  animate() {
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z"
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z"
    let path = document.querySelector('.bg-path')
    let hamburgerIcon = this.elements.navBar.querySelectorAll('.hamburger__line')
    let newTl = gsap.timeline()

    this.tl.to(this.elements.navBar, 
    { 
      duration: 0.3, 
      opacity: 0
    })

    this.tl.fromTo(this.element, { duration: 0.4, opacity: 0, display: "none" }, { opacity: 1, display: "block" } , "-=0.8")

    this.tl.to(path, { duration: 0.8, attr: { d: start }, ease: "power3.in" }, "-=0.5")
        .to(path, { duration: 0.4, attr: { d: end }, ease: "power3.out" })
        .reverse()

    this.tl.to(this.elements.navBar, { duration: 0.3, opacity: 1, color: "white" }, '-=0.3 nav')
    this.tl.to(hamburgerIcon, { duration: 0.3, "background-color": "white" }, '-=0.3 nav')
    

    this.elements.navLinks.forEach((els) => {

      let spans = els.querySelectorAll('span')
    
      this.tl.fromTo(spans, { duration: 0.4, y: "100%" }, { y: 0, stagger: 0.03 }, "startTime-=0.3")

    })
  }

  getPos( e, el, imgDimension) {
    // Get coordinates for the current cursor position
    let x = e.x
    let y = e.y

    //console.log(e)

    // image y pos = height of the image / position of the menu link
    // image x pos = width of the menu link, 
    
    let elBounds = e.target.getBoundingClientRect()
    //let yOffset = elBounds.top / iBounds.height
    //yOffset = gsap.utils.mapRange(0, 1.5, -150, 150, yOffset)

    console.log(imgDimension)
    // gsap.to(el, {
    //   duration: 0.8,
    //   x: Math.abs(x - elBounds.left) - imgDimension.width / 2,
    //   y: Math.abs(y - elBounds.top) - imgDimension.height / 2,
    // })

    gsap.to(el, {
      duration: 0.8,
      x: Math.abs(x - elBounds.width) /  256,
      y: Math.abs(y - elBounds.top) - 304
    })

    //console.log(`x: ${Math.abs(x - elBounds.left) - imgDimension.width / 2}`)

    // this.animatableProperties.ty.current = Math.abs(mousepos.y - this.bounds.el.top) - this.bounds.reveal.height/2;
    // this.animatableProperties.tx.current = Math.abs(mousepos.x - this.bounds.el.left) - this.bounds.reveal.width/2;

    // gsap.to(el, {
    //   duration: 1.25,
    //   x: Math.abs(x - elBounds.left) - iBounds.width / 1.55,
    //   y: Math.abs(y - elBounds.top) - iBounds.height / 2 - yOffset
    // })
    
    // var xPos = 0,
    //     yPos = 0;

    // let centerY = trigger.offsetTop + trigger.offsetHeight / 2;
    
    // xPos = (el.offsetLeft - el.scrollLeft + el.clientLeft);
    // //yPos = (el.offsetTop - el.scrollTop + el.clientTop);
    
    // yPos = (((el.offsetTop - el.scrollTop) - centerY) + el.clientTop);
    // var mouseX = e.clientX - xPos,
    //     mouseY = e.clientY - yPos; 
    
    // el.style.top = '' + mouseY + 'px';
    // el.style.left = '' + mouseX + 'px';
  }
}
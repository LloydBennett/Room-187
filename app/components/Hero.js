import Components from 'classes/Components'
import gsap from 'gsap'

export default class Preloader extends Components {
  constructor() {
    super({
      elements: {
        heroImg: '[data-image-hero]',
        heroContent: '[data-hero-content]',
        heroBg: '[data-image-hero] [data-bg]'
      }
    })

    this.mm = gsap.matchMedia()
    this.scrollAnim()
  }

  create() {
    super.create()
  }

  scrollAnim() {
    if (!this.elements.heroContent) return;
    let size = this.getHeroImageSize()
    let startPos = size === "large"? '50% center': '50% 40%'
    
    if(size === "small") {
      this.mm.add("(max-width: 549px)", () => {
        this.heroContentAnim('50% center')
        this.heroImgAnim(startPos)
      })
    
      this.mm.add("(min-width: 550px) and (max-width: 1199px)", () => {
        this.heroContentAnim('80% center')
        this.heroImgAnim('80% center')
      })

      this.mm.add("(min-width: 1200px)", () => {
        this.heroContentAnim(startPos)
        this.heroImgAnim(startPos)
      })

    } else {
      this.heroContentAnim(startPos)
      this.heroImgAnim(startPos)
    }
  }
  
  getHeroImageSize() {
    return this.elements.heroImg.getAttribute('data-image-hero')
  }

  heroContentAnim(pos) {
    gsap.fromTo(this.elements.heroContent, 
      { opacity: 1 },
      {
        opacity: 0.1,
        scrollTrigger: {
          trigger: this.elements.heroContent,
          start: pos,
          scrub: true,
          markers: false
        },
        ease: "power2.out",
      }
    )
  }

  heroImgAnim(pos) {
    gsap.fromTo(this.elements.heroBg, 
      { scale: 1 },
      {
        scale: 1.5,
        duration: 0.6,
        scrollTrigger: {
          trigger: this.elements.heroContent,
          start: pos,
          scrub: true,
          markers: false
        },
        ease: "power2.out",
      }
    )
  }
}
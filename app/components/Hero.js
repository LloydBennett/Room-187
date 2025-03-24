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
  
    this.scrollAnim()
  }

  create() {
    super.create()
  }

  scrollAnim() {
    if (!this.elements.heroContent) return;
    let size = this.getHeroImageSize()
    let startPos = size === "large"? '50% center': '50% 40%'
    
    gsap.fromTo(this.elements.heroContent, 
      { opacity: 1 },
      {
        opacity: 0.1,
        scrollTrigger: {
          trigger: this.elements.heroContent,
          start: startPos,
          scrub: true,
          markers: false
        },
        ease: "power2.out",
      }
    )

    gsap.fromTo(this.elements.heroBg, 
      { scale: 1 },
      {
        scale: 1.5,
        duration: 0.6,
        scrollTrigger: {
          trigger: this.elements.heroContent,
          start: startPos,
          scrub: true,
          markers: false
        },
        ease: "power2.out",
      }
    )
  }
  getHeroImageSize() {
    return this.elements.heroImg.getAttribute('data-image-hero')
  
  }
}
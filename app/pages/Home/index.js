import Page from 'classes/Page'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      elements: {
        heroContent: '[data-hero-content]',
        homeBody: '[data-home-body]',
        videoScroll: '[data-video-scroll]'
      }
    })
    gsap.registerPlugin(ScrollTrigger)
    this.init()
  }
  init() {
    this.setUpScrollAnimations()
    console.log(this.elements.heroContent)
  }
  setUpScrollAnimations() {
    gsap.fromTo(this.elements.heroContent, 
      { opacity: 1 },
      {
        opacity: 0.1,
        scrollTrigger: {
          trigger: this.elements.heroContent,
          start: '60% 10%', // Start the animation when the top of the heroContent hits 90% of the viewport
          scrub: true,
          markers: true
        },
        ease: "power2.out",
      }
    )

    gsap.fromTo(this.elements.videoScroll, 
      { scale: 0.8 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: this.elements.videoScroll,
          start: 'top top', // Start the animation when the top of the heroContent hits 90% of the viewport
          scrub: true,
          markers: true
        },
        ease: "power2.out",
      }
    )
  }
}
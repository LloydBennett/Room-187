import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase"
import { scroll } from 'utils/LenisScroll'
import Create from "../utils/create"

export default class Page {
  constructor({ elements, id }) {
    this.id = id
    this.selectors = { 
      ...elements,
      overlay: '[data-page-transition]',
      slideOne: '[data-page-transition-slide-one]',
      slideTwo: '[data-page-transition-slide-two]',
      loader: '[data-loader]',
      images: '[data-loader-image]',
      imageHero: '[data-loader-hero]',
      mainTitles: '[data-hero] [data-text-reveal]',
      misc: '[data-misc]',
      page: '[data-page]',
      body: 'body',
      bg: '[data-bg]',
      navBar: '[data-nav-bar]'
    }

    Page.prototype.create = Create
    gsap.registerPlugin(CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.lScroll = scroll
    //this.tl = gsap.timeline()
    
    this.create()

    //console.log(this.elements.overlay)
  }
  show() {
    return new Promise(resolve => {
      let tl = gsap.timeline()
      
      // if(transitionStyle === "zoom") {
      this.zoomAnimation(tl)
      // }

      //this.elements.overlay.classList.add('hidden')
      this.animateAssets(tl, resolve)
    })
  }
  hide() {
    return new Promise(resolve => {
      let animOut = gsap.timeline()
      //let navTrigger = document.querySelector('[data-nav-trigger]')
      
      this.lScroll.stop()
      this.elements.body.classList.add('no-scrolling')
      
      animOut.to(this.elements.overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "zoom"
      })
      ///navTrigger.classList.remove('open')
      animOut.to(this.elements.slideTwo, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "zoom"
      }).add(resolve)

    })
  }
  zoomAnimation(tl) {
    if(!this.elements.images) return

    tl.to(this.elements.loader, { display: "flex", duration: 0.01 })
    this.elements.images.forEach((img, i) => {
      tl.to(img, { opacity: 1, duration: 0.04, ease: "linear" }, "+=0.15")
    })
    //tl.to(this.elements.images, { opacity: 1, duration: 0.04, ease: "linear", stagger: 0.4 }, "+=0.15")

    if(this.elements.imageHero) {
      tl.to(this.elements.imageHero, { scale: 1, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.6, ease: "zoom" }, "+=0.4")
    }

    tl.to(this.elements.loader, { display: "none", duration: 0.01, onComplete: () => {
      if(this.elements.imageHero) {
        tl.to(this.elements.imageHero, { scale: 0.5, clipPath:"polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)", duration: 0.01 })
      }
    } })

    tl.to(this.elements.images, { opacity: 0, duration: 0.01, ease: "linear" })

      // if(this.elements.page.getAttribute == "error") {
      //   this.elements.loader.classList.add('bg--error')
      // }    
  }
  animateAssets(tl, resolve) {
    gsap.set(this.elements.overlay, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" })
    gsap.set(this.elements.slideTwo, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" })

    this.elements.overlay.classList.remove('hidden')

    tl.fromTo(this.elements.mainTitles, { y: "100%" }, { y: 0, duration: 0.8, ease: "zoom", stagger: (i, target) => target.dataset.textReveal ? 0.05 * Number(target.dataset.textReveal): 0.05, 
      onComplete: () => {
        this.elements.body.classList.remove('no--scrolling')
      }
    }, '-=0.1')

    tl.fromTo(this.elements.misc, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out', onComplete: () => {
      resolve()
      this.lScroll.start()

    }}, "-=0.1")
  }
}
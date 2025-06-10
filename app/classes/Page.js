import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase"
import { scroll } from 'utils/LenisScroll'
import { SplitText } from 'gsap/SplitText'
import Create from "../utils/create"

export default class Page {
  constructor({ id = 'default', elements = {} } = {}) {
    this.id = id
    this.selectors = { 
      ...elements,
      overlay: '[data-page-transition]',
      slideOne: '[data-page-transition-slide-one]',
      slideTwo: '[data-page-transition-slide-two]',
      loader: '[data-loader]',
      images: '[data-loader-image]',
      imageHero: '[data-loader-hero]',
      mainTitles: '[data-hero] [data-split-text]',
      misc: '[data-misc]',
      page: '[data-page]',
      body: 'body',
      bg: '[data-bg]',
      navBar: '[data-nav-bar]'
    }

    Page.prototype.create = Create
    gsap.registerPlugin(CustomEase, SplitText)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")
    this.lScroll = scroll    
    this.create()
  }

  show(isFirstVisit) {
    return new Promise(resolve => {
      let tl = gsap.timeline()
      const hasHeroImg = this.hasHeroImage

      //window.scrollTo(0, 0)
      if(!this.elements.body.classList.contains('no--scrolling')) {
        this.preventScrolling()
      }
    
      if (isFirstVisit) {
        this.zoomAnimation(tl, isFirstVisit)
      } else if (hasHeroImg) {
        this.zoomAnimation(tl, isFirstVisit)
      }

      this.animateAssets(tl, resolve)
    })
  }

  hide() {
    return new Promise(resolve => {
      let animOut = gsap.timeline()
      this.preventScrolling()

      animOut.to(this.elements.overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "zoom"
      })

      animOut.to(this.elements.slideTwo, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "zoom"
      }).add(resolve)

    })
  }
  zoomAnimation(tl, showFullAnim) {
    if(!this.elements.images) return

    const pageName = this.elements.page?.dataset?.page || '';
    const isErrorPage = pageName === 'error';
    const hasHeroImg = this.hasHeroImage
    let smallHeroImg = document.querySelector('[data-image-hero="small"]')

    if (isErrorPage) {
      tl.to(this.elements.loader, { display: "flex", duration: 0.01 })
      this.showImages(tl, false)

      tl.to({}, {
        onComplete: () => {
          this.elements.loader.classList.add('bg--error')
        }
      }, "-=0.8");

      tl.to(this.elements.loader, { display: "none", duration: 0.01, onComplete: ()=> {
        this.elements.loader.classList.remove('bg--error')
      }}, "+=0.6")
    }
    else {
      tl.to(this.elements.loader, { display: "flex", duration: 0.01 })
      this.showImages(tl, showFullAnim)

      if(hasHeroImg) {
        if(smallHeroImg) {
          this.elements.imageHero.style.top = 0
        }

        tl.to(this.elements.imageHero, { opacity: 1, duration: 0.04, ease: "linear" }, "+=0.15")
        tl.to(this.elements.imageHero, { scale: 1, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.6, ease: "zoom" }, "+=0.4")

        if(smallHeroImg) {
          let imgHeight = smallHeroImg.offsetHeight
          let loaderImgs = document.querySelectorAll('[data-loader-image]:not([data-loader-hero])')

          tl.to(loaderImgs, { opacity: 0, duration: 0.01, ease: "linear" })
            .to(this.elements.imageHero, { height: imgHeight, duration: 0.6, ease: "zoom" })
        }

        tl.to(this.elements.loader, { display: "none", duration: 0.01, 
          onComplete: () => {
            tl.to(this.elements.imageHero, { scale: 0.5, clipPath:"polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)", duration: 0.01 })
            if(smallHeroImg) {
              this.elements.imageHero.style.height = ''
              this.elements.imageHero.style.top = ''
            }
          }
        })

      } else {
        tl.to(this.elements.loader, { display: "none", duration: 0.01}, "+=0.6")
      }
    }
    
    tl.to(this.elements.images, { opacity: 0, duration: 0.01, ease: "linear" })
    
  }

  showImages(tl, showFullAnim) {
    if(showFullAnim) {
      this.elements.images.forEach((img, i) => {
        tl.to(img, { opacity: 1, duration: 0.04, ease: "linear" }, "+=0.15")
      })
    } else {
      for (let i = 0; i < Math.min(4, this.elements.images.length); i++) {
        tl.to(this.elements.images[i], {
          opacity: 1,
          duration: 0.04,
          ease: "linear",
        }, "+=0.15");
      }
    }
  }

  animateAssets(tl, resolve) {
    gsap.set(this.elements.overlay, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" })
    gsap.set(this.elements.slideTwo, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" })
    
    if (!this.elements.mainTitles || this.elements.mainTitles.length === 0) {
      console.warn('mainTitles not found or empty:', this.elements.mainTitles)
    }

    document.fonts.ready.then(() => {
      const heroTitles = (this.elements.mainTitles instanceof NodeList || Array.isArray(this.elements.mainTitles))
      ? Array.from(this.elements.mainTitles)
      : this.elements.mainTitles
        ? [this.elements.mainTitles]
        : [];

      const allLines = [];
      const blockLineAnimations = []
      
      heroTitles.forEach((el) => {
        const split = SplitText.create(el, 
          {
            type: "lines",
            lineClass: "line",
            mask: "lines",
            autoSplit: true
          }
        )

        allLines.push(split.lines)
      })

      allLines.forEach((text, i) => {
        tl.fromTo(text,
          { y: "100%"},
          {
            y: "0", 
            duration: 0.8, 
            ease: "zoom",
            stagger: 0.05
          },
          "titles -=0.2"
        )
      })

      tl.fromTo(this.elements.misc, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
      
      tl.call(() => {
        this.elements.body.classList.remove("no--scrolling");
        document.documentElement.style.overflow = '';
        this.lScroll.start();
        resolve();
      })
    })
  }

  preventScrolling() {
    this.lScroll.stop()
    document.documentElement.style.overflow = 'hidden';
    this.elements.body.classList.add('no--scrolling')
  }

  get hasHeroImage() {
    return this.elements.imageHero && !this.elements.imageHero.classList.contains('hidden');
  } 

}
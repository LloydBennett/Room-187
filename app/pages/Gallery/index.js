import Page from 'classes/Page'
import gsap from 'gsap'
import { scroll } from 'utils/LenisScroll'
import { CustomEase } from 'gsap/CustomEase'

export default class Gallery extends Page {
  constructor() {
    super({
      id: 'gallery',
      elements: {
        gallery: '[data-gallery]',
        galleryItems: '[data-gallery-item]',
        slideShow: '[data-slideshow]',
        prev: '[data-slideshow-prev]',
        next: '[data-slideshow-next]',
        close: '[data-slideshow] [data-close]',
        slideShowContainer: '[data-slideshow-container]'
      }
    })

    gsap.registerPlugin(CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.tl = gsap.timeline()
    this.currentIndex = 0
    this.media = []
    this.scroll = scroll
    this.hasMediaBeenSet = false
    this.isHovered = false
    this.scrollSpeed = 1
    this.duplicatedItems = []
    
    this.init()
  }

  openSlideShow(e) {
    const mediaElement = e.target;
    const mediaId = mediaElement.dataset.galleryId;  
    
    this.currentIndex = this.media.findIndex(media => media.dataset.galleryId === mediaId)
    this.scroll.stop()
    this.tl.clear()

    this.tl.to(this.elements.galleryItems, { 
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", 
      duration: 0.6,
      ease: "zoom"
    })

    //this.animateImages(false, false)

    this.tl.to(this.elements.slideShow, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "zoom",
      onComplete: () => {
        this.elements.slideShow.classList.remove('cannot-interact')
        this.showMedia()
      }
    })

    this.tl.to(this.elements.close, { opacity: 1, duration: 0.3, ease: "power2.out" })
    this.tl.to(this.elements.prev, { opacity: 1, duration: 0.3, ease: "power2.out" }, 'controls')
    this.tl.to(this.elements.next, { opacity: 1, duration: 0.3, ease: "power2.out" }, 'controls')
  }

  closeSlideShow() {
    let slideShowMedia = document.querySelector('.slideshow-media__item')
    this.elements.slideShow.classList.add('cannot-interact')

    this.tl.to(this.elements.slideShow, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "zoom",
      onComplete: () => {
        slideShowMedia.remove()
        this.hasMediaBeenSet = false
        this.scroll.start()
        this.animateImages(false, true)
      }
    })

    this.tl.to(this.elements.close, { opacity: 0, duration: 0.001 }, 'hide')
    this.tl.to(this.elements.prev, { opacity: 0, duration: 0.001 }, 'hide')
    this.tl.to(this.elements.next, { opacity: 0, duration: 0.001 }, 'hide')
    
    // Remove image parameter from URL
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("media");
    window.history.pushState({}, "", newUrl);
  }
  
  changeMedia(direction) {
    const oldIndex = this.currentIndex
    this.currentIndex = (this.currentIndex + direction + this.media.length) % this.media.length
    
    if (oldIndex === this.currentIndex) return

    if (this.tl.isActive()) {
      this.tl.add(() => {
        this.showMedia();
      })
    } else {
      this.showMedia();
    }
  }

  showMedia() {
    const mediaCurrentElem = this.media[this.currentIndex]
    const mediaType = mediaCurrentElem.dataset.galleryItem
    const mediaId = mediaCurrentElem.dataset.galleryId;

    // If the same media, don't do anything
    if (this.elements.slideShowContainer.querySelector(`[data-slideshow-id="${mediaId}"]`)) {
      return;
    }

    if (!this.hasMediaBeenSet) {
      this.createAndSetMediaElement(mediaCurrentElem, mediaType)
      this.hasMediaBeenSet = true
    } else {
      this.swapMediaElement(mediaCurrentElem, mediaType)
    }

    // Update the URL with the new image ID
    const newUrl = new URL(window.location)
    newUrl.searchParams.set("media", mediaId)
    window.history.pushState({}, "", newUrl)
  }

  createAndSetMediaElement(mediaElem, mediaType) {
    const newElem = this.createNewMediaItem(mediaType)
    this.setMediaAttributes(newElem, mediaElem, mediaType)

    this.elements.slideShowContainer.innerHTML = '' // Clear previous elements
    this.elements.slideShowContainer.appendChild(newElem)

    gsap.fromTo(newElem, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.6, ease: "zoom" })

  }

  swapMediaElement(mediaElem, mediaType) {
    const oldElem = this.elements.slideShowContainer.firstChild
    const newElem = this.createNewMediaItem(mediaType)
    this.setMediaAttributes(newElem, mediaElem, mediaType)

    this.elements.slideShowContainer.appendChild(newElem)

    this.tl.fromTo(newElem, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.6, ease: "zoom" })
    
    this.tl.to(oldElem, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        oldElem.remove()
      }
    }, "-=0.2")

  }

  createNewMediaItem(type) {
    const elem = type === "video" ? document.createElement('video') : document.createElement('img')
    elem.classList.add('slideshow-media__item')
    return elem
  }

  setMediaAttributes(elem, mediaElem, mediaType) {
    const mediaId = mediaElem.dataset.galleryId

    elem.setAttribute('data-slideshow-id', mediaId)

    if (mediaType === "video") {
      elem.setAttribute('autoplay', '')
      elem.setAttribute('muted', '')
      elem.setAttribute('loop', '')

      const source = document.createElement('source')
      source.src = mediaElem.querySelector("source").src
      source.type = "video/mp4"
      elem.appendChild(source)
    } else {
      elem.src = mediaElem.dataset.gallerySrc
      elem.alt = mediaElem.alt || "Gallery Image"
    }
  }

  // Check URL on Page Load & Open Slideshow if Needed
  checkURLForSlideShow() {
    window.addEventListener("DOMContentLoaded", () => {
      const urlParams = new URLSearchParams(window.location.search);
      const mediaId = urlParams.get("media");
  
      if (mediaId) {
        const mediaElement = document.querySelector(`[data-gallery-id="${mediaId}"]`);
        if (mediaElement) this.openSlideShow({ target: mediaElement });
      }
    })
  }
  
  animateImages(useStrollTrigger, show = true) {
    let clipPathPoly = show? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" 

    if(useStrollTrigger) {
      gsap.to(this.elements.galleryItems,
        {
          clipPath: clipPathPoly,
          duration: 0.6,
          scrollTrigger: {
            trigger: this.elements.galleryItems,
            start: 'top bottom',
            scrub: false,
            markers: false
          },
          ease: "zoom"
        }
      )
    }
    else {
      gsap.to(this.elements.galleryItems,
        {
          clipPath: clipPathPoly,
          duration: 0.6,
          ease: "zoom"
        }
      )
    }
  }

  animateAssets(tl, resolve) {
    super.animateAssets(tl, () => {
      this.animateImages(true)

      resolve()
    })
  }

  addEventListeners() {
    if(!this.elements.galleryItems || !this.elements.close) return

    gsap.set(this.elements.galleryItems, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"})
    
    if (Array.isArray(this.elements.galleryItems) || (typeof this.elements.galleryItems === 'object')) {
      this.media = Array.from(this.elements.galleryItems)
      this.elements.galleryItems.forEach(element => {
        element.addEventListener('click', (e) => {
          this.openSlideShow(e)
        })

      });
      
    } else {
      this.elements.galleryItems.addEventListener('click', (e) => {
        this.openSlideShow(e)
      })
    }

    if(this.elements.prev) {
      this.elements.prev.addEventListener('click', () => {
        this.changeMedia(-1)
      })
    }

    if(this.elements.next) {
      this.elements.next.addEventListener('click', () => {
        this.changeMedia(1)
      })
    }

    this.elements.close.addEventListener('click', () => {
      this.closeSlideShow()
    })
  }

  init() {
    this.addEventListeners()
    this.checkURLForSlideShow()
  }
}
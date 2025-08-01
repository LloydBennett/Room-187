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
        slideShowContainer: '[data-slideshow-container]',
        slideShowCounter: '[data-slideshow-index]',
        miniMap: '[data-mini-map]',
        miniMapItems: '[data-mini-map-item]',
        miniMapIndicator: '[data-mini-map-indicator]'
      }
    })

    gsap.registerPlugin(CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.tl = gsap.timeline()
    this.currentIndex = 0
    this.media = []
    this.scroll = scroll
    this.hasMediaBeenSet = false

    this.allowSlideNavigation = false
    
    this.init()
  }

  openSlideShow(e) {
    const mediaElement = e.target;
    const mediaId = mediaElement.dataset.galleryId;

    this.currentIndex = this.media.findIndex(media => media.dataset.galleryId === mediaId)
    this.displayIndex()
    this.scroll.stop()
    this.tl.clear()

    this.updateMinimapIndicator(mediaId, true);


    this.tl.to(this.elements.galleryItems, { 
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", 
      duration: 0.4,
      ease: "zoom"
    })

    this.tl.to(this.elements.slideShow, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "zoom",
      onComplete: () => {
        this.elements.slideShow.classList.remove('cannot-interact')
        this.showMedia()
        this.enableSlideNavigation()
      }
    }, '-=0.2')

    this.tl.to(this.elements.close, { opacity: 1, duration: 0.3, ease: "power2.out" })
    this.tl.to(this.elements.prev, { opacity: 1, duration: 0.3, ease: "power2.out" }, 'controls')
    this.tl.to(this.elements.next, { opacity: 1, duration: 0.3, ease: "power2.out" }, 'controls')
  }

  closeSlideShow() {
    this.disableSlideNavigation()
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
  
  goToMedia(index) {
    if (index < 0 || index >= this.media.length || index === this.currentIndex) return;
    
    this.currentIndex = index;
    this.displayIndex();

    if (this.tl.isActive()) {
      this.tl.add(() => {
        this.showMedia();
      });
    } else {
      this.showMedia();
    }
  }

  changeMedia(direction) {
    const oldIndex = this.currentIndex
    this.currentIndex = (this.currentIndex + direction + this.media.length) % this.media.length
    this.displayIndex()
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
    
    this.updateMinimapIndicator(mediaId)

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


    gsap.fromTo(newElem, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.6, ease: "power2.out" })
  }

  displayIndex() {
    this.elements.slideShowCounter.innerHTML = String(this.currentIndex + 1).padStart(2, '0')
  }

  swapMediaElement(mediaElem, mediaType) {
    const oldElem = this.elements.slideShowContainer.firstChild
    const newElem = this.createNewMediaItem(mediaType)
    this.setMediaAttributes(newElem, mediaElem, mediaType)

    this.elements.slideShowContainer.appendChild(newElem)
    
    this.tl.fromTo(newElem, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" })
    
    this.tl.to(oldElem, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        oldElem.remove()
      }
    }, "-=0.2")
  }

  setupScrollNavigation() {
    let ticking = false;

    window.addEventListener('wheel', (e) => {
      if (!this.allowSlideNavigation || ticking) return;

      ticking = true;
      const direction = e.deltaY > 0 ? 1 : -1;

      this.changeMedia(direction);

      setTimeout(() => {
        ticking = false;
      }, 600); // delay to prevent overscroll
    });
  }

  setupSwipeNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;

    const threshold = 50; // Minimum swipe distance

    const container = this.elements.slideShowContainer;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    const handleSwipe = () => {
      if (!this.allowSlideNavigation) return;
      const delta = touchStartX - touchEndX;
      
      if (Math.abs(delta) > threshold) {
        const direction = delta > 0 ? 1 : -1;
        this.changeMedia(direction);
      }
    };
  }

  disableSlideNavigation() {
    this.allowSlideNavigation = false;
  }

  enableSlideNavigation() {
    this.allowSlideNavigation = true;
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
      elem.setAttribute('playsinline', '')

      const source = document.createElement('source')
      source.src = mediaElem.querySelector("source").src
      source.type = "video/mp4"
      elem.appendChild(source)

      // ✅ Important: call play explicitly
      elem.addEventListener('loadeddata', () => {
        elem.play().catch((err) => {
          console.warn('Autoplay prevented:', err);
        });
      });
    } else {
      elem.src = mediaElem.dataset.gallerySrc
      elem.alt = mediaElem.alt || "Gallery Image"
    }
  }

  updateMinimapIndicator(mediaId = this.media[this.currentIndex]?.dataset.galleryId, instant = false) {
    if (!mediaId) return
    let miniMapRect = this.elements.miniMap.getBoundingClientRect()

    this.elements.miniMapItems.forEach((item, i) => {
      if (item.dataset.galleryId === mediaId) {
        let itemRect = item.getBoundingClientRect()
        
        const targetX = -item.offsetLeft
        const indicatorXpos = itemRect.left - miniMapRect.left

        if (instant) {
          gsap.set(this.elements.miniMapIndicator, {x: indicatorXpos})
          gsap.set(this.elements.miniMap, { x: targetX })

        } else {
          gsap.to(this.elements.miniMapIndicator, {
            x: indicatorXpos,
            duration: 0.4,
            ease: "zoom"
          })

          gsap.to(this.elements.miniMap, {
            x: targetX,
            duration: 0.4,
            ease: "power3.out"
          })
        }
      }
    });
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

  handleResize = () => {
    this.updateMinimapIndicator()
  }

  // Debounce helper (avoids spamming during resize)
  debounce(fn, delay = 100) {
    let timeout
    return () => {
      clearTimeout(timeout)
      timeout = setTimeout(fn, delay)
    }
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

    if(this.elements.miniMapItems) {
      this.elements.miniMapItems.forEach((elem, i) => {
        elem.addEventListener('click', () => {
          if (!this.allowSlideNavigation) return;
          this.goToMedia(i)
        })
      })
    }

    window.addEventListener('resize', this.debounce(this.handleResize))
  }

  init() {
    this.addEventListeners()
    this.checkURLForSlideShow()
    this.setupSwipeNavigation()
    this.setupScrollNavigation()
  }
}
import Page from 'classes/Page'
import Lenis from 'lenis'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import TextSplit from 'components/TextSplit'
import { scroll } from 'utils/LenisScroll'

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      elements: {
        bioTrigger: '[data-bio-trigger]',
        close: '[data-bio-overlay-modal] [data-close]',
        bioOverlay: '[data-bio-overlay-modal]',
        bioContainer: '[data-bio-overlay-content]',
        body: 'body',
        imageCarousel: '[data-image-carousel]'
      }
    })
    
    gsap.registerPlugin(CustomEase, SplitText)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")
    this.pageScroll = scroll
    this.isOpen = false
    this.tl = new gsap.timeline()
    this.mm = gsap.matchMedia()
    this.addEventListeners()
    this.enableDraggableCarousel()
  }

  onPopState () {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  async onChange({ url, push = true }) {
    if (push) {
      this.previousUrl = window.location.pathname
      window.history.pushState({}, "", url)
    }
    const req = await window.fetch(url)

    if(req.status === 200) {
      const html = await req.text()
      const div = document.createElement('div')
      div.innerHTML = html

      if(push) {
        window.history.pushState({}, "", url)
      }
      
      const divContent = div.querySelector('[data-inner-content]')
      
      this.elements.bioContainer.innerHTML = divContent.innerHTML
      this.elements.bioImage = this.elements.bioContainer.querySelector('[data-bio-image]')
      this.elements.mainTitles = this.elements.bioContainer.querySelectorAll('[data-bio-overlay-modal] [data-hero] [data-text-reveal]')
      this.elements.bioText = this.elements.bioContainer.querySelector('.bio__content [data-split-text]')
      this.elements.bioRole = this.elements.bioContainer.querySelector('[data-bio-overlay-modal] .bio__role [data-split-text]')
      
      if (!this.modalScroll) {
        this.init(); 
      } else {
        this.modalScroll.resize()
      }

      this.setAnimationPositions()
      this.animateContent()
    }
  }

  removeContent() {
    this.elements.bioContainer.innerHTML = ""
  }

  openModal() {
    if (this.isOpen) return

    this.pageScroll.stop()
    this.elements.body.classList.add('no-scrolling')

    this.tl.to(this.elements.bioOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "zoom"
    })
  }

  closeModal() {
    this.tl.to(this.elements.bioOverlay, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",  
      duration: 0.6,
      ease: "zoom",
      onComplete: () => {
        this.isOpen = false
        this.setAnimationPositions()
        this.removeContent()
        this.pageScroll.start()
      }
    })
  }

  animateContent() {
    const tl = gsap.timeline()
    
    this.tl.to(this.elements.mainTitles, { y: 0, duration: 0.8, ease: "zoom", stagger: (i, target) => target.dataset.textReveal ? 0.05 * Number(target.dataset.textReveal): 0.05 }, '-=0.3')
    this.tl.to(this.elements.bioRole, { y: 0, duration: 0.8, ease: "zoom"}, '-=0.6')

    document.fonts.ready.then(() => {
      const split = SplitText.create(this.elements.bioText, {
        type: "lines",
        lineClass: "line",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          return this.animateBodyText(this.elements.bioText, self.lines)
        }
      })
    })

    this.tl.to(this.elements.bioImage, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, '-=0.6')
      
    this.tl.to(this.elements.close, { opacity: 1, duration: 0.3, ease: "power2.out", onComplete: ()=> {
      this.isOpen = true
      this.elements.body.classList.remove('no--scrolling')
      this.modalScroll.start()
    }}, '-=0.2')
  }

  animateBodyText(text, lines) {
    this.mm.add("(max-width: 1199px)", () => {
      TextSplit.scrollAnimateText(text, lines)
      console.log('its working')
    })

    this.mm.add("(min-width: 1200px)", () => {
      this.tl.fromTo(lines,
        { y: "100%" },
        {
          y: 0,
          duration: 0.8,
          ease: "zoom",
          stagger: 0.05
        },
      '-=0.8')
    })
  }


  enableDraggableCarousel() {
    const carousel = this.elements.imageCarousel
    const items = carousel.querySelectorAll(".image-carousel__item")

    if (!carousel || items.length === 0) return

    let isDragging = false
    let startX = 0
    let lastX = 0
    let velocity = 0
    let rafId = null

    const friction = 0.925
    const speedMultiplier = 1.35
    const rotationIntensity = 0.04 // ⬅️ Subtle swing

    const resetRotation = () => {
      items.forEach((item) => {
        gsap.to(item, {
          rotationZ: 0, // Reset swing
          duration: 0.6,
          ease: "power3.out",
          overwrite: true
        })
      })
    }

    const updateItemRotations = (v) => {
      items.forEach((item, index) => {
        const factor = (index + 1) / items.length
        const rotateZ = gsap.utils.clamp(-2, 2, v * rotationIntensity * factor)

        gsap.to(item, {
          rotationZ: rotateZ,
          duration: isDragging ? 0.1 : 0.4,
          ease: "power2.out",
          overwrite: true
        })
      })
    }

    const inertiaLoop = () => {
      if (Math.abs(velocity) < 0.2) {
        resetRotation()
        return
      }

      carousel.scrollLeft -= velocity
      updateItemRotations(velocity)

      velocity *= friction
      rafId = requestAnimationFrame(inertiaLoop)
    }

    const startDrag = (e) => {
      isDragging = true
      carousel.classList.add("is-dragging")

      startX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX
      lastX = startX
      cancelAnimationFrame(rafId)
    }

    const onDrag = (e) => {
      if (!isDragging) return

      const x = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX
      const delta = (x - lastX) * speedMultiplier

      carousel.scrollLeft -= delta
      velocity = delta
      lastX = x

      updateItemRotations(velocity)
    }

    const endDrag = () => {
      isDragging = false
      carousel.classList.remove("is-dragging")
      inertiaLoop()
    }

    // Mouse Events
    carousel.addEventListener("mousedown", startDrag)
    window.addEventListener("mousemove", onDrag)
    window.addEventListener("mouseup", endDrag)

    // Touch Events
    carousel.addEventListener("touchstart", startDrag, { passive: true })
    window.addEventListener("touchmove", onDrag, { passive: false })
    window.addEventListener("touchend", endDrag)
  }

  addEventListeners() {
    if (!this.elements.bioTrigger || !this.elements.close) return
    
    this.elements.bioTrigger.forEach((l) => {
      
      l.onclick = event => {
        event.preventDefault()
        const href = l.href

        this.openModal()
        this.onChange({ url: href })
      }
    })

    this.elements.close.addEventListener('click', () => {
      if (this.previousUrl) {
        window.history.replaceState({}, "", this.previousUrl)
      }

      this.closeModal()
    })

    window.addEventListener('popstate', this.onPopState.bind(this))
  }

  setAnimationPositions() {
    gsap.set(this.elements.close, { opacity: 0 })
    gsap.set(this.elements.mainTitles, { y: "100%" })
    gsap.set(this.elements.bioRole, { y: "100%" })
    gsap.set(this.elements.bioImage, { y: "20%", opacity: 0 })
  }

  init() {
    if (!this.elements.bioOverlay || !this.elements.bioContainer) {
      console.error("❌ Lenis Initialization Failed: Missing Elements", this.elements);
      return;
    }

    this.modalScroll = new Lenis({
      wrapper: this.elements.bioOverlay,
      content: this.elements.bioContainer,
      autoRaf: true,
      duration: 1
    })

    const raf = (time) => {
      this.modalScroll.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    this.modalScroll.stop()
    
    this.enableDraggableCarousel()

  }
  
}
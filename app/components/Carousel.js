import Components from 'classes/Components'
import gsap from 'gsap'

export default class Carousel extends Components {
  constructor() {
    super({
      elements: {
        carousel: '[data-carousel]'
      }
    })

    this.init()
  }

  create() {
    super.create()
  }

  init() {
    if (this.elements.carousel === null) return

    let carousels = []

    if (this.elements.carousel instanceof NodeList || Array.isArray(this.elements.carousel)) {
      carousels = Array.from(this.elements.carousel)
    } 
    else {
      carousels = [this.elements.carousel]
    }

    carousels.forEach(c => this.setCarouselType(c))
  }

  setCarouselType(carousel) {
    const type = carousel.getAttribute('data-carousel')
    const wrapper = carousel.closest('[data-carousel-wrapper]')
    let progressEl = null

    if (wrapper) {
      const indicator = wrapper.querySelector('[data-carousel-indicator]')
      const progress = wrapper.querySelector('[data-carousel-progress]')
      if (indicator && progress) progressEl = progress
    }

    this.enableDraggableCarousel(carousel, progressEl)

    // add extra behavior if requested
    if (type === "motion") {
      this.enableRotations(carousel)
    }    
  }

  enableDraggableCarousel(carousel, progressEl = null) {
    let isDragging = false
    let startX = 0
    let lastX = 0
    let velocity = 0
    let rafId = null
    const items = carousel.querySelectorAll('[data-carousel-item]')
    if (!items.length) return

    const friction = 0.925
    const speedMultiplier = 1.35

    const updateProgress = () => {
      if (!progressEl) return
      const scrollLeft = carousel.scrollLeft
      const maxScroll = carousel.scrollWidth - carousel.clientWidth
      const percent = Math.min(Math.max((scrollLeft / maxScroll) * 100, 0), 100)
      gsap.to(progressEl, { width: `${percent}%`, duration: 0.15, ease: 'power2.out' })
    }

    const snapToNearestItem = () => {
      if (!items.length) return
      let nearestIndex = 0
      let minDistance = Infinity

      items.forEach((item, index) => {
        const distance = Math.abs(carousel.scrollLeft - item.offsetLeft)
        if (distance < minDistance) {
          minDistance = distance
          nearestIndex = index
        }
      })

      const paddingLeft = parseFloat(getComputedStyle(carousel).paddingLeft) || 0
      const targetScrollLeft = items[nearestIndex].offsetLeft - paddingLeft

      gsap.to(carousel, {
        scrollLeft: targetScrollLeft,
        duration: 0.4,
        ease: 'power3.out',
        onUpdate: updateProgress,
        onComplete: updateProgress
      })
    }

    const inertiaLoop = () => {
      if (Math.abs(velocity) < 0.2) return
      carousel.scrollLeft -= velocity
      updateProgress()
      velocity *= friction
      rafId = requestAnimationFrame(inertiaLoop)
    }

    const startDrag = (e) => {
      if (e.type === 'mousedown' && e.button !== 0) return
      isDragging = true
      carousel.classList.add('is-dragging')
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX
      lastX = startX
      cancelAnimationFrame(rafId)
    }

    const onDrag = (e) => {
      if (!isDragging) return
      const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX
      const delta = (x - lastX) * speedMultiplier
      carousel.scrollLeft -= delta
      velocity = delta
      lastX = x

      // Desktop: update progress live
      if (window.innerWidth > 768) updateProgress()
    }

    const endDrag = () => {
      isDragging = false
      carousel.classList.remove('is-dragging')

      if (window.innerWidth <= 768) {
        snapToNearestItem()
      } else {
        inertiaLoop()
      }
    }

    // Events
    carousel.addEventListener('mousedown', startDrag)
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', endDrag)

    carousel.addEventListener('touchstart', startDrag, { passive: true })
    window.addEventListener('touchmove', onDrag, { passive: false })
    window.addEventListener('touchend', endDrag)

    window.addEventListener('resize', updateProgress)

    // Initial progress update
    updateProgress()
  }

  enableRotations(carousel) {
    const items = carousel.querySelectorAll("[data-carousel-item]")
    if (!items.length) return

    const rotationIntensity = 0.04

    const resetRotation = () => {
      items.forEach(item => {
        gsap.to(item, {
          rotationZ: 0,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true
        })
      })
    }

    const updateItemRotations = (v, isDragging) => {
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

    // hook into dragging lifecycle
    carousel.addEventListener("carousel:drag", (e) => {
      updateItemRotations(e.detail.velocity, e.detail.isDragging)
    })

    carousel.addEventListener("carousel:end", () => {
      resetRotation()
    })
  }
}
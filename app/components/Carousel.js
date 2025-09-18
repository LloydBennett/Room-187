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

    console.log(typeof this.elements.carousel)

    let carousels = []

    // multiple carousels
    if (this.elements.carousel instanceof NodeList || Array.isArray(this.elements.carousel)) {
      carousels = Array.from(this.elements.carousel)
    } 
    // single carousel
    else {
      carousels = [this.elements.carousel]
    }

    carousels.forEach(c => this.setCarouselType(c))
  }

  setCarouselType(carousel) {
    const type = carousel.getAttribute('data-carousel')
    console.log(type)

    // always enable dragging
    this.enableDraggableCarousel(carousel)

    // add extra behavior if requested
    if (type === "motion") {
      this.enableRotations(carousel)
    }
  }

  enableDraggableCarousel(carousel) {
    let isDragging = false
    let startX = 0
    let lastX = 0
    let velocity = 0
    let rafId = null

    const friction = 0.925
    const speedMultiplier = 1.35

    const inertiaLoop = () => {
      if (Math.abs(velocity) < 0.2) return
      carousel.scrollLeft -= velocity
      velocity *= friction
      rafId = requestAnimationFrame(inertiaLoop)
    }

    const startDrag = (e) => {
       // ignore right/middle clicks
      if (e.type === "mousedown" && e.button !== 0) return
      
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

      // broadcast so optional features can hook in
      carousel.dispatchEvent(new CustomEvent("carousel:drag", { detail: { velocity, isDragging } }))
    }

    const endDrag = () => {
      isDragging = false
      carousel.classList.remove("is-dragging")
      inertiaLoop()
      carousel.dispatchEvent(new CustomEvent("carousel:end", { detail: { velocity } }))
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
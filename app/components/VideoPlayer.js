import Components from 'classes/Components'
import gsap from 'gsap'
import { scroll } from 'utils/LenisScroll'
import { CustomEase } from 'gsap/CustomEase'

export default class VideoPlayer extends Components {
  constructor() {
    super({
      elements: {
        trigger: '[data-play]',
        videoBg: '[data-play-bg]',
        closeBtn: '[data-close]'
      }
    })

    gsap.registerPlugin(CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.tl = gsap.timeline()
    this.video = null
    this.videoOverlay = null
    this.videoBg = null
    this.scroll = scroll
    this.isOverlayOpen = false
    this.addEventListeners()
  }

  create() {
    super.create()
  }

  addEventListeners() {    
    if(this.elements.trigger !== null) {
      if (Array.isArray(this.elements.trigger) || (typeof this.elements.trigger === 'object')) {
        this.elements.trigger.forEach(btn => {
          btn.addEventListener('click', () => {
            this.playVideo(btn)
          })
        });
      } 
      else {
        this.elements.trigger.addEventListener('click', (e) => {
          this.playVideo(this.elements.trigger)
        })
      }
    } else {
      return
    }

    this.elements.closeBtn.addEventListener('click', () => {
      this.closePlayer()
    })
  }
  
  playVideo(trigger) {
    let videoID = trigger.getAttribute('data-play')
    let video = document.querySelector(`[data-video=${videoID}]`)
    this.video = video
    
    if(trigger.hasAttribute('data-open-video-overlay')) {
      let videoOverlay = document.querySelector(`[data-video-overlay=${videoID}]`)
      
      this.isOverlayOpen = true
      this.videoOverlay = videoOverlay
      
      videoOverlay.classList.add('open')
      this.scroll.stop()

      this.tl.to(videoOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "zoom",
      })

      this.tl.to(this.elements.closeBtn, { opacity: 1, duration: 0.3, ease: "power2.out" })

      this.tl.to(video, { opacity: 1, duration: 0.4, ease: "power2.out", 
        onComplete: () => {
          video.play()
        } 
      }, "+=0.4")

    } else {
      this.tl.to(trigger, { opacity: 0, duration: 0.4, ease: "power2.out" })
      video.play()
      
      video.addEventListener('ended', () => {
        this.closePlayer()
        video.load()
        this.tl.to(trigger, { opacity: 1, duration: 0.4, ease: "power2.out" })
      })
    } 
  }
  
  closePlayer() {
    this.video.pause()
    
    if(this.isOverlayOpen) {
      this.tl.to(this.videoOverlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",  
        duration: 0.4,
        ease: "power2.out",
  
        onComplete: () => {
          this.videoOverlay.classList.remove('open')
          this.video.currentTime = 0
          this.tl.to(this.elements.closeBtn, { opacity: 0, duration: 0.001 })
          this.tl.to(this.video, { opacity: 0, duration: 0.001, ease: "power2.out" })
          this.scroll.start()
          this.isOverlayOpen = false
        }
      })
    } else {
      this.video.currentTime = 0
    }
  }
}
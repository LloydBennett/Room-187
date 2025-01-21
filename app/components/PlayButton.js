import Components from 'classes/Components'
import gsap from 'gsap'

export default class PlayButton extends Components {
  constructor() {
    super({
      elements: {
        trigger: '[data-play]',
        videoBg: '[data-play-bg]'
      }
    })

    this.tl = gsap.timeline()
    this.addEventListeners()
  }

  create() {
    super.create()
  }

  addEventListeners() {
    this.elements.trigger.addEventListener('click', () => {
      let videoID = this.elements.trigger.getAttribute('data-play')
      let video = document.querySelector(`[data-video=${videoID}]`)
      
      if(this.elements.trigger.hasAttribute('data-open-video-overlay')) {
        let videoOverlay = document.querySelector(`[data-video-overlay=${videoID}]`)
        
        this.tl.to(videoOverlay, { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: 'power2.out', 
          onComplete: () => {
            video.play()
          }
        })
      } else {
        video.play()
      } 
    })
  }
}
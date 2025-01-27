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
  }

  playVideo(trigger) {
    let videoID = trigger.getAttribute('data-play')
    let video = document.querySelector(`[data-video=${videoID}]`)
    
    console.log(video)
    if(trigger.hasAttribute('data-open-video-overlay')) {
      let videoOverlay = document.querySelector(`[data-video-overlay=${videoID}]`)
      
      this.tl.to(videoOverlay, { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: 'power2.out', 
        onComplete: () => {
          video.play()
        }
      })
    } else {
      video.play()
    } 
  }
}
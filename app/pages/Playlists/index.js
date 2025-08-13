import Page from 'classes/Page'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

export default class Playlists extends Page {
  constructor() {
    super({
      id: 'playlists',
      elements: {
        trackListItems: '[data-track-list-item]'
      }
    })
    
    gsap.registerPlugin(ScrollTrigger, CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.init()
  }

  addEventListener() {
    if(!this.elements.trackListItems) return

    if (Array.isArray(this.elements.trackListItems) || (typeof this.elements.trackListItems === 'object')) {
      this.elements.trackListItems.forEach(element => {
        let bg = element.querySelector('[data-track-list-bg]')
        let albumImg = element.querySelector('[data-track-list-img]')

        element.addEventListener('mouseenter', (e) => {
          element.classList.add('active');



          gsap.to(bg, 
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
            duration: 0.3, 
            ease: "zoom"
          })

          gsap.to(albumImg, 
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
            duration: 0.3, 
            ease: "zoom"
          })

        })

        element.addEventListener('mouseleave', (e) => {
          element.classList.remove('active');
          gsap.to(bg, 
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", 
            duration: 0.3, 
            ease: "zoom"
          })

          gsap.to(albumImg, 
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", 
            duration: 0.3, 
            ease: "zoom"
          })

        })
      });
      
    } else {
      this.elements.galleryItems.addEventListener('click', (e) => {
        this.openSlideShow(e)
      })
    }


  }

  init() {
    this.addEventListener()
  }
  
  
}

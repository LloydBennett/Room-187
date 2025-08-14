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

    this.clickEfx = new Audio('/click.mp3');
    console.log(this.clickEfx)

    this.init()
  }

  addEventListener() {
    if (!this.elements.trackListItems) return;

    // Always turn into an array so .forEach works
    const trackListItems = this.elements.trackListItems.length !== undefined
      ? Array.from(this.elements.trackListItems) // NodeList or HTMLCollection
      : [this.elements.trackListItems];          // Single element

    trackListItems.forEach(element => {
      let bg = element.querySelector('[data-track-list-bg]');
      let albumImg = element.querySelector('[data-track-list-img]');

      element.addEventListener('mouseenter', () => {
        element.classList.add('active');
        this.clickEfx.currentTime = 0;
        this.clickEfx.play();

        gsap.to(bg, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "zoom"
        });

        gsap.to(albumImg, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "zoom"
        });
      });

      element.addEventListener('mouseleave', () => {
        element.classList.remove('active');
        gsap.to(bg, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "zoom"
        });

        gsap.to(albumImg, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 0.3,
          ease: "zoom"
        });
      });
    });
  }


  init() {
    this.addEventListener()
  }
  
  
}

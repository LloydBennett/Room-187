import Components from 'classes/Components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

export default class TextSplit extends Components {
  constructor() {
    super({
      elements: {
        textOnScroll: '[data-split-text="scroll"]'
      }
    })
    
    gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.init()
  }
  
  init() { 
    if (!this.elements.textOnScroll) {
      console.warn('No text elements found in the DOM.');
      return;
    }

    this.splitText(this.elements.textOnScroll)
  }

  splitText(text) {
    if (!text || text.length === 0) {
      console.warn('mainTitles not found or empty:', this.elements.textOnScroll)
      return
    }

    document.fonts.ready.then(() => {
      const elements = Array.isArray(text) || text instanceof NodeList
      ? Array.from(text)
      : [text]

      elements.forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          lineClass: "line",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            return TextSplit.scrollAnimateText(el, self.lines)
          }
        })
      })
    })
  }
 
  static scrollAnimateText(text, lines) {
    gsap.fromTo(lines,
      { y: "100%" },
      {
        y: 0,
        duration: 0.8,
        ease: "zoom",
        stagger: 0.05,
        scrollTrigger: {
          trigger: text,
          start: '50% bottom',
          markers: false,
          scrub: false
        }
      }
    )
  }
}

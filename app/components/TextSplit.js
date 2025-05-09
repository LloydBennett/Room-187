import Components from 'classes/Components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

export default class TextSplit extends Components {
  constructor() {
    super({
      elements: {
        text: '[data-split-text]',
        textOnScroll: '[data-split-text="scroll"]'
      }
    })
    
    gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.init()
  }
  
  init() { 
    if (!this.elements.text) {
      console.warn('No text elements found in the DOM.');
      return;
    }

    const splitTextEmpty = Array.from(this.elements.text).filter(el => {
      const val = el.getAttribute('data-split-text');
      return val === null || val === '';
    });

    this.splitText(splitTextEmpty, false)
    this.splitText(this.elements.textOnScroll, true)
  }

  splitText(text, showOnScroll) {
    let split = SplitText.create(text, 
      { 
        type: "words",
        wordsClass: "inline-block word",
        mask: "words"
      }
    )

    if(showOnScroll) {
      this.scrollAnimateText(split)
    }
  }
 
  scrollAnimateText(text) {
    gsap.fromTo(text.words,
      { y: "100%" },
      {
        y: 0,
        scrollTrigger: {
          trigger: text.words,
          start: '50% bottom',
          scrub: false,
          markers: false
        },
        duration: 0.8, 
        ease: "zoom", 
        stagger: 0.02
      }
    )
  }
}

import Components from 'classes/Components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

export default class SplitText extends Components {
  constructor() {
    super({
      elements: {
        text: '[data-split-text]'
      }
    })
    
    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(CustomEase)
    CustomEase.create("zoom", "0.71, 0, 0.06, 1")

    this.splitTextCache = []
    this.init()
  }
  
  addEventListeners(textObj) {
    if (!textObj || textObj.length === 0) {
      console.warn('textObj is empty or undefined. Event listeners will not be added.')
      return;
    }

    let resizeTimeOut

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeOut)
      resizeTimeOut = setTimeout(() => {
        this.splitText(textObj)
      }, 200)
    })
  }
  init() {
    let textContent = [],
        text = this.elements.text
    
    if (!text || text.length === 0) {
      console.warn('No text elements found in the DOM.');
      return;
    }

    if(text instanceof window.NodeList && text.length) {
      text.forEach((t) => {
        textContent.push({ text: t.innerText, htmlElem: t })
      })
    } else {
      textContent.push({ text: text.innerText, htmlElem: text })
    }
    this.textContent = textContent
    this.splitText(this.textContent)
  }

  splitText(text) {
    // Error handling: Ensure text is valid and not empty
    if (!text || text.length === 0) {
      console.warn('No valid text to split.')
      return;
    }

    text.forEach((t) => {
      if (!t.htmlElem || !t.text) {
        console.warn('HTML element or text content missing. Skipping this item.')
        return
      }

      t.htmlElem.innerHTML = t.text.split(/\s+/).map((word) => `<span>${word}</span>`).join(' ')
      
      this.checkCache(t.htmlElem, t)
      this.displayLines(t.htmlElem)
      //this.checkTextType(t.htmlElem, t)
    })
  }
  checkCache(text, obj) {
    if(this.splitTextCache.indexOf(text) === -1) {
      this.splitTextCache.push(text)
      this.addEventListeners([obj])
    } else {
      return
    }
  }

  isTypeScroll(text) {
    if (!text) {
      console.warn('Invalid text or object passed to checkTextType.');
      return
    }

    let attr = text.getAttribute('data-split-text')

    return attr === "scroll" ? true : false
  }

  getLines(text) {
    let lines = [];
    let line
    let words = text.children
    let lastTop;

    // Error handling: Ensure text contains children
    if (!text || !text.children || text.children.length === 0) {
      console.warn('No child elements found in text.');
      return lines;
    }

    for (var i = 0; i < words.length; i++) {
      let word = words[i];
      if (word.offsetTop != lastTop) {
        lastTop = word.offsetTop;
        line = [];
        lines.push(line);
      }
      line.push(word);
    }
    return lines;
  }

  displayLines(text) {
    let lines = this.getLines(text);
    let isScrollDependant = this.isTypeScroll(text)
    let dataAttr = isScrollDependant? "data-text-scroll" : "data-text-reveal"

    if (!lines || lines.length === 0) {
      console.warn('No lines generated from text.');
      return;
    }
    
    //DocumentFragment to batch DOM manipulations
    let fragment = document.createDocumentFragment()

    lines.forEach((lineWords, i) => {
      let lineSpan = document.createElement('span')
      lineSpan.classList.add('inline-block', 'no-overflow-y')
      i = i + 1;
      
      lineWords.forEach((word, index) => {
        let wordIndex = index + 1
        
        word.classList.add('inline-block')
        word.setAttribute(dataAttr, i)

        if(wordIndex !== lineWords.length) {
          word.innerHTML += "&nbsp;"
        }
        
        lineSpan.appendChild(word)
      })
      fragment.appendChild(lineSpan)
    })

    text.appendChild(fragment)
    if(isScrollDependant) this.scrollAnimateText(text)
  }

  scrollAnimateText(text) {
    if (!text || !text.querySelectorAll) {
      console.warn('Invalid text element passed to scrollAnimateText.')
      return
    }

    let spans = text.querySelectorAll('[data-text-scroll]')
    
    if (!spans || spans.length === 0) {
      console.warn('No spans found in the text for animation.')
      return
    }

    gsap.from(spans, {
      scrollTrigger: {
        trigger: text,
        start: 'top 50%',
        scrub: false,
        markers: true
      },
      y: "100%", 
      duration: 0.8, 
      ease: "zoom", 
      stagger: (i, target) => { return 0.05 * target.dataset.textScroll }
    })
  }
}

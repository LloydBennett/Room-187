import Components from 'classes/Components'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default class SplitText extends Components {
  constructor() {
    super({
      elements: {
        text: '[data-split-text]'
      }
    })
    gsap.registerPlugin(ScrollTrigger)
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
      this.checkTextType(t.htmlElem, t)
    })
  }

  checkTextType(text, obj) {
    if (!text || !obj) {
      console.warn('Invalid text or object passed to checkTextType.');
      return
    }

    let attr = text.getAttribute('data-split-text')

    if(attr === "line-break") {
      this.displayLines(text)

      if(this.splitTextCache.indexOf(text) === -1) {
        this.splitTextCache.push(text)
        this.addEventListeners([obj])
      }
    } else {
      this.scrollAnimateText(text)
    }
  }

  getLines(text) {
    let lines = [];
    let line = []
    let words = text.children
    let lastTop = null

    // Error handling: Ensure text contains children
    if (!words || words.length === 0) {
      console.warn('No child elements found in text.');
      return lines;
    }

    for (var i = 0; i < words.length; i++) {
      let word = words[i]
      let currentTop = word.getBoundingClientRect().top

      if (lastTop === null || currentTop > lastTop) {
        if (line.length > 0) {
          lines.push(line);
        }
        line = [];
      }

      line.push(word);
      lastTop = currentTop;
    }

    // Push the last line
    if (line.length > 0) {
      lines.push(line);
    }

    return lines;
  }

  displayLines(text) {
    let lines = this.getLines(text);

    if (!lines || lines.length === 0) {
      console.warn('No lines generated from text.');
      return;
    }

    // Clear the text container before appending new spans
    text.innerHTML = '';
    
    //DocumentFragment to batch DOM manipulations
    let fragment = document.createDocumentFragment()

    lines.forEach((lineWords, i) => {
      let lineWrapper = document.createElement('span')
      lineWrapper.classList.add('inline-block', 'no-overflow-y', 'white-space')
      // lineWrapper.setAttribute('data-text-reveal', i + 1)
      
      lineWords.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span')
        wordSpan.classList.add('inline-block')
        wordSpan.innerHTML = word.innerHTML
        wordSpan.setAttribute('data-text-reveal', i + 1)

        if (wordIndex < lineWords.length - 1) {
          wordSpan.innerHTML += '&nbsp;'
        }
        
        lineWrapper.appendChild(wordSpan)
      })
      
      fragment.appendChild(lineWrapper)
    })

    text.appendChild(fragment)
  }

  scrollAnimateText(text) {
    if (!text || !text.querySelectorAll) {
      console.warn('Invalid text element passed to scrollAnimateText.')
      return
    }

    let spans = text.querySelectorAll('span')
    
    if (!spans || spans.length === 0) {
      console.warn('No spans found in the text for animation.')
      return
    }

    gsap.from(spans, {
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        scrub: true,
        markers: false
      },
      opacity: 0.2,
      stagger: { amount: 1.2 },
      ease: 'power2.out'
    })
  }
}
import Components from 'classes/Components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default class Stats extends Components {
  constructor() {
    super({
      elements: {
        stats: '[data-stats]'
      }
    })
  
    gsap.registerPlugin(ScrollTrigger)
    this.setUpScrollTrigger()
  }

  setUpScrollTrigger() {
    if(this.elements.stats !== null) {
      if (Array.isArray(this.elements.stats) || (typeof this.elements.stats === 'object')) {
        this.elements.stats.forEach(stats => {
          ScrollTrigger.create({
            trigger: stats,
            start: "top bottom",
            onEnter: () => this.count(stats),
            markers: false
          })
        })
      }
      else {
        ScrollTrigger.create({
          trigger: this.elements.stats,
          start: "top bottom",
          onEnter: () => this.count(this.elements.stats),
          markers: false
        })
      }
    } else {
      return
    }
  }

  count(stats) {
    let interval = 2000
    let n = 1
    let statsNum = parseInt(stats.getAttribute('data-stats'))
    let startVal = statsNum > 1000? (statsNum - 500) : 0
    let endVal = statsNum
    let duration = Math.floor(interval / endVal)

    let counter = setInterval(()=> {
      startVal += n
      stats.textContent = new Intl.NumberFormat().format(startVal)

      if(startVal === endVal) {
        clearInterval(counter)
      }
    }, duration)
  }
}
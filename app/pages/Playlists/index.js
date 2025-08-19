import Page from 'classes/Page'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'
import { scroll } from 'utils/LenisScroll'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export default class Playlists extends Page {
  constructor() {
    super({
      id: 'playlists',
      elements: {
        trackList: '[data-track-list]',
        trackListItems: '[data-track-list-item]',
        playlistGroup: '[data-playlist-group]',
        playlistCards: '[data-playlist-card]',
        pageTrigger: '[data-playlist-trigger]',
        mainTitle: '[data-main-title]',
        playlistCardMeta: '[data-playlist-meta]', 
        hero: '[data-hero]'
      }
    })

    gsap.registerPlugin(ScrollTrigger, CustomEase, Flip, ScrollToPlugin)
    CustomEase.create('zoom', '0.71, 0, 0.06, 1')

    this.clickEfx = new Audio('/click.mp3')
    this.scroll = scroll

    this.init()
  }l

  lockScroll(lock = true) {
    document.body.style.overflow = lock ? 'hidden' : ''
    lock? this.scroll.stop() : this.scroll.start()
  }

  beforeNavigate(linkEl) {
    const gridEl = this.elements.playlistGroup
    const cards = Array.from(this.elements.playlistCards || [])
    const mainTitleSection = this.elements.hero
    const meta = this.elements.playlistCardMeta
    const mainTitleMask = this.elements.mainTitle.querySelectorAll('div > div')

    if (!gridEl || !cards.length || !linkEl) return Promise.resolve()

    console.log(mainTitleMask)  

    return new Promise((resolve) => {
      let tl = gsap.timeline()
      this.lockScroll(true)

      tl.to(meta, { opacity: 0, duration: 0.4, ease: "power2.out"})
      
      tl.to(window, {
        scrollTo: { y: 0 },
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(gridEl, { height: Math.max(gridEl.offsetHeight, window.innerHeight) })
        }
      })

      tl.to(mainTitleMask, 
        { 
          yPercent: 100,
          duration: 0.6,
          ease: 'zoom',
          onComplete: () => {
            if (mainTitleSection) mainTitleSection.remove()
            
            const state = Flip.getState(cards, { absolute: true })

            gridEl.classList.add('playlist-group--row')

            Flip.from(state, {
              duration: 0.6,
              ease: 'zoom',
              absolute: true,
              onComplete: () => {
                resolve()
              }
            }) 
          }
        }, 
      '-=0.2')
    })
  }

  async handleNavigation(url, { replaceState = false } = {}) {
    try {
      const res = await fetch(url)
      const html = await res.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      // Inject hero section
      const newHero = doc.querySelector('[data-hero]')
      if (newHero) {
        this.elements.playlistGroup.insertAdjacentElement('afterend', newHero)
      }

      // Inject track list section
      const newTrackListSection = doc.querySelector('[data-playlist-tracks]')
      if (newTrackListSection) {
        newHero.insertAdjacentElement('afterend', newTrackListSection)
      }

      // Refresh element references
      this.elements.trackListItems = document.querySelectorAll('[data-track-list-item]')
      this.elements.playlistCards = document.querySelectorAll('[data-playlist-card]')
      this.elements.pageTrigger = document.querySelectorAll('[data-playlist-trigger]')
      this.elements.mainTitle = document.querySelector('[data-main-title]')

      this.addHoverListeners()
      this.playListCardListeners()

      if (replaceState) {
        history.replaceState({}, '', url)
      } else {
        history.pushState({}, '', url)
      }

      // Run after navigation animations
      this.afterNavigateAnimations()

    } catch (err) {
      console.error('Playlist navigation error:', err)
    }
  }

  afterNavigateAnimations() {
    const splitTextEls = document.querySelectorAll('[data-split-text]')
    splitTextEls.forEach(el => {
      const text = el.textContent
      el.innerHTML = text.split('').map(ch => `<span>${ch}</span>`).join('')
    })

    // Animate text in
    gsap.fromTo(splitTextEls, 
      { yPercent: -100 }, 
      { yPercent: 0, duration: 0.5, ease: 'power2.out', stagger: 0.02 }
    )

    // Delay then fade in track items
    if (this.elements.trackListItems) {
      gsap.fromTo(this.elements.trackListItems,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, delay: 0.2 }
      )
    }

    // Unlock scroll after animations
    gsap.delayedCall(1.2, () => this.lockScroll(false))
  }

  playListCardListeners() {
    const cards = Array.from(document.querySelectorAll('[data-playlist-trigger]') || [])

    cards.forEach(card => {
      card.addEventListener('click', async (e) => {
        e.preventDefault()
        await this.beforeNavigate(card)
        const url = card.href
        //this.handleNavigation(url)
      })
    })
  }

  addHoverListeners() {
    if (!this.elements.trackListItems) return
    const items = this.elements.trackListItems.length !== undefined
      ? Array.from(this.elements.trackListItems)
      : [this.elements.trackListItems]

    items.forEach(element => {
      let bg = element.querySelector('[data-track-list-bg]')
      let albumImg = element.querySelector('[data-track-list-img]')

      element.addEventListener('mouseenter', () => {
        element.classList.add('active')
        this.clickEfx.currentTime = 0
        this.clickEfx.play()
        gsap.to(bg, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.3, ease: 'zoom' })
        gsap.to(albumImg, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.3, ease: 'zoom' })
      })

      element.addEventListener('mouseleave', () => {
        element.classList.remove('active')
        gsap.to(bg, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', duration: 0.3, ease: 'zoom' })
        gsap.to(albumImg, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', duration: 0.3, ease: 'zoom' })
      })
    })
  }

  init() {
    this.addHoverListeners()
    this.playListCardListeners()
  }
}
import Page from 'classes/Page'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'

export default class Playlists extends Page {
  constructor() {
    super({
      id: 'playlists',
      elements: {
        trackList: '[data-track-list]',
        trackListItems: '[data-track-list-item]',
        playlistGroup: '[data-playlist-group]',
        playlistCards: '[data-playlist-card]',
        pageTrigger: '[data-playlist-trigger]'
      }
    })

    gsap.registerPlugin(ScrollTrigger, CustomEase, Flip)
    CustomEase.create('zoom', '0.71, 0, 0.06, 1')

    this.clickEfx = new Audio('/click.mp3')

    this.init()
  }

  // morph grid → row
  beforeNavigate(linkEl) {
    const gridEl = this.elements.playlistGroup
    const cards = Array.from(this.elements.playlistCards || [])

    if (!gridEl || !cards.length) return Promise.resolve()
    if (gridEl.classList.contains('playlist-group--row')) return Promise.resolve()
    if (!linkEl) return Promise.resolve()

    return new Promise((resolve) => {
      const state = Flip.getState(cards, { props: 'width,height' })
      gsap.set(gridEl, { height: gridEl.offsetHeight })

      gridEl.prepend(linkEl)
      gridEl.classList.add('playlist-group--row')

      Flip.from(state, {
        duration: 0.6,
        ease: 'zoom',
        absolute: true,
        stagger: 0.02,
        // onStart: () => {
        //   gsap.to(linkEl, { scale: 1.03, duration: 0.3, ease: 'power2.out' })
        // },
        onComplete: () => {
          gsap.set(gridEl, { clearProps: 'height' })
          //gsap.to(linkEl, { scale: 1, duration: 0.2 })
          resolve()
        }
      })
    })
  }

  // lightweight navigation (playlist detail view)
  async handleNavigation(url, { replaceState = false } = {}) {
    try {
      const res = await fetch(url)
      const html = await res.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      const newTrackList = doc.querySelector('[data-track-list]')
      const newPlaylistGroup = doc.querySelector('[data-playlist-group]')

      if (newTrackList && this.elements.trackList) {
        this.elements.trackList.innerHTML = newTrackList.innerHTML
      }
      if (newPlaylistGroup && this.elements.playlistGroup) {
        this.elements.playlistGroup.innerHTML = newPlaylistGroup.innerHTML
      }

      // refresh element references (important!)
      this.elements.trackListItems = document.querySelectorAll('[data-track-list-item]')
      this.elements.playlistCards = document.querySelectorAll('[data-playlist-card]')
      this.elements.pageTrigger = document.querySelectorAll('[data-playlist-trigger]')

      this.addHoverListeners()
      this.playListCardListeners()

      if (replaceState) {
        history.replaceState({}, '', url)
      } else {
        history.pushState({}, '', url)
      }
    } catch (err) {
      console.error('Playlist navigation error:', err)
    }
  }

  playListCardListeners() {
    const cards = Array.from(document.querySelectorAll('[data-playlist-trigger]') || [])

    cards.forEach(card => {
      card.addEventListener('click', async (e) => {
        e.preventDefault()
        await this.beforeNavigate(card)
        const url = card.href
        this.handleNavigation(url)
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
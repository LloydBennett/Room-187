import Page from 'classes/Page'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'
import { scroll } from 'utils/LenisScroll'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'

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
        hero: '[data-hero]',
        container: '[data-inner-content]',
        pageContainer: '[data-page-view-type]'
      }
    })

    gsap.registerPlugin(ScrollTrigger, CustomEase, Flip, ScrollToPlugin, SplitText)
    CustomEase.create('zoom', '0.71, 0, 0.06, 1')

    this.clickEfx = new Audio('/click.mp3')
    this.scroll = scroll
    this.tl = gsap.timeline()

    this.init()
  }

  loadAnimations() {
    if (this.viewPageType === "grid") {
      this.animateCardsInView()
      this.scrollCardAnimations()
    } else {
      gsap.to(this.elements.trackListItems,
        { 
          opacity: 1,
          pointerEvents: "auto", 
          duration: 0.4, 
          ease: "power2.out", 
          stagger: 0.05 
        }
      )
    }
  }

  updateIndicator(targetEl) {
    let playlistScroll = this.elements.playlistGroup
    if (!playlistScroll) return
    
    const scrollRect = playlistScroll.getBoundingClientRect()
    const targetRect = targetEl.getBoundingClientRect()

    // How far the card is from the left edge of the scroll container
    const deltaX = targetRect.left - scrollRect.left
    const targetX = -deltaX
    
    gsap.to(playlistScroll, {
      x: targetX,
      duration: 0.4,
      ease: "power3.out"
    })
  }

  scrollCardAnimations() {
    const cards = this.elements.playlistCards;
    if (!cards || !cards.length) return;

    // only hide cards that have NOT been animated
    gsap.set(cards, { opacity: (i, el) => el.dataset.animated === "true" ? 1 : 0 });
    //gsap.set(cards, { opacity: 0 }); // start all cards invisible

    const animateBatch = (batch) => {
      gsap.fromTo(batch,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          onStart: () => {
            batch.forEach(card => card.dataset.animated = "true"); // mark as animated
          }
        }
      );
    };

    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        batch = batch.filter(card => card.dataset.animated !== "true");
        if (batch.length) animateBatch(batch);
      },
      start: "top 80%",
    });

    // Refresh ScrollTrigger on resize to prevent glitches
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
  }

  animateCardsInView() {
    const cards = this.elements.playlistCards;
    if (!cards || !cards.length || this.viewPageType !== "grid" ) return;

    const inViewCards = Array.from(cards).filter(card => {
      const rect = card.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.95 && card.dataset.animated !== "true";
    });

    if (!inViewCards.length) return;

    gsap.fromTo(inViewCards,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
        onStart: () => inViewCards.forEach(card => card.dataset.animated = "true")
      }
    );
  }

  lockScroll(lock = true) {
    document.body.style.overflow = lock ? 'hidden' : ''
    lock? this.scroll.stop() : this.scroll.start()
  }

  detailToDetailTransition(card) {
    return new Promise((resolve) => {
      this.updateIndicator(card)
      const splitText = document.querySelectorAll('[data-split-text]')
      const trackListSection = this.elements.trackList

      console.log(trackListSection)

      splitText.forEach((el, i) => {
        let divs = el.querySelectorAll('div > div')
        this.tl.to(divs, { 
          yPercent: 100, 
          duration: 0.6, 
          ease: 'zoom'
        }, 'group')

        this.tl.add(() => el.remove(), 'group+=0.6')
      })

      this.tl.to(trackListSection, { 
        opacity: 0, 
        duration: 0.4, 
        ease: 'power2.out', 
        onComplete: () => {
          trackListSection.remove();
        }
      }, 'group')

      this.tl.add(resolve, '>')
    })

  }

  gridToDetailTransition() {
    const gridEl = this.elements.playlistGroup
    const cards = Array.from(this.elements.playlistCards || [])
    const mainTitleSection = this.elements.hero
    const meta = this.elements.playlistCardMeta
    const mainTitleMask = this.elements.mainTitle.querySelectorAll('div > div')

    if (!gridEl || !cards.length ) return Promise.resolve() 

    return new Promise((resolve) => {
      this.lockScroll(true)

      cards.forEach(el => {
        if (el.dataset.animated !== "true") {
          gsap.set(el, { opacity: 1 })
        }
      })

      this.tl.to(meta, { opacity: 0, duration: 0.4, ease: "power2.out"})
      
      this.tl.to(window, {
        scrollTo: { y: 0 },
        duration: 0.8,
        ease: 'power2.out'
      })

      this.tl.to(mainTitleMask, 
        { 
          yPercent: 100,
          duration: 0.6,
          ease: 'zoom',
          onComplete: () => {
            if (mainTitleSection) mainTitleSection.remove()

            this.elements.container.classList.remove('hero--l-p-t')
            this.elements.container.classList.add('hero--s-p-t')
            
            const state = Flip.getState(cards, { absolute: true })

            gridEl.classList.add('playlist-group--row')

            Flip.from(state, {
              duration: 0.6,
              ease: 'zoom',
              absolute: true
            }) 
          }
        }, 
      '-=0.2')
      
      this.tl.add(() => {
        resolve()
      }, '-=0.2')
    })
  }

  detailToGridTransition() {
    const splitText = document.querySelectorAll('[data-split-text]')
    const cards = Array.from(this.elements.playlistCards || [])
    const trackListSection = this.elements.trackList
    const hero = this.elements.hero
    const gridEl = this.elements.playlistGroup

    if (!cards.length || !gridEl) return Promise.resolve()

    return new Promise((resolve) => {
      this.lockScroll(true)
    
      const state = Flip.getState(cards, { absolute: true })

      splitText.forEach((el, i) => {
        let divs = el.querySelectorAll('div > div')
        this.tl.to(divs, { 
          yPercent: 100, 
          duration: 0.6, 
          ease: 'zoom'
        }, 'group')
      })

      this.tl.to(trackListSection, { 
        opacity: 0, 
        duration: 0.4, 
        ease: 'power2.out', 
        onComplete: () => {
          trackListSection.remove();
        }
      }, 'group')

      this.tl.add(() => {
        hero.remove()
        gridEl.classList.remove('playlist-group--row')

        Flip.from(state, {
          duration: 0.6,
          ease: 'zoom',
          absolute: true
        })
      }, )

      this.tl.add(() => {
        return Promise.resolve()
      })
    })

  }

  async beforeNavigate(card, url) {
    this.tl.clear();
    const currentType = this.viewPageType; // "grid" or "detail"
    const pathSegments = new URL(url, location.origin).pathname.split('/').filter(Boolean);
    const nextType = pathSegments.length === 1 ? 'grid' : 'detail';

    if (currentType === "grid" && nextType === "detail") {
      // Grid → Detail
      await this.gridToDetailTransition(card)
    } else if (currentType === "detail" && nextType === "detail") {
      // Detail → Detail
      await this.detailToDetailTransition(card)
    } else if (currentType === "detail" && nextType === "grid") {
      // Detail → Grid (e.g., back button)
      await this.detailToGridTransition()
    }
  }


  async handleNavigation(url, { replaceState = false } = {}) {
    try {
      // Determine page types
      const currentType = this.viewPageType; // current page type
      const pathSegments = new URL(url, location.origin).pathname.split('/').filter(Boolean);
      const nextType = pathSegments.length === 1 ? 'grid' : 'detail'; // next page type based on URL

      const res = await fetch(url)
      const html = await res.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const container = this.elements.container
      const pageWrapper = container.querySelector('[data-playlist-page-wrapper]')
      const newHero = doc.querySelector('[data-hero]')
      const mainTitle = doc.querySelector('[data-main-title]')
      const currentMeta = document.querySelector('.playlist-detail-header__meta') 
      const newMetaText = doc.querySelectorAll('.playlist-detail-header__meta [data-split-text]')
      const newTrackListSection = doc.querySelector('[data-track-list]')

      if (currentType === "grid" && nextType === "detail") {

        if (newHero) {
          gsap.set(newHero, { opacity: 0, pointerEvents: "none" })
          pageWrapper.appendChild(newHero)
        }

      } else if (currentType === "detail" && nextType === "detail") {
        const heroContainer = document.querySelector('[data-hero] .container')
      
        gsap.set(mainTitle, { opacity: 0, pointerEvents: "none" })

        heroContainer.prepend(mainTitle)

        newMetaText.forEach(el => {
          gsap.set(el, { opacity: 0, pointerEvents: "none" })
          currentMeta.appendChild(el)
        })

        // this bit is what i need for grid to detail and detail to detail 

      } else if (currentType === "detail" && nextType === "grid") {
        gsap.set(newHero, { opacity: 0 })
        pageWrapper.prepend(newHero)
      }

      if (newTrackListSection) {
        const newItems = newTrackListSection.querySelectorAll('[data-track-list-item]')
        
        gsap.set(newItems, { opacity: 0, visibility: "hidden" })

        gsap.set(newTrackListSection, {
          opacity: 0,
          pointerEvents: "none",
          visibility: "hidden"
        })

        pageWrapper.appendChild(newTrackListSection)
      }

      // Refresh element references
      this.elements.trackListItems = document.querySelectorAll('[data-track-list-item]')
      this.elements.playlistCards = document.querySelectorAll('[data-playlist-card]')
      this.elements.pageTrigger = document.querySelectorAll('[data-playlist-trigger]')
      this.elements.mainTitle = document.querySelector('[data-main-title]')
      this.elements.trackList = document.querySelector('[data-track-list]')

      this.addHoverListeners()
      this.playListCardListeners()
      this.updatePageViewType(nextType)

      if (replaceState) {
        history.replaceState({}, '', url)
      } else {
        history.pushState({}, '', url)
      }

      return true

    } catch (err) {
      console.error('Playlist navigation error:', err)
      return false
    }
  }

  afterNavigateAnimations() {
    return new Promise((resolve) => {
      const currentType = this.viewPageType; // current page type
      
      const hero = document.querySelector('[data-hero]')
      const trackSection = this.elements.trackList
      const pTitles = hero.querySelectorAll('[data-split-text]')
      const items = Array.from(this.elements.trackListItems);
    
      let titlesArr = []

      this.tl.to(hero, {
        opacity: 1,
        clearProps: "pointerEvents"
      })

      pTitles.forEach((el) => {
        const split = SplitText.create(el, 
        {
          type: "lines",
          lineClass: "line",
          mask: "lines",
          autoSplit: true,
        })
        gsap.set(el, { opacity: 1, clearProps: "pointerEvents" })

        titlesArr.push(split.lines)
      })
      
      titlesArr.forEach((text) => {
        this.tl.fromTo(text,
          { yPercent: 100 },
          {
            yPercent: 0, 
            duration: 0.8, 
            ease: "zoom",
            stagger: 0.05
          }
        ,'titles -=0.2')
      })
      
      if (currentType === "detail") {
        trackSection.style.visibility = "visible"
        trackSection.style.opacity = 1
        trackSection.style.pointerEvents = "auto"

        items.forEach(i => i.style.visibility = "visible")

        this.tl.add(() => {
          this.lockScroll(false)
          resolve()
        })
       
        this.tl.to(items,
        { 
          opacity: 1,
          pointerEvents: "auto", 
          duration: 0.4, 
          ease: "power2.out", 
          stagger: 0.05 
        }, "-=0.2")
        

      } else {
        this.tl.add(() => {
          this.lockScroll(false)
          resolve()
        })
      }
    })
  }

  updatePageViewType(nextType) {
    if (!nextType) return;

    this.elements.pageContainer.dataset.pageViewType = nextType

    if (nextType === "grid") {
      this.elements.container.classList.remove('hero--s-p-t')
      this.elements.container.classList.add('hero--l-p-t')

    } else if (nextType === "detail" ) {
      this.elements.container.classList.remove('hero--l-p-t')
      this.elements.container.classList.add('hero--s-p-t')
    }
  }

  get viewPageType() {
    let vPageType = this.elements.pageContainer.dataset.pageViewType
    return vPageType
  }

  playListCardListeners() {
    const cards = Array.from(document.querySelectorAll('[data-playlist-trigger]') || [])

    cards.forEach(card => {
      card.addEventListener('click', async (e) => {
        e.preventDefault()
        const url = card.href

        await this.beforeNavigate(card, url)

        if(await this.handleNavigation(url)) {
          await this.afterNavigateAnimations() // Run after navigation animations
        }
        
      })
    })
  }

  hideCards() {
    gsap.set(this.elements.playlistCards, { opacity: 0 })
  }

  hideTracks() {
    if(this.elements.trackListItems) {
      gsap.set(this.elements.trackListItems, { opacity: 0, pointerEvents: "none" })
    }
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
    this.hideCards()
    this.hideTracks()

    window.addEventListener('pageLoaded', (e) => {
      if (e.detail.template === 'playlists') {
        this.loadAnimations()
      }
    })

    window.addEventListener('popstate', async () => {
      const url = window.location.href;
      // call the same beforeNavigate logic, no card in this case
      await this.beforeNavigate(null, url);
      await this.handleNavigation(url, { replaceState: true });
      await this.afterNavigateAnimations();
    })
  }
}
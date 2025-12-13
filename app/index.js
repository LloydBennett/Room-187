import { scroll } from 'utils/LenisScroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Page from 'classes/Page'
import About from 'pages/About'
import Home from 'pages/Home'
import Gallery from 'pages/Gallery'
import Contact from './pages/Contact'
import Playlists from './pages/Playlists'
import Navigation from 'components/Navigation'
import TextSplit from 'components/TextSplit'
import VideoPlayer from './components/VideoPlayer'
import Stats from './components/Stats'
import Hero from './components/Hero'
import Tooltip from './components/tooltip'
import SubscriptionForm from './components/SubscriptionForm'
import Carousel from './components/Carousel'

class App {
  constructor() {
    this.lenisScroll = scroll
    this.isFirstVisit
    this.bootstrap()
    this.createNavigation()
  }

  setUpScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger)

     // Bail out if we're on mobile (dummy Lenis object)
    if (this.lenisScroll.__isDummy) {
      // Let ScrollTrigger use native scroll
      return;
    }
    
    this.lenisScroll.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenisScroll.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  createVideoPlayer() {
    this.videoPlayer = new VideoPlayer()
  }

  createStats() {
    this.stats = new Stats()
  }

  createHero() {
    this.hero = new Hero()
  }

  addSplitText() {
    this.textSplit = new TextSplit()
  }

  createPreloader() {
    this.preloader = new Preloader()
  }

  createTooltip() {
    this.tooltip = new Tooltip()
  }

  createNavigation() {
    this.navigation = new Navigation()
  }

  createContent() {
    this.content = document.querySelector('.main')
    this.template = this.content.getAttribute('data-page')
  }

  createSubscriptionForm() {
    this.subscriptionForm = new SubscriptionForm()
  }

  createCarousel() {
    this.Carousel = new Carousel()
  }

  async initPages() {
    const pageClasses = {
      home: Home,
      about: About,
      gallery: Gallery,
      contact: Contact,
      playlists: Playlists
    }

    const id = this.template
    const PageClass = pageClasses[id] || Page

    this.isFirstVisit = this.isFirstVisit === undefined

    this.page = new PageClass()

    await this.page.show(this.isFirstVisit)

    this.isFirstVisit = false

    window.dispatchEvent(new CustomEvent('pageLoaded', {
      detail: { page: this.page, template: this.template }
    }))
  }

  onPopState () {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  async onChange({ url, push = true }) {
    const animations = this.page && this.page.hide
  ? [this.page.hide()]
  : []
    
    const req = await window.fetch(url)

    if (this.navigation.isOpen) {
      new Promise(resolve => {
        setTimeout(() => {
          this.navigation.closeMenu()
          resolve()
        }, 300)
      })    
    }

    await Promise.all(animations)

    if(req.status === 200) {
      const html = await req.text()
      const div = document.createElement('div')

      if(push) {
        window.history.pushState({}, "", url)
      }
      
      div.innerHTML = html
      
      const title = document.querySelector('title')
      const newTitleText = div.querySelector('title').innerText
      title.innerHTML = newTitleText

      this.createNewPage(div)
      await this.init()
    }
    else {
      console.log('Error loading page!')
    }
  }

  createNewPage(div) {
    const body = document.querySelector('body')
    const divContent = div.querySelector('.main')
    const loaderHero = document.querySelector('[data-loader-hero]');
    const loaderImg = document.querySelector('[data-loader-image] [data-bg]')
    const newList = divContent.classList

    this.content.classList.remove(this.template)
    this.content.classList.add(...newList)
    
    this.template = divContent.getAttribute('data-page')
    this.content.setAttribute('data-page', this.template)

    if(this.template === "playlists") {
      this.content.setAttribute('data-page-view-type', 'grid')
    } else {
      this.content.removeAttribute('data-page-view-type')
    }

    if(this.template !== "error") {
      if(body.classList.contains('error')) {
        body.classList.remove('error')
      }
    } else {
      body.classList.add('error')
    }
    
    this.content.innerHTML = divContent.innerHTML

    let newImg = this.content.querySelector('[data-image-hero] [data-bg]')

    if(newImg) {
      let style = window.getComputedStyle(newImg);
      let backgroundImage = style.backgroundImage;
      let url = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      loaderImg.style.backgroundImage = `url("${url}")`

      if(loaderHero.classList.contains('hidden')) {
        loaderHero.classList.remove('hidden')
      }
    } 
    else {
      if(!loaderImg.classList.contains('hidden')) {
        loaderHero.classList.add('hidden')
      }
    }
  }
  addEventListeners () {
    window.addEventListener('popstate', this.onPopState.bind(this))
  }

  async bootstrap() {
    this.setUpScrollTrigger()
    await this.init()
  }

  addLinkListeners() {
    const links = document.querySelectorAll('[data-page-trigger]')
    
    links.forEach((l) => {
      l.onclick = event => {
        event.preventDefault()
        const href = l.href
        this.transitionType = l.dataset.pageTrigger
        if(href === window.location.href) return
        this.onChange({ url: href })
      }
    }); 
  }

  async init() {
    this.addSplitText()
    this.createContent()
    await this.initPages()
    this.addLinkListeners()
    this.createVideoPlayer()
    this.createStats()
    this.createHero()
    this.createTooltip()
    this.createSubscriptionForm()
    this.createCarousel()
  }
}

new App();
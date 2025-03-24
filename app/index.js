import { scroll } from 'utils/LenisScroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import About from 'pages/About'
import Home from 'pages/Home'
import Gallery from 'pages/Gallery'
import Navigation from 'components/Navigation'
import Preloader from 'components/Preloader'
import SplitText from 'components/SplitText'
import VideoPlayer from './components/VideoPlayer'
import Stats from './components/Stats'
import Hero from './components/Hero'

class App {
  constructor() {
    this.lenisScroll = scroll

    this.init()
    this.createNavigation()
    
    //this.createOverlay()
  }

  setUpScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger)
    
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
    this.splitText = new SplitText()
  }

  createPreloader() {
    this.preloader = new Preloader()
  }

  createNavigation() {
    this.navigation = new Navigation()
  }

  createContent() {
    this.content = document.querySelector('.main')
    this.template = this.content.getAttribute('data-page')
  }

  createPages(){
    this.pages = {
      home: new Home(),
      about: new About(),
      //gallery: new Gallery()
    }

    if(this.pages[this.template] !== undefined || null) {
      this.page = this.pages[this.template]
      //this.page.create()
      this.page.show()
    }
  }

  onPopState () {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  async onChange({ url, push = true }, transitionType) {
    await this.page.hide()
    const req = await window.fetch(url)

    if(req.status === 200) {
      const html = await req.text()
      const div = document.createElement('div')

      if (this.navigation.isOpen) {    
        this.navigation.closeMenu()
      }

      if(push) {
        window.history.pushState({}, "", url)
      }
      
      div.innerHTML = html
      
      const title = document.querySelector('title')
      const newTitleText = div.querySelector('title').innerText
      title.innerHTML = newTitleText
      const divContent = div.querySelector('.main')
      const loaderImg = document.querySelector('[data-loader-image] [data-bg]')
      const newList = divContent.classList

      this.content.classList.remove(this.template)
      this.content.classList.add(...newList)
      
      this.template = divContent.getAttribute('data-page')
      this.content.setAttribute('data-page', this.template)
      
      this.content.innerHTML = divContent.innerHTML
      let newImg = this.content.querySelector('[data-image-hero] [data-bg]')

      if(newImg) {
        let style = window.getComputedStyle(newImg);
        let backgroundImage = style.backgroundImage;
        let url = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        loaderImg.style.backgroundImage = `url("${url}")`
      }
      
      this.page = this.pages[this.template]

      this.init()
      // this.page.create()
      //this.page.show()
    }
    else {
      console.log('Error loading page!')
    }
  }
  addEventListeners () {
    window.addEventListener('popstate', this.onPopState.bind(this))
  }

  addLinkListeners() {
    const links = document.querySelectorAll('[data-page-trigger]')
    
    links.forEach((l) => {
      
      l.onclick = event => {
        event.preventDefault()
        const href = l.href
        const transitionType = l.dataset.pageTrigger


        this.onChange({ url: href })
      }
    }); 
  }
  init() {
    this.addSplitText()
    //this.createPreloader()
    this.createContent()
    this.createPages()
    this.addLinkListeners()
    //this.createNavigation()
    this.createVideoPlayer()
    this.createStats()
    this.createHero()
  }
}

new App();
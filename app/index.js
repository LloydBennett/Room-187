import About from 'pages/About'
import Home from 'pages/Home'
import Navigation from 'components/Navigation'
import Preloader from 'components/Preloader'
import SplitText from 'components/SplitText'
import PlayButton from './components/PlayButton'
import Overlay from './components/Overlay'

class App {
  constructor() {
    this.addSplitText()
    this.createPreloader()
    this.createContent()
    this.createPages()
    this.addLinkListeners()
    this.createNavigation()
    this.createPlayBtn()
    this.createOverlay()
  }

  createPlayBtn(){
    this.PlayBtn = new PlayButton()
  }

  createOverlay(){
    this.Overlay = new Overlay()
  }

  addSplitText() {
    this.SplitText = new SplitText()
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
      about: new About()
    }
    
    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()
  }

  onPopState () {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  async onChange({ url, push = true }) {
    await this.page.hide()
    const req = await window.fetch(url)
    
    if(req.status === 200) {
      const html = await req.text()
      const div = document.createElement('div')

      if(push) {
        window.history.pushState({}, "", url)
      }
      
      div.innerHTML = html

      const divContent = div.querySelector('.main')
      const newList = divContent.classList

      this.content.classList.remove(this.template)
      this.content.classList.add(...newList)
      
      this.template = divContent.getAttribute('data-page')
      this.content.setAttribute('data-page', this.template)

      this.content.innerHTML = divContent.innerHTML
      
      this.page = this.pages[this.template]
      this.page.create()
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

        this.onChange({ url: href })
      }
    });
    
  }
}

new App();
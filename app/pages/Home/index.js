import Page from 'classes/Page'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      elements: {
        heroContent: '[data-hero-content]',
        homeBody: '[data-home-body]',
        videoBlock: '[data-video-scroll]',
        video: '[data-video-scroll] [data-video]',
        polaroid: '[data-polaroid]',
        roomKeySection: '[data-room-key-section]',
        roomKeyHeader: '[data-room-key-header]',
        roomKeyTitle: '[data-room-key-titles]',
        roomKey: '[data-room-key]',
        progressBar: '[data-progress-bar]',
        progressHighlight: '[data-progress-highlight]',
        progressIndices: '[data-progress-index]',
        steps: '[data-progress-steps]'
      }
    })
    gsap.registerPlugin(ScrollTrigger)
    this.pinnedHeight = this.elements.roomKeySection.offsetHeight
    this.isProgressBarVisible = false
    this.currentActiveIndex = -1
    this.init()
  }
  init() {
    this.setUpScrollAnimations()
    console.log(this.elements.heroContent)
  }

  animateIndexHighlighter(newIndex) {
    if(newIndex !== this.currentActiveIndex) {
      let yPosCalc = newIndex * 100
      let yPos = `${yPosCalc}%`

      gsap.to(this.elements.progressHighlight, { y: yPos, duration: 0.4, ease: "power2.out" })
      this.currentActiveIndex = newIndex
    }
  }

  hideProgressBar() {
    gsap.to(this.elements.progressBar , {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    })

    this.isProgressBarVisible = false
    this.animateIndexHighlighter(-1)
  }

  showProgressBar() {
    gsap.to(this.elements.progressBar , {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    })

    this.isProgressBarVisible = true
    this.animateIndexHighlighter(0)
  }


  setUpScrollAnimations() {
    gsap.fromTo(this.elements.heroContent, 
      { opacity: 1 },
      {
        opacity: 0.1,
        scrollTrigger: {
          trigger: this.elements.heroContent,
          start: '70% center', // Start the animation when the top of the heroContent hits 90% of the viewport
          scrub: true,
          markers: false
        },
        ease: "power2.out",
      }
    )
    gsap.fromTo(this.elements.videoBlock, 
      { clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)"},
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scrollTrigger: {
          trigger: this.elements.videoBlock,
          start: '5% bottom', // Start the animation when the top of the heroContent hits 90% of the viewport
          scrub: true,
          markers: false
        },
        ease: "power2.out",
      }
    )
    gsap.fromTo(this.elements.video, 
      {
        scale: 1.5
      },
      {
        scale: 1,
        scrollTrigger: {
          trigger: this.elements.videoBlock,
          start: '5% bottom', // Start the animation when the top of the heroContent hits 90% of the viewport
          scrub: true,
          markers: false
        },
        ease: "power2.out",
      }
    )

    this.elements.polaroid.forEach((element, i) => {
      gsap.fromTo(element, 
        {
          opacity: 0
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: '50% bottom', // Start the animation when the top of the heroContent hits 90% of the viewport
            scrub: false,
            markers: false
          },
          ease: "power2.out",
          duration: 0.6
        }
      )

      gsap.fromTo(element, 
        {
          y: 0
        },
        {
          y: "-20%",
          scrollTrigger: {
            trigger: element,
            start: '5% bottom',
            scrub: true,
            markers: false,
          },
          ease: "power2.out",
        }
      )
  
    })

    
    // Pin roomKeyHeader until roomKey scrolls over it
    ScrollTrigger.create({
      trigger: this.elements.roomKeyHeader,
      start: "top top",
      end: () => `+=${this.elements.roomKey.offsetHeight * 1.5}`, // Keep it pinned while roomKey moves over
      pin: true,
      pinSpacing: false, // Prevents pushing content down
      scrub: true
    });

    // Fade out roomKeyHeader when roomKey starts overlapping
    gsap.to(this.elements.roomKeyHeader, {
      opacity: 0,
      scrollTrigger: {
        trigger: this.elements.roomKey,
        start: "top 85%", // Begin fade when roomKey starts overlapping
        end: "top 50%", // Fully faded when roomKey is in the middle
        scrub: true
      }
    });

    // Move roomKey up to overlap roomKeyHeader
    gsap.to(this.elements.roomKey, {
      y: "-100%", // Moves it upwards to visually overlap the header
      scrollTrigger: {
        trigger: this.elements.roomKey,
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    });

    // **NEW**: Pin roomKey when it reaches the middle of roomKeyHeader text
    ScrollTrigger.create({
      trigger: this.elements.roomKey,
      start: "center center",
      end: () => `+=${this.elements.steps.length * 300}`, // Ends when all step__outline elements are revealed
      pin: true,
      scrub: true
    });

    // **NEW**: Move roomKey to the right while pinned
    gsap.to(this.elements.roomKey, {
      x: "50%",
      scrollTrigger: {
        trigger: this.elements.roomKey,
        start: "center center",
        end: () => `+=${this.elements.steps.length * 300}`,
        scrub: true
      }
    });

    // **NEW**: Step outlines scroll into view one by one
    this.elements.steps.forEach((step, index) => {
      gsap.fromTo(step,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: step,
            start: "top bottom",
            end: "top center",
            scrub: true
          }
        }
      );
    });

    // Pin progress bar at all times (only show/hide)
    ScrollTrigger.create({
      trigger: this.elements.roomKeySection,
      start: "top top",
      end: "bottom bottom",
      pin: this.elements.progressBar
    });








    // Show progress bar when roomKey is fully in view
    ScrollTrigger.create({
      trigger: this.elements.roomKey,
      start: "top center",
      onEnter: () => this.showProgressBar(),
      onLeaveBack: () => this.hideProgressBar(),
      markers: false
    });  









    // gsap.to(this.elements.roomKeyHeader, {
    //   scrollTrigger: {
    //     trigger: this.elements.roomKeyHeader,
    //     start: "top top",
    //     end: `+=${this.pinnedHeight}`,
    //     pin: true,
    //     scrub: true,
    //     markers: true,
    //     onLeave: () => {
    //       gsap.to(this.elements.roomKeyTitle, {opacity: 0, duration: 0.6, ease: 'power2.out'})
    //       this.showProgressBar()
    //     },
    //     onEnterBack: () => {
    //       this.hideProgressBar()
    //     }
        
    //   }
    // })

    // gsap.to(this.elements.roomKey, {
    //   scrollTrigger: {
    //     trigger: this.elements.roomKeySection,
    //     start: "top center",
    //     scrub: true,
    //     pin: true,
    //     markers: true
    //   }
      
    // });
  
  }
}
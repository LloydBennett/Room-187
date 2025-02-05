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
    //this.animateIndexHighlighter(-1)
  }

  showProgressBar() {
    gsap.to(this.elements.progressBar , {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    })

    this.isProgressBarVisible = true
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
          y: "10%"
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

    this.roomKeyAnimations()
  }

  roomKeyAnimations() {
    let roomKeyWidth = this.elements.roomKey.offsetWidth; // Get room-key width
    let totalStepsHeight = Array.from(this.elements.steps).reduce((total, step) => total + step.offsetHeight, 0);
    // Reduce pin duration slightly to ensure last step scrolls smoothly
    let adjustedPinDuration = totalStepsHeight - this.elements.steps[0].offsetHeight * 0.5; 

    gsap.set(this.elements.steps, { opacity: 0, y: 50 })
    gsap.set(this.elements.progressBar, { opacity: 0 })

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
        start: "top 55%", // Begin fade when roomKey starts overlapping
        end: "top 30%", // Fully faded when roomKey is in the middle
        scrub: true
      }
    })

    // **Corrected pin duration for room-key to stay pinned for all steps**

    ScrollTrigger.create({
      trigger: this.elements.roomKey,
      start: "center center",
      end: `+=${adjustedPinDuration}`,
      pin: true,
      scrub: true
    });

    // Move roomKey to the right once pinned
    gsap.to(this.elements.roomKey, {
      x: "85%",
      rotate: "5deg",
      scrollTrigger: {
        trigger: this.elements.roomKey,
        start: "center center",
        end: `+=${this.elements.steps[0].offsetHeight}`, // Moves right over a short scroll distance
        scrub: true,
        onEnter: () => gsap.set(this.elements.steps, { opacity: 0 }) // Ensure steps remain hidden until move completes
      }
    })

    // Step opacity should be scroll-based (fade in/out based on scroll)
    this.elements.steps.forEach((step, index) => { 
      ScrollTrigger.create({
        trigger: step,
        start: "top 70%",
        end: "top 50%",
        scrub: true,
        toggleActions: "play none none reverse",
        onEnter: () => gsap.to(step, { opacity: 1, y: 0, duration: 0.3 }),
        onLeaveBack: () => gsap.to(step, { opacity: 0, y: 50, duration: 0.3 })
      });
  
      // **Keep room-key pinned for the last step**
      if (index === this.elements.steps.length - 1) {
        ScrollTrigger.create({
          trigger: step,
          start: "top 50%",
          end: "bottom top",
          scrub: true,
          pin: true
        });
      }

      // **Flip room-key when the second step appears**
      if (index === 2) {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          onEnter: () => this.elements.roomKey.classList.add("flip"),
          onLeaveBack: () => this.elements.roomKey.classList.remove("flip")
        });
      }

      ScrollTrigger.create({
        trigger: step,
        start: "top 50%", // When the step reaches 50% of the viewport
        end: "top 30%", // When the step is almost fully in view
        onEnter: () => {
          if(index === 0) {
            this.animateIndexHighlighter(index); // Highlight the corresponding dot for the current step
          } else {
            this.animateIndexHighlighter(index - 1); // Highlight the corresponding dot for the current step
          }
        },
        onLeaveBack: () => {
          if(index === 1) {
            this.animateIndexHighlighter(index - 1);
          } else {
            this.animateIndexHighlighter(index - 2);
          }
        }
      });
    });

    // Pin progress bar at all times (only show/hide)
    ScrollTrigger.create({
      trigger: this.elements.roomKeySection,
      start: "top top",
      end: "bottom bottom",
      pin: this.elements.progressBar
    })

    // Show progress bar when roomKey is fully in view

    ScrollTrigger.create({
      trigger: this.elements.steps[1],
      start: "top center", // When the first step reaches the center of the viewport
      onEnter: () => this.showProgressBar(),
      onLeaveBack: () => this.hideProgressBar(),
      markers: false
    });

  }
}
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
        steps: '[data-progress-steps]',
        artistNames: '[data-artist-name-animation]',
        stepContainer: '[data-step-container]'
      }
    })
    
    gsap.registerPlugin(ScrollTrigger)
    
    this.mm = gsap.matchMedia()
    this.pinnedHeight = this.elements.roomKeySection? this.elements.roomKeySection.offsetHeight : 100
    this.isProgressBarVisible = false
    this.currentActiveIndex = -1

    this.init()
  }

  init() {
    this.setUpScrollAnimations()
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
    this.polaroidParallax()
    this.roomKeyAnimations()
    this.artistSectionAnimations()
  }
  
  polaroidParallax() {
    if(!this.elements.polaroid) return

    this.elements.polaroid.forEach((element, i) => {
      gsap.fromTo(element, 
        {
          opacity: 0
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: '50% bottom',
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
  }
  
  roomKeyAnimations() {
    if (!this.elements.roomKey || !this.elements.steps || !this.elements.roomKeyHeader || !this.elements.stepContainer || !this.elements.progressBar) return;

    let totalStepsHeight = this.elements.steps? Array.from(this.elements.steps).reduce((total, step) => total + step.offsetHeight, 0) : null;
    let adjustedPinDuration = totalStepsHeight - (this.elements.roomKey.offsetHeight + (this.elements.roomKey.offsetHeight / 4));
    let scrollOptions = {
      trigger: this.elements.roomKey,
      start: "center center",
      end: `+=${this.elements.steps[0].offsetHeight}`,
      scrub: true,
      onEnter: () => gsap.set(this.elements.steps, { opacity: 0 })
    }

    gsap.set(this.elements.steps, { opacity: 0, y: 50 })
    gsap.set(this.elements.progressBar, { opacity: 0 })

    this.mm.add("(max-width: 767px)", () => {
      const roomKeyPinStart = "center 30%";
      const roomKeyPinEnd = adjustedPinDuration + this.elements.steps.length * window.innerHeight;
      
      ScrollTrigger.create({
        id: "roomKeyPin",
        trigger: this.elements.roomKeyHeader,
        start: "top top",
        end: () => {
          const headerRect = this.elements.roomKeyHeader.getBoundingClientRect();
          const roomKeyRect = this.elements.roomKey.getBoundingClientRect();
          const distance = (roomKeyRect.top - headerRect.top) + this.elements.roomKey.offsetHeight;
          return `+=${distance}`;
        },
        pin: true,
        pinSpacing: false,
        scrub: true
      });

      gsap.to(this.elements.roomKeyHeader, {
        opacity: 0,
        scrollTrigger: {
          trigger: this.elements.roomKey,
          start: "top 70%",
          end: "top 30%",
          scrub: true
        }
      })

      // master pin
      ScrollTrigger.create({
        trigger: this.elements.roomKey,
        start: roomKeyPinStart,
        end: `+=${roomKeyPinEnd}`,
        pin: this.elements.roomKeySection,
        pinSpacing: true,
        anticipatePin: 0.5,
        scrub: true
      });

      ScrollTrigger.create({
        trigger: this.elements.stepContainer,
        start: "bottom bottom",
        end: `+=${roomKeyPinEnd}`,
        scrub: true
      });

      gsap.set(this.elements.steps, { opacity: 0, position: "absolute", width: "100%" });

      let stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: this.elements.stepContainer,
          start: "bottom bottom",
          end: `+=${roomKeyPinEnd}`,
          scrub: true,
          onUpdate: self => {
            let totalSteps = this.elements.steps.length;
            let rawIndex = Math.floor(self.progress * totalSteps); // 0..totalSteps-1

            // Clamp to valid index
            let activeIndex = Math.min(Math.max(rawIndex, 1), totalSteps - 1);

            this.animateIndexHighlighter(activeIndex - 1);

            if (activeIndex === 2) {
              this.elements.roomKey.classList.add("flip");
            }
            if (activeIndex < 2) {
              this.elements.roomKey.classList.remove("flip");
            }
          }
        }
      });

      this.elements.steps.forEach((step, index) => {
        stepTl.to(step, { opacity: 1, duration: 0.8 })

        if (index < this.elements.steps.length - 1) {
          stepTl.to(step, { opacity: 0, duration: 0.8 }, "+=1.5");
        }
          
      });

      ScrollTrigger.create({
        trigger: this.elements.steps[1],
        start: "top 60%",
        end: "top 40%",
        onEnter: () => this.showProgressBar(),
        onLeaveBack: () => this.hideProgressBar(),
        scrub: true,
        pinSpacing: false
      });

      window.addEventListener("resize", () => ScrollTrigger.refresh());
    });
    
    
    this.mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        id: "roomKeyPin",
        trigger: this.elements.roomKeyHeader,
        start: "top top",
        end: () => `+=${this.elements.roomKey.offsetHeight * 1.5}`, // Keep it pinned while roomKey moves over
        pin: true,
        pinSpacing: false,
        scrub: true
      });

      gsap.to(this.elements.roomKeyHeader, {
        opacity: 0,
        scrollTrigger: {
          trigger: this.elements.roomKey,
          start: "top 55%",
          end: "top 30%",
          scrub: true
        }
      })

      ScrollTrigger.create({
        trigger: this.elements.roomKey,
        start: "center center",
        end: `+=${adjustedPinDuration}`,
        pin: true,
        scrub: true
      });
      
      gsap.to(this.elements.roomKey, {
        x: "85%",
        rotate: "5deg",
        ease: "power2.out",
        scrollTrigger: scrollOptions
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
      })
    })

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

    window.addEventListener("resize", () => ScrollTrigger.refresh());

  }

  artistSectionAnimations() {
    if (!this.elements.videoBlock || !this.elements.video || !this.elements.artistNames) return;

    gsap.fromTo(this.elements.videoBlock, 
      { clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)"},
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scrollTrigger: {
          trigger: this.elements.videoBlock,
          start: '5% bottom',
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

    this.elements.artistNames.forEach((name, i) => {
      let getVal = name.getAttribute('data-artist-name-animation')
      let startXpos = getVal === "left" ? "10%": "-10%"
      
      gsap.fromTo(name,
        { 
          x: startXpos,
          opacity: 0
        },
        { 
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.4,
          scrollTrigger: {
            trigger: name,
            start: "top bottom",
            markers: false,
            scrub: true
          }
        }
      )

    })
  }
}
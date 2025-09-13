import Lenis from 'lenis'

// Detect real mobile devices via user agent
const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)

// Always export something so your imports never break
export const scroll = isMobile
  ? {
      raf: () => {},   // does nothing
      stop: () => {},  // does nothing
      start: () => {}, // does nothing
      on: () => {}     // does nothing
    }
  : new Lenis({
      autoRaf: false,
      lerp: 0.08,
      duration: undefined, // remove duration if you use lerp
      smoothTouch: true,
      touchMultiplier: 1.5
    })

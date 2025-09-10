import Lenis from 'lenis'

const isMobile = window.matchMedia('(max-width: 768px)').matches

export const scroll = new Lenis({
  autoRaf: false,
  lerp: isMobile ? 0.15 : 0.08,
  duration: undefined, // remove duration if you use lerp
  smoothTouch: true,
  touchMultiplier: 1.5
});
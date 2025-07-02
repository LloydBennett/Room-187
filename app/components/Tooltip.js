import Components from 'classes/Components'
import gsap from 'gsap'

export default class Tooltip extends Components {
  constructor() {
    super({
      elements: {
        tooltip: '[data-tooltip]',
        tooltipItem: '[data-tooltip-item]',
      }
    })
    console.log('loggggg!')

    this.init()
  }
  addEventListener() {
    const tooltipItems = this.elements.tooltipItem;
    console.log('Found tooltipItems:', tooltipItems); // 👈 Add this
  
    if (!tooltipItems) return;

    const isList = tooltipItems instanceof NodeList || Array.isArray(tooltipItems);
    const items = isList ? tooltipItems : [tooltipItems];

    items.forEach(item => {
      const tooltip = item.querySelector("[data-tooltip]");
      if (!tooltip) return;

      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      })

      item.addEventListener("mouseenter", () => {
        tooltip.style.opacity = 1;
      })

      item.addEventListener("mouseleave", () => {
        tooltip.style.opacity = 0;
      })
    })
  }

  init() {
    this.addEventListener()
    console.log('testing')
  }
}
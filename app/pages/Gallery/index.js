import Page from 'classes/Page'

export default class Gallery extends Page {
  constructor() {
    super({
      id: 'gallery',
      elements: {

      }
    })

    this.currentIndex = 0
    this.images = []
  }

  openSlideShow(e) {
    images = Array.from(document.querySelectorAll("#gallery img")); // Get all images
    const imgElement = e.target;
    const imageId = imgElement.dataset.id;  

    currentIndex = images.findIndex(img => img.dataset.id === imageId); // Find index
    showImage(currentIndex); // Show the selected image

    document.getElementById("lightbox").classList.remove("hidden");

    // Update the URL
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("image", imageId);
    window.history.pushState({}, "", newUrl);
  }

  closeSlideShow() {
    document.getElementById("lightbox").classList.add("hidden");

    // Remove image parameter from URL
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("image");
    window.history.pushState({}, "", newUrl);
  }
  
  changeImage(direction) {
    let newIndex = currentIndex + direction;

    // Loop back to start or end (infinite scrolling)
    if (newIndex >= images.length) newIndex = 0; // Go to first image
    if (newIndex < 0) newIndex = images.length - 1; // Go to last image

    this.showImage(newIndex);
  }

  // Show Image with Smooth Transition
  showImage(index) {
    currentIndex = index;
    const imgElement = images[currentIndex];
    const lightboxImg = document.getElementById("lightbox-img");

    // Fade out the current image
    lightboxImg.classList.add("fade-out");

    setTimeout(() => {
      lightboxImg.src = imgElement.dataset.fullsize;
      lightboxImg.alt = imgElement.alt || "Gallery Image";
      lightboxImg.classList.remove("fade-out");
      lightboxImg.classList.add("fade-in");

      // Update the URL with the new image ID
      const newUrl = new URL(window.location);
      newUrl.searchParams.set("image", imgElement.dataset.id);
      window.history.pushState({}, "", newUrl);
    }, 300); // Wait for fade-out to complete
  }

  addEventListeners() {
    // Check URL on Page Load & Open Lightbox if Needed
    window.addEventListener("DOMContentLoaded", () => {
      images = Array.from(document.querySelectorAll("#gallery img")); // Ensure images are loaded
      const urlParams = new URLSearchParams(window.location.search);
      const imageId = urlParams.get("image");

      if (imageId) {
        const imgElement = document.querySelector(`[data-id="${imageId}"]`);
        if (imgElement) this.openLightbox({ target: imgElement });
      }
    })
  }
}













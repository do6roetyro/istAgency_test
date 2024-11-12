export function nextSlide(currentSlide, slidesLength) {
    return (currentSlide + 1) % slidesLength;
  }
  
  export function prevSlide(currentSlide, slidesLength) {
    return (currentSlide - 1 + slidesLength) % slidesLength;
  }
  
  export function goToSlide(index) {
    return index;
  }
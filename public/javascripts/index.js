let currentSlideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slides');
  if (index >= slides.length) currentSlideIndex = 0;
  if (index < 0) currentSlideIndex = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.style.display = i === currentSlideIndex ? 'block' : 'none';
  });
}

function changeSlide(direction) {
  currentSlideIndex += direction;
  showSlide(currentSlideIndex);
}
showSlide(currentSlideIndex);
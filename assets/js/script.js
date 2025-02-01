var slides, indicators, currentIndex = 0;

function showSlide(i) {
  slides[currentIndex].classList.remove("active");
  indicators[currentIndex].classList.remove("active");
  slides[i].classList.add("active");
  indicators[i].classList.add("active");
  currentIndex = i;
}

function nextSlide() {
  var i = (currentIndex + 1) % slides.length;
  showSlide(i);
}

function prevSlide() {
  var i = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(i);
}

function handleImageHover(event, isRotator = false) {
  const image = event.target;
  const originalSrc = image.src;

  // Zweites Bild mit _2.png
  image.dataset.originalSrc = originalSrc; // Speichern des Originalbilds
  image.src = originalSrc.replace('.png', '_2.png'); // Bild wechseln

  image.classList.add('fade-in'); // Fade-Effekt hinzufügen

  // Beim Verlassen der Maus das Bild zurück wechseln
  image.addEventListener('mouseleave', () => {
    image.classList.remove('fade-in'); // Fade-Effekt entfernen
    setTimeout(() => {
      image.src = image.dataset.originalSrc; // Originalbild zurückladen
    }, 300); // Warte etwas, bevor das Bild gewechselt wird (Zeit für den Fade-Effekt)
  });
}


document.addEventListener("DOMContentLoaded", function() {
  // Rotator-Slides und Indikatoren
  slides = document.querySelectorAll(".rotator a");
  indicators = document.createElement("div");
  document.querySelector(".rotator-indicators").appendChild(indicators);
  indicators.remove();
  indicators = [];

  slides.forEach(function(_, i) {
    var d = document.createElement("div");
    d.className = "indicator";
    d.addEventListener("click", function() {
      showSlide(i);
    });
    document.querySelector(".rotator-indicators").appendChild(d);
    indicators.push(d);
  });

  slides[0].classList.add("active");
  indicators[0].classList.add("active");

  setInterval(nextSlide, 8000);

  // Produktkarten
  const productCardImages = document.querySelectorAll('.product-card img');
  productCardImages.forEach(image => {
    image.addEventListener('mouseenter', (event) => handleImageHover(event));
  });

  // Rotator
  const rotatorImages = document.querySelectorAll('.rotator img');
  rotatorImages.forEach(image => {
    image.addEventListener('mouseenter', (event) => handleImageHover(event, true)); // true für Rotator
  });

  // Dropdown-Menü-Handling
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  dropdownToggle.addEventListener("click", function(event) {
    event.preventDefault();
  });

  // Markiere den aktiven Menü-Link
  const links = document.querySelectorAll(".header-center ul li a");
  const currentUrl = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("active");
    }
  });
});

function initCarrousel(elementId, images, visibleCount = 3) {
  const container = document.getElementById(elementId);

  container.innerHTML = `
    <div class="carrousel-wrapper">
      <button class="carrousel-btn prev">&#10094;</button>
      <div class="carrousel-container">
        <div class="carrousel-slides">
          ${images.map(src => `<div class="carrousel-item"><img src="${src}" alt="Image"></div>`).join("")}
        </div>
      </div>
      <button class="carrousel-btn next">&#10095;</button>
    </div>

    <!-- Popup -->
    <div class="image-popup">
      <span class="close-popup">&times;</span>
      <img class="popup-img" src="" alt="Aperçu">
    </div>
  `;

  const slides = container.querySelector(".carrousel-slides");
  const items = container.querySelectorAll(".carrousel-item");
  const prevBtn = container.querySelector(".prev");
  const nextBtn = container.querySelector(".next");
  const popup = container.querySelector(".image-popup");
  const popupImg = container.querySelector(".popup-img");
  const closePopup = container.querySelector(".close-popup");

  // largeur dynamique
  items.forEach(item => {
    item.style.flex = `0 0 ${100 / visibleCount}%`;
  });

  let index = 0;

  function updateSlide() {
    const itemWidth = items[0].offsetWidth;
    slides.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  prevBtn.addEventListener("click", () => {
    index = (index > 0) ? index - 1 : images.length - visibleCount;
    updateSlide();
  });

  nextBtn.addEventListener("click", () => {
    index = (index < images.length - visibleCount) ? index + 1 : 0;
    updateSlide();
  });

  // Afficher popup au clic sur image
  items.forEach(item => {
    const img = item.querySelector("img");
    img.addEventListener("click", () => {
      popupImg.src = img.src;
      popup.classList.add("show");
    });
  });

  // Fermer popup
  closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
  });

  // Fermer au clic en dehors de l’image
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("show");
  });

  updateSlide();
}

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
    `;
  
    const slides = container.querySelector(".carrousel-slides");
    const items = container.querySelectorAll(".carrousel-item");
    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");
  
    // largeur dynamique en fonction du nombre d’images visibles
    items.forEach(item => {
      item.style.flex = `0 0 ${100 / visibleCount}%`;
    });
  
    let index = 0;
  
    function updateSlide() {
      const itemWidth = items[0].offsetWidth; // largeur réelle en px
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
  
    // s'assurer du bon affichage au chargement
    updateSlide();
  }
  
const folders = ['../images/images1/', '../images/images2/']; // Ajoutez ici tous les dossiers contenant des images
const images = [];
let maxImageWidth = 0;
let maxImageHeight = 0;
let currentIndex = 0; // Index de l'image actuellement affichée
let timerId = null; // Identifiant du timer

// Fonction pour afficher une image spécifique
function displayImage(index) {
  const currentImage = document.querySelector('.carousel img.active');
  const nextImage = images[index];

  // Supprimer la classe active de l'image actuellement affichée
  if (currentImage) {
    currentImage.classList.remove('active');
  }

  // Ajouter la classe active à l'image suivante
  nextImage.classList.add('active');
}

// Fonction pour démarrer le défilement aléatoire des images
function startRandomImageDisplay() {
  timerId = setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    displayImage(randomIndex);
    startRandomImageDisplay(); // Relance le défilement après un délai supplémentaire
  }, 1500 /*3500*/);
}

// Fonction pour arrêter le défilement aléatoire des images
function stopRandomImageDisplay() {
  clearTimeout(timerId);
}

// Ajouter les gestionnaires d'événements pour gérer le survol de la souris
const carouselContainer = document.querySelector('.carousel');
carouselContainer.addEventListener('mouseenter', stopRandomImageDisplay);
carouselContainer.addEventListener('mouseleave', startRandomImageDisplay);

// Fonction pour charger les images à partir d'un dossier
function loadImagesFromFolder(folder) {
  fetch(folder)
    .then(response => response.text())
    .then(data => {
      // Extraire les noms des fichiers d'image
      const fileNames = data.match(/<a href=".*?\.(jpg|png|jpeg|gif)"/g)
                          .map(match => match.substring(9, match.length - 1));

      // Charger les images à partir des noms de fichier récupérés
      fileNames.forEach(fileName => {
        const img = new Image();
        img.src = folder + fileName;
        img.onload = function() {
          maxImageWidth = Math.max(maxImageWidth, this.width);
          maxImageHeight = Math.max(maxImageHeight, this.height);
          images.push(img);

          // Lorsque toutes les images sont chargées
          if (images.length === fileNames.length * folders.length) {
            // Ajouter les images au carousel
            images.forEach((img, index) => {
              carouselContainer.appendChild(img);
            });

            // Afficher la première image dès le début de la page
            displayImage(0);

            // Démarrer le défilement aléatoire des images
            startRandomImageDisplay();
          }
        };
      });
    })
    .catch(error => console.error('Error fetching images:', error));
}

// Charger les images à partir de chaque dossier
folders.forEach(folder => {
  loadImagesFromFolder(folder);
});

import React, { useState } from 'react';
import '../Estilos/Galeria.css'; // Importa el archivo CSS con los estilos
import image1 from '../assets/img.png';
import image2 from '../assets/img.png';
import image3 from '../assets/img.png';
import image4 from '../assets/img.png';

const ImageCarousel = () => {
  // Array con las imágenes de los assets
  const images = [image1, image2, image3, image4];

  // Estado para el índice de la imagen actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para ir a la imagen anterior
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Función para ir a la siguiente imagen
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        {/* Flecha de "anterior" */}
        <button className="arrow left-arrow" onClick={goToPrevious}>
          ←
        </button>

        {/* Imagen actual */}
        <div className="image-container">
          <img src={images[currentIndex]} alt="Carousel" />
        </div>

        {/* Flecha de "siguiente" */}
        <button className="arrow right-arrow" onClick={goToNext}>
          →
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Estilos/Galeria.css';

const ImageCarousel = () => {
  const { id } = useParams(); // Obtiene el ID del tour desde la URL
  const [imagenes, setImagenes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Petición al backend para obtener las imágenes del tour
    fetch(`http://localhost:8080/tour/buscar/${id}/imagenes`)
      .then(response => response.json())
      .then(data => setImagenes(data))
      .catch(error => console.error('Error cargando imágenes:', error));
  }, [id]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-wrapper">
      {imagenes.length > 0 ? (
        <div className="carousel-container">
          <button className="arrow left-arrow" onClick={goToPrevious}>◀</button>
          <div className="image-container">
            <img src={`http://localhost:8080${imagenes[currentIndex]}`} alt={`Tour ${id}`} />
          </div>
          <button className="arrow right-arrow" onClick={goToNext}>▶</button>
        </div>
      ) : (
        <p>No hay imágenes disponibles para este tour.</p>
      )}
    </div>
  );
};

export default ImageCarousel;

import React from 'react';
import '../Estilos/Details.css';

// Imágenes importadas desde la carpeta assets
import image1 from '../assets/img1.jpg.jpg';
import image6 from '../assets/img6.jgp.jpg';
import image3 from '../assets/img3.jpg.jpg';
import image4 from '../assets/img4.jpg.jpg';
import image5 from '../assets/img5.jpg.jpg';

const ProductDetails = () => {


  // Función para regresar a la página anterior
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="product-details-container">
      {/* Título del producto alineado a la izquierda */}
      <div className="product-title">
        <h1>Destino 1</h1>
      </div>

      {/* Flecha para regresar alineada a la derecha */}
      <div className="back-arrow" onClick={handleGoBack}>
        <span>&larr; Volver</span>
      </div>

      {/* Cuerpo descriptivo del producto y galería de imágenes */}
      <div className="product-body">
        {/* Galería de imágenes */}
        <div className="product-gallery">
          {/* Imagen principal en la mitad izquierda */}
          <div className="main-image">
            <img src={image1} alt="Producto principal" />
          </div>

          {/* Grilla de imágenes en la mitad derecha */}
          <div className="grid-container">
            <div className="grid-item">
              <img src={image6} alt="Producto 2" />
            </div>
            <div className="grid-item">
              <img src={image3} alt="Producto 3" />
            </div>
            <div className="grid-item">
              <img src={image4} alt="Producto 4" />
            </div>
            <div className="grid-item">
              <img src={image5} alt="Producto 5" />
            </div>
          </div>
        </div>

        {/* Enlace "Ver más" en la parte inferior derecha */}
        <div className="see-more">
          <a href="/Galeria">Ver más</a>
        </div>

      </div>
      <div>
        {/* Texto descriptivo debajo de la galería */}
        <div className="product-description">
          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, blanditiis. Accusantium, magni ducimus quaerat omnis voluptatem nihil quidem nisi vero at magnam, quisquam consectetur iure eaque repellat ullam atque eius.
          </p>
        </div>
        </div>
    </div>
    
  );
};

export default ProductDetails;

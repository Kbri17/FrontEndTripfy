import React from 'react';
import '../Estilos/Producto.css'; // Importamos el archivo CSS
import image1 from '../assets/img.png';

const ProductDetail = () => {


  const handleBack = () => {
    history.goBack(); // Redirige a la página anterior
  };

  return (
    <div className="product-detail">
      {/* Barra superior con el título y la flecha */}
      <div className="header">
        <h1 className="title">Destino</h1>
        <button className="back-button" onClick={handleBack}>←</button>
      </div>

      {/* Contenido del producto */}
      <div className="product-body">
        {/* Imagen del producto (50%) */}
        <div className="product-image">
            <img src={image1} alt="Producto " />
         
        </div>

        {/* Descripción del producto (50%) */}
        <div className="product-description">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem corrupti nobis earum fugit 
            corporis error vero, nemo incidunt quas sequi animi quae nesciunt porro explicabo accusantium temporibus excepturi veritatis est.
          </p>
        </div>
      </div>

      {/* Botón de "Ver más" */}
      <div className="see-more-button">
        <button onClick={() => alert('Ver más...')}>
          Ver más
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

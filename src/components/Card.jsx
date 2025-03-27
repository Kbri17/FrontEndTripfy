import React from "react";
import { useNavigate } from "react-router-dom";

const TravelPackageCard = ({ idTour, image, title, description, price, destination, categoria }) => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleDetailsClick = () => {
    console.log("Redirigiendo a:", `/details/${idTour}`);
    console.log("ID del tour:", idTour); // Verificar si idTour es correcto
    navigate(`/details/${idTour}`); // Redirige a la ruta con el ID del tour
  };

  // Limitar la descripción a 80 caracteres, y asegurar que description no sea undefined
  const shortDescription = description && description.length > 80 ? description.slice(0, 40) + '...' : description;

  return (
    <div className="max-w-lg h-60 rounded-lg overflow-hidden shadow-lg bg-white flex flex-row">
      {/* Lado Izquierdo: Imagen */}
      <div className="w-1/2">
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={title} />
      </div>

      {/* Lado Derecho: Contenido */}
      <div className="bg-custom-bluelg w-1/2 p-5 flex flex-col">
        <h2 className="text-xl font-bold text-custom-blue">{title}</h2>
        <p className="text-gray-600 mt-2">{destination}</p>
        <p className="text-gray-500 mt-2 text-sm flex-grow">{shortDescription}</p>
        <span className="text-lg font-semibold text-gray-800">{price}</span>

        {/* Contenedor del precio y el botón generado dinámicamente */}
        <div className="mt-auto flex justify-between items-center">
          <button 
            className="px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleDetailsClick} // Maneja el clic en el botón
          >
            Ver {categoria}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelPackageCard;

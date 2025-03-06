import React from "react";

const TravelPackageCard = ({ image, title, description, price, destination, categoria }) => {
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
        <p className="text-gray-500 mt-2 text-sm flex-grow">{description}</p>
        <span className="text-lg font-semibold text-gray-800">{price}</span>
        {/* Contenedor del precio y el botón generado dinámicamente */}
        <div className="mt-auto flex justify-between items-center">
          <button className="px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-600 transition">
          Ver {categoria} {/* 👉 Ahora muestra "Ver [categoría]" */}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default TravelPackageCard;
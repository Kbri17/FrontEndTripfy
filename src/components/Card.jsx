import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TravelPackageCard = ({
  idTour,
  image,
  title,
  description,
  price,
  destination,
  categoria,
  fecha, //se agrego fecha para validar el filtro por fecha
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // Estado para favoritos

  const handleDetailsClick = () => {
    console.log("Redirigiendo a:", `/details/${idTour}`);
    console.log("ID del tour:", idTour);
    navigate(`/details/${idTour}`);
  };

  // Limitar la descripción a 40 caracteres
  const shortDescription =
    description?.length > 40 ? description.slice(0, 60) + "..." : description;

  // Alternar favorito
  const toggleFavorite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      storedFavorites = storedFavorites.filter(
        (tour) => tour.idTour !== idTour
      );
    } else {
      storedFavorites.push({ idTour, image, title, price, destination, fecha });
      //se agrego fecha para validar el filtro por fecha
    }

    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-lg h-60 rounded-lg overflow-hidden shadow-lg bg-white flex flex-row relative">
      {/* Ícono de corazón */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-2xl focus:outline-none"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Lado Izquierdo: Imagen */}
      <div className="w-1/2">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={image}
          alt={title}
        />
      </div>

      {/* Lado Derecho: Contenido */}
      <div className="bg-custom-bluelg w-1/2 p-4 flex flex-col">
        <h2 className="text-xl font-bold text-custom-blue">{title}</h2>
        <p className="text-gray-600">{destination}</p>
        <p className="text-blue-800 text-xs mt-1">{fecha}</p>
        <p className="text-gray-500 mt-2 text-sm flex-grow">
          {shortDescription}
        </p>
        <span className="text-lg font-semibold text-gray-800">{price}</span>
        {/* Botón de ver detalles */}
        <div className="mt-auto flex justify-between items-center">
          <button
            className="px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleDetailsClick}
          >
            Ver {categoria}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelPackageCard;

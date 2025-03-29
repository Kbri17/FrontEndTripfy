import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Eliminar un favorito
  const removeFavorite = (idTour) => {
    const updatedFavorites = favorites.filter((tour) => tour.idTour !== idTour);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">💖 Mis Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes tours en favoritos aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((tour) => (
            <div
              key={tour.idTour}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{tour.title}</h2>
                <p className="text-gray-600">{tour.destination}</p>
                <p className="text-lg font-semibold text-gray-800">
                  {tour.price}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <button
                    className="px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-600 transition"
                    onClick={() => navigate(`/details/${tour.idTour}`)}
                  >
                    Ver detalles
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl"
                    onClick={() => removeFavorite(tour.idTour)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;

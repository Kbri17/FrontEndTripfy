import React, { useEffect, useState } from "react";
import TravelPackageCard from "./Card";

const Carousel = ({ selectedCategory }) => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:8080/tour/buscartodos"); // Ajusta la URL de tu API
        if (!response.ok) throw new Error("Error al obtener los tours");

        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error al obtener los tours:", error);
      }
    };

    fetchTours();
  }, []);

  // Filtrar tours según la categoría seleccionada
  const filteredTours = selectedCategory
    ? tours.filter(
        (tour) =>
          tour.categoria.toLowerCase() === selectedCategory.toLowerCase() &&
          tour.estado === true
      )
    : tours.filter((tour) => tour.estado === true); // Mostrar todos si no hay categoría seleccionada

  return (
    <div className="w-10/12 py-8 flex items-center mx-auto justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <div
              key={tour.idTour}
              className="p-2 rounded-xl hover:scale-105 transition transform duration-300"
            >
              <TravelPackageCard
                idTour={tour.idTour}
                image={
                  tour.imagenes.length > 0
                    ? tour.imagenes[0].url
                    : "ruta_por_defecto.png"
                }
                title={tour.nombre}
                destination={tour.ubicacion}
                description={tour.descripcion}
                price={tour.precio}
                categoria={tour.categoria}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No hay tours disponibles para esta categoría.
          </p>
        )}
      </div>
    </div>
  );
};

export default Carousel;
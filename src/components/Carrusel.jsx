import React, { useEffect, useState } from "react";
import TravelPackageCard from "./Card";


const API_URL = import.meta.env.VITE_API_URL;

const Carousel = ({ selectedCategory, searchTerm, selectedDate }) => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${API_URL}/tour/buscartodos`); // Ajusta la URL de tu API
        if (!response.ok) throw new Error("Error al obtener los tours");

        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error al obtener los tours:", error);
      }
    };

    fetchTours();
  }, []);

  // Filtrar tours según la categoría seleccionada, el término de búsqueda y la fecha
  const filteredTours = tours.filter((tour) => {
    const matchesCategory = selectedCategory
      ? tour.categoria.toLowerCase() === selectedCategory.toLowerCase()
      : true; // Si no hay categoría seleccionada, mostrar todos
    const matchesSearch = searchTerm
      ? tour.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
      : true; // Si no hay término de búsqueda, mostrar todos
    const matchesDate = selectedDate
      ? new Date(tour.fecha) >= new Date(selectedDate)
      : true; // Si no hay fecha seleccionada, mostrar todos
    return (
      matchesCategory && matchesSearch && matchesDate && tour.estado === true
    );
  });

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
                fecha={tour.fecha} // Asegúrate de que la fecha esté disponible en el objeto tour
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No hay tours disponibles para esta búsqueda.
          </p>
        )}
      </div>
    </div>
  );
};

export default Carousel;

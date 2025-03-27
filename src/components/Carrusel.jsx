import React, { useEffect, useState } from "react";
import TravelPackageCard from "./Card";

const Carousel = () => {
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

  return (
    
    <div className="w-10/12 py-8 flex items-center mx-auto justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {tours
          .filter((tour) => tour.estado === true).map((tour) => {
            
            return (
              <div
                key={tour.idTour}
                className="card p-4 rounded-xl hover:scale-105 transition transform duration-300"
              >
                <TravelPackageCard
                  idTour={tour.idTour} // 🔹 Pasamos el ID
                  image={tour.imagenes.length > 0 ? tour.imagenes[0].url : "ruta_por_defecto.png"}
                  title={tour.nombre}
                  destination={tour.ubicacion}
                  description={tour.descripcion}
                  price={tour.precio}
                  categoria={tour.categoria}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;


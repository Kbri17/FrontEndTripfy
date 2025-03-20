import React, { useEffect} from "react";
import TravelPackageCard from "./Card";
import { useProducts } from "../products/Hooks/useProducts";

const Carousel = () => {  
  const { products, loadProducts } = useProducts();
  console.log("Products:", products);

  useEffect(() => {
      loadProducts();
    }, []);

  return (
    
    <div className="w-10/12 py-8 flex items-center mx-auto justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {products.map((tour) => {
            
            return (
              <div
                key={tour.idTour}
                className="p-4 hover:scale-105 transition transform duration-300"
              >
                <TravelPackageCard
                  idTour={tour.idTour}
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


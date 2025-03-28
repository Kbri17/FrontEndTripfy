// import React, { useEffect, useState } from "react";
// import TravelPackageCard from "./Card";
// import { useProducts } from "../products/Hooks/useProducts";

// const Carousel = ({ searchQuery }) => {
//   const { products, loadProducts } = useProducts();
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = products;

//     // Filtramos por país si hay un término de búsqueda
//     if (searchQuery) {
//       filtered = products.filter((tour) =>
//         tour.ubicacion.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Mezclamos aleatoriamente los productos
//     const shuffledProducts = [...filtered].sort(() => Math.random() - 0.5);

//     setFilteredProducts(shuffledProducts);
//   }, [searchQuery, products]);

//   return (
//     <div className="w-10/12 py-8 flex items-center mx-auto justify-center">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
//         {filteredProducts.map((tour) => (
//           <div
//             key={tour.idTour}
//             className="p-4 hover:scale-105 transition transform duration-300"
//           >
//             <TravelPackageCard
//               idTour={tour.idTour}
//               image={
//                 tour.imagenes.length > 0
//                   ? tour.imagenes[0].url
//                   : "ruta_por_defecto.png"
//               }
//               title={tour.nombre}
//               destination={tour.ubicacion}
//               description={tour.descripcion}
//               price={tour.precio}
//               categoria={tour.categoria}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
import React, { useEffect, useState } from "react";
import TravelPackageCard from "./Card";
import { useProducts } from "../products/Hooks/useProducts";

const Carousel = ({ searchQuery }) => {
  const { products, loadProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filtramos por país si hay un término de búsqueda
    if (searchQuery) {
      filtered = products.filter((tour) =>
        tour.ubicacion.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Mezclamos aleatoriamente los productos
    const shuffledProducts = [...filtered].sort(() => Math.random() - 0.5);

    setFilteredProducts(shuffledProducts);
  }, [searchQuery, products]);

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
        {filteredProducts.map((tour) => (
          <div
            key={tour.idTour}
            className="p-4 hover:scale-105 transition transform duration-300"
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
        ))}
      </div>
    </div>
  );
};

export default Carousel;
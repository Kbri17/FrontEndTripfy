// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../Estilos/Details.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTour = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/tour/buscar/${id}`);
//         if (!response.ok) {
//           throw new Error(`No se encontró el tour con ID ${id}`);
//         }
//         const data = await response.json();
//         setTour(data);
//       } catch (error) {
//         console.error("Error al obtener los detalles:", error);
//         navigate("/");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTour();
//   }, [id, navigate]);

//   if (loading) return <p>Cargando detalles...</p>;
//   if (!tour) return <p>No se encontró el tour.</p>;

//   return (
//     <div className="product-details-container">
//       {/* Título del producto alineado a la izquierda */}
//       <div className="product-title">
//         <h1>{tour.nombre}</h1>
//       </div>

//       {/* Flecha para regresar alineada a la derecha */}
//       <div className="back-arrow" onClick={() => navigate(-1)}>
//         <span>&larr; Volver</span>
//       </div>

//       {/* Cuerpo descriptivo del producto y galería de imágenes */}
//       <div className="product-body">
//         {/* Galería de imágenes */}
//         <div className="product-gallery">
//           {/* Imagen principal en la mitad izquierda */}
//           <div className="main-image">
//             <img
//               src={tour.imagenes[0]?.url || "ruta_por_defecto.jpg"}
//               alt="Imagen principal"
//             />
//           </div>

//           {/* Grilla de imágenes en la mitad derecha */}
//           <div className="grid-container">
//             {tour.imagenes.slice(1, 5).map((imagen, index) => (
//               <div key={index} className="grid-item">
//                 <img src={imagen.url} alt={`Imagen ${index + 2}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Enlace "Ver más" en la parte inferior derecha */}
//         <div className="see-more">
//           <a href="/Galeria">Ver más</a>
//         </div>
//       </div>

//       {/* Descripción del producto */}
//       <div className="product-description">
//         <p>{tour.descripcion}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tour/buscar/${id}`);
        if (!response.ok) {
          throw new Error(`No se encontró el tour con ID ${id}`);
        }
        const data = await response.json();
        setTour(data);
        generarDescripcion(data.nombre); // Generamos la descripción basada en el nombre del tour
      } catch (error) {
        console.error("Error al obtener los detalles:", error);
        navigate("/");
      }
    };

    fetchTour();
  }, [id, navigate]);

  const generarDescripcion = (titulo) => {
    setDescripcion(`🌍 ¡Embárcate en una aventura inolvidable en ${titulo}! ✈️  

      Descubre los encantos de **${titulo}** con nuestro tour exclusivo, diseñado para brindarte una experiencia única e inolvidable. Desde el momento en que comiences tu viaje, te sumergirás en la cultura, la historia y la belleza de este maravilloso destino.  

      ✨ **¿Qué incluye nuestro tour?**  
      ✅ Visitas guiadas a los principales lugares turísticos 🏛️  
      ✅ Transporte cómodo y seguro 🚍  
      ✅ Acompañamiento de guías expertos 📜  
      ✅ Experiencias auténticas y actividades exclusivas 🎭  
      ✅ Tiempo libre para explorar y disfrutar a tu ritmo 🛍️  

      Cada día será una oportunidad para descubrir algo nuevo: desde los monumentos más emblemáticos hasta rincones escondidos llenos de historia y encanto. Sumérgete en la gastronomía local, déjate sorprender por la arquitectura impresionante y captura momentos que recordarás para siempre.  

      🔥 **¡No dejes pasar esta oportunidad!** 🔥  
      Reserva ahora y vive una experiencia que cambiará tu forma de viajar. 🌟  

      📅 **Cupos limitados** – ¡Asegura tu lugar hoy mismo!`);
  };

  // Función para convertir los saltos de línea en etiquetas <br />
  const formatDescripcion = (descripcion) => {
    return descripcion.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  if (!tour) return <p>Cargando detalles...</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Título del producto alineado al centro y con color personalizado */}
      <div className="product-title mb-4 text-center">
        <h1 className="text-4xl font-semibold text-custom-blue">{tour.nombre}</h1>
      </div>

      {/* Flecha para regresar alineada a la derecha */}
      <div className="back-arrow text-right mb-4" onClick={() => navigate(-1)}>
        <span className="cursor-pointer text-blue-500">&larr; Volver</span>
      </div>

      {/* Cuerpo descriptivo del producto y galería de imágenes */}
      <div className="product-body flex gap-6">
        {/* Contenedor izquierdo con imagen principal y descripción */}
        <div className="left-container w-2/3">
          {/* Imagen principal */}
          <div className="main-image mb-4 w-4/5">
            <img
              src={tour.imagenes[0]?.url || "ruta_por_defecto.jpg"}
              alt="Imagen principal"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Descripción del producto debajo de la imagen */}
          <div className="product-description w-4/5">
            {formatDescripcion(descripcion)}
          </div>
        </div>

        {/* Contenedor derecho con las otras 4 imágenes */}
        <div className="right-container w-1/3">
          <div className="grid grid-cols-1 gap-4">
            {tour.imagenes.slice(1, 5).map((imagen, index) => (
              <div key={index} className="grid-item">
                <img
                  src={imagen.url}
                  alt={`Imagen ${index + 2}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enlace "Ver más" en la parte inferior derecha */}
      <div className="see-more text-right mt-4">
        <a href="/Galeria" className="text-blue-500">Ver más</a>
      </div>
    </div>
  );
};

export default ProductDetails;


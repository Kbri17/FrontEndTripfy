import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Galeria = () => {
  const { id } = useParams(); // Obtiene el ID del tour desde la URL
  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cargar imágenes del tour desde el backend
    fetch(`${API_URL}/tour/imagenes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos completos recibidos:", JSON.stringify(data, null, 2));
        if (data && data.imagenes && Array.isArray(data.imagenes)) {
          setImagenes(data.imagenes.map(img => img.url));
        } else {
          console.error("No se encontraron imágenes para este tour.");
        }
      })
      .catch((error) => console.error("Error cargando datos del tour:", error));
  }, [id]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
        ⬅ Volver
      </button>

      <h1 className="text-3xl font-semibold mb-4">Galería de imágenes</h1>

      {imagenes.length > 0 ? (
        <div className="relative max-w-3xl mx-auto">
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-gray-700"
          >
            ◀
          </button>

          <div className="h-96 flex justify-center items-center">
            <img
              src={`${API_URL}/${imagenes[currentIndex]}`}
              alt={`Imagen ${currentIndex + 1}`}
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-gray-700"
          >
            ▶
          </button>
        </div>
      ) : (
        <p>No hay imágenes disponibles.</p>
      )}
    </div>
  );
};

export default Galeria;
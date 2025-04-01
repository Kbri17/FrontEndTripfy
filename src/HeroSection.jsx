import { useState } from "react";
import { FaSun, FaSuitcase } from "react-icons/fa";
import SearchFull from "./layout/SearchFull";
import SearchPaq from "./layout/SearchPaq";
import Carousel from "./components/Carrusel";

const HeroSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada

  const handleCategoryClick = (category) => {
    // Si la categoría seleccionada es la misma, deselecciona
    if (selectedCategory === category) {
      setSelectedCategory(""); // Deselecciona la categoría
    } else {
      setSelectedCategory(category); // Selecciona la nueva categoría
    }
  };

  return (
    <section className="flex flex-col  items-center justify-center p-4 text-white w-full min-h-min"> {/* bg-gray-900 */}
      {/* Categorías */}
      <div className="flex space-x-4 mb-4">
        {/* Botón Full Day */}
        <button
          className={`flex items-center space-x-2 p-2 rounded-lg transition duration-300 ${
            selectedCategory === "Full Day" ? "bg-gray-800" : "bg-gray-400"
          } hover:bg-custom-orange `}
          onClick={() => handleCategoryClick("Full Day")}
        >
          <FaSun size={16} />
          <span className="text-sm">Full Day</span>
        </button>
        {/* Botón Paquetes */}
        <button
          className={`flex items-center space-x-2 p-2 rounded-lg transition duration-300 ${
            selectedCategory === "Paquetes" ? "bg-gray-800" : "bg-gray-400"
          } hover:bg-custom-orange `}
          onClick={() => handleCategoryClick("Paquetes")}
        >
          <FaSuitcase size={16} />
          <span className="text-sm">Paquetes</span>
        </button>
      </div>
      {/* Renderizado condicional del componente según la categoría seleccionada */}
      {selectedCategory === "Full Day" && <SearchFull />}
      {selectedCategory === "Paquetes" && <SearchPaq />}
      {!selectedCategory && <SearchFull />}
      {/* Carrusel con filtro por categoría */}

      {/* Carrusel con filtro por categoría */}
      <Carousel selectedCategory={selectedCategory} />
    </section>
  );
};

export default HeroSection;
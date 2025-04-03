import { useState } from "react";
import { FaSun, FaSuitcase } from "react-icons/fa";
import SearchFull from "./layout/SearchFull";
import Carousel from "./components/Carrusel";

const HeroSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha seleccionada

  const handleCategoryClick = (category) => {
    // Si la categoría seleccionada es la misma, deselecciona
    if (selectedCategory === category) {
      setSelectedCategory(""); // Deselecciona la categoría
    } else {
      setSelectedCategory(category); // Selecciona la nueva categoría
    }
  };

  return (
    <section className="flex flex-col items-center justify-center p-4 text-white w-full min-h-min">
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

      {/* Campo de búsqueda */}
      <SearchFull
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Carrusel con filtro por categoría, búsqueda y fecha */}
      <Carousel
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        selectedDate={selectedDate}
      />
    </section>
  );
};

export default HeroSection;

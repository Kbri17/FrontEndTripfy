import { useState } from "react";
import { FaSun, FaSuitcase } from "react-icons/fa";
import SearchFull from "./layout/SearchFull";
import SearchPaq from "./layout/SearchPaq"; // Importamos el nuevo componente

const HeroSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Full Day"); // Estado para la categoría seleccionada

  return (
    <section className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white w-full min-h-min">
      {/* Categorías */}
      <div className="flex space-x-4 mb-4">
        {/* Botón Full Day */}
        <button
          className={`flex items-center space-x-2 p-2 rounded-lg transition duration-300 ${
            selectedCategory === "Full Day" ? "bg-gray-500" : "bg-gray-700"
          } hover:bg-custom-orange `}
          onClick={() => setSelectedCategory("Full Day")} // Cambiamos la categoría al hacer clic
        >
          <FaSun size={16} />
          <span className="text-sm">Full Day</span>
        </button>
        {/* Botón Paquetes */}
        <button
          className={`flex items-center space-x-2 p-2 rounded-lg transition duration-300 ${
            selectedCategory === "Paquetes" ? "bg-gray-500" : "bg-gray-700"
          } hover:bg-custom-orange `}
          onClick={() => setSelectedCategory("Paquetes")} // Cambiamos la categoría al hacer clic
        >
          <FaSuitcase size={16} />
          <span className="text-sm">Paquetes</span>
        </button>
      </div>

      {/* Renderizado condicional del componente según la categoría seleccionada */}
      {selectedCategory === "Full Day" && <SearchFull />}
      {selectedCategory === "Paquetes" && <SearchPaq />}
    </section>
  );
};
export default HeroSection;

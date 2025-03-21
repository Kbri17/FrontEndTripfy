import React, { useState } from "react";
import Search from "../layout/Search";
import Carousel from "../components/Carrusel";
import { FaSun, FaSuitcase } from "react-icons/fa";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <nav className="flex items-center justify-center p-4 bg-gray-800 text-white w-full">
        <div className="flex flex-col w-11/12 md:flex-row items-center md:space-x-16">
          <div className="text-lg font-bold mb-2 md:mb-0">Categorias</div>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 mb-2">
            <button className="flex flex-col items-center p-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-white hover:text-blue-500">
              <FaSun size={24} />
              <span className="text-sm">Full Day</span>
            </button>
            <button className="flex flex-col items-center p-2 bg-green-500 text-white rounded-lg transition duration-300 hover:bg-white hover:text-green-500">
              <FaSuitcase size={24} />
              <span className="text-sm">Paquetes</span>
            </button>
          </div>
          <Search onSearch={setSearchQuery} />
        </div>
      </nav>
      <Carousel searchQuery={searchQuery} />
    </div>
  );
};

export default Home;

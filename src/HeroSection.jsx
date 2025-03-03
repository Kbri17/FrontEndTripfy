import React from "react";
import img from "../src/assets/img.png";
import img1 from "../src/assets/img1.jpg.jpg";
import img2 from "../src/assets/img3.jpg.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[700px]">
      {/* Imagen de fondo */}
      <img
        src={img} // Reemplaza con la URL o path de tu imagen
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Capa oscura para mejorar el contraste del texto */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full  w-full text-center px-4">
        <h1 className="text-4xl md:text-4xl text-white font-bold mb-4">
          Conoce nuestras categorias
        </h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-20">
        <div className="relative flex flex-col items-center">
            <img
              src={img1}
              alt="Categoria 1"
              className="h-96 w-72 object-cover rounded-lg"
            />
            <button className="absolute bottom-4 left-4 px-6 py-3 bg-white text-wblue-600 rounded-lg hover:bg-blue-700 transition">
              Full Day
            </button>
          </div>
          <div className="relative flex flex-col items-center">
            <img
              src={img2}
              alt="Categoria 2"
              className="h-96 w-72 object-cover rounded-lg"
            />
            <button className="absolute bottom-4 left-4 px-6 py-3 bg-white text-wblue-600 rounded-lg hover:bg-blue-700 transition">
              Paquetes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import React from "react";
import img from "../src/assets/img.png"

const HeroSection = () => {
  return (
    <section className="w-full">
      <div className="relative h-[700px]">
        {/* Imagen de fondo */}
        <img
          src={img} // Reemplaza con la URL o path de tu imagen
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Capa oscura para mejorar el contraste del texto */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Contenido centrado */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
            Lo que ofrecemos
          </h1>
          <p className="text-lg md:text-2xl text-white">
            Descripción breve de los servicios o productos que ofrecemos.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Descubre más
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

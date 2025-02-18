import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TravelPackageCard from "./Card";
import img from "../assets/img.png";
const Carousel = () => {
  return (
    <div className="py-8">
      {/* Contenedor Grid que maneja filas y columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Fila 1 */}
        <div className="card bg-white p-4 rounded-xl  hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>

        {/* Fila 2 */}
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
        <div className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300">
          <TravelPackageCard image={img} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;

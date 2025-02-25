import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Importa los módulos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TravelPackageCard from "./Card";
import image from "../assets/img.png";
const SwiperCarousel = () => {
  return (
    <div className="py-8 w-8/12 mx-auto">
      <h3 className="text-center font-bold text-2xl">Categorias</h3>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Añade los módulos aquí
        spaceBetween={20}
        slidesPerView={3} // Ajusta este valor según tus necesidades
        navigation={true}
        /* pagination={{ clickable: true }} */
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true} // Asegúrate de que haya suficientes slides para el bucle
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl  hover:scale-105 transition transform duration-300">
            <TravelPackageCard image={image} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl  hover:scale-105 transition transform duration-300">
            <TravelPackageCard image={image} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl  hover:scale-105 transition transform duration-300">
            <TravelPackageCard image={image} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl  hover:scale-105 transition transform duration-300">
            <TravelPackageCard image={image} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TravelPackageCard from "./Card";
import img from "../assets/img.png"

const SwiperCarousel = () => {
  return (
    <div className="py-8">
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        navigation={true}
        loop={true} // Habilita el looping para que las tarjetas se repitan
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {/* Fila 1 */}
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard img ={image} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>

        {/* Fila 2 */}
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
            <TravelPackageCard />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;

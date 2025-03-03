import React,{useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TravelPackageCard from "./Card";
import img from "../assets/img.png";
const Carousel = () => {
  const [destinations, setDestinations] = useState([]);

  const shuffleArray = (array) => {
     for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
     }
     return array;
   };
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/src/data/destinations.json");
        const data = await response.json();
        setDestinations(shuffleArray(data)); 
      } catch (error) {
        console.error("Error al obtener los destinos:", error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="w-10/12 py-8 flex items-center mx-auto justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {destinations.map((item) => (
          <div
            key={item.id}
            className="card bg-white p-4 rounded-xl hover:scale-105 transition transform duration-300"
          >
            <TravelPackageCard
              image={img}
              title={item.title}
              destination={item.destination}
              description={item.description}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

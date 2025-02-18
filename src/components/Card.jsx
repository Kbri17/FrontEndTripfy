import React from "react";

const TravelPackageCard = ({
  image,
  title,
  description,
  price,
  destination,
}) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{destination}</p>
        <p className="text-gray-500 mt-2 text-sm">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-gray-800">{price}</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Ver Paquete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelPackageCard;

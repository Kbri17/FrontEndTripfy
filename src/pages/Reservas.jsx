import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMapMarkerAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const ReservationCard = ({ reservation }) => {
  const { destino, fecha, precio, estado } = reservation;

  return (
    <div className="bg-custom-blue text-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold">{destino}</h2>
      <p className="flex items-center gap-2 mt-2">
        <FontAwesomeIcon icon={faCalendar} className="text-custom-orange" />
        <span className="text-lg">{fecha}</span>
      </p>
      <p className="flex items-center gap-2 mt-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-custom-orange" />
        <span className="text-lg">{destino}</span>
      </p>
      <p className="flex items-center gap-2 mt-2">
        <FontAwesomeIcon icon={faDollarSign} className="text-custom-orange" />
        <span className="text-lg font-semibold">${precio}</span>
      </p>

      <span
        className={`block w-max mt-4 px-4 py-1 text-lg font-semibold rounded ${
          estado === "Confirmado"
            ? "bg-green-500"
            : estado === "Pendiente"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      >
        {estado}
      </span>
    </div>
  );
};

export default ReservationCard;

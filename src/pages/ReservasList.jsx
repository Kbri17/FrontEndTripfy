import React from "react";
import ReservationCard from "./Reservas";

const reservas = [
  {
    destino: "Machu Picchu",
    fecha: "10 Marzo 2025",
    precio: 350,
    estado: "Confirmado",
  },
  {
    destino: "Cancún",
    fecha: "25 Abril 2025",
    precio: 1200,
    estado: "Pendiente",
  },
  {
    destino: "París",
    fecha: "15 Junio 2025",
    precio: 2000,
    estado: "Cancelado",
  },
];

const ReservationsList = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center mt-10">
      {reservas.map((reserva, index) => (
        <ReservationCard key={index} reservation={reserva} />
      ))}
    </div>
  );
};

export default ReservationsList;

import React from "react";
import ReservationCard from "./Reservas";

const reservas = [
  
  {
    destino: "Machu Picchu", 
    fecha: "10 Marzo 2025",
    precio: 350,
    estado: "Confirmado",
  },
];

const ReservationsList = () => {
  // Filtrar solo las reservas confirmadas
  const reservasConfirmadas = reservas.filter(
    (reserva, index, self) =>
      reserva.estado === "Confirmado" &&
      self.findIndex(
        (r) =>
          r.destino === reserva.destino && r.fecha === reserva.fecha
      ) === index
  );

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-10">
      {reservasConfirmadas.map((reserva, index) => (
        <ReservationCard key={index} reservation={reserva} />
      ))}
    </div>
  );
};

export default ReservationsList;

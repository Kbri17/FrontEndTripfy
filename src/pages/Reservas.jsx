import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import stickerCancelada from "../assets/sticker-cancelada.png";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const usuarioId = localStorage.getItem("id");

  useEffect(() => {
    if (!usuarioId) return;
    fetchReservas();
  }, [usuarioId]);

  const fetchReservas = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservas/usuario/${usuarioId}`
      );
      if (!response.ok) {
        throw new Error("No se pudieron obtener las reservas");
      }
      const data = await response.json();

      const reservasUnicas = Array.from(
        new Set(data.map((a) => a.idReserva))
      ).map((idReserva) => {
        return data.find((a) => a.idReserva === idReserva);
      });

      setReservas(reservasUnicas);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  const cancelarReserva = async (idReserva) => {
    const confirmacion = await Swal.fire({
      title: "❌ Cancelar reserva",
      text: "¿Estás seguro de que deseas cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8080/reservas/cancelar/${idReserva}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo cancelar la reserva");
      }

      Swal.fire(
        "✅ Reserva cancelada",
        "Tu reserva ha sido eliminada.",
        "success"
      );

      // Actualizar el estado de las reservas para marcarla como cancelada
      setReservas(
        reservas.map((reserva) =>
          reserva.idReserva === idReserva
            ? { ...reserva, estado: false }
            : reserva
        )
      );
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      Swal.fire("❌ Error", "No se pudo cancelar la reserva", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 ml-4">
      <h1 className="text-3xl font-semibold mb-4 text-justify">
        📅 Mis Reservas
      </h1>
      {reservas.length === 0 ? (
        <p className="text-gray-500 text-center">No tienes reservas activas.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservas.map((reserva) => (
            <div
              key={reserva.idReserva}
              className="max-w-xs border p-4 rounded-lg shadow-md bg-blue-50 hover:shadow-xl transition-shadow duration-300 ease-in-out h-96 flex flex-col justify-between"
            >
              {reserva.tour.imagenes && reserva.tour.imagenes.length > 0 && (
                <img
                  src={reserva.tour.imagenes[0].url}
                  alt="Imagen del Tour"
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-lg font-bold text-center mb-2">
                {reserva.tour.nombre}
              </p>
              <p className="text-gray-600 text-sm">
                🛬 <strong>Llegada:</strong> {reserva.fechaInicio}
              </p>
              <p className="text-gray-600 text-sm">
                🛫 <strong>Salida:</strong> {reserva.fechaFin}
              </p>
              <p className="text-gray-600 text-sm">
                👤 <strong>Personas:</strong> {reserva.cantidadPersonas}
              </p>
              <p className="text-gray-600 text-sm">
                💵 <strong>Precio:</strong> ${reserva.tour.precio}
              </p>
              <p className="text-gray-600 text-sm">
                📍 <strong>Ubicación:</strong> {reserva.tour.ubicacion}
              </p>

              <div className="flex justify-center items-center mt-1 h-14">
                {reserva.estado === "cancelada" || reserva.estado === false ? (
                  <img
                    src={stickerCancelada}
                    alt="Sticker Cancelada"
                    className="w-28 h-28 object-contain"
                  />
                ) : (
                  <button
                    className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-900 border-2 border-white shadow-lg transition-colors duration-300 text-sm"
                    onClick={() => cancelarReserva(reserva.idReserva)}
                  >
                    ❌ Cancelar Reserva
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservas;
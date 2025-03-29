import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [startDate, setStartDate] = useState(null); // Fecha de inicio
  const [endDate, setEndDate] = useState(null); // Fecha de finalización
  const [numPeople, setNumPeople] = useState(1);
  const [fechasOcupadas, setFechasOcupadas] = useState(new Set());

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tour/buscar/${id}`);
        if (!response.ok) {
          throw new Error(`No se encontró el tour con ID ${id}`);
        }
        const data = await response.json();
        setTour(data);
        generarDescripcion(data.nombre);
      } catch (error) {
        console.error("Error al obtener los detalles:", error);
        navigate("/");
      }

      const fetchFechasOcupadas = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/reservas/fechas/${id}`
          );
          if (response.status === 204) {
            setFechasOcupadas(new Set()); // No hay reservas
            return;
          }
          if (!response.ok) {
            throw new Error("Error al obtener las fechas ocupadas");
          }
          const data = await response.json();
          setFechasOcupadas(
            new Set(
              data.map((fecha) => new Date(fecha).toISOString().split("T")[0])
            )
          );
        } catch (error) {
          console.error("Error al obtener las fechas ocupadas:", error);
        }
      };

      // Llamar a la función después de obtener el tour
      fetchFechasOcupadas();
    };

    fetchTour();
  }, [id, navigate]);

  const generarDescripcion = (titulo) => {
    setDescripcion(`🌍 ¡Embárcate en una aventura inolvidable en ${titulo}! ✈️  

      Descubre los encantos de **${titulo}** con nuestro tour exclusivo, diseñado para brindarte una experiencia única e inolvidable. Desde el momento en que comiences tu viaje, te sumergirás en la cultura, la historia y la belleza de este maravilloso destino.  

      ✨ **¿Qué incluye nuestro tour?**  
      ✅ Visitas guiadas a los principales lugares turísticos 🏛️  
      ✅ Transporte cómodo y seguro 🚍  
      ✅ Acompañamiento de guías expertos 📜  
      ✅ Experiencias auténticas y actividades exclusivas 🎭  
      ✅ Tiempo libre para explorar y disfrutar a tu ritmo 🛍️  

      Cada día será una oportunidad para descubrir algo nuevo: desde los monumentos más emblemáticos hasta rincones escondidos llenos de historia y encanto. Sumérgete en la gastronomía local, déjate sorprender por la arquitectura impresionante y captura momentos que recordarás para siempre.  

      🔥 **¡No dejes pasar esta oportunidad!** 🔥  
      Reserva ahora y vive una experiencia que cambiará tu forma de viajar. 🌟  

      📅 **Cupos limitados** – ¡Asegura tu lugar hoy mismo!`);
  };

  const formatDescripcion = (descripcion) => {
    return descripcion.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const highlightWithRed = (date) => {
    return fechasOcupadas.has(date.toISOString().split("T")[0])
      ? "occupied-date"
      : undefined;
  };

  const isDateDisabled = (date) => {
    // Si la fecha está en fechasOcupadas, devuelve false para deshabilitarla
    return !fechasOcupadas.has(date.toISOString().split("T")[0]);
  };

  if (!tour) return <p>Cargando detalles...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="back-arrow text-right mb-4" onClick={() => navigate(-1)}>
        <span className="cursor-pointer text-blue-500">&larr; Volver</span>
      </div>

      <div className="product-title mb-4 flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-custom-blue">
          {tour.nombre}
        </h1>
        <div className="flex gap-4">
          <button className="text-gray-700 hover:text-gray-900 text-lg">
            📤 Compartir
          </button>
          <button className="text-gray-700 hover:text-gray-900 text-lg">
            🧡 Favoritos
          </button>
        </div>
      </div>

      <div className="product-body flex gap-6">
        <div className="image-container w-full flex gap-6 rounded-lg overflow-hidden bg-white shadow-lg p-4">
          <div className="main-image w-1/2 rounded-lg overflow-hidden h-[400px]">
            <img
              src={tour.imagenes[0]?.url || "ruta_por_defecto.jpg"}
              alt="Imagen principal"
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="secondary-images w-1/2 grid grid-cols-2 grid-rows-2 gap-2 rounded-lg overflow-hidden h-[400px]">
            {tour.imagenes.slice(1, 5).map((imagen, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden h-full w-full flex"
              >
                <img
                  src={imagen.url}
                  alt={`Imagen ${index + 2}`}
                  className="w-full h-full object-cover rounded-xl shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="see-more text-right mt-3">
        <a
          href={`/galeria/${id}`}
          className="text-white bg-gray-800 px-4 py-1 rounded-full font-semibold hover:bg-gray-900 transition duration-300 shadow-lg inline-block text-xs"
        >
          📷 Ver más
        </a>
      </div>
      {/* <Link to={`/Galeria/${id}`} className="text-white bg-gray-800 px-4 py-1 rounded-full font-semibold hover:bg-gray-900 transition duration-300 shadow-lg inline-block text-xs">
  📷 Mostrar todas las fotos
</Link> */}

      <div className="reservation-container flex gap-6 mt-6">
        <div className="product-description w-1/2">
          <h2 className="text-xl font-bold mb-2">¿Qué te ofrecemos?</h2>
          {formatDescripcion(descripcion)}
        </div>

        <div className="w-1/3 ml-auto">
          <div className="calendar-container sticky top-0 flex flex-col items-center border rounded-lg shadow-lg p-2 bg-white">
            <div className="tour-price text-2xl font-bold text-black mb-2">
              ${tour.precio}{" "}
              <span className="text-sm font-normal">por persona</span>
            </div>

            <div className="border border-gray-300 rounded-lg p-3 mb-3 w-full">
              <div className="flex justify-between text-sm font-medium mb-2">
                <div>
                  <label className="block text-gray-600">LLEGADA</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full border-none text-black font-semibold"
                    placeholderText="Seleccionar fecha"
                    minDate={new Date()}
                    filterDate={isDateDisabled}
                    dayClassName={highlightWithRed}
                  />
                </div>

                <div>
                  <label className="block text-gray-600">SALIDA</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="w-full border-none text-black font-semibold"
                    placeholderText="Seleccionar fecha"
                    minDate={startDate}
                    filterDate={isDateDisabled}
                    dayClassName={highlightWithRed}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-gray-600">PERSONAS</label>
                <select
                  value={numPeople}
                  onChange={(e) => setNumPeople(e.target.value)}
                  className="w-full border-none text-black font-semibold cursor-pointer"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="w-full bg-[#F18F01] text-white text-lg py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
              onClick={() => {
                const isLoggedIn = JSON.parse(
                  localStorage.getItem("isLoggedIn") || "true"
                );

                if (!isLoggedIn) {
                  navigate("/login");
                  return;
                }

                // Validar que el usuario haya seleccionado ambas fechas
                if (!startDate || !endDate) {
                  Swal.fire({
                    title: "⚠️ Selecciona las fechas",
                    text: "Debes elegir una fecha de llegada y salida antes de continuar.",
                    icon: "warning",
                    confirmButtonColor: "#F18F01",
                    confirmButtonText: "Entendido",
                  });
                  return;
                }

                const fechaLlegada = startDate.toLocaleDateString();
                const fechaSalida = endDate.toLocaleDateString();
                const personas = numPeople;
                const nombreTour = tour.nombre; 

                Swal.fire({
                  title: "📅 Confirmación de Reserva",
                  html: `
        <h2 style="font-size: 1.2rem; font-weight: bold; color: #F18F01;">🌍 ${nombreTour}</h2>
        <p><strong>🛬 Llegada:</strong> ${fechaLlegada}</p>
        <p><strong> 🛫Salida:</strong> ${fechaSalida}</p>
        <p><strong>👤 Número de personas:</strong> ${personas}</p>
        <p style="margin-top: 10px;">¿Deseas confirmar la reserva?</p>
      `,
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#F18F01",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "✅ Confirmar",
                  cancelButtonText: "❌ Cancelar",
                  background: "#fff",
                  customClass: {
                    popup: "rounded-lg shadow-lg",
                    title: "font-bold text-lg",
                  },
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire(
                      "🎉 ¡Reserva confirmada!",
                      `Tu reserva para ${nombreTour} ha sido registrada con éxito.`,
                      "success"
                    );
                  } else {
                    Swal.fire(
                      "❌ Reserva cancelada",
                      "No se ha realizado ninguna reserva.",
                      "error"
                    );
                  }
                });
              }}
            >
              Reserva
            </button>

            <p className="text-center text-gray-500 text-sm mt-2">
              No se hará ningún cargo por el momento
            </p>

            <div className="map-container w-full ml-auto mt-4">
              <iframe
                width="100%"
                height="300"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                className="rounded-lg shadow-lg"
                src={`https://www.google.com/maps?q=${tour.ubicacion}&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

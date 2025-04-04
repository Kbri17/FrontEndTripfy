import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";



const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [startDate, setStartDate] = useState(null); // Fecha de inicio
  const [endDate, setEndDate] = useState(null); // Fecha de finalización
  const [numPeople, setNumPeople] = useState(1);
  const [fechasOcupadas, setFechasOcupadas] = useState(new Set());
 
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${API_URL}/tour/buscar/${id}`);
        if (!response.ok) {
          throw new Error("No se encontró el tour con ID ${id}");
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
          const response = await fetch(`${API_URL}/reservas/fechas/${id}`);
          if (response.status === 204) {
            setFechasOcupadas(new Set()); // No hay reservas
            return;
          }

          if (!response.ok) {
            throw new Error("Error al obtener las fechas ocupadas");
          }

          const data = await response.json();

          console.log("Reservas recibidas del backend:", data); // Depuración

          // Procesar las fechas ocupadas con validaciones
          const fechasOcupadasArray = obtenerFechasOcupadas(data);

          setFechasOcupadas(new Set(fechasOcupadasArray));
        } catch (error) {
          console.error("Error al obtener las fechas ocupadas:", error);
        }
      };

      function obtenerFechasOcupadas(reservas) {
        const fechasOcupadas = new Set();

        reservas.forEach(({ fechaInicio, fechaFin }) => {
          let inicio = new Date(fechaInicio);
          let fin = new Date(fechaFin);

          if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
            console.warn("Fecha inválida detectada:", {
              fechaInicio,
              fechaFin,
            });
            return; // Saltar fechas inválidas
          }

          // Asegurar que fechaInicio es menor o igual a fechaFin
          if (inicio > fin) {
            console.warn("Corrigiendo fecha invertida:", {
              fechaInicio,
              fechaFin,
            });
            [inicio, fin] = [fin, inicio]; // Intercambiar valores
          }

          while (inicio <= fin) {
            fechasOcupadas.add(inicio.toISOString().split("T")[0]); // Formato YYYY-MM-DD
            inicio.setDate(inicio.getDate() + 1);
          }
        });

        return Array.from(fechasOcupadas).sort();
      }

      // Llamar a la función después de obtener el tour
      fetchFechasOcupadas();
    };

    fetchTour();
  }, [id, navigate]);

  const generarDescripcion = (titulo) => {
    setDescripcion(`🌍 ¡Embárcate en una aventura inolvidable en ${titulo}! ✈️  

      Descubre los encantos de ${titulo} con nuestro tour exclusivo, diseñado para brindarte una experiencia única e inolvidable. Desde el momento en que comiences tu viaje, te sumergirás en la cultura, la historia y la belleza de este maravilloso destino.  

      ✨ ¿Qué incluye nuestro tour?
      ✅ Visitas guiadas a los principales lugares turísticos 🏛️  
      ✅ Transporte cómodo y seguro 🚍  
      ✅ Acompañamiento de guías expertos 📜  
      ✅ Experiencias auténticas y actividades exclusivas 🎭  
      ✅ Tiempo libre para explorar y disfrutar a tu ritmo 🛍️  

      Cada día será una oportunidad para descubrir algo nuevo: desde los monumentos más emblemáticos hasta rincones escondidos llenos de historia y encanto. Sumérgete en la gastronomía local, déjate sorprender por la arquitectura impresionante y captura momentos que recordarás para siempre.  

      🔥 ¡No dejes pasar esta oportunidad! 🔥  
      Reserva ahora y vive una experiencia que cambiará tu forma de viajar. 🌟  

      📅 Cupos limitados – ¡Asegura tu lugar hoy mismo!`);
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
    const formattedDate = date.toISOString().split("T")[0];
    return fechasOcupadas.has(formattedDate) ? "bg-red-500 text-white" : "";
  };

  const isDateDisabled = (date) => {
    // Si la fecha está en fechasOcupadas, devuelve false para deshabilitarla
    return !fechasOcupadas.has(date.toISOString().split("T")[0]);
  };

  if (!tour) return <p>Cargando detalles...</p>;

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(`¡Mira este tour: ${tour.nombre}!`);

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
        <div className="flex gap-4">
  <button className="text-gray-700 hover:text-gray-900 text-lg">
    
      <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                <FaFacebook className="inline-block text-blue-600 text-2xl" />
              </a>
  </button>
  <button className="text-gray-700 hover:text-gray-900 text-lg">
  
    
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                <FaTwitter className="inline-block text-blue-400 text-2xl" />
              </a>
  </button>
  <button className="text-gray-700 hover:text-gray-900 text-lg">
 
       <a
                href={`https://wa.me/?text=${shareText} ${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                  <FaWhatsapp className="inline-block text-green-500 text-2xl" />
              </a>
  </button>

</div>
          
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
      {/* <Link to={/Galeria/${id}} className="text-white bg-gray-800 px-4 py-1 rounded-full font-semibold hover:bg-gray-900 transition duration-300 shadow-lg inline-block text-xs">
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
                    filterDate={isDateDisabled} // Bloquea fechas ocupadas
                    dayClassName={highlightWithRed} // Resalta en rojo las fechas ocupadas
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
              onClick={async () => {
                const isLoggedIn =
                  localStorage.getItem("isLoggedIn") === "true";

                console.log("Estado de sesión:", isLoggedIn);

                if (!isLoggedIn) {
                  Swal.fire({
                    title: "🔒 Acceso restringido",
                    text: "Para reservar debes iniciar sesión.",
                    icon: "warning",
                    confirmButtonColor: "#F18F01",
                    confirmButtonText: "Iniciar sesión",
                  }).then(() => {
                    navigate("/login");
                  });
                  return;
                }

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

                const fechaLlegada = startDate.toISOString().split("T")[0];
                const fechaSalida = endDate.toISOString().split("T")[0];
                const personas = numPeople;
                const nombreTour = tour.nombre;
                const tourId = tour?.idTour;
                const usuarioId = parseInt(localStorage.getItem("id"));

                if (!tourId) {
                  Swal.fire(
                    "❌ Error",
                    "El ID del tour no es válido.",
                    "error"
                  );
                  return;
                }

                const confirmacion = await Swal.fire({
                  title: "📅 Confirmación de Reserva",
                  html: `
        <h2 style="font-size: 1.2rem; font-weight: bold; color: #F18F01;">🌍 ${nombreTour}</h2>
        <p><strong>🛬 Llegada:</strong> ${fechaLlegada}</p>
        <p><strong> 🛫 Salida:</strong> ${fechaSalida}</p>
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
                });

                if (!confirmacion.isConfirmed) {
                  Swal.fire(
                    "❌ Reserva cancelada",
                    "No se ha realizado ninguna reserva.",
                    "error"
                  );
                  return;
                }

                const reservaData = {
                  usuario: { idUsuario: usuarioId },
                  tour: { idTour: parseInt(tourId) },
                  nombreTour: nombreTour,
                  fechaReserva: new Date().toISOString().split("T")[0],
                  fechaInicio: fechaLlegada,
                  fechaFin: fechaSalida,
                  cantidadPersonas: personas,
                  estadoReserva: 1,
                  estado: true,
                  calificacion: null,
                  comentarios: "",
                };

                console.log("Enviando datos de reserva:", reservaData);

                try {
                  const response = await fetch(
                    `${API_URL}/reservas/guardar`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(reservaData),
                    }
                  );

                  if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error al crear la reserva:", errorData);
                    Swal.fire(
                      "❌ Error",
                      `Hubo un problema al realizar la reserva. Detalles: ${
                        errorData.message || "No se pudo completar la reserva"
                      }`,
                      "error"
                    );
                    return;
                  }

                  Swal.fire(
                    "🎉 ¡Reserva confirmada!",
                    `Tu reserva para ${nombreTour} ha sido registrada con éxito.`,
                    "success"
                  ).then(() => {
                    navigate("/reservas");
                  });
                } catch (error) {
                  console.error("Error en la solicitud:", error);
                  Swal.fire(
                    "❌ Error",
                    "Hubo un error en la solicitud. Intenta nuevamente.",
                    "error"
                  );
                }
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

      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">📜 Políticas del Producto</h2>
        <ul className="list-disc pl-5">
          <li>
            Cancelación gratuita hasta 48 horas antes del inicio del tour.
          </li>
          <li>
            Se requiere una identificación válida al momento del check-in.
          </li>
          <li>Los menores de edad deben estar acompañados por un adulto.</li>
          <li>
            No se permiten cambios de fecha dentro de las 24 horas previas al
            tour.
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold">⭐ Califica este Producto</h2>
        <div className="flex justify-center mt-2">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  className="cursor-pointer"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        {rating && (
          <p className="mt-2 text-lg">Has calificado con {rating} estrellas.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

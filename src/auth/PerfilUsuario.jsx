import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth"; // ✅ Asegúrate de que esta ruta es correcta

const PerfilUser = () => {
  const [view, setView] = useState(null);
  const { loadUser, user, error, loading } = useAuth();
  const [usuario, setUsuario] = useState({
    correo: "",
    contrasenia: "",
    nombre: "",
    apellido: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:8080/user/buscar/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) setUsuario({ ...data, idUsuario: userId });
          else setError("No se encontró el usuario.");
        })
        .catch((err) => setError("Error al obtener usuario: " + err.message))
        .finally(() => setLoading(false));
    } else {
      setError("No hay usuario en localStorage.");
      setLoading(false);
    }
  }, []);

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      console.log("Usuario ID:", userId);
      if (!userId) {
        alert("No hay usuario en sesión.");
        return;
      }

      const usuarioActualizado = { ...usuario, idUsuario: userId };
      const response = await fetch("http://localhost:8080/user/modificar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioActualizado),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      alert("Usuario actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Hubo un problema al actualizar los datos.");
    }
  };

  const fetchReservas = () => {
    setReservas([
      { id: 1, fecha: "2025-03-06", destino: "Lima", precio: "$100" },
      { id: 2, fecha: "2025-03-10", destino: "Cusco", precio: "$200" },
    ]);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/4 bg-white shadow-lg p-6 rounded-r-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Menú</h2>
        <button
          onClick={() => setView("actualizar")}
          className="block w-full text-left p-3 mb-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Actualizar Datos
        </button>
        <button
          onClick={() => {
            setView("reservas");
            fetchReservas();
          }}
          className="block w-full text-left p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Ver Reservas
        </button>
      </div>
      <div className="w-3/4 p-8 flex justify-center items-start">
        {view === "actualizar" && (
          <div className="bg-white p-6 rounded-lg shadow-md w-4/5 h-4/5">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Actualizar Perfil
            </h2>
            <form onSubmit={handleSubmit}>
              {["nombre", "apellido", "correo", "contrasenia"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "contrasenia" ? "password" : "text"}
                    name={field}
                    value={usuario[field] || ""}
                    onChange={handleChangeUser}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        )}
        {view === "reservas" && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Mis Reservas</h2>
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Destino</th>
                  <th className="p-3">Precio</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id} className="border-b hover:bg-gray-100">
                    <td className="p-3 text-center">{reserva.fecha}</td>
                    <td className="p-3 text-center">{reserva.destino}</td>
                    <td className="p-3 text-center font-semibold">{reserva.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilUser;



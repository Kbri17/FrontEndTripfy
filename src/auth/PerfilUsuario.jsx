import React, { useState, useEffect } from "react";
import { actualizarUsuario, obtenerUsuarioPorId } from "./actions/UsuarioAction";

const PerfilUser = () => {
  const [usuario, setUsuario] = useState({
    correo: "",
    contrasenia: "",
    nombre: "",
    apellido: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("UserId en localStorage:", userId); // 👀 Verifica qué ID está guardado
  
    if (userId) {
      obtenerUsuarioPorId(userId)
        .then((data) => {
          console.log("Usuario obtenido:", data); // 👀 Verifica los datos recibidos
          if (data) {
            setUsuario(data);
          } else {
            setError("No se encontró el usuario.");
          }
        })
        .catch((err) => setError("Error al obtener usuario: " + err.message))
        .finally(() => setLoading(false));
    } else {
      setError("No hay usuario en localStorage.");
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("No hay ID de usuario en localStorage");
        return;
      }

      const res = await actualizarUsuario(userId, usuario);
      console.log("Usuario actualizado con éxito:", res);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 text-sm font-semibold mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre || ""}
            onChange={handleChangeUser}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu nombre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-gray-700 text-sm font-semibold mb-2">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={usuario.apellido || ""}
            onChange={handleChangeUser}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu apellido"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={usuario.correo || ""}
            onChange={handleChangeUser}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contrasenia" className="block text-gray-700 text-sm font-semibold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="contrasenia"
            name="contrasenia"
            value={usuario.contrasenia || ""}
            onChange={handleChangeUser}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu contraseña"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerfilUser;

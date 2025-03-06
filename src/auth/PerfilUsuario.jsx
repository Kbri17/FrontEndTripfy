import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

const PerfilUser = () => {
  const { loadUser, user, error, loading } = useAuth();
  const [usuario, setUsuario] = useState({
    correo: "",
    contrasenia: "",
    nombre: "",
    apellido: "",
  });

  useEffect(() => {
    loadUser(); // Cargar datos del usuario al montar el componente
  }, []);

  useEffect(() => {
    if (user) {
      setUsuario({
        correo: user.email || "",
        contrasenia: "", // No mostrar la contraseña por seguridad
        nombre: user.name || "",
        apellido: user.apellido || "",
      });
    }
  }, [user]);

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <p className="text-center text-blue-500">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-6 mb-6">
      <h3 className="text-center font-bold text-2xl">Actualizar datos</h3>
      <form>
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChangeUser}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu nombre"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="apellido"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChangeUser}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu apellido"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="correo"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={usuario.correo}
            onChange={handleChangeUser}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contrasenia"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasenia"
            name="contrasenia"
            value={usuario.contrasenia}
            onChange={handleChangeUser}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu nueva contraseña"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Actualizar Perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerfilUser;

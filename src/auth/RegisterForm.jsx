import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "./actions/UsuarioAction";
import Success from "../alerts/Succes";

const RegisterForm = () => {
  const [usuario, setUsuario] = useState({
    correo: "",
    contrasenia: "",
    nombre: "",
    apellido: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica para enviar el formulario
    registrarUsuario(usuario).then((res) => {
      console.log("Se registro usuario", res);
      if (res.idUsuario) {
        localStorage.setItem("userId", res.idUsuario); // Guardamos el ID en localStorage
        console.log("ID guardado en localStorage:", res.idUsuario);
        Success();
        navigate("/login");
      }
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-12 mb-6">
      <h3 className="text-center font-bold text-2xl">Registrarse</h3>
      <form onSubmit={handleSubmit}>
        {/* Campo de Nombre */}
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
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu nombre"
          />
        </div>
        {/* Campo de Apellido */}
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
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu apellido"
          />
        </div>
        {/* Campo de correo */}
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
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu email"
          />
        </div>

        {/* Campo de Contraseña */}
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
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu contraseña"
          />
        </div>

        {/* Botón de Enviar */}
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

export default RegisterForm;

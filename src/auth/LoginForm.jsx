import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const LoginForm = () => {
  const [usuario, setUsuario] = useState({ username: "", contrasenia: "" });
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();
  const [localError, setLocalError] = useState(error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login(usuario); // Hace la petición al backend
      console.log("Respuesta del backend:", response); // Verifica la estructura de response
  
      // Validar si la autenticación fue exitosa
      if (!response.token) {
        throw new Error(response.message || "Error en la autenticación");
      }
  
      // Guardar token y datos del usuario en localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.userResponse));
  
      // Obtener el rol del usuario
      const userRole = response.userResponse?.role;
      console.log("El rol de usuario es:", userRole);
  
      // Redirigir según el rol del usuario
      if (userRole === "ADMIN") {
        navigate("/administracion");
      } else {
        navigate("/perfil");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setLocalError(err.message);
    }
  };
  
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-10/12 md:max-w-lg mx-auto mt-24 md:mt-12">
      <h3 className="text-center font-bold text-2xl">Iniciar sesión</h3>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Usuario */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={usuario.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu usuario"
          />
        </div>

        {/* Contraseña */}
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

        {/* Botón de Login */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-custom-blue hover:bg-blue-600"
            }`}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

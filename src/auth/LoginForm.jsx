import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const LoginForm = () => {
  const [usuario, setUsuario] = useState({ email: "", contrasenia: "" });
  const navigate = useNavigate();
  const { login, error, loading, loadUser } = useAuth();
  const [localError, setLocalError] = useState(error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login(usuario);
      console.log("Respuesta de login:", response);
      if (!response.token) {
        throw new Error(response.message || "Error en la autenticación");
      }
  
      // 🔹 Guardar estado de sesión en localStorage
      localStorage.setItem("isLoggedIn", "true");
  
      await loadUser();
      const userRole = response.userResponse.role;
      localStorage.setItem("rol", userRole);
      console.log("Rol es:", userRole)
      if (userRole === "ADMIN") {
        navigate("/administracion");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setLocalError(err.message || "Error desconocido");
    }
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-10/12 md:max-w-lg mx-auto mt-24 md:mt-12">
      <h3 className="text-center font-bold text-2xl">Iniciar sesión</h3>
      {error && (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-center shadow-md mt-2 mb-2">
          {error.error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email" // ✅ Asegurar que el name es "email"
            value={usuario.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu correo"
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

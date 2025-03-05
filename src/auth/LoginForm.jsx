import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../auth/actions/UsuarioAction"; // Importamos la función

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", contrasenia: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError(null);
   setLoading(true);

   try {
     const response = await iniciarSesion(formData);
    
     // Verifica que response.data exista
     if (!response.userResponse || !response.token) {
       throw new Error("Respuesta del servidor inválida");
     }
    localStorage.setItem("user", JSON.stringify(response.userResponse));
    localStorage.setItem("userId", JSON.stringify(response.userResponse.id));
     // Guardar token y usuario en localStorage
    /*  localStorage.setItem("token", response.data.token);
     localStorage.setItem("user", JSON.stringify(response.data.userResponse));

     console.log("Usuario autenticado:", response.data); */

     // Redirigir al perfil
     navigate("/perfil");
   } catch (err) {
     console.error("Error en la autenticación:", err);
     setError(err.response?.data?.message || "Credenciales incorrectas");
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-28">
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
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu usuario"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasenia"
            name="contrasenia"
            value={formData.contrasenia}
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
                : "bg-blue-500 hover:bg-blue-600"
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

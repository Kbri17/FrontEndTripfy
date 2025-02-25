import React, {useState} from "react";
import Success from "../alerts/Succes";

const LoginForm =()=>{
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí va la lógica para enviar el formulario
      console.log(formData);
    };

    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-28">
        <h3 className="text-center font-bold text-2xl">Iniciar sesión</h3>
        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu email"
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
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
              Log in
            </button>
          </div>
        </form>
      </div>
    );
}

export default LoginForm
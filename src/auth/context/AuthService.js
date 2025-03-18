import requestGenerico from "../../services/HttpCliente";
import { useNavigate } from "react-router-dom";



export const authService = {

  // Registro de usuario
  async register(usuario) {
    try {
      const response = await requestGenerico.post("/auth/register", usuario);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Inicio de sesión
  async login(credenciales) {
    try {
      const response = await requestGenerico.post("/auth/login", credenciales);

      // Guardar token y usuario en localStorage
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.userResponse));
        
      }

      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener usuario por ID
  async getUserById(userId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token en localStorage");
      }

      const response = await requestGenerico.get(`/user/buscar/${userId}`);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar usuario
  async updateUser(id, usuarioActualizado) {
    try {
      const response = await requestGenerico.put(
        `/user/actualizar/${id}`,
        usuarioActualizado
      );
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  // Cerrar sesión
  async logout() {
    // const navigate = useNavigate();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // navigate("/");
  },


};
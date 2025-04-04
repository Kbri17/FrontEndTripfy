import requestGenerico from "../../services/HttpCliente";
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
        localStorage.setItem("id", JSON.stringify(response.userResponse.id));
        
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
  // // Cerrar sesión
  // async logout() {
  //   // const navigate = useNavigate();
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   // navigate("/");
  // },
// Cerrar sesión
async logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("id");  
  localStorage.removeItem("rol"); 
  localStorage.removeItem("isLoggedIn"); // Asegurar que se borre el estado de sesión
},

//Guardar reservas 
async saveReservation(reserva) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay sesión activa");
    }

    const response = await requestGenerico.post("/reservas/guardar", reserva);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},
};
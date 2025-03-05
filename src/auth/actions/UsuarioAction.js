import requestGenerico from "../../services/HttpCliente";
import axios from "axios";

export const registrarUsuario = async (usuario) => {
  try {
    const response = await requestGenerico.post("/auth/register", usuario);
    console.log("Respuesta del servidor:", response);
    return response;
  } catch (error) {
    console.error(
      "Error al registrar usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const obtenerUsuarioPorId = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // Asegúrate de que el token esté guardado
    if (!token) {
      console.error("No hay token en localStorage");
      return null;
    }

    const response = await axios.get(`http://localhost:8080/user/buscar/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de que tu backend usa 'Bearer'
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
};


export const actualizarUsuario = async (id, usuario) => {
  try {
    const response = await requestGenerico.put(
      `/user/actualizar/${id}`,
      usuarioActualizado
    );
    return response;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
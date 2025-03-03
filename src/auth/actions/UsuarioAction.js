import requestGenerico from "../../services/HttpCliente";

export const registrarUsuario = async (usuario) => {
  try {
    const response = await requestGenerico.post("/user/guardar", usuario);
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

export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await requestGenerico.get(`/user/buscar/${id}`);
    return response;
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
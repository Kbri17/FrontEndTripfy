import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Función para cargar el usuario al inicio
    const cargarUsuario = () => {
      try {
        // Recuperar datos del usuario desde localStorage
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        // Verificar si existen tanto usuario como token
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);

          // Normalizar el objeto de usuario
          const normalizedUser = {
            id: parsedUser.id || parsedUser.idUsuario,
            name: parsedUser.name || parsedUser.nombre,
            email: parsedUser.email || parsedUser.correo,
          };

          // Establecer el usuario y terminar la carga
          setUsuario(normalizedUser);
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      } finally {
        // Asegurar que el estado de carga se detenga
        setCargando(false);
      }
    };

    // Llamar a la función de carga
    cargarUsuario();
  }, []); // Array de dependencias vacío para que solo se ejecute una vez al montar

  const login = (userData, token) => {
    // Normalizar el objeto de usuario
    const normalizedUser = {
      id: userData.id || userData.idUsuario,
      name: userData.name || userData.nombre,
      email: userData.email || userData.correo,
    };

    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);

    // Actualizar estado
    setUsuario(normalizedUser);
    setCargando(false);
  };

  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Restablecer estado
    setUsuario(null);
    setCargando(false);
  };

  // Valores a proveer en el contexto
  const value = {
    usuario,
    login,
    logout,
    cargando,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

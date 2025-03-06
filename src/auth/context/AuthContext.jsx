import React, { createContext, useReducer, useEffect } from "react";
import { authReducer, initialState } from "./AuthReducer";
import { authActions } from "./AuthActions";

// Crear contexto
export const AuthContext = createContext();

// Proveedor de contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Acciones vinculadas al dispatch
  const boundActions = {
    register: authActions.register(dispatch),
    login: authActions.login(dispatch),
    logout: authActions.logout(dispatch),
    loadUser: authActions.loadUser(dispatch),
    setError: authActions.setError(dispatch),
    clearError: authActions.clearError(dispatch),
  };

  // Cargar usuario al iniciar
  useEffect(() => {
    boundActions.loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, ...boundActions }}>
      {children}
    </AuthContext.Provider>
  );
};

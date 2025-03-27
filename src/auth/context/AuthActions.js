import { authService } from "./AuthService";

// Tipos de acciones
export const AuthActionTypes = {
  REGISTER_START: "REGISTER_START",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",

  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  LOGOUT: "LOGOUT",

  LOAD_USER: "LOAD_USER",

  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Creadores de acciones
export const authActions = {
  // Acción de registro
  register: (dispatch) => async (usuario) => {
    dispatch({ type: AuthActionTypes.REGISTER_START });

    try {
      const userData = await authService.register(usuario);
      dispatch({
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: userData,
      });
      return userData;
    } catch (error) {
      dispatch({
        type: AuthActionTypes.REGISTER_FAILURE,
        payload: error,
      });
      throw error;
    }
  },

  // Acción de inicio de sesión
  login: (dispatch) => async (credenciales) => {
    dispatch({ type: AuthActionTypes.LOGIN_START });

    try {
      const userData = await authService.login(credenciales);
      console.log( "data desde metodo login" + userData);
      
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: userData,
      });
      return userData;
    } catch (error) {
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: error,
      });
      throw error;
    }
  },

  // Acción de cierre de sesión
  logout: (dispatch) => () => {
    authService.logout();
    dispatch({ type: AuthActionTypes.LOGOUT });
  },

  // Cargar usuario desde localStorage
  loadUser: (dispatch) => () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch({
        type: AuthActionTypes.LOAD_USER,
        payload: { user, token },
      });
    }
  },

  // Establecer error
  setError: (dispatch) => (error) => {
    dispatch({
      type: AuthActionTypes.SET_ERROR,
      payload: error,
    });
  },

  // Limpiar error
  clearError: (dispatch) => () => {
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });
  },
};

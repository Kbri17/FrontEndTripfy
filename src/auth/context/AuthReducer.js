import { AuthActionTypes } from "./AuthActions";

// Estado inicial
export const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    // Acciones de registro
    case AuthActionTypes.REGISTER_START:
      return { ...state, loading: true, error: null };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Acciones de login
    case AuthActionTypes.LOGIN_START:
      return { ...state, loading: true, error: null };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Acciones de logout
    case AuthActionTypes.LOGOUT:
      return {
        ...initialState,
      };

    // Cargar usuario
    case AuthActionTypes.LOAD_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    // Manejo de errores
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

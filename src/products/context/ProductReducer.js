import { ProductActionTypes } from "./ProductActions";


export const initialState = {
  products: [],
  error: null,
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case ProductActionTypes.LOAD_PRODUCTS:
      return { ...state, products: action.payload };

    case ProductActionTypes.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case ProductActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p.idTour=== action.payload.id ? action.payload : p
        ),
      };

    case ProductActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.idTour !== action.payload),
      };

    case ProductActionTypes.SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

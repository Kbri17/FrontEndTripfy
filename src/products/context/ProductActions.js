import { productService } from "./ProductService";

export const ProductActionTypes = {
  LOAD_PRODUCTS: "LOAD_PRODUCTS",
  ADD_PRODUCT: "ADD_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  SET_ERROR: "SET_ERROR",
};


export const productActions = {
  loadProducts: (dispatch) => async () => {
    try {
      const products = await productService.getAllProducts();
      dispatch({ type: ProductActionTypes.LOAD_PRODUCTS, payload: products });
    } catch (error) {
      dispatch({ type: ProductActionTypes.SET_ERROR, payload: error });
    }
  },

  addProduct: (dispatch) => async (product) => {
    try {
      const newProduct = await productService.addProduct(product);
      dispatch({ type: ProductActionTypes.ADD_PRODUCT, payload: newProduct });
    } catch (error) {
      dispatch({ type: ProductActionTypes.SET_ERROR, payload: error });
    }
  },

  updateProduct: (dispatch) => async (id, product) => {
    try {
      const updatedProduct = await productService.updateProduct(id, product);
      dispatch({
        type: ProductActionTypes.UPDATE_PRODUCT,
        payload: updatedProduct,
      });
    } catch (error) {
      dispatch({ type: ProductActionTypes.SET_ERROR, payload: error });
    }
  },

  deleteProduct: (dispatch) => async (id) => {
    try {
      await productService.deleteProduct(id);
      dispatch({ type: ProductActionTypes.DELETE_PRODUCT, payload: id });
    } catch (error) {
      dispatch({ type: ProductActionTypes.SET_ERROR, payload: error });
    }
  },
};
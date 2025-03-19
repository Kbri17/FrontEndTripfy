import React, { createContext, useReducer, useEffect } from "react";
import { productReducer, initialState } from "./ProductReducer";
import { productActions } from "./ProductActions";

export const ProductContext = createContext();

export const ProductProvider = ({ children})=>{
    const [state , dispatch] = useReducer(productReducer, initialState);

    const boundActions = {
      loadProducts: productActions.loadProducts(dispatch),
      addProduct: productActions.addProduct(dispatch),
      updateProduct: productActions.updateProduct(dispatch),
      deleteProduct: productActions.deleteProduct(dispatch),
    };
    useEffect(() => {
      boundActions.loadProducts();
    }, []);
     return (
       <ProductContext.Provider value={{ ...state, ...boundActions }}>
         {children}
       </ProductContext.Provider>
     );
}
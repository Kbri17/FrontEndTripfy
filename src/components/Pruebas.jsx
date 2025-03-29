import React, { useEffect, useState } from "react";
import { productService } from "../products/context/ProductService";

const Pruebas = ()=>{
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                console.log("Productos recibidos:", data);
                setProducts(data); // Almacenar productos en el estado
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProducts();
    }, []);
    return (
      <div>
        <h2>Lista de Productos</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.nombre}</li>
          ))}
        </ul>
      </div>
    );
}
export default Pruebas;
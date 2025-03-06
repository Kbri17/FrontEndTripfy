import React, { useState, useEffect } from 'react';
import '../Estilos/ListadoProductos.css';
import axios from 'axios';

const ListadoProductos = () => {
  // Estado para almacenar los productos 
  const [productos, setProductos] = useState([]);
 

  // Función para obtener productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tour/buscartodos'); 
      console.log('Usuarios obtenidos: ',response.data)
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await axios.put(`http://localhost:8080/tour/eliminar/${id}`); 
      setProductos(productos.filter(producto => producto.id !== id)); 
      window.location.reload(); // 🔄 Recarga toda la página
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };


  // Cargar los productos 
  useEffect(() => {
    obtenerProductos();
  }, []); 

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administrador</h1>
      </header>

     

      <div className="main-content">
        <section id="productos">
          <h2>Productos Registrados</h2>
          {/* Tabla para mostrar los productos */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Ubicación</th>
                <th>Categoria</th>
                <th>Acciones</th>
                <th>Estado</th>
                

              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="3">No hay productos registrados</td>
                </tr>
              ) : (
                productos.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.idTour}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.ubicacion}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      <button onClick={() => console.log('Editar Producto', producto.idTour)}>Editar</button>
                      <button onClick={() => eliminarProducto(producto.idTour)}>Eliminar</button>
                    </td>
                    <td>{producto.estado ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        
      </div>
    </div>
  );
};

export default ListadoProductos;


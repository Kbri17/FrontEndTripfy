import React, { useState, useEffect } from 'react';
import '../Estilos/Administracion.css';
import axios from 'axios'; 

const AdminPanel = () => {
  // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);

  // Función para obtener productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tour/buscartodos'); 
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tour//eliminar/${id}`); 
      setProductos(productos.filter(producto => producto.id !== id)); 
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Cargar los productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []); 

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administrador</h1>
      </header>

      <div className="sidebar">
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#usuarios">Usuarios</a></li>
          <li><a href="/AgregarProducto">Agregar producto</a></li>
          <li><a href="/GestionarCategorias">Gestionar categorías</a></li>
        </ul>
      </div>

      <div className="main-content">
        <section id="productos">
          <h2>Productos Registrados</h2>
          {/* Tabla para mostrar los productos */}
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Si no hay productos */}
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="3">No hay productos registrados</td>
                </tr>
              ) : (
                // Mapea los productos y crea una fila por cada uno
                productos.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>
                      <button onClick={() => console.log('Editar Producto', producto.id)}>Editar</button>
                      <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                    </td>
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

export default AdminPanel;


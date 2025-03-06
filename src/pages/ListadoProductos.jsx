import React, { useState, useEffect } from 'react';
import '../Estilos/ListadoProductos.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const ListadoProductos = () => {
  // Estado para almacenar los productos 
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productoEdicion, setProductoEdicion] = useState(null); 

  

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

  const abrirModal = (producto) => {
    setProductoEdicion(producto); // Establecer el producto a editar
    setShowModal(true); // Mostrar el modal
  };

  const cerrarModal = () => {
    setShowModal(false); // Ocultar el modal
    setProductoEdicion(null); // Limpiar el producto a editar
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

  const editarProducto = async (id) => {
    try {
      await axios.post(`http://localhost:8080/tour/modificar`, productoEdicion); 
      setProductos(productos.map(producto =>
        producto.idTour === productoEdicion.idTour ? productoEdicion : producto
      ));
      cerrarModal(); 
      //window.location.reload(); // 🔄 Recarga toda la página
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
                <th>Categoría</th>
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
                      <button onClick={() => abrirModal(producto)}>Editar</button>
                      <button onClick={() => eliminarProducto(producto.idTour)}>Eliminar</button>
                    </td>
                    <td>{producto.estado ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {showModal && productoEdicion && (
          <div className="modal" id="staticBackdrop" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Editar Producto</h5>
                <button type="button" className="btn-close" onClick={cerrarModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control"
                      value={productoEdicion.nombre}
                      onChange={(e) => setProductoEdicion({ ...productoEdicion, nombre: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input
                      type="number"
                      id="precio"
                      className="form-control"
                      value={productoEdicion.precio}
                      onChange={(e) => setProductoEdicion({ ...productoEdicion, precio: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select
                      id="estado"
                      className="form-select"
                      value={productoEdicion.estado ? "Activo" : "Inactivo"}
                      onChange={(e) => setProductoEdicion({ ...productoEdicion, estado: e.target.value === "Activo" })}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <select
                      id="categoria"
                      className="form-select"
                      value={productoEdicion.categoria }
                      onChange={(e) => setProductoEdicion({ ...productoEdicion, categoria: e.target.value })}
                    >
                      <option value="Paquete">Paquete</option>
                      <option value="FullDay">Full Day</option>
                    </select>
                  </div>
                
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={editarProducto}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default ListadoProductos;


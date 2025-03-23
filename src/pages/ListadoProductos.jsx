import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";



const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productoEdicion, setProductoEdicion] = useState(null);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/tour/buscartodos`
      );
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const abrirModal = (producto) => {
    setProductoEdicion(producto);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setProductoEdicion(null);
  };

  const eliminarProducto = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:8080/tour/eliminar/${id}`);
          setProductos(productos.filter((producto) => producto.id !== id));
          window.location.reload();
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
      }
    });
  };

  const editarProducto = async () => {
    try {
      await axios.post(`http://localhost:8080/tour/modificar`, productoEdicion);
      setProductos(
        productos.map((producto) =>
          producto.idTour === productoEdicion.idTour
            ? productoEdicion
            : producto
        )
      );
      cerrarModal();
      Swal.fire({
        title: "Éxito",
        text: "El producto fue editado con éxito",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Productos Registrados</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
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
                <td colSpan="7" className="text-center">
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              productos.map((producto) => (
                <tr key={producto.idTour}>
                  <td>{producto.idTour}</td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.ubicacion}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => abrirModal(producto)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarProducto(producto.idTour)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        producto.estado ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {producto.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && productoEdicion && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cerrarModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={productoEdicion.nombre}
                      onChange={(e) =>
                        setProductoEdicion({
                          ...productoEdicion,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      value={productoEdicion.descripcion}
                      onChange={(e) =>
                        setProductoEdicion({
                          ...productoEdicion,
                          descripcion: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={productoEdicion.precio}
                      onChange={(e) =>
                        setProductoEdicion({
                          ...productoEdicion,
                          precio: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      value={productoEdicion.estado ? "Activo" : "Inactivo"}
                      onChange={(e) =>
                        setProductoEdicion({
                          ...productoEdicion,
                          estado: e.target.value === "Activo",
                        })
                      }
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cerrarModal}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={editarProducto}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoProductos;

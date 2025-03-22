import React, { useState, useEffect } from "react";
import "../Estilos/Usuarios.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Edit, Trash2, PackageSearch } from "lucide-react";
import Swal from "sweetalert2";



const ListadoUsuarios = () => {
  // Estado para almacenar los productos
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEdicion, setUsuarioEdicion] = useState(null);

  // Función para obtener usuarios desde la API
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(
        `https://localhost:443/user/buscartodos`
      );
      console.log("Usuarios obtenidos:", response.data);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const abrirModal = (usuario) => {
    setUsuarioEdicion(usuario); // Establecer el usuario a editar
    setShowModal(true); // Mostrar el modal
    console.log(usuario);
  };

  const cerrarModal = () => {
    setShowModal(false); // Ocultar el modal
    setUsuarioEdicion(null); // Limpiar el usuario a editar
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
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
          await axios.put(`https://localhost:443/user/eliminar/${id}`);
          setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
          window.location.reload();
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
      }
    });
  };

  // Función para editar un usuario (modificar sus datos)
  const editarUsuario = async () => {
    try {
      await axios.put(`https://localhost:443/user/modificar`, usuarioEdicion);
      setUsuarios(
        usuarios.map((usuario) =>
          usuario.idUsuario === usuarioEdicion.idUsuario
            ? usuarioEdicion
            : usuario
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

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  console.log(usuarioEdicion);
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administrador</h1>
      </header>

      <div className="main-content">
        <section id="usuarios">
          <h2>Usuarios Registrados</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="7">No hay usuarios registrados</td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr key={usuario.idUsuario}>
                    <td>{usuario.idUsuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.rolEstado}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => abrirModal(usuario)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminarUsuario(usuario.idUsuario)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          usuario.estado ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {usuario.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
        {showModal && usuarioEdicion && (
          <div
            className="modal"
            id="staticBackdrop"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Modificar usuario
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={cerrarModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        value={usuarioEdicion.nombre}
                        onChange={(e) =>
                          setUsuarioEdicion({
                            ...usuarioEdicion,
                            nombre: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="apellido" className="form-label">
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="apellido"
                        className="form-control"
                        value={usuarioEdicion.apellido}
                        onChange={(e) =>
                          setUsuarioEdicion({
                            ...usuarioEdicion,
                            apellido: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={usuarioEdicion.correo}
                        onChange={(e) =>
                          setUsuarioEdicion({
                            ...usuarioEdicion,
                            correo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="estado" className="form-label">
                        Estado
                      </label>
                      <select
                        id="estado"
                        className="form-select"
                        value={usuarioEdicion.estado ? "Activo" : "Inactivo"}
                        onChange={(e) =>
                          setUsuarioEdicion({
                            ...usuarioEdicion,
                            estado: e.target.value === "Activo",
                          })
                        }
                      >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="rolEstado" className="form-label">
                        Rol
                      </label>
                      <select
                        id="rolEstado"
                        className="form-select"
                        value={usuarioEdicion.rolEstado}
                        onChange={(e) =>
                          setUsuarioEdicion({
                            ...usuarioEdicion,
                            rolEstado: e.target.value,
                          })
                        }
                      >
                        <option value="USER">Usuario</option>
                        <option value="ADMIN">Administrador</option>
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
                    onClick={editarUsuario}
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoUsuarios;

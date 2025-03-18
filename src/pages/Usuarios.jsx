import React, { useState, useEffect } from 'react';
import '../Estilos/Usuarios.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaUser } from 'react-icons/fa';

const ListadoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEdicion, setUsuarioEdicion] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/buscartodos');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const abrirModal = (usuario) => {
    setUsuarioEdicion(usuario);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setUsuarioEdicion(null);
  };

  const eliminarUsuario = async (id) => {
    try {
      if (id) {
        await axios.put(`http://localhost:8080/user/eliminar/${id}`);
        setUsuarios(usuarios.filter(usuario => usuario.idUsuario !== id));
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const editarUsuario = async () => {
    try {
      await axios.put('http://localhost:8080/user/modificar', usuarioEdicion);
      setUsuarios(usuarios.map(usuario => usuario.idUsuario === usuarioEdicion.idUsuario ? usuarioEdicion : usuario));
      cerrarModal();
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Panel de Administrador</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th><FaUser /> Nombre</th>
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
                <td colSpan="7" className="text-center">No hay usuarios registrados</td>
              </tr>
            ) : (
              usuarios.map(usuario => (
                <tr key={usuario.idUsuario}>
                  <td>{usuario.idUsuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.rolEstado}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => abrirModal(usuario)}>
                      <FaEdit /> 
                    </button>
                    <button className="btn btn-danger" onClick={() => eliminarUsuario(usuario.idUsuario)}>
                      <FaTrash /> 
                    </button>
                    
                  </td>
                  <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && usuarioEdicion && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modificar Usuario</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={usuarioEdicion.nombre} onChange={(e) => setUsuarioEdicion({ ...usuarioEdicion, nombre: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" value={usuarioEdicion.apellido} onChange={(e) => setUsuarioEdicion({ ...usuarioEdicion, apellido: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={usuarioEdicion.correo} onChange={(e) => setUsuarioEdicion({ ...usuarioEdicion, correo: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select className="form-select" value={usuarioEdicion.estado ? "Activo" : "Inactivo"} onChange={(e) => setUsuarioEdicion({ ...usuarioEdicion, estado: e.target.value === "Activo" })}>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select className="form-select" value={usuarioEdicion.rolEstado} onChange={(e) => setUsuarioEdicion({ ...usuarioEdicion, rolEstado: e.target.value })}>
                      <option value="USER">Usuario</option>
                      <option value="ADMIN">Administrador</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
                <button className="btn btn-primary" onClick={editarUsuario}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoUsuarios;

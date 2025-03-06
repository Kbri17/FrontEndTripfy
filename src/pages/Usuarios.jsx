import React, { useState, useEffect } from 'react';
import '../Estilos/Usuarios.css';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]); 

  // Función para obtener usuarios desde la API
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/buscartodos'); 
      console.log('Usuarios obtenidos:', response.data);
      setUsuarios(response.data); 
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    try {
      if (id) {
        await axios.put(`http://localhost:8080/user/eliminar/${id}`);
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        window.location.reload(); 
      } else {
        console.error('No se pudo obtener el ID del usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // Función para editar un usuario (modificar sus datos)
  const editarUsuario = async (id) => {
    try {
      await axios.put(`http://localhost:8080/user/modificarUsuario/${id}`);
      setUsuarios(usuarios.filter(usuario => usuario.id !== id)); 
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
    }
  };

  // Función para asignar el rol de administrador
  const asignarRolAdministrador = async (id) => {
    try {
      await axios.put(`http://localhost:8080/user/asignarAdmin/${id}`);
      obtenerUsuarios();  // Recargar usuarios después de asignar el rol
    } catch (error) {
      console.error('Error al asignar rol de administrador:', error);
    }
  };

  // Función para quitar el rol de administrador
  const quitarRolAdministrador = async (id) => {
    try {
      await axios.put(`http://localhost:8080/user/quitarAdmin/${id}`);
      obtenerUsuarios();  // Recargar usuarios después de quitar el rol
    } catch (error) {
      console.error('Error al quitar rol de administrador:', error);
    }
  };

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []); 

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
                usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.idUsuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.rolEstado}</td>
                    <td>
                      <button className="botonesUsuario" onClick={() => editarUsuario(usuario.idUsuario)}>Modificar</button>
                      <button className="botonesUsuario" onClick={() => eliminarUsuario(usuario.idUsuario)}>Eliminar</button>

                      {/* Botones para asignar/quitar rol de administrador */}
                      {usuario.rolEstado !== 'ADMIN' ? (
                        <button className="botonesUsuario" onClick={() => asignarRolAdministrador(usuario.idUsuario)}>Asignar Admin</button>
                      ) : (
                        <button className="botonesUsuario" onClick={() => quitarRolAdministrador(usuario.idUsuario)}>Quitar Admin</button>
                      )}
                    </td>
                    <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
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

export default Usuarios;

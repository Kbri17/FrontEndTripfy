import React, { useState, useEffect } from 'react';
import '../Estilos/Usuarios.css';
import axios from 'axios';

const Usuarios = () => {
  // Estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState([]); 



  // Función para obtener usuarios desde la API
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/buscartodos'); 
      console.log('Usuarios obtenidos:', response.data);
      setUsuarios(response.data); 
      console.log(usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    console.log('ID del usuario a eliminar:', id);
    try {
      if (id) {
        await axios.delete(`http://localhost:8080/user/eliminarUsuario/${id}`);
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      } else {
        console.error('No se pudo obtener el ID del usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // Función para editar un usuario 
  const editarUsuario = async (id) => {
    try {
        await axios.put(`http://localhost:8080/user/modificarUsuario/${id}`); 
        setUsuarios(usuarios.filter(usuario => usuario.id !== id)); 
      } catch (error) {
        console.error('Error al modificar el usuario:', error);
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
          {/* Tabla para mostrar los usuarios */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="3">No hay usuarios registrados</td>
                </tr>
              ) : (
                usuarios.map(usuario => (
                  
                  <tr key={usuario.id}>
                    <td>{usuario.idUsuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <button onClick={() => editarUsuario(usuario.id)}>Modificar</button>
                      <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                    </td>
                    <td>{usuario.estado}</td>
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


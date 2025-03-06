import React, { useState } from 'react';
import '../Estilos/Administracion.css';


const AdminPanel = () => {
 

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administrador</h1>
      </header>

      <div className="sidebar">
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="/ListadoProductos">Productos</a></li>
          <li><a href="/Usuarios">Usuarios</a></li>
          <li><a href="/AgregarProducto">Agregar producto</a></li>
          <li><a href="/GestionarCategorias">Gestionar categorías</a></li>
    
        </ul>
      </div>
      
   </div>

    
  );
};

export default AdminPanel;


// AdminPanel.js
import React, { useState } from 'react';
import AgregarProducto from './AgregarProducto';
import GestionarCategorias from './GestionarCategorias';
import '../Estilos/Administracion.css';
import '../Estilos/GestionarCategorias.css';


const AdminPanel = () => {
  const [mostrarAgregarProducto, setMostrarAgregarProducto] = useState(false);
  const [mostrarGestionarCategorias, setMostrarGestionarCategorias] = useState(false);

  const handleMostrarAgregarProducto = () => {
    setMostrarAgregarProducto(true);
  };
  const handleMostrarGestionarCategorias = () => {
    setMostrarGestionarCategorias(true);
  };
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
          <li><button onClick={handleMostrarAgregarProducto}>Agregar Producto</button></li>
          <li><button onClick={handleMostrarGestionarCategorias}>Gestionar categorías</button></li>
        </ul>
      </div>

      <main className="main-content">
        {mostrarAgregarProducto ? <AgregarProducto /> : <p></p>}
        {mostrarGestionarCategorias ? <GestionarCategorias/>:<p></p>}
      </main>

      
    </div>

    
  );
}

export default AdminPanel;

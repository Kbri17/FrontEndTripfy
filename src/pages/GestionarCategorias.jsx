import React, { useState } from 'react';
import '../Estilos/GestionarCategorias.css';

const GestionarCategorias = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: 'Full day', icono: '🎨' },
    { id: 2, nombre: 'Paquetes', icono: '📏' },
  ]);
  
  const [nombre, setNombre] = useState('');
  const [icono, setIcono] = useState('');
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleIconoChange = (e) => setIcono(e.target.value);

  const handleAgregar = () => {
    if (nombre && icono) {
      if (editando) {
      
        setCategorias(categorias.map(c => 
          c.id === idEditando ? { ...c, nombre, icono } : c
        ));
        setEditando(false);
        setIdEditando(null);
      } else {
      
        setCategorias([...categorias, { id: Date.now(), nombre, icono }]);
      }
      setNombre('');
      setIcono('');
    } else {
      alert('Por favor, complete ambos campos');
    }
  };

  const handleEditar = (id) => {
    const categoria = categorias.find(c => c.id === id);
    setNombre(categoria.nombre);
    setIcono(categoria.icono);
    setEditando(true);
    setIdEditando(id);
  };

  const handleEliminar = (id) => {
    setCategorias(categorias.filter(c => c.id !== id));
  };

  return (
    <div className="gestionar-categorias">
      <h2>Administrar Categorias</h2>

      <div className="form-group">
        <label htmlFor="nombre">Nombre de la categoria</label>
        <input 
          type="text" 
          id="nombre" 
          value={nombre} 
          onChange={handleNombreChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="icono">Ícono</label>
        <input 
          type="text" 
          id="icono" 
          value={icono} 
          onChange={handleIconoChange} 
          required 
        />
      </div>

      <button onClick={handleAgregar}>
        {editando ? 'Actualizar Categoria' : 'Añadir Nueva'}
      </button>

      <h3>Categorías Registradas</h3>
      <ul>
        {categorias.map(c => (
          <li key={c.id}>
            {c.icono} {c.nombre}
            <button onClick={() => handleEditar(c.id)}>Editar</button>
            <button onClick={() => handleEliminar(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionarCategorias;

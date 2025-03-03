import React, { useState } from 'react';
import '../Estilos/AgregarProducto.css';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [categoria, setCategoria] = useState('');  
  const [error, setError] = useState('');
  const [productos, setProductos] = useState([]); // Simulación de la base de datos


  const categoriasDisponibles = ['Full day', 'paquetes'];

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);
  const handleImagenesChange = (e) => setImagenes(Array.from(e.target.files));
  const handleCategoriaChange = (e) => setCategoria(e.target.value); 

  const verificarNombreExistente = () => {
    // Simulación de verificación de nombre en la "base de datos"
    return productos.some((producto) => producto.nombre === nombre);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificarNombreExistente()) {
      setError('El nombre del producto ya está en uso.');
      return;
    }

    if (nombre && descripcion && imagenes.length > 0 && categoria) {
      const nuevoProducto = { nombre, descripcion, imagenes, categoria };
      setProductos([...productos, nuevoProducto]);
      setError('');
      setNombre('');
      setDescripcion('');
      setImagenes([]);
      setCategoria('');
      alert('Producto agregado con éxito.');
    } else {
      setError('Por favor, complete todos los campos.');
    }
  };

  return (
    <div className="agregar-producto">
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Producto</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre} 
            onChange={handleNombreChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea 
            id="descripcion" 
            value={descripcion} 
            onChange={handleDescripcionChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagenes">Imágenes del Producto</label>
          <input 
            type="file" 
            id="imagenes" 
            multiple 
            onChange={handleImagenesChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select 
            id="categoria" 
            value={categoria} 
            onChange={handleCategoriaChange} 
            required
          >
            <option value="">Seleccione una categoría</option>
            {categoriasDisponibles.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}

export default AgregarProducto;

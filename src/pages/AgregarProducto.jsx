import React, { useState } from 'react';
import '../Estilos/AgregarProducto.css';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [categoria, setCategoria] = useState('');  
  const [precio, setPrecio] = useState(0.0);
  const [ubicacion, setUbicacion] = useState('');
  const [error, setError] = useState('');
  const [productos, setProductos] = useState([]); // Simulación de la base de datos

  const categoriasDisponibles = ['Full day', 'paquetes'];

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);
  const handleImagenesChange = (e) => setImagenes(Array.from(e.target.files));
  const handleCategoriaChange = (e) => setCategoria(e.target.value); 
  const handlePrecioChange = (e) => setPrecio(parseFloat(e.target.value) || 0.0);
  const handleUbicacionChange = (e) => setUbicacion(e.target.value);

  const verificarNombreExistente = () => {
    return productos.some((producto) => producto.nombre === nombre);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!nombre.trim() || !descripcion.trim() || imagenes.length === 0 || !categoria || precio <= 0 || !ubicacion.trim()) {
      setError('Por favor, complete todos los campos. El precio debe ser mayor a 0.');
      return;
    }
  
    if (verificarNombreExistente()) {
      setError('El nombre del producto ya está en uso.');
      return;
    }
  
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('categoria', categoria);
    formData.append('precio', precio);
    formData.append('ubicacion', ubicacion);
  
    imagenes.forEach((imagen) => {
      formData.append('imagenes', imagen);
    });
  
    try {
      const response = await fetch('http://localhost:8080/tour/guardar', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar el producto.');
      }
  
      alert('Producto agregado con éxito.');
      
      setNombre('');
      setDescripcion('');
      setImagenes([]);
      setCategoria('');
      setPrecio(0.0);
      setUbicacion('');
      setError('');
    } catch (error) {
      setError('Hubo un problema al guardar el producto.');
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
          <label htmlFor="precio">Precio</label>
          <input 
            type="number" 
            id="precio"
            step="0.01" 
            value={precio} 
            onChange={handlePrecioChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación</label>
          <input 
            type="text" 
            id="ubicacion"
            value={ubicacion} 
            onChange={handleUbicacionChange} 
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
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';



const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState(0.0);
  const [ubicacion, setUbicacion] = useState('');
  const [error, setError] = useState('');

  const categoriasDisponibles = ['Full day', 'Paquetes'];




  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!nombre.trim() || !descripcion.trim() || imagenes.length === 0 || !categoria || precio <= 0 || !ubicacion.trim()) {
      setError('Por favor, complete todos los campos. El precio debe ser mayor a 0.');
      return;
    }
  
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('categoria', categoria);
    formData.append('precio', precio);
    formData.append('ubicacion', ubicacion);
    
    imagenes.forEach((imagen, index) => {
      formData.append('imagenes', imagen.file);  // Usa imagen.file para enviar solo el archivo
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


  useEffect(() => {
    if (nombre.trim()) {
      generarDescripcion(nombre);
    } else {
      setDescripcion('');
    }
  }, [nombre]);

    const generarDescripcion = (titulo) => {
    setDescripcion(`🌍 ¡Embárcate en una aventura inolvidable en ${titulo}! ✈️  

      Descubre los encantos de **${titulo}** con nuestro tour exclusivo, diseñado para brindarte una experiencia única e inolvidable. Desde el momento en que comiences tu viaje, te sumergirás en la cultura, la historia y la belleza de este maravilloso destino.  

      ✨ **¿Qué incluye nuestro tour?**  
      ✅ Visitas guiadas a los principales lugares turísticos 🏛️  
      ✅ Transporte cómodo y seguro 🚍  
      ✅ Acompañamiento de guías expertos 📜  
      ✅ Experiencias auténticas y actividades exclusivas 🎭  
      ✅ Tiempo libre para explorar y disfrutar a tu ritmo 🛍️  

      Cada día será una oportunidad para descubrir algo nuevo: desde los monumentos más emblemáticos hasta rincones escondidos llenos de historia y encanto. Sumérgete en la gastronomía local, déjate sorprender por la arquitectura impresionante y captura momentos que recordarás para siempre.  

      🔥 **¡No dejes pasar esta oportunidad!** 🔥  
      Reserva ahora y vive una experiencia que cambiará tu forma de viajar. 🌟  

      📅 **Cupos limitados** – ¡Asegura tu lugar hoy mismo!`);
    };

  const handleImagenesChange = (e) => {
    const archivosSeleccionados = Array.from(e.target.files).map((file) => ({
      file,
      id: URL.createObjectURL(file),
    }));

    if (archivosSeleccionados.length + imagenes.length > 5) {
      setError('Solo puedes subir hasta 5 imágenes.');
      return;
    }
    setImagenes((prev) => [...prev, ...archivosSeleccionados]);
    console.log("Archivos seleccionados agregadls:", archivosSeleccionados);
    setError('');
  };


  const handleEliminarImagen = (id) => {
    setImagenes((prev) => {
      const imagenAEliminar = prev.find((img) => img.id === id);
      if (!imagenAEliminar) return prev;
      URL.revokeObjectURL(imagenAEliminar.id);
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = imagenes.findIndex((img) => img.id === active.id);
      const newIndex = imagenes.findIndex((img) => img.id === over.id);
      setImagenes((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Producto</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Nombre del Producto</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagenes" className="block text-sm font-medium">Imágenes del Producto (Máx. 5)</label>
            <input 
              type="file" 
              id="imagenes" 
              multiple 
              accept="image/*" 
              onChange={handleImagenesChange} 
              required 
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Precio</label>
            <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value) || 0.0)} className="w-full p-2 border rounded-md" required />
          </div>

          <div>
            <label className="block text-sm font-medium">Ubicación</label>
            <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className="w-full p-2 border rounded-md" required />
          </div>

          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full p-2 border rounded-md" required>
              <option value="">Seleccione una categoría</option>
              {categoriasDisponibles.map((categoria, index) => (
                <option key={index} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Guardar Producto
          </button>
        </form>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">Previsualización Imágenes</h3>
        {imagenes.length === 0 ? <p className="text-gray-500">No hay imágenes seleccionadas</p> : null}

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={imagenes.map((img) => img.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-2 gap-4 w-full border p-4 rounded-md bg-gray-50">
              {imagenes.map((imagen, index) => (
                <SortableImage key={imagen.id} imagen={imagen} index={index} onEliminar={handleEliminarImagen} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

const SortableImage = ({ imagen, index, onEliminar }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: imagen.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className="relative w-full h-40 border rounded-md overflow-hidden bg-white shadow-sm cursor-grab active:cursor-grabbing"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <img {...listeners} src={imagen.id} alt={`preview ${index}`} className="w-full h-full object-cover" />
      {index === 0 && (
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md">Principal</span>
      )}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onEliminar(imagen.id); }}
        className="absolute top-2 right-2 bg-red-600 text-white text-xs px-4 py-2 rounded-md z-50 shadow-lg"
      >
        Eliminar
      </button>
    </div>
  );
};

export default AgregarProducto;
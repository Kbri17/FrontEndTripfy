import React, { useState } from "react";

const iconosDisponibles = ["✈️", "🏝️", "🚗", "🚆", "🗺️", "⛺", "🚢"];

const GestionarCategorias = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Full day", icono: "✈️" },
    { id: 2, nombre: "Paquetes", icono: "🏝️" },
  ]);

  const [nombre, setNombre] = useState("");
  const [icono, setIcono] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleIconoChange = (e) => setIcono(e.target.value);

  const handleGuardar = () => {
    if (!nombre.trim() || !icono.trim()) {
      alert("Por favor, complete ambos campos");
      return;
    }

    if (editando) {
      setCategorias(
        categorias.map((c) =>
          c.id === idEditando ? { ...c, nombre, icono } : c
        )
      );
      setEditando(false);
      setIdEditando(null);
    } else {
      setCategorias([...categorias, { id: Date.now(), nombre, icono }]);
    }
    setNombre("");
    setIcono("");
  };

  const handleEditar = (id) => {
    const categoria = categorias.find((c) => c.id === id);
    setNombre(categoria.nombre);
    setIcono(categoria.icono);
    setEditando(true);
    setIdEditando(id);
  };

  const handleEliminar = (id) => {
    setConfirmarEliminar(id);
  };

  const confirmarEliminarCategoria = () => {
    setCategorias(categorias.filter((c) => c.id !== confirmarEliminar));
    setConfirmarEliminar(null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Administrar Categorías
        </h2>

        <div className="mb-4">
          <label htmlFor="nombre" className="block font-medium">
            Nombre de la categoría
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Ingrese el nombre"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="icono" className="block font-medium">
            Ícono
          </label>
          <select
            id="icono"
            value={icono}
            onChange={handleIconoChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un ícono</option>
            {iconosDisponibles.map((icon, index) => (
              <option key={index} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGuardar}
            className={`w-1/3 p-2 text-white rounded ${
              editando ? "bg-yellow-500" : "bg-blue-500"
            }`}
          >
            {editando ? "Actualizar Categoría" : "Añadir Nueva"}
          </button>
        </div>

        <h3 className="text-xl font-semibold text-center mt-6">
          Categorías Registradas
        </h3>
        <ul className="mt-4">
          {categorias.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span className="text-lg">
                {c.icono} {c.nombre}
              </span>
              <div>
                <button
                  onClick={() => handleEditar(c.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(c.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {confirmarEliminar !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">
              ¿Seguro que deseas eliminar esta categoría?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmarEliminarCategoria}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setConfirmarEliminar(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarCategorias;

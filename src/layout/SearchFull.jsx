import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faMapMarkerAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const SearchFull = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  clearFilters,
}) => {
  const hasFilters = searchTerm || selectedDate; // Verifica si hay filtros aplicados

  return (
    <section className="flex justify-center items-center py-0 px-4">
      <div className="bg-white shadow-md rounded-lg md:rounded-full flex flex-col md:flex-row items-center w-full max-w-4xl p-2">
        {/* Campo de búsqueda de ubicación */}
        <div className="flex-1 w-full md:w-auto px-2 border-b md:border-b-0 md:border-r mb-2 md:mb-0">
          <label className="block text-xs font-semibold text-gray-800">
            Destino
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-custom-orange mr-2"
            />
            <input
              type="text"
              placeholder="¿A dónde vas?"
              className="w-full focus:outline-none text-sm text-gray-400"
              value={searchTerm} // Vincula el valor del input con el estado searchTerm
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado searchTerm al escribir
            />
          </div>
        </div>

        {/* Fecha de entrada */}
        <div className="flex-1 w-full md:w-auto px-2 border-b md:border-b-0 md:border-r mb-2 md:mb-0">
          <label className="block text-xs font-semibold text-gray-800">
            Fecha
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-custom-orange mr-2"
            />
            <input
              type="date"
              className="w-full focus:outline-none text-sm text-gray-400"
              value={selectedDate} // Vincula el valor del input con el estado selectedDate
              onChange={(e) => setSelectedDate(e.target.value)} // Actualiza el estado selectedDate al seleccionar una fecha
            />
          </div>
        </div>

        {/* Botón de búsqueda */}
        <div className="w-full md:w-auto px-2 flex items-center space-x-2">
          {/* <button className="bg-custom-orange text-white rounded-lg md:rounded-full w-full md:w-auto px-4 py-1 text-sm font-semibold flex items-center justify-center hover:bg-gray-700">
            <FontAwesomeIcon icon={faSearch} />
          </button> */}

          {/* Botón para eliminar filtros */}
          {hasFilters && ( // Solo muestra el botón si hay filtros aplicados
            <button
              className="bg-custom-orange text-white rounded-lg md:rounded-full w-full md:w-auto px-4 py-1 text-sm font-semibold flex items-center justify-center hover:bg-gray-600"
              onClick={clearFilters} // Llama a la función para limpiar filtros
            >
              <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchFull;

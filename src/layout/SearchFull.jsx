import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const SearchFull = ({ searchTerm, setSearchTerm }) => {
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
              className="text-gray-600 mr-2"
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
              className="text-gray-600 mr-2"
            />
            <input
              type="date"
              className="w-full focus:outline-none text-sm text-gray-400"
            />
          </div>
        </div>

        {/* Botón de búsqueda */}
        <div className="w-full md:w-auto px-2">
          <button className="bg-custom-orange text-white rounded-lg md:rounded-full w-full md:w-auto px-4 py-1 text-sm font-semibold flex items-center justify-center hover:bg-gray-700">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchFull;

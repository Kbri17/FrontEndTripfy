import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const SearchFull = () => {
  return (
    <section className="flex justify-center items-center py-0 px-4">
      <div className="bg-white shadow-md rounded-lg md:rounded-full flex flex-col md:flex-row items-center w-full max-w-4xl p-2">
        {/* Ubicación */}
        <div className="flex-1 w-full md:w-auto px-2 border-b md:border-b-0 md:border-r mb-2 md:mb-0">
          <label className="block text-xs font-semibold text-gray-500">
            Destino
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-gray-400 mr-2"
            />
            <input
              type="text"
              placeholder="¿A dónde vas?"
              className="w-full focus:outline-none text-sm text-gray-400"
            />
          </div>
        </div>

        {/* Fecha de entrada */}
        <div className="flex-1 w-full md:w-auto px-2 border-b md:border-b-0 md:border-r mb-2 md:mb-0">
          <label className="block text-xs font-semibold text-gray-500">
            Fecha
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-gray-400 mr-2"
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

//-----------------------------------------------------------------

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// const Search = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//     onSearch(e.target.value); // Llamamos a la función para filtrar
//   };

//   return (
//     <section>
//       <div className="w-full md:w-10/12">
//         <div className="grid grid-cols-1 h-full">
//           <div className="flex items-center justify-center">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Buscar por país..."
//                 value={query}
//                 onChange={handleChange}
//                 className="pl-6 pr-6 py-1 mt-2 md:pl-10 md:pr-28 md:py-2 rounded-md focus:outline-none text-black"
//               />
//               <FontAwesomeIcon
//                 icon={faSearch}
//                 className="mt-1 left-1 md:left-0 md:mt-1 md:ml-2 absolute md:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
      
      
//     </section>
//   );
// };

export default SearchFull;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Llamamos a la función para filtrar
  };

  return (
    <section>
      <div className="w-full md:w-10/12">
        <div className="grid grid-cols-1 h-full">
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por país..."
                value={query}
                onChange={handleChange}
                className="pl-6 pr-6 py-1 mt-2 md:pl-10 md:pr-28 md:py-2 rounded-md focus:outline-none text-black"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="mt-1 left-1 md:left-0 md:mt-1 md:ml-2 absolute md:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;

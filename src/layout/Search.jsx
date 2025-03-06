import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <section>
      <div className="w-full md:w-10/12">
        {/* Contenedor que divide en 3 columnas */}
        <div className="grid grid-cols-1 h-full">
          <div className="flex items-center justify-center ">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-6 pr-6 py-1 mt-2 md:pl-10 md:pr-28 md:py-2 rounded-md focus:outline-none"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="mt-1 left-1 md:left-0 md:mt-1 md:ml-4 absolute md:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="top-0 left-0 w-full h-32 bg-custom-blue z-50">
      <div className="fixed  w-full h-16 bg-custom-blue">
        {/* Contenedor que divide en 3 columnas */}
        <div className="grid grid-cols-2 h-full">
          <div className="flex items-center justify-start pl-4 ">
            <Link to="/">
              <img className="h-10 ml-[60px]" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="flex items-center justify-end pr-4 mr-[60px]">
            {/* Botón de hamburguesa en pantallas pequeñas */}
            <button
              className="block md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
            </button>

            {/* Links de Login y Register en pantallas grandes */}
            <div className="hidden md:flex items-center ">
              <div className="flex ">
                <Link
                  to="/register"
                  className="bg-white text-custom-orange font-bold text-xl px-4 py-1 rounded hover:bg-orange-600 transition duration-300 mr-4"
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="bg-custom-orange text-white font-bold text-xl px-4 py-1 rounded hover:bg-orange-600 transition duration-300 mr-4"
                >
                  Iniciar sesión
                </Link>
              </div>
              <div className="flex bg-custom-orange w-10 h-10 rounded-full p-2 mr-2 margin-auto items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="flex text-white text-2xl margin-auto items-center justify-center text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menú desplegable en pantallas pequeñas */}
        {menuOpen && (
          <div className="md:hidden bg-blue-400 z-51">
            <div className="flex flex-col items-center py-4">
              <Link
                to="/register"
                className="bg-white text-custom-orange font-bold text-xl px-4 py-1 rounded hover:bg-orange-600 transition duration-300 mb-2"
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="bg-custom-orange text-white font-bold text-xl px-4 py-1 rounded hover:bg-orange-600 transition duration-300"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        )}
      </div>
      <Search />
    </header>
  );
};

export default Header;

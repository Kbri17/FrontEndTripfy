import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-32 bg-blue-500 z-50">
      <div className="w-full h-16 bg-blue-500">
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
              <div className="bg-custom-orange w-10 h-10 rounded-full p-2 mr-2">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white text-2xl"
                />
              </div>
              <div className="flex flex-col ">
                <span className="text-white font-bold text-xl">
                  <Link to="/login">Iniciar sesión</Link>
                </span>
                <span className="text-custom-orange font-bold text-xl">
                  <Link to="/register">Registrarse</Link>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menú desplegable en pantallas pequeñas */}
        {menuOpen && (
          <div className="md:hidden bg-blue-500">
            <div className="flex flex-col items-center py-4">
              <Link
                to="/login"
                className="text-white font-bold text-xl mb-2"
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-custom-orange font-bold text-xl"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
      <Search/>
      
    </header>
  );
};

export default Header;

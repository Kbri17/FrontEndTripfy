import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useAuth } from "../auth/hooks/useAuth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Obtiene usuario y logout del contexto

  return (
    <header className="top-0 left-0 w-full h-32 bg-custom-blue z-50">
      <div className="fixed w-full h-16 bg-custom-blue">
        <div className="grid grid-cols-2 h-full">
          <div className="flex items-center justify-start pl-4">
            <Link to="/">
              <img className="h-10 ml-[60px]" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="flex items-center justify-end pr-4 mr-[60px]">
            <button
              className="block md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
            </button>

            {/* Mostrar usuario autenticado o botones de login/registro */}
            {user ? (
              <div className="w-6/12 flex items-center flex-between space-x-4">
                <span className="w-8/12 text-white font-semibold text-xl">
                  Hola, {user.name || user.nombre || "Usuario"}
                </span>
                <button
                  onClick={logout}
                  className="bg-custom-orange text-white font-bold text-xl py-1 rounded hover:bg-orange-600 transition duration-300 mr-4"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center">
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
            )}
          </div>
        </div>

        {/* Menú desplegable en pantallas pequeñas */}
        {menuOpen && (
          <div className="md:hidden bg-blue-400 z-51">
            <div className="flex flex-col items-center py-4">
              {user ? (
                <>
                  <span className="text-white font-semibold text-xl mb-2">
                    Hola, {user.username || user.nombre || "Usuario"}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white font-bold text-xl px-4 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Search />
    </header>
  );
};

export default Header;

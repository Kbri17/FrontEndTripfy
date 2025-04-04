import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
  faUserGear,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loadUser } = useAuth();
  const userAdmin = user?.rolEstado === "ADMIN";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="top-0 left-0 w-full h-16 bg-custom-blue z-50">
      <div className="fixed w-full h-16 bg-custom-blue">
        <div className="grid grid-cols-2 h-full">
          <div className="flex items-center justify-start pl-4">
            <Link to="/">
              <img className="h-10 ml-[60px]" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="w-12/12 flex justify-end mr-[60px]">
            <button
              className="block md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
            </button>

            {/* Mostrar usuario autenticado o botones de login/registro */}
            {user ? (
              <div className="hidden md:flex  w-full flex items-center justify-end space-x-4">
                <div>
                  <span className="text-white font-semibold flex items-center text-m md:text-m">
                    {/* Hola,{" "} */}
                    {user.nombre && user.apellido ? (
                      <span className="bg-custom-orange text-white rounded-lg md:rounded-full w-full md:w-auto px-3 py-1 text-sm font-bold flex items-center justify-center hover:bg-gray-400">
                        {user.nombre.charAt(0).toUpperCase()}
                        {user.apellido.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      "Usuario"
                    )}
                  </span>
                </div>

                <div className="flex gap-4 text-1xl text-white">
                  <Link to="/reservas">
                    {" "}
                    <FontAwesomeIcon icon={faCartShopping} />{" "}
                  </Link>
                  {/* Ícono de favoritos */}
                  <Link to="/favoritos">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-white hover:text-white transition duration-300"
                    />
                  </Link>
                  <Link to="/perfil">
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                  {userAdmin && (
                    <Link to="/administracion">
                      <FontAwesomeIcon icon={faUserGear} />
                    </Link>
                  )}
                </div>
                <div>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-700 text-white rounded-lg md:rounded-full w-full md:w-auto px-4 py-1 text-sm font-bold flex items-center justify-center hover:bg-custom-orange"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center">
                <Link
                  to="/register"
                  className="bg-gray-700 text-white rounded-lg md:rounded-full w-full md:w-auto px-4 py-1 text-sm font-bold flex items-center justify-center hover:bg-custom-orange mr-4"
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-700 text-white rounded-lg md:rounded-full w-full md:w-auto px-4 py-1 text-sm font-bold flex items-center justify-center hover:bg-custom-orange mr-4"
                >
                  Iniciar sesión
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Menú desplegable en pantallas pequeñas */}
        {menuOpen && (
          <div className="md:hidden bg-blue-500 z-51">
            <div className="flex flex-col items-center py-4">
              {user ? (
                <>
                  <span className="text-white font-semibold text-xl mb-2">
                    Hola, {user.name || user.nombre || "Usuario"}
                  </span>
                  <div className="flex flex-col gap-4 text-2xl text-white mb-2">
                    <Link to="/reservas">
                      {" "}
                      <FontAwesomeIcon icon={faCartShopping} />
                      {" reservas"}
                    </Link>
                    <Link to="/perfil">
                      <FontAwesomeIcon icon={faUser} /> {"usuario"}
                    </Link>
                    {userAdmin && (
                      <Link to="/administracion">
                        <FontAwesomeIcon icon={faUserGear} />
                        {"panel admin"}
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
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
    </header>
  );
};

export default Header;

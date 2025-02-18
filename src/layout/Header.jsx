import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
const Header = () =>{
    return (
      <header className="w-full h-16 bg-blue-500">
        {/* Contenedor que divide en 3 columnas */}
        <div className="grid grid-cols-3 h-full">
          <div className="flex items-center justify-start border border-blue-300 ">
            <img className="text-white text-xl ml-[60px]" src={logo} alt="" />
          </div>
          <div className="flex items-center justify-center border border-blue-300">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-28 py-2 rounded-md focus:outline-none"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-end border border-blue-300 ">
            <button className="flex items-center mr-[60px] focus:outline-none">
              <div className="bg-custom-orange  w-10 h-10  rounded-full p-2 mr-2">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white text-2xl"
                />
              </div>
              <div className="flex flex-col">
                <span className=" flex text-white font-bold text-xl justify-start">
                  Log in
                </span>
                <span className="text-custom-orange font-bold text-xl">
                  <Link to="/login">Register</Link>
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>
    );
}

export default Header
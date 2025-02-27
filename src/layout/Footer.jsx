import React from "react";
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="w-full h-16 bg-blue-500 flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src={logo} alt="Tripfy Logo" className="h-6" />
        <span className="text-white text-l ml-[10px]">
          &copy; {new Date().getFullYear()} Tripfy. Todos los derechos
          reservados.
        </span>
      </div>

    </footer>
  );
};

export default Footer;
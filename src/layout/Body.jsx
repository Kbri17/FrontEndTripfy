import React from "react";
const Body = () =>{
    return (
      <div className="mx-auto px-[60px]">
        {/* Contenedor centrado con padding horizontal de 60px */}
        <div className="grid grid-cols-12 gap-5">
          {/* Sistema de 12 columnas con gutter (espacio) de 20px (gap-5 = 1.25rem ≈ 20px) */}
          <div className="bg-red-400 col-span-3 bg-blue-100 p-4">Columna 1 (3/12)</div>
          <div className="col-span-6 bg-blue-200 p-4">Columna 2 (6/12)</div>
          <div className="col-span-3 bg-blue-100 p-4">Columna 3 (3/12)</div>
        </div>
      </div>
    );
}

export default Body
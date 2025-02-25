// src/components/Success.jsx
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Inicializa SweetAlert2 para React
const MySwal = withReactContent(Swal);

const Success = () => {
  MySwal.fire({
    title: "¡Éxito!",
    text: "Operación realizada correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};

export default Success;

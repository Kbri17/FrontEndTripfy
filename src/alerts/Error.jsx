import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ErrorAlert = () => {
  MySwal.fire({
    title: "¡Error!",
    text: "No se pudo completar correctamente la operacion.",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};

export default ErrorAlert;


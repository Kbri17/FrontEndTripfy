import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />; //si hay token, muestra children, el componente protegido si no hay token redirige a login
};

export default PrivateRoute;
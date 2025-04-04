import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const rol = decoded.rol; // ← debe venir como "ROLE_ADMIN"
  
        if (rol !== "ROLE_ADMIN") {
            return <Navigate to="/" replace />; // o a una ruta de acceso denegado
    }
  
    return children;
  
    } catch (error) {
        console.error("Token inválido o malformado:", error);
        return <Navigate to="/login" replace />;
    }
    };

  export default AdminRoute;
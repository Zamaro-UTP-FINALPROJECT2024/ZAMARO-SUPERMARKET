import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute() {
  const { user } = useAuth(); // Verifica si el usuario está autenticado

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;

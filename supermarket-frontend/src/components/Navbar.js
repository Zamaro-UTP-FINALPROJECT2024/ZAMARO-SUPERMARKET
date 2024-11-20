import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
  const { carrito } = useCarrito();

  return (
    <nav>
      <Link to="/">Inicio</Link> | <Link to="/productos">Productos</Link> |{" "}
      <Link to="/carrito">Carrito ({carrito.length})</Link>
    </nav>
  );
}

export default Navbar;

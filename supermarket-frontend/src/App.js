import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/productos">Productos</Link> |{" "}
        <Link to="/carrito">Carrito</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </div>
  );
}

export default App;

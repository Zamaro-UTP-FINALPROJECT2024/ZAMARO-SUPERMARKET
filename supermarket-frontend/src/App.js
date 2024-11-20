import React from "react";
import { Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Navbar from "./components/Navbar";

function App() {
  return (
    <CarritoProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </CarritoProvider>
  );
}

export default App;

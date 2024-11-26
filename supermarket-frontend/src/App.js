import React from "react";
import { Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import GestionarProductos from "./pages/GestionarProductos"; 
// En App.js o index.css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <CarritoProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/bodega" element={<GestionarProductos />} />  {/* Nueva ruta */}
      </Routes>
      <Footer />
    </CarritoProvider>
  );
}

export default App;

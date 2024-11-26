import React from "react";
import { Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import GestionarProductos from "./pages/GestionarProductos"; 
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute"; // Importa el componente de rutas privadas

// En App.js o index.css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/bodega" element={<GestionarProductos />} />
          </Route>
        </Routes>
        <Footer />
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;

import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const CarritoContext = createContext();

// Hook para usar el contexto
export const useCarrito = () => useContext(CarritoContext);

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.producto_id === producto.producto_id);
      if (existe) {
        alert(`${producto.nombre} ya está en el carrito.`);
        return prev;
      }
      return [...prev, producto];
    });
  };

  const eliminarDelCarrito = (producto_id) => {
    setCarrito((prev) => prev.filter((item) => item.producto_id !== producto_id));
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

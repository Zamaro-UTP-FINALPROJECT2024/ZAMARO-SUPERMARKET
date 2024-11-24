import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

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

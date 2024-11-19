import React, { useState } from "react";

function Carrito() {
  const [carrito, setCarrito] = useState([]);

  const quitarDelCarrito = (productoId) => {
    setCarrito(carrito.filter((producto) => producto.producto_id !== productoId));
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {carrito.map((producto) => (
            <li key={producto.producto_id}>
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <button onClick={() => quitarDelCarrito(producto.producto_id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Carrito;

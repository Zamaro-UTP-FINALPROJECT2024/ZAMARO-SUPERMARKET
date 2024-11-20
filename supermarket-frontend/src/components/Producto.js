import React from "react";

function Producto({ producto, onAgregar }) {
  return (
    <div>
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <button onClick={() => onAgregar(producto)}>Añadir al carrito</button>
    </div>
  );
}

export default Producto;

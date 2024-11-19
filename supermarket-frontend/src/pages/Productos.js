import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000"; // Cambia si usas otro host o puerto

function Productos() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/productos`).then((response) => {
      setProductos(response.data);
    });
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`${producto.nombre} añadido al carrito.`);
  };

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.producto_id}>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <button onClick={() => agregarAlCarrito(producto)}>Añadir al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;

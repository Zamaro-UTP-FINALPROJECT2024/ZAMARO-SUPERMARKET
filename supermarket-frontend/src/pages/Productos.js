import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCarrito } from "../context/CarritoContext";

const API_URL = "http://localhost:5000";

function Productos() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    axios.get(`${API_URL}/productos`).then((response) => {
      setProductos(response.data);
    });
  }, []);

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

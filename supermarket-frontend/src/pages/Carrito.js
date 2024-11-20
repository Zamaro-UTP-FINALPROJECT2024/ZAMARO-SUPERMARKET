import React from "react";
import { useCarrito } from "../context/CarritoContext";
import axios from "axios";

const API_URL = "http://localhost:5000";

function Carrito() {
  const { carrito, eliminarDelCarrito } = useCarrito();

  const enviarOrden = async () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const data = {
      cliente_id: null, // Cambia esto si tienes autenticación
      carrito: carrito.map((producto) => ({
        producto_id: producto.producto_id,
        cantidad: 1, // O ajusta según tu lógica
        subtotal: producto.precio,
      })),
    };

    try {
      const response = await axios.post(`${API_URL}/ordenes`, data);
      alert(`Orden enviada exitosamente. ID de la orden: ${response.data.orden_id}`);
    } catch (error) {
      alert(`Error al enviar la orden: ${error.response?.data?.error || error.message}`);
    }
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
              <button onClick={() => eliminarDelCarrito(producto.producto_id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={enviarOrden} disabled={carrito.length === 0}>
        Enviar Orden
      </button>
    </div>
  );
}

export default Carrito;

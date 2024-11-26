import React, { useState } from "react";
import { Container, Grid, Typography, Box, Button, TextField } from "@mui/material";
import { useCarrito } from "../context/CarritoContext";
import axios from "axios";

function Carrito() {
  const { carrito, eliminarDelCarrito } = useCarrito();
  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    tipo_cliente: "guest", // Por defecto, puedes ajustarlo
    keycloak_id: null, // O manejar según tu lógica
  });
  const [loading, setLoading] = useState(false);

  // Calcular el total del carrito
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  // Crear cliente si no existe
  const crearCliente = async () => {
    try {
      const response = await axios.post("http://localhost:5000/clientes", cliente);
      alert("Cliente creado exitosamente.");
      return response.data.cliente_id; // Suponiendo que devuelves el `cliente_id`
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      alert("Hubo un error al crear el cliente.");
      throw error;
    }
  };

  // Confirmar compra
  const confirmarCompra = async () => {
    setLoading(true);
    try {
      // Crear el cliente primero si es necesario
      const clienteId = await crearCliente();

      // Preparar los datos para la API de orden
      const payload = {
        cliente_id: clienteId, // Usar el ID del cliente recién creado
        carrito: carrito.map((producto) => ({
          producto_id: producto.producto_id,
          cantidad: 1, // Ajustar según la lógica de tu aplicación
          subtotal: producto.precio,
        })),
      };

      // Hacer la solicitud POST para crear la orden
      const response = await axios.post("http://localhost:5000/ordenes", payload);

      // Manejar la respuesta del backend
      alert(`Orden creada exitosamente. ID: ${response.data.orden_id}`);
    } catch (error) {
      console.error("Error al confirmar la compra:", error);
      alert("Hubo un error al procesar tu compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Título */}
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Tu Carrito de Compras
      </Typography>

      {/* Formulario de Cliente */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Información del Cliente</Typography>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cliente.nombre}
          onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cliente.email}
          onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
        />
        <TextField
          label="Tipo de Cliente"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cliente.tipo_cliente}
          onChange={(e) => setCliente({ ...cliente, tipo_cliente: e.target.value })}
        />
      </Box>

      {/* Si el carrito está vacío */}
      {carrito.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="textSecondary">
          No tienes productos en el carrito.
        </Typography>
      ) : (
        <>
          {/* Lista de productos en el carrito */}
          <Grid container spacing={3}>
            {carrito.map((producto) => (
              <Grid item xs={12} sm={6} md={4} key={producto.producto_id}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">{producto.nombre}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {producto.descripcion}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Precio: ${producto.precio}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => eliminarDelCarrito(producto.producto_id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Total y Botón de Confirmar Compra */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={confirmarCompra}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar Compra"}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Carrito;

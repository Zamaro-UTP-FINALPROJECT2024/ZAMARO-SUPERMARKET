import React from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { useCarrito } from "../context/CarritoContext";

function Carrito() {
  const { carrito, eliminarDelCarrito } = useCarrito();

  // Calcular el total del carrito
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  return (
    <Container sx={{ py: 4 }}>
      {/* Título */}
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Tu Carrito de Compras
      </Typography>

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
              onClick={() => alert("Orden enviada con éxito.")}
            >
              Confirmar Compra
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Carrito;

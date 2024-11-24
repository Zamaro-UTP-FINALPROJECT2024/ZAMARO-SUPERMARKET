import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography, TextField, Box } from "@mui/material";
import Producto from "../components/Producto";
import { useCarrito } from "../context/CarritoContext";

const API_URL = "http://localhost:5000";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [search, setSearch] = useState("");
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    axios
      .get(`${API_URL}/productos`)
      .then((response) => {
        setProductos(response.data);
        setFilteredProductos(response.data);
      })
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(value)
    );
    setFilteredProductos(filtered);
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Título */}
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Catálogo de Productos
      </Typography>

      {/* Barra de búsqueda */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: 400 }}
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Productos */}
      {filteredProductos.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="textSecondary">
          No se encontraron productos.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProductos.map((producto) => (
            <Grid item xs={12} sm={6} md={4} key={producto.producto_id}>
              <Producto producto={producto} onAgregar={agregarAlCarrito} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Productos;

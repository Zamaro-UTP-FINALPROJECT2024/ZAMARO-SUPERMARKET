import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import Producto from "../components/Producto";
import { useCarrito } from "../context/CarritoContext";
import Carousel from "../components/Carousel";

const API_URL = "http://localhost:5000";

function Home() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    axios.get(`${API_URL}/productos`).then((response) => {
      setProductos(response.data);
    });
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {/* Carrusel */}
      <Carousel />

      {/* Productos */}
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.producto_id}>
            <Producto producto={producto} onAgregar={agregarAlCarrito} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;

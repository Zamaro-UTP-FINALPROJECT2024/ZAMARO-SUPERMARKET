import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/productos").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.producto_id}>
            <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
              <Typography variant="h6">{product.nombre}</Typography>
              <Typography>Precio: ${product.precio}</Typography>
              <Typography>Stock: {product.stock}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;

import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";

function Producto({ producto, onAgregar }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image="https://via.placeholder.com/300"
        alt={producto.nombre}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {producto.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {producto.descripcion}
        </Typography>
        <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
          Precio: ${producto.precio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={() => onAgregar(producto)}>
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
}

export default Producto;

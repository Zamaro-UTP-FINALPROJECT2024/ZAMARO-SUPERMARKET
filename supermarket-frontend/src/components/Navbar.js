import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
  const { carrito } = useCarrito();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Supermercado Zamaro
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/productos">
          Productos
        </Button>
        <Button color="inherit" component={Link} to="/carrito">
          Carrito ({carrito.length})
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

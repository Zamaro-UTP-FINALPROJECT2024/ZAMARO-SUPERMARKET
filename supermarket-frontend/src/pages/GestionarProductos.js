import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";

const GestionarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [productoId, setProductoId] = useState(null);  // ID del producto para editar

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/productos/${id}`);
      fetchProductos();  // Refresca la lista de productos después de la eliminación
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  const handleAddProduct = async () => {
    const nuevoProducto = {
      nombre,
      precio: parseFloat(precio),
      descripcion,
      categoria_id: parseInt(categoriaId),
    };
    try {
      await axios.post("http://localhost:5000/productos", nuevoProducto);
      fetchProductos();  // Refresca la lista después de agregar el producto
    } catch (error) {
      console.error("Error al agregar producto", error);
    }
  };

  const handleEdit = (producto) => {
    setProductoId(producto.producto_id);  // Establece el ID del producto a editar
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setDescripcion(producto.descripcion);
    setCategoriaId(producto.categoria_id);
  };

  const handleUpdateProduct = async () => {
    const updatedProduct = {
      nombre,
      precio: parseFloat(precio),
      descripcion,
      categoria_id: parseInt(categoriaId),
    };
    try {
      await axios.put(`http://localhost:5000/productos/${productoId}`, updatedProduct);
      fetchProductos();  // Refresca la lista después de actualizar el producto
      clearForm();
    } catch (error) {
      console.error("Error al actualizar producto", error);
    }
  };

  const clearForm = () => {
    setProductoId(null);
    setNombre("");
    setPrecio("");
    setDescripcion("");
    setCategoriaId("");
  };

  return (
    <div>
      <h2>Gestionar Productos</h2>
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        label="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        type="number"
      />
      <TextField
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <TextField
        label="Categoría ID"
        value={categoriaId}
        onChange={(e) => setCategoriaId(e.target.value)}
        type="number"
      />
      {productoId ? (
        <Button onClick={handleUpdateProduct}>Actualizar Producto</Button>
      ) : (
        <Button onClick={handleAddProduct}>Agregar Producto</Button>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoría ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.producto_id}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>{producto.descripcion}</TableCell>
                <TableCell>{producto.categoria_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(producto)}>Editar</Button>
                  <Button onClick={() => handleDelete(producto.producto_id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GestionarProductos;
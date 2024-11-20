-- Tabla de Categorías
CREATE TABLE Categoria (
    categoria_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de Subcategorías
CREATE TABLE Subcategoria (
    subcategoria_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES Categoria(categoria_id) ON DELETE CASCADE
);

-- Tabla de Productos
CREATE TABLE Productos (
    producto_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    categoria_id INT NOT NULL,
    subcategoria_id INT,
    links TEXT,
    FOREIGN KEY (categoria_id) REFERENCES Categoria(categoria_id) ON DELETE CASCADE,
    FOREIGN KEY (subcategoria_id) REFERENCES Subcategoria(subcategoria_id) ON DELETE SET NULL
);

-- Tabla de Bodegas
CREATE TABLE Bodega (
    bodega_id SERIAL PRIMARY KEY,
    ubicacion VARCHAR(255) NOT NULL
);

-- Tabla de Stock (relaciona Productos y Bodega)
CREATE TABLE Stock (
    stock_id SERIAL PRIMARY KEY,
    producto_id INT NOT NULL,
    bodega_id INT NOT NULL,
    cantidad INT DEFAULT 0,
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id) ON DELETE CASCADE,
    FOREIGN KEY (bodega_id) REFERENCES Bodega(bodega_id) ON DELETE CASCADE
);

-- Tabla de Clientes
CREATE TABLE Clientes (
    cliente_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    tipo_cliente VARCHAR(50) NOT NULL CHECK (tipo_cliente IN ('guest', 'registrado')),
    keycloak_id UUID UNIQUE
);

-- Tabla de Órdenes
CREATE TABLE Ordenes (
    orden_id SERIAL PRIMARY KEY,
    cliente_id INT, -- Relación con la tabla Clientes (si hay un cliente registrado)
    total DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id) ON DELETE SET NULL
);

-- Tabla Detalle de Órdenes
CREATE TABLE DetalleOrdenes (
    detalle_id SERIAL PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES Ordenes(orden_id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id) ON DELETE CASCADE
);


-- Insertar datos en Categoria
INSERT INTO Categoria (nombre) VALUES
('Alimentos'),
('Bebidas'),
('Higiene'),
('Lácteos');

-- Insertar datos en Subcategoria
INSERT INTO Subcategoria (nombre, categoria_id) VALUES
('Galletas', 1),
('Snacks', 1),
('Jugos', 2),
('Cervezas', 2),
('Jabones', 3),
('Shampoo', 3),
('Leche', 4),
('Quesos', 4);

-- Insertar datos en Productos
INSERT INTO Productos (nombre, descripcion, precio, stock, categoria_id, subcategoria_id, links) VALUES
('Oreo', 'Galletas rellenas de crema', 1.50, 100, 1, 1, 'https://example.com/oreo'),
('Pringles', 'Papas fritas en tubo', 3.00, 50, 1, 2, 'https://example.com/pringles'),
('Coca-Cola', 'Bebida gaseosa clásica', 1.00, 200, 2, 3, 'https://example.com/coca-cola'),
('Corona', 'Cerveza ligera mexicana', 1.75, 150, 2, 4, 'https://example.com/corona');

-- Insertar datos en Bodega
INSERT INTO Bodega (ubicacion) VALUES
('Central'),
('Norte'),
('Sur');

-- Insertar datos en Stock
INSERT INTO Stock (producto_id, bodega_id, cantidad) VALUES
(1, 1, 50),
(1, 2, 50),
(2, 1, 30),
(3, 3, 100),
(4, 3, 50);

-- Insertar datos en Clientes
INSERT INTO Clientes (nombre, email, tipo_cliente, keycloak_id) VALUES
('Juan Pérez', 'juan.perez@example.com', 'registrado', '123e4567-e89b-12d3-a456-426614174000'),
('María Gómez', 'maria.gomez@example.com', 'guest', NULL),
('Carlos Díaz', 'carlos.diaz@example.com', 'registrado', '123e4567-e89b-12d3-a456-426614174001');

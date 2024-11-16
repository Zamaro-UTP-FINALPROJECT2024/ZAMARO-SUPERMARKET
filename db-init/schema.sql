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

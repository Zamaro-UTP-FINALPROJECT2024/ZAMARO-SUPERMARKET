from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

# Modelos
class Categoria(db.Model):
    __tablename__ = 'categoria'
    categoria_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)

class Subcategoria(db.Model):
    __tablename__ = 'subcategoria'
    subcategoria_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categoria.categoria_id', ondelete='CASCADE'), nullable=False)

class Productos(db.Model):
    __tablename__ = 'productos'
    producto_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text)
    precio = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, default=0)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categoria.categoria_id', ondelete='CASCADE'), nullable=False)
    subcategoria_id = db.Column(db.Integer, db.ForeignKey('subcategoria.subcategoria_id', ondelete='SET NULL'))

# Tabla de Bodegas
class Bodega(db.Model):
    __tablename__ = 'bodega'
    bodega_id = db.Column(db.Integer, primary_key=True)
    ubicacion = db.Column(db.String(255), nullable=False)

# Tabla de Stock
class Stock(db.Model):
    __tablename__ = 'stock'
    stock_id = db.Column(db.Integer, primary_key=True)
    producto_id = db.Column(db.Integer, db.ForeignKey('productos.producto_id', ondelete='CASCADE'), nullable=False)
    bodega_id = db.Column(db.Integer, db.ForeignKey('bodega.bodega_id', ondelete='CASCADE'), nullable=False)
    cantidad = db.Column(db.Integer, default=0)

# Tabla de Clientes
class Clientes(db.Model):
    __tablename__ = 'clientes'
    cliente_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=True)
    tipo_cliente = db.Column(db.String(50), nullable=False)
    keycloak_id = db.Column(db.String(36), unique=True, nullable=True)

class Orden(db.Model):
    __tablename__ = 'ordenes'
    orden_id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.cliente_id'), nullable=True)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    fecha = db.Column(db.DateTime, server_default=db.func.current_timestamp())

class DetalleOrden(db.Model):
    __tablename__ = 'detalle_ordenes'
    detalle_id = db.Column(db.Integer, primary_key=True)
    orden_id = db.Column(db.Integer, db.ForeignKey('ordenes.orden_id', ondelete="CASCADE"), nullable=False)
    producto_id = db.Column(db.Integer, db.ForeignKey('productos.producto_id', ondelete="CASCADE"), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
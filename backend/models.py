from sqlalchemy import (
    Column, Integer, String, Text, DECIMAL, ForeignKey, CheckConstraint, create_engine
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

Base = declarative_base()

# Tabla de Categorías
class Categoria(Base):
    __tablename__ = 'categoria'
    categoria_id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    subcategorias = relationship('Subcategoria', back_populates='categoria')

# Tabla de Subcategorías
class Subcategoria(Base):
    __tablename__ = 'subcategoria'
    subcategoria_id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    categoria_id = Column(Integer, ForeignKey('categoria.categoria_id', ondelete='CASCADE'), nullable=False)
    categoria = relationship('Categoria', back_populates='subcategorias')
    productos = relationship('Productos', back_populates='subcategoria')

# Tabla de Productos
class Productos(Base):
    __tablename__ = 'productos'
    producto_id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text)
    precio = Column(DECIMAL(10, 2), nullable=False)
    stock = Column(Integer, default=0)
    categoria_id = Column(Integer, ForeignKey('categoria.categoria_id', ondelete='CASCADE'), nullable=False)
    subcategoria_id = Column(Integer, ForeignKey('subcategoria.subcategoria_id', ondelete='SET NULL'))
    categoria = relationship('Categoria')
    subcategoria = relationship('Subcategoria', back_populates='productos')

# Tabla de Bodegas
class Bodega(Base):
    __tablename__ = 'bodega'
    bodega_id = Column(Integer, primary_key=True)
    ubicacion = Column(String(255), nullable=False)
    stocks = relationship('Stock', back_populates='bodega')

# Tabla de Stock
class Stock(Base):
    __tablename__ = 'stock'
    stock_id = Column(Integer, primary_key=True)
    producto_id = Column(Integer, ForeignKey('productos.producto_id', ondelete='CASCADE'), nullable=False)
    bodega_id = Column(Integer, ForeignKey('bodega.bodega_id', ondelete='CASCADE'), nullable=False)
    cantidad = Column(Integer, default=0)
    producto = relationship('Productos')
    bodega = relationship('Bodega', back_populates='stocks')

# Tabla de Clientes
class Clientes(Base):
    __tablename__ = 'clientes'
    cliente_id = Column(Integer, primary_key=True)
    nombre = Column(String(100))
    email = Column(String(100), unique=True)
    tipo_cliente = Column(String(50), CheckConstraint("tipo_cliente IN ('guest', 'registrado')"), nullable=False)
    keycloak_id = Column(String, unique=True)

import os
from flask import Flask, jsonify,request
from flask_cors import CORS
from models import db, Categoria, Subcategoria, Productos, Bodega, Stock, Clientes , Orden, DetalleOrden # Importar la instancia de db y los modelos
from sqlalchemy.pool import QueuePool

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:password@db:5432/supermarket'
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'poolclass': QueuePool,
    'pool_pre_ping': True,  # Habilita verificación de conexión
}

# Inicializar la base de datos con la aplicación
db.init_app(app)

# Rutas para Categorías
@app.route('/categorias', methods=['GET'])
def get_categorias():
    categorias = Categoria.query.all()
    return jsonify([{'categoria_id': c.categoria_id, 'nombre': c.nombre} for c in categorias])

@app.route('/categorias', methods=['POST'])
def add_categoria():
    data = request.json
    nueva_categoria = Categoria(nombre=data['nombre'])
    db.session.add(nueva_categoria)
    db.session.commit()
    return jsonify({'message': 'Categoría creada exitosamente'}), 201

# Rutas para Subcategorías
@app.route('/subcategorias', methods=['GET'])
def get_subcategorias():
    subcategorias = Subcategoria.query.all()
    return jsonify([{'subcategoria_id': s.subcategoria_id, 'nombre': s.nombre, 'categoria_id': s.categoria_id} for s in subcategorias])

@app.route('/subcategorias', methods=['POST'])
def add_subcategoria():
    data = request.json
    nueva_subcategoria = Subcategoria(nombre=data['nombre'], categoria_id=data['categoria_id'])
    db.session.add(nueva_subcategoria)
    db.session.commit()
    return jsonify({'message': 'Subcategoría creada exitosamente'}), 201

# Rutas para Productos
@app.route('/productos', methods=['GET'])
def get_productos():
    productos = Productos.query.all()
    return jsonify([{
        'producto_id': p.producto_id,
        'nombre': p.nombre,
        'descripcion': p.descripcion,
        'precio': float(p.precio),
        'stock': p.stock,
        'categoria_id': p.categoria_id,
        'subcategoria_id': p.subcategoria_id
    } for p in productos])

@app.route('/productos', methods=['POST'])
def add_producto():
    data = request.json
    nuevo_producto = Productos(
        nombre=data['nombre'],
        descripcion=data.get('descripcion'),
        precio=data['precio'],
        stock=data.get('stock', 0),
        categoria_id=data['categoria_id'],
        subcategoria_id=data.get('subcategoria_id')
    )
    db.session.add(nuevo_producto)
    db.session.commit()
    return jsonify({'message': 'Producto creado exitosamente'}), 201

# Rutas para Bodegas
@app.route('/bodegas', methods=['GET'])
def get_bodegas():
    bodegas = Bodega.query.all()
    return jsonify([{'bodega_id': b.bodega_id, 'ubicacion': b.ubicacion} for b in bodegas])

@app.route('/bodegas', methods=['POST'])
def add_bodega():
    data = request.json
    nueva_bodega = Bodega(ubicacion=data['ubicacion'])
    db.session.add(nueva_bodega)
    db.session.commit()
    return jsonify({'message': 'Bodega creada exitosamente'}), 201

# Rutas para Clientes
@app.route('/clientes', methods=['GET'])
def get_clientes():
    clientes = Clientes.query.all()
    return jsonify([{
        'cliente_id': c.cliente_id,
        'nombre': c.nombre,
        'email': c.email,
        'tipo_cliente': c.tipo_cliente,
        'keycloak_id': c.keycloak_id
    } for c in clientes])

@app.route('/clientes', methods=['POST'])
def add_cliente():
    data = request.json
    nuevo_cliente = Clientes(
        nombre=data.get('nombre'),
        email=data.get('email'),
        tipo_cliente=data['tipo_cliente'],
        keycloak_id=data.get('keycloak_id')
    )
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente creado exitosamente'}), 201

@app.route('/ordenes', methods=['POST'])
def crear_orden():
    try:
        data = request.json
        cliente_id = data.get('cliente_id')  # Opcional
        carrito = data['carrito']  # Lista de productos con cantidad y subtotal

        # Calcular el total de la orden
        total = sum(item['subtotal'] for item in carrito)

        # Crear la orden
        nueva_orden = Orden(cliente_id=cliente_id, total=total)
        db.session.add(nueva_orden)
        db.session.flush()  # Obtener el ID de la nueva orden

        # Agregar los detalles de la orden
        for item in carrito:
            detalle = DetalleOrden(
                orden_id=nueva_orden.orden_id,
                producto_id=item['producto_id'],
                cantidad=item['cantidad'],
                subtotal=item['subtotal']
            )
            db.session.add(detalle)

        db.session.commit()
        return jsonify({'message': 'Orden creada exitosamente', 'orden_id': nueva_orden.orden_id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@app.route('/')
def hello_world():
    return 'Metelemente no saldras'

if __name__ == '__main__':
    # Crear tablas si no existen
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)

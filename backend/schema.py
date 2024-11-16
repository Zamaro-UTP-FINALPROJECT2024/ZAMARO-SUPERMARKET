import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import Categoria, Subcategoria, Productos, Stock, Clientes, Bodega
from sqlalchemy.orm import scoped_session

# Define los tipos para GraphQL
class CategoriaType(SQLAlchemyObjectType):
    class Meta:
        model = Categoria
        interfaces = (graphene.relay.Node,)

class SubcategoriaType(SQLAlchemyObjectType):
    class Meta:
        model = Subcategoria
        interfaces = (graphene.relay.Node,)

class ProductosType(SQLAlchemyObjectType):
    class Meta:
        model = Productos
        interfaces = (graphene.relay.Node,)

class BodegaType(SQLAlchemyObjectType):
    class Meta:
        model = Bodega
        interfaces = (graphene.relay.Node,)

class StockType(SQLAlchemyObjectType):
    class Meta:
        model = Stock
        interfaces = (graphene.relay.Node,)

class ClientesType(SQLAlchemyObjectType):
    class Meta:
        model = Clientes
        interfaces = (graphene.relay.Node,)

# Define las queries
class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    all_categorias = SQLAlchemyConnectionField(CategoriaType.connection)
    all_subcategorias = SQLAlchemyConnectionField(SubcategoriaType.connection)
    all_productos = SQLAlchemyConnectionField(ProductosType.connection)
    all_bodegas = SQLAlchemyConnectionField(BodegaType.connection)
    all_stocks = SQLAlchemyConnectionField(StockType.connection)
    all_clientes = SQLAlchemyConnectionField(ClientesType.connection)

schema = graphene.Schema(query=Query)

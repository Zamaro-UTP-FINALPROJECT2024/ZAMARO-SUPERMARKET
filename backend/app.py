from flask import Flask
"""from flask_graphql import GraphQLView
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from schema import schema
from models import Base
"""
app = Flask(__name__)

# Configura la base de datos PostgreSQL
DATABASE_URL = 'postgresql://username:password@localhost:5432/supermarket'
"""try:
    engine = create_engine(DATABASE_URL, echo=True)  # `echo=True` para debug
    Session = sessionmaker(bind=engine)
    db_session = scoped_session(Session)
    Base.metadata.bind = engine
    db_session = scoped_session(sessionmaker(bind=engine))
    # Configura la ruta de GraphQL
    app.add_url_rule(
        '/graphql',
        view_func=GraphQLView.as_view(
            'graphql',
            schema=schema,
            graphiql=True  # Habilita la interfaz gráfica para pruebas
        )
    )
    print("Conexión exitosa a la base de datos.")
except Exception as e:
    print("Error al conectar con la base de datos:", e)
    raise"""


# Ruta de Health Check
@app.route('/', methods=['GET'])
def health_check():
    return {"status": "La API está funcionando correctamente."}, 200

# Limpia la sesión después de cada solicitud
#@app.teardown_appcontext
#def shutdown_session(exception=None):
#    db_session.remove()

if __name__ == '__main__':
    print("Iniciando la aplicación... La API está funcionando en http://127.0.0.1:5000/health")
    app.run(debug=True)

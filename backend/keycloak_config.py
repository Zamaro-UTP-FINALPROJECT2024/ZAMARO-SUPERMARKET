from keycloak import KeycloakOpenID

# Configuración de Keycloak
keycloak_openid = KeycloakOpenID(
    server_url="http://keycloak:8080/",  # Nombre del contenedor de Keycloak
    client_id="backend",                # ID del cliente en Keycloak
    realm_name="supermarket",           # Nombre del realm en Keycloak
    client_secret_key="YOUR_CLIENT_SECRET"  # Secreto del cliente (si es confidencial)
)

# Función para verificar el token
def verify_token(token):
    try:
        userinfo = keycloak_openid.userinfo(token)
        return userinfo
    except Exception as e:
        return {"error": str(e)}

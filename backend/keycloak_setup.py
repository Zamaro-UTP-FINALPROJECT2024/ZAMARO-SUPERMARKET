import requests

KEYCLOAK_URL = "http://localhost:8080"
REALM_NAME = "supermarket"
ADMIN_USER = "admin"
ADMIN_PASSWORD = "admin"

def create_realm():
    token = get_admin_token()
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    
    # Crea el realm
    realm_data = {"realm": REALM_NAME, "enabled": True}
    requests.post(f"{KEYCLOAK_URL}/admin/realms", json=realm_data, headers=headers)

def create_user(username, password, roles):
    token = get_admin_token()
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    # Crea el usuario
    user_data = {
        "username": username,
        "enabled": True,
        "credentials": [{"type": "password", "value": password, "temporary": False}],
    }
    requests.post(f"{KEYCLOAK_URL}/admin/realms/{REALM_NAME}/users", json=user_data, headers=headers)

    # Asigna roles al usuario
    # (Opcional, deberías mapear roles previamente creados)
    # Aquí podrías hacer otra solicitud para asignar roles

def get_admin_token():
    data = {
        "client_id": "admin-cli",
        "username": ADMIN_USER,
        "password": ADMIN_PASSWORD,
        "grant_type": "password",
    }
    response = requests.post(f"{KEYCLOAK_URL}/realms/master/protocol/openid-connect/token", data=data)
    return response.json()["access_token"]

if __name__ == "__main__":
    create_realm()
    create_user("admin-frontend", "admin123", ["admin"])
    create_user("client-supermarket", "client123", ["user"])

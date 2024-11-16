from flask import Flask, request, jsonify
from keycloak_config import verify_token

app = Flask(__name__)

@app.route("/")
def home():
    return "Welcome to the Flask Backend!"

@app.route("/protected", methods=["GET"])
def protected():
    # Obtener el token del encabezado de autorización
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Token missing"}), 401

    token = auth_header.split(" ")[1]  # Formato: "Bearer <token>"
    userinfo = verify_token(token)

    if "error" in userinfo:
        return jsonify(userinfo), 401

    return jsonify({"message": "Welcome, authorized user!", "userinfo": userinfo})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

# Universidad Tecnológica de Panamá
### Facultad de Ingeniería de Sistemas Computacionales
**Maestría en Ciencias Computacionales**

**Asignatura:** Metodología para el Desarrollo de Sistemas  
**Grupo:** 1M3214  
**Facilitador:** Prof. Huriviades Calderón Gómez  
**Integrantes:**
- Roberto Rodriguez 
- Piero Zavaleta 
- Alexis Martinez 

**Panamá**  
**Segundo Semestre 2024**

---

## Introducción

El e-commerce, o comercio electrónico, representa una transformación significativa en el modelo de negocios, beneficiando tanto a vendedores como a clientes. Este estudio explora el comercio electrónico y detalla cómo nuestro proyecto, empleando tecnologías como Docker y Docker Compose, aprovechará esta tendencia, facilitando la compra de productos en línea.

La investigación se sustenta en fuentes académicas y artículos especializados en tecnología digital y comercio electrónico, obtenidos a través de Google Scholar.

---

## Datos del Proyecto

**Título del Proyecto:**  
**Proyecto: ZAMARO - Supermercado en Línea**

**Temática:**  
Este proyecto consiste en la creación de una plataforma de comercio electrónico que permita a los usuarios comprar productos en línea desde un supermercado virtual. A través de una interfaz intuitiva y responsiva, los usuarios podrán navegar, agregar productos al carrito de compras y realizar pedidos con facilidad. La plataforma abarca aspectos como gestión de usuarios, catálogos de productos, autenticación segura y procesamiento de pedidos, con un enfoque en escalabilidad y seguridad.

**Objetivo:**  
Crear una plataforma de ecommerce para un supermercado en línea que permita a los usuarios explorar productos, gestionar un carrito de compras, realizar pedidos y verificar disponibilidad, proporcionando una experiencia intuitiva y automatizada.

**Descripción:**  
Una plataforma de comercio electrónico diseñada para brindar una experiencia de compra digital eficiente. Con una interfaz moderna, permite a los usuarios gestionar su carrito y realizar pedidos fácilmente. La infraestructura se apoya en contenedores para escalabilidad y mantenimiento, con un sistema de autenticación centralizado y soporte para Google y Facebook.

---

## Propuesta de Software y Paquetes

**Frontend:**
- **React:** Biblioteca para la interfaz de usuario.
- **Axios:** Para realizar solicitudes HTTP.
- **React Router:** Para navegación.
- **Material UI:** Componentes de interfaz.
- **dotenv:** Gestión de variables de entorno.

**Backend:**
- **FastAPI:** Framework para el backend.
- **SQLAlchemy:** ORM para PostgreSQL.
- **Pydantic:** Validación de datos.
- **uvicorn:** Servidor ASGI.
- **python-jose:** Manejo de tokens JWT.
- **requests:** Para peticiones HTTP internas.
- **psycopg2:** Conector para PostgreSQL.
- **python-dotenv:** Variables de entorno.

---

## Diagrama de Casos de Uso

![Diagrama de Casos de Uso](images/diagrama_casos_uso.png)
---

# Instalación de Docker y Docker Compose

### En sistemas Linux (Ubuntu/Debian):

```bash
# Actualizar paquetes existentes
sudo apt-get update

# Instalar paquetes necesarios para usar repositorios HTTPS
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

# Añadir la clave GPG oficial de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Añadir el repositorio de Docker
echo \"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Actualizar los índices de paquetes e instalar Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Verificar instalación
sudo docker --version

# Instalar Docker Compose
sudo curl -L \"https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose

# Dar permisos de ejecución al binario
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalación de Docker Compose
docker-compose --version
```

### En sistemas macOS:

```bash
# Instalar Docker Desktop desde Homebrew
brew install --cask docker

# Abrir Docker Desktop manualmente para que se inicialice
open /Applications/Docker.app

# Verificar instalación
docker --version
docker-compose --version
```

### En sistemas Windows:

```bash
# Descargar e instalar Docker Desktop
# 1. Ir a https://www.docker.com/products/docker-desktop/
# 2. Descargar el instalador para Windows.
# 3. Ejecutar el instalador y seguir las instrucciones en pantalla.

# Configuración post-instalación
# Asegúrate de que WSL2 esté habilitado si usas Windows 10/11 (necesario para Docker).

# Verificar instalación
powershell
docker --version
docker-compose --version
```

### Nota final:
Para que Docker funcione correctamente sin `sudo` en Linux, añade tu usuario al grupo `docker`:

```bash
sudo usermod -aG docker $USER
# Reinicia la sesión o ejecuta el siguiente comando para aplicar los cambios inmediatamente:
newgrp docker


## Referencias Bibliográficas

1. C. F. Bowman, L. Hernández, and S. Gerardotr, *Algoritmos y estructuras de datos: aproximación en C.*, 1999.
2. M. Ahmad and Y. Zhang, *Enhanced Graph Algorithms Using Hybrid Data Structures,* IEEE International Conference on Big Data, 2023.
3. C. Rodriguez, A. Lin, and M. Thomas, *A Novel Community Detection Algorithm for Sparse Data Networks,* IEEE Transactions on Knowledge and Data Engineering, vol. 35, no. 5, pp. 876-888, 2023.


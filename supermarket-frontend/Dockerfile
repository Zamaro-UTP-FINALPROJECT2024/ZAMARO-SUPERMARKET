# Usa la imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install axios react-router-dom @mui/material @emotion/react @emotion/styled react-slick slick-carousel --save @types/react-slick


# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando por defecto para iniciar el servidor
CMD ["npm", "start"]

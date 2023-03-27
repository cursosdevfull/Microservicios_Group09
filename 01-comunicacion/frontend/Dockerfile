# Instalar NodeJS
FROM node:16.19.1-alpine

ARG BASE_DIR

WORKDIR /app

# Copiando los archivos del proyecto
COPY ${BASE_DIR}/package.json .

# Accediendo a la carpeta de la aplicación
RUN npm install

COPY ${BASE_DIR}/ .

# Iniciamos la aplicación
CMD ["npm", "start"]

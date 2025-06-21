# Etapa de construcción
FROM node:21.1.0 AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar la app para producción (carpeta build)
RUN npm run build

# Etapa de producción con servidor Nginx
FROM nginx:alpine

# Copiar archivos estáticos de React al directorio web de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto por donde sirve nginx
EXPOSE 80

# Comando por defecto de nginx
CMD ["nginx", "-g", "daemon off;"]
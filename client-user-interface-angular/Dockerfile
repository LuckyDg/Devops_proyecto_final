# Etapa 1: Compilar la aplicación Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir la aplicación con nginx
FROM nginx:alpine
COPY --from=build /app/dist/client-user-interface-angular/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

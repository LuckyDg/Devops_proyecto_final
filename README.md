# Proyecto con Docker Compose

Este proyecto utiliza **Docker Compose** para configurar y levantar una aplicación compuesta por varios servicios: un backend, una base de datos PostgreSQL y un frontend.

---

## Requisitos Previos

1. **Docker** y **Docker Compose** instalados en tu sistema.
2. Archivo `.env.template` renombrado como `.env` en el directorio principal

---

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

```
/
├── api-users/               # Backend (NestJS o similar)
│   ├── Dockerfile
│   └── ...
├── client-user-interface/   # Frontend (Next.js o similar)
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml       # Configuración de Docker Compose
├── .env                     # Variables de entorno para Docker Compose
└── README.md                # Documentación del proyecto
```

---

## Configuración de Variables de Entorno

Crea un archivo `.env` en el directorio principal con el siguiente contenido:

```env
# Puertos
API_PORT=64001
FRONTEND_PORT=3000

# Base de datos
DB_HOST=auth-db
DB_PORT=5432
DB_USER=devops
DB_PASS=devops
DB_NAME=auth_db_devops

# JWT Secret
JWT_SECRET=your-secret-key

# URL pública del backend para el frontend
NEXT_PUBLIC_API_URL=http://localhost:64001/api
```

Para el frontend (Next.js), también puedes configurar un archivo `.env` dentro de `client-user-interface/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:64001/api
```

---

## Levantar el Proyecto

Ejecuta los siguientes comandos desde el directorio principal del proyecto:

1. **Construir y levantar los servicios**:

   ```bash
   docker-compose up -d --build
   ```

2. **Verificar que todos los contenedores están corriendo**:

   ```bash
   docker ps
   ```

   Deberías ver tres servicios principales:
   - `api-users`: Backend.
   - `auth-db`: Base de datos PostgreSQL.
   - `client-user-interface`: Frontend.

3. **Acceso a los servicios**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:64001/api](http://localhost:64001/api)

4. **Probar con Postman**:
   - Descargar [Postman](https://www.postman.com/downloads/) y el archivo de configuración [BootCamp_Devops_Monolito.postman_collection](BootCamp_Devops_Monolito.postman_collection) para probar la API.
   - Importar el archivo de configuración en Postman.
   - Abrir la colección y seleccionar la petición `GET /api/auth/users`.
---

## Comandos útiles

- **Detener todos los contenedores**:
  ```bash
  docker-compose down
  ```
---

## Notas Adicionales

1. **Persistencia de Datos**:
   - La base de datos PostgreSQL utiliza un volumen llamado `auth-db-devops-data` para persistir los datos, incluso si el contenedor se elimina.

2. **Salud de los Servicios**:
   - Cada servicio incluye un `healthcheck` para verificar que está funcionando correctamente. Esto asegura que los servicios dependientes no se inicialicen hasta que los otros estén listos.

3. **Variables Sensibles**:
   - El archivo `.env` no debe incluirse en el repositorio. Agrega `.env` al archivo `.gitignore`.
   - Para ello hay un template `.env.template` que puedes copiar y renombrar como `.env`. y configurar las variables de entorno.

   ```gitignore
   # Ignorar archivos de entorno
   .env
   ```

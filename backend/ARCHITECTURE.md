## Backend

Base esperada: Node.js + Express + PostgreSQL + Prisma + JWT + bcrypt.

El backend por ahora tiene estructura de carpetas y archivos, pero no tiene implementacion ni `package.json`. La idea es que primero tengas claro donde va cada responsabilidad.

### Carpetas backend

- `backend`: aplicacion backend separada del frontend.
- `backend/docs`: documentacion tecnica futura del backend, por ejemplo decisiones de API, estructura de base de datos o notas de despliegue.
- `backend/prisma`: configuracion, modelos y scripts relacionados con Prisma.
- `backend/src`: codigo fuente del backend.
- `backend/src/config`: configuraciones compartidas como variables de entorno, Prisma y JWT.
- `backend/src/middlewares`: middlewares de Express que se ejecutan antes o despues de las rutas.
- `backend/src/modules`: modulos de negocio separados por dominio.
- `backend/src/modules/auth`: login, validacion de credenciales y generacion de JWT.
- `backend/src/modules/users`: CRUD de usuarios y cuentas.
- `backend/src/modules/products`: CRUD, busqueda y filtros de productos.
- `backend/src/modules/checkins`: check-in, check-out e historial de visitas.
- `backend/src/modules/statistics`: calculos y datos del dashboard admin.
- `backend/src/modules/notifications`: mails/notificaciones vistos por admin.
- `backend/src/modules/orders`: formularios/pedidos cargados por repositor.
- `backend/src/modules/emails`: envio de pedidos por email.
- `backend/src/routes`: archivo central para montar rutas de todos los modulos.
- `backend/src/utils`: helpers reutilizables que no pertenecen a un modulo especifico.
- `backend/uploads`: archivos subidos al backend si se decide guardar archivos localmente.
- `backend/uploads/products`: imagenes/fotos de productos si se guardan en disco.

### Comandos backend

Desde una compu nueva, cuando quieras empezar a programar el backend:

```bash
cd backend
npm init -y
npm install express cors dotenv jsonwebtoken bcrypt prisma @prisma/client
npm install -D nodemon
npx prisma generate
```

No uses `npx prisma init` en este repo salvo que borres `backend/prisma`, porque ya existe `backend/prisma/schema.prisma`.

Cuando tengas modelos en Prisma y la base PostgreSQL configurada:

```bash
npx prisma migrate dev
npx prisma studio
```

### Entrada y configuracion backend

- `backend/src/server.js`: levanta el servidor y escucha el puerto.
- `backend/src/app.js`: crea la app Express, middlewares globales y rutas.
- `backend/src/routes/index.js`: agrupa rutas de todos los modulos.
- `backend/src/config/env.js`: lee variables de entorno.
- `backend/src/config/prisma.js`: instancia Prisma Client y conecta con PostgreSQL.
- `backend/src/config/jwt.js`: configuracion de firma/verificacion JWT.
- `backend/.env.example`: variables necesarias como `DATABASE_URL`, `JWT_SECRET`, `PORT` y credenciales de mail.

Flujo backend: `server.js` -> `app.js` -> `routes/index.js` -> modulos.

### Middlewares backend

- `backend/src/middlewares/authMiddleware.js`: valida JWT y agrega usuario al request.
- `backend/src/middlewares/roleMiddleware.js`: valida permisos por rol `admin` o `repositor`.
- `backend/src/middlewares/errorMiddleware.js`: maneja errores centralizados.

Se conectan con rutas protegidas de admin y repositor.

### Auth backend

- `backend/src/modules/auth/autRoutes.js`: define `POST /api/auth/login`.
- `backend/src/modules/auth/authController.js`: recibe request/response.
- `backend/src/modules/auth/authService.js`: busca usuario, compara password con bcrypt y genera JWT.

Se conecta con Prisma, bcrypt, JWT y modelo `User`.

### Usuarios backend

- `backend/src/modules/users/usersRoutes.js`: rutas CRUD de usuarios.
- `backend/src/modules/users/userController.js`: maneja requests.
- `backend/src/modules/users/usersService.js`: crea, lista, modifica y elimina usuarios.

Se conecta con Prisma `User`, bcrypt y middleware de rol admin.

### Productos backend

- `backend/src/modules/products/productsRoutes.js`: rutas CRUD de productos.
- `backend/src/modules/products/productsController.js`: maneja requests.
- `backend/src/modules/products/productsService.js`: busqueda, filtros y persistencia.
- `backend/uploads/products`: carpeta para fotos si se guardan localmente.

Se conecta con Prisma `Product` y pantallas admin/repositor.

### Check-ins backend

- `backend/src/modules/checkins/checkinsRoutes.js`: rutas para check-in, check-out e historial.
- `backend/src/modules/checkins/checkinsController.js`: recibe acciones y consultas.
- `backend/src/modules/checkins/checkinsService.js`: guarda entradas/salidas y consulta historial.

Se conecta con Prisma `CheckIn` o `Visit` y usuarios repositor.

### Estadisticas backend

- `backend/src/modules/statistics/statisticsRoutes.js`: endpoints de dashboard admin.
- `backend/src/modules/statistics/statisticsController.js`: responde datos.
- `backend/src/modules/statistics/statisticsService.js`: calcula quiebres, pedidos y resumenes.

Se conecta con productos, pedidos/formularios y checkins.

### Pedidos backend

- `backend/src/modules/orders/ordersRoutes.js`: rutas de formularios/pedidos.
- `backend/src/modules/orders/ordersController.js`: recibe productos reportados.
- `backend/src/modules/orders/ordersService.js`: guarda stock actual, quiebre, cantidad y observaciones.

Se conecta con Prisma `Order` o `StockReport`, productos, usuario repositor y emails.

### Emails backend

- `backend/src/modules/emails/emails.routes.js`: endpoint para enviar pedido por email.
- `backend/src/modules/emails/emails.controller.js`: recibe solicitud de envio.
- `backend/src/modules/emails/emails.service.js`: arma y envia el correo.

Se conecta con pedidos, usuario repositor y configuracion SMTP/Gmail.

### Utilidades backend

- `backend/src/utils/hash.js`: helpers para bcrypt.
- `backend/src/utils/httpError.js`: errores HTTP reutilizables.

### Prisma

- `backend/prisma/schema.prisma`: modelos de base de datos. Deberia contener `User`, `Product`, `CheckIn`/`Visit`, `Order`/`StockReport`, `OrderItem`, `Notification`, `Chain`, `Branch` y `Sector`.
- `backend/prisma/seed.js`: datos iniciales, por ejemplo admin inicial, cadenas, sucursales y sectores.

## Rutas API sugeridas

- `POST /api/auth/login`
- `GET /api/statistics`
- `GET /api/checkins`
- `POST /api/checkins/check-in`
- `POST /api/checkins/check-out`
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/notifications`
- `DELETE /api/notifications/:id`
- `GET /api/orders/my`
- `POST /api/orders`
- `PUT /api/orders/:id`
- `DELETE /api/orders/:id`
- `POST /api/emails/order`

## Backend

Base esperada: Node.js + Express + PostgreSQL en Neon/Vercel + Prisma 7 + JWT + bcrypt.

El backend tiene estructura de carpetas, `package.json`, Prisma configurado para el cambio de Prisma 7 y una instancia de Prisma Client preparada para Neon.

### Carpetas backend

- `backend`: aplicacion backend separada del frontend.
- `backend/docs`: documentacion tecnica futura del backend, por ejemplo decisiones de API, estructura de base de datos o notas de despliegue.
- `backend/prisma`: configuracion, modelos y scripts relacionados con Prisma.
- `backend/src`: codigo fuente del backend.
- `backend/src/config`: configuraciones compartidas como variables de entorno, Prisma y JWT.
- `backend/src/middlewares`: middlewares de Express que se ejecutan antes o despues de las rutas.
- `backend/src/modules`: modulos de negocio separados por dominio. Hoy contienen controllers y services, no las rutas.
- `backend/src/modules/auth`: controller/service para login, validacion de credenciales y generacion de JWT.
- `backend/src/modules/users`: controller/service para CRUD de usuarios y cuentas.
- `backend/src/modules/products`: controller/service para CRUD, busqueda y filtros de productos.
- `backend/src/modules/checkins`: controller/service para check-in, check-out e historial de visitas.
- `backend/src/modules/statistics`: controller/service para calculos y datos del dashboard admin.
- `backend/src/modules/orders`: controller/service para formularios/pedidos cargados por repositor.
- `backend/src/modules/emails`: controller/service para envio de pedidos por email.
- `backend/src/routes`: routers de Express divididos por entrada principal: auth, administrator y stockman.
- `backend/src/utils`: helpers reutilizables que no pertenecen a un modulo especifico.
- `backend/uploads`: archivos subidos al backend si se decide guardar archivos localmente.
- `backend/uploads/products`: imagenes/fotos de productos si se guardan en disco.

### Comandos backend

Desde una compu nueva, cuando quieras empezar a programar el backend:

```bash
cd backend
npm install
npm run prisma:generate
```

No uses `npx prisma init` en este repo salvo que borres `backend/prisma` y `backend/prisma.config.ts`, porque ya existen.

Cuando tengas modelos en Prisma y la base PostgreSQL configurada:

```bash
npm run prisma:migrate
npm run prisma:studio
```

### Entrada y configuracion backend

- `backend/package.json`: declara dependencias y scripts del backend. Incluye Express, Prisma 7, `@prisma/adapter-neon`, JWT, bcrypt, dotenv y nodemon.
- `backend/package-lock.json`: fija versiones exactas instaladas para reproducir el entorno con `npm install`.
- `backend/tsconfig.json`: configuracion TypeScript minima para archivos de tooling del backend, especialmente `prisma.config.ts`.
- `backend/prisma.config.ts`: configuracion nueva de Prisma 7. Define donde esta `schema.prisma`, donde van las migrations y que URL usa Prisma CLI/Migrate.
- `backend/src/server.js`: levanta el servidor y escucha el puerto.
- `backend/src/app.js`: crea la app Express, middlewares globales y rutas.
- `backend/src/routes/index.js`: router principal. Monta `/auth`, `/administrator` y `/stockman`.
- `backend/src/routes/authRoutes.js`: rutas publicas/de sesion: login, usuario actual y logout.
- `backend/src/routes/administratorRoutes.js`: rutas agrupadas para pantallas y acciones del administrador.
- `backend/src/routes/stockmanRoutes.js`: rutas agrupadas para pantallas y acciones del repositor/stockman.
- `backend/src/config/env.js`: lee variables de entorno.
- `backend/src/config/prisma.js`: instancia Prisma Client con `PrismaNeon` de `@prisma/adapter-neon`. Usa la URL pooled/runtime de Neon y evita crear varias instancias en desarrollo.
- `backend/src/config/jwt.js`: configuracion de firma/verificacion JWT.
- `backend/.env`: variables reales locales del entorno. No deberia subirse al repositorio.
- `backend/.env.example`: plantilla segura con `DATABASE_URL`, `DIRECT_URL`, `PORT` y `JWT_SECRET`.

Flujo backend: `server.js` -> `app.js` -> `routes/index.js` -> `authRoutes` / `administratorRoutes` / `stockmanRoutes` -> controllers -> services -> Prisma.

### Middlewares backend

- `backend/src/middlewares/authMiddleware.js`: valida JWT y agrega usuario al request.
- `backend/src/middlewares/roleMiddleware.js`: valida permisos por rol, por ejemplo `administrator` o `stockman`.
- `backend/src/middlewares/errorMiddleware.js`: maneja errores centralizados.

Se conectan con rutas protegidas de admin y repositor.

### Auth backend

- `backend/src/routes/authRoutes.js`: define `POST /api/auth/login`, `GET /api/auth/me` y `POST /api/auth/logout`.
- `backend/src/modules/auth/authController.js`: recibe request/response.
- `backend/src/modules/auth/authService.js`: busca usuario, compara password con bcrypt y genera JWT.

Se conecta con Prisma, bcrypt, JWT y modelo `User`.

### Administrator backend

- `backend/src/routes/administratorRoutes.js`: agrupa las rutas de administrador para dashboard, stock, cuentas y notificaciones/emails.
- `GET /api/administrator/dashboard`: entrada/resumen de pantalla principal admin.
- `GET /api/administrator/dashboard/stats`: estadisticas filtrables del dashboard, como quiebres y pedidos.
- `GET /api/administrator/dashboard/visits`: historial/listado de check-in y check-out de empleados.
- `GET /api/administrator/stock`: entrada/resumen de pantalla de stock.
- `GET /api/administrator/stock/products`: listado/busqueda/filtros de productos.
- `POST /api/administrator/stock/products`: creacion de producto.
- `DELETE /api/administrator/stock/products`: borrado de producto.
- `GET /api/administrator/accounts`: entrada/resumen de pantalla de cuentas.
- `GET /api/administrator/accounts/users`: listado/busqueda/filtros de usuarios.
- `POST /api/administrator/accounts/users`: creacion de usuario.
- `DELETE /api/administrator/accounts/users`: borrado de usuario.

En el codigo actual estan comentadas/inactivas estas rutas:

- `PUT /api/administrator/stock/products`: modificacion de producto.
- `PUT /api/administrator/accounts/users`: modificacion de usuario.
- `GET /api/administrator/notifications/emails`: listado de emails/notificaciones.
- `GET /api/administrator/notifications/emails/:emailId`: detalle de un email/notificacion.
- `DELETE /api/administrator/notifications/emails/:emailId`: borrado de un email/notificacion.

### Usuarios backend

- `backend/src/modules/users/usersController.js`: maneja requests.
- `backend/src/modules/users/usersService.js`: crea, lista, modifica y elimina usuarios.

Se conecta con Prisma `User`, bcrypt, `administratorRoutes` y middleware de rol administrator.

### Productos backend

- `backend/src/modules/products/productsController.js`: maneja requests.
- `backend/src/modules/products/productsService.js`: busqueda, filtros y persistencia.
- `backend/uploads/products`: carpeta para fotos si se guardan localmente.

Se conecta con Prisma `Product`, `administratorRoutes`, `stockmanRoutes` y pantallas admin/repositor.

### Check-ins backend

- `backend/src/modules/checkins/checkinsController.js`: recibe acciones y consultas.
- `backend/src/modules/checkins/checkinsService.js`: guarda entradas/salidas y consulta historial.

Se conecta con Prisma `CheckIn` o `Visit`, `administratorRoutes`, `stockmanRoutes` y usuarios stockman.

### Estadisticas backend

- `backend/src/modules/statistics/statisticsController.js`: responde datos.
- `backend/src/modules/statistics/statisticsService.js`: calcula quiebres, pedidos y resumenes.

Se conecta con productos, pedidos/formularios, checkins y `administratorRoutes`.

### Emails backend

- `backend/src/modules/emails/emailsController.js`: recibe solicitud de envio.
- `backend/src/modules/emails/emailsService.js`: arma y envia el correo.

Se conecta con pedidos, usuario stockman, configuracion SMTP/Gmail y `stockmanRoutes`.

### Pedidos backend

- `backend/src/modules/orders/ordersController.js`: recibe productos reportados.
- `backend/src/modules/orders/ordersService.js`: guarda stock actual, quiebre, cantidad y observaciones.

Se conecta con Prisma `Order` o `StockReport`, productos, usuario stockman, emails y `stockmanRoutes`.

### Stockman backend

- `backend/src/routes/stockmanRoutes.js`: agrupa las rutas del repositor/stockman para check-in, pantalla principal, catalogo y pedido.
- `GET /api/stockman/check-in/franchises`: opciones de cadenas/franquicias para check-in.
- `GET /api/stockman/check-in/branches`: opciones de sucursales para check-in.
- `GET /api/stockman/check-in/sectors`: opciones de sectores para check-in.
- `POST /api/stockman/check-in`: guarda check-in del stockman.
- `GET /api/stockman/home/last-check-in`: obtiene ultima cadena, sucursal y sector del stockman.
- `GET /api/stockman/catalog/products`: listado/busqueda de productos del catalogo.
- `POST /api/stockman/order/product`: agrega/envia un producto al pedido/formulario.
- `GET /api/stockman/order/product`: obtiene un producto del pedido/formulario.
- `GET /api/stockman/order/products`: lista productos cargados en el pedido/formulario.
- `DELETE /api/stockman/order/product`: elimina un producto del pedido/formulario.
- `POST /api/stockman/order/send`: envia los productos/pedido por email.

En el codigo actual esta comentada/inactiva esta ruta:

- `PUT /api/stockman/order/product`: modificacion de un producto del pedido/formulario.

### Utilidades backend

- `backend/src/utils/hash.js`: helpers para bcrypt.
- `backend/src/utils/httpError.js`: errores HTTP reutilizables.

### Prisma

- `backend/prisma/schema.prisma`: modelos de base de datos. En Prisma 7 ya no lleva `url` dentro de `datasource`; la URL vive en `backend/prisma.config.ts`.
- `backend/prisma/seed.js`: datos iniciales, por ejemplo admin inicial, cadenas, sucursales y sectores.

Para Neon/Vercel se recomienda:

- `DATABASE_URL`: URL pooled/runtime. Es la que usa `src/config/prisma.js` para las queries de la app.
- `DIRECT_URL`: URL directa/no pooled. Es la mejor opcion para Prisma Migrate desde `prisma.config.ts`.
- `POSTGRES_PRISMA_URL`, `POSTGRES_URL` o `POSTGRES_URL_NON_POOLING`: nombres que Vercel/Neon puede crear automaticamente. La configuracion actual los toma como fallback.

## Rutas API actuales

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/administrator/dashboard`
- `GET /api/administrator/dashboard/stats`
- `GET /api/administrator/dashboard/visits`
- `GET /api/administrator/stock`
- `GET /api/administrator/stock/products`
- `POST /api/administrator/stock/products`
- `DELETE /api/administrator/stock/products`
- `GET /api/administrator/accounts`
- `GET /api/administrator/accounts/users`
- `POST /api/administrator/accounts/users`
- `DELETE /api/administrator/accounts/users`
- `GET /api/stockman/check-in/franchises`
- `GET /api/stockman/check-in/branches`
- `GET /api/stockman/check-in/sectors`
- `POST /api/stockman/check-in`
- `GET /api/stockman/home/last-check-in`
- `GET /api/stockman/catalog/products`
- `POST /api/stockman/order/product`
- `GET /api/stockman/order/product`
- `GET /api/stockman/order/products`
- `DELETE /api/stockman/order/product`
- `POST /api/stockman/order/send`

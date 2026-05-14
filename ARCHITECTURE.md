# Arquitectura del proyecto

Este documento explica para que sirve cada archivo, por que esta ahi y con que se conecta. La estructura esta separada en `frontend` y `backend`.

## Archivos de la raiz

- `.gitignore`: indica que archivos y carpetas no deberian subirse al repositorio, por ejemplo `node_modules`, builds, logs y variables locales.
- `.gitattributes`: configura reglas de Git para el repositorio, normalmente normalizacion de saltos de linea y comportamiento de archivos.
- `README.md`: guia rapida del proyecto, instalacion y comandos principales.
- `ARCHITECTURE.md`: documento detallado de arquitectura, carpetas, archivos y conexiones.

## Frontend

Base actual: React + TypeScript + Vite + TailwindCSS + React Router.

El frontend compila, pero visualmente esta vacio: `AppRouter` declara rutas con paginas vacias para que puedas empezar a completar cada pantalla sin pelearte con una demo inicial.

### Comandos frontend

En una compu nueva, desde la raiz del proyecto:

```bash
cd frontend
npm install
npm run dev
```

Si PowerShell bloquea `npm.ps1`, usa `npm.cmd`:

```bash
npm.cmd install
npm.cmd run dev
```

Para comprobar que todo compila:

```bash
npm run build
```

Si tuvieras que reinstalar dependencias manualmente desde cero:

```bash
npm install react react-dom react-router-dom
npm install -D vite typescript @vitejs/plugin-react tailwindcss @tailwindcss/vite eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals @types/node @types/react @types/react-dom
```

### Archivos base frontend

- `frontend/package.json`: declara scripts y dependencias del frontend. Incluye `react-router-dom`, `react`, `react-dom`, Vite, TypeScript y Tailwind.
- `frontend/package-lock.json`: fija versiones exactas instaladas. Se conecta con `npm install` para reproducir el entorno.
- `frontend/eslint.config.js`: configuracion de ESLint. Sirve para revisar errores de estilo, imports y patrones problematicos en TypeScript/React.
- `frontend/tsconfig.json`: configuracion TypeScript principal. Conecta las configuraciones especificas de app y Node/Vite.
- `frontend/tsconfig.app.json`: configuracion TypeScript para el codigo del frontend dentro de `src`.
- `frontend/tsconfig.node.json`: configuracion TypeScript para archivos de entorno Node, como `vite.config.ts`.
- `frontend/vite.config.ts`: configuracion de Vite. Conecta `@vitejs/plugin-react` para React y `@tailwindcss/vite` para TailwindCSS.
- `frontend/index.html`: HTML raiz donde Vite monta React en el elemento `root`.
- `frontend/src/main.tsx`: punto de entrada. Monta `<App />` dentro de `StrictMode`.
- `frontend/src/App.tsx`: componente raiz. Envuelve la app con `AuthProvider`, `BrowserRouter` y `AppRouter`.
- `frontend/src/index.css`: estilos globales importados por `main.tsx`. Importa `styles/tailwind.css`.
- `frontend/src/styles/tailwind.css`: entrada de TailwindCSS con `@import 'tailwindcss'`.
- `frontend/node_modules`: dependencias instaladas localmente por `npm install`. No se edita a mano y normalmente no se sube al repositorio.
- `frontend/dist/index.html`: HTML compilado generado por `npm run build`. Se conecta con los assets finales de `dist/assets`.
- `frontend/dist/assets/*.js`: bundle JavaScript generado por Vite para produccion. No se edita a mano.
- `frontend/dist/assets/*.css`: CSS final generado por Vite/Tailwind para produccion. No se edita a mano.

Conexion principal: `index.html` -> `main.tsx` -> `App.tsx` -> `AuthProvider` -> `BrowserRouter` -> `AppRouter`.

### Carpetas frontend

- `frontend/public`: archivos estaticos publicos que Vite sirve sin procesar, por ejemplo favicons o imagenes que deban conservar su nombre.
- `frontend/src`: codigo fuente real del frontend.
- `frontend/src/app`: configuracion interna de la app, providers y ruteo.
- `frontend/src/app/providers`: providers globales de React, como autenticacion.
- `frontend/src/app/routes`: declaracion de rutas y guards.
- `frontend/src/components`: componentes compartidos entre pantallas.
- `frontend/src/components/ui`: componentes visuales base como botones, inputs, selects y modals.
- `frontend/src/components/forms`: componentes auxiliares para formularios.
- `frontend/src/components/feedback`: componentes de feedback como toasts o alertas.
- `frontend/src/features`: modulos por funcionalidad o area de negocio.
- `frontend/src/features/auth`: login y sesion.
- `frontend/src/features/admin`: funcionalidades del administrador.
- `frontend/src/features/repositor`: funcionalidades del repositor.
- `frontend/src/hooks`: hooks reutilizables.
- `frontend/src/layouts`: layouts por tipo de usuario o seccion.
- `frontend/src/services`: servicios compartidos para comunicacion externa.
- `frontend/src/styles`: estilos globales o entradas de Tailwind.
- `frontend/src/types`: tipos TypeScript compartidos.
- `frontend/src/utils`: funciones auxiliares puras y reutilizables.
- `frontend/dist`: build generado por Vite. No es fuente, se puede regenerar con `npm run build`.

### App, rutas y sesion

- `frontend/src/app/routes/AppRouter.tsx`: define las rutas principales con React Router. Hoy apunta a paginas vacias para evitar errores hasta que conectes las pantallas reales.
- `frontend/src/app/routes/ProtectedRoute.tsx`: guard de rutas privadas. Usa `useAuth` para validar si hay sesion y si el rol permitido coincide con `admin` o `repositor`.
- `frontend/src/app/providers/AuthProvider.tsx`: contexto global de autenticacion. Guarda usuario, token, `login`, `logout` e `isAuthenticated`.
- `frontend/src/hooks/useAuth.ts`: hook para consumir `AuthProvider` desde cualquier pantalla o componente.
- `frontend/src/types/auth.ts`: tipos de usuario autenticado, token, rol y valor del contexto.

Cuando implementes login, el flujo deberia ser: `LoginPage` -> `authApi` -> backend `POST /api/auth/login` -> `AuthProvider.login()` -> React Router redirige segun rol.

### Rutas frontend declaradas

- `/login`: login.
- `/admin`: pantalla principal admin.
- `/admin/stock`: stock.
- `/admin/stock/create`: crear producto.
- `/admin/stock/:productId/edit`: modificar producto.
- `/admin/accounts`: cuentas.
- `/admin/accounts/create`: crear usuario.
- `/admin/accounts/:userId/edit`: modificar usuario.
- `/admin/notifications`: notificaciones.
- `/repositor/check-in`: check-in.
- `/repositor`: pantalla principal repositor.
- `/repositor/catalog`: catalogo.
- `/repositor/catalog/:productId`: formulario de producto.
- `/repositor/order`: pedido.

### Layouts

- `frontend/src/layouts/AdminLayout.tsx`: estructura comun para pantallas admin. Se conectaria con rutas `/admin/*`.
- `frontend/src/layouts/RepositorLayout.tsx`: estructura comun para pantallas repositor. Se conectaria con rutas `/repositor/*`.

Todavia estan vacios para que puedas definir navegacion y diseño cuando empieces las pantallas.

### Componentes compartidos

- `frontend/src/components/ui/Button.tsx`: boton reutilizable para acciones.
- `frontend/src/components/ui/Input.tsx`: input reutilizable para formularios y buscadores.
- `frontend/src/components/ui/Select.tsx`: select reutilizable para cadena, sucursal, sector, rol y filtros.
- `frontend/src/components/ui/Modal.tsx`: modal para confirmaciones, como borrar usuario/producto.
- `frontend/src/components/forms/FormField.tsx`: wrapper para label, input, ayuda y error.
- `frontend/src/components/feedback/Toast.tsx`: notificaciones visuales, por ejemplo formulario enviado.

Estos archivos se conectarian con pages y formularios para no repetir UI.

### Servicios compartidos

- `frontend/src/services/apiClient.ts`: cliente HTTP centralizado. Deberia conectarse con el backend Express y adjuntar JWT en headers.
- `frontend/src/utils/formatters.ts`: helpers para formatear fechas, codigos, nombres y textos.

### Tipos compartidos

- `frontend/src/types/product.ts`: producto, codigos, imagen, cadena y filtros.
- `frontend/src/types/user.ts`: usuarios, roles y datos de cuenta.
- `frontend/src/types/checkin.ts`: check-in/check-out, cadena, sucursal y sector.
- `frontend/src/types/order.ts`: pedido, items reportados, quiebre, cantidad y observaciones.

Estos tipos se conectan con pages, componentes y servicios API.

## Pantallas frontend

### Auth

- `frontend/src/features/auth/pages/LoginPage.tsx`: pantalla de email/usuario, password y boton login.
- `frontend/src/features/auth/services/authApi.ts`: llama a `POST /api/auth/login`.

### Admin dashboard

- `frontend/src/features/admin/dashboard/pages/AdminDashboardPage.tsx`: pantalla principal admin.
- `frontend/src/features/admin/dashboard/components/StatsPanel.tsx`: estadisticas filtrables, quiebres y pedidos.
- `frontend/src/features/admin/dashboard/components/VisitsPanel.tsx`: check-ins/check-outs con buscador de empleado.

Se conecta con backend `statistics` y `checkins`.

### Admin stock

- `frontend/src/features/admin/stock/pages/StockPage.tsx`: listado, buscador, filtros y acciones de productos.
- `frontend/src/features/admin/stock/pages/CreateProductPage.tsx`: crear producto.
- `frontend/src/features/admin/stock/pages/EditProductPage.tsx`: modificar producto.
- `frontend/src/features/admin/stock/components/ProductList.tsx`: lista con modificar/eliminar.
- `frontend/src/features/admin/stock/components/ProductForm.tsx`: formulario reutilizable.
- `frontend/src/features/admin/stock/services/productsApi.ts`: llamadas a productos.

Endpoints conectados: `GET /api/products`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`.

### Admin cuentas

- `frontend/src/features/admin/accounts/pages/AccountsPage.tsx`: listado, buscador y filtros de usuarios.
- `frontend/src/features/admin/accounts/pages/CreateUserPage.tsx`: crear usuario.
- `frontend/src/features/admin/accounts/pages/EditUserPage.tsx`: modificar usuario.
- `frontend/src/features/admin/accounts/components/UserList.tsx`: lista con modificar/eliminar.
- `frontend/src/features/admin/accounts/components/UserForm.tsx`: formulario reutilizable.
- `frontend/src/features/admin/accounts/services/usersApi.ts`: llamadas a usuarios.

Endpoints conectados: `GET /api/users`, `POST /api/users`, `PUT /api/users/:id`, `DELETE /api/users/:id`.

### Admin notificaciones

- `frontend/src/features/admin/notifications/pages/NotificationsPage.tsx`: pantalla de mails/notificaciones.
- `frontend/src/features/admin/notifications/components/MailList.tsx`: lista scrolleable de mails.
- `frontend/src/features/admin/notifications/components/MailDetail.tsx`: detalle del mail seleccionado.
- `frontend/src/features/admin/notifications/services/notificationsApi.ts`: llamadas a notificaciones.

Endpoints conectados: `GET /api/notifications`, `DELETE /api/notifications/:id`.

### Repositor check-in

- `frontend/src/features/repositor/checkin/pages/CheckInPage.tsx`: seleccion de cadena, sucursal y sector.
- `frontend/src/features/repositor/checkin/services/checkinsApi.ts`: guarda check-in/check-out.

Endpoints conectados: `POST /api/checkins/check-in`, `POST /api/checkins/check-out`.

### Repositor inicio

- `frontend/src/features/repositor/home/pages/RepositorHomePage.tsx`: muestra ultima cadena, sucursal, sector, check-out y acceso al catalogo.

Se conecta con `AuthProvider` y `checkinsApi`.

### Repositor catalogo

- `frontend/src/features/repositor/catalog/pages/CatalogPage.tsx`: buscador por codigo Fischer, nombre o codigo cliente.
- `frontend/src/features/repositor/catalog/components/CatalogProductCard.tsx`: producto con imagen, nombre y codigo.
- `frontend/src/features/repositor/catalog/services/catalogApi.ts`: consulta productos disponibles.

Endpoint conectado: `GET /api/products`.

### Repositor formulario producto

- `frontend/src/features/repositor/product-form/pages/ProductFormPage.tsx`: info del producto y formulario.
- `frontend/src/features/repositor/product-form/components/StockReportForm.tsx`: stock actual, quiebre, cantidad y observaciones.

Se conecta con estado del pedido y `ordersApi`.

### Repositor pedido

- `frontend/src/features/repositor/order/pages/OrderPage.tsx`: lista de productos cargados.
- `frontend/src/features/repositor/order/components/OrderItemList.tsx`: modificar/eliminar items antes de enviar.
- `frontend/src/features/repositor/order/services/ordersApi.ts`: manda el pedido al backend.

Endpoints conectados: `GET /api/orders/my`, `POST /api/orders`, `PUT /api/orders/:id`, `DELETE /api/orders/:id`, `POST /api/emails/order`.

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

- `backend/src/middlewares/auth.middleware.js`: valida JWT y agrega usuario al request.
- `backend/src/middlewares/role.middleware.js`: valida permisos por rol `admin` o `repositor`.
- `backend/src/middlewares/error.middleware.js`: maneja errores centralizados.

Se conectan con rutas protegidas de admin y repositor.

### Auth backend

- `backend/src/modules/auth/auth.routes.js`: define `POST /api/auth/login`.
- `backend/src/modules/auth/auth.controller.js`: recibe request/response.
- `backend/src/modules/auth/auth.service.js`: busca usuario, compara password con bcrypt y genera JWT.

Se conecta con Prisma, bcrypt, JWT y modelo `User`.

### Usuarios backend

- `backend/src/modules/users/users.routes.js`: rutas CRUD de usuarios.
- `backend/src/modules/users/users.controller.js`: maneja requests.
- `backend/src/modules/users/users.service.js`: crea, lista, modifica y elimina usuarios.

Se conecta con Prisma `User`, bcrypt y middleware de rol admin.

### Productos backend

- `backend/src/modules/products/products.routes.js`: rutas CRUD de productos.
- `backend/src/modules/products/products.controller.js`: maneja requests.
- `backend/src/modules/products/products.service.js`: busqueda, filtros y persistencia.
- `backend/uploads/products`: carpeta para fotos si se guardan localmente.

Se conecta con Prisma `Product` y pantallas admin/repositor.

### Check-ins backend

- `backend/src/modules/checkins/checkins.routes.js`: rutas para check-in, check-out e historial.
- `backend/src/modules/checkins/checkins.controller.js`: recibe acciones y consultas.
- `backend/src/modules/checkins/checkins.service.js`: guarda entradas/salidas y consulta historial.

Se conecta con Prisma `CheckIn` o `Visit` y usuarios repositor.

### Estadisticas backend

- `backend/src/modules/statistics/statistics.routes.js`: endpoints de dashboard admin.
- `backend/src/modules/statistics/statistics.controller.js`: responde datos.
- `backend/src/modules/statistics/statistics.service.js`: calcula quiebres, pedidos y resumenes.

Se conecta con productos, pedidos/formularios y checkins.

### Notificaciones backend

- `backend/src/modules/notifications/notifications.routes.js`: listar y borrar notificaciones.
- `backend/src/modules/notifications/notifications.controller.js`: maneja requests.
- `backend/src/modules/notifications/notifications.service.js`: consulta y borra registros.

Se conecta con Prisma `Notification` y pantalla admin de notificaciones.

### Pedidos backend

- `backend/src/modules/orders/orders.routes.js`: rutas de formularios/pedidos.
- `backend/src/modules/orders/orders.controller.js`: recibe productos reportados.
- `backend/src/modules/orders/orders.service.js`: guarda stock actual, quiebre, cantidad y observaciones.

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

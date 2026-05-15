# Arquitectura frontend

Este documento explica para que sirve cada archivo del frontend, por que esta ahi y con que se conecta.

## Archivos de la raiz

- `../.gitignore`: indica que archivos y carpetas no deberian subirse al repositorio, por ejemplo `node_modules`, `dist`, logs y variables locales.
- `../.gitattributes`: configura reglas de Git para el repositorio, normalmente normalizacion de saltos de linea y comportamiento de archivos.
- `../README.md`: guia rapida del proyecto, instalacion y comandos principales.
- `frontend/ARCHITECTURE.md`: documento detallado de arquitectura del frontend.

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
- `frontend/src/index.css`: estilos globales importados por `main.tsx`. Importa TailwindCSS directamente con `@import "tailwindcss"`.
- `frontend/node_modules`: dependencias instaladas localmente por `npm install`. No se edita a mano y normalmente no se sube al repositorio.

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
- `frontend/src/services`: servicios compartidos para comunicacion externa.
- `frontend/src/types`: tipos TypeScript compartidos.
- `frontend/src/utils`: funciones auxiliares puras y reutilizables.
- `frontend/dist`: build generado por Vite con `npm run build`. No es fuente, no deberia versionarse y se puede regenerar cuando haga falta.

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
- `/repositor/check-in`: check-in.
- `/repositor`: pantalla principal repositor.
- `/repositor/catalog`: catalogo.
- `/repositor/catalog/:productId`: formulario de producto.
- `/repositor/order`: pedido.

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

Estos tipos se conectan con pages, componentes y servicios API. No deberian contener logica de negocio; esa logica deberia vivir en servicios, hooks o componentes segun corresponda.

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
- `frontend/src/features/admin/stock/pages/EditProductPage.tsx`: modificar producto existente desde el listado de stock.
- `frontend/src/features/admin/stock/components/ProductList.tsx`: lista con eliminar.
- `frontend/src/features/admin/stock/components/ProductForm.tsx`: formulario reutilizable.
- `frontend/src/features/admin/stock/services/productsApi.ts`: llamadas a productos.

Endpoints conectados: `GET /api/products`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`.

### Admin cuentas

- `frontend/src/features/admin/accounts/pages/AccountsPage.tsx`: listado, buscador y filtros de usuarios.
- `frontend/src/features/admin/accounts/pages/CreateUserPage.tsx`: crear usuario.
- `frontend/src/features/admin/accounts/components/UserList.tsx`: lista con eliminar.
- `frontend/src/features/admin/accounts/components/UserForm.tsx`: formulario reutilizable.
- `frontend/src/features/admin/accounts/services/usersApi.ts`: llamadas a usuarios.

Endpoints conectados: `GET /api/users`, `POST /api/users`, `PUT /api/users/:id`, `DELETE /api/users/:id`.

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

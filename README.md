# Fischer Stock Management

Proyecto separado en dos aplicaciones:

- `frontend`: React + TypeScript + Vite + TailwindCSS + React Router.
- `backend`: arquitectura preparada para Node.js + Express + PostgreSQL + Prisma + JWT + bcrypt.

La app todavia esta vacia visualmente para que puedas empezar a codear sin borrar una demo. El frontend ya tiene lo minimo para compilar: entrada React, Tailwind conectado, React Router instalado y rutas base declaradas.

## Instalar en una compu nueva

Desde la raiz del proyecto:

```bash
cd frontend
npm install
npm run dev
```

Si estas en PowerShell y `npm` da error por Execution Policy, usa:

```bash
npm.cmd install
npm.cmd run dev
```

Para verificar que compila:

```bash
npm run build
```

## Dependencias frontend instaladas

Estas ya estan declaradas en `frontend/package.json`, asi que en una compu nueva solo hace falta `npm install`.

```bash
npm install react react-dom react-router-dom
npm install -D vite typescript @vitejs/plugin-react tailwindcss @tailwindcss/vite eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals @types/node @types/react @types/react-dom
```

## Preparar backend

El backend tiene arquitectura de carpetas y archivos, pero todavia no tiene `package.json` ni implementacion. Cuando quieras empezar a programarlo:

```bash
cd backend
npm init -y
npm install express dotenv jsonwebtoken bcrypt prisma @prisma/client
npx prisma generate
```

No uses `npx prisma init` salvo que borres la carpeta `backend/prisma`, porque la arquitectura ya incluye `prisma/schema.prisma`.

La explicacion completa de carpetas, archivos y conexiones esta en [ARCHITECTURE.md](./frontend/ARCHITECTURE.md) o (./backend/ARCHITECTURE.md).

## Archivos generados

- `frontend/node_modules`: dependencias instaladas por `npm install`. No se edita a mano.
- `frontend/dist`: salida generada por `npm run build`. Sirve para previsualizar o desplegar el frontend compilado, pero no es codigo fuente.

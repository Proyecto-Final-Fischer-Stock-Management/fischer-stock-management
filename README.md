# Fischer Stock Management

IMPORTANTISIMO HACER MAÑANA:

1. DESCOMENTAR TODO LO DE PRODUCT PICTURE
2. TEST DE CREATE PRODUCT EN SUPERTEST/NODETEST
3. PROBAR EL PUTO TEST Y MAS VALE Q FUNCIONE

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

El backend ya tiene `package.json` preparado para Node.js, Express, Prisma 7, Neon/Vercel, JWT y bcrypt. En una compu nueva:

```bash
cd backend
npm install
npm run prisma:generate
```

Si PowerShell bloquea `npm`, usa:

```bash
npm.cmd install
npm.cmd run prisma:generate
```

No uses `npx prisma init` salvo que borres la carpeta `backend/prisma`, porque la arquitectura ya incluye `prisma/schema.prisma` y `prisma.config.ts`.

Para correr migraciones contra Neon/Vercel:

```bash
npm run prisma:migrate
```

Para abrir Prisma Studio:

```bash
npm run prisma:studio
```

La explicacion completa de carpetas, archivos y conexiones esta separada en:

- [Frontend architecture](./frontend/ARCHITECTURE.md)
- [Backend architecture](./backend/ARCHITECTURE.md)

## Archivos generados

- `frontend/node_modules`: dependencias instaladas por `npm install`. No se edita a mano.
- `frontend/dist`: salida generada por `npm run build`. Sirve para previsualizar o desplegar el frontend compilado, pero no es codigo fuente y no deberia versionarse.

## Variables de entorno

- `backend/.env`: archivo local con secretos y configuracion real. Esta ignorado por Git.
- `backend/.env.example`: plantilla segura para documentar que variables necesita el backend.

Para Neon/Vercel:

- `DATABASE_URL`: URL pooled/runtime. En Vercel puede corresponder a `POSTGRES_PRISMA_URL` o `POSTGRES_URL`.
- `DIRECT_URL`: URL directa/no pooled para Prisma Migrate. En Vercel suele corresponder a `POSTGRES_URL_NON_POOLING`.

Si no tenes `DIRECT_URL`, usa `POSTGRES_URL_NON_POOLING` si Vercel/Neon te la muestra. Si tampoco aparece, la configuracion actual puede usar `DATABASE_URL`, `POSTGRES_PRISMA_URL` o `POSTGRES_URL` como fallback.

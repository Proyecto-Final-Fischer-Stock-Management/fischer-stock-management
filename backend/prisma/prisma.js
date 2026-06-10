import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import neon from "@neondb/serverless";
import dotenv from "dotenv";

// Nos aseguramos de que las variables de entorno del archivo .env estén cargadas
dotenv.config();

// 1. Configuramos el cliente WebSocket de Neon con la URL de tu base de datos
const pool = new neon.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Creamos el adaptador compatible con Prisma 7
const adapter = new PrismaNeon(pool);

// 3. Instanciamos PrismaClient pasándole las opciones requeridas en Prisma 7 para Neon
const prisma = new PrismaClient({ adapter });

export default prisma;

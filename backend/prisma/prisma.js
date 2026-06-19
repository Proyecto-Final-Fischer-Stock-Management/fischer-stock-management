import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaNeon(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;

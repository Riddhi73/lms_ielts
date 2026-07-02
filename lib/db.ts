import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// For serverless/Next.js: use pooled connection with adapter
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Pooled (port 6543)
});

const adapter = new PrismaPg(pool);

declare global {
  var prisma: PrismaClient | undefined;
}
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

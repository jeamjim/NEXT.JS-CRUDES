// lib/db.ts
import mysql, { Pool } from "mysql2/promise";

export const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nextjs_db",
  port: Number(process.env.DB_PORT) || 3306, // ✅ cast to number
});

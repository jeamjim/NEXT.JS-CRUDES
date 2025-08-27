// app/api/niggas/route.ts
import { pool } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// GET all users
export async function GET(): Promise<Response> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM niggas ORDER BY created_at DESC"
    );

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

// POST create new user
export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { name, email, address } = body;

    if (!name || !email || !address) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // 1️⃣ Check if user already exists
    const [existing]: any = await pool.query(
      "SELECT id FROM niggas WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing.length > 0) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409, // Conflict
      });
    }

    // 2️⃣ Insert new user
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO niggas (name, email, address, is_archive, created_at) VALUES (?, ?, ?, ?, NOW())",
      [name, email, address, 0]
    );

    return new Response(
      JSON.stringify({
        id: result.insertId,
        name,
        email,
        address,
        is_archive: 0,
        created_at: new Date(),
      }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

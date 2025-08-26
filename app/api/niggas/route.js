import { pool } from "@/lib/db"; // adjust path if needed

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM niggas ORDER BY created_at DESC"
    );

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
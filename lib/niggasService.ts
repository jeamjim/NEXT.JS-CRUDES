import { Nigga } from "@/types/niggas";

export async function fetchNiggas(): Promise<Nigga[]> {
  const res = await fetch("/api/niggas");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function createNigga(formData: Omit<Nigga, "id" | "created_at">): Promise<Nigga> {
  const res = await fetch("/api/niggas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

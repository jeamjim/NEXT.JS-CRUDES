import { useEffect, useState } from "react";
import { Nigga } from "@/types/niggas";
import { fetchNiggas, createNigga } from "@/lib/niggasService";

export function useNiggas() {
  const [niggas, setNiggas] = useState<Nigga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchNiggas();
        setNiggas(data);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addNigga = async (formData: Omit<Nigga, "id" | "created_at">) => {
    const newUser = await createNigga(formData);
    setNiggas((prev) => [...prev, newUser]);
  };

  return { niggas, loading, addNigga };
}

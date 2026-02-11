import { api } from "@/lib/api";

export async function fetchCategories() {
  const result = await api("/categories", {
    method: "GET",
  });

  return result.data.data;
}

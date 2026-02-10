import { api } from "@/lib/api";

export async function getMe() {
  const result = await api("/me", {
    method: "GET",
  });
  return result.data.data;
}

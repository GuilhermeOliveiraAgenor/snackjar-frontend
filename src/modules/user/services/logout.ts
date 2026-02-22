import { api } from "@/lib/api";

export async function logout() {
  const result = await api("/logout", {
    method: "POST",
  });

  return result;
}

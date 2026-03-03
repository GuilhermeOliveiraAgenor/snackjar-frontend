import { api } from "@/lib/api";

export async function logout() {
  await api("/logout", {
    method: "POST",
  });
}

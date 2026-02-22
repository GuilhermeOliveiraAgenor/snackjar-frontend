import { api } from "@/lib/api";

export interface AuthenticateGoogleUserRequest {
  token: string;
}

export async function authenticateGoogleUser(data: AuthenticateGoogleUserRequest) {
  const result = await api("/auth/google", {
    method: "POST",
    data,
  });
  return result.data;
}

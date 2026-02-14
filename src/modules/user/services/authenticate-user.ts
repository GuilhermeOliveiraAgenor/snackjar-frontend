import { api } from "@/lib/api";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export async function authenticateUser(data: AuthenticateUserRequest) {
  const result = await api("/auth", {
    method: "POST",
    data,
  });

  return result;
}
  
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

  console.log(result);
  return result;
}

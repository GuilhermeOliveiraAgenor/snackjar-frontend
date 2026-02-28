import { api } from "@/lib/api";

interface createUserRequest {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: createUserRequest) {
  const result = await api("/users", {
    method: "POST",
    data,
  });

  return result.data;
}

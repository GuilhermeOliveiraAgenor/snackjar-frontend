import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/get-me";
import { User } from "../types/user";

export function useMe() {
  const query = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: getMe,

    staleTime: Infinity,

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return {
    user: query.data,
  };
}

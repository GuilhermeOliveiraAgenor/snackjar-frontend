import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/get-me";
import { User } from "../types/user";

export function useMe() {
  const query = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: getMe,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10, 

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return {
    user: query.data,
  };
}

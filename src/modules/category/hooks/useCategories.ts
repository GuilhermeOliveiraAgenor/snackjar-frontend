"use client"
import { useQuery } from "@tanstack/react-query";
import { Category } from "../types/category";
import { fetchCategories } from "../services/fetchCategories";

export function useCategories() {
  const query = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,

    staleTime: 1000 * 60 * 5,
  });
  return {
    categories: query.data,
    isLoading: query.isLoading,
  };
}

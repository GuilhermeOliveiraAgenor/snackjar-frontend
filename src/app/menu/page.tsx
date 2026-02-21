"use client";
import { CardSmall } from "@/components/menu/card";
import { AppSidebar } from "@/components/menu/side-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useMyFavoriteRecipes } from "@/modules/favorite-recipe/hooks/useMyFavoriteRecipes";
import { useRecipes } from "@/modules/recipe/hooks/useRecipes";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState(""); // input

  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId") ?? undefined;

  const debounceTitle = useDebounce(title, 500); // format param

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useRecipes(page, debounceTitle, categoryId); // hook
  const { data: favoriteRecipes } = useMyFavoriteRecipes(1);
  const favorites = favoriteRecipes?.data;

  let statusMessage: React.ReactNode = null;
  let showSpinner = false;

  if (isLoading) {
    statusMessage = "Carregando receitas";
    showSpinner = true;
  } else if (isError) {
    statusMessage = "Erro ao listar receitas";
  } else if (data?.data.length === 0) {
    statusMessage = "Receitas não encontradas";
  }

  if (!data) {
    return null;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center px-4 sm:px-6 sm:mb-2">
          <SidebarTrigger className="absolute left-4 sm:left-6" />
          <div className="flex-1 flex justify-center items-center text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-primary">
            <h1>
              <Link href="/menu" className="hover:opacity-80 transition">
                SNACK JAR
              </Link>
            </h1>
          </div>
        </header>
        <div className="mx-auto w-full max-w-10xl h-40 bg-orange-500 rounded-2xl flex items-center justify-center px-4 shadow-md hover:-translate-y-0.5 transition">
          <Input
            className="
           w-full
      max-w-67.5 sm:max-w-sm md:max-w-md lg:max-w-lg
      bg-white
      h-9 sm:h-10
      text-sm sm:text-base"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="O que vamos cozinhar hoje ?"
          />

          <Search className="text-white w-9 h-9 ml-3" />
        </div>
        <div className="mx-auto w-full max-w-10xl grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 px-4 py-10">
          {!statusMessage &&
            data.data.map((recipe) => {
              const favorite = favorites?.find((f) => f.recipeId === recipe.id);

              return (
                <CardSmall
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  preparationTime={recipe.preparationTime}
                  isFavorite={!!favorite}
                  favoriteId={favorite?.id}
                />
              );
            })}
        </div>
        <div className="flex items-center justify-center gap-2">
          {showSpinner && <Spinner />}
          <div className="font-medium">{statusMessage}</div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 mb-10 sm:mt-8 sm:mb-16 lg:mt-12 lg:mb-20">
          <Button
            variant="ghost"
            size="icon"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="text-sm font-medium">
            Página {data.meta.page} de {Math.ceil(data.meta.total_count / data.meta.per_page)}
          </span>

          <Button
            variant="ghost"
            size="icon"
            disabled={data.meta.page >= Math.ceil(data.meta.total_count / data.meta.per_page)}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

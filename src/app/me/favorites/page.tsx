"use client";
import { CardSmall } from "@/components/menu/card";
import { AppSidebar } from "@/components/menu/side-bar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useMyFavoriteRecipes } from "@/modules/favorite-recipe/hooks/useMyFavoriteRecipes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useMyFavoriteRecipes(1);

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
          <div className="bg-orange-500 px-4 py-2 rounded-md text-2xl text-white font-medium [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
            Meus Favoritos
          </div>
        </div>
        <div className="mx-auto w-full max-w-10xl grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 px-4 py-10">
          {data?.data.map((fav) => (
            <CardSmall
              key={fav.id}
              id={fav.recipeId}
              favoriteId={fav.id}
              title={fav.recipe.title}
              description={fav.recipe.description}
              preparationTime={fav.recipe.preparationTime}
              isFavorite={true}
            />
          ))}
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

"use client";
import { CardSmall } from "@/components/menu/card";
import { AppSidebar } from "@/components/menu/side-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRecipes } from "@/modules/recipe/hooks/useRecipes";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsRightLeft,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useRecipes(page);

  console.log("API RESPONSE:", data);

  if (isLoading) {
    return <p className="p-4">Carregando receitas...</p>;
  }

  if (isError) {
    return <p className="p-4">Erro ao carregar receitas.</p>;
  }

  if (!data) {
    return <p className="p-4">Receitas não encontradas.</p>;
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
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 py-13">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <div className="flex-1 flex justify-center items-center text-3xl font-bold tracking-wide text-primary rounded-2xl shadow-xl shadow-black/17 px-2 py-4">
            <h1>SNACK JAR</h1>
          </div>
        </header>
        <div className="mx-auto w-full max-w-10xl h-40 bg-orange-500 rounded-2xl flex items-center justify-center px-4 shadow-md hover:-translate-y-0.5 transition">
          <Input
            className="
      w-full
      sm:max-w-sm
      md:max-w-md
      lg:max-w-lg
      bg-white
      h-10 "
            placeholder="O que vamos cozinhar hoje ?"
          />

          <Search className="text-white w-9 h-9 ml-3" />
        </div>
        <div className="mx-auto w-full max-w-10xl grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 px-4 py-10">
          {data.data.map((recipe) => (
            <CardSmall
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
              preparationTime={recipe.preparationTime}
            />
          ))}
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
            Página {data.meta.page} de {Math.ceil(data.meta.total_count / data?.meta.per_page)}
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

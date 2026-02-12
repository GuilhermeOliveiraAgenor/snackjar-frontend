import * as React from "react";
import { ChefHat, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../ui/sidebar";
import { NavUser } from "./profile";
import { useCategories } from "@/modules/category/hooks/useCategories";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { categories, isLoading } = useCategories();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <ChefHat className="size-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Snack Jar</span>
                  <span className="">Suas receitas aqui</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="font-medium">
                Home
              </a>
            </SidebarMenuButton>

            <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href="#" className="flex items-center w-full">
                    <span>Favoritas</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href="#" className="flex items-center w-full">
                    <span>Recentes</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href="#" className="flex items-center w-full">
                    <span>Rápidas (até 15 min)</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href="#" className="flex items-center w-full justify-between">
                    <span>Adicionar nova receita</span>

                    <Plus className="h-4 w-4" />
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="font-medium">
                  Categorias
                </a>
              </SidebarMenuButton>

              <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                {categories?.map((category) => (
                  <SidebarMenuSubItem key={category.id}>
                    <SidebarMenuSubButton asChild>
                      <a
                        href={`/menu?categoryId=${category.id}`}
                        className="flex items-center w-full"
                      >
                        <span>{category.name}</span>
                      </a>
                    </SidebarMenuSubButton>
                    {category.items?.length ? (
                      <SidebarMenuSub className="ml-2 border-l-0 px-1.5">
                        {category.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={item.isActive}>
                              <a
                                href={`/menu?categoryId=${item.id}`}
                                className="flex items-center w-full justify-between"
                              >
                                <span>{item.title}</span>

                                {item.icon && <item.icon className="h-4 w-4" />}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

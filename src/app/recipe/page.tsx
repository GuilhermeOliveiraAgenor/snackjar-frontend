import { AppSidebar } from "@/components/menu/side-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import RecipeDetails from "@/modules/recipe/components/recipe-details";

export default function Page() {
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
        <RecipeDetails />
      </SidebarInset>
    </SidebarProvider>
  );
}

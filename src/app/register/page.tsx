import { AppSidebar } from "@/components/menu/side-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import RegisterRecipe from "@/modules/recipe/components/register-recipe";

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
        <RegisterRecipe />
      </SidebarInset>
    </SidebarProvider>
  );
}

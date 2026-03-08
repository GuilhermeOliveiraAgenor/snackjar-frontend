import { AppSidebar } from "@/components/menu/side-bar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserDetails from "@/modules/user/components/user-details";

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
        <header className="flex h-16 items-center gap-2 px-4 sm:px-6">
          <SidebarTrigger />

          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

          <h1 className="text-lg font-semibold">Minha conta</h1>
        </header>
        <UserDetails />
      </SidebarInset>
    </SidebarProvider>
  );
}

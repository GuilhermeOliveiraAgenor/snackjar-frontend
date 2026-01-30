import { NavUser } from "@/components/menu/profile"
import { AppSidebar } from "@/components/menu/side-bar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Image from "next/image";

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
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
<div className="flex-1 flex justify-center items-center text-3xl font-bold tracking-wide text-primary">
         <h1>SNACK JAR</h1>
          </div>
        </header>
        <div className="mx-auto w-full max-w-10xl h-32 bg-orange-500 rounded-3xl"></div>


      </SidebarInset>
    </SidebarProvider>
  )
}

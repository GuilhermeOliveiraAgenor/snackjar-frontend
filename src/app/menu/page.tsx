import { AppSidebar } from "@/components/menu/side-bar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Search } from "lucide-react"

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
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 py-13">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        <div className="flex-1 flex justify-center items-center text-3xl font-bold tracking-wide text-primary rounded-2xl shadow-xl px-2 py-4">
         <h1>SNACK JAR</h1>
          </div>
        </header>
      <div className="mx-auto w-full max-w-10xl h-40 bg-orange-500 rounded-2xl flex items-center justify-center px-4">
  <Input
    className="
      w-full
      sm:max-w-sm
      md:max-w-md
      lg:max-w-lg
      bg-white
      h-10
    "
    placeholder="O que vamos cozinhar hoje?"
  />

  <Search className="text-white w-9 h-9 ml-3" />
</div>

        

      </SidebarInset>
    </SidebarProvider>
  )
}

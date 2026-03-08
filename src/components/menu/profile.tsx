"use client";

import { useMe } from "@/modules/user/hooks/useMe";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { CircleUserRound, LogOut, Settings } from "lucide-react";
import { useLogout } from "@/modules/user/hooks/useLogout";
import Link from "next/link";

export function NavUser() {
  const { user } = useMe();
  const { logout, isLoading } = useLogout();
  const { isMobile } = useSidebar();

  if (!user) {
    return null;
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.avatarUrl ?? "/profile.png"}
                  alt="profile"
                  width={75}
                  height={75}
                ></AvatarImage>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <Settings className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={16}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/me/profile" className="flex items-center gap-2">
                  <CircleUserRound className="w-4 h-4" />
                  Conta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                <LogOut />
                {isLoading ? "Saindo..." : "Sair"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

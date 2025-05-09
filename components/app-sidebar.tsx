"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { PlaneTakeoff, Leaf, Tractor, MapPin, UserIcon, ChartBar } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useUserStore } from "@/hooks/useUserStore";


const links = [
  {
    title: "dashboard",
    href: "/dashboard",
    icon: ChartBar,
  },
  {
    title: "Parcelles",
    href: "/dashboard/landowner/parcelle",
    icon: Leaf,
  },
  {
    title: "Interventions",
    href: "/dashboard/landowner/interventions",
    icon: Tractor,
  },
  {
    title: "Localisation",
    href: "/dashboard/landowner/map",
    icon: MapPin,
  },
  {
    title: "statistiques",
    href: "/dashboard/admin/statistics",
    icon: ChartBar,
  },
 
  {
    title: "liste des utilisateurs",
    href: "/dashboard/admin/users/list",
    icon: UserIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const user = useUserStore((state: any) => state.user);

    // Filtrage conditionnel basé sur le rôle
    const filteredLinks = links.filter((link) => {
      const isAdminRoute = link.href.includes("/dashboard/admin/");
      if (isAdminRoute) {
        return user?.role === "admin";
      }
      return true;
    });

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="bg-sidebar-foreground text-white"
            >
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <PlaneTakeoff className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">AGRITRACK</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {filteredLinks.map(({ title, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link
                      href={href} 
                      className="flex items-center gap-2 font-medium"
                    >
                      <Icon className="size-4" />
                      {title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

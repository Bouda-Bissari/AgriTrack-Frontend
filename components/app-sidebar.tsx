"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { PlaneTakeoff, Leaf, Tractor, MapPin } from "lucide-react";

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

  const links = [
    {
      title: "Parcelles",
      href: "/dashboard-landowner/parcelle",
      icon: Leaf,
    },
    {
      title: "Interventions",
      href: "/dashboard-landowner/interventions",
      icon: Tractor,
    },
    {
      title: "Localisation",
      href: "/dashboard-landowner/map",
      icon: MapPin,
    },
  ];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

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
            {links.map(({ title, href, icon: Icon }) => {
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

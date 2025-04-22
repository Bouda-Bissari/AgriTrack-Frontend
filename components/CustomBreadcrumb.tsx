"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import useRoute from "@/hooks/useRoute";

export default function CustomBreadcrumb() {
  const { segments } = useRoute();

  if (segments.length === 0) return null;

  return (
    <Breadcrumb className="px-4 py-2 bg-muted/40 rounded-md">
      <BreadcrumbList>
        {/* Élément racine toujours visible */}
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Séparateur racine */}
        <BreadcrumbSeparator className="hidden md:block">
          <ChevronRight className="w-4 h-4" />
        </BreadcrumbSeparator>

        {/* Segments intermédiaires (masqués sur mobile) */}
        {segments.slice(0, -1).map((segment) => (
          <div key={segment.path} className="flex items-center gap-x-2">
            <BreadcrumbItem key={segment.path} className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link href={segment.path}>
                  {segment.name.replace(/-/g, " ")}
                </Link>
              </BreadcrumbLink>
              {/* <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator> */}
            </BreadcrumbItem>

            <ChevronRight className="w-4 h-4" />
          </div>
        ))}

        {/* Dernier segment (toujours visible) */}
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {segments[segments.length - 1].name.replace(/-/g, " ")}
          </BreadcrumbPage>
        </BreadcrumbItem>

        {/* Version mobile avec dropdown */}
        {segments.length > 1 && (
          <div className="md:hidden ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Separator className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {segments.slice(0, -1).map((segment, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={segment.path} className="capitalize">
                      {segment.name.replace(/-/g, " ")}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

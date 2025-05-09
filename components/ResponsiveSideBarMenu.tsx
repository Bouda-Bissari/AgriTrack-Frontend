'use client';

import * as React from "react";
import { User, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const links = [
    {
      title: "Profil",
      href: "/dashboard-landowner/account/profile",
      icon: User,
    },
    {
      title: "Password",
      href: "/dashboard-landowner/account/password",
      icon: KeyRound,
    },
  ];

const ResponsiveSideBarMenu = () => {
    const pathname = usePathname();
    
  return (
    <div>
        {/* sidebar */}
      <div className="h-full w-50 p-2 ">
        {links.map(({ title, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className={`flex w-full h-8 items-center justify-between px-2 rounded-r-lg mb-2 gap-4 
              ${pathname === href
                ? "border-l-3 border-[var(--color-nature-600)] bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]"
                : ""}`}
          >
            {title}
            <Icon className="size-4" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ResponsiveSideBarMenu
"use client";

import * as React from "react";
import { User, KeyRound, Camera } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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

const page = () => {  
  const pathname = usePathname();

  return (
    <div className="w-full h-full px-2 py-4 flex gap-5">
      
       {/* sidebar */}
       <div className="h-full w-50 p-2 border-r">
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

        {/* password */}
      <div className=" w-full flex flex-col gap-8 px-8 py-2">

        <h1 className="text-2xl font-bold mb-5 self-start">Mot de passe</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="oldPassword" className="font-bold text-lg">Ancien mot de passe</label>
          <input type="password" name="oldPassword" id="oldPassword" 
            className="
              w-120 h-10 
              border-2 border-gray-300 
              outline-none 
              focus:border-[var(--sidebar-accent-foreground)] 
              focus:ring-4
              ring-[var(--sidebar-accent)]
              px-2 py-1 
              rounded-lg"/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="font-bold text-lg">Nouveau mot de passe</label>
          <input type="password" name="newPassword" id="newPassword" 
            className="
              w-120 h-10 
              border-2 border-gray-300 
              outline-none 
              focus:border-[var(--sidebar-accent-foreground)] 
              focus:ring-4
              ring-[var(--sidebar-accent)]
              px-2 py-1 
              rounded-lg" />
        </div>      
        <Button type="submit" className="self-end w-30 bg-black rounded-lg">Enregister</Button>
      </div>
    </div>
  )
}

export default page
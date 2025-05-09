"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import ResponsiveNavMenu from "@/components/ResponsiveNavMenu";
import ResponsiveSideBarMenu from "@/components/ResponsiveSideBarMenu";

const page = () => {  
 
  const inputClass = " w-full md:w-120 h-10 border-2 border-gray-300 outline-none focus:border-[var(--sidebar-accent-foreground)] focus:ring-4 ring-[var(--sidebar-accent)] px-2 py-1 rounded-lg"
  return (
    <div className="w-full h-full px-2 py-4 flex flex-col md:flex-row gap-5">
      
      {/* sidebar */}
      <div className="hidden md:block h-full border-r">
        <ResponsiveSideBarMenu/>
      </div>

      <div className="md:hidden w-full">
        <ResponsiveNavMenu/>
      </div>


        {/* password */}
      <div className=" w-full flex flex-col gap-8 px-8 py-2">

        <h1 className="text-2xl font-bold mb-5 self-start">Mot de passe</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="oldPassword" className="font-bold text-lg">Ancien mot de passe</label>
          <input type="password" name="oldPassword" id="oldPassword" 
            className={inputClass}/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="font-bold text-lg">Nouveau mot de passe</label>
          <input type="password" name="newPassword" id="newPassword" 
            className={inputClass}/>
        </div>      
        <Button type="submit" className="self-center md:self-end md:w-30 w-full bg-black rounded-lg">Enregister</Button>
      </div>
    </div>
  )
}

export default page
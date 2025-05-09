"use client";

import * as React from "react";
import { X, Camera } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/useUserStore";
import { useUpdate } from "@/hooks/useUpdate";
import ResponsiveSideBarMenu from "@/components/ResponsiveSideBarMenu";
import ResponsiveNavMenu from "@/components/ResponsiveNavMenu";
import {UpdateProfilForm} from "@/components/updateProfilForm";


const Profile = () => {
  const [profilForm, setProfilForm] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const {updateProfil} = useUpdate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    profilImage: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        profilImage: user.profilImage || "",
      });
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      setForm((prev) => ({ ...prev, profilImage: imageURL}))
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass =
  "w-full h-10 text-black bg-gray-300/50 p-2 font-bold rounded-lg outline-none";
  return (
    <div className="w-full h-full px-2 py-4 flex flex-col md:flex-row gap-5 ">

      {/* sidebar */}
      <div className="hidden md:block h-full border-r">
        <ResponsiveSideBarMenu/>
      </div>

      <div className="md:hidden w-full">
        <ResponsiveNavMenu/>
      </div>

      {/* Profil */}
      <div className="h-full w-full">
        <div className="w-full flex items-center justify-between mb-5">          
          <h1 className="text-2xl font-bold mb-2">Mon Profil</h1>
          <UpdateProfilForm />
        </div>

        <form className="flex flex-col gap-4">

          <div className="w-full rounded-lg flex items-center gap-4 px-4 py-2 border">
            {/* image */}
            <div className="relative w-18 h-18">
              <img
                src={form.profilImage || "/images/agri1.jpg"}
                alt="photo profil"
                className="object-cover w-18 h-18 rounded-full border-2"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">{user?.lastName} {user?.firstName}</h1>
              <p className="text-gray-600">
                {user?.role === "landOwner" ? "Exploitant agricole" : "Travailleur agricole"}
              </p>
            </div>
          </div>

          {/* Info personnelle */}
          <div className="w-full rounded-lg flex flex-col gap-5 p-4 border">
            <h1 className="font-bold text-lg">Informations personnelles</h1>

            <div className="flex md:flex-row flex-col gap-4 md:items-center">
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="">Nom</label>
                <input
                  readOnly
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleInput}
                  disabled  
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="">Prénoms</label>
                <input
                  readOnly
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleInput}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4 md:items-center">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="">Adresse Email</label>
                <input
                  readOnly
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleInput}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="">Numéro de Téléphone</label>
                <input
                  readOnly
                  type="number"
                  name="phone"
                  id="phone"
                  value={form.phoneNumber}
                  onChange={handleInput}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="bio" className="">Bio</label>
              <textarea
                readOnly
                name="bio"
                id="bio"
                value={form.bio}
                onChange={handleInput}
                className={inputClass}
                ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
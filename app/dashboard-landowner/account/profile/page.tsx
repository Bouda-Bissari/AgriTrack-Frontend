"use client";

import * as React from "react";
import { User, KeyRound, Camera } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/useUserStore";
import { useUpdate } from "@/hooks/useUpdate";

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

const Profile = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const {updateProfil} = useUpdate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        bio: user.bio || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      setForm((prev) => ({ ...prev, image: imageURL}))
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      console.log(form);
  
      e.preventDefault();
  
      await updateProfil(form);
    };

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

      {/* Profil */}
      <div className="h-full w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-2">Mon Profil</h1>

          <div className="w-full rounded-lg flex items-center gap-4 px-4 py-2 border">
            {/* image */}
            <div className="relative w-18 h-18">
              <img
                src={form.image || "/images/agri1.jpg"}
                alt="photo profil"
                className="object-cover w-18 h-18 rounded-full border-2"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-1 bg-white p-1 rounded-full shadow-sm hover:bg-gray-100 cursor-pointer"
                type="button"
              >
                <Camera className="size-3" />
              </button>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
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

            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleInput}
                  className="w-80 h-10 focus:text-black text-gray-500 border border-gray-300 px-2 py-1 font-bold rounded-lg outline-none focus:border-2 focus:border-[var(--sidebar-accent-foreground)]/80 focus:ring-3 ring-[var(--sidebar-accent)]  "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="">Prénoms</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleInput}
                  className="w-80 h-10 focus:text-black text-gray-500 border border-gray-300 px-2 py-1 font-bold rounded-lg outline-none focus:border-2 focus:border-[var(--sidebar-accent-foreground)]/80 focus:ring-3 ring-[var(--sidebar-accent)]"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="">Adresse Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleInput}
                  className="w-80 h-10 focus:text-black text-gray-500 border border-gray-300 px-2 py-1 font-bold rounded-lg outline-none focus:border-2 focus:border-[var(--sidebar-accent-foreground)]/80 focus:ring-3 ring-[var(--sidebar-accent)] "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="">Numéro de Téléphone</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  onChange={handleInput}
                  className="w-80 h-10 focus:text-black text-gray-500 border border-gray-300 px-2 py-1 font-bold rounded-lg outline-none focus:border-2 focus:border-[var(--sidebar-accent-foreground)]/80 focus:ring-3 ring-[var(--sidebar-accent)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="bio" className="">Bio</label>
              <textarea
                name="bio"
                id="bio"
                value={form.bio}
                onChange={handleInput}
                className="min-h-10 max-h-20 focus:text-black text-gray-500 border border-gray-300 px-2 py-1 font-bold rounded-lg outline-none focus:border-2 focus:border-[var(--sidebar-accent-foreground)]/80 focus:ring-3 ring-[var(--sidebar-accent)]"
              ></textarea>
            </div>
          </div>

          <Button type="submit" className="self-end w-50 bg-black">Enregistrer le profil</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

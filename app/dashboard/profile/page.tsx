"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useUserStore } from "@/hooks/useUserStore";
import { UpdateProfilForm } from "@/components/updateProfilForm";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserStore((state) => state.user);

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
      setIsLoading(false);
    }
  }, [user]);

  const inputClass =
    "w-full h-10 text-black bg-gray-300/50 p-2 font-bold rounded-lg outline-none";

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-2 py-4 flex flex-col gap-5">
      {/* En-tête profil */}
      <div className="w-full flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
        <UpdateProfilForm />
      </div>

      {/* Informations profil */}
      <div className="flex flex-col gap-4">
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
              {user?.role === "landOwner" 
                ? "Exploitant agricole" 
                : user?.role === "worker" 
                  ? "Travailleur agricole" 
                  : "Administrateur"}
            </p>
          </div>
        </div>

        <div className="w-full rounded-lg flex flex-col gap-5 p-4 border">
          <h1 className="font-bold text-lg">Informations personnelles</h1>

          <div className="flex md:flex-row flex-col gap-4 md:items-center">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="lastName">Nom</label>
              <input
                readOnly
                type="text"
                name="lastName"
                id="lastName"
                value={form.lastName}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="firstName">Prénoms</label>
              <input
                readOnly
                type="text"
                name="firstName"
                id="firstName"
                value={form.firstName}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-4 md:items-center">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="email">Adresse Email</label>
              <input
                readOnly
                type="email"
                name="email"
                id="email"
                value={form.email}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="phone">Numéro de Téléphone</label>
              <input
                readOnly
                type="text"
                name="phone"
                id="phone"
                value={form.phoneNumber}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="bio">Bio</label>
            <textarea
              readOnly
              name="bio"
              id="bio"
              value={form.bio}
              className={`${inputClass} min-h-[100px]`}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
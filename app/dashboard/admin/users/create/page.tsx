"use client";

import AuthLeft from "@/components/AuthRegisterLeft";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Shield, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as RadioGroup from "@radix-ui/react-radio-group";
import apiClient from "@/configs/axios";
import { useUserStore } from "@/hooks/useUserStore";

const options = [
  {
    value: "admin",
    label: "Administrateur",
    icon: <Shield className="w-5 h-5 text-blue-500" />,
  },
  {
    value: "landOwner",
    label: "Exploitant",
    icon: <User className="w-5 h-5 text-green-500" />,
  },
];

const CreateAdminPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");

    const user = useUserStore((state) => state.user);
  
    const role = user?.role;
    if (role !== "admin") {
      return (
        <div className="text-red-500 p-4">
          Vous n'avez pas accès à cette page.
        </div>
      );
    }
  

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: selectedRole,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setForm((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await apiClient.post("/create", form);
      toast.success("Utilisateur créé avec succès !");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0] ||
        err.message ||
        "Erreur inconnue";
      toast.error(message);
    }
  };

  return (
    <div className="flex gap-x-4 h-screen w-full p-4">
      <AuthLeft  />
      <div className="bg-white rounded-lg flex-1 px-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-full gap-y-3"
        >
          <h1 className="text-2xl text-black font-poetsen font-bold">
            Créer un compte
          </h1>
          <p className="text-gray-400 my-4 text-center">
            Veuillez remplir les champs pour ajouter un{" "}
            {selectedRole === "admin" ? "administrateur" : "exploitant"}.
          </p>

          <div className="flex gap-x-3 w-full">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleInput}
              placeholder="Prénom"
              className="w-full border-b-2 p-2 border-0 focus:ring-0 focus:outline-0"
              required
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleInput}
              placeholder="Nom de famille"
              className="w-full border-b-2 p-2 border-0 focus:ring-0 focus:outline-0"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInput}
            placeholder="Email"
            className="w-full border-b-2 p-2 border-0 focus:ring-0 focus:outline-0"
            required
          />

          <div className="relative w-full flex items-center border-b-2">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleInput}
              placeholder="Mot de passe"
              className="w-full p-2 border-0 focus:ring-0 focus:outline-0"
              required
            />
            <div
              className="cursor-pointer"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? (
                <EyeClosed size={24} />
              ) : (
                <Eye size={24} />
              )}
            </div>
          </div>

          <div className="relative w-full flex items-center border-b-2">
            <input
              type={isPasswordConfirmationVisible ? "text" : "password"}
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleInput}
              placeholder="Confirmer le mot de passe"
              className="w-full p-2 border-0 focus:ring-0 focus:outline-0"
              required
            />
            <div
              className="cursor-pointer"
              onClick={() =>
                setIsPasswordConfirmationVisible((prev) => !prev)
              }
            >
              {isPasswordConfirmationVisible ? (
                <EyeClosed size={24} />
              ) : (
                <Eye size={24} />
              )}
            </div>
          </div>

          <RadioGroup.Root
            defaultValue={options[0].value}
            onValueChange={handleRoleChange}
            className="max-w-sm w-full grid grid-cols-2 gap-4"
          >
            {options.map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                className="ring-[1px] ring-border rounded py-3 px-4 flex items-center gap-2 data-[state=checked]:ring-2 data-[state=checked]:ring-earth-600"
              >
                {option.icon}
                <span className="font-semibold tracking-tight">
                  {option.label}
                </span>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>

          <Button type="submit" variant="outline" className="w-full my-4">
            Créer le compte
          </Button>

          <p className="text-gray-400 my-4">
            <Link
              href="/dashboard"
              className="text-accent-light hover:underline"
            >
              Retour au tableau de bord
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminPage;

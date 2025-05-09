"use client";

import AuthLeft from "@/components/AuthRegisterLeft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/useRegister";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { register } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    await register(
      form.firstName,
      form.lastName,
      form.email,
      form.password
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex gap-x-4 h-screen w-full p-4">
      <AuthLeft />
      <div className="bg-white rounded-lg flex-1 px-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-full gap-y-3"
        >
          <h1 className="text-2xl text-black font-poetsen font-bold">
            Créer un compte
          </h1>
          <p className="text-gray-400 my-4 text-center">
            Créez un compte pour profiter de toutes les fonctionnalités de
            l'application.
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
              {isPasswordVisible ? <EyeClosed size={24} /> : <Eye size={24} />}
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
          <Button
            type="submit"
            variant="outline"
            effect="ringHover"
            className="w-full my-4"
          >
            Connexion
          </Button>
          <p className="text-gray-400 my-4">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-accent-light hover:underline">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

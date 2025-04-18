"use client";

import AuthLeft from "@/components/AuthRegisterLeft";
import RadioCardsDemo from "@/components/radio-group-07";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/useRegister";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { User, Briefcase } from "lucide-react"; // Importing icons

const options = [
  {
    value: "landOwner",
    label: "Exploitant",
    icon: <User className="w-5 h-5 text-blue-500" />, // Icon for landOwner
  },
  {
    value: "worker",
    label: "Travailleur",
    icon: <Briefcase className="w-5 h-5 text-green-500" />, // Icon for worker
  },
];

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("landOwner");
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: selectedValue,
  });

  // const confirmationPassword = () => {
  //   if (form.password !== form.password_confirmation) {
  //     toast.error("Les mots de passe ne correspondent pas.");
  //     return false;
  //   }
  //   return true;
  // }
  const { register } = useRegister();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form);

    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    await register(
      form.firstName,
      form.lastName,
      form.email,
      form.password,
      form.role
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className=" flex gap-x-4 h-screen w-full p-4">
      <AuthLeft />
      <div className="bg-white rounded-lg flex-1 px-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-full gap-y-3"
        >
          <h1 className="text-2xl  text-black font-poetsen font-bold ">
            Creer un compte
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
              className="w-full border-b-2  p-2  border-0 focus:ring-0 focus:outline-0"
              required
            />

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleInput}
              placeholder="Nom de famille"
              className="w-full border-b-2  p-2  border-0 focus:ring-0 focus:outline-0"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInput}
            placeholder="Email"
            className="w-full border-b-2  p-2  border-0 focus:ring-0 focus:outline-0"
            required
          />
          <div className="relative w-full flex items-center border-b-2">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleInput}
              placeholder="Password"
              className="w-full  p-2  border-0 focus:ring-0 focus:outline-0"
              required
            />
            <div
              className=" cursor-pointer"
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
              placeholder="confirmer le password"
              className="w-full  p-2  border-0 focus:ring-0 focus:outline-0"
              required
            />
            <div
              className=" cursor-pointer"
              onClick={() => setIsPasswordConfirmationVisible((prev) => !prev)}
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
            onValueChange={(value) => setSelectedValue(value)}
            className="max-w-sm w-full grid grid-cols-2 gap-4"
          >
            {options.map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                className="ring-[1px] ring-border rounded py-3 px-4 flex items-center gap-2 data-[state=checked]:ring-2 data-[state=checked]:ring-earth-600"
              >
                {option.icon} {/* Display the icon */}
                <span className="font-semibold tracking-tight">
                  {option.label}
                </span>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>{" "}
          <Button
            type="submit"
            variant="outline"
            effect="ringHover"
            className="w-full my-4"
          >
            Conexion
          </Button>{" "}
          <p className="text-gray-400 my-4">
            Vous avez deja un compte?{" "}
            <Link href="/login" className="text-accent-light hover:underline">
              {" "}
              Se Connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

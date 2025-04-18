"use client";

import AuthLeftLogin from "@/components/AuthLoginLeft";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // const confirmationPassword = () => {
  //   if (form.password !== form.password_confirmation) {
  //     toast.error("Les mots de passe ne correspondent pas.");
  //     return false;
  //   }
  //   return true;
  // }
  const { login } = useLogin();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form);

    e.preventDefault();

    await login(form.email, form.password);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className=" flex gap-x-4 h-screen w-full p-4">
      <AuthLeftLogin />
      <div className="bg-white rounded-lg flex-1 px-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-full gap-y-3"
        >
          <h1 className="text-2xl  text-black font-bold font-poetsen ">
            Se Connecter
          </h1>
          <p className="text-gray-400 my-4 text-center">
            Se connecter pour profiter de toutes les fonctionnalités de
            l'application.
          </p>
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
            <Link
              href="/register"
              className="text-accent-light hover:underline"
            >
              {" "}
              Creer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { toast } from "react-hot-toast";
import { useUserStore } from "./useUserStore";
import apiClient from "@/configs/axios";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const setUser = useUserStore((state: any) => state.setUser);
  const setToken = useUserStore((state: any) => state.setToken);

  const route = useRouter();
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    return toast.promise(
      apiClient.post("/register", {
        firstName,
        lastName,
        email,
        password,
      }),
      {
        loading: "Création du compte en cours...",
        success: (response) => {
          setUser(response.data.user, response.data.token);
          setToken(response.data.token);
          route.push("/dashboard");
          return "Bienvenue sur AgriTrack ! Compte créé avec succès.";
        },
        error: (error) => {
          console.log(error);
          return (
            error.response?.data?.message ||
            "Échec de l'inscription. Veuillez réessayer."
          );
        },
      },
      {
        success: { duration: 2000, icon: "🎉" },
        error: { duration: 4000 },
        style: { minWidth: "250px" },
      }
    );
  };

  return { register };
};
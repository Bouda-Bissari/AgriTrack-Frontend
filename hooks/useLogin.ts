// hooks/useLogin.ts
import { toast } from "react-hot-toast";
import { useUserStore } from "./useUserStore";
import apiClient from "@/configs/axios";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setUser = useUserStore((state: any) => state.setUser);
  const setToken = useUserStore((state: any) => state.setToken);

  const route = useRouter();
  const login = async (email: string, password: string) => {
    return toast.promise(
      apiClient.post("/login", { email, password }),
      {
        loading: "Connexion...",
        success: (response) => {

          const { user, token } = response.data;

          setUser(user, token);
          setToken(token);
          if (user.role === "admin") {
            route.push("/dashboard/admin/statistics");
          } else {
            route.push("/dashboard/landowner");
          }
          return "Bienvenu !";
        },
        error: (error) => {
          return error.response?.data?.message || "Login failed";
        },
      },
      {
        success: { duration: 2000, icon: "🎉" },
        error: { duration: 4000 },
        style: { minWidth: "250px" },
      }
    );
  };

  return { login };
};

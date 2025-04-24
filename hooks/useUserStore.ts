import apiClient from "@/configs/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string | null;
} | null;

type UserStore = {
  user: User;
  token: string | null; // Ajout du token
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  setToken: (token: string) => void; // Ajout de setToken
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      checkAuth: async () => {
        try {
          await apiClient.post("/checkAuth");
          set({ isAuthenticated: true });
        } catch (err: any) {
          set({ isAuthenticated: false });
          toast.error(err?.message);
          console.log(err);
        }
      },
      setUser: (user: User, token: string) => {
        set({ user, token, isAuthenticated: !!user });
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      },
      setToken: (token: string) => {
        set({ token });
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      },
      logout: async () => {
        try {
          await apiClient.post("/logout");
        } finally {
          set({ user: null, isAuthenticated: false, token: null });
          useUserStore.persist.clearStorage();
        }
      },
    }),
    {
      name: "user-storage",
      partialize: (state: any) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);

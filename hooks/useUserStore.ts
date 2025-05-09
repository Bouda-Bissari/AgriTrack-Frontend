import apiClient from "@/configs/axios";
import { useRouter } from "next/navigation";
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
  phoneNumber?: string | null;
  bio?: string | null;
  profilImage?: string | null;
} | null;

type UserStore = {
  user: User;
  token: string | null; // Ajout du token
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  setToken: (token: string) => void; // Ajout de setToken
  updateUser: (updatedFields: Partial<User>) => void;
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
        document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 1 semaine

      },
      updateUser: (updatedFields: Partial<User>) => {
        set((state: { user: any; }) => ({
          user: {
            ...state.user,
            ...updatedFields,
          },
        }));
      },      
      logout: async () => {
        try {
          await apiClient.post("/logout");
        } finally {
          set({ user: null, isAuthenticated: false, token: null });
          useUserStore.persist.clearStorage();
          document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

          
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

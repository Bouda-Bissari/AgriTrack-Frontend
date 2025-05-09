"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/hooks/useUserStore";
import apiClient from "@/configs/axios";
import { useRouter } from "next/navigation";

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  profilImage?: File | null;
}

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const updateUser = useUserStore((state) => state.updateUser);
  const router = useRouter();

  const updateProfile = async (data: FormData) => {
    try {
      setLoading(true);
      
      return await toast.promise(
        apiClient.post("/user/update-profile", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }),
        {
          loading: "Mise à jour du profil...",
          success: (response) => {
            if (response.data?.user) {
              updateUser(response.data.user);
            }
            return "Profil mis à jour avec succès";
          },
          error: (error) => {
            return error.response?.data?.message || "Échec de la mise à jour";
          },
        },
        {
          success: { duration: 2000, icon: "✅" },
          error: { duration: 4000 },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (passwordData: UpdatePasswordData) => {
    try {
      setLoading(true);
      
      return await toast.promise(
        apiClient.post("/user/update-password", passwordData),
        {
          loading: "Changement du mot de passe...",
          success: () => {
            // Déconnexion après changement de mot de passe
            router.push("/login");
            return "Mot de passe mis à jour - Veuillez vous reconnecter";
          },
          error: (error) => {
            return error.response?.data?.message || "Échec du changement de mot de passe";
          },
        },
        {
          success: { duration: 3000, icon: "🔒" },
          error: { duration: 4000 },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    updatePassword,
    loading,
  };
};
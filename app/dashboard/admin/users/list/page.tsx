"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import apiClient from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/user/user-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/hooks/useUserStore";

type Filters = {
  firstName?: string;
  lastName?: string;
  role?: string;
  phoneNumber?: string;
};

function UsersPage() {
  const router = useRouter();
  const { register, handleSubmit, reset, watch } = useForm<Filters>();
  const [filters, setFilters] = useState<Filters>({});

    const user = useUserStore((state) => state.user);
  
    const role = user?.role;
    if (role !== "admin") {
      return (
        <div className="text-red-500 p-4">
          Vous n'avez pas accès à cette page.
        </div>
      );
    }
  

  const fetchUsers = async () => {
    const response = await apiClient.get("/admin/users", {
      params: filters,
    });
    return response.data.users;
  };

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", filters],
    queryFn: fetchUsers,
  });

  const onSubmit = (data: Filters) => {
    setFilters(data);
  };

  const handleReset = () => {
    reset();
    setFilters({});
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <Button onClick={() => router.push("/dashboard/admin/users/create")}>
          Créer un utilisateur
        </Button>
      </div>

      {/* Filtres */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <Input placeholder="Prénom" {...register("firstName")} />
        <Input placeholder="Nom" {...register("lastName")} />
        <Input placeholder="Téléphone" {...register("phoneNumber")} />

        <Select
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, role: value }))
          }
          value={filters.role || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="landowner">Utilisateur</SelectItem>
            <SelectItem value="editor">Éditeur</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button type="submit">Filtrer</Button>
          <Button variant="outline" type="button" onClick={handleReset}>
            Réinitialiser
          </Button>
        </div>
      </form>

      {/* Affichage */}
      {isLoading && (
        <div className="flex justify-center p-6">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm">
          Erreur lors du chargement des utilisateurs.
        </div>
      )}

      {!isLoading && users && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user: any) => (
            <UserCard
              key={user.id}
              id={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              bio={user.bio}
              phoneNumber={user.phoneNumber}
              role={user.role}
              is_blocked={user.is_blocked}
              
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPage;
